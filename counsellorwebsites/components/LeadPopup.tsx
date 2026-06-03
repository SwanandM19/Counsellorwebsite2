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
    // Show popup after 3.5 seconds on every visit/refresh
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

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
      // Keep form open on error so user can retry
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
        className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
        style={{ animation: 'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] overflow-hidden">

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#E8573A] via-[#F06B4E] to-[#E8573A]" />

          {/* ── FORM VIEW ── */}
          {!showThankYou && (
            <div className="p-8 md:p-10">

              {/* Header */}
              <div className="flex items-start justify-between mb-7">
                <div>
                  <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-4">
                    <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse shadow-[0_0_10px_rgba(232,87,58,0.4)]" />
                    <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                      Free Consultation
                    </span>
                  </div>
                  <h2 className="font-display font-normal text-3xl md:text-4xl tracking-tighter leading-none text-slate-900 mb-2">
                    Let's Talk About<br />
                    <span className="text-[#E8573A]">Your Goals.</span>
                  </h2>
                  <p className="font-sans text-sm font-light text-slate-500 leading-relaxed">
                    Tell us a little about yourself and we'll get back to you shortly.
                  </p>
                </div>
                {/* Close button */}
                <button
                  onClick={handleClose}
                  aria-label="Close popup"
                  className="flex-shrink-0 ml-4 w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Name */}
                <div>
                  <label className="block font-mono text-xs font-light tracking-widest uppercase text-slate-500 mb-1.5">
                    Full Name <span className="text-[#E8573A]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300"
                  />
                </div>

                {/* Email + Phone row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs font-light tracking-widest uppercase text-slate-500 mb-1.5">
                      Email <span className="text-[#E8573A]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-xs font-light tracking-widest uppercase text-slate-500 mb-1.5">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Interest */}
                <div>
                  <label className="block font-mono text-xs font-light tracking-widest uppercase text-slate-500 mb-1.5">
                    I'm Interested In <span className="text-[#E8573A]">*</span>
                  </label>
                  <select
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23718096'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1rem'
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
                  <label className="block font-mono text-xs font-light tracking-widest uppercase text-slate-500 mb-1.5">
                    Brief Message
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 font-sans text-sm font-light placeholder:text-slate-400 focus:outline-none focus:border-[#E8573A] focus:ring-1 focus:ring-[#E8573A]/20 transition-all duration-300 resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="codepen-button w-full disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <span className="px-6 py-3.5 text-xs font-mono tracking-widest flex items-center justify-center gap-2">
                      {status === 'submitting' ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                          </svg>
                          SENDING...
                        </>
                      ) : (
                        <>
                          BOOK FREE CONSULTATION
                          {/* @ts-expect-error */}
                          <iconify-icon icon="solar:arrow-right-up-linear" className="w-4 h-4" />
                        </>
                      )}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full mt-3 text-center font-mono text-xs font-light text-slate-400 hover:text-slate-600 tracking-widest uppercase transition-colors duration-300 py-2"
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
              className="p-10 md:p-12 flex flex-col items-center text-center"
              style={{ animation: 'fadeIn 0.4s cubic-bezier(0.16,1,0.3,1)' }}
            >
              {/* Success icon */}
              <div className="w-20 h-20 rounded-full bg-[#E8573A]/10 flex items-center justify-center mb-7 relative">
                <div className="w-14 h-14 rounded-full bg-[#E8573A]/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#E8573A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                {/* Pulse ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#E8573A]/30 animate-ping" />
              </div>

              {/* Badge */}
              <div className="inline-flex items-center gap-3 border border-slate-900/10 bg-white/50 backdrop-blur-md px-4 py-1.5 rounded-full mb-5">
                <div className="w-2 h-2 bg-[#E8573A] rounded-full" />
                <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">
                  Message Received
                </span>
              </div>

              <h2 className="font-display font-normal text-4xl md:text-5xl tracking-tighter leading-none text-slate-900 mb-4">
                Thank You,<br />
                <span className="text-[#E8573A]">{formData.name.split(' ')[0] || 'Friend'}.</span>
              </h2>

              <p className="font-sans text-base font-light text-slate-500 leading-relaxed max-w-sm mb-10">
                We've received your details and will reach out to you very soon. We look forward to speaking with you.
              </p>

              <div className="w-full max-w-xs">
                <button
                  onClick={handleClose}
                  className="codepen-button w-full"
                >
                  <span className="px-6 py-3.5 text-xs font-mono tracking-widest flex items-center justify-center gap-2">
                    EXPLORE THE SITE
                    {/* @ts-expect-error */}
                    <iconify-icon icon="solar:arrow-right-linear" className="w-4 h-4" />
                  </span>
                </button>
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ─── Animation Keyframes ─── */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>
    </>
  )
}
