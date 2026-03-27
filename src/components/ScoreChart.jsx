import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const getColor = (score) => {
  if (score >= 80 || score >= 8) return '#10b981'; // emerald
  if (score >= 60 || score >= 6) return '#f59e0b'; // amber
  return '#ef4444'; // red
};

const getLabel = (score, max = 10) => {
  const pct = max === 100 ? score : score * 10;
  if (pct >= 80) return 'Excellent';
  if (pct >= 60) return 'Good';
  if (pct >= 40) return 'Fair';
  return 'Needs Work';
};

export default function ScoreChart({ label, score, max = 10 }) {
  if (score === null || score === undefined) return null;

  const normalizedScore = max === 100 ? score / 10 : score;
  const color = getColor(normalizedScore);

  const data = {
    datasets: [
      {
        data: [normalizedScore, 10 - normalizedScore],
        backgroundColor: [color, 'rgba(127,127,127,0.1)'],
        borderWidth: 0,
        cutout: '75%',
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    animation: { animateRotate: true, duration: 1000 },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-xl font-bold text-gray-900 dark:text-white" style={{ color }}>
            {max === 100 ? score : `${score}/10`}
          </span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">{label}</p>
        <p className="text-[10px] font-medium" style={{ color }}>{getLabel(normalizedScore)}</p>
      </div>
    </div>
  );
}
