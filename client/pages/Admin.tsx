import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
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

// 1. Define the shape of our form using Zod
const formSchema = z.object({
  title: z.string().min(2, {
    message: "Project title must be at least 2 characters.",
  }),
  category: z.string().min(2, {
    message: "Category is required (e.g., Residential, Commercial).",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z.any(), // In a real app, this would validate the file type
});

export default function Admin() {
  const { toast } = useToast();

  // 2. Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
    },
  });

  // 3. Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // This is where we would send 'values' to your backend/database
    console.log(values);
    
    toast({
      title: "Project Uploaded",
      description: "Your project has been successfully added to the portfolio.",
    });
    
    form.reset();
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Simple Admin Navbar */}
      <nav className="bg-white border-b px-4 lg:px-20 py-4 flex justify-between items-center">
        <div className="font-outfit font-bold text-xl text-text-color">
          ESS<span className="text-orange">+</span>BROWNE <span className="text-gray-400 font-normal ml-2">| Admin</span>
        </div>
        <Link to="/" className="text-sm hover:text-orange transition-colors">
          Back to Website
        </Link>
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
                {/* Title Field */}
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

                {/* Category Field */}
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

              {/* Image Upload Field (Visual only for now) */}
              <FormItem>
                <FormLabel>Project Image</FormLabel>
                <FormControl>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Input id="picture" type="file" className="cursor-pointer bg-gray-50" />
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500 mt-2">Recommended size: 1920x1080px. Max 5MB.</p>
              </FormItem>

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the project, the client's vision, and the outcome..." 
                        className="min-h-[150px] bg-gray-50 resize-none" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-text-color hover:bg-orange text-white h-12 text-lg transition-colors">
                Upload Project
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}