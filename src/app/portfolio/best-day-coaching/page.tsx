
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Case Study: Best Day Coaching | heidless ai',
    description: 'A deep dive into the website solution for Best Day Coaching.',
};

export default function BestDayCoachingPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-primary font-semibold mb-2">Case Study</p>
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Best Day Coaching
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
                                A tailored website for a life coaching sole trader, focusing on client acquisition, resource delivery, and efficient business operations.
                            </p>
                            <div className="flex flex-wrap justify-start gap-4 mt-8">
                                <Button asChild size="lg">
                                    <Link href="/contact">Start Your Project</Link>
                                </Button>
                                <Button asChild size="lg" variant="secondary">
                                    <Link href="https://idx-studio-6382024385-477976862873.europe-west2.run.app/" target="_blank" rel="noopener noreferrer">Re-Visit Demo</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-lg">
                             <Image
                                src="https://storage.googleapis.com/fast-food-assets/heidless-ai/best-coaching-placeholder.png"
                                alt="Best Day Coaching Website"
                                width={800}
                                height={600}
                                data-ai-hint="life coaching website"
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
                            The core objective was to establish a warm, inviting online space that automates key aspects of the coaching business. This involved creating intuitive pathways for new client onboarding, a private area for clients to access materials, and a simple backend for the coach to manage their practice.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                        <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Client Acquisition</h3>
                                <p className="text-foreground/80">Inspiring service pages and clear calls-to-action to attract and onboard new clients seeking personal growth.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Resource Delivery</h3>
                                <p className="text-foreground/80">A secure client-only section for accessing coaching modules, worksheets, and session notes.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Practice Management</h3>
                                <p className="text-foreground/80">An admin interface for managing appointments, client progress, and communications.</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

             <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">The Outcome</h2>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                        The new website has empowered the life coach to focus on what they do best: coaching. It has led to a 35% increase in client inquiries and has been praised by users for its calming design and simple navigation, creating a positive first impression.
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
