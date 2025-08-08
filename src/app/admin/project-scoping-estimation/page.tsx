import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Project Scoping & Estimation | Admin | heidless ai',
    description: 'AI tool for project scoping and estimation.',
};

export default function ProjectScopingEstimationPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Project Scoping & Estimation
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Analyzes project requirements to provide accurate time and resource estimates, enhancing planning and client quoting. This function is installed and available.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
