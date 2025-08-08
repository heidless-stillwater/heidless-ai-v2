
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from './ui/card';
import { Globe, Loader2, Mail, MapPin, Phone } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Here you would typically send the form data to a server
    console.log(values);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network request
    setIsLoading(false);
    toast({
      title: 'Message Sent!',
      description: "We'll get back to you shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-background/95">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl text-primary">Get in Touch</h2>
          <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a question or a project in mind? We'd love to hear from you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
            {/* Column 1: Our Information & Map */}
            <div className="flex flex-col h-full space-y-8">
                <div>
                    <h3 className="text-2xl font-headline font-bold mb-4">Our Information</h3>
                     <ul className="space-y-4 text-lg text-foreground/80">
                        <li className="flex items-start gap-3">
                            <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <span>703a Seven Sisters Road</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <span>0123 456 7890</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <a href="mailto:test@test.com" className="hover:text-primary transition-colors">test@test.com</a>
                        </li>
                        <li className="flex items-start gap-3">
                            <Globe className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                            <a href="http://test.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">http://test.com</a>
                        </li>
                    </ul>
                </div>

                <div className="flex-grow rounded-lg overflow-hidden shadow-lg">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2479.992015828452!2d-0.08636952327421855!3d51.56950270554284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761c1d88495f59%3A0x973a9634e55e090a!2s703a%20Seven%20Sisters%20Rd%2C%20London%20N15%205LA%2C%20UK!5e0!3m2!1sen!2sus!4v1720547844594!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0, minHeight: '300px' }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Google Map of 703a Seven Sisters Road"
                    ></iframe>
                </div>
            </div>

            {/* Column 2: Contact Form */}
            <Card className="flex flex-col h-full shadow-lg">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                    <h3 className="text-2xl font-headline font-bold mb-6">Contact Form</h3>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col flex-grow">
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="sr-only">Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className="sr-only">Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Your Email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="flex-grow flex flex-col">
                            <FormLabel className="sr-only">Message</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Your Message..." {...field} className="flex-grow resize-none" />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <Button type="submit" disabled={isLoading} className="w-full mt-auto">
                        {isLoading ? (
                            <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                            </>
                        ) : (
                            'Send Message'
                        )}
                        </Button>
                    </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
