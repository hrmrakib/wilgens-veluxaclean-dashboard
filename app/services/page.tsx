"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  useDeleteServiceMutation,
  useGetAllServicesQuery,
} from "@/redux/feature/servicesAPI";
import { toast } from "sonner";

interface IService {
  _id: string | number;
  serviceName: string;
  category: string;
  details: string;
  price: number;
  additionalServices: {
    [key: string]: number;
  };
  image: string;
  isDeleted: boolean;
  createdAt: string;
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | number | null>(null);
  const [openCategory, setOpenCategory] = useState<boolean>(true);
  const { data: services, refetch } = useGetAllServicesQuery({});
  const [deleteService] = useDeleteServiceMutation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("services-page");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const scrollToCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (categoryId !== "all") {
      const element = document.getElementById(`category-${categoryId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const carpetCount =
    services?.data?.result?.["Carpet Cleaning Service"]?.length;
  const residentialCount =
    services?.data?.result?.["Residential Cleaning Services"]?.length;
  const commercialCount =
    services?.data?.result?.["Commercial Cleaning Service"]?.length;
  const moveCount =
    services?.data?.result?.["Move-in/Move-out Cleaning"]?.length;

  const categories = [
    {
      id: "all",
      name: "All Categories",
      count: carpetCount + residentialCount + commercialCount + moveCount,
    },
    {
      id: "Carpet Cleaning Service",
      name: "Carpet Cleaning Service",
      count: carpetCount,
    },
    {
      id: "Residential Cleaning Services",
      name: "Residential Cleaning Services",
      count: residentialCount,
    },
    {
      id: "Commercial Cleaning Service",
      name: "Commercial Cleaning Service",
      count: commercialCount,
    },
    {
      id: "Move-in/Move-out Cleaning",
      name: "Move-in/Move-out Cleaning",
      count: moveCount,
    },
  ];

  const handleServiceClick = (serviceId: string | number) => {
    console.log(`Service ${serviceId} clicked`);
  };

  const handleBookNow = (serviceId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Book now clicked for service ${serviceId}`);
  };

  const handleDelete = async (serviceId: string | number) => {
    const res = await deleteService(String(serviceId));
    if (res?.data?.success) {
      toast.success(res?.data?.message);
      refetch();
    }
  };

