"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className='flex-1 w-full'>
        <main className='w-full p-4 md:p-6'>
          <div className='max-w-3xl mx-auto'>
            <div className='mb-6 flex items-center justify-between'>
              <Link
                href='/setting'
                className='inline-flex items-center text-primary hover:text-teal-700'
              >
                <ArrowLeft className='mr-2 h-4 w-4' />
                <span className='text-xl font-semibold'>About Us</span>
              </Link>
              <Link
                href='/setting/about-us/edit'
                className='inline-flex items-center text-primary hover:text-teal-700 border border-[#760C2A] rounded-md px-4 py-1.5'
              >
                <span className='text-xl font-semibold'>Edit</span>
              </Link>
            </div>

            <div className='prose prose-sm max-w-none'>
              <h2 className='text-xl font-semibold mb-4'>About DesignDoc</h2>

              <p className='mb-4'>
                DesignDoc is a comprehensive platform designed to simplify
                document management and collaboration for designers, developers,
                and creative professionals.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>Our Mission</h3>
              <p>
                Our mission is to empower creative teams with the tools they
                need to streamline their workflow, enhance collaboration, and
                deliver exceptional results. We believe that great design comes
                from seamless communication and efficient processes.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>Our Story</h3>
              <p>
                Founded in 2020, DesignDoc was born out of the frustration
                experienced by a team of designers and developers who struggled
                with fragmented tools and disjointed workflows. What started as
                an internal solution quickly evolved into a platform that serves
                thousands of creative professionals worldwide.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>Our Team</h3>
              <p>
                We are a diverse team of designers, developers, and product
                enthusiasts passionate about creating tools that make work more
                efficient and enjoyable. Our team brings together expertise from
                various fields, including UX/UI design, software development,
                and project management.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>Our Values</h3>
              <ul className='list-disc pl-5 mb-4'>
                <li>
                  <strong>Simplicity:</strong> We believe in the power of
                  simplicity and strive to create intuitive, easy-to-use tools.
                </li>
                <li>
                  <strong>Collaboration:</strong> We value teamwork and build
                  features that enhance communication and collaboration.
                </li>
                <li>
                  <strong>Innovation:</strong> We continuously explore new
                  technologies and approaches to improve our platform.
                </li>
                <li>
                  <strong>User-Centric:</strong> We put our users at the center
                  of everything we do, listening to feedback and evolving our
                  product accordingly.
                </li>
              </ul>

              <h3 className='text-lg font-medium mt-6 mb-2'>Contact Us</h3>
              <p>
                We'd love to hear from you! If you have any questions, feedback,
                or suggestions, please reach out to us at:
              </p>
              <p>
                <strong>Email:</strong> support@designdoc.com
                <br />
                <strong>Phone:</strong> +1 (555) 123-4567
                <br />
                <strong>Address:</strong> 123 Design Street, Suite 456, San
                Francisco, CA 94107
              </p>

              <p className='mt-6 text-sm text-gray-500'>
                Thank you for choosing DesignDoc. We're excited to be part of
                your creative journey!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
