"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Calendar,
  MessageSquare,
  Tag,
  MoreHorizontal,
} from "lucide-react";
import { Contact } from "@/app/contacts/page";

interface ContactCardProps {
  contact: Contact;
  onViewDetails: (contact: Contact) => void;
  onStatusUpdate: (contact: Contact) => void;
}

const getStatusColor = (status: Contact["status"]) => {
  switch (status) {
    case "Pending":
      return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
    case "In Progress":
      return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
    case "Completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
  }
};

const getCategoryIcon = (category: string) => {
  if (category.includes("Residential")) return "🏠";
  if (category.includes("Commercial")) return "🏢";
  if (category.includes("Construction")) return "🔨";
  if (category.includes("Emergency")) return "🚨";
  return "🧹";
};

export default function ContactCard({
  contact,
  onViewDetails,
  onStatusUpdate,
}: ContactCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className='group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 bg-white'>
      <CardHeader className='pb-4'>
        <div className='flex items-start justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              <div className='w-12 h-12 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg'>
                <span className='text-white font-semibold text-sm'>
                  {getInitials(contact.name)}
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
                {contact.name}
              </h3>
              <Badge
                className={`${getStatusColor(
                  contact.status
                )} text-xs font-medium px-2 py-1 mt-1`}
              >
                {contact.status}
              </Badge>
            </div>
          </div>
          <Button
            variant='ghost'
            size='sm'
            className='opacity-0 group-hover:opacity-100 transition-opacity'
          >
            <MoreHorizontal className='w-4 h-4' />
          </Button>
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

          {contact.phone && (
            <div className='flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-colors'>
              <div className='w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center'>
                <Phone className='w-4 h-4' />
              </div>
              <span className='text-sm font-medium'>{contact.phone}</span>
            </div>
          )}

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
              <span>{formatDate(contact.createdAt)}</span>
            </div>
            <span className='px-2 py-1 bg-gray-50 rounded-full'>
              #{contact._id.slice(-6)}
            </span>
          </div>

          <div className='flex space-x-2'>
            <Button
              size='sm'
              onClick={() => onViewDetails(contact)}
              className='flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 shadow-md hover:shadow-lg transition-all'
            >
              View Details
            </Button>
            <Button
              size='sm'
              variant='outline'
              onClick={() => onStatusUpdate(contact)}
              className='flex-1 hover:bg-gray-50 transition-colors bg-transparent'
            >
              Update
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
