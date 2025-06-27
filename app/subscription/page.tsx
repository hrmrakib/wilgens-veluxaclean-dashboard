"use client";

import { useState } from "react";
import { Check, Fish, Crown, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string | null>(null);

  const features = [
    "Issues Frequent",
    "Maintenance Newspaper",
    "Buy Products",
    "Problem In My Pool",
    "Calculator Of Chemicals",
    "Tricks And Secrets",
  ];

  const handleChoosePlan = (plan: string) => {
    setSelectedPlan(plan);
    setShowDialog(true);
  };

  const confirmSubscription = () => {
    setCurrentPlan(selectedPlan);
    setShowDialog(false);
  };

  // <div class="size-18 rounded-full bg-radial-[at_25%_25%] from-white to-zinc-900 to-75%"></div>

  return (
    <div className='min-h-screen bg-transparent p-4 md:p-8 flex flex-col'>
      <div className='w-full'>
        <div className='flex justify-end mb-6'>
          <Link
            href='/subscription/add'
            className='flex items-center gap-2 bg-button  text-buttonColor rounded-full px-4 py-2 transition-colors'
          >
            <Plus size={20} />
            <span>Add New Subscription</span>
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Basic Plan */}
          <div className='max-w-md bg-gradient-to-b from-[#1B1B1B] via-[#373737] to-[#373737] rounded-lg border border-[#676767] overflow-hidden'>
            <div className='px-6 py-8 flex flex-col items-center gap-3'>
              <h3 className='text-primary text-center text-xl font-semibold'>
                Basic Plan
              </h3>
              <p className='text-primary text-5xl font-bold'>$2.00</p>
              <p className='text-sm font-semibold text-primary'>
                Monthly invoice uploads 100
              </p>
            </div>

            <div className=''>
              <div className='p-4'>
                <h4 className='text-primary font-medium mb-3'>
                  Let top creative talent come to you by posting your job
                  listing on #1 Design Jobs Board.
                </h4>
                <ul className='space-y-5'>
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2 text-primary'
                    >
                      <div className='rounded-full p-1'>
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clip-path='url(#clip0_160_2548)'>
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M18.0011 4.85452C18.0011 5.14486 17.885 5.4352 17.676 5.64425L7.68823 15.632C7.47918 15.841 7.18884 15.9572 6.8985 15.9572C6.60816 15.9572 6.31782 15.841 6.10877 15.632L0.325182 9.84838C0.116136 9.63934 0 9.349 0 9.05866C0 8.76832 0.116136 8.47797 0.325182 8.26893L1.90464 6.68947C2.11368 6.48043 2.40402 6.36429 2.69436 6.36429C2.9847 6.36429 3.27505 6.48043 3.48409 6.68947L6.8985 10.1155L14.517 2.48534C14.7261 2.27629 15.0164 2.16016 15.3068 2.16016C15.5971 2.16016 15.8875 2.27629 16.0965 2.48534L17.676 4.06479C17.885 4.27384 18.0011 4.56418 18.0011 4.85452Z'
                              fill='#0249E1'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_160_2548'>
                              <rect width='18' height='18' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <span className='text-base text-primary'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='p-4 w-full'>
              <Link
                href='/subscription/edit'
                className={`w-full block py-3 rounded-md text-center font-medium transition-colors bg-button cursor-pointer text-buttonColor
                }`}
              >
                Edit Plan
              </Link>
            </div>
          </div>

          {/* Premium Plan */}
          <div className='max-w-md bg-gradient-to-b from-[#1B1B1B] via-[#373737] to-[#373737] rounded-lg border border-[#676767] overflow-hidden'>
            <div className='px-6 py-8 flex flex-col items-center gap-3'>
              <h3 className='text-primary text-center text-xl font-semibold'>
                Premium Plan
              </h3>
              <p className='text-primary text-5xl font-bold'>$8.00</p>
              <p className='text-sm font-semibold text-primary'>
                Monthly invoice uploads 100
              </p>
            </div>

            <div className=''>
              <div className='p-4'>
                <h4 className='text-primary font-medium mb-3'>
                  Let top creative talent come to you by posting your job
                  listing on #1 Design Jobs Board.
                </h4>
                <ul className='space-y-5'>
                  {features.map((feature, index) => (
                    <li
                      key={index}
                      className='flex items-center gap-2 text-primary'
                    >
                      <div className='rounded-full p-1'>
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 18 18'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <g clip-path='url(#clip0_160_2548)'>
                            <path
                              fill-rule='evenodd'
                              clip-rule='evenodd'
                              d='M18.0011 4.85452C18.0011 5.14486 17.885 5.4352 17.676 5.64425L7.68823 15.632C7.47918 15.841 7.18884 15.9572 6.8985 15.9572C6.60816 15.9572 6.31782 15.841 6.10877 15.632L0.325182 9.84838C0.116136 9.63934 0 9.349 0 9.05866C0 8.76832 0.116136 8.47797 0.325182 8.26893L1.90464 6.68947C2.11368 6.48043 2.40402 6.36429 2.69436 6.36429C2.9847 6.36429 3.27505 6.48043 3.48409 6.68947L6.8985 10.1155L14.517 2.48534C14.7261 2.27629 15.0164 2.16016 15.3068 2.16016C15.5971 2.16016 15.8875 2.27629 16.0965 2.48534L17.676 4.06479C17.885 4.27384 18.0011 4.56418 18.0011 4.85452Z'
                              fill='#0249E1'
                            />
                          </g>
                          <defs>
                            <clipPath id='clip0_160_2548'>
                              <rect width='18' height='18' fill='white' />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <span className='text-base text-primary'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className='p-4 w-full'>
              <Link
                href='/subscription/edit'
                className={`w-full block py-3 rounded-md text-center font-medium transition-colors bg-button cursor-pointer text-buttonColor
                }`}
              >
                Edit Plan
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className='bg-zinc-800 text-white border-zinc-700'>
          <DialogHeader>
            <DialogTitle className='text-xl'>
              Choose Subscription Plan
            </DialogTitle>
          </DialogHeader>

          <div className='py-4'>
            <RadioGroup
              defaultValue={selectedPlan || undefined}
              onValueChange={setSelectedPlan}
            >
              <div className='flex items-center space-x-2 mb-4'>
                <RadioGroupItem value='basic' id='basic' />
                <Label htmlFor='basic' className='text-white'>
                  Basic Plan - Free
                </Label>
              </div>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='premium' id='premium' />
                <Label htmlFor='premium' className='text-white'>
                  Premium Plan - 4.9 /month (39€/year)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <DialogFooter className='flex gap-2 sm:justify-end'>
            <Button
              variant='outline'
              onClick={() => setShowDialog(false)}
              className='bg-transparent border-zinc-600 text-white hover:bg-zinc-700 hover:text-white'
            >
              Cancel
            </Button>
            <Button
              onClick={confirmSubscription}
              className='bg-cyan-400 hover:bg-cyan-500 text-zinc-800'
              disabled={!selectedPlan}
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
