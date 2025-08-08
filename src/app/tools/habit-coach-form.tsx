'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brain, Loader2, Wand2 } from 'lucide-react';
import { getHabitPlan, GetHabitPlanOutput } from '@/ai/flows/habit-coach-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  habit: z.string().min(3, 'Please describe the habit.'),
  action: z.enum(['form', 'break'], {
    required_error: "You need to select whether to form or break the habit.",
  }),
  context: z.string().optional(),
});

export function HabitCoachForm() {
  const [response, setResponse] = useState<GetHabitPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      habit: '',
      action: 'form',
      context: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getHabitPlan(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting habit plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a plan. Please try again.',
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
          <CardTitle className="font-headline">AI Habit Coach</CardTitle>
          <CardDescription>Get a personalized, science-backed plan to form a new good habit or break an old bad one.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="action"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>What do you want to do?</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="form" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Form a new habit
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="break" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Break an old habit
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="habit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Describe the Habit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Go to the gym 3 times a week' or 'Stop scrolling on my phone before bed'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="context"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Optional: Add More Context</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I have a busy schedule,' 'I've tried and failed before,' 'I lack motivation in the evenings.'"
                        className="min-h-[100px]"
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
                    Generating Your Plan...
                  </>
                ) : (
                  'Get My Habit Plan'
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
                <p className="text-muted-foreground">Our AI coach is crafting your personalized plan...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Wand2 className="h-6 w-6 text-primary" />
              Your Personalized Habit Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
             <div className="prose prose-invert max-w-none text-foreground/90 rounded-lg border bg-muted/30 p-4">
                <pre className="whitespace-pre-wrap bg-transparent p-0 m-0 font-sans">
                    <code>
                        {response.plan}
                    </code>
                </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
