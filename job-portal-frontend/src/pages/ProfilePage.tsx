// src/pages/ProfilePage.tsx
import { useEffect, useState } from "react";
import axios from "axios";

interface UserProfile {
  name: string;
  email: string;
  contact?: string;
  skills?: string;
  cv_url?: string;
  profile_pic_url?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    contact: "",
    skills: "",
    cv_url: "",
    profile_pic_url: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/job-seeker/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [token]);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setCvFile(e.target.files[0]);
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setProfilePicFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("name", profile.name);
      formData.append("contact", profile.contact || "");
      formData.append("skills", profile.skills || "");
      if (cvFile) formData.append("cv", cvFile);
      if (profilePicFile) formData.append("profile_pic", profilePicFile);

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/api/job-seeker/profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
        }
      );

      setProfile(res.data);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black p-6 flex items-center justify-center text-white">
      <div
        className="
          w-full max-w-2xl p-8 rounded-3xl
          bg-white/5 backdrop-blur-2xl
          border border-yellow-600/20
          shadow-[0_0_50px_rgba(255,200,50,0.1)]
        "
      >
        <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-8 drop-shadow-lg tracking-wide">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block font-semibold text-yellow-300 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePicChange}
              className="text-gray-300"
            />
            {profile.profile_pic_url && (
              <img
                src={profile.profile_pic_url}
                alt="Profile"
                className="mt-2 w-28 h-28 object-cover rounded-full border border-yellow-500/40 shadow-lg"
              />
            )}
          </div>

          {/* Full Name */}
          <div>
            <label className="block font-semibold text-yellow-300 mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="
                w-full p-3 rounded-lg
                bg-black/50 border border-yellow-500/20
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500/50
                transition
              "
              required
            />
          </div>

          {/* Email (read-only) */}
          {/* <div>
            <label className="block font-semibold text-yellow-300 mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              className="
                w-full p-3 rounded-lg
                bg-gray-800 text-gray-300 cursor-not-allowed
                border border-yellow-500/20
              "
            />
          </div> */}

          {/* Contact */}
          <div>
            <label className="block font-semibold text-yellow-300 mb-2">Contact</label>
            <input
              type="text"
              value={profile.contact || ""}
              onChange={(e) => setProfile({ ...profile, contact: e.target.value })}
              className="
                w-full p-3 rounded-lg
                bg-black/50 border border-yellow-500/20
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500/50
                transition
              "
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block font-semibold text-yellow-300 mb-2">Skills</label>
            <input
              type="text"
              value={profile.skills || ""}
              onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
              placeholder="e.g., JavaScript, React, Node.js"
              className="
                w-full p-3 rounded-lg
                bg-black/50 border border-yellow-500/20
                text-white placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-yellow-500/50
                transition
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl
              bg-gradient-to-r from-yellow-500 to-yellow-600
              text-black font-bold
              hover:from-yellow-400 hover:to-yellow-500
              hover:shadow-[0_0_20px_rgba(255,200,50,0.5)]
              transform hover:scale-[1.03]
              transition-all duration-300
            "
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

          {message && (
            <p
              className={`text-center font-medium mt-2 ${
                message.includes("success") ? "text-green-400" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
