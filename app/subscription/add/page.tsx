"use client";

import type React from "react";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";

export default function AddSubscription() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<string | null>(null);
  const [packageName, setPackageName] = useState("");
  const [packageAmount, setPackageAmount] = useState("");
  const [packageDuration, setPackageDuration] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [showFeaturesInput, setShowFeaturesInput] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!packageName || !packageAmount || !packageDuration) {
      alert("Please fill in all required fields");
      return;
    }

    // Navigate back to the subscriptions page
    router.push("/");
  };

  return (
    <div className='min-h-screen bg-[#E6ECF6] p-4'>
      <div className='max-w-5xl mx-auto'>
        <div className='bg-[#E6ECF6] rounded-lg overflow-hidden'>
          <div className='p-4 flex items-center'>
            <button
              onClick={() => router.back()}
              className='text-[#101010] hover:text-gray-300 mr-3'
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className='text-[#101010] text-xl'>Add Subscription</h1>
          </div>

          <form onSubmit={handleSubmit} className='p-4 space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div
                className='bg-input rounded-md p-3 flex items-center justify-between cursor-pointer'
                onClick={() => fileInputRef.current?.click()}
              >
                <span className='text-gray-600'>Upload Image</span>
                <Upload size={20} className='text-gray-300' />
                <input
                  ref={fileInputRef}
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </div>

              <input
                type='text'
                placeholder='Package Name'
                value={packageName}
                onChange={(e) => setPackageName(e.target.value)}
                className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <input
                type='text'
                placeholder='Package Amount'
                value={packageAmount}
                onChange={(e) => setPackageAmount(e.target.value)}
                className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none'
              />

              <input
                type='text'
                placeholder='Package Duration'
                value={packageDuration}
                onChange={(e) => setPackageDuration(e.target.value)}
                className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none'
              />
            </div>

            {/* Image Preview */}
            {image && (
              <div className='relative w-24 h-24 mx-auto'>
                <Image
                  src={image || "/placeholder.svg"}
                  alt='Package'
                  fill
                  className='object-cover rounded-md'
                />
                <button
                  type='button'
                  onClick={() => setImage(null)}
                  className='absolute -top-2 -right-2 bg-red-500 rounded-full p-1'
                >
                  <X size={14} className='text-white' />
                </button>
              </div>
            )}

            {/* Features Section */}
            {showFeaturesInput ? (
              <div className='space-y-2'>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    placeholder='Enter feature'
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    className='bg-input rounded-md p-3 text-white placeholder-gray-600 outline-none flex-1'
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddFeature();
                      }
                    }}
                  />
                  <button
                    type='button'
                    onClick={handleAddFeature}
                    className='bg-button text-buttonColor rounded-md px-4'
                  >
                    Add
                  </button>
                </div>

                {features.length > 0 && (
                  <div className='bg-input rounded-md p-3'>
                    <h3 className='text-white mb-2'>Features:</h3>
                    <ul className='space-y-2'>
                      {features.map((feature, index) => (
                        <li
                          key={index}
                          className='flex justify-between items-center text-white'
                        >
                          <span>• {feature}</span>
                          <button
                            type='button'
                            onClick={() => handleRemoveFeature(index)}
                            className='text-red-400 hover:text-red-300'
                          >
                            <X size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                type='button'
                onClick={() => setShowFeaturesInput(true)}
                className='bg-zinc-700 rounded-md p-3 text-gray-300 w-full text-left flex items-center'
              >
                <span>Add Features</span>
              </button>
            )}

            <div className='flex justify-center pt-4'>
              <button
                type='submit'
                className='bg-button text-buttonColor font-medium rounded-full px-12 py-3 transition-colors'
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
