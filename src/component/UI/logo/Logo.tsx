import type { LogoProps } from '../../types';

export default function Logo({ className = '' }: LogoProps) {
  return (
    <svg
      width="49"
      height="35"
      viewBox="0 0 49 35"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="15.9" y="0" width="7.4" height="35" fillOpacity="0.3" />
      <polygon points="15.9,0 23.3,0 7.4,35 0,35" />
      <rect x="31.8" y="0" width="7.4" height="35" fillOpacity="0.3" />
      <polygon points="31.8,0 39.3,0 23.4,35 15.9,35" />
      <polygon points="41.6,13.6 49,13.6 39.3,35 31.8,35" />
    </svg>
  );
}
