

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ClientChat } from '@/app/admin/client-communication-bots/client-chat';
import { Briefcase, Calculator, Utensils, HeartPulse, Dumbbell, BrainCircuit, Tooth } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect, useState } from 'react';
import { CodeGeneratorForm } from './code-generator-form';
import { ExpertiseForm } from './expertise-form';
import { EmotionalIntelligenceForm } from './emotional-intelligence-form';
import { ProgressTrackerForm } from './progress-tracker-form';
import { HabitCoachForm } from './habit-coach-form';
import { TaxComplianceForm } from './tax-compliance-form';
import { ReconciliationForm } from './reconciliation-form';
import { DynamicPricingForm } from './dynamic-pricing-form';
import { PersonalizedRecommendationsForm } from './personalized-recommendations-form';
import { TreatmentPlanForm } from './treatment-plan-form';
import { PredictiveMaintenanceForm } from './predictive-maintenance-form';
import { NutritionAssistantForm } from './nutrition-assistant-form';
import { WorkoutPlanForm } from './workout-plan-form';

const professionalSections = [
    { 
        id: 'web-consultancy', 
        name: 'Web Consultancy', 
        icon: Briefcase,
        content: (
            <Tabs defaultValue="client-comm-bots" className="w-full">
                <div className="flex justify-center">
                    <TabsList className="mb-[10px] h-auto flex-wrap justify-center">
                        <TabsTrigger value="client-comm-bots">Client Communication Bots</TabsTrigger>
                        <TabsTrigger value="auto-code-gen">Automated Code Generation</TabsTrigger>
                        <TabsTrigger value="expertise">Expertise</TabsTrigger>
                        <TabsTrigger value="content-generator">Content Generator</TabsTrigger>
                        <TabsTrigger value="color-palette-generator">Color Palette Generator</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="client-comm-bots">
                    <ClientChat />
                </TabsContent>
                <TabsContent value="auto-code-gen">
                    <CodeGeneratorForm />
                </TabsContent>
                <TabsContent value="expertise">
                    <ExpertiseForm />
                </TabsContent>
                <TabsContent value="content-generator"><WorkoutPlanForm /></TabsContent>
                <TabsContent value="color-palette-generator"><WorkoutPlanForm /></TabsContent>
            </Tabs>
        )
    },
    { 
        id: 'accountancy', 
        name: 'Accountancy', 
        icon: Calculator,
        content: (
            <Tabs defaultValue="client-comm-bots" className="w-full">
                <div className="flex justify-center">
                    <TabsList className="mb-[10px] h-auto flex-wrap justify-center">
                        <TabsTrigger value="client-comm-bots">Client Communication Bots</TabsTrigger>
                        <TabsTrigger value="tax-compliance">Tax Compliance & Optimization</TabsTrigger>
                        <TabsTrigger value="auto-reconciliation">Automated Reconciliation</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="client-comm-bots">
                    <ClientChat 
                        title="Accountancy AI Assistant"
                        placeholder="Ask about tax deadlines, bookkeeping, or financial reports..."
                        systemPrompt={`You are a helpful and professional AI assistant for an accountancy firm. Your role is to answer common client questions about tax, bookkeeping, deadlines, and financial reporting. Provide clear, concise, and accurate information. Do not provide financial advice, but you can explain concepts and procedures. For example, if asked about a tax deadline, provide the correct date and link to the official government resource.`}
                    />
                </TabsContent>
                <TabsContent value="tax-compliance">
                    <TaxComplianceForm />
                </TabsContent>
                 <TabsContent value="auto-reconciliation">
                    <ReconciliationForm />
                </TabsContent>
            </Tabs>
        )
    },
    { 
        id: 'fast-food', 
        name: 'Fast Food Shop', 
        icon: Utensils,
        content: (
            <Tabs defaultValue="24-7-chatbot" className="w-full">
                <div className="flex justify-center">
                    <TabsList className="mb-[10px] h-auto flex-wrap justify-center">
                        <TabsTrigger value="24-7-chatbot">24/7 Customer Chatbot</TabsTrigger>
                        <TabsTrigger value="dynamic-pricing">Dynamic Pricing & Promotions</TabsTrigger>
                        <TabsTrigger value="personalized-recommendations">Personalized Recommendations</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="24-7-chatbot">
                    <ClientChat 
                        title="Fast Food AI Assistant"
                        placeholder="Ask about our menu, special offers, or opening times..."
                        systemPrompt={`You are a friendly and enthusiastic AI assistant for a fast food shop called "Best Kebab". Your role is to help customers with their orders and answer questions. You should be knowledgeable about the menu (e.g., kebabs, burgers, pizzas, sides), special deals, and opening hours (11am - 11pm, 7 days a week). Be conversational and aim to upsell where appropriate. For example: "The Doner Kebab is our most popular item! Would you like to make it a meal with fries and a drink for just £2 extra?"`}
                    />
                </TabsContent>
                <TabsContent value="dynamic-pricing"><DynamicPricingForm /></TabsContent>
                <TabsContent value="personalized-recommendations"><PersonalizedRecommendationsForm /></TabsContent>
            </Tabs>
        ) 
    },
    { 
        id: 'dental-practice', 
        name: 'Dental Practice', 
        icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12.47 3.3a1 1 0 0 0 -1.09.12l-5.45 4.33a3 3 0 0 0 -1.43 2.5V17a3 3 0 0 0 3 3h10a3 3 0 0 0 3 -3v-6.75a3 3 0 0 0 -1.43 -2.5L13.56 3.42a1 1 0 0 0 -1.09 -0.12z"></path><path d="M16 13a2.5 2.5 0 1 1 -5 0a2.5 2.5 0 0 1 5 0z"></path><path d="M12 20v-3"></path><path d="M12 8V6"></path><path d="m15 10-1-1"></path><path d="m9 10 1-1"></path></svg>,
        content: (
             <Tabs defaultValue="patient-comm-bots" className="w-full">
                <div className="flex justify-center">
                    <TabsList className="mb-[10px] h-auto flex-wrap justify-center">
                        <TabsTrigger value="patient-comm-bots">Patient Communication Bots</TabsTrigger>
                         <TabsTrigger value="treatment-plans">Personalized Treatment Plans</TabsTrigger>
                        <TabsTrigger value="predictive-maintenance">Predictive Maintenance for Equipment</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="patient-comm-bots">
                    <ClientChat 
                        title="Dental Practice AI Assistant"
                        placeholder="Ask about appointments, treatments, or dental hygiene..."
                        systemPrompt={`You are a friendly and professional AI assistant for a dental practice. Your role is to answer patient questions about appointments, common procedures (like cleanings, fillings, whitening), and general dental hygiene tips. IMPORTANT: You must not provide medical advice. If a user asks for a diagnosis or medical recommendation, you must politely decline and advise them to speak with a qualified dentist. For example: "I can't provide medical advice, but I can help you schedule an appointment with one of our dentists to discuss that."`}
                    />
                </TabsContent>
                <TabsContent value="treatment-plans"><TreatmentPlanForm /></TabsContent>
                <TabsContent value="predictive-maintenance"><PredictiveMaintenanceForm /></TabsContent>
            </Tabs>
        )
    },
    { 
        id: 'fitness-coach', 
        name: 'Fitness Coach', 
        icon: Dumbbell,
        content: (
            <Tabs defaultValue="nutrition-assistant" className="w-full">
                <div className="flex justify-center">
                    <TabsList className="mb-[10px] h-auto flex-wrap justify-center">
                        <TabsTrigger value="nutrition-assistant">AI Nutrition Assistant</TabsTrigger>
                        <TabsTrigger value="client-engagement">Client Engagement Bots</TabsTrigger>
                        <TabsTrigger value="workout-plans">Personalized Workout Plans</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="nutrition-assistant"><NutritionAssistantForm /></TabsContent>
                <TabsContent value="client-engagement">
                     <ClientChat 
                        title="Fitness Coach AI Assistant"
                        placeholder="Ask about your workout plan, nutrition, or schedule..."
                        systemPrompt={`You are an encouraging and knowledgeable AI fitness coach. Your role is to motivate clients, answer questions about their workout plans, provide general nutrition advice, and help with scheduling. Always maintain a positive and supportive tone. When a client asks a question you don't know the answer to, gently guide them to ask their human coach, saying something like: "That's a great question! For specific adjustments to your plan, it's best to chat directly with your coach."`}
                    />
                </TabsContent>
                <TabsContent value="workout-plans"><WorkoutPlanForm /></TabsContent>
            </Tabs>
        )
    },
    { 
        id: 'life-coach', 
        name: 'Life Coach', 
        icon: BrainCircuit,
        content: (
            <Tabs defaultValue="emotional-intelligence" className="w-full">
                <div className="flex justify-center">
                    <TabsList className="mb-[10px] h-auto flex-wrap justify-center">
                        <TabsTrigger value="emotional-intelligence">Emotional Intelligence & Resilience Development</TabsTrigger>
                        <TabsTrigger value="progress-tracking">Progress Tracking & Visualization</TabsTrigger>
                        <TabsTrigger value="habit-formation">Habit Formation & Breaking</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="emotional-intelligence"><EmotionalIntelligenceForm /></TabsContent>
                <TabsContent value="progress-tracking"><ProgressTrackerForm /></TabsContent>
                <TabsContent value="habit-formation"><HabitCoachForm /></TabsContent>
            </Tabs>
        )
    },
];

