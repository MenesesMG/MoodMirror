import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const SidebarDashboardBoardSecond = () => {
  const [emotionCounts, setEmotionCounts] = useState({
    angry: 0,
    disgust: 0,
    fear: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    surprise: 0,
  });

  useEffect(() => {
    const fetchEmotionCounts = async () => {
      try {
        const response = await fetch('http://localhost:5000/get_emotion_counts');
        const data = await response.json();
        setEmotionCounts(prevCounts => ({
          ...prevCounts,
          ...data
        }));
      } catch (error) {
        console.error('Error fetching emotion counts:', error);
      }
    };

    fetchEmotionCounts();
  }, []);

  const data = {
    labels: ["Angry", "Disgust", "Fear", "Happy", "Neutral", "Sad", "Surprise"],
    datasets: [
      {
        label: "Occurrence",
        data: [
          emotionCounts.angry,
          emotionCounts.disgust,
          emotionCounts.fear,
          emotionCounts.happy,
          emotionCounts.neutral,
          emotionCounts.sad,
          emotionCounts.surprise,
        ],
        backgroundColor: "rgba(236, 72, 153, 0.3)", // Light pink bars
        borderColor: "rgba(236, 72, 153, 1)", // Border for bars
        borderWidth: 1,
        borderRadius: 10, // Rounded bars
        barThickness: 12, // Adjust bar thickness
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    maintainAspectRatio: false, // Ensure the chart fills the container
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      title: {
        display: false, // Disable Chart.js title (use custom title above)
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#EF4444",
        titleColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          beginAtZero: true,
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[385px] border rounded-2xl flex flex-col bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] mt-6 mb-6 p-4 pt-8 pr-8 relative">
      {/* Sidebar Indicator */}
      <div className="absolute left-0 top-8 h-[70px] w-[7px] bg-pink-500 rounded-r-xl"></div>
      {/* Card Content */}
      <div className="flex flex-col gap-2 pl-8 h-full"> {/* Adjust padding-left and height */}
        <div className="font-bold text-pink-500 text-sm text-justify">
          Facial Expression Occurrence
        </div>
        <div className="border-b border-stone-300 mt-2 mb-2"></div>
        
        {/* Chart Section */}
        <div className="w-full flex-grow">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};
