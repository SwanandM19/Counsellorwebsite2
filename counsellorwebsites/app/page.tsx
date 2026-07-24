// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import LeadPopup from '@/components/LeadPopup'
// import Image from "next/image";
// import Navbar from '@/components/Navbar';

// export default function Home() {
//   // State for countdown
//   const [countdown, setCountdown] = useState({ hours: 18, minutes: 4, seconds: 22 });

//   // Force animation play state after mount — fixes SSR hydration killing initial scroll
//   useEffect(() => {
//     const tracks = document.querySelectorAll<HTMLElement>('.community-track');
//     tracks.forEach(track => {
//       track.style.animationPlayState = 'running';
//     });
//   }, []);

//   // Community gallery rAF scroll — immune to SSR hydration
//   useEffect(() => {
//     const colEls = document.querySelectorAll<HTMLElement>('.community-col')
//     const speeds = [0.5, 0.4, 0.55]
//     const directions = [-1, 1, -1] // -1 = scroll up, 1 = scroll down

//     type ColState = { offset: number; paused: boolean }
//     const state: ColState[] = []

//     colEls.forEach((col, i) => {
//       const track = col.querySelector<HTMLElement>('.community-track')
//       if (!track) return
//       const half = track.scrollHeight / 2
//       const startOffset = directions[i] === 1 ? -half : 0
//       state[i] = { offset: startOffset, paused: false }
//       track.style.transform = `translateY(${startOffset}px)`
//       track.style.willChange = 'transform'
//       col.addEventListener('mouseenter', () => { state[i].paused = true })
//       col.addEventListener('mouseleave', () => { state[i].paused = false })
//     })

