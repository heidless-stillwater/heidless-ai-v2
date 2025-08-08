import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Code Review Assistance | Admin | heidless ai',
    description: 'AI assistant for code reviews.',
};

export default function CodeReviewAssistancePage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Code Review Assistance
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Analyzes code for best practices, style consistency, and potential vulnerabilities to enhance code quality. This function is installed and available.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
