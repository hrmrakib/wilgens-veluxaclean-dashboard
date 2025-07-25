"use client";

import type React from "react";

import { useState } from "react";
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
import { Plus, Calendar, CloudUpload, Edit, Delete, Trash } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "@/redux/feature/blogAPI";

export interface IBlog {
  _id: string;
  title: string;
  description: string;
  image: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([
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
  const { data: blogs, refetch } = useGetBlogsQuery({});
  const [deleteBlog] = useDeleteBlogMutation();

  console.log(blogs?.data?.result);
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
        toast("Invalid file type");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setNewBlog((prev) => ({ ...prev, image: file }));
      } else {
        toast("Invalid file type");
      }
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmDelete) return;

    const res = await deleteBlog(id);

    if (res?.data?.success) {
      toast("✅ " + res?.data?.message);
      refetch();
    }
  };

  const handleAddBlog = () => {
    if (!newBlog.title || !newBlog.description || !newBlog.date) {
      toast("Missing fields");
      return;
    }

    const blogPost = {
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

    toast("Blog post created");
  };

  const handleBlogClick = (slug: string) => {
    // In a real app, this would navigate to the blog post detail page
    toast("Blog post clicked");
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
          </Dialog>
        </div>

        {/* Blog Posts Grid */}
        <div className='bg-white rounded-2x p-6 sm:p-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {blogs?.data?.result.map((post: IBlog) => (
              <Card
                key={post._id}
                className='overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group'
                onClick={() => handleBlogClick(post?._id)}
              >
                <div className='aspect-[4/3] relative overflow-hidden'>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${post.image}`}
                    alt={post.title}
                    width={500}
                    height={500}
                    className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                </div>

                <CardContent className='p-6 relative'>
                  <div className='flex items-center gap-2 text-sm text-gray-500 mb-3'>
                    <Calendar className='w-4 h-4' />
                    <span>{post.createdAt.split("T")[0]}</span>
                  </div>

                  <h3 className='text-xl font-bold text-gray-800 mb-3 group-hover:text-teal-600 transition-colors'>
                    {post.title}
                  </h3>

                  <p className='text-gray-600 text-sm leading-relaxed line-clamp-3'>
                    {post.description}
                  </p>

                  {/* EDIT ICON */}
                  <div className='absolute top-3 right-3 flex items-center gap-5 transition-opacity duration-300'>
                    <button onClick={() => handleDelete(post._id)}>
                      <Trash className='w-6 h-6 text-gray-600' />
                    </button>

                    <Link href={`/blog/edit/${post._id}`}>
                      <Edit className='w-6 h-6 text-gray-600' />
                    </Link>
                  </div>
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
