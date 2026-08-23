
// 'use client'

// import { useEffect, useState } from 'react'

// type FormData = {
//   name: string
//   email: string
//   phone: string
//   interest: string
//   message: string
// }

// type FormStatus = 'idle' | 'submitting' | 'submitted'

// export default function LeadPopup() {
//   const [isVisible, setIsVisible] = useState(false)
//   const [showThankYou, setShowThankYou] = useState(false)
//   const [status, setStatus] = useState<FormStatus>('idle')
//   const [formData, setFormData] = useState<FormData>({
//     name: '',
//     email: '',
//     phone: '',
//     interest: '',
//     message: '',
//   })

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsVisible(true)
//     }, 3500)
//     return () => clearTimeout(timer)
//   }, [])

//   // Allow any booking CTA on the site to open this shared form.
//   useEffect(() => {
//     const openPopup = () => {
//       setShowThankYou(false)
//       setStatus('idle')
//       setIsVisible(true)
//     }

//     window.addEventListener('openLeadPopup', openPopup)
//     return () => window.removeEventListener('openLeadPopup', openPopup)
//   }, [])

//   // Prevent body scroll when popup is open
//   useEffect(() => {
//     if (isVisible) {
//       document.body.style.overflow = 'hidden'
//     } else {
//       document.body.style.overflow = 'unset'
//     }
//     return () => {
//       document.body.style.overflow = 'unset'
//     }
//   }, [isVisible])

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setStatus('submitting')

//     try {
//       const res = await fetch('/api/lead', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       })

//       if (!res.ok) throw new Error('Failed')

//       setStatus('submitted')
//       setShowThankYou(true)
//     } catch {
//       setStatus('idle')
//       alert('Something went wrong. Please try again.')
//     }
//   }

//   const handleClose = () => {
//     setIsVisible(false)
//     setShowThankYou(false)
//     setStatus('idle')
//   }

//   if (!isVisible) return null

//   return (
//     <>
//       {/* ─── Backdrop ─── */}
//       <div
//         className="fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-sm"
//         style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)' }}
//         onClick={showThankYou ? handleClose : undefined}
//       />

//       {/* ─── Modal Shell ─── */}
//       <div
//         className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center px-2 sm:px-4 py-2 sm:py-6"
//         style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)' }}
//       >
//         <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] max-h-[95vh] md:max-h-[90vh] overflow-y-auto scrollbar-hide">

//           {/* Top accent line */}
//           <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E8573A] via-[#F06B4E] to-[#E8573A] z-10" />

//           {/* ── FORM VIEW ── */}
//           {!showThankYou && (
//             <div className="p-5 sm:p-6 md:p-8 lg:p-10">

//               {/* Header */}
//               <div className="flex items-start justify-between mb-5 sm:mb-6 md:mb-7">
//                 <div className="flex-1 min-w-0 pr-2 sm:pr-3">
//                   <div className="inline-flex items-center gap-2 sm:gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
//                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E8573A] rounded-full animate-pulse shadow-[0_0_10px_rgba(232,87,58,0.4)]" />
//                     <span className="font-mono text-[10px] sm:text-xs font-light text-slate-900 uppercase tracking-widest whitespace-nowrap">
//                       Free Consultation
//                     </span>
//                   </div>
//                   <h2 className="font-display font-normal text-2xl sm:text-3xl md:text-4xl tracking-tighter leading-none text-slate-900 mb-1 sm:mb-2">
//                     Let's Talk About<br className="hidden xs:block" />
//                     <span className="text-[#E8573A]">Your Goals.</span>
//                   </h2>
//                   <p className="font-sans text-xs sm:text-sm font-light text-slate-500 leading-relaxed">
//                     Tell us a little about yourself and we'll get back to you shortly.
//                   </p>
//                 </div>
//                 {/* Close button */}
//                 <button
//                   onClick={handleClose}
//                   aria-label="Close popup"
//                   className="flex-shrink-0 ml-2 sm:ml-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all duration-300 touch-manipulation"
//                 >
//                   <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//               </div>

//               {/* Form */}
//               <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

//                 {/* Name */}
//                 <div>
//                   <label className="block font-mono text-[10px] sm:text-xs font-light tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
//                     Full Name <span className="text-[#E8573A]">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     placeholder="John Smith"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300 text-base sm:text-sm"
//                   />
//                 </div>

