'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BrainCircuit, Loader2 } from 'lucide-react';
import { developEmotionalIntelligence, DevelopEmotionalIntelligenceOutput } from '@/ai/flows/emotional-intelligence-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  scenario: z.string().min(20, {
    message: 'Scenario description must be at least 20 characters long.',
  }),
});

export function EmotionalIntelligenceForm() {
  const [response, setResponse] = useState<DevelopEmotionalIntelligenceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenario: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await developEmotionalIntelligence(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting guidance:', error);
      toast({
        title: 'Error',
        description: 'Failed to get guidance. Please try again.',
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
          <CardTitle className="font-headline">Emotional Intelligence Coach</CardTitle>
          <CardDescription>Describe a situation where you'd like to improve your emotional response or resilience.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="scenario"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Scenario or Challenge</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I get very anxious before giving presentations at work and it affects my performance.'"
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
                    Getting Advice...
                  </>
                ) : (
                  'Get Coaching'
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
                <p className="text-muted-foreground">Our AI coach is preparing your guidance. Please wait...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <BrainCircuit className="h-6 w-6 text-primary" />
              Your Coaching Plan
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
