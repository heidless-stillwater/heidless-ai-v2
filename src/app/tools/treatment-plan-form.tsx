'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClipboardPlus, FileText, IndianRupee, Loader2, ShieldAlert } from 'lucide-react';
import { getTreatmentPlan, GetTreatmentPlanOutput } from '@/ai/flows/treatment-plan-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  symptoms: z.string().min(10, 'Please describe your symptoms in more detail.'),
  history: z.string().optional(),
});

export function TreatmentPlanForm() {
  const [response, setResponse] = useState<GetTreatmentPlanOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: '',
      history: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getTreatmentPlan(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting treatment plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a treatment plan. Please try again.',
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
          <CardTitle className="font-headline">Preliminary Treatment Plan Generator</CardTitle>
          <CardDescription>Describe your symptoms to receive an AI-generated, informational treatment plan. This is not a substitute for professional medical advice.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="symptoms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Symptoms & Main Concern</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I have a sharp, shooting pain in my upper right molar when I drink cold water. It started 3 days ago.'"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relevant Dental History (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I have a few fillings from years ago. I brush twice a day and floss occasionally.'"
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
                    Generating Plan...
                  </>
                ) : (
                  'Generate Preliminary Plan'
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
                <p className="text-muted-foreground">Our AI assistant is reviewing your information...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <FileText className="h-6 w-6 text-primary" />
              Your Preliminary Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><ClipboardPlus className="h-5 w-5 text-primary"/>Potential Diagnosis</h4>
                    <p className="text-muted-foreground pl-7">{response.potentialDiagnosis}</p>
                </div>
                
                <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><FileText className="h-5 w-5 text-primary"/>Recommended Procedures</h4>
                     <div className="pl-7 space-y-2 mt-2">
                        {response.recommendedProcedures.map((proc, index) => (
                            <div key={index}>
                                <p className="font-medium text-foreground">{proc.name}</p>
                                <p className="text-sm text-muted-foreground">{proc.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                 <div>
                    <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><IndianRupee className="h-5 w-5 text-primary"/>Estimated Cost</h4>
                    <p className="text-muted-foreground pl-7">{response.estimatedCost}</p>
                </div>
            </div>

            <Separator />

            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                 <h4 className="flex items-center gap-2 text-lg font-semibold text-destructive"><ShieldAlert className="h-5 w-5"/>Important Disclaimer</h4>
                 <p className="text-destructive/90 mt-2">{response.disclaimer}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
