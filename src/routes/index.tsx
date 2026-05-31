import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import saveTheDate from "@/assets/save-the-date.jpg";
import receptionImg from "@/assets/reception.jpg";
import weddingImg from "@/assets/wedding.jpg";
import { Heart, MapPin, Sparkles, Music } from "lucide-react";

const WEDDING_DATE = new Date("2026-06-18T07:30:00+05:30").getTime();
const MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=Sri+Narayani+Mahal+Sripuram+Vellore";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sweatha & Sakthivel — Wedding Invitation" },
      { name: "description", content: "Together with our families, we joyfully invite you to celebrate the wedding of V. Sweatha and R. Sakthivel — 17th & 18th June 2026, Vellore." },
      { property: "og:title", content: "Sweatha & Sakthivel — Wedding Invitation" },
      { property: "og:description", content: "Join us in celebrating our wedding on the 17th & 18th of June 2026 at Sri Narayani Mahal, Vellore." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@300;400;500;600;700&family=Cinzel:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = () => {
    setOpened(true);
    audioRef.current?.play().catch(() => {});
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <audio ref={audioRef} src="/music/bg-music.mp3" loop preload="auto" className="hidden" />
      {!opened && <IntroCurtain onOpen={handleOpen} />}
      <Hero />
      <SaveTheDate />
      <Countdown />
      <Timeline />
      <Functions />
      <Venue />
      <Footer />
    </main>
  );
}

