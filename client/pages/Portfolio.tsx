import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroVideo from "../assets/backgroundvid.mp4";

import { Project, getMainCategory, ProjectCategory } from "@/types";

import { CATEGORY_MAP } from "@/types";

// ... (keep imports)

// --- Randomization Utilities ---
const seededRandom = (seed: number) => {
  const m = 0x80000000;
  const a = 1103515245;
  const c = 12345;
  let currentSeed = seed;

  return () => {
    currentSeed = (a * currentSeed + c) % m;
    return currentSeed / (m - 1);
  };
};

const shuffleArray = <T,>(array: T[], seed: number) => {
  const rng = seededRandom(seed);
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
// -------------------------------

export default function Portfolio() {
  // 1. Main Category State (Default: Exterior, Persisted in Session Storage)
  const [activeMainFilter, setActiveMainFilter] = useState<ProjectCategory>(() => {
    return (sessionStorage.getItem("portfolioMainFilter") as ProjectCategory) || "Exterior";
  });

  // 2. Sub Category State (Default: All for that main category, or explicit sub)
  // allowing null or "All" to show everything in that main category
  const [activeSubFilter, setActiveSubFilter] = useState<string>("All");

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

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

        // Randomize based on 4-hour window
        // We divide the current timestamp by the duration of the window (4 hours in ms)
        // This gives us a unique integer for every 4-hour block.
        const timeBlock = 4 * 60 * 60 * 1000; // 4 hours in milliseconds
        const seed = Math.floor(Date.now() / timeBlock);

        const shuffledData = shuffleArray(data || [], seed);

        setDbProjects(shuffledData);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchProjects();
  }, []);

  // FILTER LOGIC
  const filteredItems = dbProjects.filter((p) => {
    const mainCat = getMainCategory(p.category);
    if (mainCat !== activeMainFilter) return false; // Must match main category

    // If sub-filter is "All", show everything in this main category
    if (activeSubFilter === "All") return true;

    // Otherwise match specific sub-category
    return p.category === activeSubFilter;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleMainFilterChange = (cat: ProjectCategory) => {
    setActiveMainFilter(cat);
    sessionStorage.setItem("portfolioMainFilter", cat);
    setActiveSubFilter("All"); // Reset sub filter when switching main
    setVisibleCount(9);
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
            A curation of our finest architectural endeavors.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 lg:py-24 flex-grow bg-white">
        <div className="container mx-auto px-4 lg:px-20">

          {/* 2. FILTER SECTION */}
          <div className="mb-20 space-y-8">

            {/* LEVEL 1: Main Categories (Big, Centered) */}
            <div className="flex justify-center gap-12 lg:gap-24 border-b border-gray-100/50 pb-6">
              {(["Exterior", "Interior"] as ProjectCategory[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleMainFilterChange(filter)}
                  className={cn(
                    "font-outfit text-2xl lg:text-4xl transition-all duration-300 relative py-2",
                    activeMainFilter === filter
                      ? "text-black font-medium"
                      : "text-gray-300 hover:text-gray-400 font-light"
                  )}
                >
                  {filter}
                  {/* Minimal Dot Indicator instead of underline for premium feel */}
                  {activeMainFilter === filter && (
                    <motion.div
                      layoutId="main-filter-dot"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-orange"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* LEVEL 2: Sub Categories (Scrollable Horizontal List) */}
            <div className="relative group/filters max-w-5xl mx-auto px-12">

              {/* Left Arrow */}
              <button
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-400 hover:text-black hover:scale-110 transition-all opacity-0 group-hover/filters:opacity-100 hidden lg:block"
                aria-label="Scroll left"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>

              {/* Scroll Container */}
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto gap-3 lg:gap-4 no-scrollbar scroll-smooth px-4 snap-x snap-mandatory items-center"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <button
                  onClick={() => setActiveSubFilter("All")}
                  className={cn(
                    "flex-shrink-0 px-5 py-2 rounded-full text-sm font-outfit tracking-wider transition-all duration-300 border snap-center",
                    activeSubFilter === "All"
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                  )}
                >
                  ALL
                </button>

                {CATEGORY_MAP[activeMainFilter].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubFilter(sub)}
                    className={cn(
                      "flex-shrink-0 px-5 py-2 rounded-full text-sm font-outfit tracking-wider transition-all duration-300 border snap-center",
                      activeSubFilter === sub
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                    )}
                  >
                    {sub.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Right Arrow */}
              <button
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 text-gray-400 hover:text-black hover:scale-110 transition-all opacity-0 group-hover/filters:opacity-100 hidden lg:block"
                aria-label="Scroll right"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>

            </div>
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
                      <div className="h-[400px] overflow-hidden mb-6 relative bg-gray-100">
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
