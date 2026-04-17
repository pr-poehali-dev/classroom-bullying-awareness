/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const MASHA_IMG = "https://cdn.poehali.dev/projects/265156a7-151c-4c75-930d-a4908815c614/files/b9d452e2-3d78-4aec-9922-9da7ff0cea98.jpg";

const slides = [
  {
    id: 0,
    type: "title",
    chapter: "",
    title: "Невидимые раны",
    subtitle: "История о буллинге, молчании и силе одного поступка",
    accent: "#D4956A",
    bg: "from-[#FDF6EE] via-[#F5E6D3] to-[#EDD5BF]",
    decoration: "❋",
  },
  {
    id: 1,
    type: "character",
    chapter: "Глава I",
    title: "Первая жертва",
    character: "Маша",
    age: "12 лет",
    description:
      "Маша любила читать и рисовать. Тихая, добрая, она всегда улыбалась первой. Но в новом классе её улыбку не замечали — зато замечали старый портфель, тихий голос и то, что она не такая, как все.",
    quote: "«Я просто хотела, чтобы меня не трогали...»",
    image: MASHA_IMG,
    accent: "#C47A5A",
    bg: "from-[#FDF0E8] via-[#F5E6D3] to-[#EDD5C0]",
    decoration: "◌",
    tags: ["Одиночество", "Насмешки", "Тихая боль"],
  },
  {
    id: 2,
    type: "scene",
    chapter: "Глава II",
    title: "Безмолвные свидетели",
    description:
      "Каждый день кто-то видел. Видел, как Маша ела одна. Видел брошенный рюкзак. Слышал смех за её спиной. Но все молчали — кто из страха стать следующим, кто из привычки не вмешиваться.",
    quote: "«Молчание — это тоже выбор»",
    accent: "#A0694A",
    bg: "from-[#F0E4D8] via-[#E8D5C0] to-[#DEC4A8]",
    decoration: "○",
    witnesses: [
      { name: "Катя", emoji: "👧", reason: "Боялась стать следующей" },
      { name: "Дима", emoji: "👦", reason: "Думал, что не его дело" },
      { name: "Учитель", emoji: "👩‍🏫", reason: "Не замечал за отчётами" },
    ],
  },
  {
    id: 3,
    type: "hero",
    chapter: "Глава III",
    title: "Первый шаг к переменам",
    character: "Петя",
    description:
      "Однажды утром Петя сел рядом с Машей в столовой. Просто сел. Не сказал ничего особенного — спросил, какую книгу она читает. Этот маленький жест изменил всё.",
    quote: "«Иногда достаточно одного человека, который не пройдёт мимо»",
    accent: "#8B7355",
    bg: "from-[#EEE4D5] via-[#E5D8C5] to-[#D8C9B0]",
    decoration: "✦",
    steps: [
      "Сел рядом — без лишних слов",
      "Заступился публично",
      "Позвал других присоединиться",
    ],
  },
  {
    id: 4,
    type: "transformation",
    chapter: "Глава IV",
    title: "Новая атмосфера",
    description:
      "Маленький поступок Пети стал искрой. За ним потянулись другие. Класс начал меняться — медленно, но верно. Маша снова улыбалась. Теперь её улыбку замечали.",
    quote: "«Доброта заразительна»",
    accent: "#7A8C5E",
    bg: "from-[#EAF0E0] via-[#DCE8D0] to-[#CEDBBA]",
    decoration: "❀",
    changes: [
      { before: "Насмешки", after: "Принятие", emoji: "🌱" },
      { before: "Молчание", after: "Разговор", emoji: "💬" },
      { before: "Одиночество", after: "Дружба", emoji: "🤝" },
    ],
  },
  {
    id: 5,
    type: "conclusion",
    chapter: "Итог",
    title: "Послание",
    accent: "#9B6A4A",
    bg: "from-[#FDF6EE] via-[#F5E6D3] to-[#EDD5BF]",
    decoration: "◈",
    messages: [
      {
        icon: "Eye",
        title: "Замечай",
        text: "Буллинг не всегда заметен взрослым. Замечай, что происходит рядом.",
      },
      {
        icon: "Heart",
        title: "Действуй",
        text: "Один смелый поступок может изменить жизнь другого человека.",
      },
      {
        icon: "Users",
        title: "Говори",
        text: "Молчать — значит соглашаться. Расскажи взрослому, которому доверяешь.",
      },
    ],
    finalQuote: "«Каждый заслуживает чувствовать себя в безопасности»",
  },
];

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setDirection(index > current ? "next" : "prev");
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 350);
    },
    [animating, current]
  );

  const next = useCallback(() => goTo(Math.min(current + 1, slides.length - 1)), [current, goTo]);
  const prev = useCallback(() => goTo(Math.max(current - 1, 0)), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  return (
    <div className="min-h-screen w-full font-body flex flex-col" style={{ background: "#FDF6EE" }}>
      {/* Header nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        <span className="font-display text-lg font-semibold" style={{ color: "#8B5E3C" }}>
          Невидимые раны
        </span>
        <div className="flex items-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 24 : 8,
                height: 8,
                background: i === current ? slide.accent : "#D4956A44",
              }}
            />
          ))}
        </div>
        <div className="text-sm font-body" style={{ color: "#C4956A" }}>
          {current + 1} / {slides.length}
        </div>
      </nav>

      {/* Main slide */}
      <main className="flex-1 flex items-center justify-center pt-20 pb-24 px-4 md:px-8 min-h-screen">
        <div
          key={current}
          className="w-full max-w-5xl"
          style={{
            transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === "next" ? "translateX(32px)" : "translateX(-32px)"
              : "translateX(0)",
          }}
        >
          {slide.type === "title" && <TitleSlide slide={slide} />}
          {slide.type === "character" && <CharacterSlide slide={slide} />}
          {slide.type === "scene" && <SceneSlide slide={slide} />}
          {slide.type === "hero" && <HeroSlide slide={slide} />}
          {slide.type === "transformation" && <TransformationSlide slide={slide} />}
          {slide.type === "conclusion" && <ConclusionSlide slide={slide} />}
        </div>
      </main>

      {/* Bottom controls */}
      <footer className="fixed bottom-0 left-0 right-0 flex items-center justify-center gap-6 py-5 z-50">
        <div
          className="flex items-center gap-4 px-6 py-3 rounded-full shadow-lg"
          style={{
            background: "rgba(253,246,238,0.95)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(212,149,106,0.25)",
          }}
        >
          <button
            onClick={prev}
            disabled={current === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 disabled:opacity-30"
            style={{ background: current === 0 ? "transparent" : slide.accent + "22", color: slide.accent }}
          >
            <Icon name="ChevronLeft" size={18} />
            Назад
          </button>
          <div className="w-px h-6 rounded" style={{ background: "#D4956A44" }} />
          <button
            onClick={next}
            disabled={current === slides.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-200 disabled:opacity-30"
            style={{ background: current === slides.length - 1 ? "transparent" : slide.accent + "22", color: slide.accent }}
          >
            Далее
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
}

function TitleSlide({ slide }: { slide: any }) {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${slide.bg} min-h-[72vh] flex flex-col items-center justify-center text-center p-12 md:p-20`}
      style={{ boxShadow: "0 40px 80px rgba(180,100,60,0.12)" }}
    >
      <div
        className="absolute top-8 right-12 font-display text-8xl opacity-10 select-none"
        style={{ color: slide.accent, animation: "float 4s ease-in-out infinite" }}
      >
        {slide.decoration}
      </div>
      <div
        className="absolute bottom-12 left-10 font-display text-6xl opacity-10 select-none"
        style={{ color: slide.accent, animation: "float 4s ease-in-out infinite 1.5s" }}
      >
        ◌
      </div>
      <div
        className="inline-block px-4 py-1.5 rounded-full text-xs font-body font-medium mb-8 tracking-widest uppercase"
        style={{ background: slide.accent + "22", color: slide.accent }}
      >
        Интерактивная история
      </div>
      <h1
        className="font-display text-6xl md:text-8xl font-semibold leading-none mb-6"
        style={{ color: "#4A2E1A" }}
      >
        {slide.title}
      </h1>
      <p className="font-body text-lg md:text-xl max-w-lg leading-relaxed" style={{ color: "#8B5E3C" }}>
        {slide.subtitle}
      </p>
      <div className="flex items-center gap-3 mt-12">
        <div className="w-12 h-px rounded" style={{ background: slide.accent + "60" }} />
        <span className="font-body text-sm" style={{ color: slide.accent }}>
          Листайте, чтобы начать
        </span>
        <div className="w-12 h-px rounded" style={{ background: slide.accent + "60" }} />
      </div>
    </div>
  );
}

function CharacterSlide({ slide }: { slide: any }) {
  return (
    <div
      className={`rounded-3xl overflow-hidden bg-gradient-to-br ${slide.bg} min-h-[72vh]`}
      style={{ boxShadow: "0 40px 80px rgba(180,100,60,0.10)" }}
    >
      <div className="grid md:grid-cols-2 min-h-[72vh]">
        <div className="relative overflow-hidden" style={{ minHeight: 360 }}>
          <img
            src={slide.image}
            alt={slide.character}
            className="w-full h-full object-cover object-top"
            style={{ minHeight: 360, maxHeight: 600 }}
          />
          <div
            className="absolute bottom-6 left-6 px-4 py-2 rounded-full font-body text-sm font-medium"
            style={{ background: "rgba(253,246,238,0.92)", color: slide.accent }}
          >
            {slide.chapter}
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:p-12">
          <span className="font-body text-sm font-medium tracking-wider uppercase mb-2 block" style={{ color: slide.accent }}>
            Знакомьтесь
          </span>
          <h2 className="font-display text-5xl md:text-6xl font-semibold mb-1" style={{ color: "#4A2E1A" }}>
            {slide.character}
          </h2>
          <p className="font-body text-sm mb-6" style={{ color: "#C4956A" }}>
            {slide.age}
          </p>
          <p className="font-body text-base leading-relaxed mb-8" style={{ color: "#6B4226" }}>
            {slide.description}
          </p>
          <blockquote
            className="font-display text-xl italic leading-relaxed mb-8 pl-4"
            style={{ color: "#8B5E3C", borderLeft: `3px solid ${slide.accent}44` }}
          >
            {slide.quote}
          </blockquote>
          <div className="flex flex-wrap gap-2">
            {slide.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full font-body text-xs font-medium"
                style={{ background: slide.accent + "18", color: slide.accent }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneSlide({ slide }: { slide: any }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${slide.bg} min-h-[72vh] flex flex-col justify-center p-8 md:p-16`}
      style={{ boxShadow: "0 40px 80px rgba(160,80,40,0.10)" }}
    >
      <span className="font-body text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: slide.accent }}>
        {slide.chapter}
      </span>
      <h2 className="font-display text-5xl md:text-7xl font-semibold mb-8" style={{ color: "#4A2E1A" }}>
        {slide.title}
      </h2>
      <p className="font-body text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#6B4226" }}>
        {slide.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {slide.witnesses?.map((w: any) => (
          <div
            key={w.name}
            className="rounded-2xl p-5"
            style={{ background: "rgba(253,246,238,0.6)", border: `1px solid ${slide.accent}22` }}
          >
            <div className="text-3xl mb-3">{w.emoji}</div>
            <div className="font-body font-semibold text-base mb-1" style={{ color: "#4A2E1A" }}>
              {w.name}
            </div>
            <div className="font-body text-sm leading-snug" style={{ color: "#8B5E3C" }}>
              {w.reason}
            </div>
          </div>
        ))}
      </div>
      <blockquote className="font-display text-2xl md:text-3xl italic" style={{ color: slide.accent }}>
        {slide.quote}
      </blockquote>
    </div>
  );
}

