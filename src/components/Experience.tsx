import { Badge } from "./ui/badge";
import { motion } from "motion/react";

interface ExperienceProps {
  data: {
    subtitle: string;
    description: string;
    positions: Array<{
      company: string;
      position: string;
      duration: string;
      location: string;
      description: string;
      achievements: string[];
      technologies: string[];
    }>;
  };
}

// Function to get company initials for the logo
function getCompanyInitials(companyName: string): string {
  return companyName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

// Function to extract and format start date from duration string
function formatTimelineDate(duration: string): { year: string; month: string } {
  // Handle different duration formats
  const startDate = duration.split(' - ')[0].trim();
  
  // If it's just a year (like "2022")
  if (/^\d{4}$/.test(startDate)) {
    return { year: startDate, month: 'Jan' };
  }
  
  // If it's a month and year (like "March 2022" or "Mar 2022")
  const monthYearMatch = startDate.match(/^(\w+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const monthName = monthYearMatch[1];
    const year = monthYearMatch[2];
    
    // Convert full month names to abbreviations
    const monthAbbreviations: { [key: string]: string } = {
      'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
      'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
      'September': 'Sep', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec',
      'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Apr',
      'Jun': 'Jun', 'Jul': 'Jul', 'Aug': 'Aug', 'Sep': 'Sep', 'Oct': 'Oct', 'Nov': 'Nov', 'Dec': 'Dec'
    };
    
    return { 
      year, 
      month: monthAbbreviations[monthName] || monthName.slice(0, 3) 
    };
  }
  
  // Default fallback - just use the year if available
  const yearMatch = startDate.match(/(\d{4})/);
  if (yearMatch) {
    return { year: yearMatch[1], month: 'Jan' };
  }
  
  // Ultimate fallback
  return { year: '2024', month: 'Jan' };
}

export function Experience({ data }: ExperienceProps) {
  const experiences = data.positions;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const timelineLineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "100%", 
      opacity: 1,
      transition: { 
        duration: 1.5, 
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  const timelineDotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.4, 
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50, y: 20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      }
    }
  };

  const bulletVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const bulletsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const techBadgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const badgeContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-4">Experience</Badge>
          <h2 className="mb-6">{data.subtitle}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {data.description}
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-primary to-primary/60"
              variants={timelineLineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            />
          </div>

          {/* Timeline Items */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {experiences.map((exp, index) => {
              const timelineDate = formatTimelineDate(exp.duration);
              
              return (
                <motion.div 
                  key={index}
                  variants={cardVariants}
                  className="relative pl-24"
                >
                  {/* Timeline Date */}
                  <motion.div 
                    className="absolute left-0 top-6 flex flex-col items-center text-center min-w-16"
                    variants={timelineDotVariants}
                  >
                    <div className="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium shadow-md mb-1">
                      {timelineDate.month}
                    </div>
                    <div className="text-sm font-semibold text-foreground bg-background px-2 py-1 rounded">
                      {timelineDate.year}
                    </div>
                    {/* Connection dot */}
                    <div className="w-3 h-3 bg-primary rounded-full border-2 border-background shadow-sm mt-2" />
                  </motion.div>

                  {/* Experience Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative">
                  {/* Card Connector Line */}
                  <div className="absolute left-0 top-9 w-6 h-0.5 bg-border -translate-x-full"></div>
                  
                  {/* Header with company logo and title */}
                  <div className="flex items-start gap-4 mb-4">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-gray-200"
                      initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      <span className="text-base font-medium text-gray-700">
                        {getCompanyInitials(exp.company)}
                      </span>
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {exp.position}
                      </h3>
                      <p className="text-lg text-primary font-medium mb-2">
                        {exp.company}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                        {exp.duration} 
                        <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                        {exp.location}
                      </p>
                    </div>
                  </div>

                  {/* Description and achievements as bullet points */}
                  <motion.div 
                    className="space-y-3 mb-6"
                    variants={bulletsContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {/* Main description as first bullet */}
                    <motion.div 
                      className="flex items-start gap-3"
                      variants={bulletVariants}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                    </motion.div>
                    
                    {/* Achievements as additional bullets */}
                    {exp.achievements.map((achievement, achIndex) => (
                      <motion.div 
                        key={achIndex} 
                        className="flex items-start gap-3"
                        variants={bulletVariants}
                      >
                        <div className="w-2 h-2 bg-primary/70 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{achievement}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  {/* Technology badges */}
                  <motion.div 
                    className="flex flex-wrap gap-2"
                    variants={badgeContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {exp.technologies.map((tech, techIndex) => (
                      <motion.span
                        key={techIndex}
                        variants={techBadgeVariants}
                        className="px-3 py-1.5 bg-primary/5 text-primary text-sm rounded-lg border border-primary/20 font-medium hover:bg-primary/10 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </motion.div>
                </div>
              </motion.div>
              );
            })}
          </motion.div>

          {/* Timeline End Marker */}
          <motion.div 
            className="absolute left-6 -bottom-2 w-4 h-4 bg-gradient-to-br from-primary/60 to-primary/30 rounded-full border-4 border-background shadow-sm"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 1.5 }}
          />
        </div>
      </div>
    </section>
  );
}