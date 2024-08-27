import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";

import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const projects = [
  {
    title: "Tranzbook",
    url: "https://tranzbook.netlify.app/",
    image: "/projects/tranzbook.png",
    description: "Transportation services in Ghana",
  },
  {
    title: "Car Hub",
    url: "https://pascalcarhub.netlify.app/",
    image: "/carhub.png",
    description: "E-commerce For Cars",
  },
  {
    title: "Bird Notion",
    url: "https://bird-notion.netlify.app/",
    image: "/birdnotion.png",
    description: "Inspired by the Notion website",
  },
  {
    title: "Travel App",
    url: "https://travelapplanding.netlify.app/",
    image: "/travelApp.png",
    description: "Landing Page for Travel App",
  },
  {
    title: "Dharma Kitchen",
    url: "https://thedharmakitchen.netlify.app/",
    image: "/dharma.png",
    description: "Restaurant Online Landing Page",
  },
  {
    title: "Fresco Restaurant",
    url: "https://fresco-food.netlify.app/",
    image: "/fresco.png",
    description: "Restaurant Online Landing Page",
  },
  {
    title: "EliteExclusiveApparels",
    url: "https://eliltexclusiveapparels.netlify.app/",
    image: "/apparel.png",
    description: "Clothing Shop with a working Dashboard",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props}>
      <mesh
        position-z={-0.001}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[3.2, 2]} />
        <meshBasicMaterial color="black" transparent opacity={0.4} />
      </mesh>
      <Image
        scale={[3, 1.2, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={3}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={.2}
        position={[-1.5, -0.4, 0]}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX="left"
        anchorY="top"
        fontSize={0.13}
        position={[-1.5, -0.6, 0]}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(projects.length / 2));

export const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  return (
    <group position-y={-viewport.height * 2 + 1}>
      {projects.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 3.5, 0, -3]}
          animate={{
            x: 0 + (index - currentProject) * 4,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -2 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : -0.1 * Math.PI,
          }}
        >
          <Project project={project} highlighted={index === currentProject} />
        </motion.group>
      ))}
    </group>
  );
};
