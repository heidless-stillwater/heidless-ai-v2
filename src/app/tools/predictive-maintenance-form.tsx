'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Wrench, Loader2, ShieldAlert, Thermometer, AlertTriangle, CheckCircle } from 'lucide-react';
import { getMaintenancePrediction, PredictiveMaintenanceOutput } from '@/ai/flows/predictive-maintenance-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  equipmentType: z.enum(['autoclave', 'xray-unit', 'compressor', 'dental-chair']),
  ageInMonths: z.coerce.number().int().positive('Age must be a positive number.'),
  weeklyUsageHours: z.coerce.number().positive('Usage must be a positive number.'),
  errorLog: z.string().optional(),
});

export function PredictiveMaintenanceForm() {
  const [response, setResponse] = useState<PredictiveMaintenanceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      equipmentType: 'autoclave',
      ageInMonths: 24,
      weeklyUsageHours: 15,
      errorLog: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await getMaintenancePrediction(values);
      setResponse(result);
    } catch (error) {
      console.error('Error getting prediction:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate a prediction. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const RiskIndicator = ({ risk }: { risk: 'Low' | 'Moderate' | 'High' }) => {
    const riskConfig = {
      Low: { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-500/10' },
      Moderate: { icon: AlertTriangle, color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' },
      High: { icon: ShieldAlert, color: 'text-red-500', bgColor: 'bg-red-500/10' },
    };
    const { icon: Icon, color, bgColor } = riskConfig[risk];
    return (
      <div className={cn('p-4 rounded-lg text-center', bgColor)}>
        <Icon className={cn('h-12 w-12 mx-auto', color)} />
        <h3 className={cn('text-2xl font-bold mt-2', color)}>{risk} Risk</h3>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Predictive Maintenance Assistant</CardTitle>
          <CardDescription>Enter your equipment's data to get an AI-powered maintenance forecast.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="equipmentType"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Equipment Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger><SelectValue placeholder="Select equipment type..." /></SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="autoclave">Autoclave</SelectItem>
                                <SelectItem value="xray-unit">X-Ray Unit</SelectItem>
                                <SelectItem value="compressor">Compressor</SelectItem>
                                <SelectItem value="dental-chair">Dental Chair</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="ageInMonths"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Age (in months)</FormLabel>
                            <FormControl><Input type="number" placeholder="e.g., 24" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="weeklyUsageHours"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Weekly Usage (hours)</FormLabel>
                            <FormControl><Input type="number" placeholder="e.g., 15" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="errorLog"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Recent Errors or Unusual Behavior (Optional)</FormLabel>
                        <FormControl>
                        <Textarea
                            placeholder="e.g., 'Error code E-5 on last cycle', 'Making a rattling noise on startup'"
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
                    Analyzing Data...
                  </>
                ) : (
                  <>
                    <Wrench className="mr-2 h-4 w-4" />
                    Get Maintenance Prediction
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
                <p className="text-muted-foreground">Our AI technician is analyzing the equipment data...</p>
            </div>
         </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Wrench className="h-6 w-6 text-primary" />
              Maintenance Forecast
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                    <RiskIndicator risk={response.riskAssessment} />
                </div>
                <div className="md:col-span-2 p-4 rounded-lg bg-muted/30">
                     <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><Thermometer className="h-5 w-5 text-primary"/>Predicted Failure</h4>
                     <p className="text-muted-foreground pl-7">{response.predictedFailure}</p>
                </div>
            </div>
             <div>
                <h4 className="flex items-center gap-2 text-lg font-semibold text-foreground/90"><CheckCircle className="h-5 w-5 text-primary"/>Recommended Actions</h4>
                <div className="pl-7 space-y-3 mt-2">
                    {response.recommendedActions.map((rec, index) => (
                        <div key={index} className="border-l-2 border-primary/50 pl-4">
                            <p className="font-medium text-foreground">{rec.action}</p>
                            <p className="text-sm text-muted-foreground">{rec.reason}</p>
                        </div>
                    ))}
                </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
