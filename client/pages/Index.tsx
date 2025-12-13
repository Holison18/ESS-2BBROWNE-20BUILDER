import { Link } from "react-router-dom";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/backgroundvid.mp4";
import ImageLightbox from "../components/ImageLightbox";
import CarouselSection from "../components/CarouselSection";

// Import Images
import viewplaneMain from "../assets/Featured Projects/viewplane_main.jpg";
import viewplaneFront from "../assets/Featured Projects/viewplane_front.jpg";
import viewplaneSide1 from "../assets/Featured Projects/viewplane_side1.jpg";
import viewplaneSide2 from "../assets/Featured Projects/viewplane_side2.jpg";
import edintronMain from "../assets/Featured Projects/edintron_main.jpg";
import edintronFront from "../assets/Featured Projects/edintron_front.jpg";
import edintronSide1 from "../assets/Featured Projects/edintron_side1.jpg";
import edintronSide2 from "../assets/Featured Projects/edintron_side2.jpg";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.round(latest) + suffix;
      }
    });
  }, [springValue, suffix]);

  return <span ref={ref} />;
}

export default function Index() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* 1. HERO SECTION - Minimalistic & Cinematic */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            className="w-full h-full object-cover opacity-85"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content - Centered & Clean */}
        <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white/80 font-outfit text-sm lg:text-base font-bold tracking-[0.3em] uppercase mb-6"
          >
            From
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white font-outfit text-6xl lg:text-9xl font-light tracking-tight leading-none mb-8"
          >
            Concept to <br />
            <span className="font-bold">Creation</span><span className="text-orange">.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              to="/portfolio"
              className="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out border border-white rounded-full shadow-md hover:bg-white hover:text-black"
            >
              <span className="font-outfit text-lg tracking-wider uppercase">View Projects</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO SECTION - Minimal Text + Stats */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-black font-outfit text-4xl lg:text-6xl font-light mb-8 leading-tight">
                ESS + <span className="font-bold">BROWNE</span>
              </h2>
              <p className="text-gray-600 font-noto text-xl lg:text-2xl font-light leading-relaxed mb-8">
                A dynamic design and build company transforming visions into <span className="text-orange italic">reality</span>.
              </p>
              <p className="text-gray-500 font-noto text-lg leading-relaxed mb-8">
                With a passion for design excellence and a commitment to quality construction, we create functional, sustainable, and aesthetically pleasing spaces.
              </p>
              <Link to="/about" className="text-orange font-bold font-outfit uppercase tracking-widest border-b-2 border-orange pb-1 hover:text-black hover:border-black transition-all">
                More About Us
              </Link>
            </motion.div>

            {/* Right: Counters - Minimal Grid */}
            <div className="grid grid-cols-2 gap-y-12 gap-x-8">
              {[
                { val: 10, label: "Years Experience" },
                { val: 50, label: "Completed Projects" },
                { val: 15, label: "Happy Clients" },
                { val: 5, label: "Awards Won" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col border-l border-gray-200 pl-6"
                >
                  <span className="font-outfit text-5xl lg:text-6xl font-bold text-black mb-2">
                    <Counter value={stat.val} suffix="+" />
                  </span>
                  <span className="font-noto text-gray-400 text-sm uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3. SHOWCASE VIDEO SECTION - "Projects Video is a Must" */}
      <section className="relative py-24 lg:py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
        </div>
        <div className="container mx-auto px-4 lg:px-20 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-white font-outfit text-3xl lg:text-5xl font-light mb-8">
              See Our Work in Motion
            </h2>
            <button className="bg-orange text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto hover:scale-110 transition-transform shadow-lg shadow-orange/20">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* 4. FEATURED PROJECTS - Refined Layout */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-20">

          <div className="flex items-end justify-between mb-16 px-4">
            <h2 className="font-outfit text-4xl lg:text-6xl font-light text-black">Featured <span className="font-bold">Projects</span></h2>
            <Link to="/portfolio" className="hidden lg:block text-gray-400 hover:text-orange transition-colors font-outfit tracking-widest uppercase">View All</Link>
          </div>

          <div className="space-y-32">

            {/* Project 1: Viewplane */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[500px] lg:h-[800px] overflow-hidden mb-8" onClick={() => openLightbox([viewplaneMain, viewplaneFront, viewplaneSide1, viewplaneSide2], 0)}>
                <img
                  src={viewplaneMain}
                  alt="Viewplane Project"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-t border-gray-200 pt-6">
                <div>
                  <Link to="/portfolio">
                    <h3 className="font-outfit text-3xl lg:text-5xl font-bold text-black mb-2 group-hover:text-orange transition-colors">Viewpane</h3>
                  </Link>
                  <p className="font-noto text-gray-500">Residential Complex</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className="font-outfit text-lg font-bold text-gray-300 group-hover:text-black transition-colors">2024</span>
                </div>
              </div>
            </motion.div>

            {/* Project 2: Edintron */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[500px] lg:h-[800px] overflow-hidden mb-8" onClick={() => openLightbox([edintronMain, edintronFront, edintronSide1, edintronSide2], 0)}>
                <img
                  src={edintronSide2}
                  alt="Edintrom Project"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end border-t border-gray-200 pt-6">
                <div>
                  <Link to="/portfolio">
                    <h3 className="font-outfit text-3xl lg:text-5xl font-bold text-black mb-2 group-hover:text-orange transition-colors">Edintron</h3>
                  </Link>
                  <p className="font-noto text-gray-500">Commercial Hub</p>
                </div>
                <div className="mt-4 lg:mt-0">
                  <span className="font-outfit text-lg font-bold text-gray-300 group-hover:text-black transition-colors">2023</span>
                </div>
              </div>
            </motion.div>

          </div>

          <div className="mt-16 text-center lg:hidden">
            <Link to="/portfolio" className="text-gray-400 hover:text-orange transition-colors font-outfit tracking-widest uppercase border-b border-gray-200 pb-1">View All Projects</Link>
          </div>

        </div>
      </section>

      {/* 5. CLIENTS - Clean Header */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <h2 className="text-center font-outfit text-2xl font-light text-gray-400 uppercase tracking-[0.2em] mb-16">
            Trusted By
          </h2>
          <div className="px-4 lg:px-0">
            <CarouselSection />
          </div>
        </div>
      </section>

      {/* Image Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
}
