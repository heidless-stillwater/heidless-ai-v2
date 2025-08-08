import type { Metadata } from 'next';
import { ComingSoon } from '@/components/coming-soon';

export const metadata: Metadata = {
    title: 'Content Generator | Admin | heidless ai',
    description: 'AI-powered content generation for websites.',
};

export default function ContentGeneratorPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Content Generator
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Creates high-quality, SEO-friendly copy for your website, from blog posts to product descriptions.
                </p>
            </header>
            <main>
                <ComingSoon />
            </main>
        </div>
    );
}
