import React, { useEffect, useRef, useState } from "react";
import "./diwali.css"; // we’ll create this next

export default function DiwaliPopup() {
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = [];

    window.addEventListener("resize", () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor(x, y, dx, dy, color, size, ttl) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.size = size;
        this.ttl = ttl;
        this.age = 0;
      }
      update() {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += 0.04;
        this.dx *= 0.99;
        this.dy *= 0.999;
        this.age++;
      }
      draw() {
        ctx.globalAlpha = Math.max(1 - this.age / this.ttl, 0);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const explode = (x, y, color, spread = 8, count = 60) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * spread + 2;
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const size = Math.random() * 3 + 1.2;
        const ttl = 60 + Math.floor(Math.random() * 40);
        particles.push(new Particle(x, y, dx, dy, color, size, ttl));
      }
    };

    const launchFirework = () => {
      const x = Math.random() * (W * 0.8) + W * 0.1;
      const peak = Math.random() * (H * 0.5) + H * 0.15;
      const shell = { x: W / 2, y: H, tx: x, ty: peak, progress: 0 };
      const rise = setInterval(() => {
        shell.progress += 0.03 + Math.random() * 0.02;
        shell.x = shell.x + (shell.tx - shell.x) * 0.06;
        shell.y = shell.y + (shell.ty - shell.y) * 0.06;
        ctx.beginPath();
        ctx.globalAlpha = 0.9;
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.arc(shell.x, shell.y, 2, 0, Math.PI * 2);
        ctx.fill();
        if (shell.y < shell.ty + 4 || shell.progress > 1.05) {
          clearInterval(rise);
          const colors = [
            "#ffd166",
            "#ff6b6b",
            "#06d6a0",
            "#7b2cbf",
            "#4cc9f0",
          ];
          const c = colors[Math.floor(Math.random() * colors.length)];
          explode(shell.x, shell.y, c, 9, 90);
        }
      }, 16);
    };

    const playShortShow = () => {
      for (let i = 0; i < 8; i++) {
        setTimeout(launchFirework, i * 520 + Math.random() * 200);
      }
    };

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.age > p.ttl) particles.splice(i, 1);
      }
      requestAnimationFrame(loop);
    };

    loop();
    playShortShow();

    const timer = setTimeout(() => setVisible(false), 12000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <>
      <canvas id="confettiCanvas" ref={canvasRef}></canvas>
      <div className="diwali-greeting">
        <div className="card">
          <div className="left">
            <h1>✨ Happy Diwali from CyberLab!</h1>
            <p className="sub">
              Wishing you brightness, safety, and lots of learning. Enjoy the
              festival — here's a little fireworks show for you.
            </p>
            <div className="actions">
              <button
                className="btn"
                onClick={() => window.location.reload()}
              >
                Play Fireworks
              </button>
              <button
                className="close"
                onClick={() => setVisible(false)}
              >
                Close
              </button>
            </div>
          </div>
          <div className="visual" aria-hidden="true">
            <svg
              className="cracker"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0" stopColor="#ffd166" />
                  <stop offset="1" stopColor="#ff6b6b" />
                </linearGradient>
              </defs>
              <g transform="translate(10,10)">
                <rect
                  x="20"
                  y="10"
                  width="60"
                  height="80"
                  rx="10"
                  fill="url(#g)"
                  stroke="#fff3"
                  strokeWidth="2"
                  transform="rotate(18 50 50)"
                />
                <polygon
                  points="0,0 18,6 4,18"
                  fill="#ffd166"
                  transform="translate(78,6) rotate(18)"
                />
                <g transform="translate(30,6)">
                  <circle cx="6" cy="6" r="2" fill="#fff" />
                  <circle cx="14" cy="10" r="2" fill="#fff" opacity="0.8" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
