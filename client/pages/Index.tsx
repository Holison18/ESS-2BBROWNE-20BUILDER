import { Link } from "react-router-dom";
import heroVideo from "../assets/backgroundvid.mp4";
import logo from "../assets/logo.png";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="flex items-center justify-between py-4 lg:py-6">
            <img
              src={logo}
              alt="ESS + BROWNE"
              className="h-8 lg:h-13 w-22 lg:w-32 cursor-pointer"
            />
            <div className="hidden md:flex items-center gap-8 lg:gap-12 text-white font-noto text-base lg:text-lg">
              <Link to="/" className="hover:text-orange transition-colors">
                HOME
              </Link>
              <Link to="/about" className="hover:text-orange transition-colors">
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
      <section className="relative min-h-screen flex items-center pt-24 lg:pt-0 overflow-hidden">
        {/* VIDEO BACKGROUND START */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          {/* Overlay (Keeps text readable) */}
          <div className="absolute inset-0"></div>
        </div>
        {/* VIDEO BACKGROUND END */}

        <div className="container mx-auto px-4 lg:px-20 relative z-10">
          <div style={{ maxWidth: "1089px" }}>
            <div className="bg-text-color inline-block px-4 py-2 lg:px-6 lg:py-3 mb-4 lg:mb-6">
              <h2 className="text-home-button font-outfit text-2xl lg:text-4xl xl:text-5xl font-bold">
                FROM
              </h2>
            </div>

            <h1 className="text-white font-outfit text-5xl lg:text-7xl xl:text-8xl font-bold mb-4 lg:mb-6">
              Concept to Creation<span className="text-orange">.</span>
            </h1>

            <p className="text-white font-noto text-lg lg:text-2xl font-bold mb-8 lg:mb-12">
              Building your Beautiful{" "}
              <span className="text-orange">Dreams</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              <Link
                to="/contact"
                className="bg-home-button-color hover:bg-orange transition-colors rounded-full px-8 lg:px-12 py-3 lg:py-4 text-text-color font-noto text-lg lg:text-xl inline-flex justify-center items-center"
              >
                Contact Us
              </Link>

              <Link
                to="/portfolio"
                className="flex items-center gap-2 text-white font-noto text-lg lg:text-xl underline hover:text-orange transition-colors"
              >
                View projects
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 46 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.1422 29.2272L25.6916 17.6778L15.7921 17.6778L15.7073 16.3485H27.9638V28.605L26.6344 28.5201L26.6344 18.6206L15.085 30.1701L14.1422 29.2272Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text */}
            <div className="space-y-8" style={{ marginLeft: "130px" }}>
              <h2 className="text-text-color font-outfit text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                ESS + <span className="text-orange">BROWNE</span>
              </h2>

              <p className="text-text-grey font-outfit text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight mb-8">
                <span className="text-text-color">i</span>s a design and
                architecture firm shaping spaces from Kumasi -{" "}
                <span className="text-orange">Ghana</span>
              </p>

              <p className="text-text-grey-2 font-noto text-xl">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. torquent per conubia nostra inceptos himenaeos.
              </p>

              <Link
                to="/about"
                className="border border-text-color rounded-full px-8 py-3 text-text-color font-noto text-xl hover:bg-text-color hover:text-white transition-colors flex items-center gap-3 inline-flex"
              >
                More About Us
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.3684 30.4277L23.5351 16.2826L13.9729 18.8448L13.5469 17.5827L25.3857 14.4105L28.558 26.2494L27.2519 26.5115L24.6898 16.9493L16.5231 31.0944L15.3684 30.4277Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>

            {/* Stats Column - Changed alignment to 'items-center' to fill the space */}
            <div className="space-y-8 flex flex-col items-center">
              <div className="flex flex-col items-center">
                <div className="text-text-black font-outfit text-7xl lg:text-8xl xl:text-9xl font-black opacity-95 leading-none">
                  10+
                </div>
                <p className="text-text-grey-2 font-noto text-lg lg:text-xl font-light mt-2">
                  Years of Experience
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-text-black font-outfit text-7xl lg:text-8xl xl:text-9xl font-black opacity-75 leading-none">
                  50+
                </div>
                <p className="text-text-grey-2 font-noto text-lg lg:text-xl font-light mt-2">
                  Projects
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-text-grey font-outfit text-7xl lg:text-8xl xl:text-9xl font-black leading-none">
                  15+
                </div>
                <p className="text-text-grey-2 font-noto text-lg lg:text-xl font-light mt-2">
                  Clients
                </p>
              </div>
            </div>
          </div>

          {/* Partner Logos */}
          <div className="mt-16 lg:mt-24 flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/cdb403e1c62799afe9819a606f4f6fb9ba543d3c?width=190"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/078f9a276aa9da700d98132fd4d0021ef2666fd4?width=204"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a7e026de1ebed0e193750fd7edf9c116910d2145?width=290"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/cdb403e1c62799afe9819a606f4f6fb9ba543d3c?width=190"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/078f9a276aa9da700d98132fd4d0021ef2666fd4?width=204"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a7e026de1ebed0e193750fd7edf9c116910d2145?width=290"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/cdb403e1c62799afe9819a606f4f6fb9ba543d3c?width=190"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/078f9a276aa9da700d98132fd4d0021ef2666fd4?width=204"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/a7e026de1ebed0e193750fd7edf9c116910d2145?width=290"
              alt="Partner"
              className="h-16 lg:h-20 w-auto opacity-60 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </section>

      {/* Projects Section 1 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="mb-12 lg:mb-16">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/1e6e0a9fab431547242baa1573a364624798cd16?width=3104"
              alt="Featured Project"
              className="w-full h-[400px] lg:h-[600px] xl:h-[700px] object-cover rounded-lg"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <h3 className="text-text-color font-outfit text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4">
                Adenta <span className="text-orange">Project</span>
              </h3>
              <p className="text-text-color font-noto text-xl lg:text-2xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/db47dced780ff62d3c14981739491322ef0efa9c?width=446"
                alt="Project detail"
                className="w-full h-48 object-cover rounded"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2fc2d95762d328f026208cb664697ac5631113aa?width=450"
                alt="Project detail"
                className="w-full h-48 object-cover rounded"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/2b831201548b9bacca3818d8eeb1e3ca9a6ded25?width=832"
                alt="Project detail"
                className="w-full h-48 object-cover rounded"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section 2 */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="mb-12 lg:mb-16">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/9997d6b2c8161fe1e180fd1ce17b9bb173480174?width=2972"
              alt="Featured Project"
              className="w-full h-[400px] lg:h-[600px] xl:h-[700px] object-cover rounded-lg"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="grid grid-cols-3 gap-4 lg:order-1">
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/29532dbb147df0e2e4c7b47bb47d522dda4f87b6?width=444"
                alt="Project detail"
                className="w-full h-48 object-cover rounded"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/28bfeadaa7459e98abeb403b780230cc7ae9a6f6?width=486"
                alt="Project detail"
                className="w-full h-48 object-cover rounded"
              />
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/c007a4425704f174f77f5f7ac936d91683093e59?width=440"
                alt="Project detail"
                className="w-full h-48 object-cover rounded"
              />
            </div>

            <div className="lg:order-2 lg:text-right">
              <h3 className="text-text-color font-outfit text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4">
                CJ Adoma <span className="text-orange">Project</span>
              </h3>
              <p className="text-text-color font-noto text-xl lg:text-2xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="max-w-2xl mb-16 lg:mb-24">
            <h2 className="text-text-color font-outfit text-4xl lg:text-5xl xl:text-6xl font-semibold mb-6">
              What are the services we{" "}
              <span className="text-orange">provide?</span>
            </h2>
            <p className="text-text-color font-noto text-xl lg:text-2xl">
              Lorem ipsum dolor sit amet consectetur adipiscing elit.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#212121] p-8 lg:p-12 rounded-lg">
              <div className="text-home-button-color font-outfit text-9xl lg:text-[200px] font-black leading-none mb-4">
                1
              </div>
              <h3 className="text-white font-outfit text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
                Design
              </h3>
              <p className="text-[#8D8D8D] font-noto text-lg lg:text-xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>

            <div className="bg-[#212121] p-8 lg:p-12 rounded-lg">
              <div className="text-home-button-color font-outfit text-9xl lg:text-[200px] font-black leading-none mb-4">
                2
              </div>
              <h3 className="text-white font-outfit text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
                Build
              </h3>
              <p className="text-[#8D8D8D] font-noto text-lg lg:text-xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. torquent per conubia nostra inceptos himenaeos.
              </p>
            </div>

            <div className="bg-[#212121] p-8 lg:p-12 rounded-lg md:col-span-2 lg:col-span-1">
              <div className="text-home-button-color font-outfit text-9xl lg:text-[200px] font-black leading-none mb-4">
                3
              </div>
              <h3 className="text-white font-outfit text-4xl lg:text-5xl xl:text-6xl font-black mb-6">
                Innovate
              </h3>
              <p className="text-[#8D8D8D] font-noto text-lg lg:text-xl leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. torquent per conubia nostra inceptos himenaeos.
              </p>
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
