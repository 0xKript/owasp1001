
import React, { useEffect, useRef } from 'react';

interface Bug {
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  targetAngle: number;
  legs: number;
  baseOpacity: number;
  pulse: number;
}

interface Props {
  isDarkMode: boolean;
}

export const CyberBugsBackground: React.FC<Props> = ({ isDarkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const bugsRef = useRef<Bug[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    const createBugs = () => {
      const bugCount = 35; 
      const newBugs: Bug[] = [];
      for (let i = 0; i < bugCount; i++) {
        newBugs.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 22 + Math.random() * 12,
          angle: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.45,
          targetAngle: Math.random() * Math.PI * 2,
          legs: 3,
          baseOpacity: isDarkMode ? (0.2 + Math.random() * 0.1) : (0.12 + Math.random() * 0.08),
          pulse: Math.random() * Math.PI * 2,
        });
      }
      bugsRef.current = newBugs;
    };

    const drawBug = (bug: Bug) => {
      if (!ctx) return;
      
      ctx.save();
      ctx.translate(bug.x, bug.y);
      ctx.rotate(bug.angle);
      
      const currentOpacity = bug.baseOpacity + Math.sin(bug.pulse) * 0.03;
      const color = isDarkMode ? `rgba(0, 212, 170, ${currentOpacity})` : `rgba(15, 23, 42, ${currentOpacity * 1.8})`;
      const fillColor = isDarkMode ? `rgba(0, 212, 170, ${currentOpacity * 0.3})` : `rgba(15, 23, 42, ${currentOpacity * 0.2})`;
      
      ctx.strokeStyle = color;
      ctx.fillStyle = fillColor;
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.moveTo(-bug.size / 2, 0);
      ctx.lineTo(0, -bug.size / 4);
      ctx.lineTo(bug.size / 2, 0);
      ctx.lineTo(0, bug.size / 4);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(bug.size / 2, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      for (let i = 0; i < bug.legs; i++) {
        const xPos = (i / (bug.legs - 1)) * (bug.size * 0.6) - (bug.size * 0.3);
        ctx.beginPath();
        ctx.moveTo(xPos, -bug.size / 4);
        ctx.lineTo(xPos - 5, -bug.size / 1.5);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(xPos, bug.size / 4);
        ctx.lineTo(xPos - 5, bug.size / 1.5);
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawGrid = () => {
        if (!ctx || !canvas) return;
        ctx.strokeStyle = isDarkMode ? 'rgba(0, 212, 170, 0.05)' : 'rgba(15, 23, 42, 0.06)';
        ctx.lineWidth = 0.8;
        const spacing = 80;
        
        for (let x = 0; x < canvas.width; x += spacing) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += spacing) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    };

    const update = () => {
      bugsRef.current.forEach(bug => {
        bug.pulse += 0.04;

        if (Math.random() < 0.012) {
          bug.targetAngle += (Math.random() - 0.5) * Math.PI * 0.25;
        }
        
        const dx = bug.x - mouseRef.current.x;
        const dy = bug.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 180) {
          const avoidanceAngle = Math.atan2(dy, dx);
          const angleDiff = avoidanceAngle - bug.angle;
          bug.angle += Math.sin(angleDiff) * 0.12;
          bug.speed = 1.4;
        } else {
          bug.speed = Math.max(bug.speed * 0.985, 0.45);
          const angleDiff = bug.targetAngle - bug.angle;
          bug.angle += Math.sin(angleDiff) * 0.015;
        }

        bug.x += Math.cos(bug.angle) * bug.speed;
        bug.y += Math.sin(bug.angle) * bug.speed;

        const margin = 60;
        if (bug.x < -margin) bug.x = canvas.width + margin;
        if (bug.x > canvas.width + margin) bug.x = -margin;
        if (bug.y < -margin) bug.y = canvas.height + margin;
        if (bug.y > canvas.height + margin) bug.y = -margin;
      });
    };

    const loop = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      update();
      bugsRef.current.forEach(drawBug);
      requestAnimationFrame(loop);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    
    resize();
    createBugs();
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isDarkMode]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[5] transition-opacity duration-1000"
    />
  );
};
