'use client';
import {
  ArrowLeftRight,
  ChevronDown,
  Home,
  Lightbulb,
  MessageSquare,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '#', label: 'Messages', icon: MessageSquare },
  { href: '#', label: 'Tasks', icon: ShieldCheck },
  { href: '#', label: 'Members', icon: Users },
  { href: '#', label: 'Settings', icon: Settings },
];

const projectLinks = [
  { href: '#', label: 'Mobile App', active: true },
  { href: '#', label: 'Website Redesign' },
  { href: '#', label: 'Design System' },
  { href: '#', label: 'Wireframes' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col gap-8 border-r bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary"></div>
          <h1 className="text-lg font-bold">Project M.</h1>
        </div>
        <Button variant="ghost" size="icon">
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>

      <nav className="flex flex-col gap-2">
        {mainNavLinks.map((link) => (
          <Link
            href={link.href}
            key={link.label}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              pathname === link.href && 'bg-muted text-primary'
            )}
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex-1">
        <h2 className="mb-2 px-3 text-xs font-semibold uppercase text-muted-foreground">
          My Projects
        </h2>
        <nav className="flex flex-col gap-1">
          {projectLinks.map((link) => (
            <Link
              href={link.href}
              key={link.label}
              className={cn(
                'flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-muted',
                link.active && 'bg-muted text-primary-foreground'
              )}
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    link.active ? 'bg-primary' : 'bg-gray-400'
                  )}
                ></span>
                <span>{link.label}</span>
              </div>
              {link.active && <ChevronDown className="h-4 w-4" />}
            </Link>
          ))}
        </nav>
      </div>
      <Card className="rounded-2xl bg-muted">
        <CardContent className="flex flex-col items-center p-4 text-center">
            <div className="relative mb-2">
                <div className="h-12 w-12 rounded-full bg-accent/30"></div>
                <Lightbulb className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-accent" />
            </div>
          <h3 className="mb-1 font-semibold">Thoughts Time</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            We don't have any notice for you, till then you can share your
            thoughts with your peers.
          </p>
          <Button variant="secondary" className='w-full bg-background'>Write a message</Button>
        </CardContent>
      </Card>
    </aside>
  );
}
