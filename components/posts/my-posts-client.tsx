'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePosts } from './posts-provider';
import { users } from '@/lib/data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, BarChart2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Post } from '@/lib/data';
import { PostDetailsDialog } from './post-details-dialog';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function MyPostsClient() {
  const { posts, incrementViews, incrementLikes } = usePosts();
  // Assuming current user is 'user-1' for demonstration
  const currentUserPosts = posts.filter(post => post.creatorId === 'user-1');

  const getAvatar = (id: string) => PlaceHolderImages.find(p => p.id === id);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleDetailsClick = (post: Post) => {
    incrementViews(post.id);
    setSelectedPost(post);
    setIsDetailsOpen(true);
  };
  
  const handleLikeClick = (e: React.MouseEvent, postId: string) => {
    e.stopPropagation();
    incrementLikes(postId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Posts</h1>
        <p className="text-muted-foreground">View and manage all the content you've uploaded.</p>
      </div>
      
      {currentUserPosts.length === 0 ? (
        <Card>
            <CardContent className="text-center p-12">
                <p className="text-muted-foreground">You haven't uploaded any posts yet. Go to the <Link href="/upload" className="text-primary underline">Upload</Link> page to get started.</p>
            </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentUserPosts.map((post) => {
            const creator = users.find((u) => u.id === post.creatorId);
            const creatorAvatar = creator ? getAvatar(creator.avatarId) : undefined;
            const currentPost = posts.find(p => p.id === post.id) || post;
            
            return (
                <Card key={post.id} className="overflow-hidden group flex flex-col">
                <CardHeader className="p-0 relative">
                    <Image
                        src={post.imageUrl}
                        alt={post.description}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover cursor-pointer"
                        data-ai-hint="lifestyle fashion"
                        onClick={() => handleDetailsClick(post)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                        <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 border-2 border-background">
                            <AvatarImage src={creatorAvatar?.imageUrl} alt={creator?.name} data-ai-hint={creatorAvatar?.imageHint} />
                            <AvatarFallback>{creator?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm text-white">{creator?.name}</span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3 flex-1">
                    <p className="text-sm text-muted-foreground h-14 line-clamp-3">
                        {post.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                            #{tag}
                            </Badge>
                        ))}
                    </div>
                </CardContent>
                 <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                     <div className="flex justify-between items-center text-xs text-muted-foreground w-full mb-2">
                        <div className="flex items-center gap-2">
                            <button onClick={(e) => handleLikeClick(e, post.id)} className="flex items-center gap-1 group/like">
                                <Heart className={cn("h-4 w-4 transition-colors", currentPost.likes > 0 ? "text-red-500 fill-current" : "group-hover/like:text-red-500")} />
                                <span>{currentPost.likes}</span>
                            </button>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                <span>{currentPost.comments.length}</span>
                            </div>
                        </div>
                        <span className="text-xs">{new Date(post.uploadDate).toLocaleDateString()}</span>
                    </div>
                    <Button variant="outline" className="w-full" onClick={() => handleDetailsClick(post)}>
                        <BarChart2 className="mr-2 h-4 w-4" />
                        Post Details
                    </Button>
                 </CardFooter>
                </Card>
            );
            })}
        </div>
      )}

      <PostDetailsDialog 
        post={selectedPost}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </div>
  );
}
