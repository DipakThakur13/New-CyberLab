import React, { useEffect, useRef, useState } from "react";
import "./DiwaliPopup.css";

const DiwaliPopup = () => {
  const canvasRef = useRef(null);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let rockets = [];
    let particles = [];
    let animationFrame;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Rocket {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = -(Math.random() * 8 + 12);
        this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
        this.trail = [];
        this.exploded = false;
      }

      update() {
        this.trail.push({ x: this.x, y: this.y, alpha: 1 });
        if (this.trail.length > 10) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.2; // gravity

        if (this.vy >= 0 && !this.exploded) {
          this.explode();
          this.exploded = true;
        }
      }

      explode() {
        const count = 80 + Math.random() * 50;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const speed = Math.random() * 6 + 2;
          particles.push({
            x: this.x,
            y: this.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            alpha: 1,
            color: this.color,
            radius: Math.random() * 2 + 1,
          });
        }
      }

      draw(ctx) {
        // draw trail
        for (let i = 0; i < this.trail.length; i++) {
          const t = this.trail[i];
          ctx.globalAlpha = t.alpha;
          ctx.beginPath();
          ctx.arc(t.x, t.y, 2, 0, 2 * Math.PI);
          ctx.fillStyle = this.color;
          ctx.fill();
          t.alpha -= 0.1;
        }

        // draw rocket
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      rockets.forEach((r, i) => {
        r.update();
        r.draw(ctx);
        if (r.exploded) rockets.splice(i, 1);
      });

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.alpha -= 0.015;
        if (p.alpha <= 0) particles.splice(i, 1);
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    }

    function launchRocket() {
      rockets.push(new Rocket());
    }

    const interval = setInterval(launchRocket, 800);
    animate();

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      {showPopup && (
        <>
          <div className="blurBackground"></div>
          <div className="diwaliPopup">
            <div className="popup-inner">
              <h1 className="title">🎆 Happy Diwali 🎆</h1>
              <h2 className="subtitle">
                May your code shine bright and your bugs vanish — from{" "}
                <span>CyberLab</span>
              </h2>
              <button
                id="closeBtn"
                onClick={() => setShowPopup(false)}
              >
                Celebrate Now
              </button>
            </div>
          </div>
        </>
      )}
      <canvas ref={canvasRef} id="fireworks"></canvas>
    </>
  );
};

export default DiwaliPopup;
