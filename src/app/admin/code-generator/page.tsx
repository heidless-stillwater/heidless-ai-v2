import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Code Generator | Admin | heidless ai',
    description: 'AI-powered code generation tool.',
};

export default function CodeGeneratorPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Code Generator
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    An advanced tool that generates code snippets, components, or even full-stack applications from natural language prompts.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
