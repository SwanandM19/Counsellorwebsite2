'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

// Blog posts data
const blogPosts = {
  'how-creative-agencies-shape-the-future': {
    title: 'Understanding Anxiety: What Your Body Is Trying to Tell You',
    category: 'ANXIETY',
    date: 'March 15, 2024',
    readTime: '5 min read',
    author: 'Dr. Sarah Mitchell',
    heroImage: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p class="text-xl text-slate-600 font-light leading-relaxed mb-8">
        Anxiety is more than just worry or stress. It is your nervous system communicating 
        with you — and once you understand what it is saying, you can start working with 
        it rather than against it. Here is what your body is really trying to tell you.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        What Is Anxiety, Really?
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Anxiety is a natural human response to perceived threat. When your brain detects 
        danger — real or imagined — it triggers a cascade of physical and psychological 
        responses designed to keep you safe. Your heart rate increases, your muscles 
        tighten, your breath quickens. This is the famous "fight-or-flight" response, 
        and it evolved to protect us.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        The problem arises when this alarm system becomes oversensitive — firing repeatedly 
        in situations that aren't actually dangerous, like a work meeting, a social gathering, 
        or even lying in bed at night. Over time, this constant state of high alert becomes 
        exhausting, and starts to interfere with everyday life.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Recognising the Signs
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Anxiety can show up differently in different people. Some experience it primarily 
        in their body — tight chest, nausea, racing heart, shallow breathing, or headaches. 
        Others notice it more in their thoughts — constant worry, catastrophising, difficulty 
        concentrating, or a persistent sense that something bad is about to happen.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        Many people are surprised to learn that irritability, fatigue, and sleep difficulties 
        are also common symptoms of anxiety. If you often feel "on edge" without knowing why, 
        or if you avoid situations that make you uncomfortable, anxiety may well be playing a role.
      </p>

      <div class="bg-[#FFF5F3] border border-[#E8573A]/20 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-4">
          Common Signs of Anxiety
        </h3>
        <ul class="space-y-3 text-slate-600">
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Persistent worry or sense of dread that is difficult to control</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Physical symptoms: racing heart, tightness in the chest, nausea</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Avoidance of people, places or situations that trigger discomfort</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Difficulty sleeping, concentrating, or relaxing</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Irritability, restlessness, or feeling on edge without a clear reason</span></li>
        </ul>
      </div>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Understanding Your Triggers
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        One of the most powerful things you can do is begin to understand what triggers 
        your anxiety. Triggers are the situations, thoughts, or sensations that set off 
        your anxiety response. They might be obvious — a job interview, a difficult 
        conversation — or they may be subtle patterns you haven't yet noticed.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        Keeping a simple journal can be a surprisingly effective first step. Note what 
        you were doing, thinking, and feeling when your anxiety spiked. Over time, 
        patterns begin to emerge, and awareness itself starts to reduce anxiety's power.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        What You Can Do Right Now
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        While counselling provides the most sustained relief, there are evidence-based 
        techniques you can begin using today. Slow, diaphragmatic breathing directly 
        activates your parasympathetic nervous system — the "rest and digest" response 
        that counteracts anxiety. Try inhaling for four counts, holding for four, and 
        exhaling for six.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        Grounding techniques — like the 5-4-3-2-1 method (noticing five things you 
        can see, four you can touch, three you can hear, two you can smell, and one 
        you can taste) — can interrupt the anxiety spiral and bring you back into 
        the present moment.
      </p>

      <div class="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-3">
          Key Takeaways
        </h3>
        <ul class="space-y-3 text-slate-600">
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Anxiety is a natural alarm system — not a flaw or weakness</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Identifying your triggers is the first step toward managing anxiety</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Breathing and grounding techniques offer immediate relief</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Therapy — particularly CBT — is highly effective for long-term change</span></li>
        </ul>
      </div>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        When to Seek Support
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        If anxiety is interfering with your work, relationships, or enjoyment of life, 
        it is a sign that professional support could make a real difference. Cognitive 
        Behavioural Therapy (CBT) is one of the most well-researched treatments for 
        anxiety, helping you identify and challenge the thought patterns that keep 
        anxiety alive.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        You do not have to manage this alone. Reaching out to a counsellor is not a 
        sign of weakness — it is one of the most courageous and self-aware things 
        you can do.
      </p>
    `
  },
  'the-real-roi-of-smart-design': {
    title: 'Why Couples Counselling Works — Even When It Feels Too Late',
    category: 'RELATIONSHIPS',
    date: 'March 10, 2024',
    readTime: '4 min read',
    author: 'Dr. Sarah Mitchell',
    heroImage: 'https://images.unsplash.com/photo-1516401266446-6432a8a07d41?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p class="text-xl text-slate-600 font-light leading-relaxed mb-8">
        Many couples wait until they are at breaking point before seeking help. 
        But here is the truth: whether you are navigating a recent crisis or years 
        of disconnection, couples counselling can create meaningful, lasting change — 
        and it is rarely too late to begin.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Why Couples Wait So Long
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Research suggests that couples wait an average of six years after problems 
        begin before seeking therapy. Six years. In that time, negative patterns 
        become deeply entrenched, resentments build, and both partners can begin 
        to feel hopeless about the future of the relationship.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        The reasons for waiting are understandable: stigma, fear of what might be 
        uncovered, hope that things will improve on their own, or simply not knowing 
        where to turn. But the longer these patterns continue unchallenged, the harder 
        they become to shift without support.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        What Couples Counselling Actually Involves
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Contrary to what many people imagine, couples counselling is not about 
        sitting in a room while a therapist decides who is right and who is wrong. 
        A skilled couples counsellor creates a safe, neutral space where both 
        partners feel genuinely heard — often for the first time in a long while.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        Sessions focus on understanding the patterns and cycles that have developed 
        between you, improving communication, rebuilding emotional safety, and 
        identifying what each partner truly needs. The goal is not to assign blame 
        but to help both of you understand each other more deeply.
      </p>

      <div class="bg-[#FFF5F3] border border-[#E8573A]/20 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-4">
          What Couples Counselling Can Help With
        </h3>
        <ul class="space-y-3 text-slate-600">
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Communication breakdown and feeling unheard or dismissed</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Recovering from infidelity or a breach of trust</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Navigating major life transitions — parenthood, relocation, loss</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Recurring arguments that never seem to be resolved</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Emotional distance, loss of intimacy, or feeling like strangers</span></li>
        </ul>
      </div>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        The Research Is Clear
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Emotionally Focused Therapy (EFT), one of the most widely used approaches 
        in couples work, has a success rate of around 70–75% in moving couples 
        from distress to recovery. Gottman Method couples therapy, developed from 
        decades of research, has similarly strong outcomes.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        Even in cases where both partners decide that separation is the right path, 
        counselling can make that process more compassionate, particularly where 
        children are involved.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Starting the Conversation
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        One of the hardest parts is often just agreeing to come. If your partner is 
        reluctant, it can help to frame therapy not as a sign that the relationship 
        has failed, but as an investment in something you both value. You would see 
        a doctor for a physical injury — your relationship deserves the same care.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        If you are unsure whether couples counselling is right for you, a free 
        initial consultation can help you decide without any pressure or obligation.
      </p>

      <div class="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-3">
          Key Takeaways
        </h3>
        <ul class="space-y-3 text-slate-600">
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>It is almost never truly "too late" — patterns can always be changed</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Couples counselling is a collaborative process, not a blame exercise</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Evidence-based methods like EFT have strong, proven outcomes</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Starting sooner leads to faster, more lasting improvement</span></li>
        </ul>
      </div>
    `
  },
  'how-purpose-driven-creativity-builds-brand-power': {
    title: '5 Mindfulness Practices That Support Your Mental Health Daily',
    category: 'MINDFULNESS',
    date: 'March 5, 2024',
    readTime: '6 min read',
    author: 'Dr. Sarah Mitchell',
    heroImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1600&auto=format&fit=crop',
    content: `
      <p class="text-xl text-slate-600 font-light leading-relaxed mb-8">
        You do not need to meditate for an hour a day to benefit from mindfulness. 
        Small, consistent practices woven into your daily routine can meaningfully 
        reduce stress, improve emotional regulation, and strengthen your overall 
        mental health — starting today.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        What Is Mindfulness — and Does It Actually Work?
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Mindfulness is the practice of paying deliberate, non-judgmental attention 
        to the present moment. Rather than replaying the past or worrying about the 
        future, you simply notice what is happening right now — in your body, your 
        thoughts, and your surroundings — without trying to change or fix it.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        The evidence base for mindfulness is now substantial. Studies consistently 
        show it reduces symptoms of anxiety, depression, and stress, improves sleep 
        quality, and even changes the structure of the brain in regions associated 
        with emotional regulation and self-awareness.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Practice 1: The Morning Pause
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Before reaching for your phone, take two minutes to simply notice how you 
        feel. Scan your body from head to toe. Are there areas of tension? What is 
        your mood before the day has had a chance to shape it? This brief check-in 
        builds self-awareness and sets an intentional tone for the day ahead.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Practice 2: Mindful Breathing (Box Breathing)
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        This technique is used by therapists, athletes, and even the military to 
        regulate the nervous system quickly. Inhale for four counts, hold for four, 
        exhale for four, hold for four. Repeat four times. It takes less than two 
        minutes and can shift you out of an anxious state almost immediately by 
        activating the parasympathetic nervous system.
      </p>

      <div class="bg-[#FFF5F3] border border-[#E8573A]/20 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-4">
          Five Daily Mindfulness Practices
        </h3>
        <ul class="space-y-3 text-slate-600">
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span><strong>The Morning Pause</strong> — 2 minutes of body-scanning before checking your phone</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span><strong>Box Breathing</strong> — 4-4-4-4 breathing to reset your nervous system</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span><strong>Mindful Eating</strong> — One meal a day eaten without screens or distraction</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span><strong>The 5-4-3-2-1 Grounding Technique</strong> — Anchor yourself to the present moment</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span><strong>Evening Reflection</strong> — Three things you noticed or appreciated today</span></li>
        </ul>
      </div>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Practice 3: Mindful Eating
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Choose one meal a day — even just a snack — to eat without your phone, 
        television, or any other screen. Notice the colour, texture, and smell of 
        your food before you eat it. Chew slowly. This practice builds present-moment 
        awareness and has the added benefit of improving digestion and reducing 
        unconscious overeating.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Practice 4: The 5-4-3-2-1 Grounding Technique
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        When anxiety spikes or your mind starts to spiral, this technique anchors 
        you in the present by engaging your senses. Notice five things you can see, 
        four you can physically touch, three you can hear, two you can smell, and 
        one you can taste. It interrupts the anxious thought loop and returns you 
        to the here and now.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Practice 5: Evening Reflection
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        Before bed, take three minutes to write down — or simply think about — 
        three things you noticed or appreciated during the day. They do not need 
        to be significant. A good cup of tea. A moment of sunshine. A kind exchange 
        with a colleague. This practice gradually trains the brain to notice the 
        positive, countering the negativity bias that anxiety feeds on.
      </p>

      <h2 class="text-2xl md:text-3xl font-display text-slate-900 mt-12 mb-4">
        Building the Habit
      </h2>
      <p class="text-slate-600 leading-relaxed mb-6">
        The key to any mindfulness practice is consistency over intensity. Five 
        minutes every day will produce far greater results than an hour once a week. 
        Start with one practice from this list — whichever resonates most — and 
        build from there. Within a few weeks, many people notice a genuine shift 
        in how they relate to stress and difficult emotions.
      </p>
      <p class="text-slate-600 leading-relaxed mb-6">
        If you find it difficult to maintain these practices alone, therapy can 
        provide the structure, accountability, and deeper exploration that helps 
        them really take root. Mindfulness-based approaches are a central part of 
        how we work with clients at Serenity Counselling.
      </p>

      <div class="bg-white/50 backdrop-blur-sm border border-slate-200 rounded-2xl p-8 my-12">
        <h3 class="text-xl font-display text-slate-900 mb-3">
          Key Takeaways
        </h3>
        <ul class="space-y-3 text-slate-600">
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Mindfulness does not require long sessions — small daily habits are enough</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Box breathing and grounding techniques work quickly in moments of anxiety</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Consistency matters more than duration — five minutes daily beats an hour weekly</span></li>
          <li class="flex items-start gap-3"><span class="w-2 h-2 bg-[#E8573A] rounded-full mt-2 flex-shrink-0"></span><span>Therapy can deepen and sustain a mindfulness practice significantly</span></li>
        </ul>
      </div>
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