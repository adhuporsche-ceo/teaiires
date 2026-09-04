import React from 'react';

/**
 * PastelBackgroundShapes
 * Replicating the exact organic fluid shapes, wavy dunes, and contour palette from uploaded image.png:
 * - Color Swatches from image.png:
 *   #F2EEE3 (Warm cream canvas base)
 *   #E3B1A6 (Soft dusty rose / peach)
 *   #E4B2A8 (Blush terracotta accent)
 *   #D08A74 (Warm terracotta / clay)
 *   #C97B68 (Deep terracotta / rust)
 */
export const PastelBackgroundShapes: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- Left Side Layered Terracotta Dunes (Exact Silhouette from image.png) --- */}
        {/* Layer 1 (Upper mound): Soft Dusty Rose (#E3B1A6) */}
        <path
          d="M -50 -50 
             L 380 -50 
             C 380 90, 360 180, 290 260 
             C 210 350, 140 370, 70 450 
             C 20 510, -20 530, -50 540 
             Z"
          fill="#E3B1A6"
          fillOpacity="0.82"
        />

        {/* Layer 2 (Middle organic wave): Warm Terracotta (#D08A74) */}
        <path
          d="M -50 220 
             C 30 230, 130 260, 220 320 
             C 320 390, 350 490, 280 580 
             C 220 660, 120 670, 30 730 
             C -10 760, -35 770, -50 780 
             Z"
          fill="#D08A74"
          fillOpacity="0.80"
        />

        {/* Layer 3 (Inner accent dune): Blush Terracotta (#E4B2A8) */}
        <path
          d="M -50 480 
             C 10 490, 90 530, 140 610 
             C 180 670, 140 760, 80 840 
             C 40 890, 0 920, -50 940 
             Z"
          fill="#E4B2A8"
          fillOpacity="0.75"
        />

        {/* Layer 4 (Bottom-left fluid wave): Deep Terracotta / Rust (#C97B68) */}
        <path
          d="M -50 680 
             C 10 690, 60 720, 110 780 
             C 170 850, 240 870, 230 940 
             C 220 990, 170 1020, 110 1050 
             L -50 1050 
             Z"
          fill="#C97B68"
          fillOpacity="0.88"
        />

        {/* Organic Contour Doodle Line (#C97B68 / soft terracotta) */}
        <path
          d="M 400 -50 
             C 380 120, 310 240, 220 330 
             C 140 410, 50 480, -50 520"
          fill="none"
          stroke="#C97B68"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* --- Top-Right Organic Terracotta Arc (#E3B1A6 & #E4B2A8) --- */}
        <path
          d="M 1050 -50 
             L 760 -50 
             C 790 60, 830 110, 910 140 
             C 980 170, 1020 190, 1050 210 
             Z"
          fill="#E3B1A6"
          fillOpacity="0.75"
        />

        <path
          d="M 1050 -50 
             L 840 -50 
             C 870 40, 910 90, 970 120 
             C 1010 140, 1035 150, 1050 160 
             Z"
          fill="#E4B2A8"
          fillOpacity="0.70"
        />

        {/* --- Bottom-Right Terracotta Dunes (#D08A74 & #C97B68) --- */}
        {/* Dune Layer 1: Warm Terracotta (#D08A74) */}
        <path
          d="M 1050 1050 
             L 580 1050 
             C 610 950, 660 880, 750 810 
             C 840 730, 880 670, 950 610 
             C 990 570, 1020 560, 1050 550 
             Z"
          fill="#D08A74"
          fillOpacity="0.75"
        />

        {/* Dune Layer 2: Deep Terracotta (#C97B68) */}
        <path
          d="M 1050 1050 
             L 690 1050 
             C 710 970, 760 910, 830 850 
             C 890 800, 920 750, 980 690 
             C 1010 660, 1030 650, 1050 640 
             Z"
          fill="#C97B68"
          fillOpacity="0.82"
        />

        {/* Bottom-Right Contour Lines */}
        <path
          d="M 540 1050 
             C 570 930, 630 850, 720 780 
             C 810 700, 860 640, 930 580 
             C 980 540, 1015 530, 1050 520"
          fill="none"
          stroke="#D08A74"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.35"
        />
      </svg>
    </div>
  );
};
