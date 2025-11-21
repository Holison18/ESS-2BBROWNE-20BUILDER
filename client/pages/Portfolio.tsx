import { Link } from "react-router-dom";
import { useState } from "react";

type FilterType = "all" | "completed" | "in-progress" | "not-started";

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const projects = [
    {
      id: 1,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/f68da1779e2ee8a2191342aba2878dec7a76731a?width=1480",
      alt: "Apartment Elevation Design",
      status: "completed",
      span: "row-span-2",
    },
    {
      id: 2,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/342ed0a39f08f4e036fa5ef8eea303a5f0d9b5e9?width=1552",
      alt: "Modern Home Design",
      status: "completed",
      span: "row-span-1",
    },
    {
      id: 3,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/e7e75347d3f24012e3d2f64ea2104626f403da30?width=728",
      alt: "Modern Architecture",
      status: "in-progress",
      span: "row-span-1",
    },
    {
      id: 4,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/7db84ff01aaaaa5d6cc0b7fdd10d8dc061a7e6c5?width=714",
      alt: "Contemporary Design",
      status: "completed",
      span: "row-span-1",
    },
    {
      id: 5,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/82ff5507faf51e8c72057a66b0623e6e7a61c2b6?width=1516",
      alt: "House Design",
      status: "in-progress",
      span: "row-span-1",
    },
    {
      id: 6,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/8126ca32e746516bd41ef6fd6dd363d9480c098a?width=1516",
      alt: "Luxury Villa",
      status: "completed",
      span: "row-span-2",
    },
    {
      id: 7,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/81dbefc38f230db4e424e7cd2b8c9cd39330426c?width=1508",
      alt: "Modern Architecture Project",
      status: "not-started",
      span: "row-span-1",
    },
    {
      id: 8,
      image:
        "https://api.builder.io/api/v1/image/assets/TEMP/d518f420912b96bdf68aaefa119c10e65e63c896?width=2988",
      alt: "American Modern Home",
      status: "completed",
      span: "col-span-2 row-span-1",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.status === activeFilter);

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
            <div className="hidden md:flex items-center gap-8 lg:gap-12 text-text-color font-noto text-base lg:text-xl">
              <Link to="/" className="hover:text-orange transition-colors">
                HOME
              </Link>
              <Link to="/about" className="hover:text-orange transition-colors">
                ABOUT US
              </Link>
              <Link to="/portfolio" className="text-orange font-medium">
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

      {/* Main Content */}
      <main className="pt-32 lg:pt-40 pb-16">
        <div className="container mx-auto px-4 lg:px-20">
          {/* Header Section */}
          <div className="mb-8 lg:mb-12">
            <p className="text-text-color font-outfit text-xl lg:text-2xl font-medium mb-2">
              Portfolio
            </p>
            <h1 className="text-orange font-outfit text-3xl lg:text-5xl font-semibold mb-8 lg:mb-12">
              We Build Projects that Last
            </h1>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 lg:gap-4">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-8 lg:px-11 py-3 lg:py-4 rounded-full font-noto text-lg lg:text-2xl transition-all ${
                  activeFilter === "all"
                    ? "bg-orange text-white"
                    : "border-2 border-orange text-orange hover:bg-orange hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("completed")}
                className={`px-8 lg:px-11 py-3 lg:py-4 rounded-full font-noto text-lg lg:text-2xl transition-all ${
                  activeFilter === "completed"
                    ? "bg-orange text-white"
                    : "border-2 border-orange text-orange hover:bg-orange hover:text-white"
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveFilter("in-progress")}
                className={`px-8 lg:px-11 py-3 lg:py-4 rounded-full font-noto text-lg lg:text-2xl transition-all ${
                  activeFilter === "in-progress"
                    ? "bg-orange text-white"
                    : "border-2 border-orange text-orange hover:bg-orange hover:text-white"
                }`}
              >
                In Progress
              </button>
              <button
                onClick={() => setActiveFilter("not-started")}
                className={`px-8 lg:px-11 py-3 lg:py-4 rounded-full font-noto text-lg lg:text-2xl transition-all ${
                  activeFilter === "not-started"
                    ? "bg-orange text-white"
                    : "border-2 border-orange text-orange hover:bg-orange hover:text-white"
                }`}
              >
                Not Started
              </button>
            </div>
          </div>

          {/* Projects Grid - Masonry Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 auto-rows-[300px]">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className={`${project.span} overflow-hidden group cursor-pointer`}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#151515] pt-16 lg:pt-24 pb-8 relative overflow-hidden">
        {/* Decorative Lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-[15%] w-px h-[320px] bg-white"></div>
          <div className="absolute top-[13px] right-0 w-[25%] h-px bg-white"></div>
          <div className="absolute top-[320px] left-[2%] w-[24%] h-px bg-white"></div>
          <div className="absolute top-[245px] right-[3%] w-px h-[200px] bg-white"></div>
          <div className="absolute top-[494px] left-[21%] w-[17%] h-px bg-white"></div>
          <div className="absolute top-[494px] right-0 w-[17%] h-px bg-white"></div>
          <div className="absolute bottom-[45px] left-0 w-[3%] h-px bg-white"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 mb-12">
            {/* Head Office */}
            <div className="space-y-8">
              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-6 leading-tight">
                  Head Office
                </h3>
                <p className="text-white font-noto text-lg lg:text-2xl leading-relaxed">
                  69 Ferry Pass Street,
                  <br />
                  Deduako - Kodiekrom, Kumasi
                </p>
              </div>

              <p className="text-white font-noto text-lg lg:text-2xl">
                info@essbrown.com
              </p>

              <div>
                <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-4 leading-tight">
                  Contact:
                </h3>
                <p className="text-white font-noto text-lg lg:text-2xl">
                  (+233) 415 4906 | (+233) 451 7903
                </p>
              </div>
            </div>

            {/* Socials & WhatsApp Button */}
            <div className="space-y-6">
              <h3 className="text-white font-noto text-2xl lg:text-3xl font-bold mb-6">
                Socials
              </h3>
              <div className="space-y-4">
                <a
                  href="#"
                  className="flex items-center gap-3 text-white font-noto text-lg lg:text-2xl hover:text-orange transition-colors"
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
                  >
                    <path
                      d="M23.6183 8.32938C23.4668 8.32938 23.3214 8.26918 23.2142 8.16201C23.1071 8.05485 23.0469 7.9095 23.0469 7.75795C23.0469 7.6064 23.1071 7.46105 23.2142 7.35389C23.3214 7.24673 23.4668 7.18652 23.6183 7.18652M23.6183 8.32938C23.7699 8.32938 23.9152 8.26918 24.0224 8.16201C24.1295 8.05485 24.1897 7.9095 24.1897 7.75795C24.1897 7.6064 24.1295 7.46105 24.0224 7.35389C23.9152 7.24673 23.7699 7.18652 23.6183 7.18652"
                      stroke="currentColor"
                      strokeWidth="2.28571"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1.96127 7.84208C1.96127 6.2823 2.58089 4.78641 3.68382 3.68348C4.78675 2.58056 6.28264 1.96094 7.84241 1.96094H23.527C24.2993 1.96094 25.0641 2.11306 25.7776 2.40861C26.4911 2.70417 27.1395 3.13737 27.6856 3.68348C28.2317 4.2296 28.6649 4.87793 28.9605 5.59146C29.256 6.305 29.4081 7.06976 29.4081 7.84208V23.5267C29.4081 25.0864 28.7885 26.5823 27.6856 27.6852C26.5827 28.7882 25.0868 29.4078 23.527 29.4078H7.84013C6.28035 29.4078 4.78446 28.7882 3.68153 27.6852C2.5786 26.5823 1.95898 25.0864 1.95898 23.5267L1.96127 7.84208Z"
                      stroke="currentColor"
                      strokeWidth="2.28571"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.85596 15.684C9.85596 16.4495 10.0067 17.2074 10.2996 17.9145C10.5925 18.6217 11.0219 19.2642 11.5631 19.8055C12.1043 20.3467 12.7469 20.776 13.454 21.0689C14.1612 21.3619 14.9191 21.5126 15.6845 21.5126C16.4499 21.5126 17.2079 21.3619 17.915 21.0689C18.6222 20.776 19.2647 20.3467 19.806 19.8055C20.3472 19.2642 20.7765 18.6217 21.0694 17.9145C21.3623 17.2074 21.5131 16.4495 21.5131 15.684C21.5131 14.1382 20.899 12.6557 19.806 11.5626C18.7129 10.4695 17.2304 9.85547 15.6845 9.85547C14.1387 9.85547 12.6562 10.4695 11.5631 11.5626C10.47 12.6557 9.85596 14.1382 9.85596 15.684Z"
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
                  className="flex items-center gap-3 text-white font-noto text-lg lg:text-2xl hover:text-orange transition-colors"
                >
                  <svg
                    width="39"
                    height="37"
                    viewBox="0 0 39 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
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
                  className="flex items-center gap-2 text-white font-noto text-lg lg:text-2xl hover:text-orange transition-colors"
                >
                  <svg
                    width="45"
                    height="45"
                    viewBox="0 0 33 41"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-shrink-0"
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

              <a
                href="https://wa.me/233415490"
                className="inline-flex items-center gap-3 bg-home-button hover:bg-orange transition-colors rounded-full px-8 py-4 text-text-color font-noto text-lg lg:text-2xl mt-8"
              >
                Send Message
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-shrink-0"
                >
                  <path
                    d="M25.4001 6.54706C24.1775 5.31254 22.7214 4.33369 21.1167 3.66755C19.5121 3.00141 17.7908 2.66131 16.0534 2.66706C8.7734 2.66706 2.84007 8.6004 2.84007 15.8804C2.84007 18.2137 3.4534 20.4804 4.60007 22.4804L2.7334 29.3337L9.7334 27.4937C11.6667 28.5471 13.8401 29.1071 16.0534 29.1071C23.3334 29.1071 29.2667 23.1737 29.2667 15.8937C29.2667 12.3604 27.8934 9.0404 25.4001 6.54706ZM16.0534 26.8671C14.0801 26.8671 12.1467 26.3337 10.4534 25.3337L10.0534 25.0937L5.8934 26.1871L7.00007 22.1337L6.7334 21.7204C5.6368 19.9698 5.05463 17.9461 5.0534 15.8804C5.0534 9.82706 9.98673 4.89373 16.0401 4.89373C18.9734 4.89373 21.7334 6.0404 23.8001 8.1204C24.8236 9.13888 25.6346 10.3505 26.1862 11.6848C26.7378 13.0192 27.019 14.4498 27.0134 15.8937C27.0401 21.9471 22.1067 26.8671 16.0534 26.8671ZM22.0801 18.6537C21.7467 18.4937 20.1201 17.6937 19.8267 17.5737C19.5201 17.4671 19.3067 17.4137 19.0801 17.7337C18.8534 18.0671 18.2267 18.8137 18.0401 19.0271C17.8534 19.2537 17.6534 19.2804 17.3201 19.1071C16.9867 18.9471 15.9201 18.5871 14.6667 17.4671C13.6801 16.5871 13.0267 15.5071 12.8267 15.1737C12.6401 14.8404 12.8001 14.6671 12.9734 14.4937C13.1201 14.3471 13.3067 14.1071 13.4667 13.9204C13.6267 13.7337 13.6934 13.5871 13.8001 13.3737C13.9067 13.1471 13.8534 12.9604 13.7734 12.8004C13.6934 12.6404 13.0267 11.0137 12.7601 10.3471C12.4934 9.70706 12.2134 9.78706 12.0134 9.77373H11.3734C11.1467 9.77373 10.8001 9.85373 10.4934 10.1871C10.2001 10.5204 9.34673 11.3204 9.34673 12.9471C9.34673 14.5737 10.5334 16.1471 10.6934 16.3604C10.8534 16.5871 13.0267 19.9204 16.3334 21.3471C17.1201 21.6937 17.7334 21.8937 18.2134 22.0404C19.0001 22.2937 19.7201 22.2537 20.2934 22.1737C20.9334 22.0804 22.2534 21.3737 22.5201 20.6004C22.8001 19.8271 22.8001 19.1737 22.7067 19.0271C22.6134 18.8804 22.4134 18.8137 22.0801 18.6537Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>

            {/* Large Logo */}
            <div className="flex flex-col items-start lg:items-end justify-center">
              <div className="font-outfit font-semibold text-6xl lg:text-8xl leading-[0.98] opacity-50 text-white">
                <div>ESS</div>
                <div className="flex items-center gap-2">
                  <span className="text-orange">+</span>
                  <span>BROWNE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-12 border-t border-white/10">
            <p className="text-white font-noto text-lg lg:text-2xl">
              Copyright 2025. ESS+BROWNE
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
