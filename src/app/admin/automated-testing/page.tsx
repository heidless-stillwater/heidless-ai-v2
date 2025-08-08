import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Automated Testing | Admin | heidless ai',
    description: 'AI-driven automated testing to ensure application quality.',
};

export default function AutomatedTestingPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Automated Testing
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Generates test cases and executes automated tests to ensure functionality and performance, improving software reliability.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
