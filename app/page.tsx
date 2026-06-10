"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Linkedin, Github, Award, Trophy, ExternalLink } from "lucide-react"
import Contact from "./_component/Contact"
import Navbar from "@/components/navbar"
import { PageSkeleton } from "@/components/skeleton"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { SiteConfig, BlogPost, Writeup, Project } from "@/lib/db"

const defaultConfig: SiteConfig = {
  hero: { name: "", title: "", description: "", cvUrl: "", portraitUrl: "" },
  about: { heading: "", description: "", portraitUrl: "" },
  social: { linkedin: "", github: "", medium: "" },
  skills: [], education: [], experience: [], certifications: [], achievements: [],
}

export default function Portfolio() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [writeups, setWriteups] = useState<Writeup[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/site").then(r => r.json()).then(setConfig),
      fetch("/api/blog").then(r => r.json()).then(setBlogPosts),
      fetch("/api/writeups").then(r => r.json()).then(setWriteups),
      fetch("/api/projects").then(r => r.json()).then(setProjects),
    ]).finally(() => { setLoading(false); setIsVisible(true) })
  }, [])

  const toggleCard = (id: string) => setExpandedCard(expandedCard === id ? null : id)
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" })
  }

  const socials = [
    { href: config.social.linkedin, icon: Linkedin },
    { href: config.social.github, icon: Github },
    { href: config.social.medium, icon: () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg>
    )},
  ]

  if (loading) return <PageSkeleton />

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero — D */}
      <section id="home" className="relative px-6 pt-32 pb-24 halftone">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className={`space-y-6 transition-all duration-1000 order-2 md:order-1 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"}`}>
            <p className="text-xs font-medium text-muted-foreground tracking-widest uppercase">{config.hero.title}</p>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none">{config.hero.name || "Hello"}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">{config.hero.description}</p>
            <div className="flex gap-4 pt-2">
              <Button onClick={() => config.hero.cvUrl.startsWith("data:") ? window.location.href = config.hero.cvUrl : window.open(config.hero.cvUrl, "_blank")} className="bg-foreground hover:bg-foreground/90 text-background font-medium px-8 py-6 rounded-xl transition-all duration-300">
                View CV
              </Button>
              <Button variant="outline" onClick={() => scrollTo("contact")} className="border-border text-foreground hover:bg-secondary px-8 py-6 rounded-xl bg-transparent transition-all duration-300">
                Let&apos;s Talk
              </Button>
            </div>
            <div className="flex gap-3 pt-6">
              {socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-200">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
          <div className={`relative transition-all duration-1000 delay-200 order-1 md:order-2 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"}`}>
            {config.hero.portraitUrl ? (
              <Image src={config.hero.portraitUrl} alt={config.hero.name} width={500} height={600} className="relative w-full max-w-sm mx-auto rounded-2xl grayscale" />
            ) : (
              <div className="relative w-full max-w-sm mx-auto rounded-2xl bg-secondary aspect-[5/6] flex items-center justify-center border border-border"><span className="text-muted-foreground text-sm">Portrait</span></div>
            )}
          </div>
        </div>
      </section>

      {/* Journey — L */}
      <section id="education" className="px-6 py-24 border-y border-border bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Journey</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8">Education</h3>
              <div className="space-y-4">{config.education.map(e => <JCard key={e.id} {...e} expanded={expandedCard} onToggle={toggleCard} />)}</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8">Experience</h3>
              <div className="space-y-4">{config.experience.map(e => <JCard key={e.id} {...e} expanded={expandedCard} onToggle={toggleCard} />)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills — D */}
      <section id="skills" className="px-6 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Skills</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
            {config.skills.map(item => (
              <div key={item.name}>
                <div className="flex justify-between mb-2 text-sm"><span className="font-medium">{item.name}</span><span className="text-muted-foreground">{item.percentage}%</span></div>
                <Progress value={item.percentage} className="h-1 bg-border [&>div]:bg-foreground [&>div]:transition-all [&>div]:duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certs & Achievements — L */}
      <section id="certifications" className="px-6 py-24 bg-secondary/30 border-y border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tight">Certifications &amp; Achievements</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8 flex items-center gap-2"><Award size={16} /> Certifications</h3>
              <div className="space-y-4">
                {config.certifications.map(c => (
                  <div key={c.id} className="border border-border rounded-xl p-5 hover:border-foreground/10 transition-all cursor-pointer bg-background" onClick={() => toggleCard(c.id)}>
                    <h4 className="font-semibold mb-1">{c.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{c.issuer}{c.link && <a className="underline ml-1" href={c.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>{c.linkText || "Link"}</a>}</p>
                    <span className="text-xs text-muted-foreground">{c.date}</span>
                    {expandedCard === c.id && <div className="mt-4 pt-4 border-t border-border space-y-2"><h5 className="text-sm font-semibold">{c.details.heading}</h5><ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">{c.details.items.map((it, i) => <li key={i}>{it}</li>)}</ul><p className="text-sm text-foreground/60">{c.details.summary}</p></div>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground tracking-widest uppercase mb-8 flex items-center gap-2"><Trophy size={16} /> Achievements</h3>
              <div className="space-y-4">
                {config.achievements.map(a => (
                  <div key={a.id} className="border border-border rounded-xl p-5 hover:border-foreground/10 transition-all cursor-pointer bg-background" onClick={() => toggleCard(a.id)}>
                    <h4 className="font-semibold mb-1">{a.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">{a.subtitle}</p>
                    <span className="text-xs text-muted-foreground">{a.period}</span>
                    {expandedCard === a.id && <div className="mt-4 pt-4 border-t border-border space-y-2"><h5 className="text-sm font-semibold">{a.details.heading}</h5><ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">{a.details.items.map((it, i) => <li key={i}>{it}</li>)}</ul></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects — D */}
      {projects.length > 0 && (
        <section id="projects" className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Projects</h2>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All &rarr;</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {projects.slice(0, 3).map(p => (
                <div key={p.id} className="border border-border rounded-xl p-5 bg-background group">
                  <h3 className="font-semibold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{p.description}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground">{p.date}</span>
                    {p.tags.slice(0, 2).map(t => <span key={t} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{t}</span>)}
                    {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-xs text-foreground underline underline-offset-4 ml-auto"><ExternalLink size={12} /></a>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Blog — L */}
      {blogPosts.length > 0 && (
        <section className="px-6 py-24 bg-secondary/30 border-y border-border">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Blog</h2>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All &rarr;</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogPosts.slice(0, 3).map(p => (
                <Link key={p.id} href={`/blog/${p.id}`} className="border border-border rounded-xl p-5 hover:border-foreground/10 transition-all duration-300 bg-background group">
                  {p.tags.length > 0 && <div className="flex flex-wrap gap-1 mb-3">{p.tags.slice(0, 2).map(t => <span key={t} className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{t}</span>)}</div>}
                  <h3 className="font-semibold mb-2 group-hover:text-muted-foreground transition-colors">{p.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{p.summary}</p>
                  <span className="text-xs text-muted-foreground mt-3 block">{p.date}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Writeups — D */}
      {writeups.length > 0 && (
        <section className="px-6 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-bold tracking-tight">Writeups</h2>
              <Link href="/writeups" className="text-sm text-muted-foreground hover:text-foreground transition-colors">View All &rarr;</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {writeups.slice(0, 3).map(w => (
                <Link key={w.id} href={`/writeups/${w.id}`} className="border border-border rounded-xl p-5 hover:border-foreground/10 transition-all duration-300 bg-background group">
                  <div className="flex items-center gap-2 mb-3"><span className="text-xs px-2 py-0.5 bg-secondary text-muted-foreground rounded">{w.category}</span><span className="text-xs text-muted-foreground">{w.date}</span></div>
                  <h3 className="font-semibold mb-2 group-hover:text-muted-foreground transition-colors">{w.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{w.event}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">{w.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Contact />

      <footer className="px-6 py-8 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} {config.hero.name}</p>
      </footer>
    </div>
  )
}

function JCard({ id, degree, role, institution, company, period, location, details, expanded, onToggle }: {
  id: string; degree?: string; role?: string; institution?: string; company?: string
  period: string; location: string; details: { heading: string; items: string[]; summary: string }
  expanded: string | null; onToggle: (id: string) => void
}) {
  const title = degree || role || ""
  const subtitle = institution || company || ""
  return (
    <div className="border border-border rounded-xl p-5 hover:border-foreground/10 transition-all cursor-pointer bg-background" onClick={() => onToggle(id)}>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground mb-1">{subtitle}</p>
      <span className="text-xs text-muted-foreground">{period} &mdash; {location}</span>
      {expanded === id && (
        <div className="mt-4 pt-4 border-t border-border space-y-2">
          <h5 className="text-sm font-semibold">{details.heading}</h5>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">{details.items.map((it, i) => <li key={i}>{it}</li>)}</ul>
          <p className="text-sm text-foreground/60">{details.summary}</p>
        </div>
      )}
    </div>
  )
}
