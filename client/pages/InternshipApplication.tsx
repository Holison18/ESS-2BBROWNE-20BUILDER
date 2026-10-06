import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(9, { message: "Phone number is required." }),
  message: z.string().optional(),
  portfolioUrl: z.string().url({ message: "Must be a valid URL." }).optional().or(z.literal('')),
  portfolioFile: z
    .any()
    .optional()
    .refine((fileList) => {
      if (!fileList || fileList.length === 0) return true;
      return fileList[0].size <= MAX_FILE_SIZE;
    }, "File size must be less than 5MB"),
}).refine(data => data.portfolioUrl || (data.portfolioFile && data.portfolioFile.length > 0), {
  message: "Please provide either a portfolio URL or upload a file.",
  path: ["portfolioUrl"]
});

export default function InternshipApplication() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      portfolioUrl: "",
    },
  });

  const fileRef = form.register("portfolioFile");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      if (values.message) formData.append("message", values.message);
      if (values.portfolioUrl) formData.append("portfolioUrl", values.portfolioUrl);
      
      if (values.portfolioFile && values.portfolioFile.length > 0) {
        formData.append("portfolioFile", values.portfolioFile[0]);
      }

      const response = await fetch("/api/internship", {
        method: "POST",
        body: formData, // Automatically sets correct multipart/form-data boundary
      });

      let data: any = {};
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { success: false, error: text || "Server error occurred." };
      }

      if (!response.ok || !data.success) {
        throw new Error(data.message || data.error || "Failed to submit application.");
      }

      toast({
        title: "Application Submitted",
        description: "Thank you! Your internship application has been sent.",
      });
      form.reset();

    } catch (error: any) {
      console.error("Error submitting internship form:", error);
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: error.message || "There was an error sending your application. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="pt-24 lg:pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-4 lg:px-20 max-w-4xl">
          
          <div className="mb-8">
            <Link to="/careers" className="text-gray-400 hover:text-orange transition-colors font-outfit uppercase tracking-widest text-sm flex items-center gap-2">
              &larr; Back to Careers
            </Link>
          </div>

          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-outfit text-4xl lg:text-5xl font-light text-black leading-tight mb-4"
            >
              Apply for <span className="font-bold">Internship</span>
            </motion.h1>
            <p className="font-noto text-gray-500 text-lg">
              Fill out the form below to apply for an internship position.
            </p>
          </div>

          <div className="border-t border-gray-100 pt-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400 font-normal">Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          className="bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-orange transition-colors placeholder:text-gray-300"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 font-normal">Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            className="bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-orange transition-colors placeholder:text-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 font-normal">Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+233 54 123 4567"
                            {...field}
                            className="bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-orange transition-colors placeholder:text-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-400 font-normal">Cover Letter / Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us why you want to intern with us..."
                          className="min-h-[150px] bg-transparent resize-none p-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-orange transition-colors placeholder:text-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-6 pt-4">
                  <h3 className="font-outfit text-lg font-medium text-black border-b border-gray-100 pb-2">Portfolio & CV</h3>
                  <p className="text-sm text-gray-500 font-noto">Please provide a URL to your portfolio website, or attach a file containing your CV/Portfolio (max 5MB).</p>
                  
                  <FormField
                    control={form.control}
                    name="portfolioUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 font-normal">Portfolio URL (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://myportfolio.com"
                            {...field}
                            className="bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-orange transition-colors placeholder:text-gray-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="portfolioFile"
                    render={() => (
                      <FormItem>
                        <FormLabel className="text-gray-400 font-normal">Attach File (PDF, DOCX, etc.)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            {...fileRef}
                            className="bg-transparent border-0 border-b border-gray-200 rounded-none px-0 pt-2 focus-visible:ring-0 focus-visible:border-orange transition-colors file:bg-gray-100 file:px-4 file:py-1 file:border-0 file:rounded-full file:text-sm file:font-outfit hover:file:bg-orange hover:file:text-white file:transition-colors file:mr-4 cursor-pointer"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="pt-8">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-orange text-white h-14 text-lg rounded-none transition-colors uppercase tracking-widest font-outfit"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
    </div>
  );
}
