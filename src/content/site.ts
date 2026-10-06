export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  durationMinutes: number;
  priceINR: number; // In Rupees (e.g. 1500)
  priceDisplay: string; // e.g. "₹TODO_PRICE" or "₹1,500"
  targetAudience: string[];
  benefits: string[];
  format: string; // "1-on-1 Online Video Call (Google Meet)"
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Booking & Payments" | "Privacy & Tech";
}

export interface CounsellorProfile {
  name: string;
  title: string;
  credentials: string[];
  bio: string;
  approach: string;
  experienceYears: string;
  languages: string[];
  photoUrl: string;
  location: string;
  teleManasNumber: string;
  kiranNumber: string;
  emergencyNotice: string;
}

export const SITE_CONTENT = {
  name: "MPower Counselling",
  tagline: "A Safe, Grounded Space for Healing and Personal Growth",
  counsellor: {
    name: "Counsellor Name [TODO_BIO]",
    title: "Licensed Clinical Psychologist & Counsellor [TODO_CREDENTIALS]",
    credentials: [
      "M.A. / M.Sc. in Clinical Psychology [TODO_CREDENTIALS]",
      "RCI Registered (Licence No: TODO_CREDENTIALS)",
      "Certified Cognitive Behavioural Therapist (CBT) [TODO_CREDENTIALS]",
    ],
    bio: "Welcome. I provide compassionate, evidence-based psychological counselling tailored to your unique journey. Whether you are navigating anxiety, relationship challenges, burnout, or life transitions, our sessions offer a confidential, non-judgmental space to help you develop clarity and resilience. [TODO_BIO]",
    approach: "Integrative, trauma-informed therapy combining Cognitive Behavioural Therapy (CBT), Mindfulness-Based Interventions, and Humanistic approaches.",
    experienceYears: "8+ Years [TODO_BIO]",
    languages: ["English", "Hindi"],
    photoUrl: "/images/counsellor-placeholder.jpg", // TODO_PHOTO
    location: "Online Video Consultations across India (IST)",
    teleManasNumber: "14416",
    kiranNumber: "1800-599-0019",
    emergencyNotice: "If you are in immediate distress or experiencing thoughts of self-harm, please reach out directly to the Tele-MANAS national helpline at 14416 (toll-free, 24/7) or the KIRAN helpline at 1800-599-0019. This platform is not intended for active psychiatric emergencies.",
  } as CounsellorProfile,

  contact: {
    email: "contact@mpowercounselling.in",
    phone: "+91 98765 43210 [TODO_CONTACT]",
    workingHours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
    address: "Online Practice (Registered in India)",
  },

  services: [
    {
      id: "individual-therapy",
      slug: "individual-therapy",
      title: "Individual Therapy",
      shortDescription: "Personalized 1-on-1 sessions focused on anxiety, stress, depression, self-esteem, and personal growth.",
      fullDescription: "Individual counselling provides a dedicated, empathetic space to explore thoughts, emotions, and life challenges. We work together using evidence-backed methodologies such as CBT and mindfulness to understand root causes, build adaptive coping strategies, and foster lasting emotional well-being.",
      durationMinutes: 50,
      priceINR: 1500, // TODO_PRICE: set your actual session rate
      priceDisplay: "₹1,500", // TODO_PRICE
      targetAudience: [
        "Adults experiencing anxiety, panic, or persistent worry",
        "Individuals navigating low mood, mild-to-moderate depression, or grief",
        "Professionals feeling burnt out, overwhelmed, or stuck in transitions",
        "Anyone seeking self-discovery and stronger emotional boundaries",
      ],
      benefits: [
        "Confidential and empathetic 1-on-1 support",
        "Practical tools and coping mechanisms for daily stressors",
        "Personalized treatment roadmap tailored to your specific goals",
        "Encrypted, secure video calls with Google Meet integration",
      ],
      format: "1-on-1 Online Video Call (Google Meet)",
    },
    {
      id: "anxiety-stress-management",
      slug: "anxiety-stress-management",
      title: "Anxiety & Stress Management",
      shortDescription: "Targeted support to overcome chronic anxiety, panic attacks, social stress, and burnout.",
      fullDescription: "Chronic stress and anxiety can affect your sleep, relationships, and focus. This specialized program equips you with grounding techniques, somatic regulation exercises, and cognitive restructuring to calm an overactive nervous system and regain control.",
      durationMinutes: 50,
      priceINR: 1500, // TODO_PRICE
      priceDisplay: "₹1,500", // TODO_PRICE
      targetAudience: [
        "Individuals dealing with generalized anxiety or panic triggers",
        "Professionals and students under high performance pressure",
        "Those experiencing somatic stress symptoms like tension and insomnia",
      ],
      benefits: [
        "Learn somatic breathwork and physiological grounding tools",
        "Identify and disarm automatic negative thought loops",
        "Build a personalized stress-reduction protocol",
      ],
      format: "1-on-1 Online Video Call (Google Meet)",
    },
    {
      id: "relationship-counselling",
      slug: "relationship-counselling",
      title: "Relationship & Communication Therapy",
      shortDescription: "Navigate interpersonal conflicts, attachment patterns, communication breakdowns, and family dynamics.",
      fullDescription: "Healthy relationships require healthy communication and clear boundaries. We explore relational dynamics, unresolved attachment wounds, and constructive conflict resolution so you can cultivate deeper, more fulfilling connections.",
      durationMinutes: 60,
      priceINR: 2000, // TODO_PRICE
      priceDisplay: "₹2,000", // TODO_PRICE
      targetAudience: [
        "Individuals navigating relationship conflicts or breakups",
        "Couples seeking to enhance communication and emotional intimacy",
        "People struggling with family boundaries and interpersonal dynamics",
      ],
      benefits: [
        "Understand attachment styles and relational triggers",
        "Master non-violent communication techniques",
        "Establish healthy emotional boundaries with loved ones",
      ],
      format: "1-on-1 or Couple Online Video Call (Google Meet)",
    },
    {
      id: "career-burnout",
      slug: "career-burnout",
      title: "Career Burnout & Life Transitions",
      shortDescription: "Structured guidance to navigate workplace fatigue, career shifts, imposter syndrome, and academic stress.",
      fullDescription: "Modern work environments can lead to profound emotional exhaustion. This track is designed for students, founders, and professionals facing burnout, career cross-roads, or imposter syndrome, helping you restore balance and meaningful direction.",
      durationMinutes: 50,
      priceINR: 1500, // TODO_PRICE
      priceDisplay: "₹1,500", // TODO_PRICE
      targetAudience: [
        "Working professionals experiencing chronic exhaustion and lack of motivation",
        "Individuals undergoing major career shifts or relocations",
        "Students feeling overwhelmed by academic and competitive pressures",
      ],
      benefits: [
        "Diagnose sources of workplace depletion and boundary erosion",
        "Formulate sustainable work-life rhythms and recovery habits",
        "Overcome imposter feelings with evidence-grounded self-compassion",
      ],
      format: "1-on-1 Online Video Call (Google Meet)",
    },
  ] as ServiceItem[],

  faqs: [
    {
      question: "How do online therapy sessions work?",
      answer: "Sessions take place via secure Google Meet video calls. Once your booking is confirmed, you will immediately receive a calendar invitation and email with your private session link.",
      category: "General",
    },
    {
      question: "Is online therapy as effective as in-person therapy?",
      answer: "Research consistently demonstrates that online video therapy is just as effective as in-person therapy for anxiety, depression, stress management, and personal development, with the added benefit of privacy and zero commute.",
      category: "General",
    },
    {
      question: "How do I book and pay for a session?",
      answer: "Select your desired service, pick an available slot in Indian Standard Time (IST), complete a brief intake form, and pay securely via Razorpay (UPI, Credit/Debit Cards, Net Banking). Your slot is temporarily locked for 10 minutes while you complete checkout.",
      category: "Booking & Payments",
    },
    {
      question: "What is the cancellation and rescheduling policy?",
      answer: "You can reschedule or cancel your session up to 24 hours prior to the scheduled time directly from your Client Dashboard. Cancellations made at least 24 hours in advance are eligible for a full refund or session credit.",
      category: "Booking & Payments",
    },
    {
      question: "Are my sessions and intake information confidential?",
      answer: "Yes, confidentiality is strictly maintained under Indian ethical guidelines and the Digital Personal Data Protection (DPDP) Act. Your session notes and intake information are strictly protected and never shared.",
      category: "Privacy & Tech",
    },
    {
      question: "What should I do if I am in a crisis?",
      answer: "If you are in acute crisis, experiencing self-harm urges, or having psychiatric emergencies, please immediately dial Tele-MANAS at 14416 (24/7 toll-free) or visit the nearest emergency room. Our scheduled online sessions are not equipped for active emergencies.",
      category: "General",
    },
  ] as FAQItem[],

  // NOTE: Real client reviews will be filled in when provided. Placeholders adhere to ethical guidelines.
  testimonials: [
    {
      id: "t1",
      quote: "The structured CBT exercises and non-judgmental guidance helped me understand my panic triggers and regain confidence at work. [TODO_TESTIMONIAL]",
      clientInitials: "A. K. [TODO_CLIENT]",
      service: "Anxiety & Stress Management",
      city: "Bengaluru [TODO_CITY]",
    },
    {
      id: "t2",
      quote: "Having a calm, dedicated space every week gave me the perspective I needed to navigate my career transition without spiraling into burnout. [TODO_TESTIMONIAL]",
      clientInitials: "R. M. [TODO_CLIENT]",
      service: "Career Burnout & Transitions",
      city: "Mumbai [TODO_CITY]",
    },
    {
      id: "t3",
      quote: "Learning non-defensive communication transformed how I interact with my partner and family. Truly grateful for the thoughtful sessions. [TODO_TESTIMONIAL]",
      clientInitials: "S. D. [TODO_CLIENT]",
      service: "Relationship Counselling",
      city: "Delhi NCR [TODO_CITY]",
    },
  ],

  blogPosts: [
    {
      slug: "understanding-anxiety-signals",
      title: "Understanding Your Body's Anxiety Signals: From Fight-or-Flight to Grounding",
      excerpt: "Anxiety is not just in your head—it is an intricate physiological response. Learn how to recognize early somatic warnings and reset your nervous system.",
      date: "2026-09-15",
      readTime: "5 min read",
      category: "Mental Wellness",
      content: `
Anxiety often manifests physically long before our conscious minds register worry. Recognizing somatic symptoms—such as rapid breathing, muscle tension, or stomach discomfort—is the first step toward self-regulation.

### The Autonomic Nervous System
When perceived stress arises, your sympathetic nervous system triggers the classic fight-or-flight response, releasing adrenaline and cortisol. In modern life, this response can be triggered by emails, deadlines, or interpersonal tension rather than physical danger.

### 3 Grounding Techniques to Try
1. **The Physiological Sigh:** Two quick inhales through the nose followed by a long, slow exhale through the mouth. Repeat 3 times to quickly slow heart rate.
2. **5-4-3-2-1 Sensory Reset:** Identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.
3. **Progressive Muscle Relaxation:** Systematically tense and release muscle groups from your toes to your forehead.

*Remember: While self-help techniques are empowering, working with a licensed counsellor helps uncover the underlying cognitive beliefs sustaining anxiety.*
      `,
    },
    {
      slug: "overcoming-workplace-burnout",
      title: "Overcoming Workplace Burnout: Practical Boundaries for High Performers",
      excerpt: "Burnout is not a personal failure; it is an occupational exhaustion syndrome. Here is how to rebuild energy and establish sustainable boundaries.",
      date: "2026-09-28",
      readTime: "6 min read",
      category: "Workplace Wellness",
      content: `
Workplace burnout is characterized by emotional exhaustion, cynicism, and a reduced sense of personal efficacy. In hyper-connected corporate environments, the boundary between rest and work often erodes unnoticed.

### Core Pillars of Burnout Recovery
- **Digital Boundaries:** Establish a strict offline curfew for work messaging apps.
- **Energy Auditing:** Categorize your daily tasks into 'energy-giving' and 'energy-depleting' to restructure your schedule.
- **Communicating Limits:** Practice polite, assertive communication when taking on additional project scope.

Seeking professional guidance early can prevent mild exhaustion from evolving into chronic clinical burnout.
      `,
    },
    {
      slug: "what-to-expect-first-therapy-session",
      title: "What to Expect in Your Very First Therapy Session",
      excerpt: "Feeling nervous before starting counselling is completely normal. Here is a transparent breakdown of what happens in an intake session.",
      date: "2026-10-02",
      readTime: "4 min read",
      category: "Therapy Guide",
      content: `
Taking the first step toward therapy can feel intimidating. Knowing what to expect demystifies the process and helps you feel at ease.

### 1. The Welcome & Confidentiality Review
Your therapist will review informed consent, privacy boundaries under the DPDP Act, and ethical guidelines. You will have full clarity on how your data is protected.

### 2. Exploring What Brings You to Therapy
You are invited to share whatever feels comfortable—current challenges, life transitions, emotional symptoms, or specific relationship dynamics. There is no 'right' way to tell your story.

### 3. Collaborative Goal Setting
Together, you and your counsellor will identify what meaningful progress looks like for you, agreeing on a realistic cadence and evidence-based therapeutic approach.
      `,
    },
  ],
};
