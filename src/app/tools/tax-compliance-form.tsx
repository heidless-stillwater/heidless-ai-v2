'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calculator, Loader2 } from 'lucide-react';
import { getTaxAdvice, GetTaxAdviceOutput } from '@/ai/flows/tax-compliance-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  query: z.string().min(20, {
    message: 'Your query must be at least 20 characters long.',
  }),
});

export function TaxComplianceForm() {
  const [response, setResponse] = useState<GetTaxAdviceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getTaxAdvice(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting tax advice:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
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
          <CardTitle className="font-headline">Tax Compliance & Optimization Assistant</CardTitle>
          <CardDescription>Ask a question about tax compliance or potential optimizations for your situation.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I'm a self-employed graphic designer. What are the main expenses I can claim to reduce my tax bill?'"
                        className="min-h-[150px] text-base"
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
                    Analyzing...
                  </>
                ) : (
                  'Get Tax Info'
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
                <p className="text-muted-foreground">Our AI assistant is preparing your information. Please wait...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Calculator className="h-6 w-6 text-primary" />
              Tax Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-foreground/90 rounded-lg border bg-muted/30 p-4">
                <pre className="whitespace-pre-wrap bg-transparent p-0 m-0 font-sans">
                    <code>
                        {response.response}
                    </code>
                </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
