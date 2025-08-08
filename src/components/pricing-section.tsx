
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, Feather, Trophy, Gem, Shield } from 'lucide-react';
import Link from 'next/link';

export function PricingSection() {
    return (
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-background/95">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Choose a plan that fits your needs</h2>
                        <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Simple, transparent pricing. We use AI to streamline our process. This saves us time &amp; costs. We pass those savings on to you.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12 justify-center">

                    {/* Brochure Tier */}
                    <Card className="flex flex-col max-w-sm">
                        <CardHeader className="items-center">
                            <Feather className="h-12 w-12 text-primary" />
                            <CardTitle className="text-2xl font-headline mt-4">Brochure</CardTitle>
                            <div className="text-4xl font-bold">£399</div>
                            <CardDescription>one-time</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Perfect for Small Businesses and Individuals</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Secure your foot-hold on the Web</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Excellent Foundation for your Web Presence</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Single Page Application</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Mobile-Responsive Design</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />ChatBot + 1 AI Functions tailored to your Profession</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />First month's 'Standard' Support Plan included</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                <Link href="/contact">Get Started</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Pro Tier */}
                    <Card className="flex flex-col border-primary shadow-lg shadow-primary/20 max-w-sm">
                        <CardHeader className="items-center">
                            <Trophy className="h-12 w-12 text-primary" />
                            <CardTitle className="text-2xl font-headline mt-4">Pro</CardTitle>
                            <div className="text-4xl font-bold">£599</div>
                            <CardDescription>one-time</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Optimal for Small Businesses and Individuals</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Everything in Brochure Plan</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Up to 5 pages allowing you to expand on  your offering</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />3 AI Functions tailored to your Profession/Service</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />First month's 'Standard' Support Plan included</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full">
                                <Link href="/contact">Choose Pro</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Bespoke Tier */}
                    <Card className="flex flex-col max-w-sm">
                        <CardHeader className="items-center">
                            <Gem className="h-12 w-12 text-primary" />
                            <CardTitle className="text-2xl font-headline mt-4">Bespoke</CardTitle>
                            <div className="text-4xl font-bold">Let's Talk</div>
                            <CardDescription>Competitive Quote</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />For businesses ready to scale and sell online</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Everything in Pro Plan</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Up to 10 pages</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />E-commerce Integration</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />5 AI Functions</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Advanced SEO & Analytics</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />First month's 'Standard' Support Plan included</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                                <Link href="/contact">Contact Us</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    
                    {/* Support/After-care Tier */}
                    <Card className="flex flex-col max-w-sm">
                        <CardHeader className="items-center">
                            <Shield className="h-12 w-12 text-primary" />
                            <CardTitle className="text-2xl font-headline mt-4">Support/After-care</CardTitle>
                            <div className="text-4xl font-bold">From £49</div>
                            <CardDescription>/month</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-4">
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Ongoing Maintenance</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Security & Plugin Updates</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Monthly Performance Reports</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Pro-Active Support</li>
                                <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />Priority Issue Support</li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" className="w-full">
                                <Link href="/support">Find Out More</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}
