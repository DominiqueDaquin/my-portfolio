import { Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type Props = {
    date: string;
    title: string;
    title_span: string;
    description: string;
};

const responsive_display = { sm: 'block', md: 'flex' };
const responsive_width = { sm: "1", md: "1/2" };

export default function CardItem({ date, title, title_span, description }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!cardRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: "top 85%",
                    end: "bottom 15%",
                    toggleActions: "play none none reverse",
                },
            });

            // Animation de la card complète avec slide depuis le bas
            tl.fromTo(
                cardRef.current,
                {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                }
            );

            // Animation de la date avec slide depuis la gauche
            tl.fromTo(
                ".card-date",
                {
                    x: -40,
                    opacity: 0,
                },
                {
                    x: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power2.out",
                },
                "-=0.5"
            );

            // Animation du titre principal avec effet de reveal
            tl.fromTo(
                ".card-title",
                {
                    y: 30,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "back.out(1.2)",
                },
                "-=0.4"
            );

            // Animation du span coloré avec effet de highlight
            tl.fromTo(
                ".card-title-span",
                {
                    scale: 0,
                    opacity: 0,
                },
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.5)",
                },
                "-=0.3"
            );

            // Animation de la description avec fade et slide
            tl.fromTo(
                ".card-description",
                {
                    y: 20,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                },
                "-=0.2"
            );

            // Animation hover subtile sur la card
            const hoverTl = gsap.timeline({ paused: true });
            hoverTl.to(cardRef.current, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
            });

            // Événements hover
            cardRef.current?.addEventListener("mouseenter", () => {
                hoverTl.play();
            });

            cardRef.current?.addEventListener("mouseleave", () => {
                hoverTl.reverse();
            });

        }, cardRef);

        // Cleanup function
        return () => {
            ctx.revert();
        };
    }, [date, title, title_span, description]);

    return (
        <Box 
            ref={cardRef}
            display={responsive_display} 
            my={"8"} 
            p={4} 
            _hover={{'cursor':'pointer','background':'rgba(255,192,59,0.05)'}} 
            borderRadius={'md'}
            className="card-container"
        >
            <Heading 
                size={"md"} 
                w={responsive_width} 
                pb={"4"}
                className="card-date"
            >
                {date}
            </Heading>
            <Box>
                <Heading 
                    pb={"4"} 
                    _hover={{'textDecoration':'underline'}}
                    className="card-title"
                >
                    {title} <span className="text-[#FFC03B] card-title-span"> {title_span} </span> 
                </Heading>
                <Text className="card-description">
                    {description}
                </Text>
            </Box>
        </Box>
    );
}