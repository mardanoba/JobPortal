// src/pages/LandingPage.tsx
import { Link } from "react-router-dom";
import HeroPanorama from "../components/HeroPanorama"; 

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white">
      {/* Hero Section with Panorama */}
      <HeroPanorama
        title="Find Your Dream Job or Hire Top Talent"
        subtitle="A smart, seamless, and secure platform connecting professionals with the right opportunities."
        cta1Text="Register"
        cta1Link="/register"
        cta2Text="Login"
        cta2Link="/login"
        panoramaUrl="https://upload.wikimedia.org/wikipedia/commons/b/b1/Stenbocki_maja_360_--_peaministri_kabinet.jpg"
      />

      {/* Navbar */}
      <nav className="fixed top-0 w-full flex justify-between items-center p-6 bg-black/50 backdrop-blur-md z-20 shadow-lg">
        <h1 className="text-yellow-400 font-extrabold text-2xl tracking-wide drop-shadow-lg">
          JobPortal
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 rounded-xl font-medium bg-yellow-500/20 text-yellow-300 hover:bg-yellow-500/40 transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 shadow hover:shadow-[0_0_15px_rgba(255,200,50,0.5)] transition"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-extrabold text-yellow-400 mb-12 drop-shadow-lg">
            Why Choose JobPortal?
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="p-8 bg-black/50 border border-yellow-500/20 rounded-2xl shadow-[0_0_25px_rgba(255,200,50,0.1)] hover:shadow-[0_0_40px_rgba(255,200,50,0.3)] transition">
              <h3 className="font-semibold text-xl text-yellow-400 mb-3">
                Simple & Fast
              </h3>
              <p className="text-white/80">
                Register, explore jobs, and apply within minutes — easy and intuitive.
              </p>
            </div>

            <div className="p-8 bg-black/50 border border-yellow-500/20 rounded-2xl shadow-[0_0_25px_rgba(255,200,50,0.1)] hover:shadow-[0_0_40px_rgba(255,200,50,0.3)] transition">
              <h3 className="font-semibold text-xl text-yellow-400 mb-3">
                Empowering Employers
              </h3>
              <p className="text-white/80">
                Find top candidates and manage applications all in one place.
              </p>
            </div>

            <div className="p-8 bg-black/50 border border-yellow-500/20 rounded-2xl shadow-[0_0_25px_rgba(255,200,50,0.1)] hover:shadow-[0_0_40px_rgba(255,200,50,0.3)] transition">
              <h3 className="font-semibold text-xl text-yellow-400 mb-3">
                Secure & Trusted
              </h3>
              <p className="text-white/80">
                Advanced authentication keeps your data private and protected.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/70 text-yellow-400 py-6 text-center mt-12 border-t border-yellow-600/20">
        <p>&copy; {new Date().getFullYear()} JobPortal. All rights reserved.</p>
      </footer>
    </div>
  );
}
