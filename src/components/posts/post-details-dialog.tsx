
'use client';

import { useState, Fragment } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import type { Post, Comment } from '@/lib/data';
import { users } from '@/lib/data';
import { Eye, Heart, MessageCircle, Send, Share2, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { usePosts } from './posts-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface PostDetailsDialogProps {
  post: Post | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export function PostDetailsDialog({ post, isOpen, onOpenChange }: PostDetailsDialogProps) {
  const { incrementLikes, addComment, addReply, likeComment, posts } = usePosts();
  const [commentText, setCommentText] = useState('');
  
  const currentPost = posts.find(p => p.id === post?.id);

  if (!currentPost) return null;

  const handleLikeClick = () => {
    incrementLikes(currentPost.id);
  };
  
  const handleAddComment = () => {
    if (commentText.trim() === '') return;

    addComment(currentPost.id, {
      id: `comment-${Date.now()}`,
      authorId: 'user-1', // Assuming current user is user-1
      text: commentText,
      timestamp: new Date().toISOString(),
    });
    setCommentText('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl p-0 h-[90vh] flex flex-col">
        <div className="grid md:grid-cols-2 h-full overflow-hidden">
          <div className="relative h-full hidden md:block">
            <Image
              src={currentPost.imageUrl}
              alt={currentPost.description}
              fill
              className="object-cover"
              data-ai-hint="lifestyle fashion"
            />
          </div>
          <div className="flex flex-col h-full">
            <div className="p-6 pb-0 flex-shrink-0">
                <h2 className="text-2xl font-bold tracking-tight mb-4">Post Details</h2>
                <div className="relative md:hidden h-48 w-full mb-4">
                  <Image
                    src={currentPost.imageUrl}
                    alt={currentPost.description}
                    fill
                    className="object-cover rounded-lg"
                    data-ai-hint="lifestyle fashion"
                  />
                </div>
                <p className="text-muted-foreground pt-2">{currentPost.description}</p>
                <div className="flex flex-wrap gap-2 my-4">
                    {currentPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        #{tag}
                    </Badge>
                    ))}
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-4 gap-4 text-center mb-4">
                    <MetricCard icon={Eye} label="Views" value={currentPost.views.toLocaleString()} />
                    <MetricCard icon={Heart} label="Likes" value={currentPost.likes.toLocaleString()} isInteractive onClick={handleLikeClick} />
                    <MetricCard icon={MessageCircle} label="Comments" value={currentPost.comments.length.toLocaleString()} />
                    <MetricCard icon={Share2} label="Shares" value={currentPost.shares.toLocaleString()} />
                </div>

                <Separator className="my-4" />
                
                <h3 className="font-semibold mb-2">Comments</h3>
            </div>
            
            <ScrollArea className="flex-1 px-6">
                <div className="space-y-4">
                    {currentPost.comments.map(comment => (
                        <CommentThread
                            key={comment.id}
                            postId={currentPost.id}
                            comment={comment}
                            onReply={addReply}
                            onLike={likeComment}
                        />
                    ))}
                      {currentPost.comments.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4">No comments yet. Be the first to comment!</p>
                    )}
                </div>
            </ScrollArea>
            
            <div className="p-4 border-t mt-auto bg-background flex-shrink-0">
              <div className="relative">
                <Input 
                  placeholder="Add a comment..." 
                  className="pr-10" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <Button size="icon" variant="ghost" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8" onClick={handleAddComment}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const CommentThread = ({ postId, comment, onReply, onLike }: { postId: string, comment: Comment, onReply: Function, onLike: Function }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState('');
    const author = users.find(u => u.id === comment.authorId);
    const avatar = author ? PlaceHolderImages.find(p => p.id === author.avatarId) : undefined;
  
    const handleReplySubmit = () => {
      if (replyText.trim()) {
        onReply(postId, comment.id, {
          id: `comment-${Date.now()}`,
          authorId: 'user-1', // Assume current user
          text: replyText,
          timestamp: new Date().toISOString(),
        });
        setReplyText('');
        setIsReplying(false);
      }
    };
  
    return (
      <div className="flex flex-col">
        <div className="flex gap-3">
            <Avatar className="h-8 w-8">
                <AvatarImage src={avatar?.imageUrl} alt={author?.name} data-ai-hint={avatar?.imageHint} />
                <AvatarFallback>{author?.name?.charAt(0) ?? 'U'}</AvatarFallback>
            </Avatar>
            <div className="bg-secondary rounded-lg p-3 text-sm flex-1">
                <p className="font-semibold">{author?.name ?? "User"}</p>
                <p>{comment.text}</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-primary" onClick={() => onLike(postId, comment.id)}>
                        <ThumbsUp className="h-3 w-3" /> 
                        {comment.likes > 0 && <span>{comment.likes}</span>}
                        Like
                    </button>
                    <button className="hover:text-primary" onClick={() => setIsReplying(!isReplying)}>Reply</button>
                </div>
            </div>
        </div>
  
        {isReplying && (
          <div className="ml-11 mt-2 flex gap-2">
            <Input 
              placeholder="Write a reply..." 
              className="h-8"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleReplySubmit()}
            />
            <Button size="sm" onClick={handleReplySubmit}>Reply</Button>
          </div>
        )}
  
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-11 mt-3 pl-3 border-l-2 border-border space-y-3">
            {comment.replies.map(reply => (
              <CommentThread key={reply.id} postId={postId} comment={reply} onReply={onReply} onLike={onLike} />
            ))}
          </div>
        )}
      </div>
    );
};
  

const MetricCard = ({ icon: Icon, label, value, isInteractive, onClick }: { icon: React.ElementType, label: string, value: string, isInteractive?: boolean, onClick?: () => void }) => {
    const interactionClass = isInteractive ? 'cursor-pointer hover:bg-secondary rounded-lg' : '';
    return (
        <div className={cn("flex flex-col items-center justify-center p-2 transition-colors", interactionClass)} onClick={onClick}>
            <Icon className={cn("h-6 w-6 mb-1", label === 'Likes' && parseInt(value) > 0 ? 'text-red-500 fill-current' : 'text-primary')} />
            <p className="text-lg font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
        </div>
    )
};
