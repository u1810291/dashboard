import React from 'react';

export function ChartDot({ cx, cy, tooltipValue }) {
  return (
    <svg>
      <svg x={cx - 38} y={cy - 58} width="75" height="66" viewBox="0 0 75 66" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d)">
          <rect x="15" y="11" width="45" height="30" rx="5" fill="#232939" />
          <path d="M38 46.5L32 40.5H44L38 46.5Z" fill="#232939" />
        </g>
        <defs>
          <filter id="filter0_d" x="0" y="0" width="75" height="65.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="7.5" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
          </filter>
        </defs>
        <text x="50%" y="28px" dominantBaseline="middle" textAnchor="middle" fill="#EDF0F5">{tooltipValue}</text>
      </svg>
      <svg x={cx} y={cy} width="1" height="500" viewBox="0 0 1 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line y1="2.18557e-08" y2={270 - cy} stroke="#507DED" strokeDasharray="5 5" />
      </svg>
      <svg x={cx - 8} y={cy - 8} width="16" height="16" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="recharts-tooltip-cursor1" cx="8.5" cy="8.5" r="8.5" fill="#507DED" />
        <circle cx="8.50039" cy="8.50015" r="5.1" fill="white" />
      </svg>
    </svg>
  );
}
