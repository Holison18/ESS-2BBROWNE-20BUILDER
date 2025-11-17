import { Link } from "react-router-dom";

export default function Contact() {
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
              <Link to="/" className="hover:text-orange transition-colors">HOME</Link>
              <Link to="/about" className="hover:text-orange transition-colors">ABOUT US</Link>
              <Link to="/portfolio" className="hover:text-orange transition-colors">PORTFOLIO</Link>
              <Link to="/contact" className="text-orange">CONTACT</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Placeholder Content */}
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center max-w-2xl px-4">
          <h1 className="text-text-color font-outfit text-5xl lg:text-7xl font-bold mb-6">
            <span className="text-orange">Contact</span> Us
          </h1>
          <p className="text-text-color font-noto text-xl lg:text-2xl mb-8">
            This page is coming soon. Continue prompting to fill in this page content.
          </p>
          <Link 
            to="/"
            className="inline-block bg-orange hover:bg-orange/90 transition-colors rounded-full px-8 py-4 text-white font-noto text-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
