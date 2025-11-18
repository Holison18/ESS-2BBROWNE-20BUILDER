import { useRef } from "react";

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
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. torquent per conubia nostra inceptos himenaeos.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/89a15934719db6997c1ee257ae2709716f098f98?width=1610",
    bgColor: "#474747"
  },
  {
    number: "2",
    title: "Build",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. torquent per conubia nostra inceptos himenaeos.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/937b648c483b94f38e76431d4e567fa613cede29?width=1248",
    bgColor: "#2C2C2C"
  },
  {
    number: "3",
    title: "Innovate/Remodel",
    description: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. torquent per conubia nostra inceptos himenaeos.",
    image: "https://api.builder.io/api/v1/image/assets/TEMP/937b648c483b94f38e76431d4e567fa613cede29?width=1248",
    bgColor: "#1C1C1C"
  }
];

export default function StickyServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Sticky Text Section */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="max-w-xl">
              <h2 className="text-text-color font-outfit text-4xl lg:text-5xl xl:text-6xl font-semibold mb-6 leading-tight">
                What are the services we <span className="text-orange">provide?</span>
              </h2>
              <p className="text-text-color font-noto text-xl lg:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </div>
          </div>

          {/* Scrolling Cards Section */}
          <div className="space-y-44">
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
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="relative rounded-lg overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105"
    >
      <div 
        className="relative h-[600px] lg:h-[700px] p-8 lg:p-12 flex flex-col justify-end"
        style={{ backgroundColor: service.bgColor }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 p-2 opacity-90">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-auto object-cover border-4 border-white"
            style={{ maxHeight: '50%' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 mt-auto">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-white font-outfit text-4xl lg:text-5xl font-semibold uppercase">
              {service.title}
            </h3>
            <span className="text-white/50 font-outfit text-8xl lg:text-9xl font-semibold leading-none">
              {service.number}
            </span>
          </div>
          <p className="text-[#E3E3E3] font-noto text-lg lg:text-xl leading-relaxed max-w-2xl">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}
