'use client'
import { Text, Heading, Box, Link } from "@chakra-ui/react";
import CardItem from "./components/card-item";
import StudyCard from "./components/study-card";
import CertificationsList from "./components/certifications";
import TechStack from "./components/tech-stark";
import ParticlesBackground from "./components/ParticlesBackground";
import Navigation from "./components/navigation";
import gsap from "gsap";
import Loader from "./components/loader";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useRef,useLayoutEffect } from "react";
import About from "./components/about";


const studies = [
  {
    date: '2025 to Present',
    title: 'Professionnal Training',
    school: 'Seven advanced academy',
    description: 'I already have strong skills in fullstack development, built through hands-on projects and real-world experience. I’m currently following a professional training program to deepen my expertise and elevate my technical capabilities to an advanced level.'
  },
  {
    date: '2024',
    title: 'Bachelor’s Degree in Computer Science',
    school: 'University of Douala',
    description: 'During this program, I built a strong foundation in algorithms, programming, databases, networks, and computer systems. This degree gave me a structured approach to problem-solving and a solid understanding of the full software development lifecycle, from front-end to back-end.'
  },
  {
    date: '2021',
    title: 'Baccalaureate',
    school: 'Saint Charles Borromée College',
    description: 'This high school diploma focuses on advanced mathematics and physics. It helped me develop strong analytical skills, scientific reasoning, and a structured problem-solving mindset, which laid a solid foundation for my studies in computer science.'
  }
]
const certifications = [
  {
    id: "1",
    title: "Backend Developer",
    organization: "Meta",
    certificateUrl: "https://coursera.org/share/cdc60b5569241338bbeafc81f9db2af0",
    organizationUrl: "https://about.meta.com/",
    imageUrl: "/meta.png?height=64&width=64",
  },
  {
    id: "2",
    title: "Django for Everybody",
    organization: "University of Michigan",
    certificateUrl: "https://coursera.org/share/4cf0aeff2fb76b3f19151ad61257d31d",
    organizationUrl: "https://umich.edu/",
    imageUrl: "/michigan.png?height=64&width=64",
  },
  {
    id: "3",
    title: "Cloud AWS",
    organization: "AWS",
    certificateUrl: "https://coursera.org/share/1e9a718e9dae0812a33d24a7e47de681",
    organizationUrl: "https://aws.amazon.com/",
    imageUrl: "/aws.png?height=64&width=64",
  },
  {
    id: "4",
    title: "Scrum Master",
    organization: "LearnQuest",
    certificateUrl: "https://www.coursera.org/account/accomplishments/certificate/YOUR_CERT_ID",
    organizationUrl: "https://www.learnquest.com/",
    imageUrl: "/learn.png?height=64&width=64",
  },
]

const techCategories = [
  {
    title: "FRONTEND",
    technologies: [
      {
        id: "js",
        name: "Javascript",
        iconUrl: "/logo/js.png",
      },
      {
        id: "ts",
        name: "TypeScript",
        iconUrl: "/logo/ts.png",
      },
      {
        id: "react",
        name: "React",
        iconUrl: "/logo/react.png",
      },
      {
        id: "Next",
        name: "Next Js",
        iconUrl: "/logo/next.png",
      },
      {
        id: "tailwind",
        name: "Tailwind css",
        iconUrl: "/logo/tailwind.png",
      },
      {
        id: "bootstrap",
        name: "Bootstrap",
        iconUrl: "/logo/bootstrap.png",
      },
      {
        id: 'redux',
        name: 'Redux',
        iconUrl: '/logo/redux.png',
      }

    ],
  },
  {
    title: "BACKEND",
    technologies: [
      {
        id: "dj",
        name: "Django",
        iconUrl: "/logo/dj.png",
      },
            {
        id: "drf",
        name: "Django rest Framework",
        iconUrl: "/logo/dj.png",
      },

 {
        id: "node",
        name: "Node js",
        iconUrl: "/logo/node.png",
      },
       {
        id: "express",
        name: "Express",
        iconUrl: "/logo/express.png",
      },

     {
        id: "python",
        name: "Python",
        iconUrl: "/logo/python.png",
      },

    ],
  },
  {
    title: "DATABASE",
    technologies: [
   {
        id: "mysql",
        name: "Mysql",
        iconUrl: "/logo/mysql.png",
      },

       {
        id: "postgres",
        name: "Postgresql",
        iconUrl: "/logo/postgres.png",
      },
    ],
  },
    {
    title: "TOOLS",
    technologies: [
   {
        id: "git",
        name: "Git",
        iconUrl: "/logo/git.png",
      },

       {
        id: "aws",
        name: "Aws",
        iconUrl: "/logo/aws.png",
      },
    ],
  },
]

