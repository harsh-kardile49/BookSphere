import React from "react";
import { Link } from "react-router-dom";
import { useThemeStore } from "../../store/themeStore";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  theme?: "light" | "dark";
  className?: string;
  clickable?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = "md",
  showText = true,
  theme: customTheme,
  className = "",
  clickable = true,
}) => {
  const storeTheme = useThemeStore((state) => state.theme);
  const activeTheme = customTheme || storeTheme;
  const isDark = activeTheme === "dark";

  // Size dimensions
  const iconSizes = {
    sm: { box: 32, svg: 20, font: "1.05rem" },
    md: { box: 40, svg: 24, font: "1.28rem" },
    lg: { box: 48, svg: 28, font: "1.5rem" },
  };

  const currentSize = iconSizes[size] || iconSizes.md;

  // Black & White Theme Palette
  // Light Mode: Black badge with white vector icon, dark text
  // Dark Mode: White badge with black vector icon, light text
  const badgeBg = isDark ? "#ffffff" : "#0f172a";
  const iconColor = isDark ? "#0f172a" : "#ffffff";
  const iconBorder = isDark ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.2)";
  const bookTextPrimary = isDark ? "#ffffff" : "#0f172a";
  const sphereTextSecondary = isDark ? "#cbd5e1" : "#475569";
  const dotColor = isDark ? "#ffffff" : "#0f172a";

  const logoContent = (
    <div className={`d-inline-flex align-items-center ${className}`}>
      {/* 2026 Minimalist Black & White Icon Badge */}
      <div
        className="d-flex align-items-center justify-content-center rounded-3 position-relative user-select-none flex-shrink-0"
        style={{
          width: currentSize.box,
          height: currentSize.box,
          backgroundColor: badgeBg,
          boxShadow: isDark
            ? "0 4px 16px rgba(255, 255, 255, 0.15)"
            : "0 6px 18px rgba(15, 23, 42, 0.2)",
          border: `1px solid ${iconBorder}`,
          transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <svg
          width={currentSize.svg}
          height={currentSize.svg}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Orbital Sphere Ring */}
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4.5"
            stroke={iconColor}
            strokeOpacity={isDark ? "0.45" : "0.5"}
            strokeWidth="1.4"
            strokeDasharray="2 2"
            transform="rotate(-25 12 12)"
          />
          {/* Left Book Page */}
          <path
            d="M4.5 7.5C7.5 7.5 10 5.8 11.5 4.8V17.5C10 18.5 7.5 19.8 4.5 19.8C3.4 19.8 2.5 19.4 2 18.8V6.8C2.5 7.2 3.4 7.5 4.5 7.5Z"
            fill={iconColor}
            fillOpacity="0.95"
          />
          {/* Right Book Page */}
          <path
            d="M19.5 7.5C16.5 7.5 14 5.8 12.5 4.8V17.5C14 18.5 16.5 19.8 19.5 19.8C20.6 19.8 21.5 19.4 22 18.8V6.8C21.5 7.2 20.6 7.5 19.5 7.5Z"
            fill={iconColor}
            fillOpacity="0.8"
          />
          {/* Central Book Spine */}
          <path
            d="M12 4.5V17.8"
            stroke={badgeBg}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* Pulsing Dot */}
          <circle cx="18" cy="6" r="1.8" fill={iconColor} />
        </svg>
      </div>

      {/* Monochrome Brand Typography */}
      {showText && (
        <span
          className="fw-extrabold tracking-tight ms-2 user-select-none d-flex align-items-center"
          style={{
            fontSize: currentSize.font,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            fontFamily: "Inter, system-ui, -apple-system, sans-serif",
            transition: "color 0.2s ease",
          }}
        >
          <span
            style={{
              color: bookTextPrimary,
              fontWeight: 800,
            }}
          >
            Book
          </span>
          <span
            style={{
              color: sphereTextSecondary,
              fontWeight: 600,
            }}
          >
            Sphere
          </span>
          <span
            className="rounded-circle ms-1 d-inline-block"
            style={{
              width: 5,
              height: 5,
              backgroundColor: dotColor,
              boxShadow: isDark ? "0 0 6px rgba(255,255,255,0.8)" : "0 0 6px rgba(15,23,42,0.4)",
            }}
          />
        </span>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link to="/dashboard" className="text-decoration-none" style={{ color: "inherit" }}>
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default Logo;