// 'use client'

// import { useState, useEffect } from 'react'
// import Image from 'next/image'

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)

//   const openLeadPopup = () => {
//     window.dispatchEvent(new CustomEvent('openLeadPopup'))
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Close menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e: MouseEvent) => {
//       const target = e.target as HTMLElement
//       if (isMenuOpen && !target.closest('#navbar') && !target.closest('#mobile-menu')) {
//         setIsMenuOpen(false)
//       }
//     }
//     document.addEventListener('click', handleClickOutside)
//     return () => document.removeEventListener('click', handleClickOutside)
//   }, [isMenuOpen])

//   // Prevent body scroll when menu is open
//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'unset'
//     }
//     return () => {
//       document.body.style.overflow = 'unset'
//     }
//   }, [isMenuOpen])

//   const navLinks = [
//     { href: '#services', label: 'Services' },
//     { href: '#about', label: 'About' },
//     { href: '#admissions', label: 'Booking' },
//   ]

//   return (
//     <>
//       <nav 
//         id="navbar" 
//         className={`fixed top-3 sm:top-4 md:top-6 lg:top-8 inset-x-0 mx-auto z-50 w-[94%] sm:w-[92%] max-w-[55rem] transition-all duration-700 reveal-up is-visible ${
//           isScrolled ? 'shadow-lg' : ''
//         }`}
//         style={{ transitionDelay: '1s' }}
//       >
//         <div className="flex items-center justify-between relative px-2 sm:px-2.5 py-1.5 sm:py-2 md:py-2.5 bg-white/80 backdrop-blur-xl border border-slate-900/10 rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
          
//           {/* Logo - Left side */}
//           <div className="flex-none pl-1.5 sm:pl-2 md:pl-3 z-10">
//             <a href="#" className="flex items-center gap-2 sm:gap-3 group/logo">
//               <Image
//                 src="/logo.png"
//                 alt="Serenity Counselling"
//                 width={160}
//                 height={42}
//                 className="h-5 sm:h-6 md:h-7 w-auto object-contain transition-transform duration-500 group-hover/logo:scale-105"
//                 priority
//               />
//             </a>
//           </div>

//           {/* Desktop Navigation - Hidden on mobile */}
//           <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 lg:gap-1 px-3 lg:px-4 border-x border-slate-900/10 h-[60%]">
//             {navLinks.map((link) =>
//               link.label === 'Booking' ? (
//                 <button
//                   key={link.href}
//                   type="button"
//                   onClick={openLeadPopup}
//                   className="text-[11px] lg:text-xs font-mono font-light text-slate-500 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all duration-300 whitespace-nowrap"
//                 >
//                   {link.label}
//                 </button>
//               ) : (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   className="text-[11px] lg:text-xs font-mono font-light text-slate-500 hover:text-slate-900 hover:bg-slate-900/5 px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all duration-300 whitespace-nowrap"
//                 >
//                   {link.label}
//                 </a>
//               )
//             )}
//           </div>

//           {/* Desktop CTA - Hidden on mobile */}
//           <div className="hidden md:flex flex-none pr-0.5 sm:pr-1 z-10">
//             <button
//               type="button"
//               onClick={openLeadPopup}
//               className="codepen-button touch-manipulation"
//             >
//               <span className="px-3 lg:px-5 py-1.5 lg:py-2 text-[10px] lg:text-xs font-mono tracking-wider flex items-center gap-1.5 lg:gap-2 whitespace-nowrap">
//                 BOOK SESSION
//                 {/* @ts-expect-error - web component */}
//                 <iconify-icon icon="solar:arrow-right-up-linear" className="w-3 h-3 lg:w-4 lg:h-4" />
//               </span>
//             </button>
//           </div>

//           {/* Mobile Hamburger - Only visible on mobile */}
//           <div className="flex-none pr-0.5 sm:pr-1 z-10 md:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="flex flex-col gap-1.5 p-1.5 sm:p-2 touch-manipulation relative z-20"
//               aria-label="Toggle menu"
//               aria-expanded={isMenuOpen}
//             >
//               <span 
//                 className={`block w-4 sm:w-5 h-[1.5px] bg-slate-900 transition-all duration-300 ${
//                   isMenuOpen ? 'rotate-45 translate-y-[5px] sm:translate-y-[6px]' : ''
//                 }`}
//               />
//               <span 
//                 className={`block w-4 sm:w-5 h-[1.5px] bg-slate-900 transition-all duration-300 ${
//                   isMenuOpen ? 'opacity-0' : ''
//                 }`}
//               />
//               <span 
//                 className={`block w-4 sm:w-5 h-[1.5px] bg-slate-900 transition-all duration-300 ${
//                   isMenuOpen ? '-rotate-45 -translate-y-[5px] sm:-translate-y-[6px]' : ''
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu Overlay */}
//       <div
//         className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-all duration-500 ${
//           isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={() => setIsMenuOpen(false)}
//       />

