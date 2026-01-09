import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression"; // Import compression
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
import { Plus, Trash2, ArrowLeft, Loader2 } from "lucide-react"; // Added Loader2
import ProjectList from "@/components/ProjectList";
import { CATEGORY_MAP, ProjectCategory } from "@/types";

const STATUS_OPTIONS = [
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "In Progress" },
  { value: "not-started", label: "Not Started" },
];

const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required." }),
  tagline: z.string().optional(),
  category: z.string().min(2, { message: "Category is required." }),
  location: z.string().optional(),
  approx_area: z.string().optional(),
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
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]); // URLs kept during edit

  // NEW: Track paths to delete from storage on save
  const [pathsToDelete, setPathsToDelete] = useState<string[]>([]);

  // Custom State for Drawings (Architecture)
  // We need to sync this with the fieldArray for descriptions
  const [drawingFiles, setDrawingFiles] = useState<Record<number, File | null>>({});

  // Category State for dependent dropdown
  const [mainCategory, setMainCategory] = useState<string>("");

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
      tagline: "",
      category: "",
      location: "",
      approx_area: "",
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
      // If we are replacing an existing cover image (in edit mode), mark the old one for deletion
      if (editingProject?.image_url && !coverImage) {
        // Only mark if we haven't already replaced it in this session 
        // (Simpler logic: We'll calculate final deletions on submit)
      }
      setCoverImage(e.target.files[0]);
    }
  };

  // HANDLER: Gallery Images (Multiple - Append)
  const handleGalleryFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setGalleryFiles(prev => [...prev, ...filesArray]); // Append instead of replace
      e.target.value = ""; // Reset input so same file can be selected again if needed
    }
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryUrl = (urlToRemove: string) => {
    setExistingGalleryUrls(prev => prev.filter(url => url !== urlToRemove));
    // Mark for deletion
    setPathsToDelete(prev => [...prev, urlToRemove]);
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

  // Helper: Compress Image
  const compressFile = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 1,           // Max 1MB
      maxWidthOrHeight: 1920, // FHD
      useWebWorker: true,
    };
    try {
      console.log(`Compressing ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)...`);
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed to ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
      return compressedFile;
    } catch (error) {
      console.error("Compression error:", error);
      return file; // Fallback to original
    }
  };

  // Switching Views helpers
  const startCreate = () => {
    setEditingProject(null);
    form.reset({
      title: "",
      tagline: "",
      category: "",
      location: "",
      approx_area: "",
      status: "not-started",
      description: "",
      drawings: [],
    });
    setMainCategory(""); // Reset main category
    setCoverImage(null);
    setGalleryFiles([]);
    setExistingGalleryUrls([]);
    setDrawingFiles({});
    setView('create');
  };

  const startEdit = (project: any) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      tagline: project.tagline || "",
      category: project.category,
      location: project.location || "",
      approx_area: project.approx_area || "",
      status: project.status,
      description: project.description,
      drawings: project.drawings || [],
    });

    // Determine Main Category from the project's sub category
    let foundMain = "";
    for (const [key, values] of Object.entries(CATEGORY_MAP)) {
      if (values.includes(project.category)) {
        foundMain = key;
        break;
      }
    }
    setMainCategory(foundMain);

    setExistingGalleryUrls(project.gallery_urls || []); // Initialize with existing
    setCoverImage(null);
    setGalleryFiles([]); // Clear new uploads
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
      // 0. Process Deletions First
      if (pathsToDelete.length > 0) {
        console.log("Cleanup: Deleting removed images...", pathsToDelete);
        // Extract file paths from full URLs
        const filesToRemove = pathsToDelete.map(url => {
          // Assuming URL format: .../project-images/filename.ext
          const parts = url.split('/project-images/');
          return parts.length > 1 ? parts[1] : null;
        }).filter(Boolean) as string[];

        if (filesToRemove.length > 0) {
          const { error: deleteError } = await supabase.storage
            .from("project-images")
            .remove(filesToRemove);

          if (deleteError) console.error("Error deleting files:", deleteError);
        }
      }

      let finalCoverUrl = editingProject?.image_url || "";
      let finalGalleryUrls: string[] = []; // Re-construct this list

      // 1. Upload Main Cover Image (if changed)
      if (coverImage) {
        // If there was an old cover image, delete it (unless it's being used elsewhere, 
        // but for now we assume 1:1 relationship for simplicity or just let it stay if unsure. 
        // Better: Delete old cover if we are replacing it.)
        if (editingProject?.image_url) {
          const oldUrl = editingProject.image_url;
          const parts = oldUrl.split('/project-images/');
          if (parts.length > 1) {
            await supabase.storage.from("project-images").remove([parts[1]]);
          }
        }

        const compressedCover = await compressFile(coverImage);
        const fileExt = compressedCover.name.split(".").pop();
        const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: coverError } = await supabase.storage
          .from("project-images")
          .upload(fileName, compressedCover);

        if (coverError) throw coverError;

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        finalCoverUrl = publicUrl;
      } else if (!editingProject?.image_url && view === 'edit') {
        // Case: User removed the cover image in edit mode but didn't upload a new one?
        // Validation prevents submit, but logic should handle it just in case.
        finalCoverUrl = "";
      }

      // 2. Upload Gallery Images (Append new ones)
      let newGalleryUrls: string[] = [];
      if (galleryFiles.length > 0) {
        for (const file of galleryFiles) {
          const compressedGalleryFile = await compressFile(file);
          const fExt = compressedGalleryFile.name.split(".").pop();
          const fName = `gallery-${Date.now()}-${Math.random().toString(36).substring(7)}.${fExt}`;

          const { error: galleryError } = await supabase.storage
            .from("project-images")
            .upload(fName, compressedGalleryFile);

          if (galleryError) {
            console.error("Error uploading gallery file:", file.name, galleryError);
            continue;
          }

          const { data: { publicUrl } } = supabase.storage
            .from("project-images")
            .getPublicUrl(fName);

          newGalleryUrls.push(publicUrl);
        }
      }
      // Strategy: Append to existing KEPT urls
      finalGalleryUrls = [...existingGalleryUrls, ...newGalleryUrls];
      // 3. Upload Drawing Images and Construct Drawings Array
      const drawingsData: { url: string, description: string }[] = [];
      const drawingDescriptions = values.drawings || [];

      for (let i = 0; i < drawingDescriptions.length; i++) {
        const field = drawingDescriptions[i];
        const file = drawingFiles[i];

        let drawingUrl = field.url; // Existing URL if present

        // If new file uploaded for this index, upload it
        if (file) {
          const compressedDrawing = await compressFile(file);
          const fileExt = compressedDrawing.name.split(".").pop();
          const fileName = `drawing-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("project-images")
            .upload(fileName, compressedDrawing);

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
        tagline: values.tagline,
        category: values.category,
        location: values.location,
        approx_area: values.approx_area,
        status: values.status,
        description: values.description,
        image_url: finalCoverUrl,
        gallery_urls: finalGalleryUrls,
        drawings: drawingsData,
      };

      console.log("Submitting Payload:", payload); // Debug logging

      let error = null;

      if (view === 'edit' && editingProject) {
        console.log("Updating project ID:", editingProject.id);
        const { error: updateError, data } = await supabase
          .from("projects")
          .update(payload)
          .eq('id', editingProject.id)
          .select();

        if (!updateError && (!data || data.length === 0)) {
          throw new Error("Update failed: No records modified. This is likely a permission (RLS) issue.");
        }

        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from("projects")
          .insert([payload]);
        error = insertError;
      }

      if (error) throw error;

      // Force a small delay or query invalidation could be envisioned here but
      // since we unmount the list, it should re-fetch.

      toast({
        title: "Success! 🚀",
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

                {/* NEW: TAGLINE FIELD */}
                <FormField
                  control={form.control}
                  name="tagline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tagline / Hero Subheading</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. A modern landmark for the city" {...field} className="bg-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-6">
                  {/* CATEGORY SELECTION */}
                  <div className="space-y-4">
                    <FormLabel>Project Category</FormLabel>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Main Category */}
                      <Select
                        value={mainCategory}
                        onValueChange={(val) => {
                          setMainCategory(val);
                          form.setValue("category", ""); // Reset subcategory
                        }}>
                        <SelectTrigger className="bg-gray-50">
                          <SelectValue placeholder="Type (Int/Ext)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Interior">Interior</SelectItem>
                          <SelectItem value="Exterior">Exterior</SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Sub Category */}
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              disabled={!mainCategory}
                            >
                              <FormControl>
                                <SelectTrigger className="bg-gray-50">
                                  <SelectValue placeholder={mainCategory ? "Select Category" : "Select Type First"} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {mainCategory && CATEGORY_MAP[mainCategory as ProjectCategory]?.map((item) => (
                                  <SelectItem key={item} value={item}>
                                    {item}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

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

                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Accra, Ghana" {...field} className="bg-gray-50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="approx_area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approx. Area (Sq Ft)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 2,500 sq ft" {...field} className="bg-gray-50" />
                        </FormControl>
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
                    <div className="mb-4 relative inline-block">
                      <p className="text-xs font-bold text-gray-500 mb-2 uppercase">Current Cover:</p>
                      <div className="relative group">
                        <img src={editingProject.image_url} alt="Current Cover" className="h-40 w-auto rounded border shadow-sm object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            // Logic to clear the image URL from "editingProject" conceptually in UI
                            // We update state to reflect removal
                            const updatedProject = { ...editingProject, image_url: "" };
                            setEditingProject(updatedProject);
                            // Mark old for deletion (if saved)
                            setPathsToDelete(prev => [...prev, editingProject.image_url]);
                          }}
                          className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove Current Cover"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
                    Upload additional views. Selected images will be added to the list below.
                  </p>

                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryFilesChange}
                      className="cursor-pointer bg-white mb-4"
                    />
                  </FormControl>

                  {/* PREVIEW AREA */}
                  {(existingGalleryUrls.length > 0 || galleryFiles.length > 0) && (
                    <div className="flex flex-wrap gap-4 mt-4">

                      {/* Existing Images (Edit Mode) */}
                      {existingGalleryUrls.map((url, i) => (
                        <div key={`existing-${i}`} className="relative group w-24 h-24 border rounded overflow-hidden shadow-sm bg-white">
                          <img src={url} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute top-0 right-0 p-1">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeExistingGalleryUrl(url)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1 truncate">
                            Saved
                          </div>
                        </div>
                      ))}

                      {/* New Uploads */}
                      {galleryFiles.map((file, i) => (
                        <div key={`new-${i}`} className="relative group w-24 h-24 border-2 border-green-100 rounded overflow-hidden shadow-sm bg-white">
                          <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" onLoad={(e) => URL.revokeObjectURL(e.currentTarget.src)} />
                          <div className="absolute top-0 right-0 p-1">
                            <Button
                              type="button"
                              variant="destructive"
                              size="icon"
                              className="h-6 w-6 rounded-full opacity-90 hover:opacity-100" // Always visible for new uploads usually better UX
                              onClick={() => removeGalleryFile(i)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-green-600/80 text-white text-[10px] px-1 truncate">
                            New
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {existingGalleryUrls.length === 0 && galleryFiles.length === 0 && (
                    <p className="text-xs text-gray-400 italic">No images in gallery yet.</p>
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
                  className="w-full bg-text-color hover:bg-orange text-white h-12 text-lg transition-colors mt-8 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    view === 'create' ? "Upload Project" : "Update Project"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
}