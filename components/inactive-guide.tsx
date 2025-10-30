"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Bot, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const INACTIVITY_TIMEOUT = 10000; // 10 seconds

export function InactivityGuide() {
  const [isInactive, setIsInactive] = useState(false);
  const timer = React.useRef<NodeJS.Timeout | null>(null);

  const resetTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setIsInactive(false);
    timer.current = setTimeout(() => {
      setIsInactive(true);
    }, INACTIVITY_TIMEOUT);
  }, []);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll"];
    
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });
    
    resetTimer();

    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer]);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-50 transition-all duration-500 transform",
        isInactive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-4 p-4 rounded-lg shadow-2xl bg-card border border-border max-w-sm">
        <div className="bg-primary/10 text-primary p-3 rounded-full border border-primary/20">
          <Bot className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Need some help?</h4>
          <p className="text-sm text-muted-foreground mb-2">
            Check out our guide to learn how to use the system.
          </p>
          <Link href="/guidance" passHref>
            <Button size="sm" className="w-full sm:w-auto">
              Open Guide <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <button onClick={() => setIsInactive(false)} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground">
        </button>
      </div>
    </div>
  );
}
