"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  disabled?: boolean;
  ripple?: boolean;
  glow?: boolean;
  bounce?: boolean;
}

export function AnimatedButton({
  children,
  onClick,
  variant = "default",
  size = "default",
  className,
  disabled = false,
  ripple = true,
  glow = false,
  bounce = false,
}: AnimatedButtonProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // 리플 효과
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newRipple = { id: Date.now(), x, y };

      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    }

    // 클릭 애니메이션
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 150);

    // 진동 효과 (PWA)
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }

    onClick?.();
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        glow && "shadow-lg hover:shadow-xl",
        bounce && "hover:scale-105 active:scale-95",
        isClicked && "scale-95",
        className
      )}
    >
      {children}

      {/* 리플 효과 */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ping"
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </Button>
  );
}
