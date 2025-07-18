"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Calendar, CloudUpload } from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: "1",
      title: "Window Cleaning",
      description:
        "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
      date: "17 June 2025",
      image: "/blog.png",
      slug: "window-cleaning",
    },
    {
      id: "2",
      title: "Bedroom Cleaning",
      description:
        "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions...",
      date: "18 June 2025",
      image: "/blog.png",
      slug: "bedroom-cleaning",
    },
    {
      id: "3",
      title: "Office Cleaning Service",
      description:
        "Discover the ultimate guide to troubleshooting common smart home issues in our latest blog post. From connectivity problems to device malfunctions....",
      date: "19 June 2025",
      image: "/blog.png",
      slug: "office-cleaning-service",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    description: "",
    date: "",
    image: null as File | null,
  });
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setNewBlog((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setNewBlog((prev) => ({ ...prev, image: file }));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setNewBlog((prev) => ({ ...prev, image: file }));
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAddBlog = () => {
    if (!newBlog.title || !newBlog.description || !newBlog.date) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const blogPost: BlogPost = {
      id: Date.now().toString(),
      title: newBlog.title,
      description: newBlog.description,
      date: new Date(newBlog.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      image: newBlog.image ? URL.createObjectURL(newBlog.image) : "/blog.png",
      slug: newBlog.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, ""),
    };

    setBlogPosts((prev) => [blogPost, ...prev]);

    setNewBlog({
      title: "",
      description: "",
      date: "",
      image: null,
    });

    setIsDialogOpen(false);

    toast({
      title: "Blog post created",
      description: `"${blogPost.title}" has been added successfully!`,
    });
  };

  const handleBlogClick = (slug: string) => {
    // In a real app, this would navigate to the blog post detail page
    toast({
      title: "Blog post clicked",
      description: `Navigating to: ${slug}`,
    });
  };

  return (
    <div className='w-full min-h-screen bg-linear-to-r from-[#315D62] to-[#6ECEDA] p-4 sm:p-6 lg:p-8'>
      <div className='bg-white w-full rounded-lg p-10'>
        {/* Header */}
        <div className='flex justify-end mb-8'>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Link
                href='/blog/create'
                className='flex items-center bg-[#27484C] hover:bg-slate-700 border border-[#62C1BF] text-white px-3 py-3 rounded-full'
              >
                <Plus className='w-4 h-4 mr-2' />
                Add New Blog
              </Link>
            </DialogTrigger>
            {/* <DialogContent className='sm:max-w-[500px] max-h-[90vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>Create New Blog Post</DialogTitle>
              </DialogHeader>
              <div className='grid gap-4 py-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='title'>Blog Title</Label>
                  <Input
                    id='title'
                    value={newBlog.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder='Enter blog title'
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='date'>Publication Date</Label>
                  <Input
                    id='date'
                    type='date'
                    value={newBlog.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    value={newBlog.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    placeholder='Enter blog description'
                    rows={4}
                    className='resize-none'
                  />
                </div>

                <div className='grid gap-2'>
                  <Label>Featured Image</Label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                      dragActive
                        ? "border-teal-500 bg-teal-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type='file'
                      accept='image/*'
                      onChange={handleFileSelect}
                      className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                    />

                    <div className='space-y-2'>
                      <CloudUpload className='w-8 h-8 text-gray-400 mx-auto' />
                      {newBlog.image ? (
                        <p className='text-sm text-teal-600 font-medium'>
                          {newBlog.image.name}
                        </p>
                      ) : (
                        <div>
                          <p className='text-sm text-gray-600'>
                            Drop image here or click to upload
                          </p>
                          <p className='text-xs text-gray-400'>
                            PNG, JPG, JPEG up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className='flex justify-end gap-2'>
                <Button
                  variant='outline'
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddBlog}
                  className='bg-teal-500 hover:bg-teal-600'
                >
                  Create Blog Post
                </Button>
              </div>
            </DialogContent> */}
          </Dialog>
        </div>

        {/* Blog Posts Grid */}
        <div className='bg-white rounded-2x p-6 sm:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className='overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group'
                onClick={() => handleBlogClick(post.slug)}
              >
                <div className='aspect-[4/3] relative overflow-hidden'>
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className='object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>
                <CardContent className='p-6'>
                  <div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
                    <Calendar className='w-4 h-4' />
                    <span>{post.date}</span>
                  </div>

                  <h3 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors'>
                    {post.title}
                  </h3>

                  <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                    {post.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {blogPosts.length === 0 && (
            <div className='text-center py-12'>
              <div className='text-gray-400 mb-4'>
                <Calendar className='w-16 h-16 mx-auto' />
              </div>
              <h3 className='text-xl font-semibold text-gray-600 mb-2'>
                No blog posts yet
              </h3>
              <p className='text-gray-500'>
                Create your first blog post to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
