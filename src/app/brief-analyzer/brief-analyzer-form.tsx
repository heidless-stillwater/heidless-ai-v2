'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bot, Loader2 } from 'lucide-react';
import { summarizeBrief, SummarizeBriefOutput } from '@/ai/flows/summarize-brief';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  brief: z.string().min(50, {
    message: 'Brief must be at least 50 characters long.',
  }),
});

export function BriefAnalyzerForm() {
  const [summary, setSummary] = useState<SummarizeBriefOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      brief: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeBrief(values);
      setSummary(result);
    } catch (error) {
      console.error('Error summarizing brief:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze the brief. Please try again.',
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
          <CardTitle className="font-headline">Your Project Brief</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="brief"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Project Brief</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste your full project brief here..."
                        className="min-h-[200px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Brief'
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
                <p className="text-muted-foreground">Our AI is analyzing your brief. Please wait a moment...</p>
            </div>
         </div>
      )}

      {summary && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Bot className="h-6 w-6 text-primary" />
              AI Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-invert max-w-none text-foreground/90">
                <p>{summary.summary}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
