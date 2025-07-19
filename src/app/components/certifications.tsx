"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

interface Certification {
  id: string
  title: string
  organization: string
  imageUrl?: string
  certificateUrl: string
  organizationUrl?: string
}

interface CertificationsListProps {
  certifications: Certification[]
}

export default function CertificationsList({ certifications }: CertificationsListProps) {
  const certRefs = useRef<(HTMLDivElement | null)[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialiser les animations avec ScrollTrigger
    certRefs.current.forEach((certRef) => {
      if (!certRef) return

      gsap.fromTo(certRef,
        { 
          x:150,
          y: 50, 
          opacity: 0 
        },
        {
          x:0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: certRef,
            start: "top 80%", 
            end: "bottom 20%", 
            toggleActions: "play none none reverse", 
            
          }
        }
      )
    })

    // Nettoyage
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="w-full max-w-2xl space-y-4 p-4"
    >
      {certifications.map((cert, index) => (
        <Link
          key={cert.id}
          href={cert.certificateUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-[1.02] hover:shadow-lg"
        >
          <div 
            ref={el => certRefs.current[index] = el}
            className="border rounded-lg p-6 flex items-center gap-4 min-h-[100px] opacity-0"
          >
            {/* Image placeholder */}
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center overflow-hidden">
                {cert.imageUrl ? (
                  <Image
                    src={cert.imageUrl || "/placeholder.svg"}
                    alt={`${cert.organization} logo`}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-400" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[#FFC03B] font-semibold text-lg mb-1 truncate">{cert.title}</h3>
              <p className="text-cyan-400 text-sm">
                by{" "}
                {cert.organizationUrl ? (
                  <span
                    onClick={(e) => {
                      e.preventDefault()
                      window.open(cert.organizationUrl, "_blank")
                    }}
                    className="hover:underline cursor-pointer"
                  >
                    {cert.organization}
                  </span>
                ) : (
                  cert.organization
                )}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}