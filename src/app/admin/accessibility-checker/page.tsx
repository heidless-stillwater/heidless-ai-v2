import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Accessibility Checker | Admin | heidless ai',
    description: 'AI-powered accessibility analysis and recommendations.',
};

export default function AccessibilityCheckerPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Accessibility Checker
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Analyzes your website to identify and suggest improvements for accessibility issues, ensuring compliance with WCAG standards.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
