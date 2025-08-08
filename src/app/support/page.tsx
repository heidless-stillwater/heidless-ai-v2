
import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Shield, Heart, TrendingUp, Gem } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Support & After-care | heidless ai',
    description: 'Keep your website secure, updated, and performing optimally with our dedicated support plans.',
};

const supportPlans = [
    {
        icon: Shield,
        title: 'Basic Security',
        price: '£49',
        pricePeriod: '/month',
        description: 'Essential monitoring and security to keep your site safe.',
        features: [
            'Daily Backups',
            'Uptime Monitoring',
            'Plugin & Theme Updates',
        ],
        slug: '/support/basic',
    },
    {
        icon: Heart,
        title: 'Standard Care',
        price: '£99',
        pricePeriod: '/month',
        description: 'Comprehensive support for peace of mind.',
        features: [
            'Everything in Basic Security',
            'Monthly Health Reports',
            'Email Support',
            '30 mins of Content Updates',
        ],
        slug: '/support/standard',
        isFeatured: true,
    },
    {
        icon: TrendingUp,
        title: 'Performance Plus',
        price: '£149',
        pricePeriod: '/month',
        description: 'For sites where performance and speed are critical.',
        features: [
            'Everything in Standard Care',
            'Performance Optimization',
            'Priority Phone Support',
            '1 hour of Content Updates',
        ],
        slug: '/support/performance',
    },
    {
        icon: Gem,
        title: 'Bespoke Retainer',
        price: 'Let\'s Talk',
        pricePeriod: 'Custom',
        description: 'A dedicated partnership for ongoing growth.',
        features: [
            'Everything in Performance Plus',
            'Dedicated Account Manager',
            'Custom Development Hours',
            'Strategic Consultations',
        ],
        slug: '/support/bespoke',
    }
];

export default function SupportPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                                Support & After-care
                            </h1>
                            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Keep your website secure, updated, and performing optimally with our dedicated support plans. We ensure your digital asset remains valuable and protected.
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 justify-center">
                        {supportPlans.map((plan, index) => (
                            <Card key={index} className={`flex flex-col max-w-sm ${plan.isFeatured ? 'border-primary shadow-lg shadow-primary/20' : ''}`}>
                                <CardHeader className="items-center text-center">
                                    <plan.icon className="h-12 w-12 text-primary" />
                                    <CardTitle className="text-2xl font-headline mt-4">{plan.title}</CardTitle>
                                    <div className="text-4xl font-bold">{plan.price}</div>
                                    <CardDescription>{plan.pricePeriod === 'Custom' ? 'Competitive Quote' : plan.pricePeriod}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                     <p className="text-sm text-center text-muted-foreground min-h-[40px]">{plan.description}</p>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Check className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full" variant={plan.isFeatured ? 'default' : 'secondary'}>
                                        <Link href={plan.slug}>Details of Plan</Link>
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
