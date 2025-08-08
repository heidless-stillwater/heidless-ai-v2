import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Performance Optimizer | Admin | heidless ai',
    description: 'AI-driven performance optimization tool.',
};

export default function PerformanceOptimizerPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Performance Optimizer
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Identifies performance bottlenecks and suggests optimizations to improve site speed and user experience.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
