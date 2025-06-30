"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ServiceCard {
  id: string;
  title: string;
  price: string;
  image: string;
}

interface ServiceCategory {
  id: string;
  name: string;
  services: ServiceCard[];
}

export default function CleaningServicesDashboard() {
  const [categories, setCategories] = useState<ServiceCategory[]>([
    {
      id: "residential",
      name: "Residential Cleaning Services",
      services: [
        {
          id: "res1",
          title: "1 Bedroom/ 1 Bathroom1",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "res2",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "res3",
          title: "2 Bedrooms/ 2 Bathrooms",
          price: "Starting Rate $190",
          image: "/service.png",
        },
        {
          id: "res4",
          title: "1 Bedroom/ 1 Bathroom",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "res5",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "res6",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
      ],
    },
    {
      id: "move-in-out",
      name: "Move-In/Move-Out",
      services: [
        {
          id: "move1",
          title: "1 Bedroom/ 1 Bathroom",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "move2",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "move3",
          title: "2 Bedrooms/ 2 Bathrooms",
          price: "Starting Rate $190",
          image: "/service.png",
        },
        {
          id: "move4",
          title: "1 Bedroom/ 1 Bathroom",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "move5",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "move6",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
      ],
    },
    {
      id: "carpet-cleaning",
      name: "Carpet Cleaning Service",
      services: [
        {
          id: "carpet1",
          title: "1 Bedroom/ 1 Bathroom",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "carpet2",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "carpet3",
          title: "2 Bedrooms/ 2 Bathrooms",
          price: "Starting Rate $190",
          image: "/service.png",
        },
        {
          id: "carpet4",
          title: "1 Bedroom/ 1 Bathroom",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "carpet5",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "carpet6",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
      ],
    },
    {
      id: "commercial",
      name: "Commercial Cleaning Service",
      services: [
        {
          id: "comm1",
          title: "1 Bedroom/ 1 Bathroom",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "comm2",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "comm3",
          title: "2 Bedrooms/ 2 Bathrooms",
          price: "Starting Rate $190",
          image: "/service.png",
        },
        {
          id: "comm4",
          title: "1 Bedroom/ 1 Bathroom",
          price: "Starting Rate $150",
          image: "/service.png",
        },
        {
          id: "comm5",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
        {
          id: "comm6",
          title: "2 Bedrooms/ 1 Bathroom",
          price: "Starting Rate $170",
          image: "/service.png",
        },
      ],
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newService, setNewService] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
  });

  const handleAddService = () => {
    if (!newService.title || !newService.price || !newService.category) return;

    const categoryIndex = categories.findIndex(
      (cat) => cat.id === newService.category
    );
    if (categoryIndex === -1) return;

    const updatedCategories = [...categories];
    const newServiceCard: ServiceCard = {
      id: `${newService.category}-${Date.now()}`,
      title: newService.title,
      price: `Starting Rate $${newService.price}`,
      image: "/service.png",
    };

    updatedCategories[categoryIndex].services.push(newServiceCard);
    setCategories(updatedCategories);

    setNewService({ title: "", price: "", category: "", description: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className='w-full min-h-screen bg-linear-to-r from-[#315D62] to-[#6ECEDA] p-4 sm:p-6 lg:p-8'>
      <div className='bg-white w-full rounded-lg p-10'>
        {/* Header */}
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
            Cleaning Services Dashboard
          </h1>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Link
                href='/services/create'
                className='flex items-center bg-[#27484C] hover:bg-slate-700 border border-[#62C1BF] text-white px-3 py-3 rounded-full'
              >
                <Plus className='w-4 h-4 mr-2' />
                Add New Service
              </Link>
            </DialogTrigger>
          </Dialog>
        </div>

        {/* Service Categories */}
        <div className='space-y-12'>
          {categories.map((category) => (
            <div
              key={category.id}
              className='bg-white rounded-lg shadow-sm p-6'
            >
              <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-6'>
                {category.name}
              </h2>

              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
                {category.services.map((service) => (
                  <Link href={`/services/${service.id}`} key={service.id}>
                    <Card
                      key={service.id}
                      className='overflow-hidden shadow-md transition-shadow duration-200 !border-none flex flex-col h-full'
                    >
                      <div className='aspect-[4/3] relative'>
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          width={400}
                          height={300}
                          className='object-cover'
                        />
                      </div>
                      <CardContent className='p-4 flex flex-col justify-between flex-grow'>
                        <h3 className='font-medium text-lg text-[#4A4A4A] mb-2 leading-tight min-h-[2.5rem] flex items-start'>
                          {service.title}
                        </h3>
                        <p className='text-sm text-[#4A4A4A] mt-auto'>
                          {service.price}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
