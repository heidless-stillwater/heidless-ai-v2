'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Brain, Loader2, Wand2, Percent, Users, Lightbulb } from 'lucide-react';
import { getDynamicPromotion, DynamicPricingOutput } from '@/ai/flows/dynamic-pricing-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  timeOfDay: z.enum(['breakfast', 'lunch-rush', 'afternoon-lull', 'dinner-peak', 'late-night']),
  stockLevels: z.string().min(10, 'Please describe your stock levels.'),
  weather: z.enum(['sunny', 'rainy', 'cold', 'hot']),
  localEvents: z.string().optional(),
});

export function DynamicPricingForm() {
  const [response, setResponse] = useState<DynamicPricingOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeOfDay: 'afternoon-lull',
      stockLevels: 'High stock of chicken wings, low on milkshakes.',
      weather: 'rainy',
      localEvents: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getDynamicPromotion(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting promotion:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a promotion. Please try again.',
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
          <CardTitle className="font-headline">Dynamic Promotion Generator</CardTitle>
          <CardDescription>Input the current business factors to get a tailored promotion suggestion from our AI.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="timeOfDay"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time of Day</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select time of day..." /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="breakfast">Breakfast</SelectItem>
                                    <SelectItem value="lunch-rush">Lunch Rush</SelectItem>
                                    <SelectItem value="afternoon-lull">Afternoon Lull</SelectItem>
                                    <SelectItem value="dinner-peak">Dinner Peak</SelectItem>
                                    <SelectItem value="late-night">Late Night</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="weather"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Weather</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger><SelectValue placeholder="Select weather..." /></SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="sunny">Sunny</SelectItem>
                                    <SelectItem value="rainy">Rainy</SelectItem>
                                    <SelectItem value="cold">Cold</SelectItem>
                                    <SelectItem value="hot">Hot</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                 <FormField
                    control={form.control}
                    name="stockLevels"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Stock Levels</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="e.g., 'High stock of chicken wings, low on milkshakes.'"
                            className="min-h-[100px]"
                            {...field}
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="localEvents"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Local Events (Optional)</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="e.g., 'Big football match on tonight', 'Local festival this weekend'"
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
                    Generating Promotion...
                  </>
                ) : (
                  'Generate Promotion'
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
                <p className="text-muted-foreground">Our AI is cooking up the perfect deal...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Wand2 className="h-6 w-6 text-primary" />
              AI-Generated Promotion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 rounded-lg bg-primary/10 text-center">
                <h3 className="text-2xl font-bold text-primary font-headline">{response.promotionName}</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><Percent className="h-5 w-5 text-primary"/>The Offer</h4>
                    <p className="text-muted-foreground pl-7">{response.promotionDetails}</p>
                </div>
                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><Users className="h-5 w-5 text-primary"/>Target Audience</h4>
                    <p className="text-muted-foreground pl-7">{response.targetAudience}</p>
                </div>
                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><Lightbulb className="h-5 w-5 text-primary"/>Reasoning</h4>
                    <p className="text-muted-foreground pl-7">{response.reasoning}</p>
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
