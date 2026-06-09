"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true); setStatus(null);
    if (!formData.name || !formData.email || !formData.message) { setStatus({ error: "Please fill all fields." }); setLoading(false); return; }
    try {
      const res = await fetch("https://charlie-backend-rtdr.onrender.com/contacts/form", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (res.ok) { setStatus({ success: data.message || "Message sent!" }); setFormData({ name: "", email: "", message: "" }); }
      else setStatus({ error: data.error || "Failed to send message." });
    } catch { setStatus({ error: "An error occurred. Try again." }); }
    setLoading(false);
  };

  return (
    <section id="contact" className="px-6 py-24 border-t border-border">
      <div className="max-w-xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-3 tracking-tight">Get in Touch</h2>
        <p className="text-muted-foreground text-center mb-12">Have a question or want to work together?</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 rounded-xl h-12" />
            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 rounded-xl h-12" />
          </div>
          <Textarea name="message" placeholder="Your message..." rows={5} value={formData.message} onChange={handleChange} className="bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-foreground/20 rounded-xl" />
          <div className="text-center">
            <Button type="submit" disabled={loading} className="bg-foreground hover:bg-foreground/90 text-background font-medium px-10 py-6 rounded-xl transition-all">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </div>
          {status?.error && <p className="text-red-500 text-center mt-4 text-sm">{status.error}</p>}
          {status?.success && <p className="text-foreground text-center mt-4 text-sm">{status.success}</p>}
        </form>
      </div>
    </section>
  );
}
