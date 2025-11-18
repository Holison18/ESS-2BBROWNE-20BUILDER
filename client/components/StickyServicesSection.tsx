import { useRef } from "react";
import { motion } from "framer-motion";

interface ServiceCard {
  number: string;
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

const services: ServiceCard[] = [
  {
    number: "1",
    title: "Design",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. torquent per conubia nostra inceptos himenaeos.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/89a15934719db6997c1ee257ae2709716f098f98?width=1610",
    bgColor: "#474747",
  },
  {
    number: "2",
    title: "Build",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. torquent per conubia nostra inceptos himenaeos.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/937b648c483b94f38e76431d4e567fa613cede29?width=1248",
    bgColor: "#2C2C2C",
  },
  {
    number: "3",
    title: "Innovate/Remodel",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. torquent per conubia nostra inceptos himenaeos.",
    image:
      "https://api.builder.io/api/v1/image/assets/TEMP/937b648c483b94f38e76431d4e567fa613cede29?width=1248",
    bgColor: "#1C1C1C",
  },
];

export default function StickyServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative bg-white py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* LEFT COLUMN (Sticky Title) */}
          <div className="lg:w-1/3">
            <div className="sticky top-32">
              <h2 className="text-text-color font-outfit text-4xl lg:text-6xl font-bold leading-tight mb-6">
                What are the services we <span className="text-orange">provide?</span>
              </h2>
              <p className="text-text-grey font-noto text-lg lg:text-xl max-w-sm">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN (Scrolling Cards) */}
          <div className="lg:w-2/3 space-y-24">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: ServiceCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative mb-24 last:mb-0"
    >
      {/* Image Container - Taller and cleaner */}
      <div className="relative w-full h-[350px] lg:h-[500px] overflow-hidden rounded-xl">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
        />
        {/* Gradient Overlay to make text pop if it overlaps */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
      </div>

      {/* Content Box - Floating card style */}
      <div className="relative z-10 mx-4 -mt-16 lg:-mt-32 lg:ml-12 lg:mr-0 lg:w-[90%] bg-[#212121] p-8 lg:p-12 rounded-lg shadow-2xl border-t border-white/10">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
          
          {/* Title and Number Wrapper */}
          <div className="relative">
             {/* Big Number - Background Layer */}
            <span className="absolute -top-10 -left-6 text-8xl lg:text-9xl font-black text-white/5 select-none pointer-events-none z-0">
              {service.number}
            </span>
            
            {/* Title - Foreground */}
            <h3 className="relative z-10 font-outfit text-3xl lg:text-5xl font-bold uppercase tracking-wider text-white">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 font-noto text-lg lg:text-xl leading-relaxed max-w-2xl">
          {service.description}
        </p>
        
        {/* Decorative Line */}
        <div className="w-16 h-1 bg-orange mt-8" />
      </div>
    </motion.div>
  );
}