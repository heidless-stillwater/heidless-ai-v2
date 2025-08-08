
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Portfolio | heidless ai',
    description: 'Browse the portfolio of heidless ai and see our recent work.',
};

const projects = [
    {
        title: "Case Study: Achieve Fitness Coaching",
        description: "Fitness Coaching. Sole trader. Site to enable Client Recruitment, Service Delivery, Business Management.",
        imageUrl: "https://storage.googleapis.com/heidless-ai-bucket/achieve-fitness-placeholder.png",
        aiHint: "fitness coaching",
        slug: "/portfolio/achieve-fitness"
    },
    {
        title: "Case Study: Best Day Coaching",
        description: "Life Coaching. Sole trader. Site to enable Client Recruitment, Service Delivery, Business Management.",
        imageUrl: "https://storage.googleapis.com/heidless-ai-bucket/best-coaching-placeholder.png",
        aiHint: "life coaching",
        slug: "/portfolio/best-day-coaching"
    },
    {
        title: "Case Study: Best Kebab",
        description: "Retail Fast Food Business. Enables the Promotion of Business, Communication of Menu and Delivery of Service.",
        imageUrl: "https://storage.googleapis.com/heidless-ai-bucket/best-kebab-placeholder.png",
        aiHint: "fast food",
        slug: "/portfolio/best-kebab"
    },
    {
        title: "AI-Powered E-commerce Platform",
        description: "A cutting-edge online store with personalized recommendations and a smart chatbot.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "ecommerce interface",
        slug: "#"
    },
    {
        title: "Corporate Website Redesign",
        description: "A complete overhaul of a legacy website, focusing on modern UI/UX and mobile-first design.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "corporate website",
        slug: "#"
    },
    {
        title: "SaaS Application Interface",
        description: "An intuitive and clean interface for a complex software-as-a-service product.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "saas dashboard",
        slug: "#"
    },
    {
        title: "Creative Agency Portfolio",
        description: "A visually rich portfolio site for a design agency, featuring bold typography and animations.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "creative portfolio",
        slug: "#"
    },
    {
        title: "Mobile Banking App",
        description: "A secure and user-friendly mobile app for managing finances on the go.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "mobile banking",
        slug: "#"
    },
    {
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets with dynamic charts and graphs.",
        imageUrl: "https://placehold.co/600x400.png",
        aiHint: "data dashboard",
        slug: "#"
    },
];

export default function PortfolioPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                                Our Portfolio
                            </h1>
                            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                We've helped businesses of all sizes transform their digital presence. Here are some of our favorite projects.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
                        {projects.map((project, index) => (
                            <Card key={index} className="flex flex-col overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1">
                                <CardHeader className="p-0">
                                    <Image
                                        src={project.imageUrl}
                                        alt={project.title}
                                        width={600}
                                        height={400}
                                        data-ai-hint={project.aiHint}
                                        className="w-full h-auto object-cover"
                                    />
                                </CardHeader>
                                <CardContent className="p-6 flex-grow">
                                    <CardTitle className="text-xl font-headline">{project.title}</CardTitle>
                                    <CardDescription className="mt-2">{project.description}</CardDescription>
                                </CardContent>
                                <CardFooter className="p-6 pt-0 mt-auto">
                                    <Button asChild variant="link" className="p-0 h-auto text-accent">
                                        <Link href={project.slug}>Visit Case Study <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
