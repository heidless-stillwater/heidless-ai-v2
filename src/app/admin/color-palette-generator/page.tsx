import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Color Palette Generator | Admin | heidless ai',
    description: 'AI-powered color palette generation for web design.',
};

export default function ColorPaletteGeneratorPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Color Palette Generator
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Generates aesthetically pleasing and accessible color palettes based on a brand's identity or user input.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
