
import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Case Study: Best Kebab | heidless ai',
    description: 'A deep dive into the website solution for Best Kebab.',
};

export default function BestKebabPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <p className="text-primary font-semibold mb-2">Case Study</p>
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl">
                                Best Kebab
                            </h1>
                            <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl">
                                A dynamic website solution for a popular local kebab shop, designed to boost online orders, showcase the menu, and engage with the local community.
                            </p>
                            <div className="flex gap-4 mt-8">
                                <Button asChild size="lg">
                                    <Link href="/contact">Start Your Project</Link>
                                </Button>
                                <Button asChild size="lg" variant="secondary">
                                    <Link href="https://idx-studio-1492279467-477976862873.europe-west2.run.app/" target="_blank" rel="noopener noreferrer">Visit Demo</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="overflow-hidden rounded-lg shadow-lg">
                             <Image
                                src="https://storage.googleapis.com/fast-food-assets/heidless-ai/best-kebab-placeholder.png"
                                alt="Best Kebab Website"
                                width={800}
                                height={600}
                                data-ai-hint="fast food website"
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
                           The main objective was to create a visually appealing and easy-to-navigate website that drives online sales. This included an online ordering system, a dynamic menu, and highlighting special offers to attract and retain customers.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
                        <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Online Ordering</h3>
                                <p className="text-foreground/80">A seamless, mobile-friendly system for customers to place orders directly from the website.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Dynamic Menu</h3>
                                <p className="text-foreground/80">An easy-to-update menu with high-quality images and descriptions for all food items.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <CheckCircle className="h-8 w-8 text-primary mt-1" />
                            <div>
                                <h3 className="text-xl font-bold font-headline">Promotions & Offers</h3>
                                <p className="text-foreground/80">A dedicated section to feature daily specials and promotions, encouraging repeat business.</p>
                            </div>
                        </div>
                    </div>
                 </div>
            </section>

             <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-3xl font-headline font-bold text-primary mb-4">The Outcome</h2>
                    <p className="max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
                        The new website led to a 60% increase in online orders within the first three months. The visually appealing menu and easy ordering process have received excellent customer feedback, significantly boosting the shop's local online presence.
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
