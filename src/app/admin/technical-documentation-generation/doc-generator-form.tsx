'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookText, Loader2 } from 'lucide-react';
import { generateDocs, GenerateDocsOutput } from '@/ai/flows/generate-docs-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  componentName: z.string().min(2, {
    message: 'Component name must be at least 2 characters long.',
  }),
  code: z.string().min(50, {
    message: 'Code must be at least 50 characters long.',
  }),
});

export function DocGeneratorForm() {
  const [documentation, setDocumentation] = useState<GenerateDocsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      componentName: '',
      code: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setDocumentation(null);
    try {
      const result = await generateDocs(values);
      setDocumentation(result);
    } catch (error) {
      console.error('Error generating documentation:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate documentation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Code Input</CardTitle>
          <CardDescription>Enter the component name and paste the source code below.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="componentName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., UserProfileCard" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Code</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your component code here..."
                        className="min-h-[250px] text-base font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Docs...
                  </>
                ) : (
                  'Generate Documentation'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
            <div className="flex flex-col items-center gap-4 text-center">
                <Loader2 className="h-12 w-12 animate-spin text-primary"/>
                <p className="text-muted-foreground">Our AI is generating documentation. Please wait...</p>
            </div>
         </div>
      )}

      {documentation && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BookText className="h-6 w-6 text-primary" />
              Generated Documentation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-foreground/90 rounded-lg border bg-muted/30 p-4">
                <pre className="whitespace-pre-wrap bg-transparent p-0 m-0">
                    <code>
                        {documentation.documentation}
                    </code>
                </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
