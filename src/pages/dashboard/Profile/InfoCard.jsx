import React from 'react';

/* Reusable Info Card */
const InfoCard = ({ icon, iconBg, iconColor, label, value }) => (
  <div
    className="bg-white dark:bg-[#2a2a2a]
    border border-orange-100 dark:border-[#3a3a3a]
    rounded-xl p-4 shadow-sm
    hover:shadow-md hover:-translate-y-1
    transition-all duration-300"
  >
    <div className="flex items-center gap-3">
      <div
        className={`w-10 h-10 ${iconBg} ${iconColor}
        rounded-lg flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 dark:text-gray-300">{label}</p>
        <p className="text-sm font-semibold text-slate-800 dark:text-gray-100 capitalize">
          {value}
        </p>
      </div>
    </div>
  </div>
);

export default InfoCard;