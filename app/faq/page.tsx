"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import {
  useCreateFaqMutation,
  useDeleteFaqMutation,
  useGetFaqQuery,
  useUpdateFaqMutation,
} from "@/redux/feature/faqAPI";

export interface IFaq {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

export default function FAQDashboard() {
  const [faqs, setFaqs] = useState([]);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<IFaq | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [formData, setFormData] = useState({
    _id: "",
    question: "",
    answer: "",
  });

  const { data: faq, refetch } = useGetFaqQuery();
  const [updateFaq] = useUpdateFaqMutation();
  const [deleteFaq] = useDeleteFaqMutation();
  const [createFaq] = useCreateFaqMutation();

  const resetForm = () => {
    setFormData({
      _id: "",
      question: "",
      answer: "",
    });
  };

  const handleAddFAQ = async () => {
    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Error");
      return;
    }

    try {
      const res = await createFaq({
        question: formData.question,
        answer: formData.answer,
      });

      if (res.data?.success) {
        toast.success(res.data.message);
        refetch();
      }
    } catch (error) {
      toast.error("Error");
      console.error("Error submitting form:", error);
    } finally {
      resetForm();
      setIsAddDialogOpen(false);
      toast("Success");
    }
  };

  const handleEditFAQ = async () => {
    if (!formData.question.trim() || !formData.answer.trim() || !editingFAQ) {
      toast("Error");
      return;
    }

    try {
      const res = await updateFaq({
        data: {
          question: formData.question,
          answer: formData.answer,
        },
        id: formData._id,
      }).unwrap();

      console.log(res);

      if (res?.success) {
        toast.success(res.message);
        refetch();
      }
    } catch (error) {
      toast("Error");
      console.error("Error submitting form:", error);
    } finally {
      setIsEditDialogOpen(false);
      resetForm();
      setEditingFAQ(null);
      toast("Success");
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    const res = await deleteFaq(id);
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      refetch();
    }
  };

  const openEditDialog = (faq: IFaq) => {
    setEditingFAQ(faq);
    setFormData({
      _id: faq._id,
      question: faq.question,
      answer: faq.answer,
    });
    setIsEditDialogOpen(true);
  };

  const toggleFAQExpansion = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className='container mx-auto p-6 space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-white'>FAQ Management</h1>
          <p className='text-gray-300'>
            Manage your frequently asked questions
          </p>
        </div>

        {/* Add FAQ */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="!bg-teal-800">
              <Plus className='w-4 h-4 mr-2' />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[600px]'>
            <DialogHeader>
              <DialogTitle className='text-white'>Add New FAQ</DialogTitle>
              <DialogDescription className='text-gray-300'>
                Create a new frequently asked question for your users.
              </DialogDescription>
            </DialogHeader>
            <div className='grid gap-4 py-4'>
              <div className='grid gap-2'>
                <Label htmlFor='question'>Question *</Label>
                <Input
                  id='question'
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder='Enter the question'
                  className='!bg-gray-100 text-black !px-3 !py-5 h-14'
                />
              </div>
              <div className='grid gap-2'>
                <Label htmlFor='answer'>Answer *</Label>
                <Textarea
                  id='answer'
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  placeholder='Enter the answer'
                  rows={4}
                  className='!bg-gray-100 text-black !text-base'
                />
              </div>
            </div>
            <div className='flex justify-end gap-2'>
              <Button
                variant='outline'
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleAddFAQ} className='bg-button hover:bg-button text-black'>
                Add FAQ
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* FAQ List */}
      <Card>
        <CardHeader>
          <CardTitle>FAQ List ({faq?.data?.meta?.total})</CardTitle>
          <CardDescription>
            Manage your frequently asked questions
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          {faq?.data?.result.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
              No FAQs found matching your filters.
            </div>
          ) : (
            faq?.data?.result?.map((faq: IFaq) => (
              <div key={faq._id} className='border rounded-lg p-4 space-y-3'>
                <div className='flex items-start justify-between gap-4'>
                  <div className='flex-1 space-y-2'>
                    <div className='flex items-center gap-2 flex-wrap'>
                      <span className='text-xs text-muted-foreground'>
                        Updated: {faq.updatedAt.split("T")[0]}
                      </span>
                    </div>
                    <button
                      onClick={() => toggleFAQExpansion(faq._id)}
                      className='flex items-center justify-between w-full text-left group'
                    >
                      <h3 className='font-medium text-lg group-hover:text-primary transition-colors'>
                        {faq.question}
                      </h3>
                      {expandedFAQ === faq._id ? (
                        <ChevronUp className='w-4 h-4 text-muted-foreground' />
                      ) : (
                        <ChevronDown className='w-4 h-4 text-muted-foreground' />
                      )}
                    </button>
                    {expandedFAQ === faq._id && (
                      <div className='pt-2 pb-1'>
                        <p className='text-muted-foreground leading-relaxed'>
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => openEditDialog(faq)}
                    >
                      <Edit className='w-4 h-4' />
                    </Button>

                    <Button
                      onClick={() => handleDeleteFAQ(faq._id)}
                      variant='outline'
                      size='sm'
                    >
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className='sm:max-w-[600px]'>
          <DialogHeader>
            <DialogTitle className='text-white'>Edit FAQ</DialogTitle>
            <DialogDescription className='text-gray-300'>
              Update the frequently asked question.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid gap-2'>
              <Label htmlFor='edit-question'>Question *</Label>
              <Input
                id='edit-question'
                value={formData.question}
                onChange={(e) =>
                  setFormData({ ...formData, question: e.target.value })
                }
                placeholder='Enter the question'
                className='!bg-gray-100 text-black !px-3 !py-5 h-14'
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='edit-answer'>Answer *</Label>
              <Textarea
                id='edit-answer'
                value={formData.answer}
                onChange={(e) =>
                  setFormData({ ...formData, answer: e.target.value })
                }
                placeholder='Enter the answer'
                rows={4}
                className='!bg-gray-100 text-black !px-3 !py-5 h-14'
              />
            </div>
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleEditFAQ}>Update FAQ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
