import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const ctx = gsap.context(() => {
            // Animation pour chaque paragraphe individuellement
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            gsap.utils.toArray(".about-paragraph").forEach((paragraph: any) => {
                gsap.fromTo(
                    paragraph,
                    {
                        y: 50,
                        opacity: 0,
                        filter: "blur(10px)",
                    },
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: paragraph,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Animation spéciale pour le span Orange Digital Center
            gsap.fromTo(
                ".orange-highlight",
                {
                    scale: 0,
                    opacity: 0,
                    rotationX: 90,
                },
                {
                    scale: 1,
                    opacity: 1,
                    rotationX: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: ".orange-highlight",
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            // Animation pour les mots-clés techniques (effet de typewriter)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            gsap.utils.toArray(".tech-keyword").forEach((keyword: any, index: number) => {
                gsap.fromTo(
                    keyword,
                    {
                        opacity: 0,
                        scaleX: 0,
                        transformOrigin: "left center",
                    },
                    {
                        opacity: 1,
                        scaleX: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        delay: index * 0.1,
                        scrollTrigger: {
                            trigger: keyword,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

            // Animation pour les breaks avec effet de ligne
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            gsap.utils.toArray(".about-break").forEach((br: any) => {
                gsap.fromTo(
                    br,
                    {
                        scaleX: 0,
                        opacity: 0,
                    },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: "power2.out",
                        delay: 0.3,
                        scrollTrigger: {
                            trigger: br,
                            start: "top 90%",
                            end: "bottom 10%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });

        }, containerRef);

        // Cleanup function
        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={containerRef}>
            <p className="about-paragraph">
                I am a fullstack developer passionate about designing clean backend architectures and building digital solutions from the ground up.
                I specialize in building scalable and maintainable systems with <span className="tech-keyword font-semibold text-blue-400">Django</span>, while also crafting intuitive user interfaces with <span className="tech-keyword font-semibold text-cyan-400">React</span>,
                <span className="tech-keyword font-semibold text-slate-200"> Next.js</span>, and <span className="tech-keyword font-semibold text-sky-400">Flutter</span>.
            </p>
            <br className="about-break" />
            
            <p className="about-paragraph">
                I currently work as a freelance developer while pursuing my studies.
                My favorite part of the job lies in designing robust backend systems that support real-world, impactful products.
            </p>
            <br className="about-break" />
            
            <p className="about-paragraph">
                Over the past few years, I&apos;ve had the opportunity to work on a wide range of projects — including a school management platform, a real estate matchmaking marketplace, and a digital waste management platform that connects key urban actors.
                These experiences have strengthened my ability to think in terms of both technical precision and end-user needs.
            </p>
            <br className="about-break" />
            
            <p className="about-paragraph">
                I also completed a 3-month internship at <span className="orange-highlight text-orange-600 font-bold bg-[#ffa60030] p-1 mx-1 border-r-2 border-orange-400">Orange Digital Center</span> in Douala, and continue to grow through freelance collaborations.
            </p>
            <br className="about-break" />
            
            <p className="about-paragraph">
                Beyond development, I enjoy sharing knowledge. I run a YouTube channel called <span className="tech-keyword font-semibold text-red-400">APK Tech</span>, where I publish tutorials about digital tools and technologies to help others learn and grow.
            </p>
            <br className="about-break" />
            
            <p className="about-paragraph">
                When I&apos;m not coding, I&apos;m often playing chess — a passion that sharpens my strategic thinking and problem-solving skills
            </p>
        </div>
    );
}