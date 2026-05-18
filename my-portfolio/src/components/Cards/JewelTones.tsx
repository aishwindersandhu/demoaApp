import React, { useState } from "react";
import { colorStrip } from "../../interfaces/imageDataInterface";
import { CopyButton } from "../copyButton";
import "../../styles/jewelTones.css";

const lighten = (hex: string, amount: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const l = (c: number) => Math.min(255, Math.round(c + (255 - c) * amount));
  return `rgb(${l(r)},${l(g)},${l(b)})`;
};

const darken = (hex: string, amount: number): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const d = (c: number) => Math.max(0, Math.round(c * (1 - amount)));
  return `rgb(${d(r)},${d(g)},${d(b)})`;
};

const GemShape: React.FC<{ hex: string; name: string }> = ({ hex, name }) => {
  const id = `gem-${name.toLowerCase().replace(/\s+/g, "-")}`;
  const light = lighten(hex, 0.35);
  const dark  = darken(hex, 0.45);
  const mid   = darken(hex, 0.15);

  return (
    <svg className="jt-gem-svg" viewBox="0 0 64 80" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor={light} />
          <stop offset="100%" stopColor={dark}  />
        </linearGradient>
      </defs>
      <polygon points="32,4 60,28 32,76 4,28"  fill={`url(#${id})`} />
      <polygon points="32,4 60,28 32,32 4,28"  fill={mid}   opacity="0.55" />
      <polygon points="32,4 20,18 32,22 44,18" fill={light} opacity="0.35" />
      <circle  cx="32" cy="21" r="3" fill="white" opacity="0.22" />
    </svg>
  );
};

const GemItem: React.FC<{ item: colorStrip }> = ({ item }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="jt-gem-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <GemShape hex={item.hex} name={item.name} />

      <div className="jt-gem-name">{item.name}</div>

      <div className="jt-gem-hex-row">
        <span className="jt-gem-hex">{item.hex}</span>
        <CopyButton hex={item.hex}></CopyButton>
      </div>
    </div>
  );
};

export const JewelTones = ({
  palette,
  title,
}: {
  palette: Array<colorStrip>;
  title: string;
}) => {
  if (!palette || palette.length === 0) return null;

  return (
    <div className="jt-root">
      <div className="jt-header">
       <h2 className="jt-title">{title}</h2>
      </div>

      <div className="jt-gems-row">
        {palette.map((item: colorStrip) => (
          <GemItem key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
};