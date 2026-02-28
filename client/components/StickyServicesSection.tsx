import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Service Images
import designImg from "@/assets/OurServices/Design.jpg";
import remodelImg from "@/assets/OurServices/Remodel.jpg";
import innovateImg from "@/assets/OurServices/Innovate.jpg";

const services = [
  {
    number: "01",
    title: "Design",
    description:
      "From initial concept to detailed blueprints, our talented designers create spaces that reflect your unique style and functionality.",
    image: designImg,
  },
  {
    number: "02",
    title: "Build",
    description:
      "Our skilled craftsmen employ the latest construction techniques to bring your vision to reality with precision and care.",
    image: remodelImg,
  },
  {
    number: "03",
    title: "Innovate",
    description:
      "Transform existing spaces into fresh, modern environments that optimize functionality and aesthetics.",
    image: innovateImg,
  },
];

export default function StickyServicesSection() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-20">

        {/* Header */}
        <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <h2 className="font-outfit text-4xl lg:text-6xl font-light text-black leading-tight">
              Our <span className="font-bold text-orange">Services</span>
            </h2>
          </div>
          <p className="font-noto text-gray-500 max-w-md text-lg">
            Comprehensive architectural solutions tailored to your unique vision and needs.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col lg:flex-row h-[800px] lg:h-[600px] gap-4">
          {services.map((service, index) => (
            <ServicePanel
              key={index}
              service={service}
              isActive={activeService === index}
              onClick={() => setActiveService(index)}
              onHover={() => setActiveService(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

function ServicePanel({
  service,
  isActive,
  onClick,
  onHover
}: {
  service: (typeof services)[0];
  isActive: boolean;
  onClick: () => void;
  onHover: () => void;
}) {
  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseEnter={onHover}
      className={cn(
        "relative overflow-hidden cursor-pointer rounded-2xl transition-all duration-700 ease-custom-ease",
        isActive ? "flex-[3] lg:flex-[2.5]" : "flex-[1]"
      )}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={service.image}
          alt={service.title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-1000",
            isActive ? "scale-105 grayscale-0" : "scale-125 grayscale"
          )}
        />
        <div className={cn(
          "absolute inset-0 transition-colors duration-700",
          isActive ? "bg-black/40" : "bg-black/70 hover:bg-black/60"
        )}></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 lg:p-12 z-10">

        {/* Number - Changes position based on state */}
        <motion.div
          layout
          className="absolute top-8 left-8 lg:top-12 lg:left-12"
        >
          <span className={cn(
            "font-outfit font-bold text-white/20 transition-all duration-500",
            isActive ? "text-6xl lg:text-7xl" : "text-4xl lg:text-5xl"
          )}>
            {service.number}
          </span>
        </motion.div>

        <div>
          {/* Title */}
          <motion.h3
            layout="position"
            className={cn(
              "font-outfit font-bold text-white uppercase tracking-wider mb-4 transition-all duration-500 origin-left",
              isActive ? "text-3xl lg:text-5xl" : "text-xl lg:text-2xl lg:-rotate-90 lg:whitespace-nowrap lg:translate-y-[-100px] lg:translate-x-2"
              // Rotate title vertically when collapsed on desktop
            )}
          >
            {service.title}
          </motion.h3>

          {/* Description & Line - Only visible when active */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="w-16 h-1 bg-orange mb-6"></div>
                <p className="font-noto text-gray-200 text-base lg:text-lg leading-relaxed max-w-lg">
                  {service.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </motion.div>
  );
}
