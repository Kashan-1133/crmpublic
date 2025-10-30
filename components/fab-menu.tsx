"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Wrench, Calculator, HelpCircle, LayoutDashboard, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const fabItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/guidance', icon: HelpCircle, label: 'Guidance' },
  { href: '/calculator', icon: Calculator, label: 'Calculator' },
  { href: '/inbox', icon: MessageCircle, label: 'Chat' },
];

export function FabMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <TooltipProvider>
        <div className="fixed bottom-24 right-4 md:bottom-6 md:right-6 z-50">
            <div className="relative flex flex-col items-center gap-3">
                {fabItems.map((item, index) => (
                    <Tooltip key={item.href + index}>
                        <TooltipTrigger asChild>
                            <Link href={item.href}>
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    className={cn(
                                        "rounded-full h-12 w-12 shadow-lg transition-all duration-300 ease-in-out transform",
                                        isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-0 -translate-y-4 opacity-0 pointer-events-none"
                                    )}
                                    style={{ transitionDelay: isOpen ? `${(fabItems.length - 1 - index) * 50}ms` : `${index * 50}ms` }}
                                    aria-label={item.label}
                                >
                                    <item.icon className="h-6 w-6" />
                                </Button>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                            <p>{item.label}</p>
                        </TooltipContent>
                    </Tooltip>
                ))}

                <Tooltip>
                    <TooltipTrigger asChild>
                         <Button
                            onClick={() => setIsOpen(!isOpen)}
                            variant="default"
                            size="icon"
                            className="h-16 w-16 rounded-full shadow-lg"
                            aria-expanded={isOpen}
                        >
                            <div className="relative h-6 w-6">
                                <Wrench className={cn("absolute transition-all duration-300 transform", isOpen ? 'rotate-45 scale-0' : 'rotate-0 scale-100')} />
                                <X className={cn("absolute transition-all duration-300 transform", isOpen ? 'rotate-0 scale-100' : '-rotate-45 scale-0')} />
                            </div>
                            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                        <p>{isOpen ? "Close" : "Tools"}</p>
                    </TooltipContent>
                </Tooltip>
            </div>
        </div>
    </TooltipProvider>
  );
}
