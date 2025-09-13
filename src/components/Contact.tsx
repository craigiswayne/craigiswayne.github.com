import {Card, CardContent} from "./ui/card";
import {Button} from "./ui/button";
import {Badge} from "./ui/badge";
import {Mail, Linkedin, Github, Download, MessageCircle} from "lucide-react";
import {motion} from "motion/react";

interface ContactProps {
    data: {
        subtitle: string;
        description: string;
        methods: Array<{
            type: string;
            icon: string;
            title: string;
            description: string;
            action: string;
            actionType: string;
        }>;
        lookingFor: Array<{
            title: string;
            description: string;
        }>;
    };
    socialLinks: {
        github: string;
        linkedin: string;
    };
    cvData: {
        path: string;
        fileName: string;
    };
}

export function Contact({data, socialLinks, cvData}: ContactProps) {
    const socialButtonVariants = {
        hidden: {opacity: 0, y: 20, scale: 0.9},
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    const socialContainerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const lookingForVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const lookingForItemVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <section className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4 max-w-4xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
                >
                    <Badge variant="outline" className="mb-4">Get In Touch</Badge>
                    <h2 className="mb-6">{data.subtitle}</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {data.description}
                    </p>
                </motion.div>

                <motion.div
                    className="flex justify-center mb-12"
                    initial={{opacity: 0, scale: 0.9, y: 30}}
                    whileInView={{opacity: 1, scale: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6, delay: 0.2}}
                >
                    {data.methods.map((method, index) => {
                        const IconComponent = method.icon === 'Mail' ? Mail : MessageCircle;
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow max-w-md w-full">
                                <CardContent className="p-8 text-center space-y-4">
                                    <motion.div
                                        className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto"
                                        initial={{opacity: 0, scale: 0, rotate: -10}}
                                        whileInView={{opacity: 1, scale: 1, rotate: 0}}
                                        viewport={{once: true}}
                                        transition={{duration: 0.4, delay: 0.3}}
                                    >
                                        <IconComponent className="w-6 h-6 text-primary"/>
                                    </motion.div>
                                    <h3>{method.title}</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {method.description}
                                    </p>
                                    <Button
                                        variant={method.type === 'email' ? 'default' : 'outline'}
                                        className="w-full gap-2"
                                        asChild={method.actionType === 'email'}
                                    >
                                        {method.actionType === 'email' ? (
                                            <a href={`mailto:${method.action}`}>
                                                <IconComponent className="w-4 h-4"/>
                                                {method.action}
                                            </a>
                                        ) : (
                                            <>
                                                <IconComponent className="w-4 h-4"/>
                                                {method.action}
                                            </>
                                        )}
                                    </Button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </motion.div>

                <div className="text-center space-y-8">
                    <motion.div
                        className="flex justify-center gap-6"
                        variants={socialContainerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                    >
                        <motion.div variants={socialButtonVariants}>
                            <Button variant="outline" size="lg" className="gap-2" asChild>
                                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-5 h-5"/>
                                    GitHub
                                </a>
                            </Button>
                        </motion.div>
                        <motion.div variants={socialButtonVariants}>
                            <Button variant="outline" size="lg" className="gap-2" asChild>
                                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="w-5 h-5"/>
                                    LinkedIn
                                </a>
                            </Button>
                        </motion.div>
                        <motion.div variants={socialButtonVariants}>
                            <Button variant="outline" size="lg" className="gap-2" asChild>
                                <a href={cvData.path} download={cvData.fileName}>
                                    <Download className="w-5 h-5"/>
                                    Download CV
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="bg-card rounded-2xl p-8 shadow-lg"
                        initial={{opacity: 0, y: 30, scale: 0.95}}
                        whileInView={{opacity: 1, y: 0, scale: 1}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, delay: 0.2}}
                    >
                        <motion.h3
                            className="mb-4"
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{duration: 0.4, delay: 0.3}}
                        >
                            What I'm Looking For
                        </motion.h3>
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm"
                            variants={lookingForVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{once: true}}
                        >
                            {data.lookingFor.map((item, index) => (
                                <motion.div key={index} className="space-y-2" variants={lookingForItemVariants}>
                                    <h4>{item.title}</h4>
                                    <p className="text-muted-foreground">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}