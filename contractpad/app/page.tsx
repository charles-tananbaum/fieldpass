"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./landing.module.css";

const MARQUEE_ITEMS = [
  "Pricebook Automation",
  "Data Migration",
  "Technician Adoption",
  "Service Agreement Reconstruction",
  "Customer Deduplication",
  "Equipment Extraction",
  "Change Management",
  "Go-Live Support",
];

export default function LandingPage() {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const orbCanvasRef = useRef<HTMLCanvasElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorThermalRef = useRef<HTMLDivElement>(null);
  const airflowContainerRef = useRef<HTMLDivElement>(null);
  const ctaTextRef = useRef<HTMLParagraphElement>(null);

  const [hovering, setHovering] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  // Cursor + particle + orb system
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const thermal = cursorThermalRef.current;
    const particleCanvas = particleCanvasRef.current;
    const orbCanvas = orbCanvasRef.current;
    if (!dot || !ring || !thermal || !particleCanvas || !orbCanvas) return;

    let dotX = 0, dotY = 0, ringX = 0, ringY = 0;

    let firstMove = true;
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (firstMove) {
        // Snap initial cursor positions to where the mouse actually is
        // so we don't see the lerp slide in from (0, 0).
        dotX = e.clientX;
        dotY = e.clientY;
        ringX = e.clientX;
        ringY = e.clientY;
        firstMove = false;
        setCursorVisible(true);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    let rafId = 0;
    const animateCursor = () => {
      dotX += (mousePos.current.x - dotX) * 0.25;
      dotY += (mousePos.current.y - dotY) * 0.25;
      ringX += (mousePos.current.x - ringX) * 0.12;
      ringY += (mousePos.current.y - ringY) * 0.12;

      dot.style.left = dotX + "px";
      dot.style.top = dotY + "px";
      ring.style.left = ringX + "px";
      ring.style.top = ringY + "px";
      thermal.style.left = mousePos.current.x + "px";
      thermal.style.top = mousePos.current.y + "px";
      rafId = requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // ── Particle system ──
    const pCtx = particleCanvas.getContext("2d");
    if (!pCtx) return;

    const resizeParticleCanvas = () => {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    };
    resizeParticleCanvas();
    window.addEventListener("resize", resizeParticleCanvas);

    interface P {
      x: number; y: number; size: number; speedX: number; speedY: number;
      opacity: number; hue: number;
    }

    const particles: P[] = [];
    const PARTICLE_COUNT = 120;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.15 + 0.03,
        hue: Math.random() > 0.5 ? 22 : 210,
      });
    }

    const updateParticles = () => {
      pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

      particles.forEach((p) => {
        const dx = mousePos.current.x - p.x;
        const dy = mousePos.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
          const force = (200 - dist) / 200;
          const angle = Math.atan2(dy, dx);
          p.speedX += Math.cos(angle + Math.PI * 0.5) * force * 0.04;
          p.speedY += Math.sin(angle + Math.PI * 0.5) * force * 0.04;
          p.opacity = Math.min(0.3, p.opacity + force * 0.01);
        }

        p.speedX *= 0.98;
        p.speedY *= 0.98;
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity *= 0.999;
        if (p.opacity < 0.02) p.opacity = 0.02;

        if (p.x < -10) p.x = particleCanvas.width + 10;
        if (p.x > particleCanvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = particleCanvas.height + 10;
        if (p.y > particleCanvas.height + 10) p.y = -10;

        pCtx.beginPath();
        pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pCtx.fillStyle = p.hue === 22
          ? `rgba(232, 114, 58, ${p.opacity})`
          : `rgba(58, 142, 232, ${p.opacity})`;
        pCtx.fill();
      });

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const opacity = (1 - dist / 120) * 0.04;
            pCtx.beginPath();
            pCtx.moveTo(particles[i].x, particles[i].y);
            pCtx.lineTo(particles[j].x, particles[j].y);
            pCtx.strokeStyle = `rgba(232, 114, 58, ${opacity})`;
            pCtx.lineWidth = 0.5;
            pCtx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(updateParticles);
    };
    updateParticles();

    // ── Thermal orb ──
    const oCtx = orbCanvas.getContext("2d");
    if (!oCtx) return;
    const W = 200, H = 200, cx = W / 2, cy = H / 2;

    interface Mote {
      baseAngle: number; angle: number; baseRadius: number; size: number;
      speed: number; offsetX: number; offsetY: number; warm: boolean;
    }
    const NUM_MOTES = 28;
    const motes: Mote[] = [];
    for (let i = 0; i < NUM_MOTES; i++) {
      const angle = (Math.PI * 2 * i) / NUM_MOTES;
      motes.push({
        baseAngle: angle,
        angle,
        baseRadius: 38 + Math.random() * 8,
        size: Math.random() * 2 + 1,
        speed: 0.003 + Math.random() * 0.004,
        offsetX: 0,
        offsetY: 0,
        warm: Math.random() > 0.4,
      });
    }

    let orbPhase = 0, orbGlow = 0.3, orbHeat = 0.5;

    const drawOrb = () => {
      oCtx.clearRect(0, 0, W, H);
      const rect = orbCanvas.getBoundingClientRect();
      const orbCx = rect.left + rect.width / 2;
      const orbCy = rect.top + rect.height / 2;
      const dx = mousePos.current.x - orbCx;
      const dy = mousePos.current.y - orbCy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      const targetHeat = dist < 250 ? 1 - dist / 250 : 0;
      orbHeat += (targetHeat - orbHeat) * 0.05;
      const targetGlow = 0.2 + orbHeat * 0.5;
      orbGlow += (targetGlow - orbGlow) * 0.08;
      orbPhase += 0.015;

      const glowR = 34 + Math.sin(orbPhase) * 4;
      const outerGlow = oCtx.createRadialGradient(cx, cy, glowR * 0.3, cx, cy, glowR * 2.5);
      outerGlow.addColorStop(0, `rgba(232, 114, 58, ${orbGlow * 0.25})`);
      outerGlow.addColorStop(0.5, `rgba(58, 142, 232, ${(1 - orbHeat) * 0.15})`);
      outerGlow.addColorStop(1, "transparent");
      oCtx.fillStyle = outerGlow;
      oCtx.fillRect(0, 0, W, H);

      const coreGrad = oCtx.createRadialGradient(cx - 4, cy - 4, 2, cx, cy, 28 + Math.sin(orbPhase * 1.3) * 3);
      const r1 = Math.round(58 + orbHeat * 174);
      const g1 = Math.round(142 - orbHeat * 28);
      const b1 = Math.round(232 - orbHeat * 174);
      coreGrad.addColorStop(0, `rgba(${r1}, ${g1}, ${b1}, ${0.6 + orbGlow * 0.4})`);
      coreGrad.addColorStop(0.6, `rgba(${r1}, ${g1}, ${b1}, 0.15)`);
      coreGrad.addColorStop(1, "transparent");
      oCtx.fillStyle = coreGrad;
      oCtx.beginPath();
      oCtx.arc(cx, cy, 32, 0, Math.PI * 2);
      oCtx.fill();

      const innerGrad = oCtx.createRadialGradient(cx, cy, 0, cx, cy, 12);
      innerGrad.addColorStop(0, `rgba(255, 255, 255, ${0.15 + orbHeat * 0.3})`);
      innerGrad.addColorStop(1, "transparent");
      oCtx.fillStyle = innerGrad;
      oCtx.beginPath();
      oCtx.arc(cx, cy, 12, 0, Math.PI * 2);
      oCtx.fill();

      const cursorAngle = Math.atan2(dy, dx);
      motes.forEach((m) => {
        m.angle += m.speed + orbHeat * 0.006;
        let repelX = 0, repelY = 0;
        if (dist < 200) {
          const force = (200 - dist) / 200;
          repelX = Math.cos(cursorAngle) * force * 14;
          repelY = Math.sin(cursorAngle) * force * 14;
        }
        m.offsetX += (repelX - m.offsetX) * 0.06;
        m.offsetY += (repelY - m.offsetY) * 0.06;

        const wobble = Math.sin(orbPhase * 2 + m.baseAngle * 3) * 3;
        const r = m.baseRadius + wobble + orbHeat * 6;
        const mx = cx + Math.cos(m.angle) * r + m.offsetX;
        const my = cy + Math.sin(m.angle) * r + m.offsetY;

        const alpha = 0.3 + orbHeat * 0.5;
        oCtx.fillStyle = m.warm
          ? `rgba(232, 114, 58, ${alpha})`
          : `rgba(58, 142, 232, ${alpha * 0.7})`;
        oCtx.beginPath();
        oCtx.arc(mx, my, m.size + orbHeat * 0.8, 0, Math.PI * 2);
        oCtx.fill();

        const tx = cx + Math.cos(m.angle - m.speed * 8) * r + m.offsetX;
        const ty = cy + Math.sin(m.angle - m.speed * 8) * r + m.offsetY;
        oCtx.fillStyle = m.warm
          ? `rgba(232, 114, 58, ${alpha * 0.2})`
          : `rgba(58, 142, 232, ${alpha * 0.15})`;
        oCtx.beginPath();
        oCtx.arc(tx, ty, m.size * 0.5, 0, Math.PI * 2);
        oCtx.fill();
      });

      requestAnimationFrame(drawOrb);
    };
    drawOrb();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeParticleCanvas);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Airflow lines
  useEffect(() => {
    const container = airflowContainerRef.current;
    if (!container) return;

    const spawn = () => {
      const line = document.createElement("div");
      line.className = styles.airflowLine;
      line.style.top = Math.random() * 100 + "vh";
      line.style.width = Math.random() * 200 + 100 + "px";
      line.style.animationDuration = (Math.random() * 6 + 6) + "s";
      line.style.animationDelay = Math.random() * 4 + "s";
      container.appendChild(line);
      line.addEventListener("animationend", () => line.remove());
    };

    const interval = setInterval(spawn, 1500);
    for (let i = 0; i < 5; i++) spawn();
    return () => clearInterval(interval);
  }, []);

  // Intersection observer for CTA section
  useEffect(() => {
    const el = ctaTextRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setCtaVisible(true);
      });
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.root}>
      {/* Custom cursor — hidden until first mousemove */}
      <div
        ref={cursorDotRef}
        className={`${styles.cursorDot} ${cursorVisible ? styles.cursorActive : ""} ${hovering ? styles.cursorDotHover : ""}`}
      />
      <div
        ref={cursorRingRef}
        className={`${styles.cursorRing} ${cursorVisible ? styles.cursorActive : ""} ${hovering ? styles.cursorRingHover : ""}`}
      />
      <div
        ref={cursorThermalRef}
        className={`${styles.cursorThermal} ${cursorVisible ? styles.cursorActive : ""}`}
      />

      {/* Background video */}
      <div className={styles.videoBg}>
        <video autoPlay muted loop playsInline preload="none">
          <source
            src="https://videos.pexels.com/video-files/5327935/5327935-sd_640_360_30fps.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* Background layers — grid + noise come from globals body::before/after */}
      <canvas ref={particleCanvasRef} className={styles.particleCanvas} />
      <div ref={airflowContainerRef} className={styles.airflowLines} />

      {/* Top nav */}
      <nav className={styles.nav}>
        <div className={styles.navBrand}>
          Field<span>Pass</span>
        </div>
        <div className={styles.navLinks}>
          {[
            { href: "/who-we-are", label: "Who We Are" },
            { href: "/what-we-do", label: "What We Do" },
            { href: "/why-we-do-it", label: "Why" },
            { href: "/demos", label: "Demos" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.navStatus}>
            <div className={styles.statusDot} />
            <span>Accepting Partners</span>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className={styles.mobileOverlay}>
          {[
            { href: "/who-we-are", label: "Who We Are" },
            { href: "/what-we-do", label: "What We Do" },
            { href: "/why-we-do-it", label: "Why We Do It" },
            { href: "/demos", label: "Demos" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileOverlayLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileOverlayDivider} />
          <a
            href="mailto:ctananbaum@mba2027.hbs.edu"
            className={styles.mobileOverlayLink}
            onClick={() => setMenuOpen(false)}
          >
            Contact Us
          </a>
        </div>
      )}

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.logoContainer}>
          <div className={styles.orbWrapper}>
            <canvas
              ref={orbCanvasRef}
              className={styles.orbCanvas}
              width={200}
              height={200}
            />
          </div>
          <h1 className={styles.logoWordmark}>
            Field<span className={styles.logoAccent}>Pass</span>
          </h1>
        </div>

        <div className={styles.taglineContainer}>
          <p className={styles.tagline}>
            Transform your <em className={styles.taglineAccent}>HVAC</em>{" "}
            services
          </p>
        </div>

        <div className={styles.thermalBar} />

        <div className={styles.ctaContainer}>
          <a
            href="mailto:ctananbaum@mba2027.hbs.edu"
            className={styles.ctaBtn}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            Learn More <span className={styles.ctaArrow}>→</span>
          </a>
        </div>

        <div className={styles.bottomStrip}>
          <div className={styles.stripItem}>
            <strong>QB</strong> → <strong>ServiceTitan</strong>
          </div>
          <div className={styles.stripItem}>AI-Powered Migration</div>
          <div className={styles.stripItem}>10-Week Engagement</div>
        </div>
      </section>

      {/* Marquee */}
      <div className={styles.marqueeContainer}>
        <div className={styles.marqueeTrack}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className={styles.marqueeItem}>
              <span className={styles.marqueeDot} /> {item}
            </div>
          ))}
        </div>
      </div>

      {/* Founder CTA */}
      <section className={styles.ctaSection}>
        <p
          ref={ctaTextRef}
          className={`${styles.ctaSectionText} ${
            ctaVisible ? styles.ctaSectionTextVisible : ""
          }`}
        >
          <strong>Jack, Kunal, and Charles</strong> started FieldPass to help
          HVAC companies stop wasting time on bad software. Your next chapter
          starts when the clipboard becomes a dashboard. Let's get you there.
        </p>
        <a
          href="mailto:ctananbaum@mba2027.hbs.edu"
          className={styles.ctaBtn}
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          Become a Partner <span className={styles.ctaArrow}>→</span>
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          © 2026 FieldPass — Built for the trades that build everything else
        </p>
      </footer>
    </div>
  );
}
