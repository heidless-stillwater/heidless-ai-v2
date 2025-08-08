'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { debounce } from 'lodash';
import { getTemplates, type CustomSiteGeneratorOutput } from '@/ai/flows/custom-site-generator-flow';
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
import { Form, FormField, FormControl } from '@/components/ui/form';

type Template = CustomSiteGeneratorOutput['templates'][0];

export function CustomSiteGeneratorForm() {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [allTemplates, setAllTemplates] = useState<Template[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
    const { toast } = useToast();

    const form = useForm({
        defaultValues: {
            category: 'all',
            search: '',
        },
    });

    const { register, watch, control } = form;

    const categoryFilter = watch('category');
    const searchFilter = watch('search');

    const categories = useMemo(() => {
        const allCategories = allTemplates.map(t => t.category);
        return ['all', ...Array.from(new Set(allCategories))];
    }, [allTemplates]);

    const fetchInitialTemplates = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await getTemplates({});
            setAllTemplates(result.templates);
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
    }, [toast]);

    useEffect(() => {
        fetchInitialTemplates();
    }, [fetchInitialTemplates]);


    const debouncedFilter = useCallback(
        debounce((category: string, search: string) => {
            let filtered = allTemplates;

            if (category && category !== 'all') {
                filtered = filtered.filter(t => t.category === category);
            }
            
            if (search) {
                const regex = new RegExp(search, 'i');
                filtered = filtered.filter(t => regex.test(t.name) || regex.test(t.description));
            }

            setTemplates(filtered);
        }, 300),
        [allTemplates]
    );

    useEffect(() => {
        debouncedFilter(categoryFilter, searchFilter);
    }, [categoryFilter, searchFilter, debouncedFilter]);

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
                    <Form {...form}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <FormField
                                control={control}
                                name="category"
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger><SelectValue placeholder="Filter by category..." /></SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map(cat => (
                                                <SelectItem key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <Input placeholder="Search by name or description..." {...register('search')} />
                        </div>
                    </Form>
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
                            </CardHeader>
                            <CardContent className="p-4 flex-grow">
                                <CardTitle className="text-lg font-headline">{template.name}</CardTitle>
                                <Badge variant="outline" className="mt-1">{template.category}</Badge>
                                <CardDescription className="mt-2 text-sm">{template.description}</CardDescription>
                            </CardContent>
                            <CardFooter className="p-4 pt-0 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                     <Checkbox
                                        id={`select-${template.name}`}
                                        onCheckedChange={(checked) => handleSelectTemplate(template.name, !!checked)}
                                        checked={selectedTemplates.has(template.name)}
                                    />
                                    <label htmlFor={`select-${template.name}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Select</label>
                                </div>
                                <Button asChild variant="outline">
                                    <Link href={template.url} target="_blank" rel="noopener noreferrer">
                                        Visit Demo <ExternalLink className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
            {templates.length === 0 && !isLoading && (
                <div className="text-center py-12">
                    <p className="text-muted-foreground">No templates found matching your criteria.</p>
                </div>
            )}
        </div>
    );
}