//       {/* Mobile Menu - Slide in from right */}
//       <div
//         id="mobile-menu"
//         className={`fixed top-0 right-0 z-40 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
//           isMenuOpen ? 'translate-x-0' : 'translate-x-full'
//         }`}
//       >
//         {/* Menu Header */}
//         <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100">
//           <a href="#" className="flex items-center">
//             <Image
//               src="/logo.png"
//               alt="Serenity Counselling"
//               width={140}
//               height={37}
//               className="h-6 w-auto object-contain"
//               priority
//             />
//           </a>
//           <button
//             onClick={() => setIsMenuOpen(false)}
//             className="p-2 -mr-2 touch-manipulation"
//             aria-label="Close menu"
//           >
//             <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Menu Links */}
//         <div className="p-5 sm:p-6 space-y-1">
//           {navLinks.map((link) => {
//             const content = <>
//               <span className="font-mono text-sm sm:text-base font-light text-slate-700">
//                 {link.label}
//               </span>
//               <svg 
//                 className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors duration-200" 
//                 fill="none" 
//                 stroke="currentColor" 
//                 viewBox="0 0 24 24"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
//               </svg>
//             </>

//             return link.label === 'Booking' ? (
//               <button
//                 key={link.href}
//                 type="button"
//                 onClick={() => {
//                   setIsMenuOpen(false)
//                   openLeadPopup()
//                 }}
//                 className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 group"
//               >
//                 {content}
//               </button>
//             ) : (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-xl hover:bg-slate-50 transition-colors duration-200 group"
//               >
//                 {content}
//               </a>
//             )
//           })}
//         </div>

//         {/* Menu Footer with CTA */}
//         <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 border-t border-slate-100 bg-white/80 backdrop-blur-sm">
//           <button
//             type="button"
//             onClick={() => {
//               setIsMenuOpen(false)
//               openLeadPopup()
//             }}
//             className="w-full codepen-button inline-block"
//           >
//             <span className="w-full px-5 py-3.5 text-xs font-mono tracking-wider flex items-center justify-center gap-2">
//               BOOK SESSION
//               {/* @ts-expect-error - web component */}
//               <iconify-icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
//             </span>
//           </button>
//           <p className="text-center text-[10px] font-mono text-slate-400 mt-3 tracking-wider">
//             © 2024 Serenity Counselling
//           </p>
//         </div>
//       </div>

//       {/* Animation Keyframes */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .reveal-up {
//           opacity: 0;
//           transform: translateY(20px);
//         }
//         .reveal-up.is-visible {
//           opacity: 1;
//           transform: translateY(0);
//         }
//         @media (hover: none) {
//           button, a {
//             cursor: default;
//           }
//         }
//       `}</style>
//     </>
//   )
// }



