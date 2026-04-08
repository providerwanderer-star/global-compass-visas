import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  label?: string;
}

const CountdownTimer = ({ targetDate, label = "Next Express Entry Draw" }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  function getTimeLeft(target: Date) {
    const now = new Date().getTime();
    const diff = target.getTime() - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  const blocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Sec" },
  ];

  return (
    <div className="text-center">
      <p className="text-sm font-semibold text-gold mb-3 tracking-wide uppercase">{label}</p>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        {blocks.map((block, i) => (
          <div key={block.label} className="flex items-center gap-2 sm:gap-3">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 sm:px-5 sm:py-3 min-w-[60px] sm:min-w-[80px]">
              <div className="font-display text-2xl sm:text-4xl font-bold text-white tabular-nums">
                {String(block.value).padStart(2, "0")}
              </div>
              <div className="text-[10px] sm:text-xs text-white/60 uppercase tracking-wider mt-0.5">
                {block.label}
              </div>
            </div>
            {i < blocks.length - 1 && (
              <span className="text-white/40 text-xl sm:text-2xl font-bold">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