//                 {/* Email + Phone row */}
//                 <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
//                   <div>
//                     <label className="block font-mono text-[10px] sm:text-xs font-light tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
//                       Email <span className="text-[#E8573A]">*</span>
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       placeholder="john@email.com"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300 text-base sm:text-sm"
//                     />
//                   </div>
//                   <div>
//                     <label className="block font-mono text-[10px] sm:text-xs font-light tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
//                       Phone
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       placeholder="+1 (555) 000-0000"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300 text-base sm:text-sm"
//                     />
//                   </div>
//                 </div>

//                 {/* Interest */}
//                 <div>
//                   <label className="block font-mono text-[10px] sm:text-xs font-light tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
//                     I'm Interested In <span className="text-[#E8573A]">*</span>
//                   </label>
//                   <select
//                     name="interest"
//                     required
//                     value={formData.interest}
//                     onChange={handleChange}
//                     className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300 appearance-none cursor-pointer text-base sm:text-sm"
//                     style={{
//                       backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23718096'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
//                       backgroundRepeat: 'no-repeat',
//                       backgroundPosition: 'right 0.75rem center',
//                       backgroundSize: '0.875rem'
//                     }}
//                   >
//                     <option value="" disabled>Select a topic...</option>
//                     <option value="general">General Counselling</option>
//                     <option value="career">Career Guidance</option>
//                     <option value="academic">Academic Advice</option>
//                     <option value="personal">Personal Development</option>
//                     <option value="other">Other</option>
//                   </select>
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block font-mono text-[10px] sm:text-xs font-light tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
//                     Brief Message
//                   </label>
//                   <textarea
//                     name="message"
//                     rows={3}
//                     placeholder="Tell us how we can help..."
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300 resize-none text-base sm:text-sm"
//                   />
//                 </div>

//                 {/* Submit */}
//                 <div className="pt-1 sm:pt-2">
//                   <button
//                     type="submit"
//                     disabled={status === 'submitting'}
//                     className="codepen-button w-full disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
//                   >
//                     <span className="px-4 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-xs font-mono tracking-widest flex items-center justify-center gap-2">
//                       {status === 'submitting' ? (
//                         <>
//                           <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                           </svg>
//                           SENDING...
//                         </>
//                       ) : (
//                         <>
//                           BOOK FREE CONSULTATION
//                           {/* @ts-expect-error */}
//                           <iconify-icon icon="solar:arrow-right-up-linear" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                         </>
//                       )}
//                     </span>
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleClose}
//                     className="w-full mt-2 sm:mt-3 text-center font-mono text-[10px] sm:text-xs font-light text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors duration-300 py-1.5 sm:py-2 touch-manipulation"
//                   >
//                     Maybe Later
//                   </button>
//                 </div>

//               </form>
//             </div>
//           )}

//           {/* ── THANK YOU VIEW ── */}
//           {showThankYou && (
//             <div
//               className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center"
//               style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)' }}
//             >
//               {/* Success icon */}
//               <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E8573A]/10 flex items-center justify-center mb-5 sm:mb-7 relative">
//                 <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#E8573A]/20 flex items-center justify-center">
//                   <svg className="w-5 h-5 sm:w-7 sm:h-7 text-[#E8573A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
//                   </svg>
//                 </div>
//                 <div className="absolute inset-0 rounded-full border-2 border-[#E8573A]/30 animate-ping" />
//               </div>

//               {/* Badge */}
//               <div className="inline-flex items-center gap-2 sm:gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5">
//                 <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#E8573A] rounded-full" />
//                 <span className="font-mono text-[10px] sm:text-xs font-light text-slate-900 uppercase tracking-widest">
//                   Message Received
//                 </span>
//               </div>

//               <h2 className="font-display font-normal text-3xl sm:text-4xl md:text-5xl tracking-tighter leading-none text-slate-900 mb-3 sm:mb-4">
//                 Thank You,<br />
//                 <span className="text-[#E8573A]">{formData.name.split(' ')[0] || 'Friend'}.</span>
//               </h2>

//               <p className="font-sans text-sm sm:text-base font-light text-slate-500 leading-relaxed max-w-sm mb-8 sm:mb-10">
//                 We've received your details and will reach out to you very soon. We look forward to speaking with you.
//               </p>