function HeroSlide({ slide }: { slide: any }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${slide.bg} min-h-[72vh] flex flex-col justify-center p-8 md:p-16 relative overflow-hidden`}
      style={{ boxShadow: "0 40px 80px rgba(139,115,85,0.10)" }}
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20"
        style={{ background: `radial-gradient(circle, ${slide.accent}, transparent)`, transform: "translate(30%, -30%)" }}
      />
      <span className="font-body text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: slide.accent }}>
        {slide.chapter}
      </span>
      <h2 className="font-display text-5xl md:text-7xl font-semibold mb-2" style={{ color: "#4A2E1A" }}>
        {slide.title}
      </h2>
      <p className="font-display text-2xl italic mb-8" style={{ color: slide.accent }}>
        Герой — {slide.character}
      </p>
      <p className="font-body text-lg leading-relaxed max-w-2xl mb-10" style={{ color: "#6B4226" }}>
        {slide.description}
      </p>
      <div className="flex flex-col gap-3 mb-10 max-w-md">
        {slide.steps?.map((step: string, i: number) => (
          <div key={i} className="flex items-center gap-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0"
              style={{ background: slide.accent, color: "#FDF6EE" }}
            >
              {i + 1}
            </div>
            <span className="font-body text-base" style={{ color: "#4A2E1A" }}>
              {step}
            </span>
          </div>
        ))}
      </div>
      <blockquote
        className="font-display text-xl md:text-2xl italic pl-5"
        style={{ color: "#8B5E3C", borderLeft: `3px solid ${slide.accent}55` }}
      >
        {slide.quote}
      </blockquote>
    </div>
  );
}

function TransformationSlide({ slide }: { slide: any }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${slide.bg} min-h-[72vh] flex flex-col justify-center p-8 md:p-16`}
      style={{ boxShadow: "0 40px 80px rgba(120,140,90,0.10)" }}
    >
      <span className="font-body text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: slide.accent }}>
        {slide.chapter}
      </span>
      <h2 className="font-display text-5xl md:text-7xl font-semibold mb-8" style={{ color: "#3A4A2A" }}>
        {slide.title}
      </h2>
      <p className="font-body text-lg leading-relaxed max-w-2xl mb-12" style={{ color: "#4A5E3A" }}>
        {slide.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {slide.changes?.map((c: any) => (
          <div
            key={c.before}
            className="rounded-2xl p-6 text-center"
            style={{ background: "rgba(253,253,245,0.65)", border: `1px solid ${slide.accent}30` }}
          >
            <div className="text-3xl mb-4">{c.emoji}</div>
            <div className="font-body text-sm line-through mb-2 opacity-50" style={{ color: "#6B7A5A" }}>
              {c.before}
            </div>
            <div className="font-body font-semibold text-lg" style={{ color: "#3A4A2A" }}>
              {c.after}
            </div>
          </div>
        ))}
      </div>
      <blockquote className="font-display text-2xl md:text-3xl italic" style={{ color: slide.accent }}>
        {slide.quote}
      </blockquote>
    </div>
  );
}

