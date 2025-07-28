"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DOMPurify from "dompurify";
import { useGetTermsAndConditionsQuery } from "@/redux/feature/settingAPI";

export default function TermsConditionPage() {
  const { data, isLoading } = useGetTermsAndConditionsQuery({});

  return (
    <div className='flex min-h-screen bg-linear-to-r from-[#315D62] to-[#6ECEDA]'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <Link
                href='/setting'
                className='inline-flex items-center text-[#ffffff] hover:text-[#ffffffaf]'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                <span className='text-xl font-semibold'>Terms & Condition</span>
              </Link>

              <Link
                href='/setting/terms-condition/edit'
                className='inline-flex items-center text-[#ffffff] hover:text-[#f3f3f3] border border-[#ffffff] rounded-md px-4 py-1.5'
              >
                <span className='text-xl font-semibold'>Edit</span>
              </Link>
            </div>

            <div className='prose prose-sm max-w-none'>
              {isLoading ? (
                <p className='text-base mb-4'>Loading...</p>
              ) : (
                <div
                  className='text-lg mb-4 prose'
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      data?.data[0]?.description || ""
                    ),
                  }}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
