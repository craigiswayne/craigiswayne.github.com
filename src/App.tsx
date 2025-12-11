import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Button } from "./components/ui/button";
import { Menu, X, Download } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { portfolioData } from "./data/portfolio";
import GitHubCorner from "./components/GitHubCorner/GitHubCorner";
import Footer from "./components/Footer";
import { PortfolioPage } from "./pages/PortfolioPage";
import { BlogListPage } from "./pages/BlogListPage";
import { BlogPostPage } from "./pages/BlogPostPage";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = portfolioData.navigation;

  const trackDownloadCV = () => {
    if (window["gtag"] !== undefined) {
      window["gtag"]("event", "button_click", {
        event_category: "Engagement",
        event_label: "Download Resume",
        value: 1,
      });
    }
  };

  // Determine if we're on a blog page
  const isBlogPage = location.pathname.startsWith("/blog");

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Smooth scroll function
  const scrollToSection = (targetId: string) => {
    // Handle blog navigation
    if (targetId === "blog") {
      navigate("/blog");
      setIsMenuOpen(false);
      return;
    }

    // If we're on blog page, navigate to home first
    if (isBlogPage) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          const headerOffset = 80;
          const elementPosition =
            element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition =
          element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }

    setIsMenuOpen(false);
  };

  // Scroll to top function
  const scrollToTop = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsMenuOpen(false);
  };

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
    <div className="min-h-screen">
      <GitHubCorner
        url={portfolioData.personal.socialLinks.github}
      />
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
              <Button size="sm" asChild>
                <a
                  href={portfolioData.personal.cvPath}
                  download={portfolioData.personal.cvFileName}
                  className="flex items-center gap-1"
                  onClick={() => trackDownloadCV()}
                >
                  <Download className="w-3 h-3" />
                  Download Resume
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
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
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
                      visible: { opacity: 1, x: 0 },
                    }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  <Button size="sm" className="w-fit" asChild>
                    <a
                      href={portfolioData.personal.cvPath}
                      download={
                        portfolioData.personal.cvFileName
                      }
                      className="flex items-center gap-1"
                      onClick={() => trackDownloadCV()}
                    >
                      <Download className="w-3 h-3" />
                      Download Resume
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
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route
            path="/blog/:postId"
            element={<BlogPostPage />}
          />
          <Route path="*" element={<PortfolioPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
