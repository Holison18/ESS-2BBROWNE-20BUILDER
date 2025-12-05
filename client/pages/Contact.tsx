import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import logo from "../assets/logo.png";

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
      {/* Navigation */}
      <nav className="relative top-0 left-0 right-0 z-50 bg-white py-4 lg:py-6">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between py-2 lg:py-2">
            <Link to="/">
              <img
                src={logo}
                alt="ESS + BROWNE"
                className="h-10 lg:h-14 w-auto cursor-pointer object-contain"
              />
            </Link>
            <div className="hidden md:flex items-center gap-8 lg:gap-12 font-noto text-base lg:text-lg font-medium tracking-wide text-black">
              <Link to="/" className="hover:text-orange transition-colors">
                HOME
              </Link>
              <Link to="/about" className="hover:text-orange transition-colors">
                ABOUT US
              </Link>
              <Link
                to="/portfolio"
                className="hover:text-orange transition-colors"
              >
                PORTFOLIO
              </Link>
              <Link to="/contact" className="text-orange">
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 lg:pt-24 pb-16 flex-grow">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Header */}
          <div className="mb-12 lg:mb-16">
            <p className="text-text-color font-outfit text-lg font-medium mb-2">
              Get in Touch
            </p>
            <h1 className="text-orange font-outfit text-4xl lg:text-6xl font-bold mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-gray-500 font-noto text-lg max-w-2xl">
              Have a project in mind? We'd love to hear from you. Fill out the
              form below or visit us at our office.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
            {/* LEFT SIDE: Contact Form */}
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onEmailSubmit)}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="John"
                              {...field}
                              className="bg-gray-50 h-12 border-gray-200 focus:border-orange"
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
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Doe"
                              {...field}
                              className="bg-gray-50 h-12 border-gray-200 focus:border-orange"
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
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            {...field}
                            className="bg-gray-50 h-12 border-gray-200 focus:border-orange"
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
                          <FormLabel>Code</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-gray-50 h-12 border-gray-200 focus:border-orange">
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
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="54 123 4567"
                              {...field}
                              className="bg-gray-50 h-12 border-gray-200 focus:border-orange"
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
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Project Inquiry"
                            {...field}
                            className="bg-gray-50 h-12 border-gray-200 focus:border-orange"
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your project..."
                            className="min-h-[150px] bg-gray-50 resize-none p-4 border-gray-200 focus:border-orange"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-text-color hover:bg-orange text-white h-12 text-lg rounded-full transition-colors"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    <Button
                      type="button"
                      onClick={onWhatsAppSubmit}
                      variant="outline"
                      className="flex-1 border-green-600 text-green-600 hover:bg-green-50 h-12 text-lg rounded-full transition-colors flex items-center gap-2"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.472 14.382C17.115 14.323 15.481 13.507 15.194 13.471C14.907 13.435 14.596 13.543 14.309 13.974C14.022 14.405 13.21 15.353 12.947 15.64C12.684 15.927 12.373 15.963 11.99 15.748C11.607 15.533 10.387 15.118 8.974 13.824C7.861 12.804 7.144 11.532 6.929 11.125C6.714 10.718 6.906 10.518 7.1 10.325C7.275 10.151 7.491 9.87 7.682 9.655C7.873 9.44 7.969 9.273 8.089 9.034C8.209 8.795 8.137 8.579 8.041 8.388C7.945 8.197 7.203 6.308 6.916 5.542C6.629 4.776 6.342 4.896 6.127 4.896C5.936 4.896 5.721 4.896 5.506 4.896C5.291 4.896 4.932 4.992 4.645 5.327C4.358 5.662 3.521 6.475 3.521 8.127C3.521 9.779 4.693 11.333 4.86 11.572C5.027 11.811 7.155 15.182 10.554 16.545C13.953 17.908 13.953 17.454 14.551 17.382C15.149 17.31 16.488 16.568 16.775 15.731C17.062 14.894 17.062 14.177 16.966 14.034C16.87 13.89 16.655 13.818 16.296 13.746H17.472V14.382ZM12.038 22C6.509 22 2 17.491 2 11.962C2 6.433 6.509 1.924 12.038 1.924C17.567 1.924 22.076 6.433 22.076 11.962C22.076 17.491 17.567 22 12.038 22Z"
                          fill="currentColor"
                        />
                      </svg>
                      WhatsApp
                    </Button>
                  </div>
                </form>
              </Form>
            </div>

            {/* RIGHT SIDE: Map */}
            <div className="h-full">
              <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-lg border border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.6207079843944!2d-1.6244157!3d6.6915481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwNDEnMjkuNiJOIDHCsDM3JzI3LjkiVw!5e0!3m2!1sen!2sgh!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
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

      {/* Footer */}
      <footer className="main-footer pt-24 pb-8 lg:pt-32 lg:pb-12 mt-auto">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-4">
                  Head Office
                </h3>
                <p className="text-text-grey font-noto text-lg lg:text-xl leading-relaxed">
                  69 Ferry Pass Street,
                  <br />
                  Deduako - Kodiekrom, Kumasi
                </p>
              </div>

              <p className="text-text-grey font-noto text-lg lg:text-xl">
                info@essbrown.com
              </p>

              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-4">
                  Contact:
                </h3>
                <p className="text-text-grey font-noto text-lg lg:text-xl">
                  (+233) 415 4906 | (+233) 451 7903
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-6">
                Socials
              </h3>
              <div className="space-y-4 mb-8">
                <a
                  href="#"
                  className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                >
                  {/* SVG omitted for brevity, keeping same as before */}
                  Instagram
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                >
                  {/* SVG omitted for brevity */}
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                >
                  {/* SVG omitted for brevity */}
                  YouTube
                </a>
              </div>

              <button className="bg-home-button hover:bg-orange transition-colors rounded-full px-8 py-4 text-text-color font-noto text-lg lg:text-xl flex items-center gap-3">
                Send Message
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.3999 6.54706C24.1774 5.31254 22.7213 4.33369 21.1166 3.66755C19.5119 3.00141 17.7907 2.66131 16.0533 2.66706C8.77328 2.66706 2.83994 8.6004 2.83994 15.8804C2.83994 18.2137 3.45328 20.4804 4.59994 22.4804L2.73328 29.3337L9.73328 27.4937C11.6666 28.5471 13.8399 29.1071 16.0533 29.1071C23.3333 29.1071 29.2666 23.1737 29.2666 15.8937C29.2666 12.3604 27.8933 9.0404 25.3999 6.54706ZM16.0533 26.8671C14.0799 26.8671 12.1466 26.3337 10.4533 25.3337L10.0533 25.0937L5.89328 26.1871L6.99994 22.1337L6.73328 21.7204C5.63667 19.9698 5.05451 17.9461 5.05328 15.8804C5.05328 9.82706 9.98661 4.89373 16.0399 4.89373C18.9733 4.89373 21.7333 6.0404 23.7999 8.1204C24.8234 9.13888 25.6345 10.3505 26.1861 11.6848C26.7377 13.0192 27.0189 14.4498 27.0133 15.8937C27.0399 21.9471 22.1066 26.8671 16.0533 26.8671ZM22.0799 18.6537C21.7466 18.4937 20.1199 17.6937 19.8266 17.5737C19.5199 17.4671 19.3066 17.4137 19.0799 17.7337C18.8533 18.0671 18.2266 18.8137 18.0399 19.0271C17.8533 19.2537 17.6533 19.2804 17.3199 19.1071C16.9866 18.9471 15.9199 18.5871 14.6666 17.4671C13.6799 16.5871 13.0266 15.5071 12.8266 15.1737C12.6399 14.8404 12.7999 14.6671 12.9733 14.4937C13.1199 14.3471 13.3066 14.1071 13.4666 13.9204C13.6266 13.7337 13.6933 13.5871 13.7999 13.3737C13.9066 13.1471 13.8533 12.9604 13.7733 12.8004C13.6933 12.6404 13.0266 11.0137 12.7599 10.3471C12.4933 9.70706 12.2133 9.78706 12.0133 9.77373H11.3733C11.1466 9.77373 10.7999 9.85373 10.4933 10.1871C10.1999 10.5204 9.34661 11.3204 9.34661 12.9471C9.34661 14.5737 10.5333 16.1471 10.6933 16.3604C10.8533 16.5871 13.0266 19.9204 16.3333 21.3471C17.1199 21.6937 17.7333 21.8937 18.2133 22.0404C18.9999 22.2937 19.7199 22.2537 20.2933 22.1737C20.9333 22.0804 22.2533 21.3737 22.5199 20.6004C22.7999 19.8271 22.8001 19.1737 22.7067 19.0271C22.6134 18.8804 22.4134 18.8137 22.0801 18.6537Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-start lg:items-end mt-8 lg:mt-0">
              <div className="font-outfit font-black text-6xl lg:text-8xl leading-[0.85] opacity-50 text-[#BEBEBE] hover:opacity-100 transition-opacity cursor-default text-left">
                <div className="block">ESS</div>
                <div className="flex items-center whitespace-nowrap">
                  <span className="text-orange mr-4">+</span>
                  <span>BROWNE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <p className="text-text-grey font-noto text-md lg:text-md">
              Copyright 2025. ESS+BROWNE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
