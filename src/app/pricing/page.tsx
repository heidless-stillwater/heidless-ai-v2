import { PricingSection } from '@/components/pricing-section';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | heidless ai',
    description: 'Choose a plan that fits your needs. Simple, transparent pricing.',
};

export default function PricingPage() {
    return (
        <div className="bg-background text-foreground">
            <PricingSection />
        </div>
    );
}
