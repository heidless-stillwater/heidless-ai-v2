'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { getExpertise, GetExpertiseOutput } from '@/ai/flows/get-expertise-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  problemStatement: z.string().min(20, {
    message: 'Problem description must be at least 20 characters long.',
  }),
});

export function ExpertiseForm() {
  const [response, setResponse] = useState<GetExpertiseOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      problemStatement: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getExpertise(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting expertise:', error);
      toast({
        title: 'Error',
        description: 'Failed to get expertise. Please try again.',
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
          <CardTitle className="font-headline">AI Expertise</CardTitle>
          <CardDescription>Describe your project, problem, or question to get strategic advice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="problemStatement"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Problem or Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'What are the key considerations for building a scalable e-commerce site for a small fashion brand?'"
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
                    Consulting AI...
                  </>
                ) : (
                  'Get Advice'
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
                <p className="text-muted-foreground">Our AI expert is analyzing your request. Please wait...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BrainCircuit className="h-6 w-6 text-primary" />
              Expert Recommendation
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
