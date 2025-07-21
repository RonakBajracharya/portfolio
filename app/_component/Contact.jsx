"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ error: "Please fill all fields." });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/contacts/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus({ success: data.message || "Message sent!" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ error: data.error || "Failed to send message." });
      }
    } catch {
      setStatus({ error: "An error occurred. Try again." });
    }

    setLoading(false);
  };

  return (
    <section id="contact" className="px-8 py-16 bg-slate-800/50 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
          Contact <span className="text-teal-400 animate-pulse">Me!</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up delay-200">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
            />
          </div>
          <Textarea
            name="message"
            placeholder="Your Message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
          />
          <div className="text-center">
            <Button
              type="submit"
              disabled={loading}
              className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
            >
              <span className="relative z-10">{loading ? "Sending..." : "Send Message"}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Button>
          </div>
          {status?.error && <p className="text-red-400 text-center mt-4">{status.error}</p>}
          {status?.success && <p className="text-green-400 text-center mt-4">{status.success}</p>}
        </form>
      </div>
    </section>
  );
}
