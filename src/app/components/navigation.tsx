import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type Menu = {
    name: string;
    anchor: string;
}

type Props = {
    menus: Menu[]
}

export default function Navigation({ menus }: Props) {
    const [activeSection, setActiveSection] = useState<string>("");
    const navRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!navRef.current) return;

        const ctx = gsap.context(() => {
            
            gsap.fromTo(
                ".nav-item",
                {
                    y: -20,
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
                    delay: 0.2,
                }
            );

            
            menus.forEach((menu) => {
                const section = document.getElementById(menu.anchor);
                if (section) {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top 50%",
                        end: "bottom 50%",
                        onEnter: () => {
                            setActiveSection(menu.anchor);
                        },
                        onEnterBack: () => {
                            setActiveSection(menu.anchor);
                        },
                    });
                }
            });

        }, navRef);

        return () => {
            ctx.revert();
        };
    }, [menus]);

    // Animation pour l'item actif
    useEffect(() => {
        if (!navRef.current) return;

        const activeItem = navRef.current.querySelector(`[data-anchor="${activeSection}"]`);
        const allItems = navRef.current.querySelectorAll('.nav-item');

        // Réinitialiser tous les items
        gsap.to(allItems, {
            scale: 1,
            brightness: 1,
            duration: 0.3,
            ease: "power2.out",
        });

        // Animer l'item actif
        if (activeItem) {
            gsap.to(activeItem, {
                scale: 1.05,
                brightness: 1.2,
                duration: 0.4,
                ease: "back.out(1.7)",
            });

            // Animation spéciale pour la ligne de l'item actif
            const activeLine = activeItem.querySelector('.nav-line');
            if (activeLine) {
                gsap.to(activeLine, {
                    
                    
                    boxShadow: "0 0 10px rgba(255, 192, 59, 0.5)",
                    duration: 0.4,
                    ease: "elastic.out(1, 0.5)",
                });
            }
        }
    }, [activeSection]);

    const handleClick = (anchor: string) => {
        const element = document.getElementById(anchor);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <ul ref={navRef} className="cursor-pointer hidden md:inline-block leading-loose">
            {menus.map((menu, index) => (
                <li 
                    key={index}
                    className={`nav-item group flex items-center gap-2.5 transition-all duration-300 font-bold text-[15px] hover:text-[#FFC03B] ${
                        activeSection === menu.anchor 
                            ? 'text-[#FFC03B] active-nav-item' 
                            : ''
                    }`}
                    data-anchor={menu.anchor}
                >
                    <span className={`nav-line inline-block h-0.5 w-0 md:w-[40px] bg-[#fff] group-hover:bg-[#FFC03B] group-hover:w-[80px] transition-all duration-300 ${
                        activeSection === menu.anchor 
                            ? 'bg-[#FFC03B] w-[80px]' 
                            : ''
                    }`}></span>

                    <a 
                        href={`#${menu.anchor}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleClick(menu.anchor);
                        }}
                        className="relative overflow-hidden group-hover:scale-105 transition-transform duration-300"
                    > 
                        <span className="relative z-10">{menu.name}</span>
                        
                        {/* Effet de soulignement animé */}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC03B] group-hover:w-full transition-all duration-300 ease-out"></span>
                        
                        {/* Effet de glow pour l'item actif */}
                        {activeSection === menu.anchor && (
                            <span className="absolute inset-0  opacity-10 rounded-sm "></span>
                        )}
                    </a>
                </li>
            ))}
        </ul>
    );
}