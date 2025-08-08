'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';
import { getTemplates, CustomSiteGeneratorOutput } from '@/ai/flows/custom-site-generator-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ExternalLink, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type Template = CustomSiteGeneratorOutput['templates'][0];

export function CustomSiteGeneratorForm() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
    const { toast } = useToast();

    const { register, watch, control } = useForm({
        defaultValues: {
            category: 'all',
            search: '',
        },
    });

    const categoryFilter = watch('category');
    const searchFilter = watch('search');

    const categories = useMemo(() => {
        const allCategories = templates.map(t => t.category);
        return ['all', ...Array.from(new Set(allCategories))];
    }, [templates]);

    const fetchTemplates = useCallback(
        debounce(async (category: string, search: string) => {
            setIsLoading(true);
            try {
                const result = await getTemplates({
                    categoryPattern: category === 'all' ? undefined : category,
                    templatePattern: search || undefined,
                });
                setTemplates(result.templates);
            } catch (error) {
                console.error('Error fetching templates:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to fetch templates. Please try again.',
                    variant: 'destructive',
                });
            } finally {
                setIsLoading(false);
            }
        }, 300),
        []
    );

    useEffect(() => {
        fetchTemplates(categoryFilter, searchFilter);
    }, [categoryFilter, searchFilter, fetchTemplates]);

    const handleSelectTemplate = (templateName: string, isSelected: boolean) => {
        const newSelection = new Set(selectedTemplates);
        if (isSelected) {
            newSelection.add(templateName);
        } else {
            newSelection.delete(templateName);
        }
        setSelectedTemplates(newSelection);
    };
    
    const handleEmailSelection = () => {
        const subject = "Website Template Selection";
        const body = `Hello,\n\nI am interested in the following website templates:\n\n- ${Array.from(selectedTemplates).join('\n- ')}\n\nThank you,`;
        const mailtoLink = `mailto:heidlessemail14@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    };


    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Template Browser</CardTitle>
                    <CardDescription>Filter and select templates to get started.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Select onValueChange={(value) => control._formValues.category = value} defaultValue="all">
                            <SelectTrigger><SelectValue placeholder="Filter by category..." /></SelectTrigger>
                            <SelectContent>
                                {categories.map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input placeholder="Search by name..." {...register('search')} />
                    </div>

                    {selectedTemplates.size > 0 && (
                        <div className="space-y-2 pt-4">
                             <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-sm font-medium">Selected:</h3>
                                {Array.from(selectedTemplates).map(name => (
                                    <Badge key={name} variant="secondary">{name}</Badge>
                                ))}
                            </div>
                            <Button onClick={handleEmailSelection}>
                                <Mail className="mr-2 h-4 w-4" />
                                Email Selection
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {isLoading ? (
                <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Loading templates...</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {templates.map(template => (
                        <Card key={template.name} className="flex flex-col overflow-hidden">
                             <CardHeader className="p-0 relative">
                                <Image
                                    src={template.thumbnailUrl}
                                    alt={`Thumbnail for ${template.name}`}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute top-2 right-2 flex items-center bg-background/80 p-2 rounded-md">
                                     <Checkbox
                                        id={`select-${template.name}`}
                                        onCheckedChange={(checked) => handleSelectTemplate(template.name, !!checked)}
                                        checked={selectedTemplates.has(template.name)}
                                    />
                                    <label htmlFor={`select-${template.name}`} className="ml-2 text-sm font-medium">Select</label>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <CardTitle className="text-lg font-headline">{template.name}</CardTitle>
                                <Badge variant="outline" className="mt-1">{template.category}</Badge>
                                <CardDescription className="mt-2 text-sm">{template.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="p-4 pt-0">
                                <Button asChild variant="outline" className="w-full">
                                    <Link href={template.url} target="_blank" rel="noopener noreferrer">
                                        Visit Demo <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
