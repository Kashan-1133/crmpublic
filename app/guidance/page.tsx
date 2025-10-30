import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, LayoutDashboard, Inbox, CreditCard, Users, Settings, Search, Upload, ShoppingCart } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Your central hub for a complete overview of your activities. Track campaigns, monitor earnings, view recent posts, and manage your campaign pipeline all in one place.",
    details: [
        { 
            title: "Recent Posts & Campaigns", 
            description: "View the latest content from creators and brands you follow." 
        },
        { 
            title: "Analytics", 
            description: "Monitor key performance indicators like total earnings, campaign counts, and engagement rates." 
        },
        { 
            title: "Campaign Pipeline", 
            description: "Visualize and manage the status of all your ongoing campaigns, from outreach to completion." 
        },
    ]
  },
  {
    icon: Users,
    title: "Brand Hunting",
    description: "Discover and connect with brands or creators that align with your niche and values. Use search and filters to find the perfect match for your next collaboration.",
    details: [
        {
            title: "Search & Filter",
            description: "Easily find creators or brands by niche, follower count, or engagement rate."
        },
        {
            title: "Creator/Brand Profiles",
            description: "View detailed profiles to assess compatibility and past work before reaching out."
        }
    ]
  },
  {
    icon: Inbox,
    title: "Unified Inbox",
    description: "Manage all your communications from different platforms in a single, streamlined inbox. Never miss an important message again.",
    details: [
        {
            title: "Multi-Platform Integration",
            description: "Connect your email, TikTok, and Instagram accounts to see all messages in one place."
        },
        {
            title: "Conversation Management",
            description: "Reply, archive, and organize your conversations without leaving the app."
        }
    ]
  },
  {
    icon: Upload,
    title: "Upload Content",
    description: "Share your latest work with the community. Upload images, add descriptions, and use tags to increase visibility and engagement.",
    details: [
        {
            title: "Simple Upload Form",
            description: "A straightforward form to upload images, add descriptions, and manage tags."
        },
        {
            title: "Post Management",
            description: "Your uploaded posts will appear on the main dashboard for others to see and interact with."
        }
    ]
  },
  {
    icon: CreditCard,
    title: "Payments",
    description: "Keep track of all your payments, including advances and completed transactions. View detailed transaction history for each campaign.",
     details: [
        {
            title: "Transaction History",
            description: "See a detailed log of all payments, their status, and corresponding campaigns."
        },
        {
            title: "Payment Status",
            description: "Quickly identify pending, advanced, and completed payments with status badges."
        }
    ]
  },
    {
    icon: ShoppingCart,
    title: "Checkout",
    description: "A secure and easy-to-use payment processing system. Handle transactions with multiple payment options.",
     details: [
        {
            title: "Multiple Payment Methods",
            description: "Supports credit cards and various other popular payment gateways."
        },
        {
            title: "Secure Transactions",
            description: "All payments are processed securely to protect your financial information."
        }
    ]
  },
  {
    icon: Bot,
    title: "Automations",
    description: "Set up rules to automate repetitive tasks like sending follow-up emails or archiving campaigns. Let the system handle the tedious work for you.",
     details: [
        {
            title: "Custom Rules",
            description: "Create rules based on triggers (e.g., no reply in 3 days) and actions (e.g., send follow-up)."
        },
        {
            title: "Workflow Efficiency",
            description: "Save time and ensure timely communication with automated workflows."
        }
    ]
  },
  {
    icon: Settings,
    title: "Settings",
    description: "Customize your profile, notification preferences, and the look and feel of the application to match your personal style.",
     details: [
        {
            title: "Profile Customization",
            description: "Update your public profile, including your name, bio, and profile picture."
        },
        {
            title: "Theme Selection",
            description: "Choose from multiple color palettes in both light and dark modes to personalize your experience."
        },
        {
            title: "Notification Controls",
            description: "Decide which notifications you want to receive and how you receive them."
        }
    ]
  },
];

export default function GuidancePage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-block bg-primary/10 p-4 rounded-full border-2 border-primary/20">
            <Bot className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mt-4">System Guidance</h1>
        <p className="text-lg text-muted-foreground mt-2">A complete guide to understanding and using the Creator CRM.</p>
      </div>

      <div className="space-y-6">
        {features.map((feature) => (
          <Card key={feature.title}>
            <CardHeader>
                <div className="flex items-start gap-4">
                     <div className="bg-secondary p-3 rounded-md mt-1">
                        <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <CardTitle>{feature.title}</CardTitle>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>Learn More</AccordionTrigger>
                        <AccordionContent>
                           <ul className="space-y-3 pl-4 list-disc list-outside text-muted-foreground">
                             {feature.details.map(detail => (
                                <li key={detail.title}>
                                    <span className="font-semibold text-foreground">{detail.title}:</span> {detail.description}
                                </li>
                             ))}
                           </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
