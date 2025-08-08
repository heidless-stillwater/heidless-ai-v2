import type { Metadata } from 'next';
import { BriefAnalyzerForm } from './brief-analyzer-form';

export const metadata: Metadata = {
    title: 'Brief Analyzer | heidless ai',
    description: 'Use our AI-powered tool to summarize your project brief or mockup description.',
};

export default function BriefAnalyzerPage() {
    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                                Brief Analyzer
                            </h1>
                            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                Paste your project brief or mockup description below. Our AI will provide a concise summary of the key requirements and goals to kickstart the design process.
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto mt-16 max-w-4xl">
                        <BriefAnalyzerForm />
                    </div>
                </div>
            </section>
        </div>
    );
}
