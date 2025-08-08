import type { Metadata } from 'next';
import { BriefAnalyzerForm } from '@/app/brief-analyzer/brief-analyzer-form';

export const metadata: Metadata = {
    title: 'Powered Brief | Admin | heidless ai',
    description: 'The AI-powered brief analysis tool.',
};

export default function PoweredBriefPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Powered Brief
                </h1>
                 <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    This tool uses generative AI to summarize client briefs or mockups, providing a powerful starting point for the design process. This function is installed and available.
                </p>
            </header>
            <main className="max-w-4xl mx-auto">
                <BriefAnalyzerForm />
            </main>
        </div>
    );
}
