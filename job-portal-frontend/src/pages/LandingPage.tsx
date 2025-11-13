// // src/pages/LandingPage.tsx
// import { Link } from "react-router-dom";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

// export default function LandingPage() {
//   const particlesInit = async (engine: any) => {
//     await loadFull(engine);
//   };

//   return (
//     <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500">
//       {/* Particles Background */}
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         options={{
//           fullScreen: { enable: false },
//           background: { color: { value: "transparent" } },
//           fpsLimit: 60,
//           interactivity: {
//             events: { onHover: { enable: true, mode: "repulse" }, resize: true },
//             modes: { repulse: { distance: 100, duration: 0.4 } },
//           },
//           particles: {
//             color: { value: "#ffffff" },
//             links: { enable: true, color: "#ffffff", distance: 150, opacity: 0.2, width: 1 },
//             move: { enable: true, random: true, speed: 0.6 },
//             number: { value: 70 },
//             opacity: { value: 0.25 },
//             shape: { type: "circle" },
//             size: { value: { min: 1, max: 3 } },
//           },
//         }}
//         className="absolute inset-0 z-0"
//       />

//       <div className="relative z-10 flex flex-col min-h-screen">
//         {/* Navbar */}
//         <nav className="flex justify-between items-center p-6 bg-white/25 backdrop-blur-md shadow-md">
//           <h1 className="text-white font-extrabold text-2xl tracking-wide drop-shadow">
//             JobPortal
//           </h1>
//           <div className="space-x-4">
//             <Link
//               to="/login"
//               className="text-white font-medium px-4 py-2 rounded-md hover:bg-white/30 transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-md shadow hover:shadow-xl hover:bg-blue-50 transition"
//             >
//               Register
//             </Link>
//           </div>
//         </nav>

//         {/* Hero Section */}
//         <section className="flex-1 flex flex-col justify-center items-center text-center px-6 py-16">
//           <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
//             Find Your Dream Job <br /> or Hire Top Talent
//           </h1>
//           <p className="text-white/95 text-lg md:text-xl max-w-2xl mb-10">
//             A smart, seamless, and secure platform connecting professionals with the right
//             opportunities.
//           </p>

//           <div className="flex flex-wrap gap-4 justify-center">
//             <Link
//               to="/register"
//               className="bg-white text-blue-700 font-bold px-6 py-3 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-1 hover:bg-blue-50 transition"
//             >
//               Register
//             </Link>

//             <Link
//               to="/login"
//               className="text-white border border-white/80 font-bold px-6 py-3 rounded-lg hover:bg-white/10 hover:-translate-y-1 transition"
//             >
//               Login
//             </Link>
//           </div>
//         </section>

//         {/* Features Section */}
//         <section className="bg-white/25 backdrop-blur-xl py-16">
//           <div className="max-w-6xl mx-auto px-6 text-center">
//             <h2 className="text-3xl font-bold text-white mb-12">
//               Why Choose <span className="text-sky-200">JobPortal</span>?
//             </h2>

//             <div className="grid md:grid-cols-3 gap-10">
//               <div className="p-8 bg-white/30 rounded-2xl shadow hover:shadow-2xl transition">
//                 <h3 className="font-semibold text-xl text-white mb-3">
//                   Simple & Fast
//                 </h3>
//                 <p className="text-white/85">
//                   Register, explore jobs, and apply within minutes — easy and intuitive.
//                 </p>
//               </div>

//               <div className="p-8 bg-white/30 rounded-2xl shadow hover:shadow-2xl transition">
//                 <h3 className="font-semibold text-xl text-white mb-3">
//                   Empowering Employers
//                 </h3>
//                 <p className="text-white/85">
//                   Find top candidates and manage applications all in one place.
//                 </p>
//               </div>

//               <div className="p-8 bg-white/30 rounded-2xl shadow hover:shadow-2xl transition">
//                 <h3 className="font-semibold text-xl text-white mb-3">
//                   Secure & Trusted
//                 </h3>
//                 <p className="text-white/85">
//                   Advanced authentication keeps your data private and protected.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-blue-900/50 text-white py-6 text-center">
//           <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
//         </footer>
//       </div>
//     </div>
//   );
// }


// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import HeroPanorama from "../components/HeroPanorama"; 

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-500">
      {/* Removed Particles as we're replacing with panorama in the hero section */}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="flex justify-between items-center p-6 bg-white/25 backdrop-blur-md shadow-md">
          <h1 className="text-white font-extrabold text-2xl tracking-wide drop-shadow">
            JobPortal
          </h1>
          <div className="space-x-4">
            <Link
              to="/login"
              className="text-white font-medium px-4 py-2 rounded-md hover:bg-white/30 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-md shadow hover:shadow-xl hover:bg-blue-50 transition"
            >
              Register
            </Link>
          </div>
        </nav>

        {/* Hero Section with Panorama */}
        <HeroPanorama
          title="Find Your Dream Job or  Hire Top Talent"
          subtitle="A smart, seamless, and secure platform connecting professionals with the right opportunities."
          cta1Text="Register"
          cta1Link="/register"
          cta2Text="Login"
          cta2Link="/login"
          panoramaUrl="https://upload.wikimedia.org/wikipedia/commons/b/b1/Stenbocki_maja_360_--_peaministri_kabinet.jpg" // Replace with your actual 360-degree image URL
        />

        {/* Features Section */}
        <section className="bg-white/25 backdrop-blur-xl py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-12">
              Why Choose <span className="text-sky-200">JobPortal</span>?
            </h2>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="p-8 bg-white/30 rounded-2xl shadow hover:shadow-2xl transition">
                <h3 className="font-semibold text-xl text-white mb-3">
                  Simple & Fast
                </h3>
                <p className="text-white/85">
                  Register, explore jobs, and apply within minutes — easy and intuitive.
                </p>
              </div>

              <div className="p-8 bg-white/30 rounded-2xl shadow hover:shadow-2xl transition">
                <h3 className="font-semibold text-xl text-white mb-3">
                  Empowering Employers
                </h3>
                <p className="text-white/85">
                  Find top candidates and manage applications all in one place.
                </p>
              </div>

              <div className="p-8 bg-white/30 rounded-2xl shadow hover:shadow-2xl transition">
                <h3 className="font-semibold text-xl text-white mb-3">
                  Secure & Trusted
                </h3>
                <p className="text-white/85">
                  Advanced authentication keeps your data private and protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900/50 text-white py-6 text-center">
          <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}