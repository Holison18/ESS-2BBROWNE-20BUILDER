import { Link } from "react-router-dom";
import StickyServicesSection from "@/components/StickyServicesSection";
import { motion } from "framer-motion"; // Add this import

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between py-4 lg:py-6">
            <Link to="/">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/519c10e29b96eec6b8ba3cbfb8a1008fe2b40cff?width=772"
                alt="ESS + BROWNE"
                className="h-12 lg:h-16 w-auto"
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
                viewport={{ once: true }}
              >
                <h1 className="text-text-color font-outfit text-5xl lg:text-7xl xl:text-8xl font-semibold leading-tight mb-8 uppercase relative z-10">
                  Designing Quality Buildings{" "}
                  <span className="text-orange">Since</span> 20'
                </h1>
              </motion.div>

              {/* Decorative Small Circle - Repositioned Tighter */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute right-0 top-0 lg:-right-4 lg:-top-8 hidden lg:block -z-0"
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
              {/* Large Circle Background - Rotating slowly for effect */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="absolute inset-0 flex justify-center items-center pointer-events-none"
              >
                 <svg
                  className="w-[350px] h-[350px] lg:w-[450px] lg:h-[450px] animate-[spin_60s_linear_infinite]"
                  viewBox="0 0 373 373"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="186.5" cy="186.5" r="186" stroke="#F79723" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Text Content inside Circle */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 text-center max-w-sm mx-auto"
              >
                <h2 className="text-text-color font-outfit text-3xl lg:text-4xl font-semibold mb-4 uppercase">
                  ESS + <span className="text-orange">BROWNE</span>
                </h2>
                <p className="text-text-color font-noto text-base lg:text-lg leading-relaxed">
                  Lorem ipsum dolor sit amet consectetur adipiscing elit.
                  Quisque faucibus ex sapien vitae pellentesque sem placerat.
                  In id cursus mi pretium tellus duis convallis.
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
              viewport={{ once: true }}
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
              viewport={{ once: true }}
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
      <footer className="main-footer pt-24 pb-8 lg:pt-32 lg:pb-12">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            {/* Head Office */}
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-4">
                  Head Office
                </h3>
                <p className="text-white font-noto text-lg lg:text-xl leading-relaxed">
                  69 Ferry Pass Street,
                  <br />
                  Deduako - Kodiekrom, Kumasi
                </p>
              </div>

              <p className="text-white font-noto text-lg lg:text-xl">
                info@essbrown.com
              </p>

              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-4">
                  Contact:
                </h3>
                <p className="text-white font-noto text-lg lg:text-xl">
                  (+233) 415 4906 | (+233) 451 7903
                </p>
              </div>
            </div>

            {/* Socials & Button */}
            <div>
              <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-6">
                Socials
              </h3>
              <div className="space-y-4 mb-8">
                <a
                  href="#"
                  className="flex items-center gap-3 text-white font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.6183 8.32938C23.4668 8.32938 23.3214 8.26918 23.2142 8.16201C23.1071 8.05485 23.0469 7.9095 23.0469 7.75795C23.0469 7.6064 23.1071 7.46105 23.2142 7.35389C23.3214 7.24673 23.4668 7.18652 23.6183 7.18652M23.6183 8.32938C23.7699 8.32938 23.9152 8.26918 24.0224 8.16201C24.1295 8.05485 24.1897 7.9095 24.1897 7.75795C24.1897 7.6064 24.1295 7.46105 24.0224 7.35389C23.9152 7.24673 23.7699 7.18652 23.6183 7.18652"
                      stroke="currentColor"
                      strokeWidth="2.28571"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.96115 7.84208C1.96115 6.2823 2.58077 4.78641 3.68369 3.68348C4.78662 2.58056 6.28251 1.96094 7.84229 1.96094H23.5269C24.2992 1.96094 25.0639 2.11306 25.7775 2.40861C26.491 2.70417 27.1393 3.13737 27.6855 3.68348C28.2316 4.2296 28.6648 4.87793 28.9603 5.59146C29.2559 6.305 29.408 7.06976 29.408 7.84208V23.5267C29.408 25.0864 28.7884 26.5823 27.6855 27.6852C26.5825 28.7882 25.0866 29.4078 23.5269 29.4078H7.84001C6.28023 29.4078 4.78434 28.7882 3.68141 27.6852C2.57848 26.5823 1.95886 25.0864 1.95886 23.5267L1.96115 7.84208Z"
                      stroke="currentColor"
                      strokeWidth="2.28571"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.85602 15.684C9.85602 16.4495 10.0068 17.2074 10.2997 17.9145C10.5926 18.6217 11.0219 19.2642 11.5632 19.8055C12.1044 20.3467 12.7469 20.776 13.4541 21.0689C14.1612 21.3619 14.9192 21.5126 15.6846 21.5126C16.45 21.5126 17.2079 21.3619 17.9151 21.0689C18.6222 20.776 19.2648 20.3467 19.806 19.8055C20.3472 19.2642 20.7766 18.6217 21.0695 17.9145C21.3624 17.2074 21.5132 16.4495 21.5132 15.684C21.5132 14.1382 20.8991 12.6557 19.806 11.5626C18.7129 10.4695 17.2304 9.85547 15.6846 9.85547C14.1388 9.85547 12.6562 10.4695 11.5632 11.5626C10.4701 12.6557 9.85602 14.1382 9.85602 15.684Z"
                      stroke="currentColor"
                      strokeWidth="2.28571"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Instagram
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-white font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                >
                  <svg
                    width="42"
                    height="37"
                    viewBox="0 0 39 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M29.25 4.625C30.5429 4.625 31.7829 5.11228 32.6971 5.97963C33.6114 6.84699 34.125 8.02337 34.125 9.25V27.75C34.125 28.9766 33.6114 30.153 32.6971 31.0204C31.7829 31.8877 30.5429 32.375 29.25 32.375H9.75C8.45707 32.375 7.21709 31.8877 6.30285 31.0204C5.38861 30.153 4.875 28.9766 4.875 27.75V9.25C4.875 8.02337 5.38861 6.84699 6.30285 5.97963C7.21709 5.11228 8.45707 4.625 9.75 4.625H29.25ZM29.25 7.70833H9.75C9.31902 7.70833 8.9057 7.87076 8.60095 8.15988C8.29621 8.449 8.125 8.84112 8.125 9.25V27.75C8.125 28.1589 8.29621 28.551 8.60095 28.8401C8.9057 29.1292 9.31902 29.2917 9.75 29.2917H29.25C29.681 29.2917 30.0943 29.1292 30.399 28.8401C30.7038 28.551 30.875 28.1589 30.875 27.75V9.25C30.875 8.84112 30.7038 8.449 30.399 8.15988C30.0943 7.87076 29.681 7.70833 29.25 7.70833ZM13 15.4167C13.398 15.4167 13.7822 15.5553 14.0796 15.8063C14.377 16.0572 14.5671 16.4029 14.6136 16.778L14.625 16.9583V24.6667C14.6245 25.0596 14.4659 25.4375 14.1816 25.7233C13.8973 26.009 13.5087 26.1809 13.0952 26.204C12.6818 26.227 12.2746 26.0994 11.957 25.8472C11.6394 25.595 11.4353 25.2372 11.3864 24.847L11.375 24.6667V16.9583C11.375 16.5495 11.5462 16.1573 11.851 15.8682C12.1557 15.5791 12.569 15.4167 13 15.4167ZM17.875 13.875C18.2556 13.8749 18.6241 14.0016 18.9163 14.2329C19.2085 14.4642 19.4059 14.7855 19.474 15.1407C19.8013 14.9614 20.1393 14.8003 20.4864 14.6582C21.5703 14.2188 23.1936 13.9767 24.6594 14.413C25.428 14.6443 26.1999 15.076 26.7719 15.8113C27.2838 16.4665 27.56 17.2636 27.6152 18.1593L27.625 18.5V24.6667C27.6245 25.0596 27.4659 25.4375 27.1816 25.7233C26.8973 26.009 26.5087 26.1809 26.0952 26.204C25.6818 26.227 25.2746 26.0994 24.957 25.8472C24.6394 25.595 24.4353 25.2372 24.3864 24.847L24.375 24.6667V18.5C24.375 17.9913 24.245 17.7538 24.1605 17.6444C24.0391 17.5014 23.872 17.3997 23.6844 17.3545C23.1189 17.185 22.3047 17.2744 21.7636 17.4933C20.9511 17.8232 20.2069 18.3412 19.6999 18.8207L19.5 19.0242V24.6667C19.4995 25.0596 19.3409 25.4375 19.0566 25.7233C18.7723 26.009 18.3837 26.1809 17.9702 26.204C17.5568 26.227 17.1496 26.0994 16.832 25.8472C16.5144 25.595 16.3103 25.2372 16.2614 24.847L16.25 24.6667V15.4167C16.25 15.0078 16.4212 14.6157 16.726 14.3265C17.0307 14.0374 17.444 13.875 17.875 13.875ZM13 10.7917C13.431 10.7917 13.8443 10.9541 14.149 11.2432C14.4538 11.5323 14.625 11.9245 14.625 12.3333C14.625 12.7422 14.4538 13.1343 14.149 13.4235C13.8443 13.7126 13.431 13.875 13 13.875C12.569 13.875 12.1557 13.7126 11.851 13.4235C11.5462 13.1343 11.375 12.7422 11.375 12.3333C11.375 11.9245 11.5462 11.5323 11.851 11.2432C12.1557 10.9541 12.569 10.7917 13 10.7917Z"
                      fill="currentColor"
                    />
                  </svg>
                  LinkedIn
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 text-white font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                >
                  <svg
                    width="33"
                    height="41"
                    viewBox="0 0 33 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.5 20.1296L14.6875 23.5462V16.7129L19.5 20.1296Z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 21.3387V18.9197C3 13.974 3 11.5004 4.24438 9.90992C5.49013 8.31775 7.45088 8.24942 11.371 8.11104C13.2273 8.04613 15.1248 8 16.75 8C18.3753 8 20.2714 8.04613 22.129 8.11104C26.0491 8.24942 28.0099 8.31775 29.2543 9.90992C30.4986 11.5021 30.5 13.9758 30.5 18.9197V21.337C30.5 26.2843 30.5 28.7563 29.2556 30.3484C28.0099 31.9389 26.0505 32.0089 22.129 32.1456C20.2728 32.2122 18.3753 32.2583 16.75 32.2583C15.1248 32.2583 13.2286 32.2122 11.371 32.1456C7.45088 32.0089 5.49013 31.9406 4.24438 30.3484C2.99862 28.7563 3 26.2826 3 21.3387Z"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                  YouTube
                </a>
              </div>

              <button className="bg-home-button hover:bg-orange transition-colors rounded-full px-8 py-4 text-text-color font-noto text-lg lg:text-xl flex items-center gap-3">
                Send Message
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M25.3999 6.54706C24.1774 5.31254 22.7213 4.33369 21.1166 3.66755C19.5119 3.00141 17.7907 2.66131 16.0533 2.66706C8.77328 2.66706 2.83994 8.6004 2.83994 15.8804C2.83994 18.2137 3.45328 20.4804 4.59994 22.4804L2.73328 29.3337L9.73328 27.4937C11.6666 28.5471 13.8399 29.1071 16.0533 29.1071C23.3333 29.1071 29.2666 23.1737 29.2666 15.8937C29.2666 12.3604 27.8933 9.0404 25.3999 6.54706ZM16.0533 26.8671C14.0799 26.8671 12.1466 26.3337 10.4533 25.3337L10.0533 25.0937L5.89328 26.1871L6.99994 22.1337L6.73328 21.7204C5.63667 19.9698 5.05451 17.9461 5.05328 15.8804C5.05328 9.82706 9.98661 4.89373 16.0399 4.89373C18.9733 4.89373 21.7333 6.0404 23.7999 8.1204C24.8234 9.13888 25.6345 10.3505 26.1861 11.6848C26.7377 13.0192 27.0189 14.4498 27.0133 15.8937C27.0399 21.9471 22.1066 26.8671 16.0533 26.8671ZM22.0799 18.6537C21.7466 18.4937 20.1199 17.6937 19.8266 17.5737C19.5199 17.4671 19.3066 17.4137 19.0799 17.7337C18.8533 18.0671 18.2266 18.8137 18.0399 19.0271C17.8533 19.2537 17.6533 19.2804 17.3199 19.1071C16.9866 18.9471 15.9199 18.5871 14.6666 17.4671C13.6799 16.5871 13.0266 15.5071 12.8266 15.1737C12.6399 14.8404 12.7999 14.6671 12.9733 14.4937C13.1199 14.3471 13.3066 14.1071 13.4666 13.9204C13.6266 13.7337 13.6933 13.5871 13.7999 13.3737C13.9066 13.1471 13.8533 12.9604 13.7733 12.8004C13.6933 12.6404 13.0266 11.0137 12.7599 10.3471C12.4933 9.70706 12.2133 9.78706 12.0133 9.77373H11.3733C11.1466 9.77373 10.7999 9.85373 10.4933 10.1871C10.1999 10.5204 9.34661 11.3204 9.34661 12.9471C9.34661 14.5737 10.5333 16.1471 10.6933 16.3604C10.8533 16.5871 13.0266 19.9204 16.3333 21.3471C17.1199 21.6937 17.7333 21.8937 18.2133 22.0404C18.9999 22.2937 19.7199 22.2537 20.2933 22.1737C20.9333 22.0804 22.2533 21.3737 22.5199 20.6004C22.7999 19.8271 22.7999 19.1737 22.7066 19.0271C22.6133 18.8804 22.4133 18.8137 22.0799 18.6537Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>

            {/* Logo Right Aligned (to balance the Left Aligned Head Office) */}
            <div className="flex flex-col items-start lg:items-end mt-8 lg:mt-0">
              <div className="font-outfit font-black text-6xl lg:text-8xl leading-[0.85] opacity-50 text-[#BEBEBE] hover:opacity-100 transition-opacity cursor-default text-left">
                {/* Line 1 */}
                <div className="block">ESS</div>

                {/* Line 2 */}
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
