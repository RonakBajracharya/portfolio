"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Linkedin, Github, Award, Trophy } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function Portfolio() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navHeight = 80 // Height of fixed navigation
      const elementPosition = element.offsetTop - navHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm z-50 border-b border-slate-800 transition-all duration-300">
        <div className="text-2xl font-bold text-teal-400 hover:scale-110 transition-transform duration-300 cursor-pointer">
          Ronak.
        </div>
        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-teal-400 hover:text-teal-300 transition-all duration-300 hover:scale-105 relative group"
          >
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-teal-400 transition-all duration-300 hover:scale-105 relative group"
          >
            About
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("education")}
            className="hover:text-teal-400 transition-all duration-300 hover:scale-105 relative group"
          >
            Education
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("skills")}
            className="hover:text-teal-400 transition-all duration-300 hover:scale-105 relative group"
          >
            Skills
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("certifications")}
            className="hover:text-teal-400 transition-all duration-300 hover:scale-105 relative group"
          >
            Certifications
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="hover:text-teal-400 transition-all duration-300 hover:scale-105 relative group"
          >
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-full"></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="px-8 py-16 pt-24 relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
          >
            <h1 className="text-5xl md:text-6xl font-bold animate-fade-in-up">
              {"Hi, I'm"} <span className="text-teal-400 animate-pulse">Ronak Bajracharya</span>
            </h1>
            <h2 className="text-2xl text-teal-400 font-semibold animate-fade-in-up delay-200">
              Cybersecurity Professional
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-lg animate-fade-in-up delay-300">
              Dynamic cybersecurity professional with hands-on experience, excelling in security assessments and
              vulnerability testing. Proficient in Linux and network monitoring, I thrive in collaborative environments,
              driving impactful research on emerging threats. Passionate about enhancing security measures.
            </p>
            <div className="flex gap-4 animate-fade-in-up delay-500">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group">
                <span className="relative z-10">Hire Me</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
              <Button
                variant="outline"
                className="border-teal-500 text-teal-400 hover:bg-teal-500 hover:text-white px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
              >
                <span className="relative z-10">{"Let's Talk"}</span>
                <div className="absolute inset-0 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </div>
            <div className="flex gap-4 pt-8 animate-fade-in-up delay-700">
              <a
                href="https://linkedin.com/in/ronak-bajracharya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-teal-400 flex items-center justify-center hover:bg-teal-400 hover:text-slate-900 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-teal-500/50"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/ronak-bajracharya"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-teal-400 flex items-center justify-center hover:bg-teal-400 hover:text-slate-900 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-teal-500/50"
              >
                <Github size={20} />
              </a>
              <a
                href="https://cyancharley.medium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-teal-400 flex items-center justify-center hover:bg-teal-400 hover:text-slate-900 transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-12 hover:shadow-lg hover:shadow-teal-500/50"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>
          </div>
          <div
            className={`relative transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <Image
                src="/images/ronak-portrait.png"
                alt="Ronak Bajracharya Portrait"
                width={500}
                height={600}
                className="relative w-full max-w-md mx-auto rounded-lg transform hover:scale-105 transition-all duration-500 hover:shadow-2xl hover:shadow-teal-500/25"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 py-16 bg-slate-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold mb-12 animate-fade-in-up">
            About <span className="text-teal-400 animate-pulse">Me</span>
          </h2>
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto rounded-full border-4 border-teal-400 overflow-hidden mb-6 relative group animate-fade-in-up delay-200">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-teal-400 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <Image
                src="/images/ronak-portrait.png"
                alt="Ronak Bajracharya"
                width={128}
                height={128}
                className="relative w-full h-full object-cover transform hover:scale-110 transition-all duration-500"
              />
            </div>
            <h3 className="text-2xl font-bold text-teal-400 mb-4 animate-fade-in-up delay-300">
              Cybersecurity Professional!
            </h3>
            <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8 animate-fade-in-up delay-400">
              Dynamic cybersecurity professional with hands-on experience, excelling in security assessments and
              vulnerability testing. Proficient in Linux and network monitoring, I thrive in collaborative environments,
              driving impactful research on emerging threats. Passionate about enhancing security measures.
            </p>
            <Button className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 animate-fade-in-up delay-500 relative overflow-hidden group">
              <span className="relative z-10">Read More</span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Button>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="education" className="px-8 py-16 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
            My <span className="text-teal-400 animate-pulse">Journey</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div className="animate-fade-in-up delay-200">
              <h3 className="text-2xl font-bold mb-8 text-teal-400">Education</h3>
              <div className="space-y-6">
                <div
                  className="border border-teal-400/30 rounded-lg p-6 hover:border-teal-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
                  onClick={() => toggleCard("education-1")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2">BSC.(HONS): ETHICAL HACKING AND CYBER SECURITY</h4>
                    <p className="text-teal-400 text-sm mb-3">Softwarica College of IT and E-commerce</p>
                    <span className="text-teal-400 text-sm">01/2024, Dillibazar</span>

                    {expandedCard === "education-1" && (
                      <div className="mt-4 pt-4 border-t border-teal-400/20 animate-fade-in-down">
                        <h5 className="font-semibold text-teal-400 mb-2">Key Coursework & Achievements:</h5>
                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                          <li>Advanced Penetration Testing and Vulnerability Assessment</li>
                          <li>Digital Forensics and Incident Response</li>
                          <li>Cryptography and Secure Communications</li>
                          <li>Network Security and Monitoring</li>
                          <li>Malware Analysis and Reverse Engineering</li>
                          <li>Ethical Hacking Methodologies</li>
                        </ul>
                        <div className="mt-3">
                          <p className="text-gray-300 text-sm">
                            <strong>Specialization:</strong> Focused on practical cybersecurity applications with
                            hands-on experience in security testing, threat analysis, and defensive security measures.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div className="animate-fade-in-up delay-400">
              <h3 className="text-2xl font-bold mb-8 text-teal-400">Experience</h3>
              <div className="space-y-6">
                <div
                  className="border border-teal-400/30 rounded-lg p-6 hover:border-teal-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
                  onClick={() => toggleCard("experience-1")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2">Associate Security Research Analyst</h4>
                    <p className="text-teal-400 text-sm mb-3">SecurityPal AI</p>
                    <span className="text-teal-400 text-sm">12/2024 to 06/2025, Kathmandu</span>

                    {expandedCard === "experience-1" && (
                      <div className="mt-4 pt-4 border-t border-teal-400/20 animate-fade-in-down">
                        <h5 className="font-semibold text-teal-400 mb-2">Key Responsibilities:</h5>
                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                          <li>
                            Conducted in-depth security assessments and risk analyses to identify vulnerabilities across
                            client environments
                          </li>
                          <li>Researched and documented emerging threats, including cloud misconfigurations</li>
                          <li>Collaborated with cross-functional teams to ensure accuracy of research results</li>
                          <li>Analyzed trends in cybersecurity threats and vulnerabilities</li>
                          <li>Developed comprehensive security reports and recommendations</li>
                        </ul>
                        <div className="mt-3">
                          <p className="text-gray-300 text-sm">
                            <strong>Impact:</strong> Successfully identified critical vulnerabilities in 50+ client
                            environments, contributing to enhanced security posture and threat mitigation strategies.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="border border-teal-400/30 rounded-lg p-6 hover:border-teal-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
                  onClick={() => toggleCard("experience-2")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2">Cybersecurity Intern</h4>
                    <p className="text-teal-400 text-sm mb-3">Centre for Sustainable Development Studies</p>
                    <span className="text-teal-400 text-sm">08/2024 to 10/2024, Kathmandu</span>

                    {expandedCard === "experience-2" && (
                      <div className="mt-4 pt-4 border-t border-teal-400/20 animate-fade-in-down">
                        <h5 className="font-semibold text-teal-400 mb-2">Key Responsibilities:</h5>
                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                          <li>Helped in the VAPT test of websites and web applications</li>
                          <li>Carried out research for automation and QA testing of web applications</li>
                          <li>Assisted in monitoring network security for potential threats and vulnerabilities</li>
                          <li>Participated in security awareness training sessions</li>
                          <li>Documented security findings and remediation strategies</li>
                        </ul>
                        <div className="mt-3">
                          <p className="text-gray-300 text-sm">
                            <strong>Learning Outcomes:</strong> Gained practical experience in vulnerability assessment,
                            penetration testing methodologies, and network security monitoring in a real-world
                            environment.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="px-8 py-16 bg-slate-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-teal-500/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
            My <span className="text-teal-400 animate-pulse">Skills</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Technical Skills */}
            <div className="animate-fade-in-up delay-200">
              <h3 className="text-2xl font-bold mb-8 text-teal-400">Technical Skills</h3>
              <div className="space-y-6">
                {[
                  { skill: "Linux Proficiency", percentage: 95 },
                  { skill: "Network Monitoring", percentage: 90 },
                  { skill: "Security Assessments", percentage: 85 },
                  { skill: "Cryptography", percentage: 80 },
                  { skill: "Vulnerability Testing", percentage: 85 },
                ].map((item, index) => (
                  <div
                    key={item.skill}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${300 + index * 100}ms` }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{item.skill}</span>
                      <span className="text-teal-400">{item.percentage}%</span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={item.percentage}
                        className="h-2 bg-slate-700 [&>div]:bg-teal-400 [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out hover:[&>div]:shadow-lg hover:[&>div]:shadow-teal-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional Skills */}
            <div className="animate-fade-in-up delay-400">
              <h3 className="text-2xl font-bold mb-8 text-teal-400">Professional Skills</h3>
              <div className="space-y-6">
                {[
                  { skill: "Digital Forensics", percentage: 90 },
                  { skill: "Risk Analysis", percentage: 85 },
                  { skill: "Threat Research", percentage: 80 },
                  { skill: "VAPT Testing", percentage: 75 },
                  { skill: "Malware Analysis", percentage: 70 },
                ].map((item, index) => (
                  <div
                    key={item.skill}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${500 + index * 100}ms` }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold">{item.skill}</span>
                      <span className="text-teal-400">{item.percentage}%</span>
                    </div>
                    <div className="relative">
                      <Progress
                        value={item.percentage}
                        className="h-2 bg-slate-700 [&>div]:bg-teal-400 [&>div]:transition-all [&>div]:duration-1000 [&>div]:ease-out hover:[&>div]:shadow-lg hover:[&>div]:shadow-teal-500/50"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications and Achievements Section */}
      <section id="certifications" className="px-8 py-16 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
            Certifications & <span className="text-teal-400 animate-pulse">Achievements</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {/* Certifications */}
            <div className="animate-fade-in-up delay-200">
              <h3 className="text-2xl font-bold mb-8 text-teal-400 flex items-center gap-2">
                <Award size={24} className="animate-bounce" />
                Certifications
              </h3>
              <div className="space-y-6">
                <div
                  className="border border-teal-400/30 rounded-lg p-6 hover:border-teal-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
                  onClick={() => toggleCard("cert-1")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2">Certified in Cybersecurity (CC)</h4>
                    <p className="text-teal-400 text-sm mb-3">ISC² Certification</p>
                    <span className="text-teal-400 text-sm">February 27, 2025</span>

                    {expandedCard === "cert-1" && (
                      <div className="mt-4 pt-4 border-t border-teal-400/20 animate-fade-in-down">
                        <h5 className="font-semibold text-teal-400 mb-2">Certification Details:</h5>
                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                          <li>Entry-level cybersecurity certification from ISC²</li>
                          <li>Covers fundamental security principles and practices</li>
                          <li>Validates knowledge in risk management, security controls, and incident response</li>
                          <li>Demonstrates commitment to cybersecurity best practices</li>
                        </ul>
                        <div className="mt-3">
                          <p className="text-gray-300 text-sm">
                            <strong>Skills Validated:</strong> Security principles, risk management, network security,
                            access controls, and security operations.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="border border-teal-400/30 rounded-lg p-6 hover:border-teal-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
                  onClick={() => toggleCard("cert-2")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2">Crime Investigation and Analysis</h4>
                    <p className="text-teal-400 text-sm mb-3">Professional Certification</p>
                    <span className="text-teal-400 text-sm">2024</span>

                    {expandedCard === "cert-2" && (
                      <div className="mt-4 pt-4 border-t border-teal-400/20 animate-fade-in-down">
                        <h5 className="font-semibold text-teal-400 mb-2">Certification Details:</h5>
                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                          <li>Specialized training in digital crime investigation techniques</li>
                          <li>Evidence collection and preservation methodologies</li>
                          <li>Forensic analysis of digital artifacts</li>
                          <li>Legal aspects of cybercrime investigation</li>
                        </ul>
                        <div className="mt-3">
                          <p className="text-gray-300 text-sm">
                            <strong>Skills Validated:</strong> Digital forensics, evidence handling, crime scene
                            analysis, and investigative procedures.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="animate-fade-in-up delay-400">
              <h3 className="text-2xl font-bold mb-8 text-teal-400 flex items-center gap-2">
                <Trophy size={24} className="animate-bounce delay-500" />
                CTF Achievements
              </h3>
              <div className="space-y-6">
                <div
                  className="border border-teal-400/30 rounded-lg p-6 hover:border-teal-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
                  onClick={() => toggleCard("achievement-1")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2">Multiple CTF Participations</h4>
                    <p className="text-teal-400 text-sm mb-3">Capture The Flag Competitions</p>
                    <span className="text-teal-400 text-sm">2024 - 2025</span>

                    {expandedCard === "achievement-1" && (
                      <div className="mt-4 pt-4 border-t border-teal-400/20 animate-fade-in-down">
                        <h5 className="font-semibold text-teal-400 mb-2">CTF Events Participated:</h5>
                        <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                          <li>
                            <strong>KU CTF 2024</strong> - Kathmandu University Capture The Flag competition
                          </li>
                          <li>
                            <strong>INTIGRITI CTF 2024</strong> - International cybersecurity competition
                          </li>
                          <li>
                            <strong>L34K CTF 2025</strong> - Advanced penetration testing challenges
                          </li>
                          <li>Multiple other regional and international CTF events</li>
                        </ul>
                        <div className="mt-3">
                          <p className="text-gray-300 text-sm">
                            <strong>Skills Demonstrated:</strong> Web exploitation, cryptography, reverse engineering,
                            forensics, and penetration testing across various platforms and scenarios.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className="border border-teal-400/30 rounded-lg p-6 hover:border-teal-400 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group"
                  onClick={() => toggleCard("achievement-2")}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-semibold mb-2">Research Projects</h4>
                    <p className="text-teal-400 text-sm mb-3">Academic & Professional Research</p>
                    <span className="text-teal-400 text-sm">2024 - Present</span>

                    {expandedCard === "achievement-2" && (
                      <div className="mt-4 pt-4 border-t border-teal-400/20 animate-fade-in-down">
                        <h5 className="font-semibold text-teal-400 mb-2">Notable Projects:</h5>
                        <ul className="text-gray-300 text-sm space-y-2 list-disc list-inside">
                          <li>
                            <strong>Quantum Resistant Cryptographic Measures:</strong> Researched and developed
                            prototype cryptographic system using quantum resistant key exchange protocols
                          </li>
                          <li>
                            <strong>Network Architecture Development:</strong> Designed secure network architecture with
                            VPN implementation and advanced routing protocols
                          </li>
                          <li>
                            <strong>Malware Analysis & Exploit Development:</strong> Static and dynamic malware analysis
                            with vulnerability research and exploit development
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-16 bg-slate-800/50 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">
            Contact <span className="text-teal-400 animate-pulse">Me!</span>
          </h2>
          <form className="space-y-6 animate-fade-in-up delay-200">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                placeholder="Full Name"
                className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
              />
              <Input
                placeholder="Email Address"
                type="email"
                className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                placeholder="Mobile Number"
                className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
              />
              <Input
                placeholder="Email Subject"
                className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
              />
            </div>
            <Textarea
              placeholder="Your Message"
              rows={6}
              className="bg-slate-800 border-teal-400/30 text-white placeholder:text-gray-400 focus:border-teal-400 transition-all duration-300 hover:border-teal-400/50 focus:shadow-lg focus:shadow-teal-500/25"
            />
            <div className="text-center">
              <Button className="bg-teal-500 hover:bg-teal-600 text-white px-12 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/25 relative overflow-hidden group">
                <span className="relative z-10">Send Message</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 bg-slate-800 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-teal-500/5 to-transparent"></div>
        <p className="text-gray-400 relative z-10 animate-fade-in-up">© 2024 Ronak Bajracharya. All rights reserved.</p>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.5s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 200ms;
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        .delay-400 {
          animation-delay: 400ms;
        }

        .delay-500 {
          animation-delay: 500ms;
        }

        .delay-700 {
          animation-delay: 700ms;
        }
      `}</style>
    </div>
  )
}

// Contact Information:
// Location: Kathmandu, Nepal
// Phone: +9779864236214
// Email: rbaz9864@gmail.com
// Website: cyancharley.medium.com
