import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Expertise | Admin | heidless ai',
    description: 'Showcase of AI-driven expertise.',
};

export default function ExpertisePage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    AI Expertise
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    This function leverages our core AI's expertise to provide strategic recommendations and insights for your project.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
