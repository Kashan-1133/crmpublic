'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Post, Comment } from '@/lib/data';
import { posts as initialPosts } from '@/lib/data';

interface PostsContextType {
  posts: Post[];
  addPost: (post: Post) => void;
  incrementViews: (postId: string) => void;
  incrementLikes: (postId: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'likes' | 'replies'>) => void;
  addReply: (postId: string, parentCommentId: string, reply: Omit<Comment, 'likes' | 'replies'>) => void;
  likeComment: (postId: string, commentId: string) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  const addPost = (post: Post) => {
    const newPostWithMetrics: Post = {
        ...post,
        views: 0,
        likes: 0,
        comments: [],
        shares: 0,
    };
    setPosts(prevPosts => [newPostWithMetrics, ...prevPosts]);
  };

  const incrementViews = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, views: p.views + 1 } : p))
    );
  };
  
  const incrementLikes = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(p => (p.id === postId ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const addComment = (postId: string, comment: Omit<Comment, 'likes' | 'replies'>) => {
    const newComment: Comment = { ...comment, likes: 0, replies: [] };
    setPosts(prevPosts =>
        prevPosts.map(p => 
            p.id === postId 
            ? { ...p, comments: [newComment, ...p.comments] } 
            : p
        )
    );
  };

  const addReply = (postId: string, parentCommentId: string, reply: Omit<Comment, 'likes' | 'replies'>) => {
    const newReply: Comment = { ...reply, likes: 0, replies: [] };
    setPosts(prevPosts => {
      const newPosts = [...prevPosts];
      const post = newPosts.find(p => p.id === postId);
      if (!post) return prevPosts;

      const findAndAddReply = (comments: Comment[]): Comment[] => {
        return comments.map(c => {
          if (c.id === parentCommentId) {
            return { ...c, replies: [newReply, ...c.replies] };
          }
          if (c.replies.length > 0) {
            return { ...c, replies: findAndAddReply(c.replies) };
          }
          return c;
        });
      };
      
      post.comments = findAndAddReply(post.comments);
      return newPosts;
    });
  };

  const likeComment = (postId: string, commentId: string) => {
    setPosts(prevPosts => {
        const newPosts = [...prevPosts];
        const post = newPosts.find(p => p.id === postId);
        if (!post) return prevPosts;

        const findAndLikeComment = (comments: Comment[]): Comment[] => {
            return comments.map(c => {
                if (c.id === commentId) {
                    return { ...c, likes: c.likes + 1 };
                }
                if (c.replies.length > 0) {
                    return { ...c, replies: findAndLikeComment(c.replies) };
                }
                return c;
            });
        };

        post.comments = findAndLikeComment(post.comments);
        return newPosts;
    });
  };


  return (
    <PostsContext.Provider value={{ posts, addPost, incrementViews, incrementLikes, addComment, addReply, likeComment }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostsProvider');
  }
  return context;
};
