
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Web Consultancy AI Functions | heidless ai',
    description: 'A list of AI functions relevant to a Web Development Consultancy.',
};

const aiFunctions = [
    {
        name: 'Automated Code Generation',
        description: 'Generates boilerplate code, components, or entire sections based on specifications.',
        benefit: 'Accelerates development and reduces manual coding',
        status: 'Not Installed',
        href: '/admin/automated-code-generation'
    },
    {
        name: 'Bug Detection & Fixing',
        description: 'Identifies potential bugs, suggests fixes, and can even auto-correct common errors.',
        benefit: 'Improves code quality and reduces debugging time',
        status: 'Not Installed',
        href: '#'
    },
    {
        name: 'Code Review Assistance',
        description: 'Analyzes code for best practices, style consistency, and potential vulnerabilities.',
        benefit: 'Enhances code maintainability and security',
        status: 'Not Installed',
        href: '/admin/code-review-assistance'
    },
    {
        name: 'Automated Testing',
        description: 'Generates test cases and executes automated tests to ensure functionality and performance.',
        benefit: 'Improves software reliability and reduces manual testing effort',
        status: 'Not Installed',
        href: '/admin/automated-testing'
    },
    {
        name: 'Project Scoping & Estimation',
        description: 'Analyzes project requirements to provide accurate time and resource estimates.',
        benefit: 'Enhances project planning and client quoting',
        status: 'Not Installed',
        href: '/admin/project-scoping-estimation'
    },
    {
        name: 'Technical Documentation Generation',
        description: 'Creates comprehensive documentation from code comments, designs, and project specifications.',
        benefit: 'Improves knowledge transfer and onboarding',
        status: 'Installed',
        href: '/admin/technical-documentation-generation'
    },
    {
        name: 'Client Communication Bots',
        description: 'Handles routine client inquiries, provides project updates, and gathers feedback.',
        benefit: 'Enhances client satisfaction and streamlines communication',
        status: 'Installed',
        href: '/admin/client-communication-bots'
    },
    {
        name: 'SEO Optimization Analysis',
        description: 'Analyzes website content and structure for search engine optimization opportunities.',
        benefit: 'Improves website visibility and organic traffic',
        status: 'Not Installed',
        href: '/admin/seo-optimization-analysis'
    },
    {
        name: 'Performance Optimization Suggestions',
        description: 'Identifies bottlenecks in website performance and suggests improvements for speed and efficiency.',
        benefit: 'Enhances user experience and search rankings',
        status: 'Not Installed',
        href: '/admin/performance-optimization-suggestions'
    },
    {
        name: 'Security Vulnerability Scanning',
        description: 'Scans web applications for common security vulnerabilities and recommends remediation.',
        benefit: 'Strengthens application security and protects data',
        status: 'Not Installed',
        href: '/admin/security-vulnerability-scanning'
    },
];

export default function WebConsultancyAIFunctionsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-muted/50 text-foreground">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
                        Comprehensive AI Functions for a Web Consultancy
                    </h1>
                </header>

                <main>
                    <Card className="shadow-lg rounded-xl">
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline">Available AI Capabilities</CardTitle>
                            <CardDescription>A list of AI-powered tools to enhance web development workflows.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[25%]">Function</TableHead>
                                            <TableHead className="w-[40%]">Description</TableHead>
                                            <TableHead className="w-[25%]">Primary Benefit</TableHead>
                                            <TableHead className="text-right w-[10%]">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {aiFunctions.map((func) => (
                                            <TableRow key={func.name}>
                                                <TableCell className="font-medium">
                                                    <Link href={func.href} className="hover:text-primary hover:underline underline-offset-4 transition-colors">
                                                      {func.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">{func.description}</TableCell>
                                                <TableCell className="text-muted-foreground">{func.benefit}</TableCell>
                                                <TableCell className="text-right">
                                                    <Badge variant={func.status === 'Installed' ? 'default' : 'secondary'}>
                                                        {func.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </main>
            </div>
            <footer className="text-center py-6 text-sm text-muted-foreground">
                <p>Powered by Firebase & AI</p>
            </footer>
        </div>
    );
}
