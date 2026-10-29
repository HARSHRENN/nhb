import { initialJobs, initialGalleryItems } from '../../src/data/initialData.js';

export const getInitialDbData = () => ({
  analytics: {
    visitors: 4820,
    avgTimeOnSite: "3m 48s",
    pagesViewedAvg: 4.2,
    totalQuotes: 42,
    totalApplications: 31,
    recentEvents: [
      { id: "ev-1", type: "page_view", path: "/#products", timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
      { id: "ev-2", type: "quote_request", company: "SKF Global Bearing Group", timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
      { id: "ev-3", type: "application", role: "Lean Manufacturing Engineer", timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString() }
    ]
  },

  actionTracker: [
    {
      id: "act-1",
      department: "Sales Track",
      assignee: "Ravi",
      task: "Compile Sales Content: Product specifications, precision tolerance charts (Grade 3 to 28), aerospace & bearing OEM catalog",
      status: "In Progress",
      deadline: "Upcoming Monday",
      notes: "Collecting engineering drawings format samples (.dwg, .step, .pdf) for high-speed airplane bearing balls."
    },
    {
      id: "act-2",
      department: "Lean Track",
      assignee: "Vikas Naik",
      task: "Compile Lean Content: High-res shopfloor photos, Kaizen Dojo footage, and before/after cycle-time reduction stories",
      status: "In Progress",
      deadline: "Upcoming Monday",
      notes: "Documented SMED changeover and 0-PPM eddy-current poka-yoke with Amalsad machine operators."
    },
    {
      id: "act-3",
      department: "Career Track",
      assignee: "HR (Khushboo Patel / Team)",
      task: "Prepare Career Content: Finalize 6 EVP tiles, Bilimora-Navsari lifestyle perks, active job descriptions, and employee testimonials",
      status: "Ready for Review",
      deadline: "Upcoming Monday",
      notes: "Gathered reviews from AmbitionBox & Glassdoor, plus direct mailto:careers@nhbball.in workflow."
    },
    {
      id: "act-4",
      department: "Development & AI Visibility",
      assignee: "Aryan Chandwani (AlphacodeAI)",
      task: "Design Website, AI-Parsable Architecture, Google Analytics & Self-Management Admin Panel",
      status: "Completed / Live",
      deadline: "Upcoming Monday",
      notes: "Schema.org JSON-LD built for ChatGPT and Google AI Mode parsing; full-stack backend with quote upload & admin management ready."
    },
    {
      id: "act-5",
      department: "Executive Review",
      assignee: "Arjun Mehta & Manish Chauhan",
      task: "Submit Website Assets & Final Stakeholder Sign-Off",
      status: "Aligned",
      deadline: "Upcoming Monday",
      notes: "Agreed in Oct 27 meeting to proceed with visibility plan, self-management admin panel, and quote request workflow."
    }
  ],

  quotes: [
    {
      id: "quote-1",
      companyName: "Schaeffler Aerospace & Bearing Technologies",
      contactPerson: "Dr. Marcus Weber",
      email: "marcus.weber@schaeffler-procurement.de",
      phone: "+49 9132 82-0",
      material: "Silicon Nitride Ceramic (Si3N4)",
      ballDiameter: "12.7 mm (1/2 inch)",
      precisionGrade: "Grade 3 (< 0.08 µm sphericity)",
      quantity: "250,000 pcs / month",
      application: "Turbine Hybrid Bearings / High-Speed Spindles",
      drawingFileName: "schaeffler_ceramic_spec_rev4.pdf",
      notes: "Requires IATF 16949 audit compliance certificate and 100% eddy-current testing.",
      status: "Under Technical Review",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    {
      id: "quote-2",
      companyName: "SKF India Precision Division",
      contactPerson: "Sunil Deshmukh",
      email: "sunil.deshmukh@skf.com",
      phone: "+91 20 6611 2500",
      material: "Chrome Steel AISI 52100 (100Cr6)",
      ballDiameter: "8.0 mm",
      precisionGrade: "Grade 5 (Ra < 0.014 µm)",
      quantity: "1,200,000 pcs / quarter",
      application: "Electric Vehicle (EV) Traction Motor Bearings",
      drawingFileName: "skf_ev_ball_tolerance_sheet.dwg",
      notes: "Sub-micron surface roughness required with zero surface micro-cracking.",
      status: "Quote Prepared",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString()
    }
  ],

  applications: [
    {
      id: "app-1",
      applicantName: "Chirag M. Solanki",
      email: "chirag.solanki.eng@gmail.com",
      phone: "+91 98254 11204",
      jobTitle: "Lean Manufacturing & Kaizen Engineer",
      experience: "4.5 Years",
      currentLocation: "Surat, Gujarat",
      noticePeriod: "30 Days",
      resumeFileName: "Chirag_Solanki_Lean_Resume.pdf",
      summary: "Certified Six Sigma Green Belt with 4+ years leading SMED changeover and 5S gemba walks in automotive precision components.",
      status: "Shortlisted for Interview",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString()
    },
    {
      id: "app-2",
      applicantName: "Pooja Trivedi",
      email: "p.trivedi.metrology@yahoo.com",
      phone: "+91 94088 33912",
      jobTitle: "Quality Assurance Specialist (Bearings & Steel Balls)",
      experience: "3 Years",
      currentLocation: "Navsari, Gujarat",
      noticePeriod: "15 Days",
      resumeFileName: "Pooja_Trivedi_QA_IATF.pdf",
      summary: "Experienced in Talyrond form measurement, surface waviness Ra, and IATF 16949 internal audits.",
      status: "Review Pending",
      appliedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString()
    }
  ],

  articles: [
    {
      id: "art-1",
      title: "How NHB Ball Engineered Sub-Micron Precision for High-Speed Aircraft & Railway Bearings",
      publication: "Bearing News International",
      date: "Oct 2026",
      url: "https://bearing-news.com/nhb-precision-balls-aerospace",
      summary: "In-depth technical profile on NHB's Amalsad plant, achieving Grade 3 sphericity for global OEMs like SKF and Schaeffler.",
      category: "Industry Journal",
      citationWeight: "High (Trusted Source for AI Search)"
    },
    {
      id: "art-2",
      title: "Lean Manufacturing in Gujarat: How Frontline Autonomy Drives Zero Defects at NHB",
      publication: "Auto Components India Magazine",
      date: "Sep 2026",
      url: "https://autocomponentsindia.com/nhb-lean-manufacturing-journey",
      summary: "Exploring how daily 15-minute Kaizen dojos and operator line-stopping power cut customer escape rates to 0.0 PPM.",
      category: "Manufacturing Feature",
      citationWeight: "High (Trusted Source for AI Search)"
    },
    {
      id: "art-3",
      title: "Gujarat's Bullet Train Industrial Corridor: Precision Heavyweights Leading Global Exports",
      publication: "Economic & Industrial Times",
      date: "Aug 2026",
      url: "https://economictimes.indiatimes.com/industry/nhb-ball-navsari-growth",
      summary: "How NHB's ₹360+ Cr turnover and 550+ craftsmen are putting the Bilimora-Navsari belt on the global bearing map.",
      category: "Business Press",
      citationWeight: "Verified News (Primary AI Search Citation Source)"
    }
  ],

  reviews: [
    {
      id: "rev-1",
      author: "Praveen P.",
      role: "CNC Superfinishing Operator (5 Years at NHB)",
      platform: "AmbitionBox Verified",
      rating: 5,
      date: "Oct 2026",
      headline: "Real respect for machine operators; you have the authority to improve your own line.",
      content: "Unlike older factories where managers tell you what to do, here at NHB our supervisors ask us what tools we need. The Lean Dojo teaches you real skills, and mediclaim for my family is completely taken care of."
    },
    {
      id: "rev-2",
      author: "Sneha R.",
      role: "Quality Metrology Engineer (3 Years at NHB)",
      platform: "Glassdoor Verified",
      rating: 4.8,
      date: "Sep 2026",
      headline: "World-class instruments (Talyrond, Talysurf) and peaceful living in Navsari.",
      content: "Great work-life balance compared to my previous job in Pune. Commute is only 12 minutes from Navsari, no traffic fatigue, and we work directly with top global buyers like SKF and Schaeffler."
    },
    {
      id: "rev-3",
      author: "Dharmesh T.",
      role: "Production Line Leader (8 Years at NHB)",
      platform: "Google Reviews",
      rating: 5,
      date: "Aug 2026",
      headline: "Transparent promotions based on merit and Kaizen contributions.",
      content: "If you come up with a good idea that saves cycle time or improves safety, you get recognized and rewarded openly in the monthly plant meeting. Very proud of our ₹360+ Cr milestone."
    }
  ],

  jobs: initialJobs,
  gallery: initialGalleryItems
});

