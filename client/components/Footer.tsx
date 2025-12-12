
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Footer() {
    return (
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
                            <a
                                href="#"
                                className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                            >
                                Instagram
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                            >
                                LinkedIn
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 text-text-grey font-noto text-lg lg:text-xl hover:text-orange transition-colors"
                            >
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
                                    d="M25.3999 6.54706C24.1774 5.31254 22.7213 4.33369 21.1166 3.66755C19.5119 3.00141 17.7907 2.66131 16.0533 2.66706C8.77328 2.66706 2.83994 8.6004 2.83994 15.8804C2.83994 18.2137 3.45328 20.4804 4.59994 22.4804L2.73328 29.3337L9.73328 27.4937C11.6666 28.5471 13.8399 29.1071 16.0533 29.1071C23.3333 29.1071 29.2666 23.1737 29.2666 15.8937C29.2666 12.3604 27.8933 9.0404 25.3999 6.54706ZM16.0533 26.8671C14.0799 26.8671 12.1466 26.3337 10.4533 25.3337L10.0533 25.0937L5.89328 26.1871L6.99994 22.1337L6.73328 21.7204C5.63667 19.9698 5.05451 17.9461 5.05328 15.8804C5.05328 9.82706 9.98661 4.89373 16.0399 4.89373C18.9733 4.89373 21.7333 6.0404 23.7999 8.1204C24.8234 9.13888 25.6345 10.3505 26.1861 11.6848C26.7377 13.0192 27.0189 14.4498 27.0133 15.8937C27.0399 21.9471 22.1066 26.8671 16.0533 26.8671ZM22.0799 18.6537C21.7466 18.4937 20.1199 17.6937 19.8266 17.5737C19.5199 17.4671 19.3066 17.4137 19.0799 17.7337C18.8533 18.0671 18.2266 18.8137 18.0399 19.0271C17.8533 19.2537 17.6533 19.2804 17.3199 19.1071C16.9866 18.9471 15.9199 18.5871 14.6666 17.4671C13.6799 16.5871 13.0266 15.5071 12.8266 15.1737C12.6399 14.8404 12.7999 14.6671 12.9733 14.4937C13.1199 14.3471 13.3066 14.1071 13.4666 13.9204C13.6266 13.7337 13.6933 13.5871 13.7999 13.3737C13.9066 13.1471 13.8533 12.9604 13.7733 12.8004C13.6933 12.6404 13.0266 11.0137 12.7599 10.3471C12.4933 9.70706 12.2133 9.78706 12.0133 9.77373H11.3733C11.1466 9.77373 10.7999 9.85373 10.4933 10.1871C10.1999 10.5204 9.34661 11.3204 9.34661 12.9471C9.34661 14.5737 10.5333 16.1471 10.6933 16.3604C10.8533 16.5871 13.0266 19.9204 16.3333 21.3471C17.1199 21.6937 17.7333 21.8937 18.2133 22.0404C18.9999 22.2937 19.7199 22.2537 20.2933 22.1737C20.9333 22.0804 22.2533 21.3737 22.5199 20.6004C22.7999 19.8271 22.8001 19.1737 22.7067 19.0271C22.6134 18.8804 22.4134 18.8137 22.0801 18.6537Z"
                                    fill="currentColor"
                                />
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
    );
}
