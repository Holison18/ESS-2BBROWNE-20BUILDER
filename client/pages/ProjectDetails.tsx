import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Skeleton } from "@/components/ui/skeleton";
import ImageLightbox from "@/components/ImageLightbox";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Project } from "@/types";

const STATUS_LABELS: Record<string, string> = {
  "completed": "Completed",
  "ongoing": "In Progress",
  "not-started": "Not Started",
};



export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    // Scroll to top on load
    window.scrollTo(0, 0);

    async function fetchProject() {
      if (!id) return;

      // If we are looking at the specific static ID, stick to static data for demo if DB is empty
      // BUT, since we implemented Admin, let's try to fetch real data.
      // If fetch fails or returns null, we might fall back or just show empty.

      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          // If error (e.g. invalid ID for new projects), we might just log it 
          console.log("Fetch error", error);
          if (!data) {
            setIsLoading(false);
            return;
          }
          throw error;
        }

        if (data) {
          setProject(data);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  console.log("RENDER DEBUG: ", { isLoading, project });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link to="/portfolio" className="text-orange hover:underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  // Prepare all images for the lightbox (Main + Gallery)
  // We can decide if Drawings should be in lightbox too. 
  // User said "aside the images of the project there should be a part where maybe just the drawings can show".
  // Let's keep lightbox for real photos for now, unless requested.
  const allImages = [project.image_url, ...(project.gallery_urls || [])];



  return (
    <div className="min-h-screen bg-white">
      {/* Navigation - Removed (Moved to Layout) */}

      <main>
        {/* 1. HERO SECTION - Full Height */}
        <section className="relative h-[85vh] lg:h-screen w-full bg-gray-100 overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full"
            onClick={() => openLightbox(0)}
          >
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-full transform group-hover:scale-105 transition-transform duration-2000"
            />
            {/* Gradient Overlay for text readability if needed, but keeping it clean for now */}
            <div className="absolute inset-0 bg-black/10"></div>
          </motion.div>

          {/* Floating Title (Bottom Left) - Aligned with Header */}
          <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
            {/* GRADIENT OVERLAY for contrast */}
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            <div className="relative container mx-auto px-4 lg:px-20 pb-12 lg:pb-20">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="font-outfit text-4xl lg:text-7xl font-bold uppercase leading-none drop-shadow-xl text-white/90"
              >
                {project.title}
              </motion.h1>

              {/* Tagline / Subheading */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="font-noto text-lg lg:text-2xl font-light mt-4 tracking-wider opacity-80 text-white drop-shadow-lg"
              >
                {project.tagline || project.category}
              </motion.p>
            </div>
          </div>
        </section>

        {/* 2. DESCRIPTION & METADATA GRID */}
        <section className="py-24 lg:py-32 px-4 lg:px-12 bg-white">
          <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Column: Brief / Metadata */}
            <div className="lg:col-span-4 space-y-12">
              <div>
                <h3 className="font-outfit text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-4">
                  The Brief
                </h3>
                <div className="h-px w-12 bg-orange mb-6"></div>
              </div>

              <div className="grid grid-cols-1 gap-8">
                <div>
                  <span className="block font-outfit text-xs font-bold uppercase text-gray-400 mb-1">Type</span>
                  <span className="font-noto text-lg text-black">{project.category}</span>
                </div>
                {/* Placeholder for more metadata if added to DB later (Location, Year, Area) */}
                <div>
                  <span className="block font-outfit text-xs font-bold uppercase text-gray-400 mb-1">Status</span>
                  <span className="font-noto text-lg text-black">
                    {STATUS_LABELS[project.status] || project.status}
                  </span>
                </div>

                {project.location && (
                  <div>
                    <span className="block font-outfit text-xs font-bold uppercase text-gray-400 mb-1">Location</span>
                    <span className="font-noto text-lg text-black">{project.location}</span>
                  </div>
                )}

                {project.approx_area && (
                  <div>
                    <span className="block font-outfit text-xs font-bold uppercase text-gray-400 mb-1">Approx. Area</span>
                    <span className="font-noto text-lg text-black">{project.approx_area}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Description */}
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-outfit text-2xl lg:text-4xl font-light leading-snug text-black mb-8">
                  {/* Create a 'lead' sentence logic if possible, otherwise just use description */}
                  {(project.description || "").split('.')[0]}.
                </h2>
                <div className="font-noto text-base lg:text-lg text-gray-600 leading-relaxed space-y-6 whitespace-pre-wrap columns-1 lg:columns-2 gap-12">
                  {(project.description || "").split('.').slice(1).join('.').trim()}
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        {/* NEW: ARCHITECTURAL DRAWINGS CAROUSEL */}
        {(project.drawings && project.drawings.length > 0) && (
          <section className="py-16 lg:py-24 px-4 bg-gray-50 border-t border-b">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h3 className="font-outfit text-2xl lg:text-3xl font-light uppercase tracking-widest text-black">
                  Architecture & Plans
                </h3>
                <div className="w-16 h-0.5 bg-orange mx-auto mt-6"></div>
              </div>

              <div className="px-12"> {/* Padding for Arrows */}
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent>
                    {project.drawings.map((drawing, index) => (
                      <CarouselItem key={index} className="md:basis-1/2 lg:basis-2/3 pl-6">
                        <div className="p-1 h-full">
                          <div className="flex flex-col h-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-lg overflow-hidden mb-6 cursor-pointer group">
                              <img
                                src={drawing.url}
                                alt={drawing.description}
                                className="w-full h-full object-contain mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
                              />
                            </div>
                            <div className="mt-auto text-center">
                              <p className="font-outfit text-sm font-bold tracking-wider uppercase text-gray-400 mb-1">Drawing {index + 1}</p>
                              <p className="font-noto text-xl text-black">
                                {drawing.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-6 lg:-left-12 h-12 w-12 border-gray-200" />
                  <CarouselNext className="-right-6 lg:-right-12 h-12 w-12 border-gray-200" />
                </Carousel>
              </div>
            </div>
          </section>
        )}

        {/* 3. GALLERY SECTION - Bento Grid Layout */}
        {(project.gallery_urls && project.gallery_urls.length > 0) && (
          <section className="px-4 lg:px-12 py-24 lg:py-32 bg-white">
            <div className="container mx-auto mb-16 px-4">
              <h3 className="font-outfit text-xl font-bold uppercase text-gray-300">Project Gallery</h3>
            </div>
            <div className="container mx-auto">
              {/* Added grid-flow-dense to help fill any tiny gaps if resizing occurs, though our math is perfect */}
              <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[300px] gap-4 grid-flow-dense">
                {project.gallery_urls.map((url, index) => {
                  const lightboxIndex = index + 1;

                  // Perfect 16-cell block pattern (repeats every 7 items)
                  // Total cells: 4 + 2 + 1 + 1 + 2 + 2 + 4 = 16 cells (4 perfect rows)
                  const patternIndex = index % 7;
                  let spanClass = "md:col-span-1 md:row-span-1";

                  if (patternIndex === 0) spanClass = "md:col-span-2 md:row-span-2"; // 2x2 (Top Left)
                  else if (patternIndex === 1) spanClass = "md:col-span-2 md:row-span-1"; // 2x1 (Top Right)
                  else if (patternIndex === 2) spanClass = "md:col-span-1 md:row-span-1"; // 1x1 (Mid Right 1)
                  else if (patternIndex === 3) spanClass = "md:col-span-1 md:row-span-1"; // 1x1 (Mid Right 2)
                  else if (patternIndex === 4) spanClass = "md:col-span-1 md:row-span-2"; // 1x2 (Bot Left 1)
                  else if (patternIndex === 5) spanClass = "md:col-span-1 md:row-span-2"; // 1x2 (Bot Left 2)
                  else if (patternIndex === 6) spanClass = "md:col-span-2 md:row-span-2"; // 2x2 (Bot Right)

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className={`relative cursor-pointer group overflow-hidden rounded-none ${spanClass}`}
                      onClick={() => openLightbox(lightboxIndex)}
                    >
                      <img
                        src={url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 block"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Lightbox Component */}
      <ImageLightbox
        images={allImages}
        initialIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
