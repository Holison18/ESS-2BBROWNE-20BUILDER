import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Added framer-motion
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
// import logo from "../assets/logo.png"; // Removed

// Schema for form validation
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required." }),
  lastName: z.string().min(2, { message: "Last name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  countryCode: z.string().default("+233"),
  phone: z.string().min(9, { message: "Phone number is required." }),
  subject: z.string().min(5, { message: "Subject is required." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+233",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Handle "Send Message" (Email Simulation)
  function onEmailSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // In a real app, you would call an API endpoint or EmailJS here.
    // For now, we simulate a success.
    setTimeout(() => {
      console.log("Email sent:", values);
      toast({
        title: "Message Sent",
        description:
          "We've received your message and will get back to you soon.",
      });
      setIsSubmitting(false);
      form.reset();
    }, 1000);
  }

  // Handle "Send to WhatsApp"
  function onWhatsAppSubmit() {
    const values = form.getValues();

    // Basic validation check before redirecting
    // We check manually because this button sits outside the main form submit flow
    if (!values.firstName || !values.message) {
      toast({
        variant: "destructive",
        title: "Incomplete Form",
        description: "Please fill in at least your name and message.",
      });
      return;
    }

    const phoneNumber = "2334154906"; // Your Company WhatsApp Number
    const text = `Hello, I am ${values.firstName} ${values.lastName}.%0A%0ASubject: ${values.subject}%0A%0A${values.message}`;

    // Open WhatsApp API link
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, "_blank");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation - Removed (Moved to Layout) */}

      <main className="pt-24 lg:pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-4 lg:px-20">

          {/* 1. HERO & INFO SECTION */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mb-24 items-start">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="font-outfit text-5xl lg:text-7xl font-light text-black leading-tight mb-8"
              >
                Let's Build <br />
                <span className="font-bold">Something</span> <br />
                <span className="text-orange">Great.</span>
              </motion.h1>
              <div className="w-24 h-1 bg-gray-100 mb-8"></div>
              <p className="font-noto text-gray-500 text-lg max-w-md">
                Whether it's a new residential project, a commercial complex, or a renovation, we're here to bring your vision to life.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="p-8 border border-gray-100 hover:border-orange/20 transition-colors group">
                <h3 className="font-outfit text-xl font-bold mb-4 group-hover:text-orange transition-colors">Office</h3>
                <p className="font-noto text-gray-500 text-sm leading-relaxed">
                  123 Architectural Avenue,<br />
                  East Legon, Accra<br />
                  Ghana
                </p>
              </div>
              <div className="p-8 border border-gray-100 hover:border-orange/20 transition-colors group">
                <h3 className="font-outfit text-xl font-bold mb-4 group-hover:text-orange transition-colors">Contact</h3>
                <p className="font-noto text-gray-500 text-sm leading-relaxed mb-2">
                  <a href="mailto:info@essbrowne.com" className="hover:text-black transition-colors">info@essbrowne.com</a>
                </p>
                <p className="font-noto text-gray-500 text-sm leading-relaxed">
                  <a href="tel:+233541234567" className="hover:text-black transition-colors">+233 54 123 4567</a>
                </p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 border-t border-gray-100 pt-16">
            {/* LEFT SIDE: Minimal Form */}
            <div>
              <h2 className="font-outfit text-2xl font-bold mb-8">Send us a message</h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onEmailSubmit)}
                  className="space-y-8"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400 font-normal">First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400 font-normal">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
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

                  {/* Phone Number with Country Code */}
                  <div className="grid grid-cols-[100px_1fr] gap-4">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-400 font-normal">Code</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus:ring-0 focus:border-orange shadow-none">
                                <SelectValue placeholder="+233" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="+233">🇬🇭 +233</SelectItem>
                              <SelectItem value="+1">🇺🇸 +1</SelectItem>
                              <SelectItem value="+44">🇬🇧 +44</SelectItem>
                              <SelectItem value="+234">🇳🇬 +234</SelectItem>
                            </SelectContent>
                          </Select>
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
                              placeholder="54 123 4567"
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
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 font-normal">Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Inquiry"
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
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-400 font-normal">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-[100px] bg-transparent resize-none p-0 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-orange transition-colors placeholder:text-gray-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-black hover:bg-orange text-white h-14 text-lg rounded-none transition-colors uppercase tracking-widest font-outfit"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    <Button
                      type="button"
                      onClick={onWhatsAppSubmit}
                      variant="outline"
                      className="flex-1 border-gray-200 text-gray-500 hover:border-green-500 hover:text-green-600 hover:bg-white h-14 text-lg rounded-none transition-colors flex items-center gap-2 uppercase tracking-widest font-outfit"
                    >
                      WhatsApp Us
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* RIGHT SIDE: Map */}
            <div className="h-full min-h-[400px]">
              <div className="w-full h-full rounded-none overflow-hidden bg-gray-100 relative">
                {/* Map Overlay to desaturate */}
                <div className="absolute inset-0 pointer-events-none z-10 mix-blend-saturation bg-white/0"></div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.6207079843944!2d-1.6244157!3d6.6915481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDEnMjkuNiJOIDHCsDM3JzI3LjkiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) opacity(0.8)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ESS + BROWNE Office Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
