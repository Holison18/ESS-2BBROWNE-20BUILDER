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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase"; 

// Extended schema to validate file input
const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required." }),
  category: z.string().min(2, { message: "Category is required." }),
  description: z.string().min(10, { message: "Description is required." }),
});

export default function Admin() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Optional: Check for session on mount (extra safety)
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

  // Handle file selection manually
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Logout Handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Image Required",
        description: "Please select an image for the project.",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 1. Upload Image to Supabase Storage
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`; // Unique name
      const { error: uploadError } = await supabase.storage
        .from("project-images") // Make sure this bucket exists!
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // 2. Get the Public URL
      const { data: { publicUrl } } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      // 3. Save Data to Supabase Database
      const { error: dbError } = await supabase
        .from("projects") // Make sure this table exists!
        .insert([
          {
            title: values.title,
            category: values.category,
            description: values.description,
            image_url: publicUrl,
          },
        ]);

      if (dbError) throw dbError;

      // Success!
      toast({
        title: "Success!",
        description: "Project uploaded successfully.",
      });
      
      form.reset();
      setSelectedFile(null);

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
            <p className="text-gray-500">Add details for a new project to display on your portfolio.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              
              <div className="grid md:grid-cols-2 gap-6">
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

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Residential" {...field} className="bg-gray-50" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* File Input */}
              <FormItem>
                <FormLabel>Project Image</FormLabel>
                <FormControl>
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="cursor-pointer bg-gray-50" 
                  />
                </FormControl>
                <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x1080px. Max 5MB.</p>
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