function IntroCurtain({ onOpen }: { onOpen: () => void }) {
  const [closing, setClosing] = useState(false);
  const [started, setStarted] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handle = () => {
    if (started) return;
    setStarted(true);
    const v = videoRef.current;
    v?.play().catch(() => {});
    const duration = (v && !isNaN(v.duration) && v.duration > 0) ? v.duration * 1000 : 6000;
    setTimeout(() => setClosing(true), Math.max(0, duration - 1100));
    setTimeout(onOpen, duration);
    v?.addEventListener("ended", () => {
      setClosing(true);
      setTimeout(onOpen, 1100);
    });
  };

  return (
    <div
      onClick={handle}
      className={`fixed inset-0 z-50 flex items-end justify-center pb-16 sm:pb-20 ${started ? "" : "cursor-pointer"} transition-all duration-[1100ms] ease-in-out ${
        closing ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{ width: "100vw", height: "100vh" }}
      role="button"
      aria-label="Open the invitation"
    >
      <img
        src="/images/intro-poster.png"
        alt=""
        className={`absolute inset-0 w-full h-full object-cover ${started ? "" : "animate-intro-zoom"}`}
      />
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        loop
        muted
        playsInline
        preload="auto"
        className={`absolute inset-0 w-full h-full object-cover md:object-[center_60%] transition-opacity duration-700 ${started ? "opacity-100" : "opacity-0"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
      {!started && (
        <div className="z-10 flex flex-col items-center gap-4 animate-fade-up">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-rose-300/40 blur-xl animate-pulse" />
            <div className="relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl bg-white/95 animate-heart-bounce ring-2 ring-gold/60">
              <Heart className="h-7 w-7" style={{ color: "hsl(345, 75%, 55%)" }} fill="currentColor" />
            </div>
          </div>
          <p
            className="font-serif uppercase tracking-[0.35em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
            style={{ fontSize: "clamp(0.85rem, 2.6vw, 1.1rem)" }}
          >
            Open the Invitation
          </p>
        </div>
      )}
    </div>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-4">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
      <Sparkles className="h-4 w-4 text-gold" />
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-5 sm:px-6 text-center animate-fade-up">
      <p
        className="tracking-[0.32em] sm:tracking-[0.4em] uppercase text-gold-deep"
        style={{ fontSize: "clamp(0.65rem, 2vw, 0.875rem)" }}
      >
        You are invited to the wedding of
      </p>
      <h1
        className="mt-6 font-script text-gradient-gold leading-[1.1] pb-2 max-w-full break-words"
        style={{ fontSize: "clamp(3.75rem, 14vw, 8.5rem)" }}
      >
        Sweatha
      </h1>
      <div className="flex items-center gap-4 my-1">
        <span className="h-px w-12 sm:w-16 bg-gold/60" />
        <span className="font-script text-3xl text-gold-deep">&amp;</span>
        <span className="h-px w-12 sm:w-16 bg-gold/60" />
      </div>
      <h1
        className="font-script text-gradient-gold leading-[1.1] pb-2 max-w-full break-words"
        style={{ fontSize: "clamp(3.75rem, 14vw, 8.5rem)" }}
      >
        Sakthivel
      </h1>
      <Ornament />
      <p
        className="text-muted-foreground italic"
        style={{ fontSize: "clamp(0.95rem, 2.4vw, 1.125rem)" }}
      >
        Together with their families
      </p>
      <p
        className="mt-2 tracking-[0.3em] uppercase text-gold-deep"
        style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.875rem)" }}
      >
        Scroll Down
      </p>
      <div className="mt-2 animate-float text-gold">
        <Heart className="h-4 w-4 fill-current" />
      </div>
    </section>
  );
}

function SaveTheDate() {
  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${saveTheDate})` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center text-white px-5 sm:px-6 max-w-2xl w-full">
        <p
          className="tracking-[0.35em] sm:tracking-[0.4em] uppercase text-white/90"
          style={{ fontSize: "clamp(0.65rem, 2vw, 0.875rem)" }}
        >
          Save the Date
        </p>
        <h2
          className="font-script mt-4 text-gold leading-[1.1] pb-2 break-words"
          style={{ fontSize: "clamp(2.75rem, 11vw, 6rem)" }}
        >
          Sweatha &amp; Sakthivel
        </h2>
        <Ornament />
        <ScratchCard />
        <p
          className="mt-4 tracking-[0.25em] uppercase text-white/80"
          style={{ fontSize: "clamp(0.7rem, 1.8vw, 0.875rem)" }}
        >
          ✨ Scratch to reveal the date ✨
        </p>
      </div>
    </section>
  );
}

function fireConfetti() {
  const colors = ["#d4a017", "#f5d76e", "#ffffff", "#b22222", "#8b0000"];
  const end = Date.now() + 3500;
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 70,
      startVelocity: 55,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 70,
      startVelocity: 55,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };
  frame();
}

function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);
  const firedRef = useRef(false);

  const init = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + "px";
    canvas.style.height = rect.height + "px";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    grad.addColorStop(0, "#d4a017");
    grad.addColorStop(0.5, "#f5d76e");
    grad.addColorStop(1, "#b8860b");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * rect.width, Math.random() * rect.height, Math.random() * 2 + 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = "rgba(255,255,255,0.95)";
    ctx.font = "italic 18px 'Cormorant Garamond', serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ Scratch here ✨", rect.width / 2, rect.height / 2);
  };

  useEffect(() => {
    init();
    const onResize = () => { if (!revealed) init(); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerReveal = () => {
    if (firedRef.current) return;
    firedRef.current = true;
    setRevealed(true);
    setTimeout(fireConfetti, 250);
  };

  const getPos = (e: React.PointerEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (e: React.PointerEvent) => {
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 40) if (data[i] === 0) cleared++;
    if (cleared / (data.length / 40) > 0.5) triggerReveal();
  };

  return (
    <div className="mt-6 flex justify-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-md h-32 md:h-36 rounded-lg overflow-hidden shadow-elegant bg-white/10 backdrop-blur-sm border border-gold/40"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p
            className="font-script text-gold leading-tight"
            style={{ fontSize: "clamp(1.75rem, 7vw, 2.75rem)" }}
          >
            18<sup>th</sup> June 2026
          </p>
        </div>
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            if (revealed) return;
            (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
            if (canvasRef.current && !canvasRef.current.width) init();
            isDrawing.current = true;
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => (isDrawing.current = false)}
          className={`absolute inset-0 w-full h-full cursor-grab touch-none transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
}