//               <div className="w-full max-w-xs">
//                 <button
//                   onClick={handleClose}
//                   className="codepen-button w-full touch-manipulation"
//                 >
//                   <span className="px-4 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-xs font-mono tracking-widest flex items-center justify-center gap-2">
//                     EXPLORE THE SITE
//                     {/* @ts-expect-error */}
//                     <iconify-icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
//                   </span>
//                 </button>
//               </div>

//             </div>
//           )}

//         </div>
//       </div>

//       {/* ─── Animation Keyframes & Scrollbar Hide ─── */}
//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from { opacity: 0; transform: translateY(24px) scale(0.97); }
//           to   { opacity: 1; transform: translateY(0)    scale(1);    }
//         }

//         /* Hide scrollbar for Chrome, Safari and Opera */
//         .scrollbar-hide::-webkit-scrollbar {
//           display: none;
//         }

//         /* Hide scrollbar for IE, Edge and Firefox */
//         .scrollbar-hide {
//           -ms-overflow-style: none;  /* IE and Edge */
//           scrollbar-width: none;  /* Firefox */
//         }

//         /* Touch optimization */
//         @media (hover: none) {
//           button, input, select, textarea {
//             cursor: default;
//           }
//           button:active {
//             transform: scale(0.97);
//           }
//         }

//         /* Extra small screens */
//         @media (max-width: 480px) {
//           .xs\\:block {
//             display: block !important;
//           }
//           .xs\\:grid-cols-2 {
//             grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
//           }
//         }
//       `}</style>
//     </>
//   )
// }



'use client'

import { useEffect, useState } from 'react'

