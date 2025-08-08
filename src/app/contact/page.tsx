import { ContactSection } from '@/components/contact-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | heidless ai',
    description: 'Get in touch with heidless ai. We are here to help you with your project.',
};

export default function ContactPage() {
    return (
        <div className="bg-background text-foreground">
            <ContactSection />
        </div>
    );
}
