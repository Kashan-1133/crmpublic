'use client';

import Image from 'next/image';
import { users } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Heart, MessageCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { usePosts } from '../posts/posts-provider';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PostDetailsDialog } from '../posts/post-details-dialog';
import type { Post } from '@/lib/data';

export function RecentPosts() {
    const { posts, incrementViews, incrementLikes } = usePosts();
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
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">Recent Creator Posts</h2>
        <p className="text-muted-foreground">See the latest content from creators you follow and collaborate with.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.slice(0, 4).map((post) => {
          const creator = users.find((u) => u.id === post.creatorId);
          const creatorAvatar = creator ? getAvatar(creator.avatarId) : undefined;
          const currentPost = posts.find(p => p.id === post.id) || post;

          return (
            <Card key={post.id} className="overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader className="p-0 relative" onClick={() => handleDetailsClick(post)}>
                <Image
                  src={post.imageUrl}
                  alt={post.description}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                  data-ai-hint="lifestyle fashion"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/80 transition-colors" />
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
              <CardContent className="p-4 space-y-3">
                <p className="text-sm text-muted-foreground truncate h-10">
                  {post.description}
                </p>
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <button onClick={(e) => handleLikeClick(e, post.id)} className="flex items-center gap-1 group/like">
                            <Heart className={cn("h-4 w-4", currentPost.likes > 0 && "text-red-500 fill-current")} />
                            <span>{currentPost.likes}</span>
                        </button>
                        <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4" />
                            <span>{currentPost.comments.length}</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.slice(0,2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <PostDetailsDialog
        post={selectedPost}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
       />
    </div>
  );
}
