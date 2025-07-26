"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";
import {
  useGetAllContactsQuery,
  useUpdateContactStatusMutation,
} from "@/redux/feature/contactAPI";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Mail,
  Calendar,
  MessageSquare,
  Tag,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  category: string;
  phone?: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  createdAt: string;
  updatedAt: string;
}

export interface IUserRequest {
  _id: string;
  name: string;
  email: string;
  message: string;
  category: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ContactsResponse {
  success: boolean;
  message: string;
  data: {
    result: Contact[];
    meta: {
      page: number;
      total: number;
    };
  };
}

export default function ContactsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: contacts, refetch } = useGetAllContactsQuery({
    page: currentPage,
    limit: itemsPerPage,
    status: statusFilter,
  });

  const [updateContactStatus] = useUpdateContactStatusMutation();

  const totalPages = Math.ceil(contacts?.data?.result.length / itemsPerPage);

  const getStatusColor = (
    status:
      | "Pending"
      | "In Progress"
      | "Completed"
      | "Cancelled"
      | "Approved"
      | "Rejected"
  ) => {
    switch (status) {
      case "Pending":
        return "text-base text-orange-400 font-medium border-amber-200";
      case "Completed":
        return "text-base text-green-500 border-emerald-200";
      case "Rejected":
        return "text-base text-red-700 border-red-300";
      default:
        return "text-base text-gray-700 border-gray-200";
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes("Residential")) return "🏠";
    if (category.includes("Commercial")) return "🏢";
    if (category.includes("Construction")) return "🔨";
    if (category.includes("Emergency")) return "🚨";
    return "🧹";
  };

  const handleQuickStatusUpdate = async (status: string, id: string) => {
    try {
      const res = await updateContactStatus({ data: { status }, id }).unwrap();
      console.log(res);
      if (res?.success) {
        toast.success("Contact status updated successfully.");
        await refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update contact status.");
    }
  };

  console.log({ totalPages });

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'>
      <div className='container mx-auto px-4 py-8 max-w-7xl'>
        {/* Header */}
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8'>
          <div className='mb-6 lg:mb-0'>
            <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-2'>
              Contact Management
            </h1>
            <p className='text-gray-600 text-lg'>
              Manage and track all customer inquiries efficiently •{" "}
              {contacts?.data?.meta?.total} contacts
            </p>
          </div>

          {/* backend filtering based on status */}
          <div className='flex items-center'>
            <div>
              <label htmlFor='statusFilter' className='mr-2'>
                Filter by Status:
              </label>
              <select
                id='statusFilter'
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className='border border-gray-300 rounded-md px-2 py-1'
              >
                <option value=''>All</option>
                <option value='Pending'>Pending</option>
                <option value='Completed'>Completed</option>
                <option value='Rejected'>Rejected</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contacts Grid */}
        {contacts?.data?.result?.length > 0 ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8'>
            {contacts?.data?.result?.map((contact: IUserRequest) => (
              <Card className='group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white'>
                <CardHeader className='pb-4'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-center space-x-4'>
                      <div className='relative'>
                        <div className='w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg'>
                          <span className='text-white font-semibold text-sm'>
                            {/* {getInitials(contact.name)} */}
                          </span>
                        </div>
                        <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm'>
                          <span className='text-xs'>
                            {getCategoryIcon(contact.category)}
                          </span>
                        </div>
                      </div>
                      <div className='flex-1 min-w-0'>
                        <h3 className='font-semibold text-lg text-gray-900 truncate'>
                          {contact?.name}
                        </h3>
                        <p
                          className={`text-lg text-gray-600 truncate ${getStatusColor(
                            contact?.status
                          )}`}
                        >
                          {contact?.status}
                        </p>
                      </div>
                    </div>

                    {/* set status drop down */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant='ghost' size='sm'>
                          <MoreHorizontal className='w-6 h-6' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-40'>
                        <DropdownMenuItem
                          onClick={() =>
                            handleQuickStatusUpdate("Completed", contact._id)
                          }
                        >
                          Completed
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleQuickStatusUpdate("Pending", contact._id)
                          }
                        >
                          Pending
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleQuickStatusUpdate("Rejected", contact._id)
                          }
                        >
                          Rejected
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>

                <CardContent className='space-y-4'>
                  <div className='space-y-3'>
                    <div className='flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors'>
                      <div className='w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center'>
                        <Mail className='w-4 h-4' />
                      </div>
                      <span className='text-sm font-medium truncate'>
                        {contact.email}
                      </span>
                    </div>

                    <div className='flex items-start space-x-3 text-gray-600'>
                      <div className='w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mt-0.5'>
                        <Tag className='w-4 h-4' />
                      </div>
                      <div className='flex-1 min-w-0'>
                        <span className='text-sm font-medium text-gray-700 block truncate'>
                          {contact.category}
                        </span>
                      </div>
                    </div>

                    <div className='flex items-start space-x-3 text-gray-600'>
                      <div className='w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mt-0.5'>
                        <MessageSquare className='w-4 h-4' />
                      </div>
                      <p className='text-sm text-gray-700 line-clamp-3 leading-relaxed'>
                        {contact.message}
                      </p>
                    </div>
                  </div>

                  <div className='pt-4 border-t border-gray-100'>
                    <div className='flex items-center justify-between text-xs text-gray-500 mb-4'>
                      <div className='flex items-center space-x-1'>
                        <Calendar className='w-3 h-3' />
                      </div>
                      <span className='px-2 py-1 bg-gray-50 rounded-full'>
                        #{contact._id.slice(-6)}
                      </span>
                    </div>

                    <div className='flex space-x-2'>
                      <Button
                        size='sm'
                        className='flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all'
                      >
                        View Details
                      </Button>
                      <Button
                        size='sm'
                        variant='outline'
                        className='flex-1 hover:bg-gray-50 transition-colors bg-transparent'
                      >
                        Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className='text-center py-12 bg-white/50 rounded-2xl'>
            <Users className='w-16 h-16 text-gray-300 mx-auto mb-4' />
            <h3 className='text-lg font-medium text-gray-900 mb-2'>
              No contacts found
            </h3>
            <p className='text-gray-500 mb-4'>
              No contacts match your current filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages >= 1 && (
          <div className='flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50'>
            <p className='text-sm text-gray-600'>
              Showing{" "}
              <span className='font-medium'>
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className='font-medium'>
                {Math.min(
                  currentPage * itemsPerPage,
                  contacts?.data?.result?.length
                )}
              </span>{" "}
              of{" "}
              <span className='font-medium'>
                {contacts?.data?.result?.length}
              </span>{" "}
              contacts
            </p>
            <div className='flex space-x-2'>
              <Button
                variant='outline'
                size='sm'
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className='bg-white/50'
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant='outline'
                    size='sm'
                    onClick={() => setCurrentPage(page)}
                    className={
                      currentPage === page
                        ? "bg-blue-500 text-white hover:bg-blue-600"
                        : "bg-white/50"
                    }
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant='outline'
                size='sm'
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className='bg-white/50'
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
