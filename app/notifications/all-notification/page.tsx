"use client";

import { useGetNotificationsQuery } from "@/redux/feature/notificationAPI";
import { ArrowLeft, Bell, BookCheck } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

type INotification = {
  id: string;
  type: "payment" | "user_registered";
  message: string;
  timestamp: string;
  read: boolean;
  is_read?: boolean;
  created_at: string;
};

export default function NotificationsList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: notificationsData, isLoading } = useGetNotificationsQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    // Simulate fetching notifications from an API
    const fetchNotifications = async () => {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      setLoading(false);
    };

    fetchNotifications();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification?.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center py-20'>
        <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-200'></div>
      </div>
    );
  }


  return (
    <div className='px-5'>
      <div className='min-h-[800px] bg-[#333333] text-white rounded-2xl'>
        <div className='p-4'>
          <header className='flex items-center mb-6'>
            <Link
              href='/'
              className='text-[#E6E6E6] hover:text-white transition-colors'
            >
              <ArrowLeft className='w-6 h-6' />
            </Link>
            <h1 className='ml-4 text-xl font-medium text-[#E6E6E6]'>
              Notifications
            </h1>
          </header>

          <div className='space-y-4'>
            {notificationsData?.notifications?.map(
              (notification: INotification) => (
                <div
                  key={notification?.id}
                  className={`w-full flex items-start justify-between p-4 rounded-lg transition-colors ${
                    notification?.is_read
                      ? "bg-transparent border border-[#8b8888a2]"
                      : "hover:bg-gray-700"
                  } ${notification?.read ? "opacity-70" : ""}`}
                  onClick={() => markAsRead(notification?.id)}
                >
                  <div className='flex items-center justify-between'>
                    <div
                      className={`p-2 rounded-full border border-[#5CE1E6] ${
                        notification?.is_read
                          ? "bg-cyan-500/30 text-[#275F61]"
                          : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      <Bell
                        className={`w-5 h-5 ${
                          notification?.is_read
                            ? "text-[#FFF]"
                            : "text-[#5CE1E6]"
                        }`}
                      />
                    </div>
                    <div className='ml-4 flex-1'>
                      <p
                        className={`font-semibold ${
                          notification?.is_read ? "text-[#3cbcc0]" : ""
                        }`}
                      >
                        {notification?.message}
                      </p>
                      <p
                        className={`text-sm font-semibold mt-1 text-[#3ebabe]`}
                      >
                        {notification?.created_at.split("T")[0]}{" "}
                      </p>
                    </div>
                  </div>

                  {/* <div className='ml-4 flex-shrink-0'>
                    {notification?.is_read ? (
                      <p title="Already Read" className='text-[#5CE1E6]'>
                        <BookCheck className='w-6 h-6' />
                      </p>
                    ) : null}
                  </div> */}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
