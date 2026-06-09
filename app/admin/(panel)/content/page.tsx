"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Save } from "lucide-react"
import UploadBtn from "@/components/upload-btn"
import type { SiteConfig, Skill, Education, Experience, Certification, Achievement } from "@/lib/db"

const defaultSkill: Skill = { name: "", percentage: 80 }

const defaultEducation: Education = {
  id: "",
  degree: "",
  institution: "",
  period: "",
  location: "",
  details: { heading: "", items: [""], summary: "" },
}

const defaultExperience: Experience = {
  id: "",
  role: "",
  company: "",
  period: "",
  location: "",
  details: { heading: "", items: [""], summary: "" },
}

const defaultCertification: Certification = {
  id: "",
  title: "",
  issuer: "",
  date: "",
  link: "",
  linkText: "",
  details: { heading: "", items: [""], summary: "" },
}

const defaultAchievement: Achievement = {
  id: "",
  title: "",
  subtitle: "",
  period: "",
  details: { heading: "", items: [""] },
}

export default function AdminContent() {
  const [config, setConfig] = useState<SiteConfig | null>(null)
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch("/api/site")
      .then((r) => r.json())
      .then(setConfig)
  }, [])

  const handleSave = async () => {
    if (!config) return
    setLoading(true)
    await fetch("/api/site", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(config),
    })
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  if (!config) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-teal-400 mb-4">{title}</h2>
      {children}
    </div>
  )

  const Label = ({ children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <label className="block text-sm text-gray-400 mb-1" {...props}>{children}</label>
  )

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Site Content</h1>
        <Button onClick={handleSave} disabled={loading} className="bg-teal-500 hover:bg-teal-600 text-white">
          <Save size={16} className="mr-2" />
          {loading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* Hero */}
      <Section title="Hero Section">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <Input
              value={config.hero.name}
              onChange={(e) => setConfig({ ...config, hero: { ...config.hero, name: e.target.value } })}
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              value={config.hero.title}
              onChange={(e) => setConfig({ ...config, hero: { ...config.hero, title: e.target.value } })}
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <Textarea
              value={config.hero.description}
              onChange={(e) => setConfig({ ...config, hero: { ...config.hero, description: e.target.value } })}
              className="bg-slate-900 border-slate-600 text-white"
              rows={4}
            />
          </div>
          <div>
            <Label>CV URL</Label>
            <Input
              value={config.hero.cvUrl}
              onChange={(e) => setConfig({ ...config, hero: { ...config.hero, cvUrl: e.target.value } })}
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label>Portrait URL</Label>
            <div className="flex gap-2">
              <Input
                value={config.hero.portraitUrl}
                onChange={(e) => setConfig({ ...config, hero: { ...config.hero, portraitUrl: e.target.value } })}
                className="bg-slate-900 border-slate-600 text-white flex-1"
              />
              <UploadBtn onUpload={(url) => setConfig({ ...config, hero: { ...config.hero, portraitUrl: url } })} />
            </div>
          </div>
        </div>
      </Section>

      {/* Social Links */}
      <Section title="Social Links">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>LinkedIn</Label>
            <Input
              value={config.social.linkedin}
              onChange={(e) => setConfig({ ...config, social: { ...config.social, linkedin: e.target.value } })}
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label>GitHub</Label>
            <Input
              value={config.social.github}
              onChange={(e) => setConfig({ ...config, social: { ...config.social, github: e.target.value } })}
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>
          <div>
            <Label>Medium</Label>
            <Input
              value={config.social.medium}
              onChange={(e) => setConfig({ ...config, social: { ...config.social, medium: e.target.value } })}
              className="bg-slate-900 border-slate-600 text-white"
            />
          </div>
        </div>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        {config.skills.map((skill, i) => (
          <div key={i} className="grid grid-cols-[1fr,120px,40px] gap-2 mb-2 items-end">
            <div>
              <Label>Name</Label>
              <Input
                value={skill.name}
                onChange={(e) => {
                  const updated = [...config.skills]
                  updated[i] = { ...updated[i], name: e.target.value }
                  setConfig({ ...config, skills: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label>%</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={skill.percentage}
                onChange={(e) => {
                  const updated = [...config.skills]
                  updated[i] = { ...updated[i], percentage: Number(e.target.value) }
                  setConfig({ ...config, skills: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const updated = config.skills.filter((_, idx) => idx !== i)
                setConfig({ ...config, skills: updated })
              }}
              className="h-9 w-9 text-gray-400 hover:text-red-400"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setConfig({
              ...config,
              skills: [...config.skills, { ...defaultSkill }],
            })
          }}
          className="mt-2 border-slate-600 text-gray-400 hover:text-white text-sm"
        >
          <Plus size={14} className="mr-1" /> Add Skill
        </Button>
      </Section>

      {/* Education */}
      <Section title="Education">
        {config.education.map((edu, i) => (
          <div key={edu.id || i} className="border border-slate-700 rounded-lg p-4 mb-4">
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const updated = [...config.education]
                    updated[i] = { ...updated[i], degree: e.target.value }
                    setConfig({ ...config, education: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Institution</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => {
                    const updated = [...config.education]
                    updated[i] = { ...updated[i], institution: e.target.value }
                    setConfig({ ...config, education: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Period</Label>
                <Input
                  value={edu.period}
                  onChange={(e) => {
                    const updated = [...config.education]
                    updated[i] = { ...updated[i], period: e.target.value }
                    setConfig({ ...config, education: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => {
                    const updated = [...config.education]
                    updated[i] = { ...updated[i], location: e.target.value }
                    setConfig({ ...config, education: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label>Detail Heading</Label>
              <Input
                value={edu.details.heading}
                onChange={(e) => {
                  const updated = [...config.education]
                  updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }
                  setConfig({ ...config, education: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white mb-2"
              />
            </div>
            <Label>Coursework Items</Label>
            {edu.details.items.map((item, j) => (
              <div key={j} className="flex gap-2 mb-1">
                <Input
                  value={item}
                  onChange={(e) => {
                    const updated = [...config.education]
                    const items = [...updated[i].details.items]
                    items[j] = e.target.value
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, education: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updated = [...config.education]
                    const items = updated[i].details.items.filter((_, idx) => idx !== j)
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, education: updated })
                  }}
                  className="h-9 w-9 text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = [...config.education]
                updated[i] = {
                  ...updated[i],
                  details: { ...updated[i].details, items: [...updated[i].details.items, ""] },
                }
                setConfig({ ...config, education: updated })
              }}
              className="mt-1 border-slate-600 text-gray-400 hover:text-white text-xs"
            >
              + Add Item
            </Button>
            <div className="mt-2">
              <Label>Summary</Label>
              <Input
                value={edu.details.summary}
                onChange={(e) => {
                  const updated = [...config.education]
                  updated[i] = { ...updated[i], details: { ...updated[i].details, summary: e.target.value } }
                  setConfig({ ...config, education: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const updated = config.education.filter((_, idx) => idx !== i)
                setConfig({ ...config, education: updated })
              }}
              className="mt-3 text-red-400 hover:text-red-300 text-xs"
            >
              <Trash2 size={12} className="mr-1" /> Remove Education
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setConfig({
              ...config,
              education: [...config.education, { ...defaultEducation, id: String(Date.now()) }],
            })
          }}
          className="border-slate-600 text-gray-400 hover:text-white text-sm"
        >
          <Plus size={14} className="mr-1" /> Add Education
        </Button>
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {config.experience.map((exp, i) => (
          <div key={exp.id || i} className="border border-slate-700 rounded-lg p-4 mb-4">
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div>
                <Label>Role</Label>
                <Input
                  value={exp.role}
                  onChange={(e) => {
                    const updated = [...config.experience]
                    updated[i] = { ...updated[i], role: e.target.value }
                    setConfig({ ...config, experience: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Company</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...config.experience]
                    updated[i] = { ...updated[i], company: e.target.value }
                    setConfig({ ...config, experience: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Period</Label>
                <Input
                  value={exp.period}
                  onChange={(e) => {
                    const updated = [...config.experience]
                    updated[i] = { ...updated[i], period: e.target.value }
                    setConfig({ ...config, experience: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => {
                    const updated = [...config.experience]
                    updated[i] = { ...updated[i], location: e.target.value }
                    setConfig({ ...config, experience: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label>Detail Heading</Label>
              <Input
                value={exp.details.heading}
                onChange={(e) => {
                  const updated = [...config.experience]
                  updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }
                  setConfig({ ...config, experience: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white mb-2"
              />
            </div>
            <Label>Responsibility Items</Label>
            {exp.details.items.map((item, j) => (
              <div key={j} className="flex gap-2 mb-1">
                <Input
                  value={item}
                  onChange={(e) => {
                    const updated = [...config.experience]
                    const items = [...updated[i].details.items]
                    items[j] = e.target.value
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, experience: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updated = [...config.experience]
                    const items = updated[i].details.items.filter((_, idx) => idx !== j)
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, experience: updated })
                  }}
                  className="h-9 w-9 text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = [...config.experience]
                updated[i] = {
                  ...updated[i],
                  details: { ...updated[i].details, items: [...updated[i].details.items, ""] },
                }
                setConfig({ ...config, experience: updated })
              }}
              className="mt-1 border-slate-600 text-gray-400 hover:text-white text-xs"
            >
              + Add Item
            </Button>
            <div className="mt-2">
              <Label>Summary (Impact)</Label>
              <Input
                value={exp.details.summary}
                onChange={(e) => {
                  const updated = [...config.experience]
                  updated[i] = { ...updated[i], details: { ...updated[i].details, summary: e.target.value } }
                  setConfig({ ...config, experience: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const updated = config.experience.filter((_, idx) => idx !== i)
                setConfig({ ...config, experience: updated })
              }}
              className="mt-3 text-red-400 hover:text-red-300 text-xs"
            >
              <Trash2 size={12} className="mr-1" /> Remove Experience
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setConfig({
              ...config,
              experience: [...config.experience, { ...defaultExperience, id: String(Date.now()) }],
            })
          }}
          className="border-slate-600 text-gray-400 hover:text-white text-sm"
        >
          <Plus size={14} className="mr-1" /> Add Experience
        </Button>
      </Section>

      {/* Certifications */}
      <Section title="Certifications">
        {config.certifications.map((cert, i) => (
          <div key={cert.id || i} className="border border-slate-700 rounded-lg p-4 mb-4">
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div>
                <Label>Title</Label>
                <Input
                  value={cert.title}
                  onChange={(e) => {
                    const updated = [...config.certifications]
                    updated[i] = { ...updated[i], title: e.target.value }
                    setConfig({ ...config, certifications: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Issuer</Label>
                <Input
                  value={cert.issuer}
                  onChange={(e) => {
                    const updated = [...config.certifications]
                    updated[i] = { ...updated[i], issuer: e.target.value }
                    setConfig({ ...config, certifications: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Date</Label>
                <Input
                  value={cert.date}
                  onChange={(e) => {
                    const updated = [...config.certifications]
                    updated[i] = { ...updated[i], date: e.target.value }
                    setConfig({ ...config, certifications: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Link URL</Label>
                <Input
                  value={cert.link || ""}
                  onChange={(e) => {
                    const updated = [...config.certifications]
                    updated[i] = { ...updated[i], link: e.target.value }
                    setConfig({ ...config, certifications: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label>Detail Heading</Label>
              <Input
                value={cert.details.heading}
                onChange={(e) => {
                  const updated = [...config.certifications]
                  updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }
                  setConfig({ ...config, certifications: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white mb-2"
              />
            </div>
            <Label>Detail Items</Label>
            {cert.details.items.map((item, j) => (
              <div key={j} className="flex gap-2 mb-1">
                <Input
                  value={item}
                  onChange={(e) => {
                    const updated = [...config.certifications]
                    const items = [...updated[i].details.items]
                    items[j] = e.target.value
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, certifications: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updated = [...config.certifications]
                    const items = updated[i].details.items.filter((_, idx) => idx !== j)
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, certifications: updated })
                  }}
                  className="h-9 w-9 text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = [...config.certifications]
                updated[i] = {
                  ...updated[i],
                  details: { ...updated[i].details, items: [...updated[i].details.items, ""] },
                }
                setConfig({ ...config, certifications: updated })
              }}
              className="mt-1 border-slate-600 text-gray-400 hover:text-white text-xs"
            >
              + Add Item
            </Button>
            <div className="mt-2">
              <Label>Summary</Label>
              <Input
                value={cert.details.summary}
                onChange={(e) => {
                  const updated = [...config.certifications]
                  updated[i] = { ...updated[i], details: { ...updated[i].details, summary: e.target.value } }
                  setConfig({ ...config, certifications: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const updated = config.certifications.filter((_, idx) => idx !== i)
                setConfig({ ...config, certifications: updated })
              }}
              className="mt-3 text-red-400 hover:text-red-300 text-xs"
            >
              <Trash2 size={12} className="mr-1" /> Remove Certification
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setConfig({
              ...config,
              certifications: [...config.certifications, { ...defaultCertification, id: String(Date.now()) }],
            })
          }}
          className="border-slate-600 text-gray-400 hover:text-white text-sm"
        >
          <Plus size={14} className="mr-1" /> Add Certification
        </Button>
      </Section>

      {/* Achievements */}
      <Section title="Achievements">
        {config.achievements.map((ach, i) => (
          <div key={ach.id || i} className="border border-slate-700 rounded-lg p-4 mb-4">
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <div>
                <Label>Title</Label>
                <Input
                  value={ach.title}
                  onChange={(e) => {
                    const updated = [...config.achievements]
                    updated[i] = { ...updated[i], title: e.target.value }
                    setConfig({ ...config, achievements: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Subtitle</Label>
                <Input
                  value={ach.subtitle}
                  onChange={(e) => {
                    const updated = [...config.achievements]
                    updated[i] = { ...updated[i], subtitle: e.target.value }
                    setConfig({ ...config, achievements: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label>Period</Label>
                <Input
                  value={ach.period}
                  onChange={(e) => {
                    const updated = [...config.achievements]
                    updated[i] = { ...updated[i], period: e.target.value }
                    setConfig({ ...config, achievements: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white"
                />
              </div>
            </div>
            <div>
              <Label>Detail Heading</Label>
              <Input
                value={ach.details.heading}
                onChange={(e) => {
                  const updated = [...config.achievements]
                  updated[i] = { ...updated[i], details: { ...updated[i].details, heading: e.target.value } }
                  setConfig({ ...config, achievements: updated })
                }}
                className="bg-slate-900 border-slate-600 text-white mb-2"
              />
            </div>
            <Label>Detail Items</Label>
            {ach.details.items.map((item, j) => (
              <div key={j} className="flex gap-2 mb-1">
                <Input
                  value={item}
                  onChange={(e) => {
                    const updated = [...config.achievements]
                    const items = [...updated[i].details.items]
                    items[j] = e.target.value
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, achievements: updated })
                  }}
                  className="bg-slate-900 border-slate-600 text-white flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    const updated = [...config.achievements]
                    const items = updated[i].details.items.filter((_, idx) => idx !== j)
                    updated[i] = { ...updated[i], details: { ...updated[i].details, items } }
                    setConfig({ ...config, achievements: updated })
                  }}
                  className="h-9 w-9 text-gray-400 hover:text-red-400"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const updated = [...config.achievements]
                updated[i] = {
                  ...updated[i],
                  details: { ...updated[i].details, items: [...updated[i].details.items, ""] },
                }
                setConfig({ ...config, achievements: updated })
              }}
              className="mt-1 border-slate-600 text-gray-400 hover:text-white text-xs"
            >
              + Add Item
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const updated = config.achievements.filter((_, idx) => idx !== i)
                setConfig({ ...config, achievements: updated })
              }}
              className="mt-3 text-red-400 hover:text-red-300 text-xs"
            >
              <Trash2 size={12} className="mr-1" /> Remove Achievement
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          onClick={() => {
            setConfig({
              ...config,
              achievements: [...config.achievements, { ...defaultAchievement, id: String(Date.now()) }],
            })
          }}
          className="border-slate-600 text-gray-400 hover:text-white text-sm"
        >
          <Plus size={14} className="mr-1" /> Add Achievement
        </Button>
      </Section>
    </div>
  )
}
