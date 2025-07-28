"use client";

import { Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import Image from "next/image";
import Chart from "@/components/chart/Chart";
import {
  useGetPaymentQuery,
  useGetStaticsQuery,
} from "@/redux/feature/paymentAPI";
import DetailRow from "@/components/DetailRow";

interface PaymentInfo {
  _id: string;
  amount: number;
  user: {
    name: string;
    email: string;
    image: string;
  };
  service: {
    _id: string;
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
    updatedAt: string;
    __v: number;
  };
  transactionId: string;
  email: string;
  status: "complete" | "pending" | "failed";
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function DashboardContent() {
  const { data } = useGetStaticsQuery();

  return (
    <main className='bg-linear-to-r from-[#315D62] to-[#6ECEDA] w-full p-4 md:p-6'>
      <section className='mb-8'>
        <div className='ontainer mx-auto'>
          <div className='flex items-center gap-14 flex-wrap'>
            <StatCard
              title='Total Earnings'
              value={data?.data?.totalAmount || 0}
              icon='/earning.png'
            />
          </div>
        </div>
      </section>
      <section className='mb-8'>
        <Chart />
      </section>
      <section>
        <TransactionTable />
      </section>
    </main>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  icon: string;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <Card className='overflow-hidden bg-starCardBg w-full md:max-w-[380px] h-[161px] flex items-center'>
      <CardContent className='flex items-center gap-10 p-6 ml-5'>
        <div className=''>
          <Image
            className='object-contain rounded-2xl'
            src={icon}
            alt='icon'
            width={80}
            height={80}
          />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='mb-2 text-starCardColor'>{title}</h3>
          <p className='text-[32px] font-semibold text-starCardColor'>
            {value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function TransactionTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const transactions = [
    {
      id: 447,
      name: "Marvin McKinney",
      subscription: "Basic",
      date: "1 Feb, 2020",
      amount: "$45",
    },
    {
      id: 426,
      name: "Jane Cooper",
      subscription: "Premium",
      date: "21 Sep, 2020",
      amount: "$75",
    },
    {
      id: 922,
      name: "Esther Howard",
      subscription: "Basic",
      date: "24 May, 2020",
      amount: "$45",
    },
    {
      id: 816,
      name: "Darlene Robertson",
      subscription: "Premium",
      date: "24 May, 2020",
      amount: "$75",
    },
    {
      id: 185,
      name: "Cameron Williamson",
      subscription: "Basic",
      date: "17 Oct, 2020",
      amount: "$45",
    },
    {
      id: 738,
      name: "Ronald Richards",
      subscription: "Basic",
      date: "1 Feb, 2020",
      amount: "$45",
    },
    {
      id: 600,
      name: "Jerome Bell",
      subscription: "Premium",
      date: "21 Sep, 2020",
      amount: "$75",
    },
    {
      id: 583,
      name: "Dianne Russell",
      subscription: "Basic",
      date: "8 Sep, 2020",
      amount: "$45",
    },
    {
      id: 177,
      name: "Bessie Cooper",
      subscription: "Basic",
      date: "21 Sep, 2020",
      amount: "$45",
    },
    {
      id: 826,
      name: "Robert Fox",
      subscription: "Premium",
      date: "22 Oct, 2020",
      amount: "$75",
    },
    {
      id: 540,
      name: "Kathryn Murphy",
      subscription: "Basic",
      date: "17 Oct, 2020",
      amount: "$45",
    },
    {
      id: 274,
      name: "Leslie Alexander",
      subscription: "Premium",
      date: "17 Oct, 2020",
      amount: "$75",
    },
  ];

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = transactions.slice(startIndex, endIndex);
  const [selectedYear, setSelectedYear] = useState("2025");
  const [chartData, setChartData] = useState<
    { month: string; amount: number }[]
  >([]);

  const { data: transaction } = useGetPaymentQuery({
    page: currentPage,
    limit: itemsPerPage,
  });
  const totalPages = Math.ceil(transaction?.length / itemsPerPage);

  const openUserModal = (user: any) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className='overflow-hidden !bg-tableBg rounded-md pb-3'>
        <h2 className='text-[32px] font-medium text-primary p-6'>
          Recent Transactions
        </h2>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader className='bg-tableHeaderBg hover:!bg-tableHeaderBg text-tableRowColor py-10'>
              <TableRow className='py-8'>
                <TableHead className='text-tableHeaderColor text-lg text-center'>
                  #Tr.ID
                </TableHead>
                <TableHead className='text-tableHeaderColor text-lg text-center'>
                  User Name
                </TableHead>
                <TableHead className='text-tableHeaderColor text-lg text-center'>
                  Email
                </TableHead>
                <TableHead className='text-tableHeaderColor text-lg text-center'>
                  Amount
                </TableHead>
                <TableHead className='text-tableHeaderColor text-lg text-center'>
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transaction?.data?.result?.map((transaction: PaymentInfo) => (
                <TableRow key={transaction._id}>
                  <TableCell className='font-medium text-lg text-tableRowColor text-center'>
                    {transaction?.transactionId}
                  </TableCell>
                  <TableCell className='text-lg text-tableRowColor text-center'>
                    {transaction?.user?.name}
                  </TableCell>
                  <TableCell className='text-lg text-tableRowColor text-center'>
                    {transaction?.user?.email}
                  </TableCell>
                  <TableCell className='text-lg text-tableRowColor text-center'>
                    {transaction?.service?.price}
                  </TableCell>
                  <TableCell className='text-lg text-tableRowColor text-center'>
                    <Button
                      variant='ghost'
                      size='sm'
                      className='h-8 w-8 p-0'
                      onClick={() => openUserModal(transaction)}
                    >
                      <Info className='h-6 w-6' />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='max-w-sm mx-auto rounded-lg flex items-center justify-between bg-paginationBg px-4 py-3 mt-6'>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className='sr-only'>Previous</span>
              <svg
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </Button>
            <span className='text-sm text-paginationColor'>Previous</span>
          </div>

          <div className='flex items-center gap-1'>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size='sm'
                  className={`h-8 w-8 p-0 ${
                    page === currentPage ? "bg-teal-800 text-white" : ""
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </Button>
              )
            )}
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm text-paginationColor'>Next</span>
            <Button
              variant='outline'
              size='sm'
              className='h-8 w-8 p-0'
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <span className='sr-only'>Next</span>
              <svg
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {isModalOpen && selectedUser && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='relative w-full max-w-md rounded-md bg-[#000000] px-6 py-6 shadow-lg'>
            <button
              onClick={() => setIsModalOpen(false)}
              className='absolute right-4 top-4 text-gray-500 hover:text-gray-700'
            >
              <X className='h-5 w-5' />
              <span className='sr-only'>Close</span>
            </button>

            <h2 className='mb-6 py-5 text-center text-[30px] font-semibold text-[#E6E6E6]'>
              User Details
            </h2>

            <div className='space-y-6'>
              <DetailRow label='Transaction ID:' value={selectedUser?._id} />
              <DetailRow label='User Name' value={selectedUser?.user?.name} />
              <DetailRow label='Email' value={selectedUser?.email} />
              <DetailRow
                label='Service Name'
                value={selectedUser?.service?.serviceName}
              />
              <DetailRow
                label='Category'
                value={selectedUser?.service?.category}
              />
              <DetailRow label='Price' value={selectedUser?.service?.price} />
              <DetailRow
                label='Payment Date'
                value={selectedUser?.createdAt.split("T")[0]}
              />
            </div>

            <Button
              onClick={() => setIsModalOpen(false)}
              className='mt-6 w-full bg-[#45b1b4] hover:bg-[#5ce1e6b7]'
            >
              Okay
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
