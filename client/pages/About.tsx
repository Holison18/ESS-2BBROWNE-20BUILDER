import { Link } from "react-router-dom";
import StickyServicesSection from "@/components/StickyServicesSection";
import { motion } from "framer-motion";
// Team Images
import principalLead from "@/assets/Team/principalarchitectandteamlead.png";
import principalHop from "@/assets/Team/principalarchitectandHoP.png";
import member1 from "@/assets/Team/member1.png";
import member2 from "@/assets/Team/member2.png";
import member3 from "@/assets/Team/member3.png";
import member4 from "@/assets/Team/member4.png";
import member5 from "@/assets/Team/member5.png";
import member6 from "@/assets/Team/member6.png";
import member7 from "@/assets/Team/member7.png";
import member8 from "@/assets/Team/member8.png";
import member9 from "@/assets/Team/member9.png";
import member10 from "@/assets/Team/member10.png";
// New Assets
import aboutHeroImg from "@/assets/about hero image.jpg";
import teamGroupImg from "@/assets/Team group.jpg"; // Note: Filename has space

export default function About() {
  const coreValues = [
    {
      title: "Unparalleled Expertise",
      description: "Our team’s combined experience and passion for design and construction ensure exceptional results.",
      icon: "01"
    },
    {
      title: "Client-Focused Approach",
      description: "We prioritize your needs and goals throughout the entire project.",
      icon: "02"
    },
    {
      title: "Commitment to Quality",
      description: "Our unwavering dedication to craftsmanship and attention to detail sets us apart.",
      icon: "03"
    },
    {
      title: "Sustainable Practices",
      description: "We incorporate eco-friendly materials and methods to create environmentally responsible spaces.",
      icon: "04"
    },
    {
      title: "Timely Delivery",
      description: "We understand the importance of deadlines and work efficiently to meet your project timeline",
      icon: "05"
    }
  ];

  const teamMembers = [
    { name: "Albert Oppong", role: "Construction Manager", img: member1 },
    { name: "Kwame Nkansah Boateng", role: "Architect", img: member2 },
    { name: "Eugenia Asabea Kwakye", role: "Architect", img: member3 },
    { name: "Nana Yaw Amoakohene", role: "Site Manager", img: member5 },
    { name: "Victor Adom Mensah", role: "Architect", img: member6 },
    { name: "Emmanuel Lawrence Mensah", role: "Architect", img: member7 },
    { name: "Team Member 7", role: "Architect", img: member8 },
    { name: "Team Member 8", role: "Architect", img: member9 },
    { name: "Team Member 9", role: "Architect", img: member10 },
    { name: "Team Member 10", role: "Architect", img: member4 }, // Reused for grid
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* 1. HERO SECTION - Minimalistic Typography + Image */}
      <section className="pt-12 pb-16 lg:pt-20 lg:pb-24 container mx-auto px-4 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-outfit text-5xl lg:text-8xl font-light text-black leading-tight tracking-tight mb-8">
              Designing <br />
              <span className="font-bold">Quality Buildings</span> <br />
              Since <span className="text-orange">2018</span>
            </h1>
            <div className="h-1 w-24 bg-gray-200"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[400px] lg:h-[600px] hidden lg:block"
          >
            {/* Abstract Architectural Image */}
            <div className="absolute inset-0 bg-gray-100 overflow-hidden rounded-tl-[100px] rounded-br-[100px]">
              <img
                src={aboutHeroImg}
                alt="Architectural Detail"
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-8 -left-8 w-24 h-24 border-2 border-orange/30 rounded-full z-0"></div>
            <div className="absolute top-12 right-12 w-32 h-32 bg-orange/5 rounded-full blur-2xl z-0"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO PHILOSOPHY - Split Layout */}
      <section className="py-16 lg:py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] lg:aspect-square bg-gray-100 overflow-hidden"
            >
              <img
                src={teamGroupImg}
                alt="ESS+BROWNE Team"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>

            {/* Content */}
            <div className="space-y-8">
              <h2 className="font-outfit text-xs font-bold tracking-[0.2em] uppercase text-gray-400">
                Who We Are
              </h2>
              <p className="font-outfit text-3xl lg:text-5xl font-light leading-tight">
                We are a design and build firm committed to creating exceptional spaces that <span className="text-orange italic">inspire and delight</span>.
              </p>
              <p className="font-noto text-lg text-gray-600 leading-relaxed">
                With a foundation built on integrity, creativity, and quality, we partner with our clients to bring their dreams to life. Our approach combines rigorous architectural discipline with an artist's eye for form and light.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NEW CORE VALUES */}
      <section className="py-24 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="mb-16">
            <h2 className="font-outfit text-4xl lg:text-5xl font-light text-black mb-4">Core Values</h2>
            <div className="w-16 h-1 bg-orange"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="group p-8 bg-white border border-gray-100 hover:border-orange/30 hover:shadow-lg transition-all duration-500 w-full md:w-[calc(50%-2rem)] lg:w-[30%]"
              >
                <span className="block font-outfit text-6xl font-bold text-gray-100 mb-6 group-hover:text-orange/20 transition-colors">
                  {value.icon}
                </span>
                <h3 className="font-outfit text-2xl font-bold mb-4">{value.title}</h3>
                <p className="font-noto text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sticky Services Section */}
      <StickyServicesSection />

      {/* 4. TEAM SECTION */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          <div className="text-center mb-20">
            <h2 className="font-outfit text-4xl lg:text-6xl font-light mb-4 text-black">
              The Team
            </h2>
            <p className="font-noto text-gray-500 max-w-2xl mx-auto">
              The creative minds and technical experts behind our award-winning projects.
            </p>
          </div>

          {/* Principal Architects */}
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl mx-auto mb-32">
            {[
              { name: "Benedict Owusu-Brown", role: "Principal Architect & Team Lead", img: principalLead },
              { name: "Essie Quansah Owusu-Brown", role: "Principal Architect & Head of Operations", img: principalHop }
            ].map((leader, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="text-center group"
              >
                <div className="w-full aspect-[3/4] overflow-hidden mb-6 relative">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 border-[1px] border-white/0 group-hover:border-white/20 transition-colors pointer-events-none"></div>
                </div>
                <h3 className="font-outfit text-3xl font-medium text-black mb-1">{leader.name}</h3>
                <p className="font-outfit text-sm font-bold tracking-widest text-orange uppercase">{leader.role}</p>
              </motion.div>
            ))}
          </div>

          {/* Other Members Grid */}
          <div>
            <h3 className="font-outfit text-2xl font-light mb-12 text-center text-gray-400 uppercase tracking-widest">
              Design & Build Team
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-12">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-center group"
                >
                  <div className="w-full aspect-square mb-4 overflow-hidden rounded-full grayscale group-hover:grayscale-0 transition-all duration-500 relative isolate transform-gpu">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <h4 className="font-outfit text-lg font-medium text-black group-hover:text-orange transition-colors">
                    {member.name}
                  </h4>
                  <p className="font-noto text-xs text-gray-500">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
