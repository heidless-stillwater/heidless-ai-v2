'use client';

import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { trackProgress, type TrackProgressOutput } from '@/ai/flows/track-progress-flow';
import { TrackProgressInputSchema } from '@/ai/schemas/track-progress-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2, TrendingUp, Wand2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const formSchema = TrackProgressInputSchema;

export function ProgressTrackerForm() {
  const [response, setResponse] = useState<TrackProgressOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: '',
      entries: [{ date: format(new Date(), 'yyyy-MM-dd'), value: 0, notes: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "entries"
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await trackProgress(values);
      setResponse(result);
    } catch (error) {
      console.error('Error tracking progress:', error);
      toast({
        title: 'Error',
        description: 'Failed to analyze progress. Please try again.',
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
          <CardTitle className="font-headline">Track Your Progress</CardTitle>
          <CardDescription>Define your goal and log your progress to get AI-powered insights and visualization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Goal</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Lose 10kg, Run a 5k, Read 12 books this year" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Progress Entries</FormLabel>
                <div className="space-y-4 mt-2">
                  {fields.map((item, index) => (
                    <div key={item.id} className="flex flex-col md:flex-row gap-2 items-start p-3 border rounded-lg">
                       <FormField
                        control={form.control}
                        name={`entries.${index}.date`}
                        render={({ field }) => (
                          <FormItem className="flex-grow w-full md:w-auto">
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`entries.${index}.value`}
                        render={({ field }) => (
                           <FormItem className="flex-grow w-full md:w-auto">
                           <FormControl>
                            <Input
                                type="number"
                                placeholder="Value (e.g., 80, 25, 1)"
                                {...field}
                                onChange={event => field.onChange(+event.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`entries.${index}.notes`}
                        render={({ field }) => (
                           <FormItem className="flex-grow w-full md:w-auto">
                            <FormControl>
                                <Input placeholder="Optional notes..." {...field} />
                            </FormControl>
                            <FormMessage />
                           </FormItem>
                        )}
                      />
                      <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)} disabled={fields.length <= 1}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
                 <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => append({ date: format(new Date(), 'yyyy-MM-dd'), value: 0, notes: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Entry
                </Button>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing Progress...
                  </>
                ) : (
                  'Analyze & Visualize'
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
                <p className="text-muted-foreground">Our AI coach is analyzing your progress. Please wait...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Your Progress Report
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={response.chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tickFormatter={(str) => format(new Date(str), 'MMM d')} />
                            <YAxis />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    border: '1px solid hsl(var(--border))',
                                }}
                            />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name={form.getValues('goal')}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <Separator />
                
                <div className="space-y-4">
                    <div>
                        <h3 className="flex items-center gap-2 font-headline text-xl text-primary mb-2">
                           <Wand2 className="h-5 w-5" /> AI Analysis
                        </h3>
                        <div className="prose prose-invert max-w-none text-foreground/90 rounded-lg border bg-muted/30 p-4">
                             <pre className="whitespace-pre-wrap bg-transparent p-0 m-0 font-sans">
                                <code>
                                    {response.analysis}
                                </code>
                            </pre>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl text-primary mb-2">Suggested Next Step</h3>
                        <p className="text-foreground/90">{response.nextStep}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
