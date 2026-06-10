"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Plus, Trash2, Save, ArrowUp, ArrowDown } from "lucide-react"
import UploadBtn from "@/components/upload-btn"
import type { SiteConfig, Skill, Education, Experience, Certification, Achievement } from "@/lib/db"

function moveUp<T>(arr: T[], i: number, set: (arr: T[]) => void) {
  if (i <= 0) return
  const next = [...arr]
  ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
  set(next)
}

function moveDown<T>(arr: T[], i: number, set: (arr: T[]) => void) {
  if (i >= arr.length - 1) return
  const next = [...arr]
  ;[next[i], next[i + 1]] = [next[i + 1], next[i]]
  set(next)
}

const defaultSkill: Skill = { name: "", percentage: 80 }

const defaultEducation: Education = {
  id: "", degree: "", institution: "", period: "", location: "",
  details: { heading: "", items: [""], summary: "" },
}

const defaultExperience: Experience = {
  id: "", role: "", company: "", period: "", location: "",
  details: { heading: "", items: [""], summary: "" },
}

const defaultCertification: Certification = {
  id: "", title: "", issuer: "", date: "", link: "", linkText: "",
  details: { heading: "", items: [""], summary: "" },
}

const defaultAchievement: Achievement = {
  id: "", title: "", subtitle: "", period: "",
  details: { heading: "", items: [""] },
}

function displayUrl(url: string) {
  if (url.startsWith("data:")) {
    const mime = url.slice(5, url.indexOf(";"))
    return `[Uploaded: ${mime}]`
  }
  return url
}

