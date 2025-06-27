"use client";

import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

interface EarningsData {
  month: string;
  amount: number;
}

Chart.register(...registerables);

interface EarningsChartProps {
  data: EarningsData[];
}

export function EarningsChart({ data }: EarningsChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.map((item) => item.month),
        datasets: [
          {
            label: "Earnings",
            data: data.map((item) => item.amount),
            backgroundColor: "#760C2A",
            borderColor: "#760C2A",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => `$${value}`,
              font: {
                size: 12,
              },
            },
          },
          x: {
            ticks: {
              font: {
                size: 13,
              },
            },
          },
        },
      },
    });

    return () => chart.destroy();
  }, [data]);

  return (
    <div className='h-full w-full'>
      <canvas ref={chartRef} />
    </div>
  );
}
