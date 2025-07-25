"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload } from "lucide-react";
import { toast } from "sonner";
import { useCreateBlogMutation } from "@/redux/feature/blogAPI";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [createBlog] = useCreateBlogMutation();
  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
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
        setUploadedFile(file);
      } else {
        toast("Invalid file type");
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setUploadedFile(file);
      } else {
        toast("Invalid file type");
      }
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast("Blog name required");
      return;
    }

    if (!formData.description.trim()) {
      toast("Service details required");
      return;
    }

    const blogData = {
      ...formData,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(blogData));
    if (uploadedFile) {
      formDataToSend.append("image", uploadedFile);
    }

    console.log("Saving blog:", blogData);

    try {
      const res = await createBlog(formDataToSend).unwrap();
      if (res?.success) {
        toast("❎ Blog Created Successfully!");
        router.push("/blog");
      }
      // Reset form
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      toast("✖️ Failed to create blog");
      console.error("Error saving blog:", error);
    } finally {
      setFormData({
        title: "",
        description: "",
      });
      setUploadedFile(null);
    }
  };

  return (
    <div className='w-full min-h-screen bg-linear-to-r from-[#315D62] to-[#6ECEDA] p-4 sm:p-6 lg:p-8'>
      <div className='bg-white w-full rounded-lg p-10'>
        <Card className='max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden'>
          <div className='bg-gray-50 px-6 sm:px-8 py-4 border-b border-gray-200'>
            <h1 className='text-xl sm:text-2xl font-semibold text-gray-800'>
              Create New Blog
            </h1>
          </div>

          <CardContent className='p-6 sm:p-8'>
            <div className='space-y-6'>
              {/* Blog Name */}
              <div className='space-y-2'>
                <Label
                  htmlFor='title'
                  className='text-lg font-medium text-gray-700'
                >
                  Blog Title
                </Label>
                <Input
                  id='title'
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder='Blog Name: Window Cleaning'
                  className='w-full px-4 py-3 border-2 bg-transparent text-[#272a2a] border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors'
                />
              </div>

              {/* Service Details */}
              <div className='space-y-2'>
                <Label
                  htmlFor='description'
                  className='text-lg font-medium text-gray-700'
                >
                  Service Details
                </Label>
                <Textarea
                  id='description'
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder='Service Details'
                  rows={6}
                  className='w-full px-4 py-3 !text-lg border-2 border-teal-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none transition-colors'
                />
              </div>

              {/* File Upload */}
              <div className='space-y-4'>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-200 ${
                    dragActive
                      ? "border-teal-500 bg-teal-50"
                      : uploadedFile
                      ? "border-teal-400 bg-teal-25"
                      : "border-gray-300 hover:border-teal-300 hover:bg-gray-50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type='file'
                    accept='image/jpeg,image/png,image/jpg'
                    onChange={handleFileSelect}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  />

                  <div className='space-y-4'>
                    <div className='mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center'>
                      <CloudUpload className='w-8 h-8 text-teal-500' />
                    </div>

                    <div className='space-y-2'>
                      {uploadedFile ? (
                        <div>
                          <p className='text-lg font-medium text-teal-600 mb-1'>
                            {uploadedFile.name}
                          </p>
                          <p className='text-sm text-gray-500'>
                            File uploaded successfully
                          </p>
                        </div>
                      ) : (
                        <Button
                          type='button'
                          variant='ghost'
                          className='text-gray-600 hover:text-teal-600 hover:bg-transparent text-lg font-medium'
                        >
                          Select File
                        </Button>
                      )}
                    </div>

                    <p className='text-sm text-gray-500'>
                      Supported formats: JPEG, PNG, JPG (mobile phone photos)
                    </p>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className='pt-4'>
                <Button
                  onClick={handleSave}
                  className='w-full bg-[#6ECEDA] hover:bg-[#66deee] text-white py-4 px-6 rounded-full font-medium text-lg transition-all duration-200 shadow-lg hover:shadow-xl'
                >
                  Save
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
