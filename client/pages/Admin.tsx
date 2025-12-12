import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import ProjectList from "@/components/ProjectList";

const STATUS_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "In Progress" },
  { value: "not-started", label: "Not Started" },
];

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required." }),
  category: z.string().min(2, { message: "Category is required (e.g. Residential)." }),
  status: z.enum(["completed", "ongoing", "not-started"], {
    required_error: "Please select a project status.",
  }),
  description: z.string().min(10, { message: "Description is required." }),
  drawings: z.array(z.object({
    description: z.string().min(1, { message: "Description is required" }),
    url: z.string().optional(), // Existing URL for edits
    // File is not validated here directly, but checked on submit
  })).optional(),
});

export default function Admin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // VIEW STATE
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProject, setEditingProject] = useState<any | null>(null);

  // SEPARATE STATE FOR IMAGES
  const [coverImage, setCoverImage] = useState<File | null>(null); // Single Main Image
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);   // Multiple Gallery Images

  // Custom State for Drawings (Architecture)
  // We need to sync this with the FieldArray for descriptions
  const [drawingFiles, setDrawingFiles] = useState<Record<number, File | null>>({});

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/login");
      }
    });
  }, [navigate]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      drawings: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "drawings",
  });

  // HANDLER: Main Cover Image (Single)
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCoverImage(e.target.files[0]);
    }
  };

  // HANDLER: Gallery Images (Multiple)
  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setGalleryFiles(filesArray);
    }
  };

  const handleDrawingFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDrawingFiles(prev => ({ ...prev, [index]: e.target.files![0] }));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Switching Views helpers
  const startCreate = () => {
    setEditingProject(null);
    form.reset({
      title: "",
      category: "",
      status: "not-started",
      description: "",
      drawings: [],
    });
    setCoverImage(null);
    setGalleryFiles([]);
    setDrawingFiles({});
    setView('create');
  };

  const startEdit = (project: any) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      category: project.category,
      status: project.status,
      description: project.description,
      drawings: project.drawings || [],
    });
    setCoverImage(null);
    setGalleryFiles([]);
    setDrawingFiles({});
    setView('edit');
  };

  const goBackToList = () => {
    setView('list');
    setEditingProject(null);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Validation for CREATE mode
    if (view === 'create' && !coverImage) {
      toast({
        variant: "destructive",
        title: "Cover Image Required",
        description: "Please select a main cover image for the project.",
      });
      return;
    }

    setIsLoading(true);

    try {
      let finalCoverUrl = editingProject?.image_url || "";
      let finalGalleryUrls = editingProject?.gallery_urls || [];

      // 1. Upload Main Cover Image (if changed)
      if (coverImage) {
        const fileExt = coverImage.name.split(".").pop();
        const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: coverError } = await supabase.storage
          .from("project-images")
          .upload(fileName, coverImage);

        if (coverError) throw coverError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        finalCoverUrl = publicUrl;
      }

      // 2. Upload Gallery Images (Append new ones)
      if (galleryFiles.length > 0) {
        const newGalleryUrls: string[] = [];
        for (const file of galleryFiles) {
          const fExt = file.name.split(".").pop();
          const fName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.${fExt}`;

          const { error: galleryError } = await supabase.storage
            .from("project-images")
            .upload(fName, file);

          if (galleryError) {
            console.error("Error uploading gallery file:", file.name, galleryError);
            continue;
          }

          const { data: { publicUrl } } = supabase.storage
            .from("project-images")
            .getPublicUrl(fName);

          newGalleryUrls.push(publicUrl);
        }
        // Strategy: Append to existing, or Replace?
        // Let's Append for now, or user can assume upload means "add these too"
        // But for a simple MVP edit, maybe we just Append.
        finalGalleryUrls = [...(finalGalleryUrls || []), ...newGalleryUrls];
      }

      // 3. Upload Drawing Images and Construct Drawings Array
      // Mix of existing drawings (objects with URLs) and new uploads (files)
      // The form 'values.drawings' has the descriptions. 
      // We need to merge everything carefully.

      const drawingsData: { url: string, description: string }[] = [];
      const drawingDescriptions = values.drawings || [];

      for (let i = 0; i < drawingDescriptions.length; i++) {
        const field = drawingDescriptions[i];
        const file = drawingFiles[i];

        let drawingUrl = field.url; // Existing URL if present

        // If new file uploaded for this index, upload it
        if (file) {
          const fileExt = file.name.split(".").pop();
          const fileName = `drawing-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(fileName, file);

          if (uploadError) {
            console.error("Error uploading drawing:", file.name, uploadError);
          } else {
            const { data: { publicUrl } } = supabase.storage
              .from("project-images")
              .getPublicUrl(fileName);
            drawingUrl = publicUrl;
          }
        }

        if (drawingUrl) {
          drawingsData.push({
            url: drawingUrl,
            description: field.description,
          });
        }
      }

      // Save Data to Supabase
      const payload = {
        title: values.title,
        category: values.category,
        status: values.status,
        description: values.description,
        image_url: finalCoverUrl,
        gallery_urls: finalGalleryUrls,
        drawings: drawingsData,
      };

      let error = null;

      if (view === 'edit' && editingProject) {
        const { error: updateError } = await supabase
          .from("projects")
          .update(payload)
          .eq('id', editingProject.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("projects")
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Success!",
        description: view === 'edit' ? "Project updated successfully." : "Project created successfully.",
      });

      // Return to list
      goBackToList();

    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <nav className="bg-white border-b px-4 lg:px-20 py-4 flex justify-between items-center">
        <div className="font-outfit font-bold text-xl text-text-color">
          ESS<span className="text-orange">+</span>BROWNE <span className="text-gray-400 font-normal ml-2">| Admin</span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-text-color transition-colors">
            View Site
          </Link>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="h-9 text-sm border-gray-200 text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100"
          >
            Log out
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 lg:py-24 max-w-4xl">

        {/* LIST VIEW */}
        {view === 'list' && (
          <ProjectList
            onEdit={startEdit}
            onAddNew={startCreate}
          />
        )}

        {/* CREATE / EDIT FORM VIEW */}
        {(view === 'create' || view === 'edit') && (
          <div className="bg-white p-8 lg:p-12 rounded-xl shadow-sm border">
            <div className="mb-8 flex items-center gap-4">
              <Button onClick={goBackToList} variant="ghost" size="icon" className="h-8 w-8 -ml-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="font-outfit text-3xl font-bold text-text-color mb-1">
                  {view === 'create' ? "Upload New Project" : "Edit Project"}
                </h1>
                <p className="text-gray-500">
                  {view === 'create'
                    ? "Add details, cover image, gallery, and architectural drawings."
                    : "Update project details. Leave image fields empty to keep existing images."}
                </p>
              </div>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Adenta Residence" {...field} className="bg-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Residential, Commercial" {...field} className="bg-gray-50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {STATUS_OPTIONS.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                {status.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* MAIN COVER IMAGE SECTION */}
                <div className="space-y-4 p-6 bg-orange/5 border border-orange/10 rounded-lg">
                  <FormLabel className="text-lg font-semibold text-orange-900">1. Main Cover Image</FormLabel>
                  <p className="text-sm text-gray-600 mb-2">
                    {view === 'edit'
                      ? "Upload a new file to replace the current cover image."
                      : "This is the hero image shown at the top of the project page."}
                  </p>

                  {/* Preview for Edit Mode */}
                  {view === 'edit' && editingProject?.image_url && !coverImage && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Current Cover:</p>
                      <img src={editingProject.image_url} alt="Current Cover" className="h-40 w-auto rounded border shadow-sm object-cover" />
                    </div>
                  )}

                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                      className="cursor-pointer bg-white"
                    />
                  </FormControl>
                  {coverImage && (
                    <p className="text-xs text-green-600 font-medium">New selected: {coverImage.name}</p>
                  )}
                </div>

                {/* GALLERY IMAGES SECTION */}
                <div className="space-y-4 p-6 bg-gray-50 border border-gray-100 rounded-lg">
                  <FormLabel className="text-lg font-semibold text-gray-900">2. Project Gallery</FormLabel>
                  <p className="text-sm text-gray-600 mb-2">
                    {view === 'edit'
                      ? "Upload new images to ADD to the gallery."
                      : "Upload additional views (e.g. 3 images recommended)."}
                  </p>

                  {/* Preview for Edit Mode - Just a count or list */}
                  {view === 'edit' && editingProject?.gallery_urls?.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Current Gallery ({editingProject.gallery_urls.length} images):</p>
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {editingProject.gallery_urls.map((url: string, i: number) => (
                          <img key={i} src={url} className="h-20 w-20 object-cover rounded border" />
                        ))}
                      </div>
                      {/* Note: Deleting individual gallery images is a complex feature for later */}
                    </div>
                  )}

                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryFilesChange}
                      className="cursor-pointer bg-white"
                    />
                  </FormControl>
                  {galleryFiles.length > 0 ? (
                    <p className="text-xs text-green-600 font-medium">{galleryFiles.length} new files selected.</p>
                  ) : (
                    <p className="text-xs text-gray-400">No new images selected.</p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the project..."
                          className="min-h-[150px] bg-gray-50 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <FormLabel className="text-lg font-semibold">Architectural Drawings</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => append({ description: "", url: "" })}
                      className="flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add Drawing
                    </Button>
                  </div>

                  {fields.map((field, index) => (
                    <div key={field.id} className="p-4 bg-gray-50 rounded-lg space-y-4 relative">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => {
                          remove(index);
                          // Optional: cleanup file state
                          const newFiles = { ...drawingFiles };
                          delete newFiles[index];
                          setDrawingFiles(newFiles);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

                      {/* Show current image if exists */}
                      {field.url && (
                        <div className="mb-2">
                          <p className="text-xs text-gray-500 mb-1">Current Image:</p>
                          <img src={field.url} className="h-20 object-contain border bg-white" />
                        </div>
                      )}

                      <FormItem>
                        <FormLabel>{field.url ? "Replace Image (Optional)" : "Drawing Image"}</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleDrawingFileChange(index, e)}
                            className="bg-white"
                          />
                        </FormControl>
                      </FormItem>

                      <FormField
                        control={form.control}
                        name={`drawings.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Ground Floor Plan" {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}

                  {fields.length === 0 && (
                    <p className="text-sm text-gray-400 italic">No drawings added directly. Add some using the button above.</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-text-color hover:bg-orange text-white h-12 text-lg transition-colors mt-8"
                >
                  {isLoading ? "Saving..." : (view === 'create' ? "Upload Project" : "Update Project")}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}