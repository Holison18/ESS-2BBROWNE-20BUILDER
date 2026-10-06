import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import aboutHeroImg from "@/assets/about_hero_image.jpg";
import teamGroupImg from "@/assets/Team_group.jpg";

export default function Careers() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="pt-24 lg:pt-32 pb-16 flex-grow">
        <div className="container mx-auto px-4 lg:px-20">
          
          {/* HERO SECTION */}
          <div className="mb-16 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-outfit text-5xl lg:text-7xl font-light text-black leading-tight mb-8"
            >
              Join Our <br className="hidden lg:block" />
              <span className="font-bold">Team</span> <br className="hidden lg:block" />
              <span className="text-orange">.</span>
            </motion.h1>
            <div className="w-24 h-1 bg-gray-100 mb-8 mx-auto lg:mx-0"></div>
            <p className="font-noto text-gray-500 text-lg max-w-md mx-auto lg:mx-0">
              We're always looking for passionate people to join us in bringing exceptional visions to life.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 pt-8">
            
            {/* LEFT SIDE: Careers */}
            <div className="group border border-gray-100 transition-colors overflow-hidden flex flex-col shadow-sm">
              <div className="h-64 lg:h-80 overflow-hidden relative">
                <img 
                  src={aboutHeroImg} 
                  alt="Careers" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col flex-grow">
                <h2 className="font-outfit text-3xl font-bold mb-6 flex items-center gap-3 flex-wrap">
                  Careers
                  <span className="text-sm font-medium uppercase tracking-widest text-gray-400 mt-1">• No Open Positions</span>
                </h2>
                <p className="font-noto text-gray-500 text-base leading-relaxed mb-8 flex-grow">
                  We are currently not hiring for any full-time positions. Please check back later or consider applying for an internship if you are a student or recent graduate.
                </p>
                
                <button 
                  disabled
                  className="w-full bg-gray-200 text-gray-400 h-14 text-lg rounded-none uppercase tracking-widest font-outfit cursor-not-allowed mt-auto"
                >
                  Apply for Career
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: Internships */}
            <Link to="/internships/apply" className="group border border-gray-100 hover:border-orange transition-colors flex flex-col overflow-hidden shadow-sm">
              <div className="h-64 lg:h-80 overflow-hidden relative">
                <img 
                  src={teamGroupImg} 
                  alt="Internships" 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col flex-grow">
                <h2 className="font-outfit text-3xl font-bold mb-6 flex items-center gap-3 flex-wrap">
                  Internships
                  <span className="text-sm font-medium uppercase tracking-widest text-orange mt-1">• Accepting Applications</span>
                </h2>
                <p className="font-noto text-gray-500 text-base leading-relaxed mb-8 flex-grow">
                  Looking to gain hands-on experience? Apply for an internship with us. We offer opportunities for passionate students and recent graduates to learn and grow.
                </p>
                
                <div 
                  className="w-full bg-black text-white group-hover:bg-orange h-14 text-lg rounded-none uppercase tracking-widest font-outfit flex items-center justify-center transition-colors mt-auto"
                >
                  Apply for Internship
                </div>
              </div>
            </Link>

          </div>
        </div>
      </main>
    </div>
  );
}