//     let rafId: number
//     const tick = () => {
//       colEls.forEach((col, i) => {
//         if (!state[i] || state[i].paused) return
//         const track = col.querySelector<HTMLElement>('.community-track')
//         if (!track) return
//         const half = track.scrollHeight / 2
//         state[i].offset += speeds[i] * directions[i]
//         if (directions[i] === -1 && state[i].offset <= -half) state[i].offset = 0
//         if (directions[i] === 1 && state[i].offset >= 0) state[i].offset = -half
//         track.style.transform = `translateY(${state[i].offset}px)`
//       })
//       rafId = requestAnimationFrame(tick)
//     }
//     rafId = requestAnimationFrame(tick)
//     return () => cancelAnimationFrame(rafId)
//   }, [])
//   // Countdown timer effect
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCountdown(prev => {
//         let { hours, minutes, seconds } = prev;
//         seconds--;
//         if (seconds < 0) {
//           seconds = 59;
//           minutes--;
//           if (minutes < 0) {
//             minutes = 59;
//             hours--;
//           }
//         }
//         return { hours, minutes, seconds };
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Scroll reveal observer
//   useEffect(() => {
//     const revealElements = document.querySelectorAll('.reveal-up, .reveal-clip');

//     const revealObserver = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('is-visible');
//           revealObserver.unobserve(entry.target);
//         }
//       });
//     }, {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px"
//     });

//     revealElements.forEach(el => revealObserver.observe(el));

//     return () => revealObserver.disconnect();
//   }, []);

//   // Count-up observer
//   useEffect(() => {
//     const countElements = document.querySelectorAll('.count-up');

//     const countObserver = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const target = parseInt(entry.target.getAttribute('data-target') || '0');
//           const duration = 2000;
//           const frameDuration = 1000 / 60;
//           const totalFrames = Math.round(duration / frameDuration);
//           let frame = 0;

//           const updateCount = () => {
//             frame++;
//             const progress = frame / totalFrames;
//             const currentCount = Math.round(target * progress);

//             if (frame < totalFrames) {
//               entry.target.textContent = currentCount.toString();
//               requestAnimationFrame(updateCount);
//             } else {
//               entry.target.textContent = target.toString();
//             }
//           };

//           requestAnimationFrame(updateCount);
//           countObserver.unobserve(entry.target);
//         }
//       });
//     }, { threshold: 0.5 });

//     countElements.forEach(el => countObserver.observe(el));

//     return () => countObserver.disconnect();
//   }, []);

//   // Bento card mouse effect
//   useEffect(() => {
//     const bentoCards = document.querySelectorAll('.bento-card');

//     const handleMouseMove = (e: MouseEvent, card: Element) => {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
//       (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
//     };

//     bentoCards.forEach(card => {
//       const handler = (e: Event) => handleMouseMove(e as MouseEvent, card);
//       card.addEventListener('mousemove', handler);
//       (card as any)._handler = handler;
//     });

//     return () => {
//       bentoCards.forEach(card => {
//         card.removeEventListener('mousemove', (card as any)._handler);
//       });
//     };
//   }, []);

//   // System items interaction
//   useEffect(() => {
//     const systemItems = document.querySelectorAll('.system-item');
//     const blueprintLayers = document.querySelectorAll('.blueprint-layer');

//     systemItems.forEach(item => {
//       const handleMouseEnter = () => {
//         const targetId = item.getAttribute('data-target');

//         systemItems.forEach(i => {
//           const indicator = i.querySelector('.indicator');
//           const title = i.querySelector('h4');
//           if (i === item) {
//             indicator?.classList.remove('bg-slate-300');
//             indicator?.classList.add('bg-[#E8573A]');
//             title?.classList.remove('text-slate-900');
//             title?.classList.add('text-[#E8573A]');
//           } else {
//             indicator?.classList.add('bg-slate-300');
//             indicator?.classList.remove('bg-[#E8573A]');
//             title?.classList.add('text-slate-900');
//             title?.classList.remove('text-[#E8573A]');
//           }
//         });

//         blueprintLayers.forEach((layer, index) => {
//           if (index.toString() === targetId) {
//             layer.classList.remove('opacity-0', 'scale-95');
//             layer.classList.add('opacity-100', 'scale-100', 'active');
//           } else {
//             layer.classList.add('opacity-0', 'scale-95');
//             layer.classList.remove('opacity-100', 'scale-100', 'active');
//           }
//         });
//       };

//       item.addEventListener('mouseenter', handleMouseEnter);
//       (item as any)._handler = handleMouseEnter;
//     });

//     return () => {
//       systemItems.forEach(item => {
//         item.removeEventListener('mouseenter', (item as any)._handler);
//       });
//     };
//   }, []);

//   return (
//     <div className="scroll-smooth bg-white text-slate-900 selection:bg-[#E8573A] selection:text-white relative">
//       <LeadPopup />
//       {/* Noise Overlay - Fixed */}
//       <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply bg-noise" />

//       {/* Global Layout Lines - Hidden */}
//       {/* <div className="fixed inset-y-0 left-[clamp(1.5rem,5vw,5rem)] w-px bg-slate-900/[0.04] pointer-events-none z-0" />
//       <div className="fixed inset-y-0 right-[clamp(1.5rem,5vw,5rem)] w-px bg-slate-900/[0.04] pointer-events-none z-0" /> */}

//       {/* STATIC BACKGROUND - Fixed and never scrolls */}
//       <div className="fixed inset-0 z-0">
//         {/* Gradient Background */}
//         <div className="absolute inset-0 bg-gradient-to-b from-[#AEC7E4] via-[#C0D6EC] to-white" />

//         {/* Left Cloud */}
//         <div className="absolute -left-[10%] top-[15%] w-[50vw] min-w-[400px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', maskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)' }} />

//         {/* Right Cloud */}
//         <div className="absolute -right-[15%] top-[5%] w-[60vw] min-w-[500px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', maskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', transform: 'scaleX(-1) rotate(5deg)' }} />

//         {/* Background Grid - Hidden */}
//         {/* <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)]" /> */}
//       </div>

//       {/* SCROLLABLE CONTENT - Relative with transparent background */}
//       <div className="relative z-10 bg-transparent">
//         {/* Floating Navigation Pill */}
//         <Navbar/>

//         {/* Hero Section */}
//         <section className="relative min-h-[100dvh] w-full flex items-center pt-[8rem] pb-[4rem] px-[clamp(1.5rem,5vw,5rem)] overflow-hidden">
//           <div className="w-full max-w-[90rem] mx-auto relative z-10 grid grid-cols-1 gap-12 items-center">
//             <div className="flex flex-col items-center text-center mt-12 md:mt-0">
//               <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-8 reveal-up shadow-sm is-visible" style={{ transitionDelay: '1.1s' }}>
//                 <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse shadow-[0_0_10px_rgba(232,87,58,0.20)]" />
//                 <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
//                   Licensed & Certified Counsellor
//                 </span>
//               </div>

//               <h1 className="font-display font-normal text-[clamp(2.5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-slate-900 mb-8 reveal-up text-balance flex flex-col items-center w-full is-visible" style={{ transitionDelay: '1.2s' }}>
//                 <span className="sr-only">Professional Counselling Services</span>
//                 <span>HEALING BEGINS</span>
//                 <span className="flex items-center justify-center gap-3 md:gap-4 flex-wrap w-full">
//                   WITH A SINGLE
//                   <span className="hidden sm:inline-flex h-[clamp(2.5rem,5vw,6rem)] w-[clamp(6rem,12vw,14rem)] bg-white border rounded-full items-center justify-center overflow-hidden relative group backdrop-blur-sm shadow-sm border-white">
//                     <span className="bg-center group-hover:scale-110 transition-transform duration-1000 opacity-60 bg-[url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=320&q=80)] bg-cover absolute inset-0" />
//                     <span className="z-[5] border-stone-50 absolute inset-0" />
//                     <span className="text-xs text-neutral-50 tracking-widest font-mono z-10 relative">
//                       STEP.
//                     </span>
//                   </span>
//                 </span>
//                 <span>YOU ARE NOT ALONE.</span>
//               </h1>

//               <p className="font-sans text-[clamp(1.125rem,1.5vw,1.5rem)] font-light text-slate-600 max-w-[50ch] leading-[1.6] mb-12 reveal-up text-balance is-visible" style={{ transitionDelay: '1.3s' }}>
//                 Compassionate, Confidential Counselling for Individuals, Couples & Families.
//               </p>

//               <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto reveal-up is-visible" style={{ transitionDelay: '1.4s' }}>
//                 <a href="#admissions" className="codepen-button w-full sm:w-auto">
//                   <span className="px-8 py-4 text-sm font-mono tracking-widest flex items-center gap-2">
//                     BOOK A FREE CONSULTATION
//                     {/* @ts-expect-error - web component */}
//                     <iconify-icon icon="solar:heart-linear" className="w-5 h-5" />
//                   </span>
//                 </a>
//                 <a href="#architecture" className="group flex items-center justify-center gap-3 h-14 px-6 text-xs text-slate-500 hover:text-slate-900 font-mono font-light tracking-widest transition-colors w-full sm:w-auto">
//                   <div className="w-8 h-[1px] bg-slate-300 group-hover:w-12 group-hover:bg-slate-900 transition-all duration-300" />
//                   EXPLORE SERVICES
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Scroll Indicator */}
//           <div className="absolute left-[clamp(1.5rem,5vw,5rem)] bottom-12 hidden lg:flex flex-col items-start gap-4 reveal-up is-visible" style={{ transitionDelay: '1.5s' }}>
//             <div className="font-mono text-xs font-light text-slate-900 tracking-widest transform -rotate-90 origin-left translate-y-12">
//               SCROLL
//             </div>
//             <div className="w-[1px] h-16 bg-slate-900/30 relative overflow-hidden ml-2">
//               <div className="absolute top-0 left-0 w-full h-1/2 bg-slate-900 animate-slideDown" />
//             </div>
//           </div>
//         </section>
//         {/* Metrics - Now with semi-transparent background */}
//         <section className="border-y border-slate-200 relative z-20 bg-white/80 backdrop-blur-sm">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 w-full">
//             {[
//               { label: 'CLIENTS HELPED', target: 850, suffix: '+', description: 'Individuals, couples and families supported on their healing journey.' },
//               { label: 'SUCCESS RATE', target: 94, suffix: '%', description: 'Clients report significant improvement after completing their program.' },
//               { label: 'YEARS EXPERIENCE', target: 12, suffix: '+', description: 'Specialised experience across anxiety, trauma, relationships & more.' },
//               { label: 'SESSIONS DELIVERED', target: 5, suffix: 'K+', description: 'Over five thousand hours of one-on-one and group counselling sessions.' }
//             ].map((metric, idx) => (
//               <div key={idx} className="p-10 lg:p-14 flex flex-col justify-between aspect-square group bg-white/50 hover:bg-[#E8573A] transition-colors duration-500 cursor-default relative overflow-hidden">
//                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 mix-blend-multiply grayscale" />
//                 <span className="group-hover:text-white/80 transition-colors z-10 text-xs font-normal text-slate-500 tracking-widest font-mono relative">
//                   {metric.label}
//                 </span>
//                 <div className="relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
//                   <div className="text-[clamp(3.5rem,6vw,5.5rem)] leading-none group-hover:text-white transition-colors font-normal text-slate-900 tracking-tighter font-display mb-2">
//                     <span className="count-up" data-target={metric.target}>0</span>
//                     {metric.suffix}
//                   </div>
//                   <p className="group-hover:text-white/90 transition-colors text-sm font-light text-slate-500">
//                     {metric.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Architecture / Asymmetric Bento Grid */}
//         <section id="architecture" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white/90 backdrop-blur-sm">
//           <div className="max-w-[90rem] mx-auto">
//             <div className="mb-12 md:mb-20 reveal-up is-visible">
//               <span className="font-mono text-xs font-light text-[#E8573A] tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
//                 <span className="w-2 h-2 bg-[#E8573A]" />
//                 Counselling Services
//               </span>
//               <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-none mb-6 text-slate-900">
//                 Your Path to
//                 <br />
//                 <span className="text-slate-400">Wellness & Healing.</span>
//               </h2>
//               <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-light text-slate-500 max-w-[45ch] leading-[1.6]">
//                 From personal struggles to relationship challenges. Our tailored
//                 programmes are designed to support your mental health and emotional wellbeing.
//               </p>
//             </div>

//             {/* Asymmetric Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[24rem]">
//               {/* Main Featured Box */}
//               <div className="md:col-span-8 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible">
//                 <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
//                   <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white via-white/70 to-transparent z-10 pointer-events-none" />
//                   <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600&auto=format&fit=crop" alt="Individual Counselling" className="w-full h-full object-cover saturate-[1.1] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]" />
//                 </div>
//                 <div className="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
//                   <div className="flex justify-between items-start mb-12 md:mb-0">
//                     <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
//                       PROGRAM_01
//                     </div>
//                     {/* @ts-expect-error - web component */}
//                     <iconify-icon icon="solar:paperplane-linear" className="w-8 h-8 text-slate-900 opacity-40 group-hover:opacity-100 group-hover:text-[#F06B4E] transition-all duration-500 text-3xl" />
//                   </div>
//                   <div className="max-w-[32rem] pointer-events-auto">
//                     <h3 className="font-display font-normal text-[clamp(2rem,3vw,3rem)] text-slate-900 mb-4 leading-none tracking-tight drop-shadow-sm group-hover:drop-shadow-none">
//                       Individual Therapy
//                     </h3>
//                     <p className="text-base font-light text-slate-600 leading-[1.6] mb-8 group-hover:text-slate-800 transition-colors">
//                       One-on-one sessions tailored to your unique needs — helping you
//                       work through anxiety, depression, trauma, grief, and life transitions
//                       in a safe and confidential space.
//                     </p>
//                     <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors">
//                       LEARN MORE
//                       {/* @ts-expect-error - web component */}
//                       <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               <div className="md:col-span-4 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style={{ transitionDelay: '0.1s' }}>
//                 <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
//                   <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white via-white/70 to-transparent z-10 pointer-events-none" />
//                   <img src="https://images.unsplash.com/photo-1516401266446-6432a8a07d41?q=80&w=1600&auto=format&fit=crop" alt="Couples Counselling" className="w-full h-full object-cover contrast-[1.08] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]" />
//                 </div>
//                 <div className="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
//                   <div className="flex justify-between items-start mb-8 md:mb-12">
//                     <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
//                       PROGRAM_02
//                     </div>
//                   </div>
//                   <div className="pointer-events-auto">
//                     <h3 className="font-display font-normal text-[clamp(1.5rem,2.5vw,2rem)] text-slate-900 mb-3 tracking-tight">
//                       Couples Counselling
//                     </h3>
//                     <p className="text-base font-light text-slate-600 leading-relaxed mb-6 group-hover:text-slate-800 transition-colors">
//                       Rebuild connection, communication, and trust with your partner.
//                     </p>
//                     <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors">
//                       LEARN MORE
//                       {/* @ts-expect-error - web component */}
//                       <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
//                     </a>
//                   </div>
//                 </div>
//               </div>

//               {/* Horizontal Wide Box */}
//               <div className="md:col-span-12 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style={{ transitionDelay: '0.2s' }}>
//                 <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
//                   <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent z-10 pointer-events-none" />
//                   <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1600&auto=format&fit=crop" alt="Family Therapy" className="contrast-[1.05] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05] w-full h-full object-cover" />
//                 </div>
//                 <div className="p-8 md:p-12 flex-1 flex flex-col justify-center z-10 relative w-full pointer-events-none">
//                   <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 self-start mb-6 backdrop-blur-md">
//                     PROGRAM_03
//                   </div>
//                   <h3 className="font-display font-normal text-[clamp(1.75rem,2.5vw,2.25rem)] text-slate-900 mb-4 tracking-tight">
//                     Family Therapy
//                   </h3>
//                   <p className="text-base font-light text-slate-600 leading-[1.6] max-w-[40ch] mb-6 group-hover:text-slate-800 transition-colors">
//                     Strengthen family bonds and resolve conflict in a supportive,
//                     structured environment guided by an experienced therapist.
//                   </p>
//                   <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors pointer-events-auto">
//                     LEARN MORE
//                     {/* @ts-expect-error - web component */}
//                     <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//         {/* How It Works - Flight Training Journey */}
//         <section id="how-it-works" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10">
//           <div className="max-w-[90rem] mx-auto">
//             {/* Section Header */}
//             <div className="text-center mb-16 md:mb-20 reveal-up">
//               <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
//                 <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
//                 <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
//                   How It Works
//                 </span>
//               </div>
//               <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
//                 Your Healing Journey.
//                 <br />
//                 <span className="text-[#E8573A]">Three Simple Steps.</span>
//               </h2>
//               <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
//                 Starting therapy can feel daunting, but we've made the process simple
//                 and welcoming — so you can focus on what matters most: your wellbeing.
//               </p>
//             </div>

//             {/* Main Glass Container */}
//             <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
//               {/* Subtle inner glow */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none" />

//               {/* Background decorative elements */}
//               <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl" />
//               <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl" />

//               {/* Steps Grid inside glass container */}
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative p-8 md:p-12">
//                 {/* Connecting Line (Desktop) */}
//                 <div className="hidden md:block absolute top-[30%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

//                 {/* Step 1 */}
//                 <div className="relative group reveal-up" style={{ transitionDelay: '0.1s' }}>
//                   <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-10 hover:border-[#E8573A]/50 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-lg">
//                     {/* Glass reflection effect */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//                     {/* Step Number */}
//                     <div className="flex items-center justify-between mb-6">
//                       <div className="text-7xl md:text-8xl font-display font-bold text-white/30 group-hover:text-[#E8573A]/20 transition-colors duration-500">
//                         01
//                       </div>
//                       <div className="w-12 h-12 rounded-full bg-[#E8573A]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E8573A] transition-all duration-500 group-hover:scale-110 border border-white/30">
//                         <svg className="w-6 h-6 text-[#E8573A] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                         </svg>
//                       </div>
//                     </div>

//                     <h3 className="text-2xl md:text-3xl font-display font-normal text-slate-900 mb-3 tracking-tight">
//                       Book Your
//                       <br />
//                       Free Consultation
//                     </h3>

//                     <p className="text-slate-600 font-light leading-relaxed mb-6">
//                       Schedule a no-obligation introductory call. Meet your counsellor, share what's on your mind, and see if we're the right fit for you.
//                     </p>

//                     <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
//                       <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 1</span>
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>

//                   {/* Feature Tags */}
//                   <div className="flex flex-wrap gap-2 mt-4 px-2">
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Completely confidential</span>
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">No pressure</span>
//                   </div>
//                 </div>

//                 {/* Step 2 */}
//                 <div className="relative group reveal-up" style={{ transitionDelay: '0.2s' }}>
//                   <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-10 hover:border-[#E8573A]/50 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-lg">
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//                     <div className="flex items-center justify-between mb-6">
//                       <div className="text-7xl md:text-8xl font-display font-bold text-white/30 group-hover:text-[#E8573A]/20 transition-colors duration-500">
//                         02
//                       </div>
//                       <div className="w-12 h-12 rounded-full bg-[#E8573A]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E8573A] transition-all duration-500 group-hover:scale-110 border border-white/30">
//                         <svg className="w-6 h-6 text-[#E8573A] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//                         </svg>
//                       </div>
//                     </div>

//                     <h3 className="text-2xl md:text-3xl font-display font-normal text-slate-900 mb-3 tracking-tight">
//                       Choose Your
//                       <br />
//                       Therapy Plan
//                     </h3>

//                     <p className="text-slate-600 font-light leading-relaxed mb-6">
//                       Select from individual, couples, or family counselling. Each plan is personalised to your goals, schedule, and needs.
//                     </p>

//                     <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
//                       <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 2</span>
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2 mt-4 px-2">
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Flexible scheduling</span>
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">In-person & online</span>
//                   </div>
//                 </div>

//                 {/* Step 3 */}
//                 <div className="relative group reveal-up" style={{ transitionDelay: '0.3s' }}>
//                   <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-10 hover:border-[#E8573A]/50 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-lg">
//                     <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//                     <div className="flex items-center justify-between mb-6">
//                       <div className="text-7xl md:text-8xl font-display font-bold text-white/30 group-hover:text-[#E8573A]/20 transition-colors duration-500">
//                         03
//                       </div>
//                       <div className="w-12 h-12 rounded-full bg-[#E8573A]/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-[#E8573A] transition-all duration-500 group-hover:scale-110 border border-white/30">
//                         <svg className="w-6 h-6 text-[#E8573A] group-hover:text-white transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
//                         </svg>
//                       </div>
//                     </div>

//                     <h3 className="text-2xl md:text-3xl font-display font-normal text-slate-900 mb-3 tracking-tight">
//                       Begin Your
//                       <br />
//                       Healing Journey
//                     </h3>

//                     <p className="text-slate-600 font-light leading-relaxed mb-6">
//                       Attend regular sessions, build coping strategies, and experience genuine, lasting change with your dedicated counsellor.
//                     </p>

//                     <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
//                       <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 3</span>
//                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2 mt-4 px-2">
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Ongoing support</span>
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
//                     <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Proven methods</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom CTA Link */}
//             <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
//               <a href="#admissions" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
//                 <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
//                 START YOUR HEALING TODAY
//                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </section>
//         {/* About Section - Lead Instructor */}
//         <section id="about" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10">
//           <div className="max-w-[90rem] mx-auto">
//             {/* Section Header */}
//             <div className="text-center mb-16 md:mb-20 reveal-up">
//               <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
//                 <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
//                 <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
//                   Meet Your Counsellor
//                 </span>
//               </div>
//               <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
//                 Compassion You Can
//                 <br />
//                 <span className="text-[#E8573A]">Trust With Your Story.</span>
//               </h2>
//               <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
//                 Work with a licensed therapist who genuinely cares about your progress
//                 and is dedicated to helping you live a healthier, more fulfilling life.
//               </p>
//             </div>

//             {/* Main Glass Container */}
//             <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
//               {/* Subtle inner glow */}
//               <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none" />

//               {/* Background decorative elements */}
//               <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl" />
//               <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl" />

//               {/* Decorative aviation elements */}
//               <div className="absolute top-10 right-10 opacity-10">
//                 <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
//                 </svg>
//               </div>
//               <div className="absolute bottom-10 left-10 opacity-10">
//                 <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>

//               {/* Content Grid */}
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative p-8 md:p-12">
//                 {/* Image Section */}
//                 <div className="relative group">
//                   <div className="absolute inset-0 bg-gradient-to-br from-[#E8573A]/20 to-transparent rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700" />
//                   <div className="relative rounded-2xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-sm shadow-xl">
//                     <img
//   src="/counsellor.png"
//   alt="Dr. Sarah Mitchell - Lead Counsellor"
//   className="w-full h-full object-cover aspect-[4/5] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
// />
//                     {/* Overlay gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//                     {/* Badge */}
//                     <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-white rounded-full px-4 py-2">
//                       <div className="flex items-center gap-2">
//                         <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
//                         <span className="text-xs font-mono font-light text-slate-900 tracking-wider">
//                           LICENSED THERAPIST • 12+ YEARS
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="flex flex-col justify-center space-y-6">
//                   {/* Name & Title */}
//                   <div className="reveal-up">
//                     <h3 className="text-4xl md:text-5xl font-display font-normal text-slate-900 mb-3 tracking-tight">
//                       Dr. Sarah Mitchell
//                     </h3>
//                     <div className="inline-flex items-center gap-2 bg-[#E8573A]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8573A]/20">
//                       <span className="w-1.5 h-1.5 bg-[#E8573A] rounded-full" />
//                       <span className="text-xs font-mono font-light text-[#E8573A] tracking-wider">
//                         MSc • BACP Accredited • CBT Specialist
//                       </span>
//                     </div>
//                   </div>

//                   {/* Bio Text */}
//                   <div className="space-y-4 reveal-up" style={{ transitionDelay: '0.1s' }}>
//                     <p className="text-slate-600 font-light leading-relaxed">
//                       Dr. Sarah Mitchell is a fully accredited counsellor and psychotherapist
//                       with a Master's degree in Clinical Psychology. She specialises in
//                       anxiety, depression, trauma recovery, and relationship counselling,
//                       working with individuals, couples, and families.
//                     </p>
//                     <p className="text-slate-600 font-light leading-relaxed">
//                       Her approach combines evidence-based therapies including CBT and
//                       mindfulness with a warm, client-centred style. When she's not in
//                       session, Sarah volunteers at local mental health charities and
//                       mentors trainee therapists in the community.
//                     </p>
//                   </div>

//                   {/* Credentials Grid */}
//                   <div className="grid grid-cols-2 gap-4 pt-4 reveal-up" style={{ transitionDelay: '0.2s' }}>
//                     <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
//                       <div className="text-2xl font-display text-[#E8573A] mb-1">850+</div>
//                       <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Clients Helped</div>
//                     </div>
//                     <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
//                       <div className="text-2xl font-display text-[#E8573A] mb-1">5,000+</div>
//                       <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Sessions Delivered</div>
//                     </div>
//                     <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
//                       <div className="text-2xl font-display text-[#E8573A] mb-1">3</div>
//                       <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Specialisations</div>
//                     </div>
//                     <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
//                       <div className="text-2xl font-display text-[#E8573A] mb-1">12+</div>
//                       <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Years Experience</div>
//                     </div>
//                   </div>

//                   {/* Social/Contact Links */}
//                   <div className="flex gap-4 pt-4 reveal-up" style={{ transitionDelay: '0.3s' }}>
//                     <a href="#" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-[#E8573A] hover:border-[#E8573A] transition-all duration-300 group">
//                       <svg className="w-4 h-4 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
//                         <circle cx="4" cy="4" r="2" stroke="none" fill="currentColor" />
//                       </svg>
//                     </a>
//                     <a href="#" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-[#E8573A] hover:border-[#E8573A] transition-all duration-300 group">
//                       <svg className="w-4 h-4 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M22 12.1c0 1.8-.3 3.6-.9 5.3-.6 1.7-1.5 3.2-2.6 4.5-1.1 1.3-2.4 2.3-3.9 3-1.5.7-3.1 1-4.7 1-1.6 0-3.2-.3-4.7-1-1.5-.7-2.8-1.7-3.9-3-1.1-1.3-2-2.8-2.6-4.5-.6-1.7-.9-3.5-.9-5.3 0-1.8.3-3.6.9-5.3.6-1.7 1.5-3.2 2.6-4.5 1.1-1.3 2.4-2.3 3.9-3 1.5-.7 3.1-1 4.7-1 1.6 0 3.2.3 4.7 1 1.5.7 2.8 1.7 3.9 3 1.1 1.3 2 2.8 2.6 4.5.6 1.7.9 3.5.9 5.3z" />
//                         <path d="M7.5 12.5L10 10l2 2.5 4-5" />
//                       </svg>
//                     </a>
//                     <a href="#" className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center hover:bg-[#E8573A] hover:border-[#E8573A] transition-all duration-300 group">
//                       <svg className="w-4 h-4 text-slate-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 2h-3a4 4 0 00-4 4v3H7v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3V2z" />
//                       </svg>
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom CTA Link */}
//             <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
//               <a href="#contact" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
//                 <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
//                 MEET THE FULL TEAM
//                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </section>
//         <style>{`
//   @keyframes scrollDown {
//     0% { transform: translateY(0); }
//     100% { transform: translateY(-50%); }
//   }
//   @keyframes scrollUp {
//     0% { transform: translateY(-50%); }
//     100% { transform: translateY(0); }
//   }
//   .animate-scroll-down {
//     animation: scrollDown 25s linear infinite;
//   }
//   .animate-scroll-up {
//     animation: scrollUp 25s linear infinite;
//   }
// `}</style>
//         {/* Testimonials Section - Moving Columns */}
//         {/* ============================================================
//     VOICES OF OUR HEALING COMMUNITY — Photo & Video Gallery
//     ============================================================ */}
//         {/* ── VOICES OF OUR HEALING COMMUNITY ── */}
//         <section id="testimonials" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white/80 backdrop-blur-sm overflow-hidden">
//           <div className="max-w-[90rem] mx-auto relative z-10">

