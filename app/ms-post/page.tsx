"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample blog post data
const allBlogPosts = Array(24).fill({
  id: 1,
  title: "What Does The 2025 Spring Statement Mean For People MS?",
  content:
    "Key Proposals include Tightening Eligibility Criteria For Personal Independence Payment (PIP) From November 2026. Claimants Will Need To Score At Least Four Points On A Single Daily Living Activity To Qualify For The Daily Living Component, Potentially Reducing Support For Those With Fluctuating Conditions Like MS.",
  image: "/post.jpg",
});

const POSTS_PER_PAGE = 6;

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allBlogPosts.length / POSTS_PER_PAGE);

  // Calculate which posts to display based on current page
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = allBlogPosts.slice(startIndex, endIndex);

  // Handle page changes
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  return (
    <main className='min-h-screen bg-pink-50 p-4 md:p-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header with Add Post button */}
        <div className='flex justify-end mb-6'>
          <Link
            href='/ms-post/create'
            className='flex items-center gap-2 bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-full transition-colors'
          >
            <PlusIcon size={16} />
            <span>Add Post</span>
          </Link>
        </div>

        {/* Blog posts grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {currentPosts.map((post, index) => (
            <div
              key={index}
              className='bg-white rounded-lg overflow-hidden shadow-sm'
            >
              <div className='relative h-48 w-full'>
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className='object-cover'
                />
              </div>
              <div className='p-4'>
                <h2 className='text-2xl text-[#2C383C] font-semibold mb-2 hover:underline'>
                  <Link href={`/posts/${post.id}`}>{post.title}</Link>
                </h2>
                <p className='text-sm text-[#727A7C] mb-4 line-clamp-4'>
                  {post.content}
                </p>
                <Link
                  href={`/ms-post/edit`}
                  className='inline-block border border-red-900 text-[#FFFFFF] hover:text-red-900 bg-[#760C2A] hover:bg-transparent px-6 py-2 rounded-md text-sm transition-colors'
                >
                  Edit Post
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination with shadcn/ui */}
        <div className='mt-8'>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href='#'
                  className='bg-red-900 text-white hover:bg-red-800 border-none'
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentPage - 1);
                  }}
                >
                  Back
                </PaginationPrevious>
              </PaginationItem>

              {/* First page */}
              <PaginationItem>
                <PaginationLink
                  href='#'
                  isActive={currentPage === 1}
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(1);
                  }}
                >
                  1
                </PaginationLink>
              </PaginationItem>

              {/* Ellipsis if needed */}
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationLink href='#' className='cursor-default'>
                    ...
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Current page neighborhood */}
              {currentPage > 2 && currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    isActive={true}
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(currentPage);
                    }}
                  >
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Ellipsis if needed */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationLink href='#' className='cursor-default'>
                    ...
                  </PaginationLink>
                </PaginationItem>
              )}

              {/* Last page */}
              {totalPages > 1 && (
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    className={
                      currentPage === totalPages
                        ? "bg-red-900 text-white hover:bg-red-800 border-none"
                        : ""
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(totalPages);
                    }}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  href='#'
                  className='bg-red-900 text-white hover:bg-red-800 border-none'
                  onClick={(e) => {
                    e.preventDefault();
                    goToPage(currentPage + 1);
                  }}
                >
                  Next
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </main>
  );
}
