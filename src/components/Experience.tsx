import {Badge} from "./ui/badge";
import {motion} from "motion/react";
import {ImageWithFallback} from "./figma/ImageWithFallback";

interface Experience {
    company: string;
    companyLogo: string;
    position: string;
    date_start: string;
    date_end?: string;
    location: string;
    description: string;
    achievements: string[];
    technologies: string[];
}
interface ExperienceProps {
    data: {
        subtitle: string;
        description: string;
        positions: Array<Experience>;
    };
}


function formatTimelineDate(experience: Experience): { year: number; month: string } {
    const start_date_obj = new Date(experience.date_start);
    const month_index = start_date_obj.getMonth();
    const month_lists = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];
    const month = month_lists[month_index];
    return {year: start_date_obj.getFullYear(), month};
}

export function Experience({data}: ExperienceProps) {
    const experiences = data.positions;

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const timelineLineVariants = {
        hidden: {height: 0, opacity: 0},
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
        hidden: {scale: 0, opacity: 0},
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
        hidden: {opacity: 0, x: 50, y: 20},
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
        hidden: {opacity: 0, x: -10},
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
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const techBadgeVariants = {
        hidden: {opacity: 0, scale: 0.8},
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
        hidden: {opacity: 0},
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
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                >
                    <Badge variant="outline" className="mb-4">Experience</Badge>
                    <h2 className="mb-6">{data.subtitle}</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {data.description}
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Vertical Timeline Line - Hidden on mobile */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border overflow-hidden hidden md:block">
                        <motion.div
                            className="w-full bg-gradient-to-b from-primary via-primary to-primary/60"
                            variants={timelineLineVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true, margin: "-50px"}}
                        />
                    </div>

                    {/* Timeline Items */}
                    <motion.div
                        className="space-y-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, margin: "-50px"}}
                    >
                        {experiences.map((exp, index) => {
                            const timelineDate = formatTimelineDate(exp);

                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    className="relative pl-0 md:pl-24"
                                >
                                    {/* Timeline Date - Hidden on mobile */}
                                    <motion.div
                                        className="absolute left-0 top-6 flex flex-col items-center text-center min-w-16 hidden md:flex"
                                        variants={timelineDotVariants}
                                    >
                                        <div
                                            className="bg-primary text-primary-foreground px-2 py-1 rounded-lg text-xs font-medium shadow-md mb-1">
                                            {timelineDate.month}
                                        </div>
                                        <div
                                            className="text-sm font-semibold text-foreground bg-background px-2 py-1 rounded">
                                            {timelineDate.year}
                                        </div>
                                        {/* Connection dot */}
                                        <div
                                            className="w-3 h-3 bg-primary rounded-full border-2 border-background shadow-sm mt-2"/>
                                    </motion.div>

                                    {/* Experience Card */}
                                    <div
                                        className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 relative">
                                        {/* Card Connector Line */}
                                        <div
                                            className="absolute left-0 top-9 w-6 h-0.5 bg-border -translate-x-full hidden md:block"></div>

                                        {/* Location in top right */}
                                        <motion.div
                                            className="absolute top-4 right-4"
                                            initial={{opacity: 0, x: 20}}
                                            whileInView={{opacity: 1, x: 0}}
                                            viewport={{once: true}}
                                            transition={{duration: 0.4, delay: 0.3}}
                                        >
                                            <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                                                {exp.location}
                                            </p>
                                        </motion.div>

                                        {/* Header with company logo and title */}
                                        <div className="flex items-start gap-4 mb-4 pr-20">
                                            <motion.div
                                                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-gray-200 overflow-hidden bg-white"
                                                initial={{opacity: 0, scale: 0.5, rotate: -10}}
                                                whileInView={{opacity: 1, scale: 1, rotate: 0}}
                                                viewport={{once: true}}
                                                transition={{duration: 0.4, delay: 0.2}}
                                            >
                                                <ImageWithFallback
                                                    src={exp.companyLogo}
                                                    alt={`${exp.company} logo`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </motion.div>

                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                    {exp.position}
                                                </h3>
                                                <p className="text-lg text-primary font-medium mb-2">
                                                    {exp.company}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Description and achievements as bullet points */}
                                        <motion.div
                                            className="space-y-3 mb-6"
                                            variants={bulletsContainerVariants}
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{once: true}}
                                        >
                                            {/* Main description as first bullet */}
                                            <motion.div
                                                className="flex items-start gap-3"
                                                variants={bulletVariants}
                                            >
                                                <div
                                                    className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                                <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                                            </motion.div>

                                            {/* Achievements as additional bullets */}
                                            {exp.achievements.map((achievement, achIndex) => (
                                                <motion.div
                                                    key={achIndex}
                                                    className="flex items-start gap-3"
                                                    variants={bulletVariants}
                                                >
                                                    <div
                                                        className="w-2 h-2 bg-primary/70 rounded-full mt-2 flex-shrink-0"></div>
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
                                            viewport={{once: true}}
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

                    {/* Timeline End Marker - Hidden on mobile */}
                    <motion.div
                        className="absolute left-6 -bottom-2 w-4 h-4 bg-gradient-to-br from-primary/60 to-primary/30 rounded-full border-4 border-background shadow-sm hidden md:block"
                        initial={{scale: 0, opacity: 0}}
                        whileInView={{scale: 1, opacity: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.4, delay: 1.5}}
                    />
                </div>
            </div>
        </section>
    );
}