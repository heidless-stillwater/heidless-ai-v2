import type { Metadata } from 'next';
import { ClientChat } from './client-chat';

export const metadata: Metadata = {
    title: 'Client Communication Bots | Admin | heidless ai',
    description: 'AI-powered chatbots for client communication.',
};

export default function ClientCommunicationBotsPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
            <header className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                    Client Communication Bots
                </h1>
                <p className="max-w-[900px] mx-auto text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
                    Handles routine client inquiries, provides project updates, and gathers feedback to streamline communication.
                </p>
            </header>
            <main>
                <ClientChat />
            </main>
        </div>
    );
}