//             {/* Header */}
//             <div className="text-center mb-16 md:mb-20 reveal-up">
//               <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
//                 <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse"></div>
//                 <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">Client Stories</span>
//               </div>
//               <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
//                 Voices of Our <br />
//                 <span className="text-[#E8573A]">Healing Community.</span>
//               </h2>
//               <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
//                 Real moments shared by our clients and their counsellors on the path to healing.
//               </p>
//             </div>

//             {/* Glass container */}
//             <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none"></div>
//               <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl"></div>
//               <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl"></div>

//               {/* Scroll window */}
//               <div className="relative h-[620px] overflow-hidden">
//                 {/* Top fade */}
//                 <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/80 via-white/40 to-transparent z-20 pointer-events-none rounded-t-3xl"></div>
//                 {/* Bottom fade */}
//                 <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-20 pointer-events-none rounded-b-3xl"></div>

//                 {/* ── COLUMN 1 ── scrolls up */}
//                 <div className="community-col absolute left-0 top-0 w-full md:w-1/3 px-3 h-full">
//                   <div className="community-track flex flex-col gap-3">
//                     {/* set A */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
//                       <img src="/community/photos/photo-01.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-02.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
//                       <img src="/community/photos/photo-03.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-04.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
//                       <img src="/community/photos/photo-05.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     {/* set B (duplicate for seamless loop) */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
//                       <img src="/community/photos/photo-01.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-02.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
//                       <img src="/community/photos/photo-03.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-04.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
//                       <img src="/community/photos/photo-05.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── COLUMN 2 ── scrolls down, has videos */}
//                 <div className="community-col absolute left-0 top-0 w-full md:w-1/3 md:left-1/3 px-3 h-full">
//                   <div className="community-track flex flex-col gap-3">
//                     {/* set A */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-06.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     {/* <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative" style={{ height: '260px' }}>
//                       <video src="/community/videos/video-01.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
//                       <div className="absolute bottom-2 right-3 bg-black/50 text-white text-[10px] font-mono px-2 py-1 rounded-full pointer-events-none">▶ VIDEO</div>
//                     </div> */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-07.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
//                       <img src="/community/photos/photo-08.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     {/* <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative" style={{ height: '260px' }}>
//                       <video src="/community/videos/video-02.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
//                       <div className="absolute bottom-2 right-3 bg-black/50 text-white text-[10px] font-mono px-2 py-1 rounded-full pointer-events-none">▶ VIDEO</div>
//                     </div> */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-09.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     {/* set B (duplicate) */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-06.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>

