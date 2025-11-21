import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
});

export default function Admin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

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
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(filesArray);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "Images Required",
        description: "Please select at least one image. The first image will be the cover.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const uploadedUrls: string[] = [];

      // Loop through all selected files and upload them
      for (const file of selectedFiles) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("project-images")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Error uploading file:", file.name, uploadError);
          continue; 
        }

        const { data: { publicUrl } } = supabase.storage
          .from("project-images")
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      if (uploadedUrls.length === 0) {
        throw new Error("Failed to upload any images.");
      }

      // Save Data to Supabase
      // Distinction Strategy:
      // 1. 'image_url' = The FIRST image uploaded (Cover Image)
      // 2. 'gallery_urls' = The FULL array of images (Gallery)
      const { error: dbError } = await supabase
        .from("projects")
        .insert([
          {
            title: values.title,
            category: values.category,
            status: values.status,
            description: values.description,
            image_url: uploadedUrls[0], // The main cover image
            gallery_urls: uploadedUrls, // The full gallery
          },
        ]);

      if (dbError) throw dbError;

      toast({
        title: "Success!",
        description: `${uploadedUrls.length} images uploaded successfully.`,
      });
      
      form.reset();
      setSelectedFiles([]);
      // Reset file input manually if needed

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

      <div className="container mx-auto px-4 py-12 lg:py-24 max-w-3xl">
        <div className="bg-white p-8 lg:p-12 rounded-xl shadow-sm border">
          <div className="mb-8">
            <h1 className="font-outfit text-3xl font-bold text-text-color mb-2">Upload New Project</h1>
            <p className="text-gray-500">Add details and images. The <strong>first image</strong> you select will be the cover.</p>
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

              <FormItem>
                <FormLabel>Project Images (Select Multiple)</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="cursor-pointer bg-gray-50" 
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedFiles.length > 0 
                    ? `${selectedFiles.length} files selected. First file will be the cover.` 
                    : "Select one or more images."}
                </p>
              </FormItem>

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

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-text-color hover:bg-orange text-white h-12 text-lg transition-colors"
              >
                {isLoading ? "Uploading..." : "Upload Project"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}