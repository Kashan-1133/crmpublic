'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, X } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { useToast } from '@/hooks/use-toast';
import { usePosts } from '../posts/posts-provider';
import type { Post } from '@/lib/data';

export function UploadForm() {
  const { toast } = useToast();
  const { addPost } = usePosts();
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim() !== '') {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!description || !imagePreview) {
        toast({
            title: "Missing Information",
            description: "Please provide an image and a description.",
            variant: "destructive",
        });
        return;
    }
    
    // The provider will add the metrics
    const newPost: Omit<Post, 'views' | 'likes' | 'comments' | 'shares'> = {
        id: `post-${Date.now()}`,
        creatorId: 'user-1', // Assuming the current user is user-1
        imageUrl: imagePreview || `https://picsum.photos/seed/post${Date.now()}/400/300`,
        description: description,
        tags: tags,
        uploadDate: new Date().toISOString(),
    };

    addPost(newPost as Post);
    
    toast({
      title: "Post Uploaded!",
      description: "Your new post will now appear on the 'My Posts' page.",
    });

    // Reset form
    setDescription('');
    setTags([]);
    setTagInput('');
    setImagePreview(null);
    const fileInput = document.getElementById('dropzone-file') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  return (
    <div className="space-y-6">
       <div>
          <h1 className="text-3xl font-bold tracking-tight">Upload New Content</h1>
          <p className="text-muted-foreground">Add an image, description, and tags for your new post.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
            <CardDescription>
              Please fill out the details below to create a new post.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Image</Label>
              <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted relative">
                      {imagePreview ? (
                          <>
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                            <button
                                type="button"
                                onClick={() => setImagePreview(null)}
                                className="absolute top-2 right-2 bg-background/50 rounded-full p-1"
                            >
                                <X className="h-4 w-4" />
                            </button>
                          </>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-muted-foreground">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                      )}
                      <Input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description for your post..."
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-transparent min-h-[40px]">
                  {tags.map(tag => (
                      <Badge key={tag} variant="secondary">
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full hover:bg-destructive/20 p-0.5">
                            <X className="h-3 w-3" />
                          </button>
                      </Badge>
                  ))}
                  <Input 
                      id="tags"
                      placeholder="Add tags and press Enter" 
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 h-auto p-0 bg-transparent"
                      value={tagInput}
                      onChange={e => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                  />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Upload Post</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
