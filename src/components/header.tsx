
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from '@/hooks/use-media-query';
import { ThemeToggle } from './theme-toggle';


const navLinks = [
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/support', label: 'Support' },
  { href: '/contact', label: 'Contact' },
];

const clientFocusedLinks = [
    { href: '/admin/client-communication-bots', label: 'Client Communication Bots' },
    { href: '/admin/automated-code-generation', label: 'Automated Code Generation' },
    { href: '/admin/code-review-assistance', label: 'Code Review Assistance' },
    { href: '/admin/automated-testing', label: 'Automated Testing' },
    { href: '/admin/project-scoping-estimation', label: 'Project Scoping & Estimation' },
    { href: '/admin/technical-documentation-generation', label: 'Technical Documentation Generation' },
    { href: '/admin/seo-optimization-analysis', label: 'SEO Optimization Analysis' },
    { href: '/admin/performance-optimization-suggestions', label: 'Performance Optimization Suggestions' },
    { href: '/admin/security-vulnerability-scanning', label: 'Security Vulnerability Scanning' },
    { href: '/admin/powered-brief', label: 'Powered Brief' },
];

const businessFocusedLinks = [
    { href: '/admin/expertise', label: 'Expertise' },
    { href: '/admin/content-generator', label: 'Content Generator' },
    { href: '/admin/color-palette-generator', label: 'Color Palette Generator' },
    { href: '/admin/seo-optimizer', label: 'SEO Optimizer' },
    { href: '/admin/layout-suggestions', label: 'Layout Suggestions' },
    { href: '/admin/competitor-analysis', label: 'Competitor Analysis' },
    { href: '/admin/performance-optimizer', label: 'Performance Optimizer' },
    { href: '/admin/image-optimizer', label: 'Image Optimizer' },
    { href: '/admin/accessibility-checker', label: 'Accessibility Checker' },
    { href: '/admin/code-generator', label: 'Code Generator' },
];


export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery('(min-width: 950px)');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpen(false);
    }
  }, [isDesktop]);

  const NavLink = ({ href, label, className }: { href: string; label: string, className?: string }) => (
    <Link
      href={href}
      className={cn(
        "text-[15px] font-medium transition-colors hover:text-primary",
        pathname.startsWith(href) && href !== '/' || pathname === href ? 'text-primary' : 'text-foreground/80',
        className
      )}
      onClick={() => setIsMenuOpen(false)}
    >
      {label}
    </Link>
  );

  const AdminDropdownContent = () => (
    <DropdownMenuContent>
      <DropdownMenuItem asChild>
        <Link href="/admin/web-consultancy-ai-functions">Web Consultancy AI Functions</Link>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
          <DropdownMenuSubTrigger>
              <span>Client-Focused</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
              <DropdownMenuSubContent>
                  {clientFocusedLinks.map((link) => (
                      <DropdownMenuItem asChild key={link.href}>
                          <Link href={link.href!}>{link.label}</Link>
                      </DropdownMenuItem>
                  ))}
              </DropdownMenuSubContent>
          </DropdownMenuPortal>
      </DropdownMenuSub>
       <DropdownMenuSub>
          <DropdownMenuSubTrigger>
              <span>Business-Focused</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
              <DropdownMenuSubContent>
                  {businessFocusedLinks.map((link) => (
                      <DropdownMenuItem asChild key={link.href}>
                          <Link href={link.href!}>{link.label}</Link>
                      </DropdownMenuItem>
                  ))}
              </DropdownMenuSubContent>
          </DropdownMenuPortal>
      </DropdownMenuSub>
    </DropdownMenuContent>
  );
  
  const desktopNav = (
    <nav className="hidden items-center gap-6 nav-md:flex">
      {navLinks.map((link) => (
        <NavLink key={link.href} {...link} />
      ))}
      <NavLink href="/tools" label="Tools" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-1 text-[15px] font-medium text-foreground/80 hover:text-primary focus-visible:ring-0">
            Admin
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <AdminDropdownContent />
      </DropdownMenu>
    </nav>
  );

  const mobileNav = (
    <div className="nav-md:hidden">
      <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        <span className="sr-only">Toggle menu</span>
      </Button>
    </div>
  );

  const mobileMenu = (
    <div className="nav-md:hidden">
      <div className="container mx-auto flex flex-col items-center space-y-4 px-4 pb-4 md:px-6">
        {navLinks.map((link) => (
          <NavLink key={link.href} {...link} className="text-lg" />
        ))}
        <NavLink href="/tools" label="Tools" className="text-lg" />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-1 text-lg font-medium text-foreground/80 hover:text-primary focus-visible:ring-0">
                Admin
                <ChevronDown className="h-4 w-4" />
            </Button>
            </DropdownMenuTrigger>
            <AdminDropdownContent />
        </DropdownMenu>
         <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 text-base">
            <Link href="/pricing">Start Here</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        {isClient && isDesktop && desktopNav}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          {isClient && isDesktop && (
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/pricing">Start Here</Link>
            </Button>
          )}
          {isClient && !isDesktop && mobileNav}
        </div>
      </div>
      {isClient && !isDesktop && isMenuOpen && mobileMenu}
    </header>
  );
}