function Countdown() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, WEDDING_DATE - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  const items = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6 bg-[oklch(0.16_0.02_30)] text-white">
      <p
        className="text-center tracking-[0.32em] sm:tracking-[0.4em] uppercase text-gold"
        style={{ fontSize: "clamp(0.7rem, 2vw, 0.9rem)" }}
      >
        Counting down to our forever
      </p>
      <div className="mt-10 mx-auto grid max-w-3xl grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {items.map((it) => (
          <div
            key={it.label}
            className="aspect-square flex flex-col items-center justify-center rounded-lg border border-gold/40 bg-white/5 backdrop-blur-sm shadow-elegant transition-transform hover:scale-[1.03]"
          >
            <span
              className="font-serif text-gold leading-none tabular-nums"
              style={{ fontSize: "clamp(2.25rem, 9vw, 4rem)" }}
            >
              {String(it.value).padStart(2, "0")}
            </span>
            <span
              className="mt-2 tracking-[0.25em] uppercase text-white/75"
              style={{ fontSize: "clamp(0.6rem, 1.6vw, 0.8rem)" }}
            >
              {it.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReceptionIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="22" cy="14" r="4.5" />
      <circle cx="42" cy="14" r="4.5" />
      <path d="M22 19c-4 0-7 3-7 8v10l4-1v15" />
      <path d="M42 19c4 0 7 3 7 8v10l-4-1v15" />
      <path d="M30 28c0 4 2 7 2 12s-2 8-2 11" />
      <path d="M34 28c0-2 1-4 3-5" />
      <path d="M28 28c0-2-1-4-3-5" />
    </svg>
  );
}

function WeddingIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 50V30c0-5 4-9 9-9h18c5 0 9 4 9 9v20" />
      <path d="M22 21c0-4 4-7 10-7s10 3 10 7" />
      <path d="M32 8v6" />
      <path d="M28 11h8" />
      <circle cx="32" cy="36" r="3" />
      <path d="M32 39v6" />
      <path d="M28 45h8" />
    </svg>
  );
}

