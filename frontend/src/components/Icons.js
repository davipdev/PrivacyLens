function Base({ children, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ShieldCheck(props) {
  return (
    <Base {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </Base>
  );
}

export function Reticle(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.4" />
      <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" />
    </Base>
  );
}

export function Crosshair(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M22 12h-4M6 12H2M12 6V2M12 22v-4" />
    </Base>
  );
}

export function MagnifierEye(props) {
  return (
    <Base {...props}>
      <circle cx="10.5" cy="10.5" r="7.5" />
      <path d="m21 21-4.35-4.35" />
      <path d="M5.4 10.5Q10.5 7.5 15.6 10.5 10.5 13.5 5.4 10.5Z" />
      <circle cx="10.5" cy="10.5" r="1.9" />
      <circle cx="10.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function Lock(props) {
  return (
    <Base {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </Base>
  );
}

export function KeyRound(props) {
  return (
    <Base {...props}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="M21 2 11.4 11.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </Base>
  );
}

export function Eye(props) {
  return (
    <Base {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </Base>
  );
}

export function EyeOff(props) {
  return (
    <Base {...props}>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c6.5 0 10 8 10 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <path d="M6.61 6.61A18.5 18.5 0 0 0 2 12s3.5 7 10 7a9.12 9.12 0 0 0 5.39-1.61" />
      <path d="M2 2 22 22" />
    </Base>
  );
}

export function Mail(props) {
  return (
    <Base {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </Base>
  );
}

export function User(props) {
  return (
    <Base {...props}>
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </Base>
  );
}

export function Building(props) {
  return (
    <Base {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
    </Base>
  );
}

export function Hash(props) {
  return (
    <Base {...props}>
      <path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" />
    </Base>
  );
}

export function LayoutDashboard(props) {
  return (
    <Base {...props}>
      <rect x="3" y="3" width="7" height="9" rx="1" />
      <rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" />
      <rect x="3" y="16" width="7" height="5" rx="1" />
    </Base>
  );
}

export function History(props) {
  return (
    <Base {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 2" />
    </Base>
  );
}

export function BarChart(props) {
  return (
    <Base {...props}>
      <path d="M3 3v18h18" />
      <path d="M7 14v4M12 9v9M17 12v6" />
    </Base>
  );
}

export function Sliders(props) {
  return (
    <Base {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
      <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="9" cy="18" r="2" fill="currentColor" stroke="none" />
    </Base>
  );
}

export function AlertTriangle(props) {
  return (
    <Base {...props}>
      <path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h16.9a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </Base>
  );
}

export function Search(props) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </Base>
  );
}

export function ArrowRight(props) {
  return (
    <Base {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </Base>
  );
}

export function Check(props) {
  return (
    <Base {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Base>
  );
}

export function LogOut(props) {
  return (
    <Base {...props}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="m16 17 5-5-5-5" />
      <path d="M21 12H9" />
    </Base>
  );
}

export function TrendingUp(props) {
  return (
    <Base {...props}>
      <path d="m22 7-8.5 8.5-5-5L2 17" />
      <path d="M16 7h6v6" />
    </Base>
  );
}

export function TrendingDown(props) {
  return (
    <Base {...props}>
      <path d="m22 17-8.5-8.5-5 5L2 7" />
      <path d="M16 17h6v-6" />
    </Base>
  );
}

export function Globe(props) {
  return (
    <Base {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
    </Base>
  );
}

export function Bell(props) {
  return (
    <Base {...props}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9z" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </Base>
  );
}

export function ScanLine(props) {
  return (
    <Base {...props}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M3 12h18" />
    </Base>
  );
}
