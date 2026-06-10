export default function JsonLd() {
  const json = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ronak Bajracharya",
    jobTitle: "Cybersecurity Professional",
    description: "Dynamic cybersecurity professional with hands-on experience in security assessments, vulnerability testing, penetration testing, and digital forensics.",
    url: "https://ronakbajracharya.com.np",
    sameAs: [
      "https://www.linkedin.com/in/ronak-bajracharya-886b48317/",
      "https://github.com/RonakBajracharya",
      "https://cyancharley.medium.com",
    ],
    knowsAbout: [
      "Cybersecurity", "Penetration Testing", "Vulnerability Assessment",
      "Digital Forensics", "Network Security", "Cryptography",
      "Malware Analysis", "CTF Competitions", "Linux",
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  )
}
