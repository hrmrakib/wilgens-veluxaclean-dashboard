"use client";

import type React from "react";

import { useState } from "react";
import {
  Bell,
  Send,
  AlertTriangle,
  MessageSquare,
  Clock,
  RefreshCw,
} from "lucide-react";
import { useCreateNotificationMutation } from "@/redux/feature/notificationAPI";

type NotificationType = "message" | "alert" | "reminder" | "update";

interface NotificationData {
  user_id: string;
  type: NotificationType;
  message: string;
  action_url: string;
}

export default function NotificationForm() {
  const [formData, setFormData] = useState<NotificationData>({
    user_id: "all",
    type: "message",
    message: "",
    action_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [sendNotification] = useCreateNotificationMutation();

  const notificationTypes = [
    {
      value: "message",
      label: "Message",
      icon: MessageSquare,
      color: "text-blue-600",
    },
    {
      value: "alert",
      label: "Alert",
      icon: AlertTriangle,
      color: "text-red-600",
    },
    {
      value: "reminder",
      label: "Reminder",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      value: "update",
      label: "Update",
      icon: RefreshCw,
      color: "text-green-600",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.message.trim()) {
      setStatus({ type: "error", message: "Message is required" });
      return;
    }

    // setIsLoading(true);
    setStatus({ type: null, message: "" });

    const data = JSON.stringify({
      user_id: formData.user_id,
      type: formData.type,
      message: formData.message,
      action_url: formData.action_url,
    });

    try {
      const result = await sendNotification(formData).unwrap();

      if (result?.status === "success") {
        setStatus({
          type: "success",
          message: "Notification sent successfully!",
        });
        setFormData({
          user_id: "all",
          type: "message",
          message: "",
          action_url: "",
        });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Failed to send notification",
        });
      }
    } catch (error) {
      setStatus({ type: "error", message: "An unexpected error occurred" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof NotificationData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status.type) {
      setStatus({ type: null, message: "" });
    }
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Status Message */}
        {status.type && (
          <div
            className={`p-4 rounded-md ${
              status.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <div className='flex'>
              <div className='flex-shrink-0'>
                {status.type === "success" ? (
                  <Bell className='h-5 w-5 text-green-400' />
                ) : (
                  <AlertTriangle className='h-5 w-5 text-red-400' />
                )}
              </div>
              <div className='ml-3'>
                <p className='text-sm font-medium'>{status.message}</p>
              </div>
            </div>
          </div>
        )}

        {/* User ID Field */}
        <div>
          <label
            htmlFor='user_id'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Target Users
          </label>
          <select
            id='user_id'
            value={formData.user_id}
            onChange={(e) => handleInputChange("user_id", e.target.value)}
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
          >
            <option value='all'>All Users</option>
            <option value='specific'>Specific User ID</option>
          </select>

          {formData.user_id === "specific" && (
            <input
              type='text'
              placeholder='Enter user ID'
              value={formData.user_id === "all" ? "" : formData.user_id}
              onChange={(e) => handleInputChange("user_id", e.target.value)}
              className='mt-2 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
            />
          )}
        </div>

        {/* Notification Type */}
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-3'>
            Notification Type
          </label>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
            {notificationTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.value}
                  type='button'
                  onClick={() =>
                    handleInputChange("type", type.value as NotificationType)
                  }
                  className={`relative flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                    formData.type === type.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 mb-1 ${
                      formData.type === type.value
                        ? "text-blue-600"
                        : type.color
                    }`}
                  />
                  <span className='text-xs font-medium'>{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor='message'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Message *
          </label>
          <textarea
            id='message'
            rows={4}
            value={formData.message}
            onChange={(e) => handleInputChange("message", e.target.value)}
            placeholder='Enter your notification message...'
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm resize-none'
            required
          />
          <p className='mt-1 text-xs text-gray-500'>
            {formData.message.length}/500 characters
          </p>
        </div>

        {/* Action URL Field */}
        <div>
          <label
            htmlFor='action_url'
            className='block text-sm font-medium text-gray-700 mb-2'
          >
            Action URL (Optional)
          </label>
          <input
            type='url'
            id='action_url'
            value={formData.action_url}
            onChange={(e) => handleInputChange("action_url", e.target.value)}
            placeholder='https://example.com/action'
            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm'
          />
          <p className='mt-1 text-xs text-gray-500'>
            Optional URL for users to take action
          </p>
        </div>

        {/* Submit Button */}
        <div className='pt-4'>
          <button
            type='submit'
            disabled={isLoading || !formData.message.trim()}
            className='w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200'
          >
            {isLoading ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
                Sending...
              </>
            ) : (
              <>
                <Send className='h-4 w-4 mr-2' />
                Send Notification
              </>
            )}
          </button>
        </div>

        {/* Preview */}
        {/* {formData.message && (
          <div className='mt-6 p-4 bg-gray-50 rounded-lg border'>
            <h4 className='text-sm font-medium text-gray-700 mb-2'>Preview</h4>
            <div className='bg-white p-3 rounded border-l-4 border-blue-500'>
              <div className='flex items-center mb-1'>
                {notificationTypes.find((t) => t.value === formData.type)
                  ?.icon && (
                  <div className='mr-2'>
                    {(() => {
                      const Icon = notificationTypes.find(
                        (t) => t.value === formData.type
                      )!.icon;
                      return <Icon className='h-4 w-4 text-blue-600' />;
                    })()}
                  </div>
                )}
                <span className='text-xs font-medium text-gray-600 uppercase'>
                  {formData.type}
                </span>
              </div>
              <p className='text-sm text-gray-800'>{formData.message}</p>
              {formData.action_url && (
                <a
                  href={formData.action_url}
                  className='inline-block mt-2 text-xs text-blue-600 hover:text-blue-800'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  View Action →
                </a>
              )}
            </div>
          </div>
        )} */}
      </form>
    </div>
  );
}