//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-07.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
//                       <img src="/community/photos/photo-08.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>

//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-09.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                   </div>
//                 </div>

//                 {/* ── COLUMN 3 ── scrolls up, has video-03 */}
//                 <div className="community-col absolute left-0 top-0 w-full md:w-1/3 md:left-2/3 px-3 h-full">
//                   <div className="community-track flex flex-col gap-3">
//                     {/* set A */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
//                       <img src="/community/photos/photo-10.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-11.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     {/* <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative" style={{ height: '260px' }}>
//                       <video src="/community/videos/video-03.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
//                       <div className="absolute bottom-2 right-3 bg-black/50 text-white text-[10px] font-mono px-2 py-1 rounded-full pointer-events-none">▶ VIDEO</div>
//                     </div> */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-12.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-13.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
//                       <img src="/community/photos/photo-14.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-15.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-16.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     {/* set B (duplicate) */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
//                       <img src="/community/photos/photo-10.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-11.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     {/* <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0 relative" style={{ height: '260px' }}>
//                       <video src="/community/videos/video-03.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
//                       <div className="absolute bottom-2 right-3 bg-black/50 text-white text-[10px] font-mono px-2 py-1 rounded-full pointer-events-none">▶ VIDEO</div>
//                     </div> */}
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-12.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-13.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
//                       <img src="/community/photos/photo-14.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
//                       <img src="/community/photos/photo-15.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                     <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
//                       <img src="/community/photos/photo-16.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
//                     </div>
//                   </div>
//                 </div>

//               </div>{/* end scroll window */}
//             </div>{/* end glass container */}

//             {/* CTA */}
//             <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
//               <a href="admissions" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
//                 <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300"></span>
//                 BOOK YOUR HEALING SESSION
//                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </a>
//             </div>

//           </div>
//         </section>
//         {/* Blog Section - Latest Articles */}
//         <section id="blog" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white/80 backdrop-blur-sm">
//           <div className="max-w-[90rem] mx-auto">
//             {/* Section Header */}
//             <div className="text-center mb-16 md:mb-20 reveal-up">
//               <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
//                 <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
//                 <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
//                   Latest Articles
//                 </span>
//               </div>
//               <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
//                 Insights From the
//                 <br />
//                 <span className="text-[#E8573A]">Counselling Room.</span>
//               </h2>
//               <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
//                 Expert guidance, mental health tips, and stories of hope to support
//                 you on your wellbeing journey.
//               </p>
//             </div>

//             {/* Blog Cards Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-up">
//               {/* Blog Post 1 */}
//               <a href="/blog/how-creative-agencies-shape-the-future" className="group block">
//                 <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2">
//                   {/* Image */}
//                   <div className="relative h-56 overflow-hidden">
//                     <img
//                       src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop"
//                       alt="Understanding Anxiety"
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     <div className="absolute top-4 left-4 bg-[#E8573A]/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                       <span className="text-white text-xs font-mono tracking-wider">ANXIETY</span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="p-6 md:p-8">
//                     <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
//                       <span>March 15, 2024</span>
//                       <span>•</span>
//                       <span>5 min read</span>
//                     </div>
//                     <h3 className="text-xl md:text-2xl font-display font-normal text-slate-900 mb-3 tracking-tight group-hover:text-[#E8573A] transition-colors duration-300">
//                       Understanding Anxiety: What Your Body Is Trying to Tell You
//                     </h3>
//                     <p className="text-slate-600 font-light leading-relaxed mb-4">
//                       Anxiety is more than just worry. Learn how to recognise the signs,
//                       understand your triggers, and take the first steps toward relief.
//                     </p>
//                     <div className="flex items-center gap-2 text-sm font-mono text-[#E8573A] group-hover:gap-3 transition-all duration-300">
//                       READ MORE
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </a>

//               {/* Blog Post 2 */}
//               <a href="/blog/the-real-roi-of-smart-design" className="group block">
//                 <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2">
//                   <div className="relative h-56 overflow-hidden">
//                     <img
//                       src="https://images.unsplash.com/photo-1516401266446-6432a8a07d41?q=80&w=800&auto=format&fit=crop"
//                       alt="The Benefits of Couples Counselling"
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     <div className="absolute top-4 left-4 bg-[#E8573A]/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                       <span className="text-white text-xs font-mono tracking-wider">RELATIONSHIPS</span>
//                     </div>
//                   </div>

//                   <div className="p-6 md:p-8">
//                     <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
//                       <span>March 10, 2024</span>
//                       <span>•</span>
//                       <span>4 min read</span>
//                     </div>
//                     <h3 className="text-xl md:text-2xl font-display font-normal text-slate-900 mb-3 tracking-tight group-hover:text-[#E8573A] transition-colors duration-300">
//                       Why Couples Counselling Works — Even When It Feels Too Late
//                     </h3>
//                     <p className="text-slate-600 font-light leading-relaxed mb-4">
//                       Many couples wait until a breaking point to seek help. Here's why
//                       starting sooner — or even now — can transform your relationship.
//                     </p>
//                     <div className="flex items-center gap-2 text-sm font-mono text-[#E8573A] group-hover:gap-3 transition-all duration-300">
//                       READ MORE
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </a>

//               {/* Blog Post 3 */}
//               <a href="/blog/how-purpose-driven-creativity-builds-brand-power" className="group block">
//                 <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2">
//                   <div className="relative h-56 overflow-hidden">
//                     <img
//                       src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
//                       alt="Mindfulness and Mental Health"
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
//                     <div className="absolute top-4 left-4 bg-[#E8573A]/90 backdrop-blur-sm px-3 py-1 rounded-full">
//                       <span className="text-white text-xs font-mono tracking-wider">MINDFULNESS</span>
//                     </div>
//                   </div>

//                   <div className="p-6 md:p-8">
//                     <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
//                       <span>March 5, 2024</span>
//                       <span>•</span>
//                       <span>6 min read</span>
//                     </div>
//                     <h3 className="text-xl md:text-2xl font-display font-normal text-slate-900 mb-3 tracking-tight group-hover:text-[#E8573A] transition-colors duration-300">
//                       5 Mindfulness Practices That Support Your Mental Health Daily
//                     </h3>
//                     <p className="text-slate-600 font-light leading-relaxed mb-4">
//                       Small daily habits can make a profound difference. Discover five
//                       evidence-based mindfulness practices recommended by our therapists.
//                     </p>
//                     <div className="flex items-center gap-2 text-sm font-mono text-[#E8573A] group-hover:gap-3 transition-all duration-300">
//                       READ MORE
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </a>
//             </div>

//             {/* View All Articles Link */}
//             <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.2s' }}>
//               <a href="/blog" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
//                 <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
//                 VIEW ALL ARTICLES
//                 <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </section>
//         {/* Final CTA - Now with semi-transparent background */}
//         {/* <div className="relative z-20 px-[clamp(1.5rem,5vw,5rem)] py-[4rem] md:py-[8rem] bg-white/50 backdrop-blur-sm">
//           <section className="cta-section relative w-full max-w-[90rem] mx-auto min-h-[60vh] py-20 flex flex-col items-center justify-center overflow-hidden text-center bg-[#06080c] rounded-3xl shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)]">
//             <video autoPlay muted loop playsInline className="cta-bg-photo absolute inset-0 z-0 w-full h-[130%] -top-[15%] object-cover" style={{ filter: 'brightness(0.8) contrast(1.1) saturate(1.15)' }}>
//               <source src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/user-files/ee77abb2-b67d-4ed9-bbf1-155a06f3baad/642c4e57-36d4-4a67-b403-0d13c769b912-1460279_Cockpit_View_1280x720-1-1-.mp4?v=1777486220669" type="video/mp4" />
//             </video>

//             <div className="absolute inset-0 z-10 bg-[#06080c]/50" />
//             <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#06080c] via-transparent to-[#06080c] opacity-80" />

//             <div className="relative z-30 w-full max-w-[50rem] mx-auto px-6 flex flex-col items-center">
//               <h2 className="cta-title font-display font-normal text-[clamp(3rem,7vw,6.5rem)] tracking-tight text-white leading-[0.9] mb-6 flex flex-wrap justify-center gap-x-[1.5vw]">
//                 <span className="word block">Ready</span>
//                 <span className="word block">for</span>
//                 <span className="word block">Takeoff?</span>
//               </h2>

