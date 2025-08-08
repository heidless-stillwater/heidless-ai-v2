'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Scale, Loader2, CheckCircle, XCircle, FileWarning } from 'lucide-react';
import { reconcileTransactions, ReconciliationOutput } from '@/ai/flows/reconciliation-flow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const formSchema = z.object({
  source1Name: z.string().min(2, 'Source name is required.'),
  source1Data: z.string().min(10, 'Transaction data is required.'),
  source2Name: z.string().min(2, 'Source name is required.'),
  source2Data: z.string().min(10, 'Transaction data is required.'),
});

export function ReconciliationForm() {
  const [response, setResponse] = useState<ReconciliationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source1Name: 'Bank Statement',
      source1Data: 'Date,Description,Amount\n2023-10-01,Coffee Shop,-5.50\n2023-10-02,Salary Deposit,2500.00\n2023-10-03,Supermarket,-75.20\n2023-10-05,Gym Membership,-40.00',
      source2Name: 'Company Records',
      source2Data: 'Date,Details,Value\n2023-10-01,Morning Coffee,-5.50\n2023-10-03,Groceries,-75.20\n2023-10-04,Client Lunch,-30.00\n2023-10-05,Gym,-40.00',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResponse(null);
    try {
      const result = await reconcileTransactions(values);
      setResponse(result);
    } catch (error) {
      console.error('Error reconciling transactions:', error);
      toast({
        title: 'Error',
        description: 'Failed to reconcile data. Please check the format and try again.',
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
          <CardTitle className="font-headline">Automated Reconciliation</CardTitle>
          <CardDescription>Paste transaction data from two sources (e.g., in CSV format) to find matches and discrepancies.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <FormField
                    control={form.control}
                    name="source1Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source 1 Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Bank Statement" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="source1Data"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source 1 Data</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Paste your first set of data here..." className="min-h-[200px] font-mono text-xs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                   <FormField
                    control={form.control}
                    name="source2Name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source 2 Name</FormLabel>
                        <FormControl><Input placeholder="e.g., Company Records" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="source2Data"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Source 2 Data</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Paste your second set of data here..." className="min-h-[200px] font-mono text-xs" {...field} />
                        </FormControl>
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
                    Reconciling...
                  </>
                ) : (
                  <>
                    <Scale className="mr-2 h-4 w-4" />
                    Reconcile Transactions
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
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Our AI accountant is comparing your records. This may take a moment...</p>
          </div>
        </div>
      )}

      {response && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Scale className="h-6 w-6 text-primary" />
              Reconciliation Report
            </CardTitle>
            <CardDescription>{response.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-2">
                <CheckCircle className="h-5 w-5" />
                Matched Transactions
              </h3>
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>{form.getValues('source1Name')}</TableHead>
                      <TableHead>{form.getValues('source2Name')}</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {response.matched.map((match) => (
                      <TableRow key={match.source1.id}>
                        <TableCell>{match.source1.date}</TableCell>
                        <TableCell>{match.source1.description}</TableCell>
                        <TableCell>{match.source2.description}</TableCell>
                        <TableCell className="text-right font-medium">{match.source1.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-destructive mb-2">
                  <XCircle className="h-5 w-5" />
                  Unmatched in {form.getValues('source2Name')}
                </h3>
                <div className="overflow-x-auto rounded-lg border">
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {response.unmatchedSource1.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right font-medium">{item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

               <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-destructive mb-2">
                  <XCircle className="h-5 w-5" />
                  Unmatched in {form.getValues('source1Name')}
                </h3>
                <div className="overflow-x-auto rounded-lg border">
                   <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {response.unmatchedSource2.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell className="text-right font-medium">{item.amount.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
