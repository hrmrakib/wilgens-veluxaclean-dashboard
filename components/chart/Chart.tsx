"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
 
const chartData = [
  { day: 1, thisMonth: 5000, lastMonth: 3000 },
  { day: 2, thisMonth: 8000, lastMonth: 5000 },
  { day: 3, thisMonth: 12000, lastMonth: 8000 },
  { day: 4, thisMonth: 15000, lastMonth: 12000 },
  { day: 5, thisMonth: 18000, lastMonth: 15000 },
  { day: 6, thisMonth: 15090, lastMonth: 17000 },
  { day: 7, thisMonth: 13000, lastMonth: 14000 },
  { day: 8, thisMonth: 16000, lastMonth: 12000 },
  { day: 9, thisMonth: 20000, lastMonth: 16000 },
  { day: 10, thisMonth: 22000, lastMonth: 18000 },
  { day: 11, thisMonth: 19000, lastMonth: 20000 },
  { day: 12, thisMonth: 17000, lastMonth: 19000 },
  { day: 13, thisMonth: 15000, lastMonth: 16000 },
  { day: 14, thisMonth: 18000, lastMonth: 14000 },
  { day: 15, thisMonth: 16000, lastMonth: 12000 },
  { day: 16, thisMonth: 14000, lastMonth: 10000 },
  { day: 17, thisMonth: 12000, lastMonth: 8000 },
  { day: 18, thisMonth: 15000, lastMonth: 12000 },
  { day: 19, thisMonth: 18000, lastMonth: 16000 },
  { day: 20, thisMonth: 20000, lastMonth: 18000 },
];

const chartConfig = {
  thisMonth: {
    label: "This Month",
    color: "#22d3ee",
  },
  lastMonth: {
    label: "Last Month",
    color: "#ec4899",
  },
};

export default function Chart() {
  return (
    <div className='w-full mx-auto p-6 bg-white rounded-lg'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-semibold text-gray-900'>Sale</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='text-sm bg-transparent'>
              7 days
              <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>7 days</DropdownMenuItem>
            <DropdownMenuItem>30 days</DropdownMenuItem>
            <DropdownMenuItem>90 days</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Chart */}
      <ChartContainer config={chartConfig} className='w-full h-[200px]'>
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#f1f5f9'
            vertical={false}
          />
          <XAxis
            dataKey='day'
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            hide
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `${value / 1000}k`}
            domain={[0, 25000]}
            ticks={[0, 5000, 10000, 15000, 20000, 25000]}
            className='text-sm text-gray-500'
          />
          <ChartTooltip
            cursor={false}
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0];
                if (data && data.value) {
                  return (
                    <div className='bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium'>
                      ${data.value.toLocaleString()}
                    </div>
                  );
                }
              }
              return null;
            }}
          />
          <Line
            dataKey='thisMonth'
            type='monotone'
            stroke={chartConfig.thisMonth.color}
            strokeWidth={3}
            dot={false}
            activeDot={{
              r: 4,
              fill: chartConfig.thisMonth.color,
              stroke: "white",
              strokeWidth: 2,
            }}
          />
          <Line
            dataKey='lastMonth'
            type='monotone'
            stroke={chartConfig.lastMonth.color}
            strokeWidth={3}
            strokeDasharray='8 8'
            dot={false}
            activeDot={{
              r: 4,
              fill: chartConfig.lastMonth.color,
              stroke: "white",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ChartContainer>

      {/* Legend */}
      <div className='flex items-center justify-center gap-6 mt-4'>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-blue-500'></div>
          <span className='text-sm text-gray-600'>This Month</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-3 h-3 rounded-full bg-red-400'></div>
          <span className='text-sm text-gray-600'>Last Month</span>
        </div>
      </div>
    </div>
  );
}
