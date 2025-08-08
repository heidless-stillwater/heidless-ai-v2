
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BotMessageSquare, Code, Paintbrush } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ContactSection } from '@/components/contact-section';
import { PricingSection } from '@/components/pricing-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <div className="max-w-[900px] mx-auto">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-primary animate-fade-in-down">
                <span className="text-accent">Empower</span> Your Business with <span className="text-accent">Cost effective</span> Website Design.
              </h1>
              <p className="mt-4 text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto animate-fade-in-up">
                We have pre-built a suite of powerful, profession-specific Web templates ready for you to customize - resulting in your own unique Businsess Website
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/pricing">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/portfolio">Our Work</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <PricingSection />

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32 bg-background/95">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Our Services</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From bespoke design to intelligent automation, we offer a comprehensive suite of services to elevate your brand.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 mt-12">
              <Card className="hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Paintbrush className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-headline mt-4">Web Design</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Crafting visually stunning and intuitive user experiences that captivate and convert.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-headline mt-4">Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Building robust, scalable, and high-performance websites with the latest technologies.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
                <CardHeader className="items-center">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <BotMessageSquare className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-headline mt-4">AI Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    Leveraging artificial intelligence to create smart, personalized, and efficient digital solutions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
             <div className="text-center mt-12">
                <Button asChild variant="link" className="text-accent text-lg">
                    <Link href="/services">View All Services <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Featured Work</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We are proud of our work. Check out some of our latest projects that showcase our passion for excellence.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                <Link href="/portfolio" className="group block overflow-hidden rounded-lg">
                    <Image
                        src="https://storage.googleapis.com/heidless-ai-bucket/achieve-fitness-placeholder.png"
                        alt="Project 1"
                        width={600}
                        height={400}
                        data-ai-hint="fitness coaching"
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </Link>
                <Link href="/portfolio" className="group block overflow-hidden rounded-lg">
                    <Image
                        src="https://storage.googleapis.com/heidless-ai-bucket/best-coaching-placeholder.png"
                        alt="Project 2"
                        width={600}
                        height={400}
                        data-ai-hint="life coaching"
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </Link>
                <Link href="/portfolio" className="group block overflow-hidden rounded-lg">
                    <Image
                        src="https://storage.googleapis.com/heidless-ai-bucket/best-kebab-placeholder.png"
                        alt="Project 3"
                        width={600}
                        height={400}
                        data-ai-hint="fast food"
                        className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </Link>
            </div>
            <div className="text-center mt-12">
                <Button asChild variant="link" className="text-accent text-lg">
                    <Link href="/portfolio">Explore Portfolio <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
            </div>
          </div>
        </section>

        <ContactSection />

      </main>
    </div>
  );
}
