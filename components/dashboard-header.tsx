"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();

  if (
    pathname === "/signin" ||
    pathname === "/create-account" ||
    pathname === "/forget-password" ||
    pathname === "/verify-password" ||
    pathname === "/verify-otp" ||
    pathname === "/reset-password"
  ) {
    return null;
  }

  return (
    <div className='bg-transparent w-full'>
      <header className='w-[98%] mx-auto sticky top-0 z-20 flex h-[90px] items-center justify-between bg-headerBg px-4 text-white border-[.02px] border-borderColor rounded-md md:px-6 my-6'>
        <div className='flex items-center gap-4'>
          <SidebarTrigger className='text-white md:hidden' />
          <div>
            <h1 className='text-2xl font-medium'>Welcome,</h1>
            <p className='text-sm opacity-80'>Have a nice day</p>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            {/* <Link href='/setting/personal-information'>
              <Avatar>
                <AvatarImage
                  src={`/admin.png`}
                  alt={userProfile?.full_name}
                />
                <AvatarFallback>
                  {userProfile?.full_name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </Link> */}
            <span className='hidden md:inline'>Admin</span>
          </div>
        </div>
      </header>
    </div>
  );
}
