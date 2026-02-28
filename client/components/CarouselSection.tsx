import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import rwesckLogo from "../assets/clients_logo/RWESCK.png";
import smsLogo from "../assets/clients_logo/SMS.png";
import engineeringLogo from "../assets/clients_logo/engineering.png";
import kcarpLogo from "../assets/clients_logo/kcarp_logo.png";
import knustLogo from "../assets/clients_logo/knust_logo.png";
import mastercardLogo from "../assets/clients_logo/mastercard.png";
import ncelLogo from "../assets/clients_logo/ncel_logo.png";

const CLIENT_LOGOS = [
    rwesckLogo,
    smsLogo,
    engineeringLogo,
    kcarpLogo,
    knustLogo,
    mastercardLogo,
    ncelLogo,
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
                            className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] min-w-0 flex justify-center items-center px-4"
                        >
                            <img
                                src={src}
                                alt={`Client ${index + 1}`}
                                className="h-16 lg:h-20 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
