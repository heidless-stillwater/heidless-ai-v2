'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChefHat, Lightbulb, Loader2, Sparkles, Utensils } from 'lucide-react';
import { getPersonalizedRecommendation, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  dietaryPreference: z.enum(['none', 'vegetarian', 'halal']),
  flavorProfile: z.enum(['none', 'spicy', 'mild', 'savory']),
  hungerLevel: z.enum(['snack', 'regular', 'large']),
});

export function PersonalizedRecommendationsForm() {
  const [response, setResponse] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dietaryPreference: 'none',
      flavorProfile: 'none',
      hungerLevel: 'regular',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getPersonalizedRecommendation(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting recommendation:', error);
      toast({
        title: 'Error',
        description: 'Failed to get recommendations. Please try again.',
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
          <CardTitle className="font-headline">Personalized Menu Recommendations</CardTitle>
          <CardDescription>Tell us what you're in the mood for, and our AI will suggest the perfect meal.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="dietaryPreference"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Dietary Preference</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="none" /></FormControl><FormLabel className="font-normal">None</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="vegetarian" /></FormControl><FormLabel className="font-normal">Vegetarian</FormLabel></FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="halal" /></FormControl><FormLabel className="font-normal">Halal</FormLabel></FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-6">
                   <FormField
                    control={form.control}
                    name="flavorProfile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Flavor Profile</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Any Flavor" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="none">Any</SelectItem>
                            <SelectItem value="spicy">Spicy</SelectItem>
                            <SelectItem value="mild">Mild</SelectItem>
                            <SelectItem value="savory">Savory</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="hungerLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hunger Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="How hungry are you?" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="snack">Just a snack</SelectItem>
                            <SelectItem value="regular">A regular meal</SelectItem>
                            <SelectItem value="large">I'm starving!</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Finding Recommendations...
                  </>
                ) : (
                  <>
                    <ChefHat className="mr-2 h-4 w-4" />
                    Get Recommendations
                  </>
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
                <p className="text-muted-foreground">Our AI is checking the menu for you...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="h-6 w-6 text-primary" />
              Here are your recommendations!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {response.recommendations.map((rec, index) => (
                 <div key={index} className="p-4 rounded-lg border bg-muted/50">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-primary font-headline"><Utensils className="h-5 w-5"/>{rec.itemName}</h3>
                    <p className="text-muted-foreground mt-1">{rec.description}</p>
                    <div className="mt-3 pt-3 border-t border-muted-foreground/20">
                        <p className="flex items-start gap-2 text-sm text-foreground/90">
                            <Lightbulb className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                            <span><span className="font-semibold">Why we suggest it:</span> {rec.reason}</span>
                        </p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
