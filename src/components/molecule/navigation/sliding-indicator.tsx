import { IndicatorStyle } from "@/constants/router/sidebar";

interface SlidingIndicatorProps {
  style: IndicatorStyle;
}

export function SlidingIndicator({ style }: SlidingIndicatorProps) {
  return (
    <>
      {/* Sliding indicator */}
      <div
        className="absolute left-2 w-1 bg-blue-400 dark:bg-blue-900 rounded-full transition-all duration-300 ease-out z-10"
        style={{
          top: `${style.top + 4}px`,
          height: `${style.height - 8}px`,
        }}
      />

      {/* Active background indicator */}
      {/* <div
        className="absolute left-0 right-2  bg-blue-50 dark:bg-blue-900/20  rounded-md transition-all duration-300 ease-out"
        style={{
          top: `${style.top}px`,
          height: `${style.height}px`,
        }}
      /> */}
    </>
  );
}