  const renderServiceCard = (service: IService, index: number) => (
    <div key={service._id}>
      <Card
        key={service._id}
        className={`group cursor-pointer transition-all duration-700 hover:shadow-xl hover:-translate-y-2 overflow-hidden ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        onMouseEnter={() => setHoveredCard(service._id)}
        onMouseLeave={() => setHoveredCard(null)}
        onClick={() => handleServiceClick(service._id)}
      >
        <CardContent className='p-0 h-full flex flex-col'>
          {/* Image */}
          <div className='relative overflow-hidden'>
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${service.image}`}
              alt={service?.serviceName}
              className='w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105'
              width={300}
              height={200}
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          </div>

          {/* Content */}
          <div className='p-4 flex-grow flex flex-col'>
            {/* Title */}
            <h3 className='text-base font-bold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors duration-300 line-clamp-2'>
              {service?.serviceName}
            </h3>

            {/* Price and Book Button */}
            <div className='mt-auto flex items-center justify-between'>
              <div className='flex items-center space-x-1'>
                <span className='text-lg font-bold text-cyan-600'>
                  Starting from ${service?.price}
                </span>
              </div>
              <div className='flex gap-2'>
                <Link
                  href={`/services/${service._id}`}
                  className={`text-xs px-3 py-1 transition-all flex items-center justify-center rounded-lg text-white duration-300 ${
                    hoveredCard === service._id
                      ? "bg-cyan-600 hover:bg-cyan-700 scale-105"
                      : "bg-cyan-500 hover:bg-cyan-600"
                  }`}
                >
                  Edit
                </Link>
                <Button
                  size='sm'
                  className={`text-xs px-3 py-1 transition-all duration-300 ${
                    hoveredCard === service._id
                      ? "bg-red-600 hover:bg-red-700 scale-105"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                  onClick={(e) => handleDelete(service._id)}
                >
                  Drop
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <section
      id='services-page'
      className='py-8 lg:py-12 min-h-screen'
      style={{
        background:
          "radial-gradient(61.56% 61.56% at 50% 50%, rgba(21, 178, 245, 0.0816) 0%, rgba(110, 206, 218, 0.0408) 100%)",
      }}
    >
      <div className='container mx-auto px-5'>
        <div className=' gap-8'>
          {/* Sidebar - Categories */}
          <div
            className={`lg:col-span-1 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className='bg-[#f5f5f5b6] rounded-lg shadow-sm p-6 sticky top-8'>
              <div
                className={`flex items-center justify-between ${
                  openCategory ? "pb-2.5" : "pb-0"
                }`}
              >
                <h2 className='text-xl font-bold text-gray-900'>Categories</h2>
                <p className='flex md:hidden cursor-pointer'>
                  {openCategory ? (
                    <span onClick={() => setOpenCategory(false)}>hide</span>
                  ) : (
                    <span onClick={() => setOpenCategory(true)}>show</span>
                  )}
                </p>
              </div>
              {openCategory && (
                <div className='flex space-x-2'>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => scrollToCategory(category.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-300 flex items-center justify-between group ${
                        activeCategory === category.id
                          ? "bg-cyan-500 text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
                      }`}
                    >
                      <span className='font-medium text-sm'>
                        {category.name}
                      </span>
                      {/* <Badge
                        variant='secondary'
                        className={`text-xs ${
                          activeCategory === category.id
                            ? "bg-white/20 text-white"
                            : "bg-gray-200 text-gray-600 group-hover:bg-cyan-100 group-hover:text-cyan-700"
                        }`}
                      >
                        {category.count}
                      </Badge> */}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Main Content - All Services by Category */}
          <div className='space-y-12'>
            {/* Page Header */}
            <div
              className={`transition-all duration-1000 delay-300 mt-6 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className='text-3xl  font-bold text-gray-100 mb-2'>
                All Services by Category
              </h1>
              <p className='text-gray-100'>
                Comprehensive cleaning solutions for every need. Browse our
                complete catalog of professional services.
              </p>
            </div>

            {/* Carpet Cleaning Service */}
            <div
              id='category-Carpet Cleaning Service'
              className='space-y-6 -mt-12'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-white'>
                  Carpet Cleaning Service
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6'>
                {services?.data?.result?.["Carpet Cleaning Service"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}
              </div>
            </div>

            {/* Residential Cleaning Services */}
            <div
              id='category-Residential Cleaning Services'
              className='space-y-6'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-white'>
                  Residential Cleaning Services
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {services?.data?.result?.["Residential Cleaning Services"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}
              </div>
            </div>

            {/* Carpet Cleaning Service */}
            <div
              id='category-Commercial Cleaning Service'
              className='space-y-6'
            >
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-white'>
                  Carpet Cleaning Service
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {services?.data?.result?.["Commercial Cleaning Service"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}
              </div>
            </div>

            {/* Move-in/Move-out Cleaning */}
            <div id='category-Move-in/Move-out Cleaning' className='space-y-6'>
              <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold text-white'>
                  Move-in/Move-out Cleaning
                </h2>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10'>
                {services?.data?.result?.["Move-in/Move-out Cleaning"]?.map(
                  (service: IService, index: number) =>
                    renderServiceCard(service, index)
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { Plus } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";

// interface ServiceCard {
//   id: string;
//   title: string;
//   price: string;
//   image: string;
// }

// interface ServiceCategory {
//   id: string;
//   name: string;
//   services: ServiceCard[];
// }

// export default function CleaningServicesDashboard() {
//   const [categories, setCategories] = useState<ServiceCategory[]>([
//     {
//       id: "residential",
//       name: "Residential Cleaning Services",
//       services: [
//         {
//           id: "res1",
//           title: "1 Bedroom/ 1 Bathroom1",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "res2",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "res3",
//           title: "2 Bedrooms/ 2 Bathrooms",
//           price: "Starting Rate $190",
//           image: "/service.png",
//         },
//         {
//           id: "res4",
//           title: "1 Bedroom/ 1 Bathroom",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "res5",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "res6",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//       ],
//     },
//     {
//       id: "move-in-out",
//       name: "Move-In/Move-Out",
//       services: [
//         {
//           id: "move1",
//           title: "1 Bedroom/ 1 Bathroom",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "move2",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "move3",
//           title: "2 Bedrooms/ 2 Bathrooms",
//           price: "Starting Rate $190",
//           image: "/service.png",
//         },
//         {
//           id: "move4",
//           title: "1 Bedroom/ 1 Bathroom",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "move5",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "move6",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//       ],
//     },
//     {
//       id: "carpet-cleaning",
//       name: "Carpet Cleaning Service",
//       services: [
//         {
//           id: "carpet1",
//           title: "1 Bedroom/ 1 Bathroom",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "carpet2",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "carpet3",
//           title: "2 Bedrooms/ 2 Bathrooms",
//           price: "Starting Rate $190",
//           image: "/service.png",
//         },
//         {
//           id: "carpet4",
//           title: "1 Bedroom/ 1 Bathroom",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "carpet5",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "carpet6",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//       ],
//     },
//     {
//       id: "commercial",
//       name: "Commercial Cleaning Service",
//       services: [
//         {
//           id: "comm1",
//           title: "1 Bedroom/ 1 Bathroom",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "comm2",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "comm3",
//           title: "2 Bedrooms/ 2 Bathrooms",
//           price: "Starting Rate $190",
//           image: "/service.png",
//         },
//         {
//           id: "comm4",
//           title: "1 Bedroom/ 1 Bathroom",
//           price: "Starting Rate $150",
//           image: "/service.png",
//         },
//         {
//           id: "comm5",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//         {
//           id: "comm6",
//           title: "2 Bedrooms/ 1 Bathroom",
//           price: "Starting Rate $170",
//           image: "/service.png",
//         },
//       ],
//     },
//   ]);

//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [newService, setNewService] = useState({
//     title: "",
//     price: "",
//     category: "",
//     description: "",
//   });

//   const handleAddService = () => {
//     if (!newService.title || !newService.price || !newService.category) return;

//     const categoryIndex = categories.findIndex(
//       (cat) => cat.id === newService.category
//     );
//     if (categoryIndex === -1) return;

//     const updatedCategories = [...categories];
//     const newServiceCard: ServiceCard = {
//       id: `${newService.category}-${Date.now()}`,
//       title: newService.title,
//       price: `Starting Rate $${newService.price}`,
//       image: "/service.png",
//     };

//     updatedCategories[categoryIndex].services.push(newServiceCard);
//     setCategories(updatedCategories);

//     setNewService({ title: "", price: "", category: "", description: "" });
//     setIsDialogOpen(false);
//   };

//   return (
//     <div className='w-full min-h-screen bg-linear-to-r from-[#315D62] to-[#6ECEDA] p-4 sm:p-6 lg:p-8'>
//       <div className='bg-white w-full rounded-lg p-10'>
//         {/* Header */}
//         <div className='flex justify-between items-center mb-8'>
//           <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>
//             Cleaning Services Dashboard
//           </h1>
//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogTrigger asChild>
//               <Link
//                 href='/services/create'
//                 className='flex items-center bg-[#27484C] hover:bg-slate-700 border border-[#62C1BF] text-white px-3 py-3 rounded-full'
//               >
//                 <Plus className='w-4 h-4 mr-2' />
//                 Add New Service
//               </Link>
//             </DialogTrigger>
//           </Dialog>
//         </div>

//         {/* Service Categories */}
//         <div className='space-y-12'>
//           {categories.map((category) => (
//             <div
//               key={category.id}
//               className='bg-white rounded-lg shadow-sm p-6'
//             >
//               <h2 className='text-xl sm:text-2xl font-semibold text-gray-800 mb-6'>
//                 {category.name}
//               </h2>

//               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4'>
//                 {category.services.map((service) => (
//                   <Link href={`/services/${service.id}`} key={service.id}>
//                     <Card
//                       key={service.id}
//                       className='overflow-hidden shadow-md transition-shadow duration-200 !border-none flex flex-col h-full'
//                     >
//                       <div className='aspect-[4/3] relative'>
//                         <Image
//                           src={service.image || "/placeholder.svg"}
//                           alt={service.title}
//                           width={400}
//                           height={300}
//                           className='object-cover'
//                         />
//                       </div>
//                       <CardContent className='p-4 flex flex-col justify-between flex-grow'>
//                         <h3 className='font-medium text-lg text-[#4A4A4A] mb-2 leading-tight min-h-[2.5rem] flex items-start'>
//                           {service.title}
//                         </h3>
//                         <p className='text-sm text-[#4A4A4A] mt-auto'>
//                           {service.price}
//                         </p>
//                       </CardContent>
//                     </Card>
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
