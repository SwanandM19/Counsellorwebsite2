
'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  // State for countdown
  const [countdown, setCountdown] = useState({ hours: 18, minutes: 4, seconds: 22 });

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-clip');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  // Count-up observer
  useEffect(() => {
    const countElements = document.querySelectorAll('.count-up');

    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.getAttribute('data-target') || '0');
          const duration = 2000;
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const updateCount = () => {
            frame++;
            const progress = frame / totalFrames;
            const currentCount = Math.round(target * progress);

            if (frame < totalFrames) {
              entry.target.textContent = currentCount.toString();
              requestAnimationFrame(updateCount);
            } else {
              entry.target.textContent = target.toString();
            }
          };

          requestAnimationFrame(updateCount);
          countObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    countElements.forEach(el => countObserver.observe(el));

    return () => countObserver.disconnect();
  }, []);

  // Bento card mouse effect
  useEffect(() => {
    const bentoCards = document.querySelectorAll('.bento-card');

    const handleMouseMove = (e: MouseEvent, card: Element) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    };

    bentoCards.forEach(card => {
      const handler = (e: Event) => handleMouseMove(e as MouseEvent, card);
      card.addEventListener('mousemove', handler);
      (card as any)._handler = handler;
    });

    return () => {
      bentoCards.forEach(card => {
        card.removeEventListener('mousemove', (card as any)._handler);
      });
    };
  }, []);

  // System items interaction
  useEffect(() => {
    const systemItems = document.querySelectorAll('.system-item');
    const blueprintLayers = document.querySelectorAll('.blueprint-layer');

    systemItems.forEach(item => {
      const handleMouseEnter = () => {
        const targetId = item.getAttribute('data-target');

        systemItems.forEach(i => {
          const indicator = i.querySelector('.indicator');
          const title = i.querySelector('h4');
          if (i === item) {
            indicator?.classList.remove('bg-slate-300');
            indicator?.classList.add('bg-[#E8573A]');
            title?.classList.remove('text-slate-900');
            title?.classList.add('text-[#E8573A]');
          } else {
            indicator?.classList.add('bg-slate-300');
            indicator?.classList.remove('bg-[#E8573A]');
            title?.classList.add('text-slate-900');
            title?.classList.remove('text-[#E8573A]');
          }
        });

        blueprintLayers.forEach((layer, index) => {
          if (index.toString() === targetId) {
            layer.classList.remove('opacity-0', 'scale-95');
            layer.classList.add('opacity-100', 'scale-100', 'active');
          } else {
            layer.classList.add('opacity-0', 'scale-95');
            layer.classList.remove('opacity-100', 'scale-100', 'active');
          }
        });
      };

      item.addEventListener('mouseenter', handleMouseEnter);
      (item as any)._handler = handleMouseEnter;
    });

    return () => {
      systemItems.forEach(item => {
        item.removeEventListener('mouseenter', (item as any)._handler);
      });
    };
  }, []);

  return (
    <div className="scroll-smooth bg-white text-slate-900 selection:bg-[#E8573A] selection:text-white relative">
      {/* Noise Overlay - Fixed */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply bg-noise" />

      {/* Global Layout Lines - Hidden */}
      {/* <div className="fixed inset-y-0 left-[clamp(1.5rem,5vw,5rem)] w-px bg-slate-900/[0.04] pointer-events-none z-0" />
      <div className="fixed inset-y-0 right-[clamp(1.5rem,5vw,5rem)] w-px bg-slate-900/[0.04] pointer-events-none z-0" /> */}

      {/* STATIC BACKGROUND - Fixed and never scrolls */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#AEC7E4] via-[#C0D6EC] to-white" />

        {/* Left Cloud */}
        <div className="absolute -left-[10%] top-[15%] w-[50vw] min-w-[400px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', maskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)' }} />

        {/* Right Cloud */}
        <div className="absolute -right-[15%] top-[5%] w-[60vw] min-w-[500px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', maskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', transform: 'scaleX(-1) rotate(5deg)' }} />

        {/* Background Grid - Hidden */}
        {/* <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)]" /> */}
      </div>

      {/* SCROLLABLE CONTENT - Relative with transparent background */}
      <div className="relative z-10 bg-transparent">
        {/* Floating Navigation Pill */}
        <nav id="navbar" className="fixed top-6 md:top-8 inset-x-0 mx-auto z-50 w-[92%] max-w-[55rem] transition-all duration-700 reveal-up is-visible" style={{ transitionDelay: '1s' }}>
          <div className="flex items-center justify-between relative px-2.5 py-2.5 bg-white/80 backdrop-blur-xl border border-slate-900/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
            <div className="flex-none pl-3 z-10">
              <a href="#" className="flex items-center gap-3 group/logo">
                <img
                  src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7779c4e9-cf43-4379-a162-96455d9c5618_320w.png"
                  alt="Coast Flight Training"
                  className="md:h-8 transition-transform duration-500 group-hover/logo:scale-105 w-auto h-7 object-contain"
                />
              </a>
            </div>

            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 px-4 border-x border-slate-900/10 h-[60%]">
              <a href="#architecture" className="text-xs font-mono font-light text-slate-500 hover:text-slate-900 hover:bg-slate-900/5 px-4 py-2 rounded-full transition-all duration-300">
                Pathways
              </a>
              <a href="#fleet" className="text-xs font-mono font-light text-slate-500 hover:text-slate-900 hover:bg-slate-900/5 px-4 py-2 rounded-full transition-all duration-300">
                Fleet
              </a>
              <a href="#admissions" className="text-xs font-mono font-light text-slate-500 hover:text-slate-900 hover:bg-slate-900/5 px-4 py-2 rounded-full transition-all duration-300">
                Admissions
              </a>
            </div>

            <div className="flex-none pr-1 z-10">
              <a href="#contact" className="codepen-button hidden md:inline-block">
                <span className="px-5 py-2 text-xs font-mono tracking-wider flex items-center gap-2">
                  BOOK FLIGHT
                  {/* @ts-expect-error - web component */}
                  <iconify-icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
                </span>
              </a>
              <button className="md:hidden flex flex-col gap-1.5 p-3">
                <div className="w-4 h-[1px] bg-slate-900" />
                <div className="w-4 h-[1px] bg-slate-900" />
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] w-full flex items-center pt-[8rem] pb-[4rem] px-[clamp(1.5rem,5vw,5rem)] overflow-hidden">
          <div className="w-full max-w-[90rem] mx-auto relative z-10 grid grid-cols-1 gap-12 items-center">
            <div className="flex flex-col items-center text-center mt-12 md:mt-0">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-8 reveal-up shadow-sm is-visible" style={{ transitionDelay: '1.1s' }}>
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse shadow-[0_0_10px_rgba(232,87,58,0.20)]" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  Professional Flight School
                </span>
              </div>

              <h1 className="font-display font-normal text-[clamp(2.5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-slate-900 mb-8 reveal-up text-balance flex flex-col items-center w-full is-visible" style={{ transitionDelay: '1.2s' }}>
                <span className="sr-only">Professional Flight School</span>
                <span>THE SKY IS NO</span>
                <span className="flex items-center justify-center gap-3 md:gap-4 flex-wrap w-full">
                  LONGER THE
                  <span className="hidden sm:inline-flex h-[clamp(2.5rem,5vw,6rem)] w-[clamp(6rem,12vw,14rem)] bg-white border rounded-full items-center justify-center overflow-hidden relative group backdrop-blur-sm shadow-sm border-white">
                    <span className="bg-center group-hover:scale-110 transition-transform duration-1000 opacity-60 bg-[url(https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?w=320&q=80)] bg-cover absolute inset-0" />
                    <span className="z-[5] border-stone-50 absolute inset-0" />
                    <span className="text-xs text-neutral-50 tracking-widest font-mono z-10 relative">
                      LIMIT.
                    </span>
                  </span>
                </span>
                <span>IT'S YOUR OFFICE.</span>
              </h1>

              <p className="font-sans text-[clamp(1.125rem,1.5vw,1.5rem)] font-light text-slate-600 max-w-[50ch] leading-[1.6] mb-12 reveal-up text-balance is-visible" style={{ transitionDelay: '1.3s' }}>
                Elite Airline Pilot Training in San Diego, Dallas, and San Marcos.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto reveal-up is-visible" style={{ transitionDelay: '1.4s' }}>
                <a href="#admissions" className="codepen-button w-full sm:w-auto">
                  <span className="px-8 py-4 text-sm font-mono tracking-widest flex items-center gap-2">
                    BOOK A DISCOVERY FLIGHT
                    {/* @ts-expect-error - web component */}
                    <iconify-icon icon="solar:paperplane-linear" className="w-5 h-5" />
                  </span>
                </a>
                <a href="#architecture" className="group flex items-center justify-center gap-3 h-14 px-6 text-xs text-slate-500 hover:text-slate-900 font-mono font-light tracking-widest transition-colors w-full sm:w-auto">
                  <div className="w-8 h-[1px] bg-slate-300 group-hover:w-12 group-hover:bg-slate-900 transition-all duration-300" />
                  EXPLORE PATHWAYS
                </a>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute left-[clamp(1.5rem,5vw,5rem)] bottom-12 hidden lg:flex flex-col items-start gap-4 reveal-up is-visible" style={{ transitionDelay: '1.5s' }}>
            <div className="font-mono text-xs font-light text-slate-900 tracking-widest transform -rotate-90 origin-left translate-y-12">
              SCROLL
            </div>
            <div className="w-[1px] h-16 bg-slate-900/30 relative overflow-hidden ml-2">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-900 animate-slideDown" />
            </div>
          </div>
        </section>
        {/* Metrics - Now with semi-transparent background */}
        <section className="border-y border-slate-200 relative z-20 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 w-full">
            {[
              { label: 'PILOTS TRAINED', target: 34, suffix: '', description: 'Career and recreational graduates across three campuses.' },
              { label: 'PLACEMENT RATE', target: 99, suffix: '.9%', description: 'Academy graduates placed with airline partners.' },
              { label: 'AIRCRAFT FLEET', target: 15, suffix: 'Y', description: 'Cirrus, Piper, Cessna — all G1000 equipped.' },
              { label: 'JOB OFFERS', target: 4, suffix: '.2B', prefix: '$', description: 'More conditional offers than any peer school nationally.' }
            ].map((metric, idx) => (
              <div key={idx} className="p-10 lg:p-14 flex flex-col justify-between aspect-square group bg-white/50 hover:bg-[#E8573A] transition-colors duration-500 cursor-default relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 mix-blend-multiply grayscale" />
                <span className="group-hover:text-white/80 transition-colors z-10 text-xs font-normal text-slate-500 tracking-widest font-mono relative">
                  {metric.label}
                </span>
                <div className="relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
                  <div className="text-[clamp(3.5rem,6vw,5.5rem)] leading-none group-hover:text-white transition-colors font-normal text-slate-900 tracking-tighter font-display mb-2">
                    {metric.prefix && <span className="text-[clamp(1.75rem,3vw,3rem)] align-top">{metric.prefix}</span>}
                    <span className="count-up" data-target={metric.target}>0</span>
                    {metric.suffix}
                  </div>
                  <p className="group-hover:text-white/90 transition-colors text-sm font-light text-slate-500">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture / Asymmetric Bento Grid */}
        <section id="architecture" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white/90 backdrop-blur-sm">
          <div className="max-w-[90rem] mx-auto">
            <div className="mb-12 md:mb-20 reveal-up is-visible">
              <span className="font-mono text-xs font-light text-[#E8573A] tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-[#E8573A]" />
                Training Pathways
              </span>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-none mb-6 text-slate-900">
                Your Journey.
                <br />
                <span className="text-slate-400">Our Expertise.</span>
              </h2>
              <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-light text-slate-500 max-w-[45ch] leading-[1.6]">
                From zero experience to airline-ready. Our structured programs are
                designed to turn ambition into a professional aviation career.
              </p>
            </div>

            {/* Asymmetric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[24rem]">
              {/* Main Featured Box */}
              <div className="md:col-span-8 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible">
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                  <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white via-white/70 to-transparent z-10 pointer-events-none" />
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/0ae91804-ad20-4064-a787-425d5dc07a7b_1600w.jpg" alt="Airline Career" className="w-full h-full object-cover saturate-[1.1] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]" />
                </div>
                <div className="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
                  <div className="flex justify-between items-start mb-12 md:mb-0">
                    <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                      PROGRAM_01
                    </div>
                    {/* @ts-expect-error - web component */}
                    <iconify-icon icon="solar:paperplane-linear" className="w-8 h-8 text-slate-900 opacity-40 group-hover:opacity-100 group-hover:text-[#F06B4E] transition-all duration-500 text-3xl" />
                  </div>
                  <div className="max-w-[32rem] pointer-events-auto">
                    <h3 className="font-display font-normal text-[clamp(2rem,3vw,3rem)] text-slate-900 mb-4 leading-none tracking-tight drop-shadow-sm group-hover:drop-shadow-none">
                      Airline Career
                    </h3>
                    <p className="text-base font-light text-slate-600 leading-[1.6] mb-8 group-hover:text-slate-800 transition-colors">
                      Our premier structured training program designed to take you
                      from zero hours to a guaranteed flight instructor role, and
                      onward to the airlines.
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors">
                      VIEW CURRICULUM
                      {/* @ts-expect-error - web component */}
                      <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style={{ transitionDelay: '0.1s' }}>
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                  <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white via-white/70 to-transparent z-10 pointer-events-none" />
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/6adba3db-5f1c-4818-920e-2ba54a1e81b1_1600w.jpg" alt="Military Transition" className="w-full h-full object-cover contrast-[1.08] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]" />
                </div>
                <div className="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
                  <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                      PROGRAM_02
                    </div>
                  </div>
                  <div className="pointer-events-auto">
                    <h3 className="font-display font-normal text-[clamp(1.5rem,2.5vw,2rem)] text-slate-900 mb-3 tracking-tight">
                      Military Transition
                    </h3>
                    <p className="text-base font-light text-slate-600 leading-relaxed mb-6 group-hover:text-slate-800 transition-colors">
                      Rotor transition and skillbridge programs tailored for veterans.
                    </p>
                    <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors">
                      VIEW CURRICULUM
                      {/* @ts-expect-error - web component */}
                      <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Horizontal Wide Box */}
              <div className="md:col-span-12 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style={{ transitionDelay: '0.2s' }}>
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent z-10 pointer-events-none" />
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/52cb41cc-89b1-4d2b-8d88-f41e229a3b68_1600w.jpg" alt="Private Pilot" className="contrast-[1.05] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05] w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center z-10 relative w-full pointer-events-none">
                  <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 self-start mb-6 backdrop-blur-md">
                    PROGRAM_03
                  </div>
                  <h3 className="font-display font-normal text-[clamp(1.75rem,2.5vw,2.25rem)] text-slate-900 mb-4 tracking-tight">
                    Private Pilot
                  </h3>
                  <p className="text-base font-light text-slate-600 leading-[1.6] max-w-[40ch] mb-6 group-hover:text-slate-800 transition-colors">
                    Fly for business or pleasure. The ultimate freedom begins here
                    with our world-class modern fleet.
                  </p>
                  <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors pointer-events-auto">
                    VIEW CURRICULUM
                    {/* @ts-expect-error - web component */}
                    <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* How It Works - Flight Training Journey */}
        <section id="how-it-works" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10">
          <div className="max-w-[90rem] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20 reveal-up">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  Your Journey
                </span>
              </div>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
                From Cockpit to Career.
                <br />
                <span className="text-[#E8573A]">Three Simple Steps.</span>
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
                Your path to becoming a professional pilot starts here. We've simplified
                the journey so you can focus on what matters most — flying.
              </p>
            </div>

            {/* Main Glass Container */}
            <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none" />

              {/* Background decorative elements */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl" />

              {/* Steps Grid inside glass container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative p-8 md:p-12">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[30%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* Step 1 */}
                <div className="relative group reveal-up" style={{ transitionDelay: '0.1s' }}>
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-10 hover:border-[#E8573A]/50 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-lg">
                    {/* Glass reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Step Number */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-7xl md:text-8xl font-display font-bold text-white/30 group-hover:text-[#E8573A]/20 transition-colors duration-500">
                        01
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#E8573A]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E8573A] transition-all duration-500 group-hover:scale-110 border border-white/30">
                        <svg className="w-6 h-6 text-[#E8573A] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-normal text-slate-900 mb-3 tracking-tight">
                      Book Your
                      <br />
                      Discovery Flight
                    </h3>

                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      Schedule your introductory flight experience. Meet our instructors, tour our facility, and get hands-on experience in the cockpit.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
                      <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 1</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2 mt-4 px-2">
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">No experience needed</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">All ages welcome</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative group reveal-up" style={{ transitionDelay: '0.2s' }}>
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-10 hover:border-[#E8573A]/50 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-7xl md:text-8xl font-display font-bold text-white/30 group-hover:text-[#E8573A]/20 transition-colors duration-500">
                        02
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#E8573A]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E8573A] transition-all duration-500 group-hover:scale-110 border border-white/30">
                        <svg className="w-6 h-6 text-[#E8573A] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-normal text-slate-900 mb-3 tracking-tight">
                      Choose Your
                      <br />
                      Training Path
                    </h3>

                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      Select from our structured programs — Private Pilot, Commercial, or Airline Career. Each path is tailored to your goals.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
                      <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 2</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 px-2">
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Flexible scheduling</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Financing available</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative group reveal-up" style={{ transitionDelay: '0.3s' }}>
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-10 hover:border-[#E8573A]/50 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center justify-between mb-6">
                      <div className="text-7xl md:text-8xl font-display font-bold text-white/30 group-hover:text-[#E8573A]/20 transition-colors duration-500">
                        03
                      </div>
                      <div className="w-12 h-12 rounded-full bg-[#E8573A]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E8573A] transition-all duration-500 group-hover:scale-110 border border-white/30">
                        <svg className="w-6 h-6 text-[#E8573A] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-display font-normal text-slate-900 mb-3 tracking-tight">
                      Earn Your
                      <br />
                      Wings & Takeoff
                    </h3>

                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      Complete your training, earn certifications, and launch your aviation career with our airline placement program.
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
                      <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 3</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4 px-2">
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Job placement assistance</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Lifetime support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Link */}
            <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
              <a href="#admissions" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
                <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
                START YOUR JOURNEY TODAY
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
        {/* About Section - Lead Instructor */}
        <section id="about" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10">
          <div className="max-w-[90rem] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20 reveal-up">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  Meet Your Instructor
                </span>
              </div>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
                Experience You Can
                <br />
                <span className="text-[#E8573A]">Trust Behind the Controls.</span>
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
                Learn from industry veterans who've logged thousands of hours and are
                passionate about shaping the next generation of pilots.
              </p>
            </div>

            {/* Main Glass Container */}
            <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
              {/* Subtle inner glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none" />

              {/* Background decorative elements */}
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl" />

              {/* Decorative aviation elements */}
              <div className="absolute top-10 right-10 opacity-10">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </div>
              <div className="absolute bottom-10 left-10 opacity-10">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative p-8 md:p-12">
                {/* Image Section */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8573A]/20 to-transparent rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700" />
                  <div className="relative rounded-2xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-sm shadow-xl">
                    <img
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
                      alt="Captain James Wilson - Lead Flight Instructor"
                      className="w-full h-full object-cover aspect-[4/5] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-white rounded-full px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                        <span className="text-xs font-mono font-light text-slate-900 tracking-wider">
                          ATP CERTIFIED • 15,000+ HOURS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center space-y-6">
                  {/* Name & Title */}
                  <div className="reveal-up">
                    <h3 className="text-4xl md:text-5xl font-display font-normal text-slate-900 mb-3 tracking-tight">
                      Captain James Wilson
                    </h3>
                    <div className="inline-flex items-center gap-2 bg-[#E8573A]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8573A]/20">
                      <span className="w-1.5 h-1.5 bg-[#E8573A] rounded-full" />
                      <span className="text-xs font-mono font-light text-[#E8573A] tracking-wider">
                        ATP • CFI • CFII • MEI
                      </span>
                    </div>
                  </div>

                  {/* Bio Text */}
                  <div className="space-y-4 reveal-up" style={{ transitionDelay: '0.1s' }}>
                    <p className="text-slate-600 font-light leading-relaxed">
                      Captain James Wilson is a licensed Airline Transport Pilot (ATP) and
                      Certified Flight Instructor in California, Texas, and Florida. He has
                      been working in the field of professional aviation training, airline
                      operations, and flight safety education for the past fifteen years.
                    </p>
                    <p className="text-slate-600 font-light leading-relaxed">
                      His passion is to support aspiring pilots in overcoming the challenges
                      that hold them back from achieving their aviation dreams. When he's not
                      in the cockpit or teaching, he enjoys mentoring young aviators,
                      restoring vintage aircraft, and spending time with his family.
                    </p>
                  </div>

                  {/* Credentials Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 reveal-up" style={{ transitionDelay: '0.2s' }}>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">15,000+</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Flight Hours</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">8,000+</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Students Trained</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">4</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Type Ratings</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">20+</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Years Experience</div>
                    </div>
                  </div>

                  {/* Social/Contact Links */}
                  <div className="flex gap-4 pt-4 reveal-up" style={{ transitionDelay: '0.3s' }}>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-[#E8573A] hover:border-[#E8573A] transition-all duration-300 group">
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                        <circle cx="4" cy="4" r="2" stroke="none" fill="currentColor" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-[#E8573A] hover:border-[#E8573A] transition-all duration-300 group">
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 12.1c0 1.8-.3 3.6-.9 5.3-.6 1.7-1.5 3.2-2.6 4.5-1.1 1.3-2.4 2.3-3.9 3-1.5.7-3.1 1-4.7 1-1.6 0-3.2-.3-4.7-1-1.5-.7-2.8-1.7-3.9-3-1.1-1.3-2-2.8-2.6-4.5-.6-1.7-.9-3.5-.9-5.3 0-1.8.3-3.6.9-5.3.6-1.7 1.5-3.2 2.6-4.5 1.1-1.3 2.4-2.3 3.9-3 1.5-.7 3.1-1 4.7-1 1.6 0 3.2.3 4.7 1 1.5.7 2.8 1.7 3.9 3 1.1 1.3 2 2.8 2.6 4.5.6 1.7.9 3.5.9 5.3z" />
                        <path d="M7.5 12.5L10 10l2 2.5 4-5" />
                      </svg>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-[#E8573A] hover:border-[#E8573A] transition-all duration-300 group">
                      <svg className="w-4 h-4 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 2h-3a4 4 0 00-4 4v3H7v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3V2z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Link */}
            <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
              <a href="#contact" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
                <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
                MEET THE ENTIRE TEAM
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
        <style>{`
  @keyframes scrollDown {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }
  @keyframes scrollUp {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }
  .animate-scroll-down {
    animation: scrollDown 25s linear infinite;
  }
  .animate-scroll-up {
    animation: scrollUp 25s linear infinite;
  }
`}</style>
{/* Testimonials Section - Moving Columns */}
<section id="testimonials" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white/80 backdrop-blur-sm overflow-hidden">
  
  {/* Add styles directly in this section */}
  <style>{`
    @keyframes scrollDown {
      0% { transform: translateY(0); }
      100% { transform: translateY(-50%); }
    }
    @keyframes scrollUp {
      0% { transform: translateY(-50%); }
      100% { transform: translateY(0); }
    }
    .animate-scroll-down {
      animation: scrollDown 25s linear infinite;
    }
    .animate-scroll-up {
      animation: scrollUp 25s linear infinite;
    }
  `}</style>

  <div className="max-w-[90rem] mx-auto relative z-10">
    {/* Section Header */}
    <div className="text-center mb-16 md:mb-20 reveal-up">
      <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
        <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
        <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
          Student Success
        </span>
      </div>
      <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
        Voices of Our
        <br />
        <span className="text-[#E8573A]">Future Pilots.</span>
      </h2>
      <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
        Hear from our graduates who've transformed their dreams into careers
        soaring above the clouds.
      </p>
    </div>

    {/* Main Glass Container */}
    <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none" />
      
      {/* Background decorative elements */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl" />

      {/* The Grid Container with infinite scroll animation */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Top fade mask */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/80 via-white/40 to-transparent z-20 pointer-events-none rounded-t-3xl" />
        
        {/* Bottom fade mask */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-20 pointer-events-none rounded-b-3xl" />

        {/* Column 1 - Moves Down */}
        <div className="absolute left-0 top-0 w-full md:w-1/3 px-4">
          <div className="flex flex-col gap-6 animate-scroll-down">
            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "Coast Flight Training transformed my life. From zero hours to First Officer in just 18 months. The instructors are world-class and truly care about your success."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2dbcdf02-39a2-4c13-95f7-3118cc995fa0_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Michael Rodriguez</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">First Officer, United Airlines</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "The G1000-equipped fleet and structured curriculum gave me the confidence I needed. I'm now living my dream as a commercial pilot."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/90ec73f0-6fd3-4d0c-922c-fcc592c983df_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Sarah Chen</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Commercial Pilot, Delta</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "The airline placement program is incredible. They connected me with opportunities I never thought possible."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/83a1ae5f-c842-4ee9-a912-505fc66a1ee0_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">James Wilson</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">First Officer, Southwest</div>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "The mentorship and support from day one set me up for success. Best investment in my career."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/39e15168-9f77-4837-9a4b-89c74b8bc38b_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Marcus Thompson</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Captain, Delta</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 2 - Moves Up */}
        <div className="absolute left-0 top-0 w-full md:w-1/3 md:left-1/3 px-4">
          <div className="flex flex-col gap-6 animate-scroll-up">
            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "Best decision I ever made. The instructors are patient, knowledgeable, and genuinely invested in your success."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c92852bb-a510-405a-85ab-ffa0fde136a4_320w.jpg" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Emily Thompson</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">CFI, Coast Flight</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "From private pilot to airline-ready. Their structured approach and modern fleet made all the difference."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2dbcdf02-39a2-4c13-95f7-3118cc995fa0_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">David Park</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">First Officer, American Airlines</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "The mentorship I received went beyond flight training. They prepared me for the entire aviation career journey."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/90ec73f0-6fd3-4d0c-922c-fcc592c983df_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Jessica Martinez</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Corporate Pilot</div>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "The simulators and real aircraft training gave me confidence I never thought possible."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/83a1ae5f-c842-4ee9-a912-505fc66a1ee0_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Robert Chen</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">First Officer, United</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3 - Moves Down */}
        <div className="absolute left-0 top-0 w-full md:w-1/3 md:left-2/3 px-4">
          <div className="flex flex-col gap-6 animate-scroll-down">
            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "State-of-the-art aircraft, experienced instructors, and a clear pathway to the airlines. Worth every penny."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c92852bb-a510-405a-85ab-ffa0fde136a4_320w.jpg" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Ryan Cooper</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Captain, Regional Airline</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "I never thought I could become a pilot. Coast Flight made it possible. The support system is incredible."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/39e15168-9f77-4837-9a4b-89c74b8bc38b_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Amanda White</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">Student Pilot</div>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "The G1000 avionics training prepared me for the real world. I felt ready on day one at the airlines."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2dbcdf02-39a2-4c13-95f7-3118cc995fa0_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Kevin Zhang</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">First Officer, FedEx</div>
                </div>
              </div>
            </div>

            {/* Duplicate for seamless loop */}
            <div className="bg-white/60 backdrop-blur-md border border-white/50 p-6 md:p-8 rounded-2xl transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:scale-[1.02] shadow-lg group">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[#E8573A] fill-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 font-light mb-6 leading-relaxed">
                "The accelerated program got me to the airlines faster than I ever imagined."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden border border-white/50">
                  <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/90ec73f0-6fd3-4d0c-922c-fcc592c983df_320w.webp" className="w-full h-full object-cover" alt="Student" />
                </div>
                <div>
                  <div className="text-slate-900 font-medium text-sm">Sophia Lee</div>
                  <div className="text-slate-500 text-xs uppercase tracking-wider">First Officer, Southwest</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom CTA Link */}
    <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
      <a href="#admissions" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
        <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
        READ MORE SUCCESS STORIES
        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  </div>
</section>
        {/* Final CTA - Now with semi-transparent background */}
        <div className="relative z-20 px-[clamp(1.5rem,5vw,5rem)] py-[4rem] md:py-[8rem] bg-white/50 backdrop-blur-sm">
          <section className="cta-section relative w-full max-w-[90rem] mx-auto min-h-[60vh] py-20 flex flex-col items-center justify-center overflow-hidden text-center bg-[#06080c] rounded-3xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)]">
            <video autoPlay muted loop playsInline className="cta-bg-photo absolute inset-0 z-0 w-full h-[130%] -top-[15%] object-cover" style={{ filter: 'brightness(0.8) contrast(1.1) saturate(1.15)' }}>
              <source src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/user-files/ee77abb2-b67d-4ed9-bbf1-155a06f3baad/642c4e57-36d4-4a67-b403-0d13c769b912-1460279_Cockpit_View_1280x720-1-1-.mp4?v=1777486220669" type="video/mp4" />
            </video>

            <div className="absolute inset-0 z-10 bg-[#06080c]/50" />
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#06080c] via-transparent to-[#06080c] opacity-80" />

            <div className="relative z-30 w-full max-w-[50rem] mx-auto px-6 flex flex-col items-center">
              <h2 className="cta-title font-display font-normal text-[clamp(3rem,7vw,6.5rem)] tracking-tight text-white leading-[0.9] mb-6 flex flex-wrap justify-center gap-x-[1.5vw]">
                <span className="word block">Ready</span>
                <span className="word block">for</span>
                <span className="word block">Takeoff?</span>
              </h2>

              <p className="cta-subtitle font-sans text-[clamp(1.125rem,1.25vw,1.25rem)] font-light text-white/90 max-w-[40ch] mx-auto mb-10 md:mb-12 leading-[1.6]">
                Book a campus tour or schedule a discovery flight. Our admissions
                team responds within 24 hours. Zero obligations.
              </p>

              <div className="cta-button flex flex-col items-center gap-4">
                <a href="#admissions" className="group inline-flex items-center justify-center px-[48px] py-[18px] bg-[#E8573A] text-white text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#F06B4E] hover:shadow-[0_0_20px_rgba(240,107,78,0.4)]">
                  BOOK A DISCOVERY FLIGHT
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </a>
                <a href="tel:8582794359" className="text-white/70 hover:text-white text-sm font-light transition-colors">
                  or call (858) 279-4359
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Footer - With semi-transparent background */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 relative pb-8 pt-16 md:pt-20 z-30">
          <div className="max-w-[90rem] mx-auto px-[clamp(1.5rem,5vw,5rem)] flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 border-b border-slate-200 pb-12 lg:pb-16">
            <div className="flex flex-col justify-between max-w-xs">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7779c4e9-cf43-4379-a162-96455d9c5618_320w.png" alt="Coast Flight Training Logo" className="md:w-40 w-32 h-auto object-contain mb-8" />
              <div className="font-mono text-xs font-light text-slate-500 leading-[1.8] tracking-widest">
                VELA SPACE SYSTEMS
                <br />
                TOULOUSE SPACE CENTER
                <br />
                ISO 14620 / AS9100D
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-24 w-full lg:w-auto">
              <div>
                <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
                  Platforms
                </h5>
                <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">LEO Micro-Bus</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">GEO High-Power</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Deep Space Hub</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
                  Company
                </h5>
                <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Manifesto</a></li>
                  <li>
                    <a href="#" className="hover:text-[#F06B4E] transition-colors flex items-center gap-2">
                      Careers
                      <span className="bg-[#E8573A] text-white px-1.5 py-0.5 text-[0.6rem] font-normal rounded-sm">HIRING</span>
                    </a>
                  </li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Press Room</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
                  Network
                </h5>
                <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Twitter / X</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">LinkedIn</a></li>
                  <li>
                    <a href="#" className="hover:text-[#F06B4E] transition-colors flex items-center gap-2">
                      System Status
                      <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-6 md:mt-8">
            <span className="font-mono text-xs font-light text-slate-400 tracking-widest uppercase text-center px-4">
              © 2024 VELA SPACE. ALL RIGHTS RESERVED.
            </span>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          0% { top: -50%; }
          100% { top: 100%; }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-slideDown {
          animation: slideDown 2s ease-in-out infinite;
        }
        .reveal-up {
          opacity: 0;
          transform: translateY(2rem);
          filter: blur(4px);
          transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-up.is-visible {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
        .reveal-clip {
          clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
          transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal-clip.is-visible {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        .codepen-button {
          display: inline-block;
          cursor: pointer;
          color: #fff;
          position: relative;
          text-decoration: none;
          font-weight: 600;
          border-radius: 100px;
          overflow: hidden;
          padding: 2px;
          isolation: isolate;
        }
        .codepen-button::before {
          content: "";
          position: absolute;
          inset: 0;
          width: 400%;
          height: 100%;
          background: linear-gradient(115deg, #d1d1d1, #E8573A, #fcd5ce);
          background-size: 25% 100%;
          animation: border-shift 0.75s linear infinite;
        }
        .codepen-button span {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: #E8573A;
          border-radius: 100px;
          height: 100%;
          transition: background 0.3s ease;
        }
        .codepen-button:hover span {
          background: #F06B4E;
        }
        @keyframes border-shift {
          to { transform: translateX(-25%); }
        }
        .bg-noise {
          background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
          background-repeat: repeat;
          background-size: 200px;
        }
        .bento-card {
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .bento-card:hover {
          transform: scale(1.01);
        }
      `}</style>
    </div>
  );
}