'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Blog posts data
const blogPosts = {
  'how-creative-agencies-shape-the-future': {
    title: 'How Modern Flight Training Shapes the Future of Aviation',
    category: 'AVIATION',
    date: 'March 15, 2024',
    readTime: '5 min read',
    author: 'Captain James Wilson',
    content: `
      <p class="text-xl text-slate-600 font-light leading-relaxed mb-8">
        The aviation industry is evolving faster than ever before. From 
        advanced glass cockpits to AI-powered training systems, the way 
        we train pilots has been transformed.
      </p>
      
      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        The Evolution of Flight Training
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Gone are the days when flight training relied solely on basic 
        instruments and paper charts. Today's pilots train on G1000 
        avionics suites, full-motion simulators, and advanced training 
        software that replicates real-world scenarios with stunning accuracy.
      </p>
      
      <div class="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-3">
          Key Takeaways
        </h3>
        <ul class="space-y-2 text-slate-600">
          <li>• Modern flight training incorporates advanced technology</li>
          <li>• Structured programs lead to faster career progression</li>
          <li>• Airline partnerships create clear career pathways</li>
        </ul>
      </div>
      
      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        The Future of Aviation Careers
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        As airlines face a growing demand for qualified pilots, the 
        importance of high-quality flight training has never been greater. 
        Schools like Coast Flight Training are leading the way with 
        comprehensive programs that take students from zero experience 
        to airline-ready.
      </p>
    `
  },
  'the-real-roi-of-smart-design': {
    title: 'The Real ROI of Professional Flight Training',
    category: 'CAREER',
    date: 'March 10, 2024',
    readTime: '4 min read',
    author: 'Captain James Wilson',
    content: `
      <p class="text-xl text-slate-600 font-light leading-relaxed mb-8">
        Is flight school worth the investment? Let's break down the numbers, 
        career opportunities, and long-term earning potential for professional pilots.
      </p>
      
      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Understanding the Investment
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Professional flight training is a significant investment in your future. 
        With structured programs ranging from private pilot to airline transport 
        pilot certification, students can expect to invest between $70,000 to 
        $100,000 for complete career-ready training.
      </p>
      
      <div class="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-3">
          Career Earnings Potential
        </h3>
        <ul class="space-y-2 text-slate-600">
          <li>• First Officer: $90,000 - $150,000+</li>
          <li>• Captain: $200,000 - $400,000+</li>
          <li>• Major Airline Career Earnings: $5-8 million+</li>
        </ul>
      </div>
    `
  },
  'how-purpose-driven-creativity-builds-brand-power': {
    title: 'How Purpose-Driven Training Builds Better Pilots',
    category: 'TECHNOLOGY',
    date: 'March 5, 2024',
    readTime: '6 min read',
    author: 'Captain James Wilson',
    content: `
      <p class="text-xl text-slate-600 font-light leading-relaxed mb-8">
        Beyond stick and rudder skills: How modern flight training develops 
        decision-making, leadership, and professional excellence.
      </p>
      
      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Beyond Technical Skills
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        While mastering aircraft control is essential, today's flight training 
        programs focus heavily on developing critical thinking, risk management, 
        and leadership skills that separate good pilots from great ones.
      </p>
    `
  }
};

export default function BlogPost() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug as keyof typeof blogPosts];

  if (!post) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-slate-900 mb-4">Post Not Found</h1>
          <Link href="/#blog" className="text-[#E8573A] hover:underline">Return to Blog</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-[clamp(1.5rem,5vw,5rem)] bg-gradient-to-b from-[#AEC7E4] via-[#C0D6EC] to-white">
        <div className="max-w-[90rem] mx-auto">
          <Link href="/#blog" className="inline-flex items-center gap-2 text-sm font-mono text-slate-600 hover:text-[#E8573A] mb-8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            BACK TO BLOG
          </Link>
          
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#E8573A] rounded-full animate-pulse" />
              <span className="font-mono text-xs font-light text-slate-900 uppercase tracking-widest">{post.category}</span>
            </div>
            
            <h1 className="font-display font-normal text-4xl md:text-6xl lg:text-7xl tracking-tighter text-slate-900 mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-slate-500 font-mono text-sm mb-8">
              <span>{post.date}</span>
              <span>•</span>
              <span>By {post.author}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-[clamp(1.5rem,5vw,5rem)]">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Author Bio */}
          <div className="border-t border-slate-200 mt-12 pt-8 flex items-center gap-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E8573A]/20 to-[#E8573A]/5 rounded-full overflow-hidden">
              <img src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/2dbcdf02-39a2-4c13-95f7-3118cc995fa0_320w.webp" alt="Author" className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="font-display text-slate-900 mb-1">{post.author}</h4>
              <p className="text-sm text-slate-500">ATP • CFI • CFII • MEI with over 15,000 flight hours</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}