type FormData = {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

type FormStatus = 'idle' | 'submitting' | 'submitted'

export default function LeadPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: '',
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  // Allow any booking CTA on the site to open this shared form.
  useEffect(() => {
    const openPopup = () => {
      setShowThankYou(false)
      setStatus('idle')
      setIsVisible(true)
    }

    window.addEventListener('openLeadPopup', openPopup)
    return () => window.removeEventListener('openLeadPopup', openPopup)
  }, [])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed')

      setStatus('submitted')
      setShowThankYou(true)
    } catch {
      setStatus('idle')
      alert('Something went wrong. Please try again.')
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setShowThankYou(false)
    setStatus('idle')
  }

  if (!isVisible) return null

  return (
    <>
      {/* ─── Backdrop ─── */}
      <div
        className="fixed inset-0 z-[9998] bg-slate-900/40 backdrop-blur-sm"
        style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)' }}
        onClick={showThankYou ? handleClose : undefined}
      />

      {/* ─── Modal Shell ─── */}
      <div
        className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center px-2 sm:px-4 py-2 sm:py-6"
        style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="relative w-full max-w-lg bg-white border-2 border-[#FFB627]/20 rounded-[1.75rem] shadow-[0_20px_60px_-10px_rgba(255,111,89,0.2)] max-h-[95vh] md:max-h-[90vh] overflow-y-auto scrollbar-hide">

          {/* Top accent line - rainbow like the logo */}
          <div className="absolute top-0 left-0 right-0 h-[5px] bg-gradient-to-r from-[#E63950] via-[#FFB627] via-[#4CAF6D] to-[#2FA5C4] z-10" />

          {/* ── FORM VIEW ── */}
          {!showThankYou && (
            <div className="p-5 sm:p-6 md:p-8 lg:p-10">

              {/* Header */}
              <div className="flex items-start justify-between mb-5 sm:mb-6 md:mb-7">
                <div className="flex-1 min-w-0 pr-2 sm:pr-3">
                  <div className="inline-flex items-center gap-2 sm:gap-3 border-2 border-[#FF6F59]/20 bg-white/50 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#FF6F59] rounded-full animate-pulse shadow-[0_0_10px_rgba(255,111,89,0.4)]" />
                    <span className="font-mono text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-widest whitespace-nowrap">
                      Free Consultation
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-none text-slate-900 mb-1 sm:mb-2">
                    Let's Talk About<br className="hidden xs:block" />
                    <span className="text-[#FF6F59]">Your Goals.</span>
                  </h2>
                  <p className="font-sans text-xs sm:text-sm font-medium text-slate-500 leading-relaxed">
                    Tell us a little about yourself and we'll get back to you shortly.
                  </p>
                </div>
                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close popup"
                  className="flex-shrink-0 ml-2 sm:ml-4 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border-2 border-slate-200 text-slate-400 hover:text-white hover:bg-[#FF6F59] hover:border-[#FF6F59] transition-all duration-300 touch-manipulation"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">

                {/* Name */}
                <div>
                  <label className="block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
                    Full Name <span className="text-[#FF6F59]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-sans text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6F59] focus:ring-2 focus:ring-[#FF6F59]/15 transition-all duration-300 text-base sm:text-sm"
                  />
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
                      Email <span className="text-[#FF6F59]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-sans text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6F59] focus:ring-2 focus:ring-[#FF6F59]/15 transition-all duration-300 text-base sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-sans text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6F59] focus:ring-2 focus:ring-[#FF6F59]/15 transition-all duration-300 text-base sm:text-sm"
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <label className="block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
                    I'm Interested In <span className="text-[#FF6F59]">*</span>
                  </label>
                  <select
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-sans text-sm font-medium focus:outline-none focus:border-[#FF6F59] focus:ring-2 focus:ring-[#FF6F59]/15 transition-all duration-300 appearance-none cursor-pointer text-base sm:text-sm"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23718096'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '0.875rem'
                    }}
                  >
                    <option value="" disabled>Select a topic...</option>
                    <option value="general">General Counselling</option>
                    <option value="career">Career Guidance</option>
                    <option value="academic">Academic Advice</option>
                    <option value="personal">Personal Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-mono text-[10px] sm:text-xs font-bold tracking-widest uppercase text-slate-500 mb-1 sm:mb-1.5">
                    Brief Message
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl border-2 border-slate-200 bg-white text-slate-900 font-sans text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#FF6F59] focus:ring-2 focus:ring-[#FF6F59]/15 transition-all duration-300 resize-none text-base sm:text-sm"
                  />
                </div>

                {/* Submit */}
                <div className="pt-1 sm:pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="codepen-button w-full disabled:opacity-60 disabled:cursor-not-allowed touch-manipulation"
                  >
                    <span className="px-4 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest flex items-center justify-center gap-2">
                      {status === 'submitting' ? (
                        <>
                          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        <>
                          BOOK FREE CONSULTATION
                          {/* @ts-expect-error */}
                          <iconify-icon icon="solar:arrow-right-up-linear" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </>
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full mt-2 sm:mt-3 text-center font-mono text-[10px] sm:text-xs font-semibold text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors duration-300 py-1.5 sm:py-2 touch-manipulation"
                  >
                    Maybe Later
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* ── THANK YOU VIEW ── */}
          {showThankYou && (
            <div
              className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col items-center text-center"
              style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {/* Success icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#4CAF6D]/10 flex items-center justify-center mb-5 sm:mb-7 relative">
                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#4CAF6D]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-7 sm:h-7 text-[#4CAF6D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#4CAF6D]/30 animate-ping" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-2 sm:gap-3 border-2 border-[#4CAF6D]/20 bg-white/50 backdrop-blur-md px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-4 sm:mb-5">
                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#4CAF6D] rounded-full" />
                <span className="font-mono text-[10px] sm:text-xs font-bold text-slate-700 uppercase tracking-widest">
                  Message Received
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight leading-none text-slate-900 mb-3 sm:mb-4">
                Thank You,<br />
                <span className="text-[#FF6F59]">{formData.name.split(' ')[0] || 'Friend'}.</span>
              </h2>

              <p className="font-sans text-sm sm:text-base font-medium text-slate-500 leading-relaxed max-w-sm mb-8 sm:mb-10">
                We've received your details and will reach out to you very soon. We look forward to speaking with you.
              </p>

              <div className="w-full max-w-xs">
                <button
                  onClick={handleClose}
                  className="codepen-button w-full touch-manipulation"
                >
                  <span className="px-4 sm:px-6 py-3 sm:py-3.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest flex items-center justify-center gap-2">
                    EXPLORE THE SITE
                    {/* @ts-expect-error */}
                    <iconify-icon icon="solar:arrow-right-linear" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ─── Animation Keyframes & Scrollbar Hide ─── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        /* Touch optimization */
        @media (hover: none) {
          button, input, select, textarea {
            cursor: default;
          }
          button:active {
            transform: scale(0.97);
          }
        }

        /* Extra small screens */
        @media (max-width: 480px) {
          .xs\\:block {
            display: block !important;
          }
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
      `}</style>
    </>
  )
}