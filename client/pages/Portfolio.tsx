import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import heroVideo from "../assets/backgroundvid.mp4";

type FilterType = "all" | "completed" | "ongoing" | "not-started";

interface Project {
  id: number;
  title: string;
  category: string;
  status: FilterType;
  description: string;
  image_url: string;
  gallery_urls?: string[];
}

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;
        setDbProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const filteredItems =
    activeFilter === "all"
      ? dbProjects
      : dbProjects.filter((p) => p?.status === activeFilter);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* 1. HERO SECTION - Video Background */}
      <section className="relative h-[60vh] lg:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="w-full h-full object-cover opacity-90"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white font-outfit text-5xl lg:text-8xl font-light tracking-tight mb-6"
          >
            Selected <span className="font-bold">Works</span><span className="text-orange">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-200 font-noto text-lg lg:text-xl font-light tracking-wide max-w-2xl mx-auto"
          >
            A curation of our finest architectural endeavors across different sectors.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-24 lg:py-32 flex-grow bg-white">
        <div className="container mx-auto px-4 lg:px-20">

          {/* 2. FILTER BAR - Minimal Text Links */}
          <div className="flex flex-wrap justify-center gap-8 lg:gap-16 mb-20 border-b border-gray-100 pb-8">
            {["all", "completed", "ongoing", "not-started"].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter as FilterType);
                  setVisibleCount(9);
                }}
                className={cn(
                  "font-outfit text-sm lg:text-base tracking-widest uppercase transition-all duration-300 relative py-2",
                  activeFilter === filter
                    ? "text-orange font-bold"
                    : "text-gray-400 hover:text-black"
                )}
              >
                {filter.replace("-", " ")}
                {/* Underline Animation */}
                {activeFilter === filter && (
                  <motion.div
                    layoutId="filter-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange"
                  />
                )}
              </button>
            ))}
          </div>

          {/* 3. PROJECTS GRID */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[350px] w-full rounded-none" />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 row-gap-16"
            >
              <AnimatePresence mode="popLayout">
                {visibleItems.map((project) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    className="group relative cursor-pointer"
                  >
                    <Link
                      to={`/portfolio/${project.id}`}
                      className="block w-full relative"
                    >
                      {/* Image Container */}
                      <div className="h-[400px] overflow-hidden mb-6 relative">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>

                        {/* Shadow Gradient Overlay for text readability on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Status Indicator (Integrated Minimal) */}
                        <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm z-10">
                          <span className={cn(
                            project.status === 'completed' ? "text-green-600" :
                              project.status === 'ongoing' ? "text-orange" : "text-gray-500"
                          )}>
                            {project.status === 'not-started' ? 'Pending' : project.status}
                          </span>
                        </div>
                      </div>

                      {/* Content (Below Image for cleaner look) */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-black font-outfit text-2xl font-medium group-hover:text-orange transition-colors mb-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-400 font-noto text-sm">
                            {project.category}
                          </p>
                        </div>
                        {/* Interactive Arrow or Detail */}
                        <div className="opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                          <span className="text-orange text-2xl">→</span>
                        </div>
                      </div>

                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {!isLoading && filteredItems.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">
                No projects found in this category.
              </p>
            </div>
          )}

          {hasMore && (
            <div className="flex justify-center mt-24">
              <Button
                onClick={handleLoadMore}
                variant="outline"
                className="border-gray-300 text-gray-600 hover:border-orange hover:bg-transparent hover:text-orange px-12 py-6 text-lg rounded-none uppercase tracking-widest transition-all duration-300"
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
