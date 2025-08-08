import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Competitor Analysis | Admin | heidless ai',
    description: 'AI-driven competitor analysis tool.',
};

export default function CompetitorAnalysisPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Competitor Analysis
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Analyzes competitor websites to identify strengths, weaknesses, and strategic opportunities for your digital presence.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
