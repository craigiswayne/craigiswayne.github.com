import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code, Users, Zap, Target } from "lucide-react";
import { motion } from "motion/react";

interface AboutProps {
  data: {
    subtitle: string;
    description: string;
    journey: string[];
    highlights: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
    expertise: Array<{
      skill: string;
      level: string;
    }>;
    image: string;
  };
}

export function About({ data }: AboutProps) {
  const iconMap = {
    Code,
    Users,
    Zap,
    Target
  };

  const highlights = data.highlights.map(highlight => ({
    ...highlight,
    icon: iconMap[highlight.icon as keyof typeof iconMap] || Code
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const journeyVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const journeyItemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">About Me</Badge>
          <h2 className="mb-6">{data.subtitle}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div key={index} variants={cardVariants}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            variants={journeyVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.h3 variants={journeyItemVariants}>My Journey</motion.h3>
            {data.journey.map((paragraph, index) => (
              <motion.p 
                key={index} 
                className="text-muted-foreground"
                variants={journeyItemVariants}
              >
                {paragraph}
              </motion.p>
            ))}
            
            <motion.div 
              className="space-y-4 pt-4"
              variants={journeyItemVariants}
            >
              {data.expertise.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <span>{item.skill}</span>
                  <span className="text-primary">{item.level}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={data.image}
                alt="Modern development setup"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}