// "use client";

// import { useGetNotificationsQuery } from "@/redux/feature/notificationAPI";
// import { ArrowLeft, Bell, BookCheck } from "lucide-react";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// type INotification = {
//   id: string;
//   type: "payment" | "user_registered";
//   message: string;
//   timestamp: string;
//   read: boolean;
//   is_read?: boolean;
//   created_at: string;
// };

// export default function NotificationsList() {
//   const [loading, setLoading] = useState(true);

//   const { data: notificationsData, isLoading } = useGetNotificationsQuery(
//     undefined,
//     {
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   useEffect(() => {
//     // Simulate fetching notifications from an API
//     const fetchNotifications = async () => {
//       // In a real app, this would be an API call
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       setLoading(false);
//     };

//     fetchNotifications();
//   }, []);

//   if (loading) {
//     return (
//       <div className='flex justify-center items-center py-20'>
//         <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-200'></div>
//       </div>
//     );
//   }

//   return (
//     <div className='px-5'>
//       <div className='min-h-[800px] bg-[#333333] text-white rounded-2xl'>
//         <div className='p-4'>
//           <header className='flex items-center mb-6'>
//             <Link
//               href='/'
//               className='text-[#E6E6E6] hover:text-white transition-colors'
//             >
//               <ArrowLeft className='w-6 h-6' />
//             </Link>
//             <h1 className='ml-4 text-xl font-medium text-[#E6E6E6]'>
//               Notifications
//             </h1>
//           </header>

//           <div className='max-w-2xl mx-auto flex items-center justify-evenly'>
//             <Link
//               href='/notifications/send-notification'
//               className='border border-[#E6E6E6] rounded-full px-5 py-3'
//             >
//               Send Notification to Users
//             </Link>

//             <Link
//               href='/notifications/all-notification'
//               className='border border-[#E6E6E6] rounded-full px-5 py-3'
//             >
//               See all notifications
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NotificationItem from "@/components/notification-item";

export default function NotificationsPage() {
  // Sample notification data here
  const notifications = [
    {
      id: 1,
      type: "payment",
      message: "You have received $500 from John Doe",
      timestamp: "Fri, 12:30pm",
      isRead: false,
    },
    {
      id: 2,
      type: "user",
      message: "New User registered.",
      timestamp: "Fri, 12:30pm",
      isRead: true,
    },
    {
      id: 3,
      type: "user",
      message: "New User registered.",
      timestamp: "Fri, 12:30pm",
      isRead: true,
    },
    {
      id: 4,
      type: "user",
      message: "New User registered.",
      timestamp: "Fri, 12:30pm",
      isRead: true,
    },
  ];

  return (
    <div className='container mx-auto bg-white min-h-[80vh] rounded-lg'>
      <header className='p-4 border-b'>
        <div className='flex items-center'>
          <Link href='/' className='mr-4'>
            <ArrowLeft className='h-5 w-5' />
            <span className='sr-only'>Back</span>
          </Link>
          <h1 className='text-xl font-medium'>Notifications</h1>
        </div>
      </header>

      <div className='divide-y'>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id} notification={notification} />
        ))}
      </div>
    </div>
  );
}
