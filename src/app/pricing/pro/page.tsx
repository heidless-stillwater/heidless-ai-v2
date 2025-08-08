import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Trophy } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Pro Package | heidless ai',
    description: 'Details of the Pro website package.',
};

const features = [
    'Optimal for Small Businesses',
    'Everything in Brochure Plan',
    'Up to 5 pages',
    '3 AI Functions tailored to your Profession',
    'First Year \'Standard\' Support Included',
];

export default function ProPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-4xl">
                        <Card className="shadow-lg border-primary">
                            <CardHeader className="text-center bg-muted/30 p-8">
                                <Trophy className="h-16 w-16 text-primary mx-auto mb-4" />
                                <CardTitle className="text-4xl font-headline">Pro Package</CardTitle>
                                <CardDescription className="text-xl text-foreground/80">Expand your digital footprint and capabilities.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-2xl font-bold font-headline text-primary">Key Features</h3>
                                    <ul className="space-y-3">
                                        {features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                                                <span className="text-foreground/90">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-6 rounded-lg bg-muted/30 p-8">
                                    <h3 className="text-2xl font-bold font-headline text-primary">Investment</h3>
                                    <div className="text-5xl font-bold">£599</div>
                                    <p className="text-lg text-muted-foreground">One-time payment</p>
                                    <p className="text-sm text-foreground/80">
                                       A comprehensive package for growing businesses looking for more features and pages to showcase their services.
                                    </p>
                                    <Button asChild size="lg" className="w-full mt-4">
                                        <Link href="/pricing">Choose Pro</Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