function Timeline() {
  const events = [
    { Icon: ReceptionIcon, title: "Reception", date: "17th June 2026, Wednesday", time: "6:30 PM onwards" },
    { Icon: WeddingIcon, title: "Wedding Ceremony", date: "18th June 2026, Thursday", time: "7:30 AM – 9:00 AM" },
  ];
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6 bg-background">
      <div className="text-center mb-12 sm:mb-16">
        <p
          className="tracking-[0.32em] sm:tracking-[0.4em] uppercase text-gold-deep"
          style={{ fontSize: "clamp(0.65rem, 2vw, 0.875rem)" }}
        >
          Celebrate with us
        </p>
        <h2
          className="font-script text-gradient-gold mt-2 leading-[1.1] pb-2"
          style={{ fontSize: "clamp(2.75rem, 10vw, 5.5rem)" }}
        >
          Wedding Timeline
        </h2>
        <Ornament />
      </div>
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        <div className="space-y-10 sm:space-y-16">
          {events.map((e, i) => {
            const Icon = e.Icon;
            const left = i % 2 === 0;
            return (
              <div key={e.title} className="relative flex items-center animate-fade-up">
                {/* Mobile: stacked */}
                <div className="sm:hidden pl-16 w-full">
                  <h3 className="font-serif text-xl text-maroon font-semibold leading-snug">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{e.date}</p>
                  <p className="text-sm text-gold-deep mt-0.5 italic">{e.time}</p>
                </div>
                {/* Desktop: alternating */}
                <div className={`hidden sm:block w-1/2 ${left ? "pr-12 text-right" : "pl-12 order-3 text-left"}`}>
                  <h3 className="font-serif text-2xl text-maroon font-semibold leading-snug">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{e.date}</p>
                  <p className="text-sm text-gold-deep mt-0.5 italic">{e.time}</p>
                </div>
                <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold shadow-elegant text-white z-10">
                  <Icon className="h-6 w-6" />
                </div>
                <div className={`hidden sm:block w-1/2 ${left ? "order-3" : ""}`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Functions() {
  const cards = [
    { img: receptionImg, title: "Reception", date: "17 June 2026", time: "6:30 PM onwards" },
    { img: weddingImg, title: "Wedding", date: "18 June 2026", time: "7:30 – 9:00 AM" },
  ];
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6 bg-secondary/40">
      <div className="text-center mb-12 sm:mb-14">
        <p
          className="tracking-[0.32em] sm:tracking-[0.4em] uppercase text-gold-deep"
          style={{ fontSize: "clamp(0.65rem, 2vw, 0.875rem)" }}
        >
          Celebrate with us
        </p>
        <h2
          className="font-script text-gradient-gold mt-2 leading-[1.1] pb-2"
          style={{ fontSize: "clamp(2.75rem, 10vw, 5.5rem)" }}
        >
          The Functions
        </h2>
        <Ornament />
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 sm:gap-8 md:grid-cols-2">
        {cards.map((c) => (
          <article
            key={c.title}
            className="group relative h-[420px] sm:h-[480px] overflow-hidden rounded-lg shadow-elegant transition-transform duration-500 hover:-translate-y-1"
          >
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white text-center">
              <h3
                className="font-script text-gold leading-[1.1] pb-1"
                style={{ fontSize: "clamp(2.25rem, 8vw, 3.25rem)" }}
              >
                {c.title}
              </h3>
              <Ornament />
              <p className="font-serif text-lg">{c.date}</p>
              <p className="text-sm text-white/80 italic mt-1">{c.time}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="py-20 sm:py-24 px-5 sm:px-6 text-center">
      <p
        className="tracking-[0.32em] sm:tracking-[0.4em] uppercase text-gold-deep"
        style={{ fontSize: "clamp(0.65rem, 2vw, 0.875rem)" }}
      >
        Where it happens
      </p>
      <h2
        className="font-script text-gradient-gold mt-2 leading-[1.1] pb-2"
        style={{ fontSize: "clamp(2.75rem, 10vw, 5.5rem)" }}
      >
        The Venue
      </h2>
      <Ornament />
      <div className="mx-auto max-w-xl">
        <MapPin className="mx-auto h-6 w-6 text-gold-deep" />
        <p
          className="font-serif text-maroon mt-4 leading-snug"
          style={{ fontSize: "clamp(1.4rem, 5vw, 1.875rem)" }}
        >
          Sri Narayani Mahal (A/C)
        </p>
        <p className="text-muted-foreground mt-3 leading-relaxed text-sm sm:text-base">
          Thirumalaikodi, Sripuram, Ariyur,<br />
          Vellore – 632 055, Tamil Nadu
        </p>
      </div>

      <div className="mt-8 mx-auto max-w-3xl relative rounded-2xl overflow-hidden shadow-elegant ring-1 ring-gold/30">
        <img
          src={saveTheDate}
          alt="Sri Narayani Mahal"
          loading="lazy"
          className="w-full h-[260px] sm:h-[380px] md:h-[440px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-1/2 -translate-x-1/2 inline-flex items-center gap-2 rounded-full px-6 sm:px-8 py-3 text-xs sm:text-sm tracking-[0.25em] uppercase text-white shadow-2xl backdrop-blur-md bg-white/15 border border-white/40 hover:bg-white/25 hover:scale-105 transition-all"
          style={{ top: "78%" }}
        >
          <MapPin className="h-4 w-4" /> View on Map
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-14 text-center border-t border-gold/20 px-5">
      <Music className="mx-auto h-4 w-4 text-gold mb-4" />
      <p
        className="uppercase tracking-[0.3em] text-gold-deep"
        style={{ fontSize: "clamp(0.65rem, 1.8vw, 0.8rem)" }}
      >
        With love
      </p>
      <h3
        className="mt-3 text-gradient-gold leading-[1.15] pb-1"
        style={{
          fontFamily: "'Cinzel', 'Cormorant Garamond', serif",
          fontWeight: 600,
          letterSpacing: "0.08em",
          fontSize: "clamp(1.6rem, 5.5vw, 2.5rem)",
        }}
      >
        Sweatha &amp; Sakthivel
      </h3>
      <p
        className="mt-3 tracking-[0.32em] uppercase text-muted-foreground"
        style={{ fontSize: "clamp(0.6rem, 1.6vw, 0.75rem)" }}
      >
        18 · June · 2026
      </p>
    </footer>
  );
}
