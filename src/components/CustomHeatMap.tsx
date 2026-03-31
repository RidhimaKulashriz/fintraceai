import React from 'react';
import { cn } from '../lib/utils';

interface CustomHeatMapProps {
  xLabels: string[];
  yLabels: string[];
  data: number[][];
  xLabelWidth?: number;
  yLabelWidth?: number;
  height?: number;
  cellStyle?: (background: string, value: number, min: number, max: number, data: number[][], x: number, y: number) => React.CSSProperties;
  cellRender?: (value: number) => React.ReactNode;
}

export const CustomHeatMap: React.FC<CustomHeatMapProps> = ({
  xLabels,
  yLabels,
  data,
  yLabelWidth = 60,
  cellRender,
}) => {
  // Find min/max for scaling if needed, though we use absolute values here
  const min = Math.min(...data.flat());
  const max = Math.max(...data.flat());

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Grid Area */}
      <div className="flex">
        {/* Y-Labels Column */}
        <div 
          className="flex flex-col justify-between py-2 pr-4 text-right"
          style={{ width: yLabelWidth }}
        >
          {yLabels.map((label, i) => (
            <div key={label} className="text-[10px] font-bold text-foreground/40 uppercase h-8 flex items-center justify-end">
              {label}
            </div>
          ))}
        </div>

        {/* Cells Grid */}
        <div className="flex-1">
          <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${xLabels.length}, 1fr)` }}>
            {data.map((row, y) => (
              row.map((value, x) => (
                <div
                  key={`${x}-${y}`}
                  className="h-8 rounded-[4px] border border-white/5 flex items-center justify-center transition-all hover:scale-110 hover:z-10 cursor-default group relative"
                  style={{
                    background: `rgba(255, 77, 79, ${value / 100})`,
                  }}
                >
                  <span className={cn(
                    "text-[10px] font-medium transition-opacity",
                    value > 50 ? "text-white" : "text-white/20",
                    "opacity-0 group-hover:opacity-100"
                  )}>
                    {cellRender ? cellRender(value) : value}
                  </span>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-[10px] rounded border border-border opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 shadow-xl">
                    {yLabels[y]}, {xLabels[x]}: <span className="font-bold text-fraud">{value}%</span>
                  </div>
                </div>
              ))
            ))}
          </div>
          
          {/* X-Labels Row */}
          <div className="grid gap-1 mt-2" style={{ gridTemplateColumns: `repeat(${xLabels.length}, 1fr)` }}>
            {xLabels.map((label) => (
              <div key={label} className="text-[10px] font-bold text-foreground/40 uppercase text-center">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
