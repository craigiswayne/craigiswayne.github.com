import { motion } from "motion/react";
import { portfolioData } from "../data/portfolio";

export default function Footer() {
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

  return (
    <motion.footer
      className="bg-primary text-primary-foreground py-8"
      style={{
        paddingTop: "calc(calc(var(--spacing) * 8) + 5rem)",
        marginTop: "-4rem",
        zIndex: -1,
        position: "relative",
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center space-y-4">
          <p className="text-sm opacity-90">
            {portfolioData.footer.copyright}
          </p>
          <p className="text-xs opacity-75">
            {portfolioData.footer.tagline}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}