"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"


gsap.registerPlugin(ScrollTrigger)

interface Technology {
  id: string
  name: string
  iconUrl: string
}

interface TechCategory {
  title: string
  technologies: Technology[]
}

interface TechStackProps {
  categories: TechCategory[]
}

export default function TechStack({ categories }: TechStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.utils.toArray(".category-title").forEach((title: any) => {
        gsap.fromTo(
          title,
          {
            y: 50,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: title,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })

      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.utils.toArray(".category-section").forEach((section: any) => {
        const techItems = section.querySelectorAll(".tech-item")
        const techIcons = section.querySelectorAll(".tech-icon")
        const techNames = section.querySelectorAll(".tech-name")

        // Animation des items de cette catégorie
        gsap.fromTo(
          techItems,
          {
            y: 60,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        )

        // Animation des icônes de cette catégorie
        gsap.fromTo(
          techIcons,
          {
            rotation: -180,
            scale: 0,
          },
          {
            rotation: 0,
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.5)",
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        )

        // Animation des noms de cette catégorie
        gsap.fromTo(
          techNames,
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.2,
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "play none none reverse",
            },
          }
        )
      })
    }, containerRef)

    // Cleanup function
    return () => {
      ctx.revert()
    }
  }, [categories])

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto p-8 min-h-screen">
      {categories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="category-section mb-16">
          {/* Category Title */}
          <h2 className="category-title text-xl font-bold text-gray-500 mb-8 tracking-wider">
            {category.title}
          </h2>

          {/* Technologies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.technologies.map((tech) => (
              <div
                key={tech.id}
                className="tech-item flex items-center gap-4 p-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                {/* Technology Icon */}
                <div className="tech-icon w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={tech.iconUrl || "/placeholder.svg"}
                    alt={`${tech.name} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>

                {/* Technology Name */}
                <span className="tech-name text-white text-xl font-medium">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}