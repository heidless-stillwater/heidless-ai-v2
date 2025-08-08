import type { Metadata } from 'next';
import { DocGeneratorForm } from './doc-generator-form';

export const metadata: Metadata = {
    title: 'Technical Documentation Generation | Admin | heidless ai',
    description: 'AI tool for generating technical documentation.',
};

export default function TechnicalDocumentationGenerationPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Technical Documentation Generation
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Creates comprehensive documentation from code comments, designs, and project specifications to improve knowledge transfer.
                </p>
            </header>
            <main className="max-w-4xl mx-auto">
                <DocGeneratorForm />
            </main>
        </div>
    );
}
