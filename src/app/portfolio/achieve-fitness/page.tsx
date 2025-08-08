
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Case Study: Achieve Fitness Coaching | heidless ai',
    description: 'A deep dive into the website solution for Achieve Fitness Coaching.',
};

export default function AchieveFitnessPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-primary font-semibold mb-2">Case Study</p>
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Achieve Fitness Coaching
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
                                A comprehensive website solution for a fitness coaching sole trader, designed to streamline client recruitment, service delivery, and business management.
                            </p>
                            <div className="flex gap-4 mt-8">
                                <Button asChild size="lg">
                                    <Link href="/contact">Start Your Project</Link>
                                </Button>
                                <Button asChild size="lg" variant="secondary">
                                    <Link href="https://idx-studio-3228369809-477976862873.europe-west2.run.app/" target="_blank" rel="noopener noreferrer">Visit Demo</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-lg">
                             <Image
                                src="https://storage.googleapis.com/fast-food-assets/heidless-ai/acieve-fitness-placeholder.png"
                                alt="Achieve Fitness Coaching Website"
                                width={800}
                                height={600}
                                data-ai-hint="fitness coaching website"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="w-full py-12 md:py-24 bg-muted/30">
                 <div className="container mx-auto px-4 md:px-6">
                     <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-headline font-bold text-primary mb-4">Project Goals</h2>
                        <p className="text-lg text-foreground/80">
                            The primary goal was to create a professional online presence that automates key business processes. This included a seamless way for new clients to sign up, access to training materials for existing clients, and tools for the owner to manage the business efficiently.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                        <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Client Recruitment</h3>
                                <p className="text-foreground/80">Easy-to-use contact forms and service pages to attract and convert new clients.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Service Delivery</h3>
                                <p className="text-foreground/80">A secure client portal for accessing personalized workout plans and tracking progress.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Business Management</h3>
                                <p className="text-foreground/80">An integrated dashboard for scheduling, payments, and client communication.</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

             <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">The Outcome</h2>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                        The new website has significantly reduced administrative workload, allowing the coach to focus more on client success. Client acquisition has increased by 40% since launch, and user feedback highlights the platform's ease of use.
                    </p>
                     <div className="text-center mt-12">
                        <Button asChild variant="link" className="text-accent text-lg">
                           <Link href="/portfolio">Portfolio <ArrowRight className="ml-2 h-5 w-5" /></Link>
                        </Button>
                    </div>
                </div>
             </section>
        </div>
    );
}
