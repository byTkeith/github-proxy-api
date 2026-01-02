import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`${className} flex items-center justify-center bg-blue-600 rounded-2xl shadow-xl shadow-blue-200`}>
      <span className="text-white font-black text-2xl tracking-tighter select-none">
        Ke.
      </span>
    </div>
  );
};

export default Logo;