const DesktopLayout = () => (
    <div className="container mx-auto mt-8 flex w-[95%] flex-col gap-12">
        {professionalSections.map((section) => (
             <Card id={section.id} key={section.id} className="shadow-lg scroll-mt-24">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <section.icon />
                        <CardTitle className="text-3xl font-headline">{section.name}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>{section.content}</CardContent>
            </Card>
        ))}
    </div>
);

const AccordionLayout = () => (
    <div className="container mx-auto mt-8 flex w-[95%] flex-col gap-2">
        <Accordion type="single" collapsible className="w-full">
            {professionalSections.map((section) => (
                <AccordionItem value={section.id} key={section.id} className="border-b-0">
                     <Card className="shadow-lg mb-4">
                        <AccordionTrigger className="w-full p-6 hover:no-underline">
                             <div className="flex items-center gap-4">
                                <section.icon />
                                <CardTitle className="text-xl md:text-3xl font-headline text-left">{section.name}</CardTitle>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                           <div className="px-6 pb-6">
                             {section.content}
                           </div>
                        </AccordionContent>
                    </Card>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
);


export default function AIToolsPage() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


    return (
        <div className="bg-background text-foreground">
            <section className="w-full py-20 md:py-32">
                <div className="container mx-auto flex flex-col items-center justify-center space-y-4 px-4 text-center md:px-6">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                        Tools for Your Profession
                    </h1>
                    <div className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed space-y-4">
                        <p>
                           Explore our suite of AI-powered tools designed to streamline workflows and boost productivity in your industry. They are numerous. A sample are listed here. We would work with you to identify what is available for your industry.
                        </p>
                        <p>
                            Our recommendation. Focus on a max of 3 initially - then evolve from there.
                        </p>
                    </div>
                </div>
            </section>

            <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm py-4 border-b border-border/40">
                <div className="container mx-auto flex justify-center px-4">
                    <div className="flex flex-wrap justify-center gap-2 max-w-[calc(100%-100px)]">
                        {professionalSections.map((section) => (
                             <Button asChild variant="outline" key={section.id} className="px-3">
                                <Link href={`#${section.id}`}>{section.name}</Link>
                            </Button>
                        ))}
                    </div>
                </div>
            </div>

            {isClient && (isDesktop ? <DesktopLayout /> : <AccordionLayout />)}
            
        </div>
    );
}
