
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
    title: 'Basic Security Support | heidless ai',
    description: 'Details of the Basic Security support plan.',
};

const features = [
    'Daily Backups',
    'Uptime Monitoring',
    'Plugin & Theme Updates',
    'Essential security scans',
    'Peace of mind for your online presence',
];

export default function BasicSupportPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="mx-auto max-w-4xl">
                        <Card className="shadow-lg">
                            <CardHeader className="text-center bg-muted/30 p-8">
                                <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                                <CardTitle className="text-4xl font-headline">Basic Security Plan</CardTitle>
                                <CardDescription className="text-xl text-foreground/80">Essential monitoring and security to keep your site safe.</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 md:p-12">
                                <div className="grid md:grid-cols-2 gap-8">
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
                                        <div className="text-5xl font-bold">£49</div>
                                        <p className="text-lg text-muted-foreground">per month</p>
                                        <p className="text-sm text-foreground/80">
                                            An affordable monthly plan that covers all the security essentials to protect your digital asset.
                                        </p>
                                        <Button asChild size="lg" className="w-full mt-4">
                                            <Link href="/contact">Choose Basic</Link>
                                        </Button>
                                    </div>
                                </div>
                                <Separator className="my-8" />
                                <div className="text-center">
                                    <Button asChild variant="outline">
                                        <Link href="/support">
                                            <ArrowLeft className="mr-2 h-4 w-4" />
                                            Back to support plans
                                        </Link>
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
