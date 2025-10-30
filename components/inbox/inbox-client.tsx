'use client';

import { useState } from 'react';
import { conversations, users } from '@/lib/data';
import type { Conversation } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Mail, MessageSquare, Instagram, ArrowLeft } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ScrollArea } from '../ui/scroll-area';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const platformIcons = {
    Email: Mail,
    TikTok: MessageSquare,
    Instagram: Instagram,
    WhatsApp: MessageSquare,
};

export function InboxClient() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0]
  );
  
  const getAvatar = (id: string) => PlaceHolderImages.find(p => p.id === id);
  const selfAvatar = getAvatar('avatar-1');

  const participant = selectedConversation ? users.find(u => u.id === selectedConversation.participantId) : null;
  const participantAvatar = participant ? getAvatar(participant.avatarId) : undefined;
  const PlatformIcon = selectedConversation ? platformIcons[selectedConversation.platform] : null;

  return (
    <div className={cn(
      "grid h-[calc(100vh-theme(spacing.16)-2rem)] border rounded-lg overflow-hidden",
      "md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]",
      !selectedConversation && "md:grid-cols-1"
    )}>
      <div className={cn(
        "flex-col border-r",
        selectedConversation ? "hidden md:flex" : "flex"
      )}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Unified Inbox</h2>
           <p className="text-sm text-muted-foreground mt-1">
            Manage all your brand communications in one place.
          </p>
        </div>
        <ScrollArea className="flex-1">
          {conversations.map((conv) => {
            const p = users.find((u) => u.id === conv.participantId);
            const pAvatar = p ? getAvatar(p.avatarId) : undefined;
            const P_Icon = platformIcons[conv.platform];
            return (
              <div
                key={conv.id}
                className={cn(
                  'flex items-center gap-4 p-3 cursor-pointer hover:bg-secondary',
                  selectedConversation?.id === conv.id && 'bg-secondary'
                )}
                onClick={() => setSelectedConversation(conv)}
              >
                <Avatar>
                  <AvatarImage src={pAvatar?.imageUrl} alt={p?.name} data-ai-hint={pAvatar?.imageHint}/>
                  <AvatarFallback>{p?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold truncate">{p?.name}</h3>
                    <P_Icon className="h-4 w-4 text-muted-foreground"/>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.lastMessage.text}
                  </p>
                </div>
                {!conv.lastMessage.isRead && <div className="h-2.5 w-2.5 rounded-full bg-primary" />}
              </div>
            );
          })}
        </ScrollArea>
      </div>

      {selectedConversation && participant && PlatformIcon && (
        <div className={cn(
          "flex flex-col",
          !selectedConversation && "hidden"
        )}>
          <div className="flex items-center gap-4 p-3 border-b">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSelectedConversation(null)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Avatar>
              <AvatarImage src={participantAvatar?.imageUrl} alt={participant?.name} data-ai-hint={participantAvatar?.imageHint} />
              <AvatarFallback>{participant?.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{participant?.name}</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <PlatformIcon className="h-3 w-3"/>
                  <span>Conversation via {selectedConversation.platform}</span>
              </div>
            </div>
          </div>
          <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {selectedConversation.messages.map(msg => (
                    <div key={msg.id} className={cn("flex items-end gap-2", msg.senderId !== 'user-self' ? 'justify-start' : 'justify-end')}>
                        {msg.senderId !== 'user-self' && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={participantAvatar?.imageUrl} alt={participant?.name} data-ai-hint={participantAvatar?.imageHint} />
                                <AvatarFallback>{participant?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className={cn("max-w-xs lg:max-w-md rounded-lg px-4 py-2 text-sm", msg.senderId !== 'user-self' ? 'bg-secondary rounded-bl-none' : 'bg-primary text-primary-foreground rounded-br-none')}>
                                        {msg.text}
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                    {new Date(msg.timestamp).toLocaleString()}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {msg.senderId === 'user-self' && (
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={selfAvatar?.imageUrl} alt="You" data-ai-hint={selfAvatar?.imageHint} />
                                <AvatarFallback>U</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
              </div>
          </ScrollArea>
          <div className="p-4 border-t mt-auto">
            <div className="relative">
              <Input placeholder="Type a message..." className="pr-12" />
              <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2">
                <Send className="h-5 w-5 text-primary" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
