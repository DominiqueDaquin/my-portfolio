import { Heading, Text, Timeline } from "@chakra-ui/react";
import { LuCheck } from "react-icons/lu";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrer le plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

type Item = {
  date: string;
  title: string;
  school: string;
  description: string;
};

type Props = {
  items: Item[];
};

export default function StudyCard({ items }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animation pour chaque item de timeline individuellement
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gsap.utils.toArray(".timeline-item").forEach((item: any) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        });

        tl.fromTo(
          item.querySelector(".timeline-connector"),
          {
            scaleY: 0,
            transformOrigin: "top center",
          },
          {
            scaleY: 1,
            duration: 0.6,
            ease: "power2.out",
          }
        );

        tl.fromTo(
          item.querySelector(".timeline-indicator"),
          {
            scale: 0,
            rotation: -180,
            opacity: 0,
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );

        tl.fromTo(
          item.querySelector(".timeline-content"),
          {
            x: 50,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );

        tl.fromTo(
          item.querySelector(".timeline-title"),
          {
            y: 20,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.3"
        );

        tl.fromTo(
          item.querySelector(".timeline-school"),
          {
            x: -30,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          },
          "-=0.2"
        );

        tl.fromTo(
          item.querySelector(".timeline-description"),
          {
            y: 15,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.1"
        );
      });
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, [items]);

  return (
    <div ref={containerRef}>
      <Timeline.Root>
        {items.map((item, index) => (
          <Timeline.Item key={index} className="timeline-item">
            <Timeline.Connector className="timeline-connector">
              <Timeline.Separator />
              <Timeline.Indicator 
                bg={"#FFC03B"} 
                fontWeight={"bold"}
                className="timeline-indicator"
              >
                <LuCheck />
              </Timeline.Indicator>
            </Timeline.Connector>

            <Timeline.Content className="timeline-content">
              <Timeline.Title className="timeline-title">
                <Heading size="md">
                  {item.date} - {item.title}
                </Heading>
              </Timeline.Title>

              <Timeline.Description>
                <Heading 
                  color="#FFC03B" 
                  size="sm" 
                  pb={2}
                  className="timeline-school"
                >
                  {item.school}
                </Heading>
              </Timeline.Description>

              <Text className="timeline-description">{item.description}</Text>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline.Root>
    </div>
  );
}