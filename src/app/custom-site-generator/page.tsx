import type { Metadata } from 'next';
import { CustomSiteGeneratorForm } from './custom-site-generator-form';

export const metadata: Metadata = {
    title: 'Custom Site Generator | heidless ai',
    description: 'Browse, filter, and select from our library of professionally designed website templates.',
};

export default function CustomSiteGeneratorPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                                Custom Site Generator
                            </h1>
                            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Explore our collection of pre-built website templates. Filter by category or search by name to find the perfect starting point for your project. Select the templates you're interested in and email the list to us to get started.
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto mt-16 max-w-7xl">
                        <CustomSiteGeneratorForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
