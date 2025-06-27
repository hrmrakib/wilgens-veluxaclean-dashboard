"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsConditionPage() {
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
                <span className='text-xl font-semibold'>Terms & Condition</span>
              </Link>

              <Link
                href='/setting/terms-condition/edit'
                className='inline-flex items-center text-primary hover:text-teal-700 border border-[#760C2A] rounded-md px-4 py-1.5'
              >
                <span className='text-xl font-semibold'>Edit</span>
              </Link>
            </div>

            <div className='prose prose-sm max-w-none'>
              <h2 className='text-xl font-semibold mb-4'>
                Terms and Conditions
              </h2>

              <p className='mb-4'>
                Welcome to DesignDoc. By accessing or using our service, you
                agree to be bound by these Terms and Conditions.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing or using the DesignDoc platform, you acknowledge
                that you have read, understood, and agree to be bound by these
                Terms and Conditions. If you do not agree to these terms, please
                do not use our services.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                2. User Accounts
              </h3>
              <p>
                To access certain features of the platform, you may be required
                to register for an account. You are responsible for maintaining
                the confidentiality of your account information and for all
                activities that occur under your account.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                3. Subscription and Payments
              </h3>
              <p>
                Some features of DesignDoc require a paid subscription. By
                subscribing to a paid plan, you agree to pay the fees associated
                with the selected plan. All payments are non-refundable unless
                otherwise specified.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>4. User Content</h3>
              <p>
                You retain ownership of any content you submit to the platform.
                However, by submitting content, you grant DesignDoc a worldwide,
                non-exclusive, royalty-free license to use, reproduce, and
                display such content in connection with providing and promoting
                the service.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                5. Prohibited Activities
              </h3>
              <p>
                You agree not to engage in any activity that interferes with or
                disrupts the service or servers connected to the platform.
                Prohibited activities include but are not limited to hacking,
                scraping, or introducing malware.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>6. Termination</h3>
              <p>
                DesignDoc reserves the right to terminate or suspend your
                account and access to the service at any time, without prior
                notice or liability, for any reason.
              </p>

              <h3 className='text-lg font-medium mt-6 mb-2'>
                7. Changes to Terms
              </h3>
              <p>
                We reserve the right to modify these Terms and Conditions at any
                time. Your continued use of the platform after such changes
                constitutes your acceptance of the new terms.
              </p>

              <p className='mt-6 text-sm text-gray-500'>
                Last updated: May 8, 2023
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
