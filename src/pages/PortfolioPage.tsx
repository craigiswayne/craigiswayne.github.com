import { Hero } from "../components/Hero";
import { About } from "../components/About";
import { Skills } from "../components/Skills";
import { Projects } from "../components/Projects";
import { Experience } from "../components/Experience";
import { Contact } from "../components/Contact";
import { motion } from "motion/react";
import { portfolioData } from "../data/portfolio";

export function PortfolioPage() {
  // Animation variants for scroll transitions
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerVariants}
      >
        <Hero data={portfolioData.personal} />
      </motion.div>

      <motion.section
        id="about"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <About data={portfolioData.about} />
      </motion.section>

      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Skills data={portfolioData.skills} />
      </motion.section>

      <motion.section
        id="projects"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Projects data={portfolioData.projects} />
      </motion.section>

      <motion.section
        id="experience"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Experience data={portfolioData.experience} />
      </motion.section>

      <motion.section
        id="contact"
        style={{
          background: "white",
          borderBottomLeftRadius: "4rem",
          borderBottomRightRadius: "4rem",
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <Contact
          data={portfolioData.contact}
          socialLinks={portfolioData.personal.socialLinks}
          cvData={{
            path: portfolioData.personal.cvPath,
            fileName: portfolioData.personal.cvFileName,
          }}
        />
      </motion.section>
    </>
  );
}