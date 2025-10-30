'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { automations } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ArrowRight, PlusCircle } from 'lucide-react';

export function AutomationsList() {
  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Workflow Automations</h1>
                <p className="text-muted-foreground mt-1">
                  Create and manage rules to automate repetitive tasks, such as sending
                  follow-up emails or archiving completed campaigns.
                </p>
            </div>
            <Button className="w-full sm:w-auto flex-shrink-0">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Automation
            </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {automations.map((automation) => (
            <Card key={automation.id} className="flex flex-col">
                <CardHeader>
                <CardTitle className="text-lg">Automation Rule</CardTitle>
                <CardDescription>This workflow automates a task to save you time.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Trigger</p>
                        <p className="font-semibold">{automation.trigger}</p>
                    </div>
                    <div className="flex justify-center">
                        <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">Action</p>
                        <p className="font-semibold">{automation.action}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t pt-4 mt-4">
                    <span className="text-sm font-medium">{automation.enabled ? "Enabled" : "Disabled"}</span>
                    <Switch checked={automation.enabled} />
                </CardFooter>
            </Card>
            ))}
        </div>
    </div>
  );
}
