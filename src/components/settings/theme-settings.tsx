"use client";

import { Check, Palette } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCustomTheme } from "../custom-theme-provider";

const themes = [
  {
    name: "theme-1",
    label: "Default",
    colors: ["#1A2A4F", "#FFDBB6", "#FFF2EF"],
  },
  {
    name: "theme-2",
    label: "Ruby",
    colors: ["#660B05", "#8C1007", "#FFF0C4"],
  },
  {
    name: "theme-3",
    label: "Mint",
    colors: ["#ECFAE5", "#CAE8BD", "#B0DB9C"],
  },
  {
    name: "theme-4",
    label: "Ocean",
    colors: ["#1B3C53", "#456882", "#D2C1B6"],
  },
  {
    name: "theme-5",
    label: "Graphite",
    colors: ["#37353E", "#715A5A", "#D3DAD9"],
  },
  {
    name: "theme-6",
    label: "Onyx",
    colors: ["#171717", "#EF4444", "#FEE2E2"],
  },
];

export function ThemeSettings() {
  const { palette, setPalette } = useCustomTheme();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Theme</CardTitle>
        <CardDescription>
          Select a color palette for the website.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {themes.map((theme) => (
            <div key={theme.name} className="space-y-2">
              <Button
                variant="outline"
                className={cn(
                  "w-full h-24 flex-col justify-center",
                  palette === theme.name && "border-2 border-primary"
                )}
                onClick={() => setPalette(theme.name)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: theme.colors[0] }}
                  />
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: theme.colors[1] }}
                  />
                  <div
                    className="h-6 w-6 rounded-full"
                    style={{ backgroundColor: theme.colors[2] }}
                  />
                </div>
              </Button>
              <div className="flex items-center justify-center">
                <span className="text-sm font-medium">{theme.label}</span>
                {palette === theme.name && (
                  <Check className="w-4 h-4 ml-2 text-primary" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
