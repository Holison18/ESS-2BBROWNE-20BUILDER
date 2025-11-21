import { Link } from "react-router-dom";
import StickyServicesSection from "@/components/StickyServicesSection";
import { motion } from "framer-motion"; // Add this import
import logo from "@/assets/logo.png";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between py-4 lg:py-6">
            <Link to="/">
              <img
                src={logo}
                alt="ESS + BROWNE"
                className="h-8 lg:h-13 w-22 lg:w-32 cursor-pointer"
              />
            </Link>
            <div className="hidden md:flex items-center gap-8 lg:gap-12 text-text-color font-noto text-base lg:text-lg">
              <Link to="/" className="hover:text-orange transition-colors">
                HOME
              </Link>
              <Link to="/about" className="text-orange">
                ABOUT US
              </Link>
              <Link
                to="/portfolio"
                className="hover:text-orange transition-colors"
              >
                PORTFOLIO
              </Link>
              <Link
                to="/contact"
                className="hover:text-orange transition-colors"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.3 }} // Changed: Plays every time in view
              >
                <h1 className="text-text-color font-outfit text-5xl lg:text-7xl xl:text-8xl font-semibold leading-tight mb-8 uppercase relative z-10">
                  Designing Quality Buildings{" "}
                  <span className="text-orange">Since</span> 20'
                </h1>
              </motion.div>

              {/* Decorative Small Circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }} // Changed: Plays every time
                className="absolute right-0 top-6 lg:-right-4 lg:-top-8 hidden lg:block -z-0"
              >
                <svg
                  width="118"
                  height="118"
                  viewBox="0 0 118 118"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="59" cy="59" r="58.5" stroke="#F79723" />
                </svg>
              </motion.div>
            </div>

            {/* Right Content */}
            <div className="relative flex justify-center items-center py-12 lg:py-0">
              {/* Large Circle Background */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: false, amount: 0.3 }} // Changed: Plays every time
                className="absolute inset-0 flex justify-center items-center pointer-events-none"
              >
                <svg
                  className="w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] animate-[spin_60s_linear_infinite]"
                  viewBox="0 0 373 373"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="186.5"
                    cy="186.5"
                    r="186"
                    stroke="#F79723"
                    strokeWidth="1"
                  />
                </svg>
              </motion.div>

              {/* Text Content inside Circle */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: false, amount: 0.3 }} // Changed: Plays every time
                className="relative z-10 text-center max-w-sm mx-auto"
              >
                <h2 className="text-text-color font-outfit text-3xl lg:text-4xl font-semibold mb-4 uppercase">
                  ESS + <span className="text-orange">BROWNE</span>
                </h2>
                <p className="text-text-color font-noto text-base lg:text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Quisque faucibus ex sapien vitae pellentesque sem placerat. In
                  id cursus mi pretium tellus duis convallis.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="relative">
            {/* Image - Slides in from Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }} // Changed: Plays every time
              className="lg:w-[90%]"
            >
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/f7911c2cd6af9a222083e11bd356af2391980400?width=2794"
                alt="Architecture project"
                className="w-full h-[400px] lg:h-[700px] object-cover rounded-lg grayscale"
              />
            </motion.div>

            {/* Text Box - Overlaps on Desktop, Stacked on Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }} // Changed: Plays every time
              className="relative mt-[-40px] lg:mt-0 lg:absolute lg:bottom-12 lg:right-0 lg:max-w-xl z-10 px-4 lg:px-0"
            >
              <div className="bg-text-color p-8 lg:p-12 rounded-lg shadow-xl">
                <p className="text-[#E3E3E3] font-noto text-lg lg:text-xl leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Quisque faucibus ex sapien vitae pellentesque sem placerat. In
                  id cursus mi pretium tellus duis convallis. Tempus leo
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Services Section */}
      <StickyServicesSection />

      {/* Team Section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="mb-12">
            <p className="text-text-color font-outfit text-xl lg:text-2xl font-medium mb-4">
              TEAM
            </p>
            <h2 className="text-text-color font-outfit text-4xl lg:text-5xl font-medium mb-16">
              Principal Architects
            </h2>
          </div>

          {/* Principal Architects */}
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 mb-32">
            {/* Benedict Brown */}
            <div>
              <div className="w-full aspect-square mb-8 rounded-full overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/7ad972062135cff2589d7fff5bca2ca41a829c37?width=1412"
                  alt="Benedict Brown"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-text-color font-outfit text-2xl lg:text-3xl font-medium mb-4">
                Benedict Brown
              </h3>
              <p className="text-text-color font-noto text-lg lg:text-xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat.
              </p>
            </div>

            {/* Esi Brown */}
            <div>
              <div className="w-full aspect-square mb-8 rounded-full overflow-hidden">
                <img
                  src="https://api.builder.io/api/v1/image/assets/TEMP/1fcb6104aeab1f9651fd1bcb12eab186a311b1f7?width=758"
                  alt="Esi Brown"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-text-color font-outfit text-2xl lg:text-3xl font-medium mb-4">
                Esi Brown
              </h3>
              <p className="text-text-color font-noto text-lg lg:text-xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat.
              </p>
            </div>
          </div>

          {/* Other Team Members */}
          <div>
            <h2 className="text-text-color font-outfit text-4xl lg:text-5xl font-medium mb-12">
              Other Members of Our team
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map((member) => (
                <div key={member} className="text-center">
                  <div className="w-full aspect-square mb-4 rounded-full overflow-hidden">
                    <img
                      src={
                        member % 2 === 0
                          ? "https://api.builder.io/api/v1/image/assets/TEMP/b4b80ba60f784c59af5696bba16154e5e71eaff4?width=564"
                          : "https://api.builder.io/api/v1/image/assets/TEMP/c69bd5c15496d07324d31de6555808d35048dcc6?width=484"
                      }
                      alt="Team member"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-text-color font-outfit text-lg lg:text-xl font-medium">
                    Benedict Brown
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="main-footer pt-24 pb-8 lg:pt-32 lg:pb-12 mt-auto">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-4">
                  Head Office
                </h3>
                <p className="text-text-grey font-noto text-lg lg:text-xl leading-relaxed">
                  69 Ferry Pass Street,
                  <br />
                  Deduako - Kodiekrom, Kumasi
                </p>
              </div>

              <p className="text-text-grey font-noto text-lg lg:text-xl">
                info@essbrown.com
              </p>

              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-4">
                  Contact:
                </h3>
                <p className="text-text-grey font-noto text-lg lg:text-xl">
                  (+233) 415 4906 | (+233) 451 7903
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-6">
                Socials
              </h3>
              <div className="space-y-4 mb-8">
                <a href="#" className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors">
                   {/* SVG omitted for brevity, keeping same as before */}
                   Instagram
                </a>
                <a href="#" className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors">
                   {/* SVG omitted for brevity */}
                   LinkedIn
                </a>
                <a href="#" className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors">
                   {/* SVG omitted for brevity */}
                   YouTube
                </a>
              </div>

              <button className="bg-home-button hover:bg-orange transition-colors rounded-full px-8 py-4 text-text-color font-noto text-lg lg:text-xl flex items-center gap-3">
                Send Message
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <path d="M25.3999 6.54706C24.1774 5.31254 22.7213 4.33369 21.1166 3.66755C19.5119 3.00141 17.7907 2.66131 16.0533 2.66706C8.77328 2.66706 2.83994 8.6004 2.83994 15.8804C2.83994 18.2137 3.45328 20.4804 4.59994 22.4804L2.73328 29.3337L9.73328 27.4937C11.6666 28.5471 13.8399 29.1071 16.0533 29.1071C23.3333 29.1071 29.2666 23.1737 29.2666 15.8937C29.2666 12.3604 27.8933 9.0404 25.3999 6.54706ZM16.0533 26.8671C14.0799 26.8671 12.1466 26.3337 10.4533 25.3337L10.0533 25.0937L5.89328 26.1871L6.99994 22.1337L6.73328 21.7204C5.63667 19.9698 5.05451 17.9461 5.05328 15.8804C5.05328 9.82706 9.98661 4.89373 16.0399 4.89373C18.9733 4.89373 21.7333 6.0404 23.7999 8.1204C24.8234 9.13888 25.6345 10.3505 26.1861 11.6848C26.7377 13.0192 27.0189 14.4498 27.0133 15.8937C27.0399 21.9471 22.1066 26.8671 16.0533 26.8671ZM22.0799 18.6537C21.7466 18.4937 20.1199 17.6937 19.8266 17.5737C19.5199 17.4671 19.3066 17.4137 19.0799 17.7337C18.8533 18.0671 18.2266 18.8137 18.0399 19.0271C17.8533 19.2537 17.6533 19.2804 17.3199 19.1071C16.9866 18.9471 15.9199 18.5871 14.6666 17.4671C13.6799 16.5871 13.0266 15.5071 12.8266 15.1737C12.6399 14.8404 12.7999 14.6671 12.9733 14.4937C13.1199 14.3471 13.3066 14.1071 13.4666 13.9204C13.6266 13.7337 13.6933 13.5871 13.7999 13.3737C13.9066 13.1471 13.8533 12.9604 13.7733 12.8004C13.6933 12.6404 13.0266 11.0137 12.7599 10.3471C12.4933 9.70706 12.2133 9.78706 12.0133 9.77373H11.3733C11.1466 9.77373 10.7999 9.85373 10.4933 10.1871C10.1999 10.5204 9.34661 11.3204 9.34661 12.9471C9.34661 14.5737 10.5333 16.1471 10.6933 16.3604C10.8533 16.5871 13.0266 19.9204 16.3333 21.3471C17.1199 21.6937 17.7333 21.8937 18.2133 22.0404C18.9999 22.2937 19.7199 22.2537 20.2933 22.1737C20.9333 22.0804 22.2533 21.3737 22.5199 20.6004C22.7999 19.8271 22.8001 19.1737 22.7067 19.0271C22.6134 18.8804 22.4134 18.8137 22.0801 18.6537Z" fill="currentColor" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-start lg:items-end mt-8 lg:mt-0">
              <div className="font-outfit font-black text-6xl lg:text-8xl leading-[0.85] opacity-50 text-[#BEBEBE] hover:opacity-100 transition-opacity cursor-default text-left">
                <div className="block">ESS</div>
                <div className="flex items-center whitespace-nowrap">
                  <span className="text-orange mr-4">+</span>
                  <span>BROWNE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <p className="text-text-grey font-noto text-md lg:text-md">
              Copyright 2025. ESS+BROWNE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
