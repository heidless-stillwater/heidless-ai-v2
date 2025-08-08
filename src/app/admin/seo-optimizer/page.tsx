import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'SEO Optimizer | Admin | heidless ai',
    description: 'AI-driven SEO optimization tool.',
};

export default function SeoOptimizerPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    SEO Optimizer
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Improves your website's search engine rankings by analyzing content, keywords, and technical SEO factors.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