function ConclusionSlide({ slide }: { slide: any }) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-br ${slide.bg} min-h-[72vh] flex flex-col justify-center p-8 md:p-16`}
      style={{ boxShadow: "0 40px 80px rgba(180,100,60,0.12)" }}
    >
      <span className="font-body text-sm font-medium tracking-wider uppercase mb-4 block" style={{ color: slide.accent }}>
        {slide.chapter}
      </span>
      <h2 className="font-display text-5xl md:text-7xl font-semibold mb-10" style={{ color: "#4A2E1A" }}>
        {slide.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        {slide.messages?.map((m: any) => (
          <div
            key={m.title}
            className="rounded-2xl p-6"
            style={{ background: "rgba(253,246,238,0.7)", border: `1px solid ${slide.accent}28` }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
              style={{ background: slide.accent + "22" }}
            >
              <Icon name={m.icon} size={20} style={{ color: slide.accent }} />
            </div>
            <h3 className="font-body font-semibold text-lg mb-2" style={{ color: "#4A2E1A" }}>
              {m.title}
            </h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: "#8B5E3C" }}>
              {m.text}
            </p>
          </div>
        ))}
      </div>
      <div
        className="rounded-2xl p-8 text-center"
        style={{ background: slide.accent + "14", border: `1px solid ${slide.accent}30` }}
      >
        <blockquote className="font-display text-2xl md:text-3xl italic" style={{ color: "#4A2E1A" }}>
          {slide.finalQuote}
        </blockquote>
      </div>
    </div>
  );
}