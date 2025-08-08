'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Apple, ClipboardCheck, Loader2, Salad, ShieldAlert } from 'lucide-react';
import { getNutritionPlan, GetNutritionPlanOutput } from '@/ai/flows/nutrition-assistant-flow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

const dietaryOptions = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
];

const formSchema = z.object({
  goal: z.enum(['lose-weight', 'gain-muscle', 'maintain-weight'], {
    required_error: 'You need to select a goal.',
  }),
  dailyCalories: z.coerce.number().int().min(1000, 'Calories must be at least 1000.').max(5000, 'Calories must be less than 5000.'),
  dietaryPreferences: z.array(z.string()).optional(),
  dislikedFoods: z.string().optional(),
});

export function NutritionAssistantForm() {
  const [response, setResponse] = useState<GetNutritionPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      goal: 'maintain-weight',
      dailyCalories: 2000,
      dietaryPreferences: [],
      dislikedFoods: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getNutritionPlan(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting nutrition plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a meal plan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const MealCard = ({ title, meal }: { title: string; meal: GetNutritionPlanOutput['mealPlan']['breakfast'] }) => (
    <div className="p-4 rounded-lg bg-muted/50 border">
      <h4 className="text-lg font-headline text-primary">{title}</h4>
      <p className="font-semibold">{meal.mealName}</p>
      <p className="text-sm text-muted-foreground">{meal.description}</p>
      <p className="text-sm font-medium mt-2">{meal.calories} calories</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI Nutrition Assistant</CardTitle>
          <CardDescription>Get a sample one-day meal plan tailored to your fitness goals and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="goal"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>What is your primary goal?</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col md:flex-row gap-4">
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="lose-weight" /></FormControl><FormLabel className="font-normal">Lose Weight</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="gain-muscle" /></FormControl><FormLabel className="font-normal">Gain Muscle</FormLabel></FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="maintain-weight" /></FormControl><FormLabel className="font-normal">Maintain Weight</FormLabel></FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dailyCalories"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Target Daily Calories</FormLabel>
                    <FormControl><Input type="number" placeholder="e.g., 2000" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dietaryPreferences"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Dietary Preferences or Restrictions</FormLabel>
                    </div>
                    <div className="flex flex-wrap gap-4">
                    {dietaryOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="dietaryPreferences"
                        render={({ field }) => {
                          return (
                            <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(field.value?.filter((value) => value !== item.id));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dislikedFoods"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foods to Avoid (comma-separated)</FormLabel>
                    <FormControl><Input placeholder="e.g., olives, mushrooms, tofu" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Plan...</>
                ) : (
                  <><Salad className="mr-2 h-4 w-4" />Get My Meal Plan</>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Our AI chef is creating your personalized meal plan...</p>
          </div>
        </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <ClipboardCheck className="h-6 w-6 text-primary" />
              Your Sample Meal Plan
            </CardTitle>
            <CardDescription>
              Total approximate calories for the day: <span className="font-bold text-primary">{response.totalCalories}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <MealCard title="Breakfast" meal={response.mealPlan.breakfast} />
              <MealCard title="Lunch" meal={response.mealPlan.lunch} />
              <MealCard title="Dinner" meal={response.mealPlan.dinner} />
              <MealCard title="Snacks" meal={response.mealPlan.snacks} />
            </div>
            <Separator />
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <h4 className="flex items-center gap-2 text-lg font-semibold text-destructive">
                <ShieldAlert className="h-5 w-5" />
                Important Disclaimer
              </h4>
              <p className="text-destructive/90 mt-2">{response.disclaimer}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
