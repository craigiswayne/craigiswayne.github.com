import {Card, CardContent} from "./ui/card";
import {Badge} from "./ui/badge";
import {Code, Users, Zap, Target, Loader2} from "lucide-react";
import {motion} from "motion/react";
import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from "recharts";
import {useState, useEffect} from "react";

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
    };
}

export function About({data}: AboutProps) {
    const [chartData, setChartData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    // Fetch data from WakaTime API
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const url_last_year = 'https://wakatime.com/share/@craigiswayne/b62296b8-3cd1-42bc-8288-cbbe4e25f00e.json';
                // const url_all_time = 'https://wakatime.com/share/@craigiswayne/593b87c6-38f5-40a0-9db0-420e856f13d3.json';
                const response = await fetch(url_last_year);

                if (!response.ok) {
                    throw new Error(`Failed to fetch data: ${response.status}`);
                }

                const wakaTimeData = await response.json();

                const colors = [
                    '#8ecae6',
                    '#219ebc',
                    '#023047',
                    '#ffb703',
                    '#fb8500'
                ];

                // Transform WakaTime data to match our expected format
                const transformedData = wakaTimeData.data.map((item: any, index: number) => ({
                    name: item.name,
                    percent: item.percent,
                    color: colors[index] ?? item.color
                }));

                setChartData({data: transformedData});
            } catch (err) {
                console.error('Error fetching WakaTime data:', err);
                setError('Failed to load language statistics');

                // Fallback data in case of error
                setChartData({
                    data: [
                        {name: "Unknown", percent: 100, color: "#3178c6"}
                    ]
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchChartData();
    }, []);

    // Use the specified color palette for the chart if colors aren't provided
    const chartColors = [
        '#8ecae6', // Light blue
        '#219ebc', // Darker blue
        '#023047', // Dark blue
        '#ffb703', // Orange
        '#fb8500'  // Red-orange
    ];

    // Filter and process chart data
    const filteredData = chartData?.data?.filter((item: any) => item.percent >= 0.5) || [];

    const processedChartData = filteredData.map((item: any, index: number) => ({
        name: item.name,
        value: item.percent,
        percentage: item.percent,
        color: item.color || chartColors[index % chartColors.length]
    }));

    const CustomTooltip = ({active, payload}: any) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                    <p className="font-medium">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {data.percentage.toFixed(1)}%
                    </p>
                </div>
            );
        }
        return null;
    };

    const CustomLegend = ({payload}: any) => {
        return (
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{backgroundColor: entry.color}}
                        />
                        <span className="text-xs text-foreground">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    };

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: {opacity: 0, y: 30, scale: 0.95},
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {duration: 0.5, ease: "easeOut"}
        }
    };

    const journeyVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const journeyItemVariants = {
        hidden: {opacity: 0, x: -30},
        visible: {
            opacity: 1,
            x: 0,
            transition: {duration: 0.5, ease: "easeOut"}
        }
    };

    return (
        <section className="py-20 bg-secondary/10">
            <div className="container mx-auto px-4 max-w-6xl">
                <motion.div
                    className="text-center mb-16"
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.6}}
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
                    viewport={{once: true, margin: "-50px"}}
                >
                    {highlights.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div key={index} variants={cardVariants}>
                                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                                    <CardContent className="p-6">
                                        <div
                                            className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                            <Icon className="w-6 h-6 text-primary"/>
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
                        viewport={{once: true, margin: "-50px"}}
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
                                    initial={{opacity: 0, x: -20}}
                                    whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true}}
                                    transition={{duration: 0.4, delay: index * 0.1}}
                                >
                                    <span>{item.skill}</span>
                                    <span className="text-primary">{item.level}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{opacity: 0, scale: 0.9, rotate: 2}}
                        whileInView={{opacity: 1, scale: 1, rotate: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.7, ease: "easeOut"}}
                    >
                        <Card className="w-full h-[500px] bg-background/50 backdrop-blur-sm border-border">
                            <CardContent className="p-8 h-full flex flex-col">
                                <div className="text-center mb-6">
                                    <h4 className="font-semibold text-foreground mb-2">Languages</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {error ? 'Language statistics (cached)' : 'Live coding statistics from WakaTime'}
                                    </p>
                                    {error && (
                                        <p className="text-xs text-destructive mt-1">
                                            {error}
                                        </p>
                                    )}
                                </div>
                                <div className="flex-1 min-h-0">
                                    {isLoading ? (
                                        <div className="h-full flex items-center justify-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Loader2 className="w-8 h-8 animate-spin text-primary"/>
                                                <p className="text-sm text-muted-foreground">Loading language
                                                    stats...</p>
                                            </div>
                                        </div>
                                    ) : processedChartData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={processedChartData}
                                                    cx="50%"
                                                    cy="45%"
                                                    innerRadius={50}
                                                    outerRadius={90}
                                                    paddingAngle={4}
                                                    dataKey="value"
                                                    animationBegin={0}
                                                    animationDuration={1000}
                                                    animationEasing="ease-out"
                                                >
                                                    {processedChartData.map((entry, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={entry.color}
                                                            stroke="hsl(var(--background))"
                                                            strokeWidth={2}
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip content={<CustomTooltip/>}/>
                                                <Legend
                                                    content={<CustomLegend/>}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-full flex items-center justify-center">
                                            <p className="text-sm text-muted-foreground">No language data available</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
