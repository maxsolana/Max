import { useEffect, useState } from 'react';

export function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  useEffect(() => {
    // Generate a fixed number of snowflakes
    setSnowflakes(Array.from({ length: 15 }, (_, i) => i));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((i) => {
        const left = Math.random() * 100 + '%';
        const delay = Math.random() * 10 + 's';
        const duration = (Math.random() * 5 + 10) + 's'; // 10-15s fall duration
        
        return (
          <div
            key={i}
            className="snowflake opacity-30 text-white text-xl"
            style={{
              left,
              animationDelay: delay,
              animationDuration: duration
            }}
          >
            ❄
          </div>
        );
      })}
    </div>
  );
}
