import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import HeroProfileImage from './HeroProfileImage/HeroProfileImage';

interface HeroProps {
  data: {
    title: string;
    availabilityStatus: string;
    description: string;
    profileImage: string;
    socialLinks: {
      github: string;
      linkedin: string;
    };
  };
}

export function Hero({ data }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.5 }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background to-secondary/20 jhey-background-grid">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={itemVariants}>
              <Badge variant="secondary" className="mb-4 mt-8 md:mt-0">
                {data.availabilityStatus}
              </Badge>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight">
                {data.title.split(' ').slice(0, 2).join(' ')}
                <span className="block text-primary">{data.title.split(' ').slice(2).join(' ')}</span>
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-lg"
              variants={itemVariants}
            >
              {data.description}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="gap-2"
                onClick={() => {
                  const element = document.getElementById('projects');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth"
                    });
                  }
                }}
              >
                <Github className="w-4 h-4" />
                View Projects
              </Button>
            </motion.div>
            
            <motion.div 
              className="flex gap-4 pt-4"
              variants={itemVariants}
            >
              <Button variant="ghost" size="icon" asChild>
                <a href={data.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href={data.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            <HeroProfileImage image_url={data.profileImage}/>
          </motion.div>
        </div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}