import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BotMessageSquare, Code, LayoutTemplate, Megaphone, Paintbrush, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services | heidless ai',
    description: 'Explore the services offered by heidless ai, from web design to AI integration.',
};

const services = [
    {
        icon: Paintbrush,
        title: "Web Design",
        description: "Crafting visually stunning and intuitive user experiences that captivate your audience and are tailored to your brand's unique identity.",
    },
    {
        icon: Code,
        title: "Web Development",
        description: "Building robust, scalable, and high-performance websites using the latest technologies to ensure a seamless and reliable digital presence.",
    },
    {
        icon: BotMessageSquare,
        title: "AI Integration",
        description: "Leveraging artificial intelligence to create smart, personalized, and efficient digital solutions that automate processes and enhance user engagement.",
    },
    {
        icon: LayoutTemplate,
        title: "UI/UX Strategy",
        description: "Developing comprehensive UI/UX strategies that focus on user-centric design principles to create engaging and effective digital products.",
    },
    {
        icon: Megaphone,
        title: "Digital Marketing",
        description: "Implementing data-driven digital marketing campaigns to increase your online visibility, attract new customers, and grow your business.",
    },
    {
        icon: Search,
        title: "SEO Optimization",
        description: "Improving your website's search engine rankings to drive organic traffic and ensure your brand is discovered by your target audience.",
    },
];

export default function ServicesPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                                Our Services
                            </h1>
                            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                We provide a wide range of services to help your business succeed in the digital world.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 mt-12">
                        {services.map((service, index) => (
                            <Card key={index} className="flex flex-col hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                                <CardHeader className="items-center text-center">
                                    <div className="bg-primary/10 p-4 rounded-full">
                                        <service.icon className="h-8 w-8 text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-headline mt-4">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <CardDescription className="text-center">
                                        {service.description}
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
