/**
 * High performance canvas confetti and sparkles generator
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  shape: 'rect' | 'circle' | 'star';
  opacity: number;
}

const COLORS = [
  '#e8b84b', // Gold
  '#d94f3d', // Apple crimson
  '#5a8f5a', // Leaf emerald
  '#f3ecd9', // Chalk cream
  '#3d6b8f', // Royal slate
  '#f08066', // Coral
  '#ffdf78'  // Golden sparkle
];

export function fireConfettiBurst(originX?: number, originY?: number, count = 70) {
  if (typeof window === 'undefined') return;

  let canvas = document.getElementById('gift-confetti-canvas') as HTMLCanvasElement | null;
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'gift-confetti-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const startX = originX ?? window.innerWidth / 2;
  const startY = originY ?? window.innerHeight / 2;

  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.random() * Math.PI * 2);
    const speed = Math.random() * 9 + 4;
    particles.push({
      x: startX,
      y: startY,
      vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
      vy: Math.sin(angle) * speed - Math.random() * 5,
      size: Math.random() * 8 + 5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.6 ? 'star' : Math.random() > 0.3 ? 'rect' : 'circle',
      opacity: 1
    });
  }

  let animFrameId: number;
  const startTime = performance.now();

  function render(now: number) {
    if (!ctx || !canvas) return;
    const elapsed = now - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeCount = 0;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - (elapsed / 2600));

      if (p.opacity > 0 && p.y < canvas!.height + 50) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;

        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw 5-pointed star
          ctx.beginPath();
          for (let j = 0; j < 5; j++) {
            ctx.lineTo(
              Math.cos((18 + j * 72) * 0.01745) * p.size,
              -Math.sin((18 + j * 72) * 0.01745) * p.size
            );
            ctx.lineTo(
              Math.cos((54 + j * 72) * 0.01745) * (p.size / 2),
              -Math.sin((54 + j * 72) * 0.01745) * (p.size / 2)
            );
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }
    });

    if (activeCount > 0 && elapsed < 3000) {
      animFrameId = requestAnimationFrame(render);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cancelAnimationFrame(animFrameId);
    }
  }

  animFrameId = requestAnimationFrame(render);
}
