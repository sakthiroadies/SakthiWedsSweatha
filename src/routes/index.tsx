import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import saveTheDate from "@/assets/save-the-date.jpg";
import receptionImg from "@/assets/reception.jpg";
import weddingImg from "@/assets/wedding.jpg";
import { Heart, MapPin, Calendar, Sparkles, Music, Flame } from "lucide-react";

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
        href: "https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap",
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
      <Timeline />
      <Functions />
      <Venue />
      <Footer />
    </main>
  );
}

function IntroCurtain({ onOpen }: { onOpen: () => void }) {
  const [closing, setClosing] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [started, setStarted] = useState(false);

  const handle = () => {
    if (started) return;
    setStarted(true);
    const v = videoRef.current;
    v?.play().catch(() => {});
    const duration = (v && !isNaN(v.duration) && v.duration > 0) ? v.duration * 1000 : 6000;
    // Begin fade ~1.1s before end, then unmount
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
      className={`fixed inset-0 z-50 flex items-end justify-center pb-20 ${started ? "" : "cursor-pointer"} transition-all duration-[1100ms] ease-in-out ${
        closing ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{ width: "100vw", height: "100vh" }}
      role="button"
      aria-label="Open the invitation"
    >
      <img
        src="/images/intro-poster.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <video
        ref={videoRef}
        src="/videos/intro.mp4"
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover md:object-[center_60%]"
      />
      <div className="absolute inset-0 bg-black/20" />
      {!started && (
        <div className="z-10 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg bg-white animate-float">
            <Heart className="h-7 w-7" style={{ color: "hsl(330, 70%, 60%)" }} fill="currentColor" />
          </div>
          <p className="font-serif text-lg tracking-[0.2em] uppercase drop-shadow-lg text-white">
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
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center animate-fade-up">
      <p className="text-xs md:text-sm tracking-[0.4em] uppercase text-gold-deep">
        You are invited to the wedding of
      </p>
      <h1 className="mt-6 font-script text-7xl md:text-9xl text-gradient-gold leading-none">
        Sweatha
      </h1>
      <div className="flex items-center gap-4 my-2">
        <span className="h-px w-16 bg-gold/60" />
        <span className="font-script text-3xl text-gold-deep">&amp;</span>
        <span className="h-px w-16 bg-gold/60" />
      </div>
      <h1 className="font-script text-7xl md:text-9xl text-gradient-gold leading-none">
        Sakthivel
      </h1>
      <Ornament />
      <p className="text-base md:text-lg text-muted-foreground italic">
        Together with their families
      </p>
      <p className="mt-2 text-sm tracking-[0.3em] uppercase text-gold-deep">
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
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 text-center text-white px-6 max-w-2xl">
        <p className="tracking-[0.4em] uppercase text-xs md:text-sm text-white/90">
          Save the Date
        </p>
        <h2 className="font-script text-6xl md:text-8xl mt-4 text-gold">
          Sweatha &amp; Sakthivel
        </h2>
        <Ornament />
        <ScratchCard />
        <p className="text-xs md:text-sm mt-4 tracking-[0.25em] uppercase text-white/80">
          ✨ Scratch to reveal the date ✨
        </p>
      </div>
    </section>
  );
}

function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

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
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
    // Check reveal %
    const { width, height } = canvas;
    const data = ctx.getImageData(0, 0, width, height).data;
    let cleared = 0;
    for (let i = 3; i < data.length; i += 40) if (data[i] === 0) cleared++;
    if (cleared / (data.length / 40) > 0.5) setRevealed(true);
  };

  return (
    <div className="mt-6 flex justify-center">
      <div
        ref={containerRef}
        className="relative w-full max-w-md h-32 md:h-36 rounded-lg overflow-hidden shadow-elegant bg-white/10 backdrop-blur-sm border border-gold/40"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <p className="font-script text-3xl md:text-4xl text-gold">
            17<sup>th</sup> &amp; 18<sup>th</sup> June 2026
          </p>
          <p className="text-xs md:text-sm mt-1 text-white/90 italic">
            Vellore, Tamil Nadu
          </p>
        </div>
        <canvas
          ref={canvasRef}
          onPointerDown={(e) => {
            (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
            if (canvasRef.current && !canvasRef.current.width) init();
            isDrawing.current = true;
            scratch(e);
          }}
          onPointerMove={scratch}
          onPointerUp={() => (isDrawing.current = false)}
          onPointerEnter={() => {
            if (canvasRef.current && !canvasRef.current.width) init();
          }}
          ref-callback={init}
          className={`absolute inset-0 w-full h-full cursor-grab touch-none transition-opacity duration-700 ${revealed ? "opacity-0 pointer-events-none" : "opacity-100"}`}
          style={{ touchAction: "none" }}
        />
      </div>
    </div>
  );
}

function Timeline() {
  const events = [
    { icon: Sparkles, title: "Reception", date: "17th June 2026, Wednesday", time: "6:30 PM onwards" },
    { icon: Flame, title: "Wedding Ceremony", date: "18th June 2026, Thursday", time: "Between 7:30 AM – 9:00 AM" },
  ];
  return (
    <section className="py-24 px-6 bg-background">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-gold-deep">Celebrate with us</p>
        <h2 className="font-script text-5xl md:text-7xl text-gradient-gold mt-2">
          Wedding Timeline
        </h2>
        <Ornament />
      </div>
      <div className="relative mx-auto max-w-2xl">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold to-transparent" />
        <div className="space-y-16">
          {events.map((e, i) => {
            const Icon = e.icon;
            const left = i % 2 === 0;
            return (
              <div key={e.title} className="relative flex items-center">
                <div className={`w-1/2 ${left ? "pr-12 text-right" : "pl-12 order-3 text-left"}`}>
                  <h3 className="font-serif text-2xl text-maroon font-semibold">{e.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{e.date}</p>
                  <p className="text-sm text-gold-deep mt-0.5 italic">{e.time}</p>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold shadow-elegant text-white z-10">
                  <Icon className="h-5 w-5" />
                </div>
                <div className={`w-1/2 ${left ? "order-3" : ""}`} />
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
    <section className="py-24 px-6 bg-secondary/40">
      <div className="text-center mb-14">
        <p className="text-xs tracking-[0.4em] uppercase text-gold-deep">Celebrate with us</p>
        <h2 className="font-script text-5xl md:text-7xl text-gradient-gold mt-2">
          The Functions
        </h2>
        <Ornament />
      </div>
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {cards.map((c) => (
          <article
            key={c.title}
            className="group relative h-[480px] overflow-hidden rounded-lg shadow-elegant"
          >
            <img
              src={c.img}
              alt={c.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white text-center">
              <h3 className="font-script text-5xl text-gold">{c.title}</h3>
              <Ornament />
              <p className="font-serif text-lg">{c.date}</p>
              <p className="text-sm text-white/80 italic">{c.time}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Venue() {
  return (
    <section className="py-24 px-6 text-center">
      <Calendar className="mx-auto h-6 w-6 text-gold" />
      <h2 className="font-script text-5xl md:text-7xl text-gradient-gold mt-2">
        The Venue
      </h2>
      <Ornament />
      <div className="mx-auto max-w-xl">
        <MapPin className="mx-auto h-6 w-6 text-gold-deep" />
        <p className="font-serif text-2xl md:text-3xl text-maroon mt-4">
          Sri Narayani Mahal (A/C)
        </p>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Thirumalaikodi, Sripuram, Ariyur,<br />
          Vellore – 632 055, Tamil Nadu
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Sri+Narayani+Mahal+Sripuram+Vellore"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-gold px-8 py-3 text-sm tracking-[0.25em] uppercase text-white shadow-elegant hover:scale-105 transition-transform"
        >
          <MapPin className="h-4 w-4" /> View on Map
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 text-center border-t border-gold/20">
      <Music className="mx-auto h-4 w-4 text-gold mb-3" />
      <p className="font-script text-3xl text-gradient-gold">With love</p>
      <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mt-2">
        Sweatha &amp; Sakthivel · 2026
      </p>
    </footer>
  );
}
