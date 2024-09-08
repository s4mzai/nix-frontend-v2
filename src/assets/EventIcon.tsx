export default function EventsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="-0.5 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="5"
        width="20"
        height="17"
        rx="2"
        ry="2"
        stroke="white"
        strokeWidth="2"
        fill="none"
      />
      <rect x="2" y="5" width="20" height="4" fill="white" />
      <line x1="2" y1="10" x2="22" y2="10" stroke="white" strokeWidth="1" />
      <circle cx="6" cy="14" r="1.5" fill="white" />
      <circle cx="12" cy="14" r="1.5" fill="white" />
      <circle cx="18" cy="14" r="1.5" fill="white" />
    </svg>
  );
}
