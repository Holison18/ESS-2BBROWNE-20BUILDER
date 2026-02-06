import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const CLIENT_LOGOS = [
    "https://placehold.co/190x80?text=Client+1",
    "https://placehold.co/204x80?text=Client+2",
    "https://placehold.co/290x80?text=Client+3",
    "https://placehold.co/190x80?text=Client+4",
    "https://placehold.co/204x80?text=Client+5",
    "https://placehold.co/290x80?text=Client+6",
    "https://placehold.co/190x80?text=Client+7",
    "https://placehold.co/204x80?text=Client+8",
    "https://placehold.co/290x80?text=Client+9",
    "https://placehold.co/190x80?text=Client+10",
];

export default function CarouselSection() {
    const [emblaRef] = useEmblaCarousel(
        { loop: true, align: "start", slidesToScroll: 1 },
        [Autoplay({ delay: 1500, stopOnInteraction: false })]
    );

    return (
        <div className="w-full relative">
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {CLIENT_LOGOS.map((src, index) => (
                        <div
                            key={index}
                            className="flex-[0_0_20%] min-w-0 flex justify-center items-center px-4"
                        >
                            <img
                                src={src}
                                alt={`Client ${index + 1}`}
                                className="h-16 lg:h-20 w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