//               <p className="cta-subtitle font-sans text-[clamp(1.125rem,1.25vw,1.25rem)] font-light text-white/90 max-w-[40ch] mx-auto mb-10 md:mb-12 leading-[1.6]">
//                 Book a campus tour or schedule a discovery flight. Our admissions
//                 team responds within 24 hours. Zero obligations.
//               </p>

//               <div className="cta-button flex flex-col items-center gap-4">
//                 <a href="#admissions" className="group inline-flex items-center justify-center px-[48px] py-[18px] bg-[#E8573A] text-white text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-[3px] hover:bg-[#F06B4E] hover:shadow-[0_0_20px_rgba(240,107,78,0.4)]">
//                   BOOK A DISCOVERY FLIGHT
//                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1">
//                     <path d="M5 12h14" />
//                     <path d="m12 5 7 7-7 7" />
//                   </svg>
//                 </a>
//                 <a href="tel:8582794359" className="text-white/70 hover:text-white text-sm font-light transition-colors">
//                   or call (858) 279-4359
//                 </a>
//               </div>
//             </div>
//           </section>
//         </div> */}
//         {/* Final CTA - With Left-Aligned Content & Gradient Overlay */}
//         <div className="relative z-20 px-[clamp(1.5rem,5vw,5rem)] py-[4rem] md:py-[8rem] bg-white/50 backdrop-blur-sm">
//           <section className="cta-section relative w-full max-w-[90rem] mx-auto min-h-[55vh] flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-3xl shadow-2xl">

//             {/* Background Image */}
//             <div
//               className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat rounded-3xl"
//               style={{ backgroundImage: "url('/bg.png')" }}
//             />

//             {/* Gradient Overlay - Dark on left, transparent on right */}
//             <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20 rounded-3xl" />

//             {/* Accent gradient from brand color */}
//             <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#E8573A]/5 via-transparent to-transparent rounded-3xl" />

//             {/* Content - Left Aligned */}
//             <div className="relative z-30 w-full max-w-[55rem] px-8 md:px-12 lg:px-16 py-16 md:py-20">

//               {/* Animated Badge */}
//               <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 animate-pulse">
//                 <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
//                 <span className="font-mono text-xs font-light text-white uppercase tracking-widest">
//                   Limited Availability • Book Now
//                 </span>
//               </div>

//               {/* Main Heading with Split Text Effect */}
//               <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,5.5rem)] tracking-tight text-white leading-[1.05] mb-6">
//                 Ready to
//                 <span className="relative inline-block ml-2 md:ml-4">
//                   <span className="text-[#E8573A]">Feel Better?</span>
//                   <svg className="absolute -bottom-2 left-0 w-full h-[3px] text-[#E8573A]" viewBox="0 0 200 4" fill="currentColor">
//                     <path d="M0,2 L200,2" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
//                   </svg>
//                 </span>
//               </h2>

//               {/* Description with better readability */}
//               <p className="font-sans text-[clamp(1rem,1.25vw,1.125rem)] font-light text-white/90 max-w-[45ch] mb-8 md:mb-10 leading-relaxed">
//                 Book a free consultation or schedule your first session. Our team
//                 responds within 24 hours. Completely confidential, zero obligations.
//               </p>

//               {/* CTA Buttons with hover effects */}
//               <div className="flex flex-col sm:flex-row items-start gap-5">
//                 <a
//                   href="#admissions"
//                   className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#E8573A] text-white text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#F06B4E] hover:shadow-[0_0_30px_rgba(232,87,58,0.4)] overflow-hidden"
//                 >
//                   <span className="relative z-10 flex items-center">
//                     BOOK A FREE CONSULTATION
//                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1">
//                       <path d="M5 12h14" />
//                       <path d="m12 5 7 7-7 7" />
//                     </svg>
//                   </span>
//                   {/* Shine effect on hover */}
//                   <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
//                 </a>

//                 <a
//                   href="tel:+441234567890"
//                   className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-light transition-colors group"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#E8573A]/20 transition-colors">
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                     </svg>
//                   </div>
//                   <span className="group-hover:underline">or call +44 (0) 1234 567 890</span>
//                 </a>
//               </div>

//               {/* Trust Badges */}
//               <div className="flex items-center gap-6 mt-8 pt-4 border-t border-white/10">
//                 <div className="flex items-center gap-2">
//                   <svg className="w-4 h-4 text-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                   </svg>
//                   <span className="text-white/60 text-xs font-mono">4.9/5 Rating</span>
//                 </div>
//                 <div className="w-px h-4 bg-white/20" />
//                 <div className="flex items-center gap-2">
//                   <svg className="w-4 h-4 text-[#E8573A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   <span className="text-white/60 text-xs font-mono">24hr Response</span>
//                 </div>
//                 <div className="w-px h-4 bg-white/20" />
//                 <div className="flex items-center gap-2">
//                   <svg className="w-4 h-4 text-[#E8573A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                   <span className="text-white/60 text-xs font-mono">100% Confidential</span>
//                 </div>
//               </div>
//             </div>

//             {/* Empty spacer for right side - maintains left alignment */}
//             <div className="hidden lg:block flex-1" />

//           </section>
//         </div>

//         {/* Footer - With semi-transparent background */}
//         <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 relative pb-8 pt-16 md:pt-20 z-30">
//           <div className="max-w-[90rem] mx-auto px-[clamp(1.5rem,5vw,5rem)] flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 border-b border-slate-200 pb-12 lg:pb-16">
//             <div className="flex flex-col justify-between max-w-xs">
//               <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7779c4e9-cf43-4379-a162-96455d9c5618_320w.png" alt="Serenity Counselling Logo" className="md:w-40 w-32 h-auto object-contain mb-8" />
//               <div className="font-mono text-xs font-light text-slate-500 leading-[1.8] tracking-widest">
//                 SERENITY COUNSELLING
//                 <br />
//                 LICENSED & ACCREDITED THERAPISTS
//                 <br />
//                 BACP REGISTERED • GDPR COMPLIANT
//               </div>
//             </div>

//             <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-24 w-full lg:w-auto">
//               <div>
//                 <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
//                   Services
//                 </h5>
//                 <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
//                   <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Individual Therapy</a></li>
//                   <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Couples Counselling</a></li>
//                   <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Family Therapy</a></li>
//                 </ul>
//               </div>
//               <div>
//                 <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
//                   Practice
//                 </h5>
//                 <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
//                   <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Our Approach</a></li>
//                   <li>
//                     <a href="#" className="hover:text-[#F06B4E] transition-colors flex items-center gap-2">
//                       Careers
//                       <span className="bg-[#E8573A] text-white px-1.5 py-0.5 text-[0.6rem] font-normal rounded-sm">HIRING</span>
//                     </a>
//                   </li>
//                   <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Press Room</a></li>
//                 </ul>
//               </div>
//               <div className="col-span-2 md:col-span-1">
//                 <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
//                   Connect
//                 </h5>
//                 <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
//                   <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Instagram</a></li>
//                   <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">LinkedIn</a></li>
//                   <li>
//                     <a href="#" className="hover:text-[#F06B4E] transition-colors flex items-center gap-2">
//                       Availability
//                       <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           <div className="w-full flex justify-center mt-6 md:mt-8">
//             <span className="font-mono text-xs font-light text-slate-400 tracking-widest uppercase text-center px-4">
//               © 2024 SERENITY COUNSELLING. ALL RIGHTS RESERVED.
//             </span>
//           </div>
//         </footer>
//       </div>