export default function AdminContent() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    (async () => { const r = await fetch("/api/site"); setConfig(await r.json()) })()
  }, [])

  const handleSave = async () => {
    if (!config) return
    setLoading(true)
    await fetch("/api/site", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-background/95 backdrop-blur-sm -my-4 py-4">
        <h1 className="text-2xl font-bold">Site Content</h1>
        <Button onClick={handleSave} disabled={loading}>
          <Save size={16} className="mr-2" />
          {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* Hero */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Name</Label><Input value={config.hero.name} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, name: e.target.value } })} /></div>
            <div className="space-y-2"><Label>Title</Label><Input value={config.hero.title} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })} /></div>
          </div>
          <div className="space-y-2"><Label>Description</Label><Input value={config.hero.description} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, description: e.target.value } })} /></div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>CV URL</Label>
              <div className="flex gap-2">
                <Input value={displayUrl(config.hero.cvUrl)} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, cvUrl: e.target.value } })} className="flex-1" />
                <UploadBtn accept=".pdf" onUpload={(url) => setConfig({ ...config, hero: { ...config.hero, cvUrl: url } })} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Portrait URL</Label>
              <div className="flex gap-2">
                <Input value={displayUrl(config.hero.portraitUrl)} onChange={(e) => setConfig({ ...config, hero: { ...config.hero, portraitUrl: e.target.value } })} className="flex-1" />
                <UploadBtn onUpload={(url) => setConfig({ ...config, hero: { ...config.hero, portraitUrl: url } })} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Links */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Social Links</CardTitle></CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>LinkedIn</Label><Input value={config.social.linkedin} onChange={(e) => setConfig({ ...config, social: { ...config.social, linkedin: e.target.value } })} /></div>
            <div className="space-y-2"><Label>GitHub</Label><Input value={config.social.github} onChange={(e) => setConfig({ ...config, social: { ...config.social, github: e.target.value } })} /></div>
            <div className="space-y-2"><Label>Medium</Label><Input value={config.social.medium} onChange={(e) => setConfig({ ...config, social: { ...config.social, medium: e.target.value } })} /></div>
          </div>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {config.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input value={skill.name} onChange={(e) => { const updated = [...config.skills]; updated[i] = { ...updated[i], name: e.target.value }; setConfig({ ...config, skills: updated }) }} className="flex-1 h-9" placeholder="Skill name" />
              <Input type="number" min={0} max={100} value={skill.percentage} onChange={(e) => { const updated = [...config.skills]; updated[i] = { ...updated[i], percentage: Number(e.target.value) }; setConfig({ ...config, skills: updated }) }} className="w-16 h-9 text-center" />
              <span className="text-xs text-muted-foreground w-6 text-right">%</span>
              <Button variant="ghost" size="icon" disabled={i === 0} onClick={() => moveUp(config.skills, i, (arr) => setConfig({ ...config, skills: arr }))} className="shrink-0"><ArrowUp size={12} /></Button>
              <Button variant="ghost" size="icon" disabled={i === config.skills.length - 1} onClick={() => moveDown(config.skills, i, (arr) => setConfig({ ...config, skills: arr }))} className="shrink-0"><ArrowDown size={12} /></Button>
              <Button variant="ghost" size="icon" onClick={() => setConfig({ ...config, skills: config.skills.filter((_, idx) => idx !== i) })} className="shrink-0 text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={() => setConfig({ ...config, skills: [...config.skills, { ...defaultSkill }] })} className="mt-2"><Plus size={14} className="mr-1" /> Add Skill</Button>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Education</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {config.education.map((edu, i) => (
            <div key={edu.id || i} className="border rounded-lg p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Degree</Label><Input value={edu.degree} onChange={(e) => { const updated = [...config.education]; updated[i] = { ...updated[i], degree: e.target.value }; setConfig({ ...config, education: updated }) }} /></div>
                <div className="space-y-2"><Label>Institution</Label><Input value={edu.institution} onChange={(e) => { const updated = [...config.education]; updated[i] = { ...updated[i], institution: e.target.value }; setConfig({ ...config, education: updated }) }} /></div>
                <div className="space-y-2"><Label>Period</Label><Input value={edu.period} onChange={(e) => { const updated = [...config.education]; updated[i] = { ...updated[i], period: e.target.value }; setConfig({ ...config, education: updated }) }} /></div>
                <div className="space-y-2"><Label>Location</Label><Input value={edu.location} onChange={(e) => { const updated = [...config.education]; updated[i] = { ...updated[i], location: e.target.value }; setConfig({ ...config, education: updated }) }} /></div>
              </div>
              <div className="space-y-2"><Label>Detail Heading</Label><Input value={edu.details.heading} onChange={(e) => { const updated = [...config.education]; updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }; setConfig({ ...config, education: updated }) }} /></div>
              <div className="space-y-2">
                <Label>Coursework Items</Label>
                {edu.details.items.map((item, j) => (
                  <div key={j} className="flex gap-2">
                    <Input value={item} onChange={(e) => { const updated = [...config.education]; const items = [...updated[i].details.items]; items[j] = e.target.value; updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, education: updated }) }} className="flex-1" />
                    <Button variant="ghost" size="icon" onClick={() => { const updated = [...config.education]; const items = updated[i].details.items.filter((_, idx) => idx !== j); updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, education: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => { const updated = [...config.education]; updated[i] = { ...updated[i], details: { ...updated[i].details, items: [...updated[i].details.items, ""] } }; setConfig({ ...config, education: updated }) }}><Plus size={14} className="mr-1" /> Add Item</Button>
              </div>
              <div className="space-y-2"><Label>Summary</Label><Input value={edu.details.summary} onChange={(e) => { const updated = [...config.education]; updated[i] = { ...updated[i], details: { ...updated[i].details, summary: e.target.value } }; setConfig({ ...config, education: updated }) }} /></div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled={i === 0} onClick={() => moveUp(config.education, i, (arr) => setConfig({ ...config, education: arr }))}><ArrowUp size={12} /></Button>
                <Button variant="ghost" size="sm" disabled={i === config.education.length - 1} onClick={() => moveDown(config.education, i, (arr) => setConfig({ ...config, education: arr }))}><ArrowDown size={12} /></Button>
                <Button variant="ghost" size="sm" onClick={() => { const updated = config.education.filter((_, idx) => idx !== i); setConfig({ ...config, education: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={12} className="mr-1" /> Remove</Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => setConfig({ ...config, education: [...config.education, { ...defaultEducation, id: String(Date.now()) }] })}><Plus size={14} className="mr-1" /> Add Education</Button>
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Experience</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {config.experience.map((exp, i) => (
            <div key={exp.id || i} className="border rounded-lg p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Role</Label><Input value={exp.role} onChange={(e) => { const updated = [...config.experience]; updated[i] = { ...updated[i], role: e.target.value }; setConfig({ ...config, experience: updated }) }} /></div>
                <div className="space-y-2"><Label>Company</Label><Input value={exp.company} onChange={(e) => { const updated = [...config.experience]; updated[i] = { ...updated[i], company: e.target.value }; setConfig({ ...config, experience: updated }) }} /></div>
                <div className="space-y-2"><Label>Period</Label><Input value={exp.period} onChange={(e) => { const updated = [...config.experience]; updated[i] = { ...updated[i], period: e.target.value }; setConfig({ ...config, experience: updated }) }} /></div>
                <div className="space-y-2"><Label>Location</Label><Input value={exp.location} onChange={(e) => { const updated = [...config.experience]; updated[i] = { ...updated[i], location: e.target.value }; setConfig({ ...config, experience: updated }) }} /></div>
              </div>
              <div className="space-y-2"><Label>Detail Heading</Label><Input value={exp.details.heading} onChange={(e) => { const updated = [...config.experience]; updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }; setConfig({ ...config, experience: updated }) }} /></div>
              <div className="space-y-2">
                <Label>Responsibility Items</Label>
                {exp.details.items.map((item, j) => (
                  <div key={j} className="flex gap-2">
                    <Input value={item} onChange={(e) => { const updated = [...config.experience]; const items = [...updated[i].details.items]; items[j] = e.target.value; updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, experience: updated }) }} className="flex-1" />
                    <Button variant="ghost" size="icon" onClick={() => { const updated = [...config.experience]; const items = updated[i].details.items.filter((_, idx) => idx !== j); updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, experience: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => { const updated = [...config.experience]; updated[i] = { ...updated[i], details: { ...updated[i].details, items: [...updated[i].details.items, ""] } }; setConfig({ ...config, experience: updated }) }}><Plus size={14} className="mr-1" /> Add Item</Button>
              </div>
              <div className="space-y-2"><Label>Summary (Impact)</Label><Input value={exp.details.summary} onChange={(e) => { const updated = [...config.experience]; updated[i] = { ...updated[i], details: { ...updated[i].details, summary: e.target.value } }; setConfig({ ...config, experience: updated }) }} /></div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled={i === 0} onClick={() => moveUp(config.experience, i, (arr) => setConfig({ ...config, experience: arr }))}><ArrowUp size={12} /></Button>
                <Button variant="ghost" size="sm" disabled={i === config.experience.length - 1} onClick={() => moveDown(config.experience, i, (arr) => setConfig({ ...config, experience: arr }))}><ArrowDown size={12} /></Button>
                <Button variant="ghost" size="sm" onClick={() => { const updated = config.experience.filter((_, idx) => idx !== i); setConfig({ ...config, experience: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={12} className="mr-1" /> Remove</Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => setConfig({ ...config, experience: [...config.experience, { ...defaultExperience, id: String(Date.now()) }] })}><Plus size={14} className="mr-1" /> Add Experience</Button>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Certifications</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {config.certifications.map((cert, i) => (
            <div key={cert.id || i} className="border rounded-lg p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Title</Label><Input value={cert.title} onChange={(e) => { const updated = [...config.certifications]; updated[i] = { ...updated[i], title: e.target.value }; setConfig({ ...config, certifications: updated }) }} /></div>
                <div className="space-y-2"><Label>Issuer</Label><Input value={cert.issuer} onChange={(e) => { const updated = [...config.certifications]; updated[i] = { ...updated[i], issuer: e.target.value }; setConfig({ ...config, certifications: updated }) }} /></div>
                <div className="space-y-2"><Label>Date</Label><Input value={cert.date} onChange={(e) => { const updated = [...config.certifications]; updated[i] = { ...updated[i], date: e.target.value }; setConfig({ ...config, certifications: updated }) }} /></div>
                <div className="space-y-2"><Label>Link URL</Label><Input value={cert.link || ""} onChange={(e) => { const updated = [...config.certifications]; updated[i] = { ...updated[i], link: e.target.value }; setConfig({ ...config, certifications: updated }) }} /></div>
              </div>
              <div className="space-y-2"><Label>Detail Heading</Label><Input value={cert.details.heading} onChange={(e) => { const updated = [...config.certifications]; updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }; setConfig({ ...config, certifications: updated }) }} /></div>
              <div className="space-y-2">
                <Label>Detail Items</Label>
                {cert.details.items.map((item, j) => (
                  <div key={j} className="flex gap-2">
                    <Input value={item} onChange={(e) => { const updated = [...config.certifications]; const items = [...updated[i].details.items]; items[j] = e.target.value; updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, certifications: updated }) }} className="flex-1" />
                    <Button variant="ghost" size="icon" onClick={() => { const updated = [...config.certifications]; const items = updated[i].details.items.filter((_, idx) => idx !== j); updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, certifications: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => { const updated = [...config.certifications]; updated[i] = { ...updated[i], details: { ...updated[i].details, items: [...updated[i].details.items, ""] } }; setConfig({ ...config, certifications: updated }) }}><Plus size={14} className="mr-1" /> Add Item</Button>
              </div>
              <div className="space-y-2"><Label>Summary</Label><Input value={cert.details.summary} onChange={(e) => { const updated = [...config.certifications]; updated[i] = { ...updated[i], details: { ...updated[i].details, summary: e.target.value } }; setConfig({ ...config, certifications: updated }) }} /></div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled={i === 0} onClick={() => moveUp(config.certifications, i, (arr) => setConfig({ ...config, certifications: arr }))}><ArrowUp size={12} /></Button>
                <Button variant="ghost" size="sm" disabled={i === config.certifications.length - 1} onClick={() => moveDown(config.certifications, i, (arr) => setConfig({ ...config, certifications: arr }))}><ArrowDown size={12} /></Button>
                <Button variant="ghost" size="sm" onClick={() => { const updated = config.certifications.filter((_, idx) => idx !== i); setConfig({ ...config, certifications: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={12} className="mr-1" /> Remove</Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => setConfig({ ...config, certifications: [...config.certifications, { ...defaultCertification, id: String(Date.now()) }] })}><Plus size={14} className="mr-1" /> Add Certification</Button>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="mb-6">
        <CardHeader><CardTitle>Achievements</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {config.achievements.map((ach, i) => (
            <div key={ach.id || i} className="border rounded-lg p-4 space-y-3">
              <div className="grid md:grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Title</Label><Input value={ach.title} onChange={(e) => { const updated = [...config.achievements]; updated[i] = { ...updated[i], title: e.target.value }; setConfig({ ...config, achievements: updated }) }} /></div>
                <div className="space-y-2"><Label>Subtitle</Label><Input value={ach.subtitle} onChange={(e) => { const updated = [...config.achievements]; updated[i] = { ...updated[i], subtitle: e.target.value }; setConfig({ ...config, achievements: updated }) }} /></div>
                <div className="space-y-2"><Label>Period</Label><Input value={ach.period} onChange={(e) => { const updated = [...config.achievements]; updated[i] = { ...updated[i], period: e.target.value }; setConfig({ ...config, achievements: updated }) }} /></div>
              </div>
              <div className="space-y-2"><Label>Detail Heading</Label><Input value={ach.details.heading} onChange={(e) => { const updated = [...config.achievements]; updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }; setConfig({ ...config, achievements: updated }) }} /></div>
              <div className="space-y-2">
                <Label>Detail Items</Label>
                {ach.details.items.map((item, j) => (
                  <div key={j} className="flex gap-2">
                    <Input value={item} onChange={(e) => { const updated = [...config.achievements]; const items = [...updated[i].details.items]; items[j] = e.target.value; updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, achievements: updated }) }} className="flex-1" />
                    <Button variant="ghost" size="icon" onClick={() => { const updated = [...config.achievements]; const items = updated[i].details.items.filter((_, idx) => idx !== j); updated[i] = { ...updated[i], details: { ...updated[i].details, items } }; setConfig({ ...config, achievements: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={14} /></Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => { const updated = [...config.achievements]; updated[i] = { ...updated[i], details: { ...updated[i].details, items: [...updated[i].details.items, ""] } }; setConfig({ ...config, achievements: updated }) }}><Plus size={14} className="mr-1" /> Add Item</Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" disabled={i === 0} onClick={() => moveUp(config.achievements, i, (arr) => setConfig({ ...config, achievements: arr }))}><ArrowUp size={12} /></Button>
                <Button variant="ghost" size="sm" disabled={i === config.achievements.length - 1} onClick={() => moveDown(config.achievements, i, (arr) => setConfig({ ...config, achievements: arr }))}><ArrowDown size={12} /></Button>
                <Button variant="ghost" size="sm" onClick={() => { const updated = config.achievements.filter((_, idx) => idx !== i); setConfig({ ...config, achievements: updated }) }} className="text-destructive hover:text-destructive"><Trash2 size={12} className="mr-1" /> Remove</Button>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={() => setConfig({ ...config, achievements: [...config.achievements, { ...defaultAchievement, id: String(Date.now()) }] })}><Plus size={14} className="mr-1" /> Add Achievement</Button>
        </CardContent>
      </Card>
    </div>
  )
}