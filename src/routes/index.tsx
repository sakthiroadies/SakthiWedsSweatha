import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import introPoster from "@/assets/intro-poster.jpg";
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

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {!opened && <IntroCurtain onOpen={() => setOpened(true)} />}
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
  const handle = () => {
    setClosing(true);
    setTimeout(onOpen, 1200);
  };
  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        className={`absolute inset-y-0 left-0 w-1/2 bg-cover bg-right pointer-events-auto ${closing ? "animate-curtain-left" : ""}`}
        style={{ backgroundImage: `url(${introPoster})` }}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 bg-cover bg-left pointer-events-auto ${closing ? "animate-curtain-right" : ""}`}
        style={{ backgroundImage: `url(${introPoster})`, backgroundPosition: "left center" }}
      />
      {!closing && (
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 pointer-events-auto">
          <button
            onClick={handle}
            className="group flex flex-col items-center gap-3 text-white"
            aria-label="Open the invitation"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 shadow-elegant animate-float">
              <Heart className="h-6 w-6 text-rose-500 fill-rose-500" />
            </span>
            <span className="font-serif tracking-[0.35em] text-sm uppercase drop-shadow-lg group-hover:tracking-[0.45em] transition-all">
              Open the Invitation
            </span>
          </button>
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
        <p className="font-serif text-xl md:text-2xl mt-2">
          17<sup>th</sup> &amp; 18<sup>th</sup> June 2026
        </p>
        <p className="text-sm md:text-base mt-1 text-white/80 italic">
          Vellore, Tamil Nadu
        </p>
      </div>
    </section>
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