//       <style jsx global>{`
//         @keyframes slideDown {
//           0% { top: -50%; }
//           100% { top: 100%; }
//         }
          
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-marquee {
//           animation: marquee 40s linear infinite;
//         }
//         .animate-slideDown {
//           animation: slideDown 2s ease-in-out infinite;
//         }
//         .reveal-up {
//           opacity: 0;
//           transform: translateY(2rem);
//           filter: blur(4px);
//           transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1);
//         }
//         .reveal-up.is-visible {
//           opacity: 1;
//           transform: translateY(0);
//           filter: blur(0);
//         }
//         .reveal-clip {
//           clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
//           transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1);
//         }
//         .reveal-clip.is-visible {
//           clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
//         }
//         .codepen-button {
//           display: inline-block;
//           cursor: pointer;
//           color: #fff;
//           position: relative;
//           text-decoration: none;
//           font-weight: 600;
//           border-radius: 100px;
//           overflow: hidden;
//           padding: 2px;
//           isolation: isolate;
//         }
//         .codepen-button::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           width: 400%;
//           height: 100%;
//           background: linear-gradient(115deg, #d1d1d1, #E8573A, #fcd5ce);
//           background-size: 25% 100%;
//           animation: border-shift 0.75s linear infinite;
//         }
//         .codepen-button span {
//           position: relative;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 0.5rem;
//           background: #E8573A;
//           border-radius: 100px;
//           height: 100%;
//           transition: background 0.3s ease;
//         }
//         .codepen-button:hover span {
//           background: #F06B4E;
//         }
//         @keyframes border-shift {
//           to { transform: translateX(-25%); }
//         }
//         .bg-noise {
//           background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
//           background-repeat: repeat;
//           background-size: 200px;
//         }
//         .bento-card {
//           transition: transform 0.4s ease, box-shadow 0.4s ease;
//         }
//         .bento-card:hover {
//           transform: scale(1.01);
//         }
//       `}</style>
//     </div>
//   );
// }




'use client';

import { useEffect, useRef, useState } from 'react';
import LeadPopup from '@/components/LeadPopup'
import Image from "next/image";
import Navbar from '@/components/Navbar';

export default function Home() {
  // State for countdown
  const [countdown, setCountdown] = useState({ hours: 18, minutes: 4, seconds: 22 });

  // Force animation play state after mount — fixes SSR hydration killing initial scroll
  useEffect(() => {
    const tracks = document.querySelectorAll<HTMLElement>('.community-track');
    tracks.forEach(track => {
      track.style.animationPlayState = 'running';
    });
  }, []);

  // Community gallery rAF scroll — immune to SSR hydration
  useEffect(() => {
    const colEls = document.querySelectorAll<HTMLElement>('.community-col')
    const speeds = [0.5, 0.4, 0.55]
    const directions = [-1, 1, -1] // -1 = scroll up, 1 = scroll down

    type ColState = { offset: number; paused: boolean }
    const state: ColState[] = []

    colEls.forEach((col, i) => {
      const track = col.querySelector<HTMLElement>('.community-track')
      if (!track) return
      const half = track.scrollHeight / 2
      const startOffset = directions[i] === 1 ? -half : 0
      state[i] = { offset: startOffset, paused: false }
      track.style.transform = `translateY(${startOffset}px)`
      track.style.willChange = 'transform'
      col.addEventListener('mouseenter', () => { state[i].paused = true })
      col.addEventListener('mouseleave', () => { state[i].paused = false })
    })

    let rafId: number
    const tick = () => {
      colEls.forEach((col, i) => {
        if (!state[i] || state[i].paused) return
        const track = col.querySelector<HTMLElement>('.community-track')
        if (!track) return
        const half = track.scrollHeight / 2
        state[i].offset += speeds[i] * directions[i]
        if (directions[i] === -1 && state[i].offset <= -half) state[i].offset = 0
        if (directions[i] === 1 && state[i].offset >= 0) state[i].offset = -half
        track.style.transform = `translateY(${state[i].offset}px)`
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])
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
      <LeadPopup />
      {/* Noise Overlay - Fixed */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-multiply bg-noise" />

      {/* STATIC BACKGROUND - Fixed and never scrolls */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#AEC7E4] via-[#C0D6EC] to-white" />

        {/* Left Cloud */}
        <div className="absolute -left-[10%] top-[15%] w-[50vw] min-w-[400px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', maskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)' }} />

        {/* Right Cloud */}
        <div className="absolute -right-[15%] top-[5%] w-[60vw] min-w-[500px] aspect-square bg-[url('https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen opacity-90" style={{ WebkitMaskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', maskImage: 'radial-gradient(circle at center, black 15%, transparent 60%)', transform: 'scaleX(-1) rotate(5deg)' }} />
      </div>

      {/* SCROLLABLE CONTENT - Relative with transparent background */}
      <div className="relative z-10 bg-transparent">
        {/* Floating Navigation Pill */}
        <Navbar/>

        {/* Hero Section */}
        <section className="relative min-h-[100dvh] w-full flex items-center pt-[8rem] pb-[4rem] px-[clamp(1.5rem,5vw,5rem)] overflow-hidden">
          <div className="w-full max-w-[90rem] mx-auto relative z-10 grid grid-cols-1 gap-12 items-center">
            <div className="flex flex-col items-center text-center mt-12 md:mt-0">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-8 reveal-up shadow-sm is-visible" style={{ transitionDelay: '1.1s' }}>
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse shadow-[0_0_10px_rgba(232,87,58,0.20)]" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  RCI Registered Psychologist
                </span>
              </div>

              <h1 className="font-display font-normal text-[clamp(2.5rem,8vw,9rem)] leading-[0.85] tracking-tighter text-slate-900 mb-8 reveal-up text-balance flex flex-col items-center w-full is-visible" style={{ transitionDelay: '1.2s' }}>
                <span className="sr-only">Neuro Nest Counseling Center</span>
                <span>HEALING MINDS</span>
                <span className="flex items-center justify-center gap-3 md:gap-4 flex-wrap w-full">
                  GROWING
                  <span className="hidden sm:inline-flex h-[clamp(2.5rem,5vw,6rem)] w-[clamp(6rem,12vw,14rem)] bg-white border rounded-full items-center justify-center overflow-hidden relative group backdrop-blur-sm shadow-sm border-white">
                    <span className="bg-center group-hover:scale-110 transition-transform duration-1000 opacity-60 bg-[url(https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=320&q=80)] bg-cover absolute inset-0" />
                    <span className="z-[5] border-stone-50 absolute inset-0" />
                    <span className="text-xs text-neutral-50 tracking-widest font-mono z-10 relative">
                      HEARTS
                    </span>
                  </span>
                </span>
                <span>EMPOWERING LIVES</span>
              </h1>

              <p className="font-sans text-[clamp(1.125rem,1.5vw,1.5rem)] font-light text-slate-600 max-w-[50ch] leading-[1.6] mb-12 reveal-up text-balance is-visible" style={{ transitionDelay: '1.3s' }}>
                Compassionate, Confidential Counseling for Children, Adolescents, Adults &amp; Families.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto reveal-up is-visible" style={{ transitionDelay: '1.4s' }}>
                <a href="#admissions" className="codepen-button w-full sm:w-auto">
                  <span className="px-8 py-4 text-sm font-mono tracking-widest flex items-center gap-2">
                    BOOK A FREE CONSULTATION
                    {/* @ts-expect-error - web component */}
                    <iconify-icon icon="solar:heart-linear" className="w-5 h-5" />
                  </span>
                </a>
                <a href="#services" className="group flex items-center justify-center gap-3 h-14 px-6 text-xs text-slate-500 hover:text-slate-900 font-mono font-light tracking-widest transition-colors w-full sm:w-auto">
                  <div className="w-8 h-[1px] bg-slate-300 group-hover:w-12 group-hover:bg-slate-900 transition-all duration-300" />
                  EXPLORE SERVICES
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
              { label: 'YEARS EXPERIENCE', target: 15, suffix: '+', description: 'Dedicated to supporting children, adolescents, adults, and families.' },
              { label: 'CLIENTS HELPED', target: 850, suffix: '+', description: 'Individuals and families supported on their healing journey.' },
              { label: 'EXPERTISE AREAS', target: 8, suffix: '+', description: 'Specialized in child counseling, ADHD, autism, learning difficulties & more.' },
              { label: 'THERAPY MODALITIES', target: 5, suffix: '+', description: 'Remedial, ABA, Behaviour Therapy & evidence-based interventions.' }
            ].map((metric, idx) => (
              <div key={idx} className="p-10 lg:p-14 flex flex-col justify-between aspect-square group bg-white/50 hover:bg-[#E8573A] transition-colors duration-500 cursor-default relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-700 mix-blend-multiply grayscale" />
                <span className="group-hover:text-white/80 transition-colors z-10 text-xs font-normal text-slate-500 tracking-widest font-mono relative">
                  {metric.label}
                </span>
                <div className="relative z-10 transform group-hover:-translate-y-4 transition-transform duration-500">
                  <div className="text-[clamp(3.5rem,6vw,5.5rem)] leading-none group-hover:text-white transition-colors font-normal text-slate-900 tracking-tighter font-display mb-2">
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

        {/* Services Section - Asymmetric Bento Grid */}
        <section id="services" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white/90 backdrop-blur-sm">
          <div className="max-w-[90rem] mx-auto">
            <div className="mb-12 md:mb-20 reveal-up is-visible">
              <span className="font-mono text-xs font-light text-[#E8573A] tracking-[0.2em] uppercase flex items-center gap-3 mb-6">
                <span className="w-2 h-2 bg-[#E8573A]" />
                Our Therapy Services
              </span>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-none mb-6 text-slate-900">
                Evidence-Based
                <br />
                <span className="text-slate-400">Therapeutic Interventions.</span>
              </h2>
              <p className="text-[clamp(1.125rem,1.5vw,1.25rem)] font-light text-slate-500 max-w-[45ch] leading-[1.6]">
                At Neuro Nest Counseling Center, we provide personalized, evidence-based therapeutic interventions tailored to each individual's unique needs.
              </p>
            </div>

            {/* Asymmetric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto md:auto-rows-[24rem]">
              {/* Main Featured Box - Remedial Therapy */}
              <div className="md:col-span-8 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible">
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                  <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white via-white/70 to-transparent z-10 pointer-events-none" />
                  <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop" alt="Remedial Therapy" className="w-full h-full object-cover saturate-[1.1] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]" />
                </div>
                <div className="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
                  <div className="flex justify-between items-start mb-12 md:mb-0">
                    <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                      THERAPY_01
                    </div>
                    {/* @ts-expect-error - web component */}
                    <iconify-icon icon="solar:book-linear" className="w-8 h-8 text-slate-900 opacity-40 group-hover:opacity-100 group-hover:text-[#F06B4E] transition-all duration-500 text-3xl" />
                  </div>
                  <div className="max-w-[32rem] pointer-events-auto">
                    <h3 className="font-display font-normal text-[clamp(2rem,3vw,3rem)] text-slate-900 mb-4 leading-none tracking-tight drop-shadow-sm group-hover:drop-shadow-none">
                      Remedial Therapy
                    </h3>
                    <p className="text-base font-light text-slate-600 leading-[1.6] mb-8 group-hover:text-slate-800 transition-colors">
                      Designed for children who experience learning difficulties in reading, writing, spelling, mathematics, attention, or academic performance. Individualized teaching strategies to improve learning skills, confidence, and school performance.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Learning Disabilities</span>
                      <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Reading & Writing</span>
                      <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Attention & Concentration</span>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors">
                      LEARN MORE
                      {/* @ts-expect-error - web component */}
                      <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* ABA Therapy */}
              <div className="md:col-span-4 md:row-span-2 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-between reveal-up min-h-[24rem] bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style={{ transitionDelay: '0.1s' }}>
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                  <div className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-t from-white via-white/70 to-transparent z-10 pointer-events-none" />
                  <img src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1600&auto=format&fit=crop" alt="ABA Therapy" className="w-full h-full object-cover contrast-[1.08] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05]" />
                </div>
                <div className="z-10 relative h-full flex flex-col justify-between p-8 md:p-12 pointer-events-none">
                  <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 backdrop-blur-md">
                      THERAPY_02
                    </div>
                  </div>
                  <div className="pointer-events-auto">
                    <h3 className="font-display font-normal text-[clamp(1.5rem,2.5vw,2rem)] text-slate-900 mb-3 tracking-tight">
                      ABA Therapy
                    </h3>
                    <p className="text-base font-light text-slate-600 leading-relaxed mb-4 group-hover:text-slate-800 transition-colors">
                      Structured, evidence-based intervention that helps children develop positive behaviours, communication, social interaction, and independence through positive reinforcement.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Autism Spectrum</span>
                      <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Developmental Delays</span>
                    </div>
                    <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors">
                      LEARN MORE
                      {/* @ts-expect-error - web component */}
                      <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Behaviour Therapy - Wide Box */}
              <div className="md:col-span-12 bg-white border border-slate-200 relative overflow-hidden transition-all duration-700 group hover:border-slate-300 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col md:flex-row reveal-up bento-card hover:scale-[1.01] hover:z-20 rounded-xl is-visible" style={{ transitionDelay: '0.2s' }}>
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent z-10 pointer-events-none" />
                  <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1600&auto=format&fit=crop" alt="Behaviour Therapy" className="contrast-[1.05] saturate-[1.05] transition-all duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 group-hover:brightness-[1.08] group-hover:contrast-[1.05] w-full h-full object-cover" />
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col justify-center z-10 relative w-full pointer-events-none">
                  <div className="font-mono text-xs font-light bg-white/80 border border-slate-200 px-3 py-1 rounded-full text-slate-600 self-start mb-6 backdrop-blur-md">
                    THERAPY_03
                  </div>
                  <h3 className="font-display font-normal text-[clamp(1.75rem,2.5vw,2.25rem)] text-slate-900 mb-4 tracking-tight">
                    Behaviour Therapy
                  </h3>
                  <p className="text-base font-light text-slate-600 leading-[1.6] max-w-[40ch] mb-4 group-hover:text-slate-800 transition-colors">
                    Helps individuals understand and change behaviours that affect their daily functioning. Focuses on building healthy habits, improving emotional regulation, increasing self-control, and developing effective coping skills.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Anger Management</span>
                    <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Anxiety & Stress</span>
                    <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">ADHD</span>
                    <span className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">Emotional Regulation</span>
                  </div>
                  <a href="#" className="inline-flex items-center gap-2 font-mono text-xs font-light text-[#E8573A] hover:text-[#F06B4E] transition-colors pointer-events-auto">
                    LEARN MORE
                    {/* @ts-expect-error - web component */}
                    <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Three Simple Steps */}
        <section id="how-it-works" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10">
          <div className="max-w-[90rem] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20 reveal-up">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  How It Works
                </span>
              </div>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
                Your Healing Journey.
                <br />
                <span className="text-[#E8573A]">Three Simple Steps.</span>
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
                Starting therapy can feel daunting, but we've made the process simple
                and welcoming — so you can focus on what matters most: your wellbeing.
              </p>
            </div>

            {/* Main Glass Container */}
            <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none" />
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative p-8 md:p-12">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-[30%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                {/* Step 1 */}
                <div className="relative group reveal-up" style={{ transitionDelay: '0.1s' }}>
                  <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl p-8 md:p-10 hover:border-[#E8573A]/50 hover:bg-white/50 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden shadow-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
                      Free Consultation
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      Schedule a no-obligation introductory call. Meet your counsellor, share what's on your mind, and see if we're the right fit for you.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
                      <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 1</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 px-2">
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Completely confidential</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">No pressure</span>
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
                      Therapy Plan
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      Select from individual, couples, or family counselling. Each plan is personalised to your goals, schedule, and needs.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
                      <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 2</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 px-2">
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Flexible scheduling</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">In-person & online</span>
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
                      Begin Your
                      <br />
                      Healing Journey
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-6">
                      Attend regular sessions, build coping strategies, and experience genuine, lasting change with your dedicated counsellor.
                    </p>
                    <div className="flex items-center gap-2 text-xs font-mono text-[#E8573A]">
                      <span className="bg-[#E8573A]/10 px-2 py-1 rounded-full">STEP 3</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 px-2">
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Ongoing support</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">•</span>
                    <span className="text-[10px] font-mono text-slate-500/70 uppercase tracking-wider">Proven methods</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Link */}
            <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
              <a href="#admissions" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
                <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
                START YOUR HEALING TODAY
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* About Section - Meet Your Psychologist */}
        <section id="about" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10">
          <div className="max-w-[90rem] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20 reveal-up">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  Meet Your Psychologist
                </span>
              </div>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
                Compassion You Can
                <br />
                <span className="text-[#E8573A]">Trust With Your Story.</span>
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
                Work with an RCI Registered Psychologist who genuinely cares about your progress
                and is dedicated to helping you live a healthier, more fulfilling life.
              </p>
            </div>

            {/* Main Glass Container */}
            <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none" />
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl" />

              {/* Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative p-8 md:p-12">
                {/* Image Section */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8573A]/20 to-transparent rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-700" />
                  <div className="relative rounded-2xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-sm shadow-xl">
                    <img
                      src="/counsellor.png"
                      alt="Rama Amte - RCI Registered Psychologist"
                      className="w-full h-full object-cover aspect-[4/5] grayscale-[0.2] hover:grayscale-0 transition-all duration-700 scale-100 hover:scale-105"
                    />
                    {/* Badge */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md border border-white rounded-full px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                        <span className="text-xs font-mono font-light text-slate-900 tracking-wider">
                          RCI REGISTERED • 15+ YEARS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center space-y-6">
                  <div className="reveal-up">
                    <h3 className="text-4xl md:text-5xl font-display font-normal text-slate-900 mb-3 tracking-tight">
                      Rama Amte
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <div className="inline-flex items-center gap-2 bg-[#E8573A]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8573A]/20">
                        <span className="w-1.5 h-1.5 bg-[#E8573A] rounded-full" />
                        <span className="text-xs font-mono font-light text-[#E8573A] tracking-wider">M.A. Psychology</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-[#E8573A]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8573A]/20">
                        <span className="w-1.5 h-1.5 bg-[#E8573A] rounded-full" />
                        <span className="text-xs font-mono font-light text-[#E8573A] tracking-wider">B.Ed. (Special Education)</span>
                      </div>
                      <div className="inline-flex items-center gap-2 bg-[#E8573A]/10 backdrop-blur-sm px-3 py-1 rounded-full border border-[#E8573A]/20">
                        <span className="w-1.5 h-1.5 bg-[#E8573A] rounded-full" />
                        <span className="text-xs font-mono font-light text-[#E8573A] tracking-wider">RCI Registered Psychologist</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio Text */}
                  <div className="space-y-4 reveal-up" style={{ transitionDelay: '0.1s' }}>
                    <p className="text-slate-600 font-light leading-relaxed">
                      <strong>Rama Amte</strong> is an <strong>RCI Registered Psychologist</strong> with a Master's degree in Psychology (M.A.) and a Bachelor of Education in Special Education (B.Ed.). With over <strong>15 years of professional experience</strong>, she has been dedicated to supporting children, adolescents, adults, and families through evidence-based psychological assessment, counseling, and intervention.
                    </p>
                    <p className="text-slate-600 font-light leading-relaxed">
                      Rama believes that every individual has unique strengths and the ability to grow when provided with the right guidance, understanding, and support. Her counseling approach is compassionate, confidential, client-centered, and tailored to each individual's needs.
                    </p>
                  </div>

                  {/* Expertise Areas */}
                  <div className="reveal-up" style={{ transitionDelay: '0.2s' }}>
                    <h4 className="text-sm font-semibold text-slate-900 mb-3">Areas of Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Child & Adolescent Counseling',
                        'Behaviour Management',
                        'Learning Difficulties',
                        'ADHD & Autism',
                        'Parent Guidance',
                        'Emotional Well-being',
                        'School Counseling',
                        'Psychoeducational Assessment'
                      ].map((item) => (
                        <span key={item} className="text-[10px] font-mono bg-[#E8573A]/10 px-2 py-1 rounded-full text-[#E8573A]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Credentials Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 reveal-up" style={{ transitionDelay: '0.3s' }}>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">15+</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Years Experience</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">3</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Specializations</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">RCI</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Registered</div>
                    </div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-xl p-4 border border-white/40">
                      <div className="text-2xl font-display text-[#E8573A] mb-1">850+</div>
                      <div className="text-xs font-mono text-slate-500 uppercase tracking-wider">Clients Helped</div>
                    </div>
                  </div>

                  {/* Mission Statement */}
                  <div className="reveal-up p-4 bg-[#E8573A]/5 rounded-xl border border-[#E8573A]/10" style={{ transitionDelay: '0.4s' }}>
                    <p className="text-sm font-light text-slate-700 italic leading-relaxed">
                      &ldquo;Every mind deserves understanding. Every child deserves an opportunity. Every family deserves hope.&rdquo;
                    </p>
                    <p className="text-xs font-mono text-slate-500 mt-2">— Rama Amte, Neuro Nest Counseling Center</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Link */}
            <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
              <a href="#contact" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
                <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
                BOOK YOUR HEALING SESSION
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
          <div className="max-w-[90rem] mx-auto relative z-10">

            {/* Header */}
            <div className="text-center mb-16 md:mb-20 reveal-up">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse"></div>
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">Client Stories</span>
              </div>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
                Voices of Our <br />
                <span className="text-[#E8573A]">Healing Community.</span>
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
                Real moments shared by our clients and their counsellors on the path to healing.
              </p>
            </div>

            {/* Glass container */}
            <div className="relative rounded-3xl bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl overflow-hidden reveal-up">
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-white/5 pointer-events-none"></div>
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#E8573A]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#E8573A]/5 rounded-full blur-3xl"></div>

              {/* Scroll window */}
              <div className="relative h-[620px] overflow-hidden">
                {/* Top fade */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/80 via-white/40 to-transparent z-20 pointer-events-none rounded-t-3xl"></div>
                {/* Bottom fade */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/80 via-white/40 to-transparent z-20 pointer-events-none rounded-b-3xl"></div>

                {/* ── COLUMN 1 ── scrolls up */}
                <div className="community-col absolute left-0 top-0 w-full md:w-1/3 px-3 h-full">
                  <div className="community-track flex flex-col gap-3">
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
                      <img src="/community/photos/photo-01.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-02.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
                      <img src="/community/photos/photo-03.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-04.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
                      <img src="/community/photos/photo-05.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    {/* set B (duplicate for seamless loop) */}
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
                      <img src="/community/photos/photo-01.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-02.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
                      <img src="/community/photos/photo-03.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-04.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
                      <img src="/community/photos/photo-05.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>

                {/* ── COLUMN 2 ── scrolls down */}
                <div className="community-col absolute left-0 top-0 w-full md:w-1/3 md:left-1/3 px-3 h-full">
                  <div className="community-track flex flex-col gap-3">
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-06.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-07.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
                      <img src="/community/photos/photo-08.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-09.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    {/* set B (duplicate) */}
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-06.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-07.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
                      <img src="/community/photos/photo-08.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-09.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>

                {/* ── COLUMN 3 ── scrolls up */}
                <div className="community-col absolute left-0 top-0 w-full md:w-1/3 md:left-2/3 px-3 h-full">
                  <div className="community-track flex flex-col gap-3">
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
                      <img src="/community/photos/photo-10.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-11.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-12.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-13.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
                      <img src="/community/photos/photo-14.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-15.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-16.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    {/* set B (duplicate) */}
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '240px' }}>
                      <img src="/community/photos/photo-10.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-11.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-12.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-13.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '260px' }}>
                      <img src="/community/photos/photo-14.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '200px' }}>
                      <img src="/community/photos/photo-15.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-md flex-shrink-0" style={{ height: '220px' }}>
                      <img src="/community/photos/photo-16.jpg" alt="Healing community" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  </div>
                </div>

              </div>{/* end scroll window */}
            </div>{/* end glass container */}

            {/* CTA */}
            <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.4s' }}>
              <a href="#admissions" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
                <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300"></span>
                BOOK YOUR HEALING SESSION
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

          </div>
        </section>

        {/* Blog Section - Latest Articles */}
        <section id="blog" className="py-[6rem] md:py-[10rem] px-[clamp(1.5rem,5vw,5rem)] relative z-10 bg-white/80 backdrop-blur-sm">
          <div className="max-w-[90rem] mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 md:mb-20 reveal-up">
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  Latest Articles
                </span>
              </div>
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,4.5rem)] tracking-tighter leading-[1.1] mb-4 text-slate-900">
                Insights From the
                <br />
                <span className="text-[#E8573A]">Counselling Room.</span>
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.125rem)] font-light text-slate-500 max-w-[60ch] mx-auto leading-[1.6]">
                Expert guidance, mental health tips, and stories of hope to support
                you on your wellbeing journey.
              </p>
            </div>

            {/* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-up">
              {/* Blog Post 1 */}
              <a href="/blog/how-creative-agencies-shape-the-future" className="group block">
                <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=800&auto=format&fit=crop"
                      alt="Understanding Anxiety"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 bg-[#E8573A]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-mono tracking-wider">ANXIETY</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
                      <span>March 15, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-normal text-slate-900 mb-3 tracking-tight group-hover:text-[#E8573A] transition-colors duration-300">
                      Understanding Anxiety: What Your Body Is Trying to Tell You
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-4">
                      Anxiety is more than just worry. Learn how to recognise the signs,
                      understand your triggers, and take the first steps toward relief.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-mono text-[#E8573A] group-hover:gap-3 transition-all duration-300">
                      READ MORE
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* Blog Post 2 */}
              <a href="/blog/the-real-roi-of-smart-design" className="group block">
                <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1516401266446-6432a8a07d41?q=80&w=800&auto=format&fit=crop"
                      alt="The Benefits of Couples Counselling"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 bg-[#E8573A]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-mono tracking-wider">RELATIONSHIPS</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
                      <span>March 10, 2024</span>
                      <span>•</span>
                      <span>4 min read</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-normal text-slate-900 mb-3 tracking-tight group-hover:text-[#E8573A] transition-colors duration-300">
                      Why Couples Counselling Works — Even When It Feels Too Late
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-4">
                      Many couples wait until a breaking point to seek help. Here's why
                      starting sooner — or even now — can transform your relationship.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-mono text-[#E8573A] group-hover:gap-3 transition-all duration-300">
                      READ MORE
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>

              {/* Blog Post 3 */}
              <a href="/blog/how-purpose-driven-creativity-builds-brand-power" className="group block">
                <div className="bg-white/60 backdrop-blur-md border border-white/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#E8573A]/50 hover:bg-white/70 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=800&auto=format&fit=crop"
                      alt="Mindfulness and Mental Health"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 bg-[#E8573A]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white text-xs font-mono tracking-wider">MINDFULNESS</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-mono mb-3">
                      <span>March 5, 2024</span>
                      <span>•</span>
                      <span>6 min read</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-normal text-slate-900 mb-3 tracking-tight group-hover:text-[#E8573A] transition-colors duration-300">
                      5 Mindfulness Practices That Support Your Mental Health Daily
                    </h3>
                    <p className="text-slate-600 font-light leading-relaxed mb-4">
                      Small daily habits can make a profound difference. Discover five
                      evidence-based mindfulness practices recommended by our therapists.
                    </p>
                    <div className="flex items-center gap-2 text-sm font-mono text-[#E8573A] group-hover:gap-3 transition-all duration-300">
                      READ MORE
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* View All Articles Link */}
            <div className="text-center mt-12 reveal-up" style={{ transitionDelay: '0.2s' }}>
              <a href="/blog" className="group inline-flex items-center gap-3 text-sm font-mono tracking-wider text-slate-600 hover:text-[#E8573A] transition-colors">
                <span className="w-8 h-px bg-slate-300 group-hover:w-12 group-hover:bg-[#E8573A] transition-all duration-300" />
                VIEW ALL ARTICLES
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>
        {/* Final CTA - With Left-Aligned Content & Gradient Overlay */}
        <div className="relative z-20 px-[clamp(1.5rem,5vw,5rem)] py-[4rem] md:py-[8rem] bg-white/50 backdrop-blur-sm">
          <section className="cta-section relative w-full max-w-[90rem] mx-auto min-h-[55vh] flex flex-col md:flex-row items-center justify-between overflow-hidden rounded-3xl shadow-2xl">

            {/* Background Image */}
            <div
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat rounded-3xl"
              style={{ backgroundImage: "url('/bg.png')" }}
            />

            {/* Gradient Overlay - Dark on left, transparent on right */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/85 via-black/60 to-black/20 rounded-3xl" />

            {/* Accent gradient from brand color */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#E8573A]/5 via-transparent to-transparent rounded-3xl" />

            {/* Content - Left Aligned */}
            <div className="relative z-30 w-full max-w-[55rem] px-8 md:px-12 lg:px-16 py-16 md:py-20">

              {/* Animated Badge */}
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 animate-pulse">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
                <span className="font-mono text-xs font-light text-white uppercase tracking-widest">
                  Limited Availability • Book Now
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="font-display font-normal text-[clamp(2.5rem,5vw,5.5rem)] tracking-tight text-white leading-[1.05] mb-6">
                Ready to
                <span className="relative inline-block ml-2 md:ml-4">
                  <span className="text-[#E8573A]">Feel Better?</span>
                  <svg className="absolute -bottom-2 left-0 w-full h-[3px] text-[#E8573A]" viewBox="0 0 200 4" fill="currentColor">
                    <path d="M0,2 L200,2" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
                  </svg>
                </span>
              </h2>

              <p className="font-sans text-[clamp(1rem,1.25vw,1.125rem)] font-light text-white/90 max-w-[45ch] mb-8 md:mb-10 leading-relaxed">
                Book a free consultation or schedule your first session. Our team
                responds within 24 hours. Completely confidential, zero obligations.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <a
                  href="#admissions"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#E8573A] text-white text-sm font-medium tracking-widest uppercase rounded-full transition-all duration-300 hover:-translate-y-[2px] hover:bg-[#F06B4E] hover:shadow-[0_0_30px_rgba(232,87,58,0.4)] overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    BOOK A FREE CONSULTATION
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 transition-transform group-hover:translate-x-1">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </a>

                <a
                  href="tel:+441234567890"
                  className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-light transition-colors group"
                >
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#E8573A]/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span className="group-hover:underline">or call +44 (0) 1234 567 890</span>
                </a>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-6 mt-8 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#E8573A]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-white/60 text-xs font-mono">4.9/5 Rating</span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#E8573A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-white/60 text-xs font-mono">24hr Response</span>
                </div>
                <div className="w-px h-4 bg-white/20" />
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#E8573A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-white/60 text-xs font-mono">100% Confidential</span>
                </div>
              </div>
            </div>

            {/* Empty spacer for right side */}
            <div className="hidden lg:block flex-1" />

          </section>
        </div>

        {/* Footer */}
        <footer className="bg-white/80 backdrop-blur-sm border-t border-slate-200 relative pb-8 pt-16 md:pt-20 z-30">
          <div className="max-w-[90rem] mx-auto px-[clamp(1.5rem,5vw,5rem)] flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 border-b border-slate-200 pb-12 lg:pb-16">
            <div className="flex flex-col justify-between max-w-xs">
              <img src="/neuro-nest-logo.png" alt="Neuro Nest Counseling Center Logo" className="md:w-40 w-32 h-auto object-contain mb-8" />
              <div className="font-mono text-xs font-light text-slate-500 leading-[1.8] tracking-widest">
                NEURO NEST COUNSELING CENTER
                <br />
                RCI REGISTERED PSYCHOLOGIST
                <br />
                BACP REGISTERED • GDPR COMPLIANT
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-24 w-full lg:w-auto">
              <div>
                <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
                  Services
                </h5>
                <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Remedial Therapy</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">ABA Therapy</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Behaviour Therapy</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
                  Practice
                </h5>
                <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Our Approach</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">About Rama Amte</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Press Room</a></li>
                </ul>
              </div>
              <div className="col-span-2 md:col-span-1">
                <h5 className="font-mono text-xs font-normal text-slate-900 tracking-[0.2em] mb-6 uppercase">
                  Connect
                </h5>
                <ul className="flex flex-col gap-4 font-mono text-sm font-light text-slate-500">
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">Instagram</a></li>
                  <li><a href="#" className="hover:text-[#F06B4E] transition-colors block">LinkedIn</a></li>
                  <li>
                    <a href="#" className="hover:text-[#F06B4E] transition-colors flex items-center gap-2">
                      Availability
                      <div className="w-1.5 h-1.5 bg-[#10B981] rounded-full animate-pulse" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-center mt-6 md:mt-8">
            <span className="font-mono text-xs font-light text-slate-400 tracking-widest uppercase text-center px-4">
              © 2024 NEURO NEST COUNSELING CENTER. ALL RIGHTS RESERVED.
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