import React, { useState } from "react";

interface ToggleButtonProps {
  initialState?: boolean;
  onToggle: (value: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ initialState = false, onToggle }) => {
  const [isSignup, setIsSignup] = useState<boolean>(initialState);

  const handleToggle = (value: boolean): void => {
    setIsSignup(value);
    onToggle(value);
  };

  return (
    <div className="relative min-w-64 min-h-14 flex items-center justify-between bg-gray-900 rounded-xl p-1 overflow-hidden">
      {/* Animated white bubble - adjusted for proper positioning */}
      <div className={`absolute top-1 bottom-1 w-1/2 bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out ${isSignup ? "left-1/2 transform -translate-x-1" : "left-1"}`} />

      {/* Container for buttons to ensure proper centering */}
      <div className="w-full h-full flex items-center justify-between">
        {/* Sign in */}
        <button className={`bg-transparent w-1/2 z-10 h-full flex items-center justify-center text-base font-medium transition-colors duration-300 ${!isSignup ? "text-gray-900" : "text-gray-200"}`} onClick={(): void => handleToggle(false)}>
          S'identifer
        </button>

        {/* Sign up */}
        <button className={`bg-transparent w-1/2 z-10 h-full flex items-center justify-center text-base font-medium transition-colors duration-300 ${isSignup ? "text-gray-900" : "text-gray-200"}`} onClick={(): void => handleToggle(true)}>
          S'inscrire
        </button>
      </div>
    </div>
  );
};

export default ToggleButton;
