import Link from 'next/link';
import { MapPin, Phone, Mail, Twitter, Linkedin, Github } from 'lucide-react';
import { Logo } from './logo';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function Footer() {
  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/support', label: 'Support' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-background/95 border-t border-border/40">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-bold text-primary">About Us</h3>
            <Logo />
            <p className="text-sm text-foreground/80">
              Heidless AI is a digital agency leveraging artificial intelligence to build stunning, high-performance websites faster and more affordably.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-bold text-primary">Contact Info</h3>
            <ul className="space-y-3 text-sm text-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span>703a Seven Sisters Road</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <span>0123 456 7890</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                <a href="mailto:test@test.com" className="hover:text-primary transition-colors">test@test.com</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-bold text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-foreground/80 hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Stay Updated */}
          <div className="space-y-4">
            <h3 className="text-lg font-headline font-bold text-primary">Stay Updated</h3>
            <p className="text-sm text-foreground/80">Subscribe to our newsletter to get the latest news and updates.</p>
            <form className="flex gap-2">
              <Input type="email" placeholder="Your Email" className="flex-grow" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        
        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} heidless ai. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
