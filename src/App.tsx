import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Button } from "./components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { portfolioData } from "./data/portfolio";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = portfolioData.navigation;

  // Smooth scroll function
  const scrollToSection = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // Account for fixed header height + padding
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setIsMenuOpen(false);
  };

  // Animation variants for scroll transitions
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={scrollToTop}
              className="text-lg font-medium hover:text-primary transition-colors cursor-pointer"
            >
              {portfolioData.personal.name}
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.target)}
                  className="text-sm hover:text-primary transition-colors cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
              <Button
                size="sm"
                asChild
              >
                <a
                  href={portfolioData.personal.cvPath}
                  download={portfolioData.personal.cvFileName}
                  className="flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  Download CV
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden py-4 border-t"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <motion.div
                className="flex flex-col gap-4"
                initial="hidden"
                animate="visible"
                variants={staggerVariants}
              >
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    onClick={() => scrollToSection(item.target)}
                    className="text-sm hover:text-primary transition-colors text-left cursor-pointer"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <Button
                    size="sm"
                    className="w-fit"
                    asChild
                  >
                    <a
                      href={portfolioData.personal.cvPath}
                      download={portfolioData.personal.cvFileName}
                      className="flex items-center gap-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Download className="w-3 h-3" />
                      Download CV
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Main Content */}
      <main>
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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
        >
          <Contact data={portfolioData.contact} socialLinks={portfolioData.personal.socialLinks} cvData={{ path: portfolioData.personal.cvPath, fileName: portfolioData.personal.cvFileName }} />
        </motion.section>
      </main>

      {/* Footer */}
      <motion.footer
        className="bg-primary text-primary-foreground py-8"
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
    </div>
  );
}