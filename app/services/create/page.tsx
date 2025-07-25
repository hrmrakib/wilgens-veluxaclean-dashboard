"use client";
import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { CloudUpload, Edit2, Check, X, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { useCreateServiceMutation } from "@/redux/feature/servicesAPI";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  isEditing?: boolean;
}

interface ServiceCategory {
  id: string;
  name: string;
}

export default function CreateCategoryPage() {
  const [formData, setFormData] = useState({
    serviceName: "",
    details: "",
    price: 0,
  });
  const [additionalCostEnabled, setAdditionalCostEnabled] = useState(true);

  const [additionalServices, setAdditionalServices] = useState<
    AdditionalService[]
  >([
    {
      id: "deep-cleaning",
      name: "Deep Cleaning",
      price: 50,
      selected: false,
      isEditing: false,
    },
    {
      id: "window-cleaning",
      name: "Interior Pet Window Cleaning",
      price: 12,
      selected: false,
      isEditing: false,
    },
    {
      id: "pet-hair",
      name: "Pet Hair Removal",
      price: 56,
      selected: false,
      isEditing: false,
    },
    {
      id: "fridge-cleaning",
      name: "Inside Fridge Cleaning",
      price: 78,
      selected: false,
      isEditing: false,
    },
    {
      id: "cabinet-cleaning",
      name: "Inside Cabinets",
      price: 70,
      selected: false,
      isEditing: false,
    },
    {
      id: "carpet-shampooing",
      name: "Deep Carpet Shampooing",
      price: 10,
      selected: false,
      isEditing: false,
    },
    {
      id: "oven-cleaning",
      name: "Inside Oven Cleaning",
      price: 10,
      selected: false,
      isEditing: false,
    },
    {
      id: "pet-treatment",
      name: "Pet Stain & Odor Treatment",
      price: 25,
      selected: false,
      isEditing: false,
    },
  ]);

  const serviceCategories: ServiceCategory[] = [
    {
      id: "carpet-cleaning",
      name: "Carpet Cleaning Service",
    },
    {
      id: "residential-cleaning",
      name: "Residential Cleaning Services",
    },
    {
      id: "commercial-cleaning",
      name: "Commercial Cleaning Service",
    },
    {
      id: "move-cleaning",
      name: "Move-in/Move-out Cleaning",
    },
  ];

  const [editingValues, setEditingValues] = useState<{
    [key: string]: { name: string; price: number };
  }>({});

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const params = useParams();
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [currentSelection, setCurrentSelection] = useState<string>("");

  const addService = (serviceId: string) => {
    if (serviceId && !selectedServices.includes(serviceId)) {
      setSelectedServices([...selectedServices, serviceId]);
      setCurrentSelection("");
    }
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(selectedServices.filter((id) => id !== serviceId));
  };

  const getServiceById = (id: string) =>
    serviceCategories.find((service) => service.id === id);

  const [createService] = useCreateServiceMutation();

  const handleInputChange = (
    field: string,
    value: string | boolean | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceToggle = (serviceId: string) => {
    setAdditionalServices((prev) =>
      prev.map((service) =>
        service.id === serviceId
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  const handleEditService = (serviceId: string) => {
    const service = additionalServices.find((s) => s.id === serviceId);
    if (service) {
      setEditingValues((prev) => ({
        ...prev,
        [serviceId]: { name: service.name, price: service.price },
      }));
      setAdditionalServices((prev) =>
        prev.map((s) => (s.id === serviceId ? { ...s, isEditing: true } : s))
      );
    }
  };

  const handleSaveEdit = (serviceId: string) => {
    const editValues = editingValues[serviceId];
    if (editValues) {
      setAdditionalServices((prev) =>
        prev.map((service) =>
          service.id === serviceId
            ? {
                ...service,
                name: editValues.name,
                price: Number(editValues.price),
                isEditing: false,
              }
            : service
        )
      );
      setEditingValues((prev) => {
        const newValues = { ...prev };
        delete newValues[serviceId];
        return newValues;
      });
    }
  };

  const handleCancelEdit = (serviceId: string) => {
    setAdditionalServices((prev) =>
      prev.map((service) =>
        service.id === serviceId ? { ...service, isEditing: false } : service
      )
    );
    setEditingValues((prev) => {
      const newValues = { ...prev };
      delete newValues[serviceId];
      return newValues;
    });
  };

  const handleEditValueChange = (
    serviceId: string,
    field: "name" | "price",
    value: string
  ) => {
    setEditingValues((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        [field]: value,
      },
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        setUploadedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPEG, PNG, or JPG image.",
          variant: "destructive",
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith("image/")) {
        setUploadedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a JPEG, PNG, or JPG image.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSave = async () => {
    const selectedServices = additionalServices
      .filter((s) => s.selected)
      .reduce((acc, curr) => {
        acc[curr.name] = Number(curr.price);
        return acc;
      }, {} as { [key: string]: number });

    if (Object.keys(selectedServices).length === 0) {
      toast({
        title: "No services selected",
        description: "Please select at least one service.",
        variant: "destructive",
      });
      return;
    }

    const categoryData = {
      ...formData,
      category: getServiceById(currentSelection)?.name || "",
      additionalServices: selectedServices,
    };

    const formDataToSend = new FormData();

    if (uploadedFile) {
      formDataToSend.append("image", uploadedFile);
    }

    formDataToSend.append("data", JSON.stringify(categoryData));

    try {
      const res = await createService(formDataToSend).unwrap();

      console.log(res);

      toast({
        title: "✅ Service Updated",
        description: `${formData.serviceName} updated successfully!`,
      });
    } catch (error) {
      toast({
        title: "❌ Update Failed",
        description: "Something went wrong while updating the service.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-r from-[#315D62] to-[#6ECEDA] p-4 sm:p-6 lg:p-8'>
      <div className='bg-white w-full rounded-lg p-10'>
        <Card className='bg-white max-w-3xl mx-auto rounded-2xl overflow-hidden'>
          <CardContent className='p-6 sm:p-8'>
            <h1 className='text-2xl sm:text-3xl font-bold text-[#4A4A4A] mb-8'>
              Create New Category
            </h1>
            <div className='space-y-6'>
              {/* Service Name */}
              <div className='space-y-2'>
                <Label
                  htmlFor='serviceName'
                  className='text-lg font-medium text-[#4A4A4A]'
                >
                  Service Name
                </Label>
                <Input
                  id='serviceName'
                  value={formData.serviceName}
                  onChange={(e) =>
                    handleInputChange("serviceName", e.target.value)
                  }
                  type='text'
                  name='serviceName'
                  placeholder='Service Name'
                  className='w-full px-4 py-3 bg-transparent text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>
              {/* Details */}
              <div className='space-y-2'>
                <Label
                  htmlFor='details'
                  className='text-lg font-medium text-[#4A4A4A]'
                >
                  Details
                </Label>
                <Textarea
                  id='details'
                  value={formData.details}
                  onChange={(e) => handleInputChange("details", e.target.value)}
                  placeholder='Details'
                  rows={4}
                  className='w-full px-4 py-3 !text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none'
                />
              </div>

              {/* Category */}
              <div className='space-y-6'>
                {/* Service Selection */}
                <h2 className='flex items-center gap-2'>
                  <Sparkles className='w-5 h-5 text-blue-600' />
                  Add Category
                </h2>
                <Select
                  value={currentSelection}
                  onValueChange={(value) => setCurrentSelection(value)}
                >
                  <SelectTrigger className='w-full'>
                    <SelectValue
                      placeholder='Select a cleaning service...'
                      defaultValue=''
                      className='text-black'
                    >
                      {currentSelection &&
                        serviceCategories.find((s) => s.id === currentSelection)
                          ?.name}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className='shadow-none'>
                    {serviceCategories.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <div className='flex items-center justify-between w-full'>
                          <div className='flex items-center gap-2'>
                            <span className='font-medium'>{service.name}</span>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className='space-y-2'>
                <Label
                  htmlFor='price'
                  className='text-lg font-medium text-[#4A4A4A]'
                >
                  Price
                </Label>
                <Input
                  id='price'
                  type='number'
                  value={formData.price}
                  // onChange={(e) => handleInputChange("price", e.target.value)}
                  onChange={(e) =>
                    setFormData({ ...formData, price: Number(e.target.value) })
                  }
                  placeholder='Price: $45'
                  className='w-full px-4 py-3 bg-transparent text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent'
                />
              </div>
              {/* Additional Cost Toggle */}
              <div className='space-y-4'>
                <Label className='text-lg font-medium text-[#4A4A4A]'>
                  Additional Cost
                </Label>
                <div className='flex items-center space-x-3 p-4 border border-gray-200 rounded-lg'>
                  <Switch
                    checked={additionalCostEnabled}
                    onCheckedChange={(checked) =>
                      setAdditionalCostEnabled(checked)
                    }
                    className='data-[state=checked]:bg-teal-500'
                  />
                  <span className='text-lg text-gray-600'>
                    Additional Residential Service Cost
                  </span>
                </div>
              </div>
              {/* Additional Services Grid */}
              {additionalCostEnabled && (
                <div className='space-y-4'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
                    {additionalServices.map((service) => (
                      <div
                        key={service.id}
                        className={`relative p-3 border rounded-lg transition-all duration-200 ${
                          service.selected
                            ? "border-teal-500 bg-teal-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        {service.isEditing ? (
                          <div className='space-y-2'>
                            <Input
                              value={editingValues[service.id]?.name || ""}
                              onChange={(e) =>
                                handleEditValueChange(
                                  service.id,
                                  "name",
                                  e.target.value
                                )
                              }
                              className='text-sm font-medium'
                              placeholder='Service name'
                            />
                            <Input
                              value={editingValues[service.id]?.price || ""}
                              onChange={(e) =>
                                handleEditValueChange(
                                  service.id,
                                  "price",
                                  e.target.value
                                )
                              }
                              className='text-xs'
                              placeholder='Price'
                            />
                            <div className='flex gap-1 mt-2'>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => handleSaveEdit(service.id)}
                                className='h-6 w-6 p-0 text-green-600 hover:text-green-700'
                              >
                                <Check className='h-3 w-3' />
                              </Button>
                              <Button
                                size='sm'
                                variant='ghost'
                                onClick={() => handleCancelEdit(service.id)}
                                className='h-6 w-6 p-0 text-red-600 hover:text-red-700'
                              >
                                <X className='h-3 w-3' />
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleServiceToggle(service.id)}
                              className='w-full text-left'
                            >
                              <div
                                className={`text-lg font-medium ${
                                  service.selected
                                    ? "text-teal-700"
                                    : "text-gray-600"
                                }`}
                              >
                                {service.name}
                              </div>
                              <div className='text-xs text-gray-500 mt-1'>
                                {service.price}
                              </div>
                            </button>
                            <Button
                              size='sm'
                              variant='ghost'
                              onClick={() => handleEditService(service.id)}
                              className='absolute top-2 right-2 h-6 w-6 p-0 text-gray-400 hover:text-gray-600'
                            >
                              <Edit2 className='h-3 w-3' />
                            </Button>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Upload Image */}
              <div className='space-y-4'>
                <Label className='text-lg font-medium text-[#4A4A4A]'>
                  Upload Image
                </Label>
                <div
                  className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-teal-500 bg-teal-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    type='file'
                    accept='image/jpeg,image/png,image/jpg'
                    onChange={handleFileSelect}
                    className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
                  />
                  <div className='space-y-4'>
                    <div className='mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center'>
                      <CloudUpload className='w-8 h-8 text-teal-500' />
                    </div>
                    <div>
                      <h3 className='text-lg font-medium text-[#4A4A4A] mb-2'>
                        Upload Image
                      </h3>
                      {uploadedFile ? (
                        <p className='text-lg text-teal-600 font-medium'>
                          {uploadedFile.name}
                        </p>
                      ) : (
                        <Button
                          type='button'
                          variant='outline'
                          className='border-teal-500 text-teal-600 hover:bg-teal-50 bg-transparent'
                        >
                          Select File
                        </Button>
                      )}
                    </div>
                    <p className='text-xs text-gray-500'>
                      Supported formats: JPEG, PNG, JPG (mobile phone photos)
                    </p>
                  </div>
                </div>
              </div>
              {/* Save Button */}
              <div className='pt-6'>
                <button
                  onClick={handleSave}
                  className='w-full bg-[#6ECEDA] hover:bg-[#5adef0] text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors'
                >
                  Update
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
