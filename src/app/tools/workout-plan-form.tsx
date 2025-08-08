'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dumbbell, Loader2, ShieldAlert, FileText } from 'lucide-react';
import { getWorkoutPlan, GetWorkoutPlanOutput } from '@/ai/flows/workout-plan-flow';
import { GetWorkoutPlanInputSchema } from '@/ai/schemas/workout-plan-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const formSchema = GetWorkoutPlanInputSchema;

export function WorkoutPlanForm() {
  const [response, setResponse] = useState<GetWorkoutPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fitnessGoal: 'build-muscle',
      fitnessLevel: 'intermediate',
      daysPerWeek: 4,
      availableEquipment: 'Full gym access',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getWorkoutPlan(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting workout plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a workout plan. Please try again.',
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
          <CardTitle className="font-headline">Personalized Workout Plan Generator</CardTitle>
          <CardDescription>Tell our AI coach about your goals and get a custom weekly workout plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fitnessGoal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Fitness Goal</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select your goal..." /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="build-muscle">Build Muscle</SelectItem>
                          <SelectItem value="lose-weight">Lose Weight</SelectItem>
                          <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="fitnessLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Fitness Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select your level..." /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="daysPerWeek"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Days Per Week: <span className="text-primary font-bold">{field.value}</span></FormLabel>
                    <FormControl>
                        <Slider
                            min={1}
                            max={7}
                            step={1}
                            defaultValue={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                        />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                  control={form.control}
                  name="availableEquipment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available Equipment</FormLabel>
                      <FormControl><Input placeholder="e.g., Bodyweight only, Full gym access" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Generating Plan...</>
                ) : (
                  <><Dumbbell className="mr-2 h-4 w-4" />Get My Workout Plan</>
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
            <p className="text-muted-foreground">Your AI coach is building your personalized workout plan...</p>
          </div>
        </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileText className="h-6 w-6 text-primary" />
              {response.planName}
            </CardTitle>
            <CardDescription>Your personalized one-week workout schedule. Follow this plan and listen to your body.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {response.weeklySchedule.map((day, index) => (
                <div key={index} className="p-4 rounded-lg border bg-muted/30">
                  <h4 className="text-lg font-bold font-headline text-primary">{day.day}</h4>
                  {day.exercises && day.exercises.length > 0 ? (
                    <div className="overflow-x-auto mt-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Exercise</TableHead>
                                    <TableHead>Sets</TableHead>
                                    <TableHead>Reps</TableHead>
                                    <TableHead>Rest</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {day.exercises.map((ex, exIndex) => (
                                    <TableRow key={exIndex}>
                                        <TableCell className="font-medium">{ex.name}</TableCell>
                                        <TableCell>{ex.sets}</TableCell>
                                        <TableCell>{ex.reps}</TableCell>
                                        <TableCell>{ex.rest}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                  ) : (
                    <p className="text-muted-foreground mt-2">Rest and recover.</p>
                  )}
                </div>
              ))}
            </div>

            <Separator />

            <div className="prose prose-invert max-w-none text-foreground/90 rounded-lg border bg-muted/30 p-4">
                 <pre className="whitespace-pre-wrap bg-transparent p-0 m-0 font-sans">
                    <code>
                        {response.notes}
                    </code>
                </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