'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const openLeadPopup = () => {
    window.dispatchEvent(new CustomEvent('openLeadPopup'))
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMenuOpen && !target.closest('#navbar') && !target.closest('#mobile-menu')) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const navLinks = [
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#admissions', label: 'Booking' },
  ]

  return (
    <>
      <nav 
        id="navbar" 
        className={`fixed top-3 sm:top-4 md:top-6 lg:top-8 inset-x-0 mx-auto z-50 w-[94%] sm:w-[92%] max-w-[55rem] transition-all duration-700 reveal-up is-visible ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        style={{ transitionDelay: '1s' }}
      >
        <div className="flex items-center justify-between relative px-2 sm:px-2.5 py-1.5 sm:py-2 md:py-2.5 bg-white/85 backdrop-blur-xl border-2 border-[#FFB627]/20 rounded-full shadow-[0_10px_40px_-10px_rgba(255,111,89,0.15)]">
          
          {/* Logo - Left side */}
          <div className="flex-none pl-1.5 sm:pl-2 md:pl-3 z-10">
            <a href="#" className="flex items-center gap-2 sm:gap-3 group/logo">
              <Image
                src="/logo.png"
                alt="Neuro Nest Counseling Center"
                width={160}
                height={42}
                className="h-6 sm:h-7 md:h-8 w-auto object-contain transition-transform duration-500 group-hover/logo:scale-110 group-hover/logo:rotate-2"
                priority
              />
            </a>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-0.5 lg:gap-1 px-3 lg:px-4 border-x-2 border-[#FFB627]/15 h-[60%]">
            {navLinks.map((link) =>
              link.label === 'Booking' ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={openLeadPopup}
                  className="text-[11px] lg:text-xs font-mono font-bold text-slate-600 hover:text-[#2FA5C4] hover:bg-[#2FA5C4]/10 px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all duration-300 whitespace-nowrap"
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] lg:text-xs font-mono font-bold text-slate-600 hover:text-[#2FA5C4] hover:bg-[#2FA5C4]/10 px-2.5 lg:px-4 py-1.5 lg:py-2 rounded-full transition-all duration-300 whitespace-nowrap"
                >
                  {link.label}
                </a>
              )
            )}
          </div>

          {/* Desktop CTA - Hidden on mobile */}
          <div className="hidden md:flex flex-none pr-0.5 sm:pr-1 z-10">
            <button
              type="button"
              onClick={openLeadPopup}
              className="codepen-button touch-manipulation"
            >
              <span className="px-3 lg:px-5 py-1.5 lg:py-2 text-[10px] lg:text-xs font-mono font-bold tracking-wider flex items-center gap-1.5 lg:gap-2 whitespace-nowrap">
                BOOK SESSION
                {/* @ts-expect-error - web component */}
                <iconify-icon icon="solar:arrow-right-up-linear" className="w-3 h-3 lg:w-4 lg:h-4" />
              </span>
            </button>
          </div>

          {/* Mobile Hamburger - Only visible on mobile */}
          <div className="flex-none pr-0.5 sm:pr-1 z-10 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-1.5 sm:p-2 touch-manipulation relative z-20"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span 
                className={`block w-4 sm:w-5 h-[2px] rounded-full bg-[#FF6F59] transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-[5px] sm:translate-y-[6px]' : ''
                }`}
              />
              <span 
                className={`block w-4 sm:w-5 h-[2px] rounded-full bg-[#2FA5C4] transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span 
                className={`block w-4 sm:w-5 h-[2px] rounded-full bg-[#4CAF6D] transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-[5px] sm:-translate-y-[6px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Menu - Slide in from right */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 z-40 h-full w-[280px] sm:w-[320px] bg-white shadow-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b-2 border-[#FFB627]/15">
          <a href="#" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Neuro Nest Counseling Center"
              width={140}
              height={37}
              className="h-7 w-auto object-contain"
              priority
            />
          </a>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="p-2 -mr-2 touch-manipulation"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Menu Links */}
        <div className="p-5 sm:p-6 space-y-1">
          {navLinks.map((link, idx) => {
            const colors = ['#E63950', '#2FA5C4', '#4CAF6D']
            const dotColor = colors[idx % colors.length]
            const content = <>
              <span className="flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
                {link.label}
              </span>
              <svg 
                className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </>

            return link.label === 'Booking' ? (
              <button
                key={link.href}
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  openLeadPopup()
                }}
                className="w-full flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200 group"
              >
                {content}
              </button>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between py-3 sm:py-4 px-3 sm:px-4 rounded-2xl hover:bg-slate-50 transition-colors duration-200 group"
              >
                {content}
              </a>
            )
          })}
        </div>

        {/* Menu Footer with CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 border-t-2 border-[#FFB627]/15 bg-white/80 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen(false)
              openLeadPopup()
            }}
            className="w-full codepen-button inline-block"
          >
            <span className="w-full px-5 py-3.5 text-xs font-mono font-bold tracking-wider flex items-center justify-center gap-2">
              BOOK SESSION
              {/* @ts-expect-error - web component */}
              <iconify-icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
            </span>
          </button>
          <p className="text-center text-[10px] font-mono font-semibold text-slate-400 mt-3 tracking-wider">
            © 2024 Neuro Nest Counseling Center
          </p>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .reveal-up {
          opacity: 0;
          transform: translateY(20px);
        }
        .reveal-up.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (hover: none) {
          button, a {
            cursor: default;
          }
        }
      `}</style>
    </>
  )
}