const navigationLinks=[
  {
    name:"About me",
    anchor:"about"
  },
    {
    name:"Experience",
    anchor:"experience"
  },
    {
    name:"Study",
    anchor:"study"
  },
    {
    name:"Certifications",
    anchor:"certifications"
  },
      {
    name:"Stacks",
    anchor:"stacks"
  },

]

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}


export default function Home() {
  const divRef= useRef<HTMLDivElement>(null)
  useLayoutEffect(()=>{
    const ctx=gsap.context(()=>{
      gsap.from('section>*',{
        y:50,
        opacity:0,
        stagger:0.1,
        ease:'bounce.in',
        scrollTrigger:{
          trigger:'section',

          
        }
      })
    },divRef)
    return ctx.revert()
  },[])


  return (
    <div className="container block md:flex m-[auto_!important] py-16 px-3 md:px-0 justify-between leading-loose " >

    <Loader/>

      <ParticlesBackground />
      <div className="pb-16 md:w-[30%] p-6 md:sticky top-[64px] md:h-[80vh]" >
        <Heading size="3xl">
          Kouakep Dominique
        </Heading>
        <Heading as="h4" size="md" className="text-[#FFC03B] bg-[#ffc13b20] inline-block py-1 px-2 border-r-2 border-yellow-700 my-3">
          Fullstack Developper
        </Heading>
        <Text>
          I turn complex ideas into efficient, elegant, and maintainable digital products.
        </Text>


        <div className="mt-10 absolute md:static top-0 z-10 backdrop-blur-sm w-full md:w-auto ">
          
        <Navigation menus={navigationLinks} />

        </div>
      </div>  

      <div className="w-full md:w-[65%] p-6 " ref={divRef}>
        <section id="about">
          <Heading size="2xl" as="h1" className="text-[#FFC03B] pb-6" >
            About Me
          </Heading>

<About />
         
        </section>

        <section id="experience" className="py-6">
          <Heading size="2xl" as="h1" className="text-[#FFC03B] py-6" >
            Experience
          </Heading>
          <Box>
            <CardItem
              date="july 2024 - october 2024"
              description="BayisImmob is a real estate matchmaking platform connecting property listers with buyers, covering various types of assets such as land, houses, and apartments."
              title="Bayisimmob"
              title_span="Real estate platform"
            ></CardItem>
            <CardItem
              date="july 2024 - october 2024"
              description="During my intership in orange digital center i had developped a web platform that allow to connect many person that do a waste management. I had traned by expert orange, aws, nokia and aws"
              title="Fullstack Developper"
              title_span="Orange Digital center"
            >

            </CardItem>
            <CardItem
              date="july 2024 - october 2024"
              description="Sukulu is a school management web application designed to centralize administration, track students and teachers, and manage academic performance."
              title="Sukulu"
              title_span="management school platform"
            >

            </CardItem>
            


            <Link href="#">
              View all
            </Link>

          </Box>

        </section>

        <section id="study">
          <Heading size="2xl" as="h1" className="text-[#FFC03B] py-6" >
            Study
          </Heading>

          <Box>
            <StudyCard items={studies} />
          </Box>
        </section>

        <section id="certifications" >
          <Heading size="2xl" as="h1" className="text-[#FFC03B] py-6" >
            Certifications
          </Heading>

          <Box>
            <CertificationsList certifications={certifications} />
          </Box>

        </section>

        <section id="stacks">
          <Heading size="2xl" as="h1" className="text-[#FFC03B] py-6" >
            My stacks
          </Heading>
          <Box>
            <TechStack categories={techCategories} />
          </Box>
        </section>
       

      </div>
    </div>
  );
}
