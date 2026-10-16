import React, { useState, useMemo } from "react";
import {
  Home, User, Users, Briefcase, ShieldCheck, ShieldAlert, Mic, MapPin, IndianRupee, Star,
  Bell, FileText, AlertTriangle, CheckCircle2, Clock, Search, ChevronLeft, ChevronRight,
  LogOut, Award, Phone, BookOpen, BarChart3, PlusCircle, Building2, ClipboardList,
  Languages, Volume2, X, Upload, Calendar, Wallet, HeartHandshake, Scale, Fingerprint,
  Filter, ArrowRight, Check, XCircle, MessageSquare, Siren, GraduationCap, Truck, HardHat,
  Wrench, Hammer, PaintBucket, UtensilsCrossed, BedDouble, Menu, Sparkles, Eye, ThumbsUp,
  MapPinned, BadgeCheck, TrendingUp, Zap
} from "lucide-react";
import {
  ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";

/* ======================================================================
   THEME — WorkHub design tokens
   Ink Navy (trust/structure) + Safety Amber (hi-vis CTA) + status hues
   Display: Archivo · Body: IBM Plex Sans · Data: IBM Plex Mono
====================================================================== */
const THEME = {
  navy: "#0E2436",
  navyLight: "#16374F",
  navySoft: "#1F4A66",
  steel: "#1E5F8C",
  amber: "#F5A623",
  amberDark: "#C97C0E",
  amberSoft: "#FDECC8",
  green: "#238C57",
  greenSoft: "#E1F3E8",
  red: "#D14545",
  redSoft: "#FBE6E6",
  teal: "#0F7D8C",
  tealSoft: "#DFF2F3",
  bg: "#F1F4F7",
  card: "#FFFFFF",
  ink: "#101820",
  muted: "#5B6B7A",
  border: "#E1E7EC",
};

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@600;700;800;900&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
.ks-display { font-family: 'Archivo', sans-serif; }
.ks-body { font-family: 'IBM Plex Sans', sans-serif; }
.ks-mono { font-family: 'IBM Plex Mono', monospace; }
.ks-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
.ks-scroll::-webkit-scrollbar-thumb { background: #C7D1DA; border-radius: 999px; }
@keyframes ks-pulse-ring { 0% { box-shadow: 0 0 0 0 rgba(245,166,35,0.45); } 100% { box-shadow: 0 0 0 14px rgba(245,166,35,0); } }
.ks-pulse { animation: ks-pulse-ring 1.4s ease-out infinite; }
@keyframes ks-bar { 0%,100% { transform: scaleY(0.4); } 50% { transform: scaleY(1); } }
`;

/* ======================================================================
   LANGUAGE / TRANSLATIONS
====================================================================== */
const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "mr", label: "मराठी" },
  { code: "ta", label: "தமிழ்" },
  { code: "bn", label: "বাংলা" },
];

/* ---- Master translation dictionary. Every UI-chrome string used across
   the app is keyed here; t(lang)(key) looks it up with an English fallback. ---- */
const TRANSLATIONS = {
  en: {
    appName: "WorkHub", tagline: "Verified work. Fair wages. Hired today.",
    dashboard: "Dashboard", profile: "Profile", skills: "Skills", recommendations: "AI Job Matches", applications: "Applications", payments: "Payments", history: "Work History", ratings: "Ratings", emergency: "Emergency SOS", rights: "Know Your Rights", documents: "Documents", notifications: "Notifications",
    postJob: "Post a Job", aiMatches: "AI Worker Matches", hiring: "Hiring Pipeline", attendance: "Attendance", responsibilities: "Employer Duties",
    workers: "Workers", companies: "Companies", approvals: "Job Approvals", verification: "Verification Queue", complaints: "Complaints", fraud: "Fraud Detection", analytics: "Analytics", matching: "AI Matching", compliance: "Compliance",
    apply: "Apply Now", save: "Save", verified: "Verified", pending: "Pending", listening: "Listening…", selectLanguage: "Language", logout: "Log Out", switchRole: "Switch", sos: "SOS", myJobs: "My Jobs",
    edit: "Edit", cancel: "Cancel", saveChanges: "Save Changes", editProfile: "Edit Profile", close: "Close", add: "Add", search: "Search", filter: "Filter", next: "Next", prev: "Prev", all: "All",
    profileUpdated: "Profile updated successfully.", fillRequiredFields: "Please fill in all required fields correctly before saving.", requiredField: "This field is required.", invalidPhone: "Enter a valid phone number.", invalidWage: "Enter a valid wage amount greater than zero.", invalidEmail: "Enter a valid email address.", invalidGstin: "Enter a valid GSTIN.", invalidNumber: "Enter a valid number.",
    aiPoweredBadge: "AI-powered matching · voice-enabled · 5 languages", heroDesc: "India's labour marketplace connecting verified daily-wage & skilled workers with trusted employers — built around fair wages, safety, and a work history that follows you everywhere.",
    statVerifiedWorkers: "Verified Workers", statHiringCompanies: "Hiring Companies", statWagesPaid: "Wages Paid",
    continueAs: "Continue as", enterPanel: "Enter panel", signInAs: "Sign in —", otpDesc: "OTP-based phone login keeps registration simple for every literacy level.", passwordDesc: "Secure sign-in with employer / admin credentials.",
    mobileNumber: "Mobile Number", workEmail: "Work Email", otpLabel: "OTP", passwordLabel: "Password", continueAsUser: "Continue as", demoNote: "Demo build — no real credentials required. Data is illustrative.", back: "Back",
    roleWorkerTitle: "Worker", roleWorkerDesc: "Find verified daily-wage & skilled work near you, get paid on time, know your rights.",
    roleCompanyTitle: "Company / Hirer", roleCompanyDesc: "Post jobs, get AI-matched workers, manage attendance and payroll from one place.",
    roleAdminTitle: "Admin", roleAdminDesc: "Verify accounts, approve jobs, monitor fraud, and oversee platform compliance.",
    platformAdmin: "Platform Admin", trustSafetyTeam: "Trust & Safety Team", roleLabelWorker: "Worker", roleLabelCompany: "Company", roleLabelAdmin: "Admin", roleTagWorker: "WORKER PANEL", roleTagCompany: "HIRER PANEL", roleTagAdmin: "ADMIN PANEL",
    thisMonth: "This Month", vsLastMonth: "+11% vs last month", activeApplications: "Active Applications", totalLifetime: "total lifetime", jobsCompletedLabel: "jobs completed", bestAiMatch: "Best AI Match",
    earningsTrend: "Earnings Trend", last6Months: "Last 6 months, in ₹", applicationFunnel: "Application Funnel", whereThingsStand: "Where things stand", nearbyJobsNow: "Nearby Jobs Right Now", within12kmOf: "Within 12 km of",
    profileDetailsTitle: "Profile Details", fullName: "Full Name", primarySkill: "Primary Skill", experienceLabel: "Experience", yearsSuffix: "years", cityLabel: "City", phoneLabel: "Phone", languagesSpokenLabel: "Languages Spoken", expectedWageLabel: "Expected Wage", perDayLabel: "/ day", availabilityLabel: "Availability",
    skillsCertifications: "Skills & Certifications", addSkillPlaceholder: "Add a skill, e.g. Welding", primaryTag: "(Primary)",
    wageTransparency: "Wage Transparency", wageTransparencyDesc: "Median wage for", wageTransparencyDesc2: "in", wageTransparencyDesc3: "over the last 30 days, based on completed jobs on WorkHub.", yourRate: "Your rate", marketMedian: "Market median", top10pct: "Top 10%",
    voiceRegistrationTitle: "Voice Registration", voiceAssistantLabel: "Voice assistant", voiceRegistrationDesc: "New workers can register entirely by voice, in their own language — no typing needed.", speakToUpdateProfile: "Speak to Update Profile", stopListening: "Stop Listening", voiceAssistantAvailable: "Voice assistance is available in 5 regional languages for registration, job search, and support.",
    applyNowLabel: "Apply Now", alreadyApplied: "Already Applied", aiMatchScoreLabel: "AI Match Score",
    noApplicationsYet: "No applications yet — check AI Job Matches to get started.", appliedOnLabel: "Applied",
    totalReceived: "Total Received", processingLabel: "Processing", paymentProtection: "Payment Protection", paymentProtectionSub: "Escrow-backed disbursal", paymentHistory: "Payment History", colDate: "Date", colJob: "Job", colMethod: "Method", colAmount: "Amount", colStatus: "Status",
    jobsCompletedStat: "Jobs Completed", yearsActiveStat: "Years Active", avgRatingStat: "Avg. Rating", jobsCompletedOverTime: "Jobs Completed Over Time", monthlyCompletedEngagements: "Monthly completed engagements", timelineTitle: "Timeline", completedLabel: "Completed",
    reviewsCountLabel: "reviews",
    emergencySupportTitle: "Emergency Support", immediateDangerNote: "If you are in immediate danger, contact local emergency services first.", sendSosAlert: "Send SOS Alert",
    nationalEmergencyLabel: "National Emergency", labourHelplineLabel: "Labour Helpline", trustSafetyLabel: "WorkHub Trust & Safety",
    whatHappensSosTitle: "What happens when you send an SOS", sosStep1: "Your live location and current job site are shared with WorkHub's Trust & Safety team.", sosStep2: "An admin reviews the alert immediately and attempts to reach you by call.", sosStep3: "If unreachable, your listed emergency contact and local authorities are notified.",
    documentOf: "Document", documentOfSep: "of",
    docAadhaar: "Aadhaar Card", docSkillCert: "Skill Certificate — Electrician", docPoliceVerification: "Police Verification", docBankPassbook: "Bank Passbook", docProfilePhoto: "Profile Photo",
    docNoteGovId: "Government ID • uploaded 12 Jan 2026", docNoteIti: "ITI Pune • issued 2019", docNoteSubmitted: "Submitted 01 Aug 2026", docNoteBank: "For wage disbursal", docNotePhoto: "Passport-style photo",
    docGst: "GST Certificate", docPan: "Company PAN", docAddress: "Office Address Proof", docNoteGstSubmit: "Submitted 04 Aug 2026", docNotePanVerified: "Verified via NSDL", docNoteAwaiting: "Awaiting review",
    openJobsLabel: "Open Jobs", activeWorkersLabel: "Active Workers", onActiveEngagements: "on active engagements", payrollAug: "Payroll (Aug)", acrossAllSites: "Across all sites", employerRating: "Employer Rating", workerReviewsCount: "worker reviews",
    hiringTrendTitle: "Hiring Trend", postedLabel: "Posted", jobsPostedVsHired: "Jobs posted vs. workers hired", demandByCategory: "Demand by Category", platformWideLabel: "Platform-wide",
    verifiedBannerTitle: "Your company is Verified on WorkHub", gstinLabel: "GSTIN", memberSinceLabel: "Member since", trustScoreLabel: "Trust Score 92/100",
    jobDetailsTitle: "Job Details", jobTitleLabel: "Job Title", jobTitlePlaceholder: "e.g. Site Electrician Needed", skillRequiredLabel: "Skill Required", locationCityLabel: "Location (City)", wagePerDayLabel: "Wage (₹ / day)", workDurationLabel: "Work Duration", durationPlaceholder: "e.g. 30 days",
    foodProvidedLabel: "Food provided", accommodationProvidedLabel: "Accommodation provided", additionalReqLabel: "Additional Requirements", additionalReqPlaceholder: "Tools required, shift timing, safety gear provided, etc.",
    belowMinWageWarning: "This wage is below the state minimum wage guideline for", belowMinWageWarning2: "Job posts below minimum wage are auto-blocked.",
    postJobBtn: "Post Job — AI will start matching", jobPostedBtn: "Job Posted!", livePreviewTitle: "Live Preview", yourJobTitlePlaceholder: "Your job title", yourCompanyPlaceholder: "Your Company", cityPlaceholder: "City", durationFallback: "Duration",
    wageTransparencyCheckTitle: "Wage Transparency Check", wageTransparencyCheckDesc: "WorkHub benchmarks every posted wage against verified market data for the skill and city, so workers see a fair, transparent offer before applying.",
    matchesDescBanner: "Matches are ranked using skill fit, distance, wage alignment, experience, and stated availability — updated in real time as new workers register.", messageBtn: "Message", shortlistBtn: "Shortlist",
    stageApplied: "Applied", stageShortlisted: "Shortlisted", stageHired: "Hired", stageRejected: "Rejected", nothingHereLabel: "Nothing here", advanceBtn: "Advance", rejectBtn: "Reject",
    thisWeekAttendance: "This Week's Attendance", acrossAllActiveSites: "Across all active sites", todaysRosterTitle: "Today's Roster — Site Electrician Team", colWorker: "Worker", colCheckIn: "Check-in", colCheckOut: "Check-out", colStatus2: "Status",
    statusPresent: "Present", statusLate: "Late", statusAbsent: "Absent",
    paidThisMonth: "Paid This Month", pendingPayouts: "Pending Payouts", workersPaidLabel: "Workers Paid", recentPayouts: "Recent Payouts", contractSuffix: "contract", statusPaid: "Paid", statusPending2: "Pending",
    responsibilitiesBanner: "Employers on WorkHub agree to these responsibilities as part of every job posting. Non-compliance can lead to suspension.",
    companyProfileTitle: "Company Profile", companyDetailsTitle: "Company Details", companyNameLabel: "Company Name", industryLabel: "Industry", contactEmailLabel: "Contact Email", contactPhoneLabel: "Contact Phone", aboutCompanyLabel: "About the Company", aboutPlaceholder: "Tell workers about your company, culture, and site conditions.",
    jobReqDefaultsTitle: "Default Job Requirements", jobReqDefaultsDesc: "These defaults pre-fill new job posts so requirements stay consistent across your listings.", defaultWageRangeLabel: "Default Wage Range (₹ / day)", preferredSkillsLabel: "Preferred Skills", standardDurationLabel: "Standard Contract Duration", safetyRequirementsLabel: "Safety Requirements", safetyReqPlaceholder: "e.g. Helmet, harness, and steel-toe boots mandatory on site.",
    totalWorkersLabel: "Total Workers", thisMonthSuffix2: "this month", companiesLabel2: "Companies", openJobsLabel2: "Open Jobs", activeFraudFlagsLabel: "Active Fraud Flags",
    platformGrowthTitle: "Platform Growth", registeredWorkersVsCompanies: "Registered workers vs companies", verificationStatusTitle: "Verification Status", allAccountsLabel: "All accounts",
    jobsByCategoryTitle: "Jobs by Category", fraudFlagsRaisedTitle: "Fraud Flags Raised", weeklyLabel: "Weekly",
    searchWorkersPlaceholder: "Search workers by name or skill…", colSkill: "Skill", colCity: "City", colRating: "Rating", colStatus4: "Status",
    verifyBtn: "Verify", rejectBtn2: "Reject",
    noJobsWaiting: "No jobs waiting for approval right now.", approveBtn: "Approve", rejectNotifyBtn: "Reject & Notify",
    pendingReviewTitle: "Pending Review", approveNameBtn: "Approve", rejectBtn3: "Reject",
    vsLabel: "vs.",
    fraudBannerText: "WorkHub's AI screens every job post and profile for scam patterns — unrealistic wages, invalid GSTIN, duplicate documents, and off-platform payment requests.", suspendAccountBtn: "Suspend Account", investigateBtn: "Investigate", riskScoreLabel: "risk score",
    factorWeightsTitle: "AI Matching Algorithm — Factor Weights", howEngineScoresDesc: "How the recommendation engine scores a worker–job pair", recentMatchEventsTitle: "Recent Match Events", colWorker4: "Worker", colJob3: "Job", colMatchScore: "Match Score", colOutcome: "Outcome",
    statusActive: "Active", statusUnderReview: "Under Review",
    statusOpen: "Open", statusPendingApproval: "Pending Approval", statusClosed: "Closed", statusFlagged: "Flagged", urgentLabel: "Urgent", foodLabel: "Food", stayLabel: "Stay",
    notificationsTitle: "Notifications", weekAbbrev: "W", jobsAppliedSuffix: "applied", jobsSuffix: "jobs", platformDemoBuild: "WorkHub Platform · Demo Build",
    rightsTitle1: "Minimum Wage", rightsText1: "Every worker must be paid at least the state-notified minimum wage for their skill category — never less, regardless of verbal agreements.",
    rightsTitle2: "Timely Payment", rightsText2: "Wages must be paid on the agreed schedule. Delays beyond the agreed cycle can be reported directly from the Payments tab.",
    rightsTitle3: "Safe Working Conditions", rightsText3: "Employers must provide safety gear for hazardous work and a hazard-free site. You may refuse unsafe work without penalty.",
    rightsTitle4: "Written Job Terms", rightsText4: "You are entitled to clear terms — wage, duration, hours, food & stay — before you start, visible in every job post.",
    rightsTitle5: "Weekly Rest Day", rightsText5: "You are entitled to at least one paid or unpaid rest day per week, as applicable to your work category.",
    rightsTitle6: "Grievance Redressal", rightsText6: "Every complaint filed on WorkHub is tracked with a resolution timeline and escalated to the Admin team if unresolved.",
    respTitle1: "Pay Wages on Time", respText1: "Disburse agreed wages on the promised cycle through a verified, traceable payment method.",
    respTitle2: "Provide a Written Agreement", respText2: "State wage, duration, hours, and site conditions clearly in the job post before hiring.",
    respTitle3: "Ensure Site Safety", respText3: "Supply protective equipment for hazardous work and maintain a safe, hazard-free site.",
    respTitle4: "No Document Confiscation", respText4: "Never withhold a worker's original identity documents as a condition of employment.",
    respTitle5: "Non-Discrimination", respText5: "Hire and treat all workers fairly regardless of religion, caste, gender, or region.",
    respTitle6: "Respond to Grievances", respText6: "Acknowledge and resolve worker complaints raised through the platform within the SLA window.",
    compTitle1: "Minimum Wage Enforcement", compText1: "Job posts below the state minimum wage for a skill category are auto-blocked before publishing.",
    compTitle2: "Anti-Discrimination Policy", compText2: "Job posts and hiring decisions are screened for discriminatory language or criteria.",
    compTitle3: "Fraud Zero-Tolerance", compText3: "Companies with 2+ confirmed fraud reports are suspended pending investigation.",
    compTitle4: "Data Privacy", compText4: "Worker documents are visible only to verified employers with an active job offer.",
    compTitle5: "Grievance Redressal SLA", compText5: "All complaints must receive a first response within 48 hours.",
    compTitle6: "Worker Safety Standard", compText6: "Mandatory safety-gear checklist for construction-category job posts.",
    notifViewed: "Your application for 'Painters for Villa Project' was viewed by Skyline Constructions.", notifPaymentCredited: "Payment of ₹6,300 has been credited to your account.", notifNewMatch: "New job match found near Pune: Kitchen Cook, 90% match.", notifAadhaarApproved: "Your Aadhaar verification was approved.",
    timeAgo2h: "2h ago", timeAgo1d: "1d ago", timeAgo2d: "2d ago", timeAgo5d: "5d ago",
  },
  hi: {
    appName: "WorkHub", tagline: "सत्यापित काम। उचित मज़दूरी। आज ही नौकरी।",
    dashboard: "डैशबोर्ड", profile: "प्रोफ़ाइल", skills: "कौशल", recommendations: "एआई नौकरी सुझाव", applications: "आवेदन", payments: "भुगतान", history: "कार्य इतिहास", ratings: "रेटिंग", emergency: "आपातकालीन एसओएस", rights: "अपने अधिकार जानें", documents: "दस्तावेज़", notifications: "सूचनाएं",
    postJob: "नौकरी पोस्ट करें", aiMatches: "एआई श्रमिक सुझाव", hiring: "भर्ती प्रक्रिया", attendance: "उपस्थिति", responsibilities: "नियोक्ता उत्तरदायित्व",
    workers: "श्रमिक", companies: "कंपनियां", approvals: "नौकरी अनुमोदन", verification: "सत्यापन कतार", complaints: "शिकायतें", fraud: "धोखाधड़ी पहचान", analytics: "विश्लेषण", matching: "एआई मिलान", compliance: "अनुपालन",
    apply: "अभी आवेदन करें", save: "सहेजें", verified: "सत्यापित", pending: "लंबित", listening: "सुन रहा हूँ…", selectLanguage: "भाषा", logout: "लॉग आउट", switchRole: "बदलें", sos: "एसओएस", myJobs: "मेरी नौकरियां",
    edit: "संपादित करें", cancel: "रद्द करें", saveChanges: "बदलाव सहेजें", editProfile: "प्रोफ़ाइल संपादित करें", close: "बंद करें", add: "जोड़ें", search: "खोजें", filter: "फ़िल्टर", next: "अगला", prev: "पिछला", all: "सभी",
    profileUpdated: "प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई।", fillRequiredFields: "सहेजने से पहले कृपया सभी आवश्यक फ़ील्ड सही ढंग से भरें।", requiredField: "यह फ़ील्ड आवश्यक है।", invalidPhone: "एक वैध फ़ोन नंबर दर्ज करें।", invalidWage: "शून्य से अधिक एक वैध मज़दूरी राशि दर्ज करें।", invalidEmail: "एक वैध ईमेल पता दर्ज करें।", invalidGstin: "एक वैध जीएसटीआईएन दर्ज करें।", invalidNumber: "एक वैध संख्या दर्ज करें।",
    aiPoweredBadge: "एआई-संचालित मिलान · आवाज़-सक्षम · 5 भाषाएं", heroDesc: "भारत का श्रमिक बाज़ार जो सत्यापित दिहाड़ी और कुशल श्रमिकों को विश्वसनीय नियोक्ताओं से जोड़ता है — उचित मज़दूरी, सुरक्षा और हर जगह साथ चलने वाले कार्य इतिहास पर आधारित।",
    statVerifiedWorkers: "सत्यापित श्रमिक", statHiringCompanies: "भर्ती करने वाली कंपनियां", statWagesPaid: "भुगतान की गई मज़दूरी",
    continueAs: "इस रूप में जारी रखें", enterPanel: "पैनल में प्रवेश करें", signInAs: "साइन इन करें —", otpDesc: "ओटीपी-आधारित फ़ोन लॉगिन हर स्तर की साक्षरता के लिए पंजीकरण को सरल बनाता है।", passwordDesc: "नियोक्ता / एडमिन क्रेडेंशियल के साथ सुरक्षित साइन-इन।",
    mobileNumber: "मोबाइल नंबर", workEmail: "कार्य ईमेल", otpLabel: "ओटीपी", passwordLabel: "पासवर्ड", continueAsUser: "इस रूप में जारी रखें", demoNote: "डेमो बिल्ड — किसी वास्तविक क्रेडेंशियल की आवश्यकता नहीं है। डेटा उदाहरणात्मक है।", back: "वापस",
    roleWorkerTitle: "श्रमिक", roleWorkerDesc: "अपने पास सत्यापित दिहाड़ी व कुशल काम पाएं, समय पर भुगतान पाएं, अपने अधिकार जानें।",
    roleCompanyTitle: "कंपनी / नियोक्ता", roleCompanyDesc: "नौकरी पोस्ट करें, एआई-मिलान श्रमिक पाएं, उपस्थिति और पेरोल एक ही जगह से प्रबंधित करें।",
    roleAdminTitle: "एडमिन", roleAdminDesc: "खातों को सत्यापित करें, नौकरियों को स्वीकृत करें, धोखाधड़ी की निगरानी करें और प्लेटफ़ॉर्म अनुपालन की देखरेख करें।",
    platformAdmin: "प्लेटफ़ॉर्म एडमिन", trustSafetyTeam: "ट्रस्ट एंड सेफ्टी टीम", roleLabelWorker: "श्रमिक", roleLabelCompany: "कंपनी", roleLabelAdmin: "एडमिन", roleTagWorker: "श्रमिक पैनल", roleTagCompany: "नियोक्ता पैनल", roleTagAdmin: "एडमिन पैनल",
    thisMonth: "इस महीने", vsLastMonth: "पिछले महीने से +11%", activeApplications: "सक्रिय आवेदन", totalLifetime: "कुल आजीवन", jobsCompletedLabel: "पूर्ण की गई नौकरियां", bestAiMatch: "सर्वश्रेष्ठ एआई मिलान",
    earningsTrend: "कमाई की प्रवृत्ति", last6Months: "पिछले 6 महीने, ₹ में", applicationFunnel: "आवेदन फ़नल", whereThingsStand: "स्थिति कहाँ है", nearbyJobsNow: "अभी आस-पास की नौकरियां", within12kmOf: "12 किमी के भीतर",
    profileDetailsTitle: "प्रोफ़ाइल विवरण", fullName: "पूरा नाम", primarySkill: "मुख्य कौशल", experienceLabel: "अनुभव", yearsSuffix: "वर्ष", cityLabel: "शहर", phoneLabel: "फ़ोन", languagesSpokenLabel: "बोली जाने वाली भाषाएं", expectedWageLabel: "अपेक्षित मज़दूरी", perDayLabel: "/ दिन", availabilityLabel: "उपलब्धता",
    skillsCertifications: "कौशल और प्रमाणपत्र", addSkillPlaceholder: "कौशल जोड़ें, जैसे वेल्डिंग", primaryTag: "(मुख्य)",
    wageTransparency: "मज़दूरी पारदर्शिता", wageTransparencyDesc: "के लिए औसत मज़दूरी", wageTransparencyDesc2: "में", wageTransparencyDesc3: "पिछले 30 दिनों में, WorkHub पर पूर्ण की गई नौकरियों के आधार पर।", yourRate: "आपकी दर", marketMedian: "बाज़ार औसत", top10pct: "शीर्ष 10%",
    voiceRegistrationTitle: "आवाज़ पंजीकरण", voiceAssistantLabel: "आवाज़ सहायक", voiceRegistrationDesc: "नए श्रमिक अपनी ही भाषा में, केवल आवाज़ से पूरी तरह पंजीकरण कर सकते हैं — टाइप करने की ज़रूरत नहीं।", speakToUpdateProfile: "प्रोफ़ाइल अपडेट करने के लिए बोलें", stopListening: "सुनना बंद करें", voiceAssistantAvailable: "पंजीकरण, नौकरी खोज और सहायता के लिए आवाज़ सहायता 5 क्षेत्रीय भाषाओं में उपलब्ध है।",
    applyNowLabel: "अभी आवेदन करें", alreadyApplied: "पहले ही आवेदन किया", aiMatchScoreLabel: "एआई मिलान स्कोर",
    noApplicationsYet: "अभी तक कोई आवेदन नहीं — शुरू करने के लिए एआई नौकरी सुझाव देखें।", appliedOnLabel: "आवेदन किया",
    totalReceived: "कुल प्राप्त", processingLabel: "प्रक्रियाधीन", paymentProtection: "भुगतान सुरक्षा", paymentProtectionSub: "एस्क्रो-समर्थित वितरण", paymentHistory: "भुगतान इतिहास", colDate: "तारीख़", colJob: "नौकरी", colMethod: "तरीका", colAmount: "राशि", colStatus: "स्थिति",
    jobsCompletedStat: "पूर्ण की गई नौकरियां", yearsActiveStat: "सक्रिय वर्ष", avgRatingStat: "औसत रेटिंग", jobsCompletedOverTime: "समय के साथ पूर्ण की गई नौकरियां", monthlyCompletedEngagements: "मासिक पूर्ण किए गए काम", timelineTitle: "समयरेखा", completedLabel: "पूर्ण",
    reviewsCountLabel: "समीक्षाएं",
    emergencySupportTitle: "आपातकालीन सहायता", immediateDangerNote: "यदि आप तत्काल खतरे में हैं, तो पहले स्थानीय आपातकालीन सेवाओं से संपर्क करें।", sendSosAlert: "एसओएस अलर्ट भेजें",
    nationalEmergencyLabel: "राष्ट्रीय आपातकाल", labourHelplineLabel: "श्रम हेल्पलाइन", trustSafetyLabel: "WorkHub ट्रस्ट एंड सेफ्टी",
    whatHappensSosTitle: "एसओएस भेजने पर क्या होता है", sosStep1: "आपका लाइव लोकेशन और वर्तमान कार्यस्थल WorkHub की ट्रस्ट एंड सेफ्टी टीम के साथ साझा किया जाता है।", sosStep2: "एक एडमिन तुरंत अलर्ट की समीक्षा करता है और कॉल के ज़रिए आप तक पहुंचने का प्रयास करता है।", sosStep3: "यदि संपर्क न हो सके, तो आपका सूचीबद्ध आपातकालीन संपर्क और स्थानीय अधिकारियों को सूचित किया जाता है।",
    documentOf: "दस्तावेज़", documentOfSep: "में से",
    docAadhaar: "आधार कार्ड", docSkillCert: "कौशल प्रमाणपत्र — इलेक्ट्रीशियन", docPoliceVerification: "पुलिस सत्यापन", docBankPassbook: "बैंक पासबुक", docProfilePhoto: "प्रोफ़ाइल फ़ोटो",
    docNoteGovId: "सरकारी पहचान पत्र • 12 जनवरी 2026 को अपलोड किया गया", docNoteIti: "आईटीआई पुणे • 2019 में जारी", docNoteSubmitted: "01 अगस्त 2026 को जमा किया गया", docNoteBank: "मज़दूरी वितरण के लिए", docNotePhoto: "पासपोर्ट-शैली फ़ोटो",
    docGst: "जीएसटी प्रमाणपत्र", docPan: "कंपनी पैन", docAddress: "कार्यालय पता प्रमाण", docNoteGstSubmit: "04 अगस्त 2026 को जमा किया गया", docNotePanVerified: "एनएसडीएल के ज़रिए सत्यापित", docNoteAwaiting: "समीक्षा के लिए प्रतीक्षारत",
    openJobsLabel: "खुली नौकरियां", activeWorkersLabel: "सक्रिय श्रमिक", onActiveEngagements: "सक्रिय कार्यों पर", payrollAug: "पेरोल (अगस्त)", acrossAllSites: "सभी साइटों पर", employerRating: "नियोक्ता रेटिंग", workerReviewsCount: "श्रमिक समीक्षाएं",
    hiringTrendTitle: "भर्ती प्रवृत्ति", postedLabel: "पोस्ट की गई", jobsPostedVsHired: "पोस्ट की गई नौकरियां बनाम भर्ती श्रमिक", demandByCategory: "श्रेणी अनुसार मांग", platformWideLabel: "पूरे प्लेटफ़ॉर्म पर",
    verifiedBannerTitle: "आपकी कंपनी WorkHub पर सत्यापित है", gstinLabel: "जीएसटीआईएन", memberSinceLabel: "सदस्य बनने की तिथि", trustScoreLabel: "ट्रस्ट स्कोर 92/100",
    jobDetailsTitle: "नौकरी विवरण", jobTitleLabel: "नौकरी शीर्षक", jobTitlePlaceholder: "जैसे साइट इलेक्ट्रीशियन चाहिए", skillRequiredLabel: "आवश्यक कौशल", locationCityLabel: "स्थान (शहर)", wagePerDayLabel: "मज़दूरी (₹ / दिन)", workDurationLabel: "कार्य अवधि", durationPlaceholder: "जैसे 30 दिन",
    foodProvidedLabel: "भोजन उपलब्ध", accommodationProvidedLabel: "आवास उपलब्ध", additionalReqLabel: "अतिरिक्त आवश्यकताएं", additionalReqPlaceholder: "आवश्यक उपकरण, शिफ्ट समय, सुरक्षा उपकरण आदि।",
    belowMinWageWarning: "यह मज़दूरी राज्य के न्यूनतम मज़दूरी दिशानिर्देश से कम है", belowMinWageWarning2: "न्यूनतम मज़दूरी से कम नौकरी पोस्ट स्वतः अवरुद्ध हो जाती हैं।",
    postJobBtn: "नौकरी पोस्ट करें — एआई मिलान शुरू करेगा", jobPostedBtn: "नौकरी पोस्ट हो गई!", livePreviewTitle: "लाइव पूर्वावलोकन", yourJobTitlePlaceholder: "आपका नौकरी शीर्षक", yourCompanyPlaceholder: "आपकी कंपनी", cityPlaceholder: "शहर", durationFallback: "अवधि",
    wageTransparencyCheckTitle: "मज़दूरी पारदर्शिता जांच", wageTransparencyCheckDesc: "WorkHub हर पोस्ट की गई मज़दूरी की तुलना कौशल और शहर के लिए सत्यापित बाज़ार डेटा से करता है, ताकि श्रमिकों को आवेदन करने से पहले एक निष्पक्ष, पारदर्शी प्रस्ताव दिखे।",
    matchesDescBanner: "मिलान कौशल फिट, दूरी, मज़दूरी संरेखण, अनुभव और बताई गई उपलब्धता के आधार पर रैंक किए जाते हैं — नए श्रमिकों के पंजीकरण के साथ रीयल-टाइम में अपडेट होते हैं।", messageBtn: "संदेश", shortlistBtn: "शॉर्टलिस्ट करें",
    stageApplied: "आवेदन किया", stageShortlisted: "शॉर्टलिस्ट किया", stageHired: "नियुक्त", stageRejected: "अस्वीकृत", nothingHereLabel: "यहाँ कुछ नहीं", advanceBtn: "आगे बढ़ाएं", rejectBtn: "अस्वीकार करें",
    thisWeekAttendance: "इस सप्ताह की उपस्थिति", acrossAllActiveSites: "सभी सक्रिय साइटों पर", todaysRosterTitle: "आज का रोस्टर — साइट इलेक्ट्रीशियन टीम", colWorker: "श्रमिक", colCheckIn: "चेक-इन", colCheckOut: "चेक-आउट", colStatus2: "स्थिति",
    statusPresent: "उपस्थित", statusLate: "देर से", statusAbsent: "अनुपस्थित",
    paidThisMonth: "इस महीने भुगतान", pendingPayouts: "लंबित भुगतान", workersPaidLabel: "भुगतान किए गए श्रमिक", recentPayouts: "हाल के भुगतान", contractSuffix: "अनुबंध", statusPaid: "भुगतान किया गया", statusPending2: "लंबित",
    responsibilitiesBanner: "WorkHub पर नियोक्ता हर नौकरी पोस्टिंग के हिस्से के रूप में इन उत्तरदायित्वों से सहमत होते हैं। पालन न करने पर निलंबन हो सकता है।",
    companyProfileTitle: "कंपनी प्रोफ़ाइल", companyDetailsTitle: "कंपनी विवरण", companyNameLabel: "कंपनी का नाम", industryLabel: "उद्योग", contactEmailLabel: "संपर्क ईमेल", contactPhoneLabel: "संपर्क फ़ोन", aboutCompanyLabel: "कंपनी के बारे में", aboutPlaceholder: "श्रमिकों को अपनी कंपनी, संस्कृति और साइट स्थितियों के बारे में बताएं।",
    jobReqDefaultsTitle: "डिफ़ॉल्ट नौकरी आवश्यकताएं", jobReqDefaultsDesc: "ये डिफ़ॉल्ट नई नौकरी पोस्ट में पहले से भर जाते हैं ताकि आपकी सभी लिस्टिंग में आवश्यकताएं सुसंगत रहें।", defaultWageRangeLabel: "डिफ़ॉल्ट मज़दूरी सीमा (₹ / दिन)", preferredSkillsLabel: "पसंदीदा कौशल", standardDurationLabel: "मानक अनुबंध अवधि", safetyRequirementsLabel: "सुरक्षा आवश्यकताएं", safetyReqPlaceholder: "जैसे साइट पर हेलमेट, हार्नेस और स्टील-टो बूट अनिवार्य।",
    totalWorkersLabel: "कुल श्रमिक", thisMonthSuffix2: "इस महीने", companiesLabel2: "कंपनियां", openJobsLabel2: "खुली नौकरियां", activeFraudFlagsLabel: "सक्रिय धोखाधड़ी फ़्लैग",
    platformGrowthTitle: "प्लेटफ़ॉर्म वृद्धि", registeredWorkersVsCompanies: "पंजीकृत श्रमिक बनाम कंपनियां", verificationStatusTitle: "सत्यापन स्थिति", allAccountsLabel: "सभी खाते",
    jobsByCategoryTitle: "श्रेणी अनुसार नौकरियां", fraudFlagsRaisedTitle: "उठाए गए धोखाधड़ी फ़्लैग", weeklyLabel: "साप्ताहिक",
    searchWorkersPlaceholder: "नाम या कौशल से श्रमिक खोजें…", colSkill: "कौशल", colCity: "शहर", colRating: "रेटिंग", colStatus4: "स्थिति",
    verifyBtn: "सत्यापित करें", rejectBtn2: "अस्वीकार करें",
    noJobsWaiting: "अभी अनुमोदन के लिए कोई नौकरी प्रतीक्षारत नहीं है।", approveBtn: "स्वीकृत करें", rejectNotifyBtn: "अस्वीकार करें और सूचित करें",
    pendingReviewTitle: "समीक्षा हेतु लंबित", approveNameBtn: "स्वीकृत करें", rejectBtn3: "अस्वीकार करें",
    vsLabel: "बनाम",
    fraudBannerText: "WorkHub का एआई हर नौकरी पोस्ट और प्रोफ़ाइल को धोखाधड़ी पैटर्न के लिए स्कैन करता है — अवास्तविक मज़दूरी, अमान्य जीएसटीआईएन, डुप्लिकेट दस्तावेज़ और ऑफ़-प्लेटफ़ॉर्म भुगतान अनुरोध।", suspendAccountBtn: "खाता निलंबित करें", investigateBtn: "जांच करें", riskScoreLabel: "जोखिम स्कोर",
    factorWeightsTitle: "एआई मिलान एल्गोरिदम — कारक भार", howEngineScoresDesc: "सिफारिश इंजन एक श्रमिक-नौकरी जोड़ी को कैसे स्कोर करता है", recentMatchEventsTitle: "हाल की मिलान घटनाएं", colWorker4: "श्रमिक", colJob3: "नौकरी", colMatchScore: "मिलान स्कोर", colOutcome: "परिणाम",
    statusActive: "सक्रिय", statusUnderReview: "समीक्षाधीन",
    statusOpen: "खुला", statusPendingApproval: "अनुमोदन लंबित", statusClosed: "बंद", statusFlagged: "फ़्लैग किया गया", urgentLabel: "तत्काल", foodLabel: "भोजन", stayLabel: "आवास",
    notificationsTitle: "सूचनाएं", weekAbbrev: "सप्ताह", jobsAppliedSuffix: "आवेदन किया", jobsSuffix: "नौकरियां", platformDemoBuild: "WorkHub प्लेटफ़ॉर्म · डेमो बिल्ड",
    rightsTitle1: "न्यूनतम मज़दूरी", rightsText1: "प्रत्येक श्रमिक को उनकी कौशल श्रेणी के लिए राज्य द्वारा अधिसूचित न्यूनतम मज़दूरी अवश्य मिलनी चाहिए — मौखिक समझौतों के बावजूद इससे कम कभी नहीं।",
    rightsTitle2: "समय पर भुगतान", rightsText2: "मज़दूरी सहमत समय-सारणी पर भुगतान की जानी चाहिए। सहमत चक्र से अधिक देरी को भुगतान टैब से सीधे रिपोर्ट किया जा सकता है।",
    rightsTitle3: "सुरक्षित कार्य परिस्थितियां", rightsText3: "नियोक्ताओं को खतरनाक काम के लिए सुरक्षा उपकरण और खतरे से मुक्त साइट प्रदान करनी चाहिए। आप बिना दंड के असुरक्षित काम से इनकार कर सकते हैं।",
    rightsTitle4: "लिखित नौकरी शर्तें", rightsText4: "आप शुरू करने से पहले स्पष्ट शर्तों — मज़दूरी, अवधि, घंटे, भोजन और आवास — के हक़दार हैं, जो हर नौकरी पोस्ट में दिखाई देती हैं।",
    rightsTitle5: "साप्ताहिक अवकाश", rightsText5: "आपके कार्य श्रेणी के अनुसार, आप प्रति सप्ताह कम से कम एक सवेतन या अवैतनिक अवकाश के हक़दार हैं।",
    rightsTitle6: "शिकायत निवारण", rightsText6: "WorkHub पर दर्ज हर शिकायत को समाधान समयसीमा के साथ ट्रैक किया जाता है और यदि हल न हो तो एडमिन टीम को भेजा जाता है।",
    respTitle1: "समय पर मज़दूरी भुगतान करें", respText1: "एक सत्यापित, ट्रेस करने योग्य भुगतान पद्धति के ज़रिए सहमत चक्र पर सहमत मज़दूरी वितरित करें।",
    respTitle2: "लिखित समझौता प्रदान करें", respText2: "नियुक्ति से पहले नौकरी पोस्ट में मज़दूरी, अवधि, घंटे और साइट की स्थितियां स्पष्ट रूप से बताएं।",
    respTitle3: "साइट सुरक्षा सुनिश्चित करें", respText3: "खतरनाक काम के लिए सुरक्षात्मक उपकरण उपलब्ध कराएं और सुरक्षित, खतरे से मुक्त साइट बनाए रखें।",
    respTitle4: "दस्तावेज़ न रोकें", respText4: "रोज़गार की शर्त के रूप में कभी भी श्रमिक के मूल पहचान दस्तावेज़ न रोकें।",
    respTitle5: "गैर-भेदभाव", respText5: "धर्म, जाति, लिंग या क्षेत्र की परवाह किए बिना सभी श्रमिकों को निष्पक्षता से नियुक्त करें और उनके साथ व्यवहार करें।",
    respTitle6: "शिकायतों का जवाब दें", respText6: "प्लेटफ़ॉर्म के ज़रिए उठाई गई श्रमिक शिकायतों को SLA विंडो के भीतर स्वीकार करें और हल करें।",
    compTitle1: "न्यूनतम मज़दूरी प्रवर्तन", compText1: "किसी कौशल श्रेणी के लिए राज्य न्यूनतम मज़दूरी से कम नौकरी पोस्ट प्रकाशित होने से पहले स्वतः अवरुद्ध हो जाती हैं।",
    compTitle2: "भेदभाव-विरोधी नीति", compText2: "नौकरी पोस्ट और नियुक्ति निर्णयों की भेदभावपूर्ण भाषा या मानदंड के लिए जांच की जाती है।",
    compTitle3: "धोखाधड़ी शून्य-सहनशीलता", compText3: "2+ पुष्ट धोखाधड़ी रिपोर्ट वाली कंपनियों को जांच लंबित रहने तक निलंबित कर दिया जाता है।",
    compTitle4: "डेटा गोपनीयता", compText4: "श्रमिक दस्तावेज़ केवल सक्रिय नौकरी प्रस्ताव वाले सत्यापित नियोक्ताओं को दिखाई देते हैं।",
    compTitle5: "शिकायत निवारण SLA", compText5: "सभी शिकायतों को 48 घंटों के भीतर पहली प्रतिक्रिया मिलनी चाहिए।",
    compTitle6: "श्रमिक सुरक्षा मानक", compText6: "निर्माण-श्रेणी की नौकरी पोस्ट के लिए अनिवार्य सुरक्षा-उपकरण चेकलिस्ट।",
    notifViewed: "'विला प्रोजेक्ट के लिए पेंटर' हेतु आपके आवेदन को Skyline Constructions ने देखा।", notifPaymentCredited: "₹6,300 का भुगतान आपके खाते में जमा कर दिया गया है।", notifNewMatch: "पुणे के पास नई नौकरी मिलान मिला: किचन कुक, 90% मिलान।", notifAadhaarApproved: "आपका आधार सत्यापन स्वीकृत हो गया है।",
    timeAgo2h: "2 घंटे पहले", timeAgo1d: "1 दिन पहले", timeAgo2d: "2 दिन पहले", timeAgo5d: "5 दिन पहले",
  },
  mr: {
    appName: "WorkHub", tagline: "सत्यापित काम. योग्य मजुरी. आजच नोकरी.",
    dashboard: "डॅशबोर्ड", profile: "प्रोफाइल", skills: "कौशल्ये", recommendations: "एआय नोकरी सूचना", applications: "अर्ज", payments: "पेमेंट", history: "कामाचा इतिहास", ratings: "रेटिंग", emergency: "आपत्कालीन एसओएस", rights: "तुमचे हक्क जाणून घ्या", documents: "कागदपत्रे", notifications: "सूचना",
    postJob: "नोकरी पोस्ट करा", aiMatches: "एआय कामगार सूचना", hiring: "भरती प्रक्रिया", attendance: "उपस्थिती", responsibilities: "नियोक्ता जबाबदाऱ्या",
    workers: "कामगार", companies: "कंपन्या", approvals: "नोकरी मंजुरी", verification: "पडताळणी रांग", complaints: "तक्रारी", fraud: "फसवणूक ओळख", analytics: "विश्लेषण", matching: "एआय जुळणी", compliance: "अनुपालन",
    apply: "आता अर्ज करा", save: "जतन करा", verified: "सत्यापित", pending: "प्रलंबित", listening: "ऐकत आहे…", selectLanguage: "भाषा", logout: "लॉग आउट", switchRole: "बदला", sos: "एसओएस", myJobs: "माझ्या नोकऱ्या",
    edit: "संपादित करा", cancel: "रद्द करा", saveChanges: "बदल जतन करा", editProfile: "प्रोफाइल संपादित करा", close: "बंद करा", add: "जोडा", search: "शोधा", filter: "फिल्टर", next: "पुढे", prev: "मागे", all: "सर्व",
    profileUpdated: "प्रोफाइल यशस्वीरित्या अद्ययावत झाली.", fillRequiredFields: "जतन करण्यापूर्वी कृपया सर्व आवश्यक फील्ड योग्यरित्या भरा.", requiredField: "हे फील्ड आवश्यक आहे.", invalidPhone: "वैध फोन नंबर टाका.", invalidWage: "शून्यापेक्षा जास्त वैध मजुरी रक्कम टाका.", invalidEmail: "वैध ईमेल पत्ता टाका.", invalidGstin: "वैध जीएसटीआयएन टाका.", invalidNumber: "वैध संख्या टाका.",
    aiPoweredBadge: "एआय-चालित जुळणी · आवाज-सक्षम · 5 भाषा", heroDesc: "भारताचा कामगार बाजार जो सत्यापित रोजंदारी व कुशल कामगारांना विश्वासार्ह नियोक्त्यांशी जोडतो — योग्य मजुरी, सुरक्षितता आणि सर्वत्र सोबत राहणाऱ्या कामाच्या इतिहासावर आधारित.",
    statVerifiedWorkers: "सत्यापित कामगार", statHiringCompanies: "भरती करणाऱ्या कंपन्या", statWagesPaid: "दिलेली मजुरी",
    continueAs: "याप्रमाणे सुरू ठेवा", enterPanel: "पॅनेलमध्ये प्रवेश करा", signInAs: "साइन इन करा —", otpDesc: "ओटीपी-आधारित फोन लॉगिन प्रत्येक साक्षरता स्तरासाठी नोंदणी सोपी करते.", passwordDesc: "नियोक्ता / अ‍ॅडमिन क्रेडेन्शियलसह सुरक्षित साइन-इन.",
    mobileNumber: "मोबाइल नंबर", workEmail: "कार्य ईमेल", otpLabel: "ओटीपी", passwordLabel: "पासवर्ड", continueAsUser: "याप्रमाणे सुरू ठेवा", demoNote: "डेमो बिल्ड — कोणत्याही खऱ्या क्रेडेन्शियलची गरज नाही. डेटा उदाहरणादाखल आहे.", back: "मागे",
    roleWorkerTitle: "कामगार", roleWorkerDesc: "तुमच्या जवळील सत्यापित रोजंदारी व कुशल काम शोधा, वेळेवर पेमेंट मिळवा, तुमचे हक्क जाणून घ्या.",
    roleCompanyTitle: "कंपनी / नियोक्ता", roleCompanyDesc: "नोकऱ्या पोस्ट करा, एआय-जुळलेले कामगार मिळवा, उपस्थिती आणि पेरोल एकाच ठिकाणाहून व्यवस्थापित करा.",
    roleAdminTitle: "अ‍ॅडमिन", roleAdminDesc: "खाती सत्यापित करा, नोकऱ्या मंजूर करा, फसवणुकीचे निरीक्षण करा आणि प्लॅटफॉर्म अनुपालनाची देखरेख करा.",
    platformAdmin: "प्लॅटफॉर्म अ‍ॅडमिन", trustSafetyTeam: "ट्रस्ट अँड सेफ्टी टीम", roleLabelWorker: "कामगार", roleLabelCompany: "कंपनी", roleLabelAdmin: "अ‍ॅडमिन", roleTagWorker: "कामगार पॅनेल", roleTagCompany: "नियोक्ता पॅनेल", roleTagAdmin: "अ‍ॅडमिन पॅनेल",
    thisMonth: "या महिन्यात", vsLastMonth: "मागील महिन्यापेक्षा +11%", activeApplications: "सक्रिय अर्ज", totalLifetime: "एकूण आजवर", jobsCompletedLabel: "पूर्ण झालेल्या नोकऱ्या", bestAiMatch: "सर्वोत्तम एआय जुळणी",
    earningsTrend: "कमाईचा कल", last6Months: "मागील 6 महिने, ₹ मध्ये", applicationFunnel: "अर्ज फनेल", whereThingsStand: "सद्य स्थिती", nearbyJobsNow: "आत्ता जवळपासच्या नोकऱ्या", within12kmOf: "12 किमी च्या आत",
    profileDetailsTitle: "प्रोफाइल तपशील", fullName: "पूर्ण नाव", primarySkill: "मुख्य कौशल्य", experienceLabel: "अनुभव", yearsSuffix: "वर्षे", cityLabel: "शहर", phoneLabel: "फोन", languagesSpokenLabel: "बोलल्या जाणाऱ्या भाषा", expectedWageLabel: "अपेक्षित मजुरी", perDayLabel: "/ दिवस", availabilityLabel: "उपलब्धता",
    skillsCertifications: "कौशल्ये आणि प्रमाणपत्रे", addSkillPlaceholder: "कौशल्य जोडा, उदा. वेल्डिंग", primaryTag: "(मुख्य)",
    wageTransparency: "मजुरी पारदर्शकता", wageTransparencyDesc: "साठी सरासरी मजुरी", wageTransparencyDesc2: "मध्ये", wageTransparencyDesc3: "मागील 30 दिवसांत, WorkHub वरील पूर्ण झालेल्या नोकऱ्यांच्या आधारे.", yourRate: "तुमचा दर", marketMedian: "बाजार सरासरी", top10pct: "टॉप 10%",
    voiceRegistrationTitle: "आवाज नोंदणी", voiceAssistantLabel: "आवाज सहाय्यक", voiceRegistrationDesc: "नवीन कामगार त्यांच्या स्वतःच्या भाषेत, फक्त आवाजाने पूर्णपणे नोंदणी करू शकतात — टायपिंगची गरज नाही.", speakToUpdateProfile: "प्रोफाइल अद्ययावत करण्यासाठी बोला", stopListening: "ऐकणे थांबवा", voiceAssistantAvailable: "नोंदणी, नोकरी शोध आणि मदतीसाठी आवाज सहाय्य 5 प्रादेशिक भाषांमध्ये उपलब्ध आहे.",
    applyNowLabel: "आता अर्ज करा", alreadyApplied: "आधीच अर्ज केला", aiMatchScoreLabel: "एआय जुळणी गुण",
    noApplicationsYet: "अजून कोणतेही अर्ज नाहीत — सुरू करण्यासाठी एआय नोकरी सूचना पहा.", appliedOnLabel: "अर्ज केला",
    totalReceived: "एकूण मिळालेले", processingLabel: "प्रक्रियेत", paymentProtection: "पेमेंट संरक्षण", paymentProtectionSub: "एस्क्रो-समर्थित वितरण", paymentHistory: "पेमेंट इतिहास", colDate: "तारीख", colJob: "नोकरी", colMethod: "पद्धत", colAmount: "रक्कम", colStatus: "स्थिती",
    jobsCompletedStat: "पूर्ण झालेल्या नोकऱ्या", yearsActiveStat: "सक्रिय वर्षे", avgRatingStat: "सरासरी रेटिंग", jobsCompletedOverTime: "कालांतराने पूर्ण झालेल्या नोकऱ्या", monthlyCompletedEngagements: "मासिक पूर्ण झालेली कामे", timelineTitle: "टाइमलाइन", completedLabel: "पूर्ण",
    reviewsCountLabel: "पुनरावलोकने",
    emergencySupportTitle: "आपत्कालीन सहाय्य", immediateDangerNote: "तुम्ही तात्काळ धोक्यात असल्यास, आधी स्थानिक आपत्कालीन सेवांशी संपर्क साधा.", sendSosAlert: "एसओएस अलर्ट पाठवा",
    nationalEmergencyLabel: "राष्ट्रीय आपत्काल", labourHelplineLabel: "कामगार हेल्पलाइन", trustSafetyLabel: "WorkHub ट्रस्ट अँड सेफ्टी",
    whatHappensSosTitle: "एसओएस पाठवल्यावर काय होते", sosStep1: "तुमचे लाइव्ह लोकेशन आणि सध्याचे कामाचे ठिकाण WorkHub च्या ट्रस्ट अँड सेफ्टी टीमसोबत शेअर केले जाते.", sosStep2: "एक अ‍ॅडमिन त्वरित अलर्टचा आढावा घेतो आणि कॉलद्वारे तुमच्यापर्यंत पोहोचण्याचा प्रयत्न करतो.", sosStep3: "संपर्क न झाल्यास, तुमचा नोंदवलेला आपत्कालीन संपर्क व स्थानिक अधिकाऱ्यांना सूचित केले जाते.",
    documentOf: "कागदपत्र", documentOfSep: "पैकी",
    docAadhaar: "आधार कार्ड", docSkillCert: "कौशल्य प्रमाणपत्र — इलेक्ट्रिशियन", docPoliceVerification: "पोलीस पडताळणी", docBankPassbook: "बँक पासबुक", docProfilePhoto: "प्रोफाइल फोटो",
    docNoteGovId: "सरकारी ओळखपत्र • 12 जानेवारी 2026 रोजी अपलोड", docNoteIti: "आयटीआय पुणे • 2019 मध्ये जारी", docNoteSubmitted: "01 ऑगस्ट 2026 रोजी सादर", docNoteBank: "मजुरी वितरणासाठी", docNotePhoto: "पासपोर्ट-शैली फोटो",
    docGst: "जीएसटी प्रमाणपत्र", docPan: "कंपनी पॅन", docAddress: "कार्यालय पत्ता पुरावा", docNoteGstSubmit: "04 ऑगस्ट 2026 रोजी सादर", docNotePanVerified: "एनएसडीएल मार्फत सत्यापित", docNoteAwaiting: "आढाव्याच्या प्रतीक्षेत",
    openJobsLabel: "खुल्या नोकऱ्या", activeWorkersLabel: "सक्रिय कामगार", onActiveEngagements: "सक्रिय कामांवर", payrollAug: "पेरोल (ऑगस्ट)", acrossAllSites: "सर्व साइट्सवर", employerRating: "नियोक्ता रेटिंग", workerReviewsCount: "कामगार पुनरावलोकने",
    hiringTrendTitle: "भरती कल", postedLabel: "पोस्ट केलेल्या", jobsPostedVsHired: "पोस्ट केलेल्या नोकऱ्या विरुद्ध भरती केलेले कामगार", demandByCategory: "श्रेणीनुसार मागणी", platformWideLabel: "संपूर्ण प्लॅटफॉर्मवर",
    verifiedBannerTitle: "तुमची कंपनी WorkHub वर सत्यापित आहे", gstinLabel: "जीएसटीआयएन", memberSinceLabel: "सदस्य झाल्याची तारीख", trustScoreLabel: "ट्रस्ट स्कोर 92/100",
    jobDetailsTitle: "नोकरी तपशील", jobTitleLabel: "नोकरीचे शीर्षक", jobTitlePlaceholder: "उदा. साइट इलेक्ट्रिशियन हवा आहे", skillRequiredLabel: "आवश्यक कौशल्य", locationCityLabel: "स्थान (शहर)", wagePerDayLabel: "मजुरी (₹ / दिवस)", workDurationLabel: "कामाचा कालावधी", durationPlaceholder: "उदा. 30 दिवस",
    foodProvidedLabel: "जेवण उपलब्ध", accommodationProvidedLabel: "निवास उपलब्ध", additionalReqLabel: "अतिरिक्त आवश्यकता", additionalReqPlaceholder: "आवश्यक साधने, शिफ्ट वेळ, सुरक्षा साधने इ.",
    belowMinWageWarning: "ही मजुरी राज्याच्या किमान मजुरी मार्गदर्शक तत्त्वापेक्षा कमी आहे", belowMinWageWarning2: "किमान मजुरीपेक्षा कमी नोकरी पोस्ट आपोआप ब्लॉक होतात.",
    postJobBtn: "नोकरी पोस्ट करा — एआय जुळणी सुरू करेल", jobPostedBtn: "नोकरी पोस्ट झाली!", livePreviewTitle: "लाइव्ह पूर्वावलोकन", yourJobTitlePlaceholder: "तुमच्या नोकरीचे शीर्षक", yourCompanyPlaceholder: "तुमची कंपनी", cityPlaceholder: "शहर", durationFallback: "कालावधी",
    wageTransparencyCheckTitle: "मजुरी पारदर्शकता तपासणी", wageTransparencyCheckDesc: "WorkHub प्रत्येक पोस्ट केलेल्या मजुरीची तुलना कौशल्य व शहरासाठी सत्यापित बाजार डेटाशी करते, जेणेकरून कामगारांना अर्ज करण्यापूर्वी योग्य, पारदर्शक ऑफर दिसेल.",
    matchesDescBanner: "जुळण्या कौशल्य फिट, अंतर, मजुरी जुळवणी, अनुभव आणि नमूद केलेली उपलब्धता यावर आधारित क्रमवारीत लावल्या जातात — नवीन कामगार नोंदणी करताच रिअल-टाइममध्ये अद्ययावत होतात.", messageBtn: "संदेश", shortlistBtn: "शॉर्टलिस्ट करा",
    stageApplied: "अर्ज केला", stageShortlisted: "शॉर्टलिस्ट केले", stageHired: "नियुक्त", stageRejected: "नाकारले", nothingHereLabel: "इथे काहीही नाही", advanceBtn: "पुढे न्या", rejectBtn: "नाकारा",
    thisWeekAttendance: "या आठवड्याची उपस्थिती", acrossAllActiveSites: "सर्व सक्रिय साइट्सवर", todaysRosterTitle: "आजचा रोस्टर — साइट इलेक्ट्रिशियन टीम", colWorker: "कामगार", colCheckIn: "चेक-इन", colCheckOut: "चेक-आउट", colStatus2: "स्थिती",
    statusPresent: "उपस्थित", statusLate: "उशीरा", statusAbsent: "अनुपस्थित",
    paidThisMonth: "या महिन्यात दिलेले", pendingPayouts: "प्रलंबित पेमेंट", workersPaidLabel: "पेमेंट दिलेले कामगार", recentPayouts: "अलीकडील पेमेंट", contractSuffix: "करार", statusPaid: "दिले", statusPending2: "प्रलंबित",
    responsibilitiesBanner: "WorkHub वरील नियोक्ते प्रत्येक नोकरी पोस्टिंगचा भाग म्हणून या जबाबदाऱ्यांना सहमती देतात. पालन न केल्यास निलंबन होऊ शकते.",
    companyProfileTitle: "कंपनी प्रोफाइल", companyDetailsTitle: "कंपनी तपशील", companyNameLabel: "कंपनीचे नाव", industryLabel: "उद्योग", contactEmailLabel: "संपर्क ईमेल", contactPhoneLabel: "संपर्क फोन", aboutCompanyLabel: "कंपनीबद्दल", aboutPlaceholder: "कामगारांना तुमच्या कंपनीबद्दल, संस्कृतीबद्दल आणि साइट परिस्थितीबद्दल सांगा.",
    jobReqDefaultsTitle: "डीफॉल्ट नोकरी आवश्यकता", jobReqDefaultsDesc: "हे डीफॉल्ट नवीन नोकरी पोस्टमध्ये आधीच भरले जातात जेणेकरून तुमच्या सर्व लिस्टिंगमध्ये आवश्यकता सुसंगत राहतील.", defaultWageRangeLabel: "डीफॉल्ट मजुरी श्रेणी (₹ / दिवस)", preferredSkillsLabel: "पसंतीची कौशल्ये", standardDurationLabel: "मानक कराराचा कालावधी", safetyRequirementsLabel: "सुरक्षा आवश्यकता", safetyReqPlaceholder: "उदा. साइटवर हेल्मेट, हार्नेस आणि स्टील-टो बूट अनिवार्य.",
    totalWorkersLabel: "एकूण कामगार", thisMonthSuffix2: "या महिन्यात", companiesLabel2: "कंपन्या", openJobsLabel2: "खुल्या नोकऱ्या", activeFraudFlagsLabel: "सक्रिय फसवणूक फ्लॅग",
    platformGrowthTitle: "प्लॅटफॉर्म वाढ", registeredWorkersVsCompanies: "नोंदणीकृत कामगार विरुद्ध कंपन्या", verificationStatusTitle: "पडताळणी स्थिती", allAccountsLabel: "सर्व खाती",
    jobsByCategoryTitle: "श्रेणीनुसार नोकऱ्या", fraudFlagsRaisedTitle: "उठवलेले फसवणूक फ्लॅग", weeklyLabel: "साप्ताहिक",
    searchWorkersPlaceholder: "नाव किंवा कौशल्याने कामगार शोधा…", colSkill: "कौशल्य", colCity: "शहर", colRating: "रेटिंग", colStatus4: "स्थिती",
    verifyBtn: "सत्यापित करा", rejectBtn2: "नाकारा",
    noJobsWaiting: "सध्या मंजुरीसाठी कोणत्याही नोकऱ्या प्रलंबित नाहीत.", approveBtn: "मंजूर करा", rejectNotifyBtn: "नाकारा आणि कळवा",
    pendingReviewTitle: "आढाव्यासाठी प्रलंबित", approveNameBtn: "मंजूर करा", rejectBtn3: "नाकारा",
    vsLabel: "विरुद्ध",
    fraudBannerText: "WorkHub चा एआय प्रत्येक नोकरी पोस्ट आणि प्रोफाइल फसवणूक पॅटर्नसाठी तपासतो — अवास्तव मजुरी, अवैध जीएसटीआयएन, डुप्लिकेट कागदपत्रे आणि प्लॅटफॉर्मबाहेरील पेमेंट विनंत्या.", suspendAccountBtn: "खाते निलंबित करा", investigateBtn: "तपास करा", riskScoreLabel: "जोखीम गुण",
    factorWeightsTitle: "एआय जुळणी अल्गोरिदम — घटक वजन", howEngineScoresDesc: "शिफारस इंजिन कामगार-नोकरी जोडीला कसे गुण देते", recentMatchEventsTitle: "अलीकडील जुळणी घटना", colWorker4: "कामगार", colJob3: "नोकरी", colMatchScore: "जुळणी गुण", colOutcome: "निकाल",
    statusActive: "सक्रिय", statusUnderReview: "आढाव्याखाली",
    statusOpen: "खुली", statusPendingApproval: "मंजुरी प्रलंबित", statusClosed: "बंद", statusFlagged: "फ्लॅग केले", urgentLabel: "तातडीचे", foodLabel: "जेवण", stayLabel: "निवास",
    notificationsTitle: "सूचना", weekAbbrev: "आठवडा", jobsAppliedSuffix: "अर्ज केले", jobsSuffix: "नोकऱ्या", platformDemoBuild: "WorkHub प्लॅटफॉर्म · डेमो बिल्ड",
    rightsTitle1: "किमान मजुरी", rightsText1: "प्रत्येक कामगाराला त्यांच्या कौशल्य श्रेणीसाठी राज्याने अधिसूचित केलेली किमान मजुरी मिळालीच पाहिजे — तोंडी करार असूनही यापेक्षा कमी कधीही नाही.",
    rightsTitle2: "वेळेवर पेमेंट", rightsText2: "मान्य वेळापत्रकानुसार मजुरी दिली गेली पाहिजे. मान्य चक्रापेक्षा जास्त विलंब झाल्यास पेमेंट टॅबमधून थेट तक्रार करता येते.",
    rightsTitle3: "सुरक्षित कामाची परिस्थिती", rightsText3: "नियोक्त्यांनी धोकादायक कामासाठी सुरक्षा साधने आणि धोकामुक्त साइट पुरवली पाहिजे. तुम्ही दंडाशिवाय असुरक्षित काम नाकारू शकता.",
    rightsTitle4: "लेखी नोकरीच्या अटी", rightsText4: "सुरू करण्यापूर्वी तुम्हाला स्पष्ट अटी — मजुरी, कालावधी, तास, जेवण व निवास — मिळण्याचा हक्क आहे, जे प्रत्येक नोकरी पोस्टमध्ये दिसते.",
    rightsTitle5: "साप्ताहिक सुट्टी", rightsText5: "तुमच्या कामाच्या श्रेणीनुसार, तुम्हाला दर आठवड्याला किमान एक सशुल्क किंवा विनावेतन सुट्टीचा हक्क आहे.",
    rightsTitle6: "तक्रार निवारण", rightsText6: "WorkHub वर दाखल केलेली प्रत्येक तक्रार निराकरण कालमर्यादेसह ट्रॅक केली जाते आणि निकाली न लागल्यास अ‍ॅडमिन टीमकडे पाठवली जाते.",
    respTitle1: "वेळेवर मजुरी द्या", respText1: "सत्यापित, ट्रेस करता येण्याजोग्या पेमेंट पद्धतीद्वारे मान्य चक्रावर मान्य मजुरी वितरित करा.",
    respTitle2: "लेखी करार द्या", respText2: "नियुक्तीपूर्वी नोकरी पोस्टमध्ये मजुरी, कालावधी, तास आणि साइट परिस्थिती स्पष्टपणे नमूद करा.",
    respTitle3: "साइट सुरक्षितता सुनिश्चित करा", respText3: "धोकादायक कामासाठी संरक्षक उपकरणे पुरवा आणि सुरक्षित, धोकामुक्त साइट राखा.",
    respTitle4: "कागदपत्रे जप्त करू नका", respText4: "रोजगाराची अट म्हणून कामगाराची मूळ ओळखपत्रे कधीही रोखू नका.",
    respTitle5: "भेदभाव-रहित", respText5: "धर्म, जात, लिंग किंवा प्रदेश काहीही असो, सर्व कामगारांना निष्पक्षपणे नियुक्त करा व वागवा.",
    respTitle6: "तक्रारींना प्रतिसाद द्या", respText6: "प्लॅटफॉर्मद्वारे उपस्थित केलेल्या कामगार तक्रारी SLA कालमर्यादेत मान्य करा व निकाली काढा.",
    compTitle1: "किमान मजुरी अंमलबजावणी", compText1: "कौशल्य श्रेणीसाठी राज्याच्या किमान मजुरीपेक्षा कमी नोकरी पोस्ट प्रकाशित होण्यापूर्वी आपोआप ब्लॉक होतात.",
    compTitle2: "भेदभाव-विरोधी धोरण", compText2: "नोकरी पोस्ट आणि नियुक्ती निर्णयांची भेदभावपूर्ण भाषा किंवा निकषांसाठी तपासणी केली जाते.",
    compTitle3: "फसवणूक शून्य-सहनशीलता", compText3: "2+ पुष्टी झालेल्या फसवणूक तक्रारी असलेल्या कंपन्या चौकशी प्रलंबित असताना निलंबित केल्या जातात.",
    compTitle4: "डेटा गोपनीयता", compText4: "कामगारांची कागदपत्रे केवळ सक्रिय नोकरी ऑफर असलेल्या सत्यापित नियोक्त्यांना दिसतात.",
    compTitle5: "तक्रार निवारण SLA", compText5: "सर्व तक्रारींना 48 तासांच्या आत पहिला प्रतिसाद मिळालाच पाहिजे.",
    compTitle6: "कामगार सुरक्षा मानक", compText6: "बांधकाम-श्रेणीच्या नोकरी पोस्टसाठी अनिवार्य सुरक्षा-साधन तपासणी यादी.",
    notifViewed: "'व्हिला प्रोजेक्टसाठी पेंटर' या तुमच्या अर्जाला Skyline Constructions ने पाहिले.", notifPaymentCredited: "₹6,300 चे पेमेंट तुमच्या खात्यात जमा झाले आहे.", notifNewMatch: "पुण्याजवळ नवीन नोकरी जुळणी सापडली: किचन कुक, 90% जुळणी.", notifAadhaarApproved: "तुमची आधार पडताळणी मंजूर झाली आहे.",
    timeAgo2h: "2 तासांपूर्वी", timeAgo1d: "1 दिवसापूर्वी", timeAgo2d: "2 दिवसांपूर्वी", timeAgo5d: "5 दिवसांपूर्वी",
  },
  ta: {
    appName: "WorkHub", tagline: "சரிபார்க்கப்பட்ட வேலை. நியாயமான ஊதியம். இன்றே வேலை.",
    dashboard: "டாஷ்போர்டு", profile: "சுயவிவரம்", skills: "திறமைகள்", recommendations: "AI வேலை பரிந்துரைகள்", applications: "விண்ணப்பங்கள்", payments: "பணம்", history: "பணி வரலாறு", ratings: "மதிப்பீடு", emergency: "அவசர எஸ்ஓஎஸ்", rights: "உங்கள் உரிமைகளை அறியுங்கள்", documents: "ஆவணங்கள்", notifications: "அறிவிப்புகள்",
    postJob: "வேலை பதிவிடவும்", aiMatches: "AI தொழிலாளர் பரிந்துரைகள்", hiring: "பணியமர்த்தல் செயல்முறை", attendance: "வருகை", responsibilities: "முதலாளி கடமைகள்",
    workers: "தொழிலாளர்கள்", companies: "நிறுவனங்கள்", approvals: "வேலை ஒப்புதல்கள்", verification: "சரிபார்ப்பு வரிசை", complaints: "புகார்கள்", fraud: "மோசடி கண்டறிதல்", analytics: "பகுப்பாய்வு", matching: "AI பொருத்தம்", compliance: "இணக்கம்",
    apply: "இப்போது விண்ணப்பிக்கவும்", save: "சேமிக்கவும்", verified: "சரிபார்க்கப்பட்டது", pending: "நிலுவையில்", listening: "கேட்கிறது…", selectLanguage: "மொழி", logout: "வெளியேறு", switchRole: "மாற்று", sos: "எஸ்ஓஎஸ்", myJobs: "எனது வேலைகள்",
    edit: "திருத்து", cancel: "ரத்து செய்", saveChanges: "மாற்றங்களை சேமிக்கவும்", editProfile: "சுயவிவரத்தை திருத்து", close: "மூடு", add: "சேர்", search: "தேடு", filter: "வடிகட்டி", next: "அடுத்து", prev: "முந்தைய", all: "அனைத்தும்",
    profileUpdated: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது.", fillRequiredFields: "சேமிக்கும் முன் தேவையான அனைத்து புலங்களையும் சரியாக நிரப்பவும்.", requiredField: "இந்த புலம் அவசியம்.", invalidPhone: "சரியான தொலைபேசி எண்ணை உள்ளிடவும்.", invalidWage: "பூஜ்ஜியத்தை விட அதிகமான சரியான ஊதிய தொகையை உள்ளிடவும்.", invalidEmail: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.", invalidGstin: "சரியான ஜிஎஸ்டிஐஎன் உள்ளிடவும்.", invalidNumber: "சரியான எண்ணை உள்ளிடவும்.",
    aiPoweredBadge: "AI-இயங்கும் பொருத்தம் · குரல்-செயல்படும் · 5 மொழிகள்", heroDesc: "இந்தியாவின் தொழிலாளர் சந்தை சரிபார்க்கப்பட்ட நாள்கூலி மற்றும் திறமையான தொழிலாளர்களை நம்பகமான முதலாளிகளுடன் இணைக்கிறது — நியாயமான ஊதியம், பாதுகாப்பு மற்றும் எங்கும் உங்களுடன் வரும் பணி வரலாற்றை மையமாகக் கொண்டது.",
    statVerifiedWorkers: "சரிபார்க்கப்பட்ட தொழிலாளர்கள்", statHiringCompanies: "பணியமர்த்தும் நிறுவனங்கள்", statWagesPaid: "செலுத்தப்பட்ட ஊதியம்",
    continueAs: "இதுவாக தொடரவும்", enterPanel: "பலகத்தில் நுழையவும்", signInAs: "உள்நுழையவும் —", otpDesc: "OTP-அடிப்படையிலான தொலைபேசி உள்நுழைவு அனைத்து படிப்பறிவு நிலைகளுக்கும் பதிவை எளிதாக்குகிறது.", passwordDesc: "முதலாளி / நிர்வாக சான்றுகளுடன் பாதுகாப்பான உள்நுழைவு.",
    mobileNumber: "மொபைல் எண்", workEmail: "பணி மின்னஞ்சல்", otpLabel: "OTP", passwordLabel: "கடவுச்சொல்", continueAsUser: "இதுவாக தொடரவும்", demoNote: "டெமோ கட்டமைப்பு — உண்மையான சான்றுகள் தேவையில்லை. தரவு விளக்கமானது.", back: "பின்செல்",
    roleWorkerTitle: "தொழிலாளி", roleWorkerDesc: "உங்களுக்கு அருகில் சரிபார்க்கப்பட்ட நாள்கூலி மற்றும் திறமையான வேலையை கண்டறியவும், சரியான நேரத்தில் ஊதியம் பெறவும், உங்கள் உரிமைகளை அறியவும்.",
    roleCompanyTitle: "நிறுவனம் / பணியமர்த்துபவர்", roleCompanyDesc: "வேலைகளை பதிவிடவும், AI-பொருத்தமான தொழிலாளர்களை பெறவும், வருகை மற்றும் சம்பளப்பட்டியலை ஒரே இடத்திலிருந்து நிர்வகிக்கவும்.",
    roleAdminTitle: "நிர்வாகி", roleAdminDesc: "கணக்குகளை சரிபார்க்கவும், வேலைகளை ஒப்புதல் அளிக்கவும், மோசடியை கண்காணிக்கவும், தளத்தின் இணக்கத்தை மேற்பார்வையிடவும்.",
    platformAdmin: "தள நிர்வாகி", trustSafetyTeam: "நம்பிக்கை & பாதுகாப்பு குழு", roleLabelWorker: "தொழிலாளி", roleLabelCompany: "நிறுவனம்", roleLabelAdmin: "நிர்வாகி", roleTagWorker: "தொழிலாளி பலகம்", roleTagCompany: "பணியமர்த்துபவர் பலகம்", roleTagAdmin: "நிர்வாக பலகம்",
    thisMonth: "இந்த மாதம்", vsLastMonth: "கடந்த மாதத்தை விட +11%", activeApplications: "செயலில் உள்ள விண்ணப்பங்கள்", totalLifetime: "மொத்தம்", jobsCompletedLabel: "முடிக்கப்பட்ட வேலைகள்", bestAiMatch: "சிறந்த AI பொருத்தம்",
    earningsTrend: "வருவாய் போக்கு", last6Months: "கடந்த 6 மாதங்கள், ₹ இல்", applicationFunnel: "விண்ணப்ப நிலை", whereThingsStand: "தற்போதைய நிலை", nearbyJobsNow: "அருகிலுள்ள வேலைகள் இப்போது", within12kmOf: "12 கிமீ சுற்றளவில்",
    profileDetailsTitle: "சுயவிவர விவரங்கள்", fullName: "முழு பெயர்", primarySkill: "முதன்மை திறமை", experienceLabel: "அனுபவம்", yearsSuffix: "ஆண்டுகள்", cityLabel: "நகரம்", phoneLabel: "தொலைபேசி", languagesSpokenLabel: "பேசும் மொழிகள்", expectedWageLabel: "எதிர்பார்க்கும் ஊதியம்", perDayLabel: "/ நாள்", availabilityLabel: "கிடைக்கும் தன்மை",
    skillsCertifications: "திறமைகள் & சான்றிதழ்கள்", addSkillPlaceholder: "திறமையை சேர்க்கவும், எ.கா. வெல்டிங்", primaryTag: "(முதன்மை)",
    wageTransparency: "ஊதிய வெளிப்படைத்தன்மை", wageTransparencyDesc: "க்கான சராசரி ஊதியம்", wageTransparencyDesc2: "இல்", wageTransparencyDesc3: "கடந்த 30 நாட்களில், WorkHub இல் முடிக்கப்பட்ட வேலைகளின் அடிப்படையில்.", yourRate: "உங்கள் விகிதம்", marketMedian: "சந்தை சராசரி", top10pct: "முதல் 10%",
    voiceRegistrationTitle: "குரல் பதிவு", voiceAssistantLabel: "குரல் உதவியாளர்", voiceRegistrationDesc: "புதிய தொழிலாளர்கள் தங்கள் சொந்த மொழியில், குரல் மூலமாகவே முழுவதுமாக பதிவு செய்யலாம் — தட்டச்சு தேவையில்லை.", speakToUpdateProfile: "சுயவிவரத்தை புதுப்பிக்க பேசவும்", stopListening: "கேட்பதை நிறுத்து", voiceAssistantAvailable: "பதிவு, வேலை தேடல் மற்றும் ஆதரவிற்கு 5 பிராந்திய மொழிகளில் குரல் உதவி கிடைக்கிறது.",
    applyNowLabel: "இப்போது விண்ணப்பிக்கவும்", alreadyApplied: "ஏற்கனவே விண்ணப்பித்தது", aiMatchScoreLabel: "AI பொருத்த மதிப்பெண்",
    noApplicationsYet: "இதுவரை விண்ணப்பங்கள் இல்லை — தொடங்க AI வேலை பரிந்துரைகளை பாருங்கள்.", appliedOnLabel: "விண்ணப்பித்தது",
    totalReceived: "மொத்தம் பெறப்பட்டது", processingLabel: "செயலாக்கத்தில்", paymentProtection: "பணம் பாதுகாப்பு", paymentProtectionSub: "எஸ்க்ரோ-ஆதரவு விநியோகம்", paymentHistory: "பணம் வரலாறு", colDate: "தேதி", colJob: "வேலை", colMethod: "முறை", colAmount: "தொகை", colStatus: "நிலை",
    jobsCompletedStat: "முடிக்கப்பட்ட வேலைகள்", yearsActiveStat: "செயலில் உள்ள ஆண்டுகள்", avgRatingStat: "சராசரி மதிப்பீடு", jobsCompletedOverTime: "காலப்போக்கில் முடிக்கப்பட்ட வேலைகள்", monthlyCompletedEngagements: "மாதாந்திர முடிக்கப்பட்ட பணிகள்", timelineTitle: "காலவரிசை", completedLabel: "முடிந்தது",
    reviewsCountLabel: "மதிப்புரைகள்",
    emergencySupportTitle: "அவசர ஆதரவு", immediateDangerNote: "நீங்கள் உடனடி ஆபத்தில் இருந்தால், முதலில் உள்ளூர் அவசர சேவைகளை தொடர்பு கொள்ளவும்.", sendSosAlert: "எஸ்ஓஎஸ் எச்சரிக்கையை அனுப்பவும்",
    nationalEmergencyLabel: "தேசிய அவசரநிலை", labourHelplineLabel: "தொழிலாளர் உதவி எண்", trustSafetyLabel: "WorkHub நம்பிக்கை & பாதுகாப்பு",
    whatHappensSosTitle: "நீங்கள் எஸ்ஓஎஸ் அனுப்பும்போது என்ன நடக்கும்", sosStep1: "உங்கள் நேரடி இருப்பிடம் மற்றும் தற்போதைய பணி தளம் WorkHub இன் நம்பிக்கை & பாதுகாப்பு குழுவுடன் பகிரப்படும்.", sosStep2: "ஒரு நிர்வாகி உடனடியாக எச்சரிக்கையை மதிப்பாய்வு செய்து அழைப்பு மூலம் உங்களை தொடர்பு கொள்ள முயற்சிக்கிறார்.", sosStep3: "தொடர்பு கொள்ள முடியாவிட்டால், உங்கள் பட்டியலிடப்பட்ட அவசர தொடர்பு மற்றும் உள்ளூர் அதிகாரிகளுக்கு தெரிவிக்கப்படும்.",
    documentOf: "ஆவணம்", documentOfSep: "இல்",
    docAadhaar: "ஆதார் அட்டை", docSkillCert: "திறமை சான்றிதழ் — மின்பணியாளர்", docPoliceVerification: "காவல் சரிபார்ப்பு", docBankPassbook: "வங்கி கணக்கு புத்தகம்", docProfilePhoto: "சுயவிவர புகைப்படம்",
    docNoteGovId: "அரசு அடையாள அட்டை • 12 ஜன 2026 அன்று பதிவேற்றப்பட்டது", docNoteIti: "ஐடிஐ புனே • 2019 இல் வழங்கப்பட்டது", docNoteSubmitted: "01 ஆக 2026 அன்று சமர்ப்பிக்கப்பட்டது", docNoteBank: "ஊதிய வழங்குதலுக்காக", docNotePhoto: "பாஸ்போர்ட் பாணி புகைப்படம்",
    docGst: "ஜிஎஸ்டி சான்றிதழ்", docPan: "நிறுவன பான்", docAddress: "அலுவலக முகவரி ஆதாரம்", docNoteGstSubmit: "04 ஆக 2026 அன்று சமர்ப்பிக்கப்பட்டது", docNotePanVerified: "என்எஸ்டிஎல் வழியாக சரிபார்க்கப்பட்டது", docNoteAwaiting: "மதிப்பாய்வுக்காக காத்திருக்கிறது",
    openJobsLabel: "திறந்த வேலைகள்", activeWorkersLabel: "செயலில் உள்ள தொழிலாளர்கள்", onActiveEngagements: "செயலில் உள்ள பணிகளில்", payrollAug: "சம்பளப்பட்டியல் (ஆக)", acrossAllSites: "அனைத்து தளங்களிலும்", employerRating: "முதலாளி மதிப்பீடு", workerReviewsCount: "தொழிலாளர் மதிப்புரைகள்",
    hiringTrendTitle: "பணியமர்த்தல் போக்கு", postedLabel: "பதிவிடப்பட்டவை", jobsPostedVsHired: "பதிவிடப்பட்ட வேலைகள் மற்றும் பணியமர்த்தப்பட்ட தொழிலாளர்கள்", demandByCategory: "வகை வாரியாக தேவை", platformWideLabel: "தளம் முழுவதும்",
    verifiedBannerTitle: "உங்கள் நிறுவனம் WorkHub இல் சரிபார்க்கப்பட்டது", gstinLabel: "ஜிஎஸ்டிஐஎன்", memberSinceLabel: "உறுப்பினரான தேதி", trustScoreLabel: "நம்பிக்கை மதிப்பெண் 92/100",
    jobDetailsTitle: "வேலை விவரங்கள்", jobTitleLabel: "வேலை தலைப்பு", jobTitlePlaceholder: "எ.கா. தள மின்பணியாளர் தேவை", skillRequiredLabel: "தேவையான திறமை", locationCityLabel: "இடம் (நகரம்)", wagePerDayLabel: "ஊதியம் (₹ / நாள்)", workDurationLabel: "பணி காலம்", durationPlaceholder: "எ.கா. 30 நாட்கள்",
    foodProvidedLabel: "உணவு வழங்கப்படுகிறது", accommodationProvidedLabel: "தங்குமிடம் வழங்கப்படுகிறது", additionalReqLabel: "கூடுதல் தேவைகள்", additionalReqPlaceholder: "தேவையான கருவிகள், ஷிப்ட் நேரம், பாதுகாப்பு உபகரணங்கள் போன்றவை.",
    belowMinWageWarning: "இந்த ஊதியம் மாநில குறைந்தபட்ச ஊதிய வழிகாட்டுதலை விட குறைவாக உள்ளது", belowMinWageWarning2: "குறைந்தபட்ச ஊதியத்திற்கு கீழே உள்ள வேலை பதிவுகள் தானாக தடுக்கப்படும்.",
    postJobBtn: "வேலையை பதிவிடவும் — AI பொருத்தத்தை தொடங்கும்", jobPostedBtn: "வேலை பதிவிடப்பட்டது!", livePreviewTitle: "நேரடி முன்னோட்டம்", yourJobTitlePlaceholder: "உங்கள் வேலை தலைப்பு", yourCompanyPlaceholder: "உங்கள் நிறுவனம்", cityPlaceholder: "நகரம்", durationFallback: "காலம்",
    wageTransparencyCheckTitle: "ஊதிய வெளிப்படைத்தன்மை சரிபார்ப்பு", wageTransparencyCheckDesc: "WorkHub ஒவ்வொரு பதிவிடப்பட்ட ஊதியத்தையும் திறமை மற்றும் நகரத்திற்கான சரிபார்க்கப்பட்ட சந்தை தரவுடன் ஒப்பிடுகிறது, இதனால் தொழிலாளர்கள் விண்ணப்பிக்கும் முன் நியாயமான, வெளிப்படையான சலுகையை காணலாம்.",
    matchesDescBanner: "பொருத்தங்கள் திறமை பொருத்தம், தூரம், ஊதிய சீரமைப்பு, அனுபவம் மற்றும் குறிப்பிட்ட கிடைக்கும் தன்மையின் அடிப்படையில் தரவரிசைப்படுத்தப்படுகின்றன — புதிய தொழிலாளர்கள் பதிவு செய்யும்போது நிகழ்நேரத்தில் புதுப்பிக்கப்படுகின்றன.", messageBtn: "செய்தி", shortlistBtn: "சிறுபட்டியல்",
    stageApplied: "விண்ணப்பித்தது", stageShortlisted: "சிறுபட்டியலிடப்பட்டது", stageHired: "பணியமர்த்தப்பட்டது", stageRejected: "நிராகரிக்கப்பட்டது", nothingHereLabel: "இங்கு எதுவும் இல்லை", advanceBtn: "முன்னேற்று", rejectBtn: "நிராகரி",
    thisWeekAttendance: "இந்த வார வருகை", acrossAllActiveSites: "அனைத்து செயலில் உள்ள தளங்களிலும்", todaysRosterTitle: "இன்றைய பட்டியல் — தள மின்பணியாளர் குழு", colWorker: "தொழிலாளி", colCheckIn: "வருகை", colCheckOut: "வெளியேறுதல்", colStatus2: "நிலை",
    statusPresent: "வந்துள்ளார்", statusLate: "தாமதம்", statusAbsent: "வரவில்லை",
    paidThisMonth: "இந்த மாதம் செலுத்தியது", pendingPayouts: "நிலுவையில் உள்ள கொடுப்பனவுகள்", workersPaidLabel: "பணம் செலுத்தப்பட்ட தொழிலாளர்கள்", recentPayouts: "சமீபத்திய கொடுப்பனவுகள்", contractSuffix: "ஒப்பந்தம்", statusPaid: "செலுத்தப்பட்டது", statusPending2: "நிலுவையில்",
    responsibilitiesBanner: "WorkHub இல் முதலாளிகள் ஒவ்வொரு வேலை பதிவின் ஒரு பகுதியாக இந்த கடமைகளுக்கு ஒப்புக்கொள்கிறார்கள். இணங்காதது இடைநீக்கத்திற்கு வழிவகுக்கும்.",
    companyProfileTitle: "நிறுவன சுயவிவரம்", companyDetailsTitle: "நிறுவன விவரங்கள்", companyNameLabel: "நிறுவனத்தின் பெயர்", industryLabel: "தொழில்துறை", contactEmailLabel: "தொடர்பு மின்னஞ்சல்", contactPhoneLabel: "தொடர்பு தொலைபேசி", aboutCompanyLabel: "நிறுவனத்தைப் பற்றி", aboutPlaceholder: "உங்கள் நிறுவனம், கலாச்சாரம் மற்றும் தள நிலைமைகள் பற்றி தொழிலாளர்களிடம் கூறுங்கள்.",
    jobReqDefaultsTitle: "இயல்புநிலை வேலை தேவைகள்", jobReqDefaultsDesc: "இந்த இயல்புநிலைகள் புதிய வேலை பதிவுகளில் முன்கூட்டியே நிரப்பப்படும், இதனால் உங்கள் பட்டியல்களில் தேவைகள் சீராக இருக்கும்.", defaultWageRangeLabel: "இயல்புநிலை ஊதிய வரம்பு (₹ / நாள்)", preferredSkillsLabel: "விருப்பமான திறமைகள்", standardDurationLabel: "நிலையான ஒப்பந்த காலம்", safetyRequirementsLabel: "பாதுகாப்பு தேவைகள்", safetyReqPlaceholder: "எ.கா. தளத்தில் ஹெல்மெட், ஹார்னெஸ் மற்றும் ஸ்டீல்-டோ பூட்ஸ் கட்டாயம்.",
    totalWorkersLabel: "மொத்த தொழிலாளர்கள்", thisMonthSuffix2: "இந்த மாதம்", companiesLabel2: "நிறுவனங்கள்", openJobsLabel2: "திறந்த வேலைகள்", activeFraudFlagsLabel: "செயலில் உள்ள மோசடி கொடிகள்",
    platformGrowthTitle: "தள வளர்ச்சி", registeredWorkersVsCompanies: "பதிவு செய்யப்பட்ட தொழிலாளர்கள் மற்றும் நிறுவனங்கள்", verificationStatusTitle: "சரிபார்ப்பு நிலை", allAccountsLabel: "அனைத்து கணக்குகள்",
    jobsByCategoryTitle: "வகை வாரியாக வேலைகள்", fraudFlagsRaisedTitle: "எழுப்பப்பட்ட மோசடி கொடிகள்", weeklyLabel: "வாராந்திரம்",
    searchWorkersPlaceholder: "பெயர் அல்லது திறமையால் தொழிலாளர்களை தேடவும்…", colSkill: "திறமை", colCity: "நகரம்", colRating: "மதிப்பீடு", colStatus4: "நிலை",
    verifyBtn: "சரிபார்க்கவும்", rejectBtn2: "நிராகரி",
    noJobsWaiting: "தற்போது ஒப்புதலுக்காக காத்திருக்கும் வேலைகள் இல்லை.", approveBtn: "ஒப்புதல்", rejectNotifyBtn: "நிராகரித்து அறிவிக்கவும்",
    pendingReviewTitle: "மதிப்பாய்வுக்கு நிலுவையில்", approveNameBtn: "ஒப்புதல்", rejectBtn3: "நிராகரி",
    vsLabel: "எதிராக",
    fraudBannerText: "WorkHub இன் AI ஒவ்வொரு வேலை பதிவையும் சுயவிவரத்தையும் மோசடி வடிவங்களுக்காக ஸ்கேன் செய்கிறது — நம்பமுடியாத ஊதியம், தவறான ஜிஎஸ்டிஐஎன், நகல் ஆவணங்கள் மற்றும் தள வெளிப்புற கட்டண கோரிக்கைகள்.", suspendAccountBtn: "கணக்கை இடைநிறுத்து", investigateBtn: "விசாரி", riskScoreLabel: "ஆபத்து மதிப்பெண்",
    factorWeightsTitle: "AI பொருத்த வழிமுறை — காரணி எடைகள்", howEngineScoresDesc: "பரிந்துரை இயந்திரம் ஒரு தொழிலாளி-வேலை ஜோடியை எவ்வாறு மதிப்பிடுகிறது", recentMatchEventsTitle: "சமீபத்திய பொருத்த நிகழ்வுகள்", colWorker4: "தொழிலாளி", colJob3: "வேலை", colMatchScore: "பொருத்த மதிப்பெண்", colOutcome: "முடிவு",
    statusActive: "செயலில்", statusUnderReview: "மதிப்பாய்வில்",
    statusOpen: "திறந்துள்ளது", statusPendingApproval: "ஒப்புதல் நிலுவையில்", statusClosed: "மூடப்பட்டது", statusFlagged: "கொடியிடப்பட்டது", urgentLabel: "அவசரம்", foodLabel: "உணவு", stayLabel: "தங்குமிடம்",
    notificationsTitle: "அறிவிப்புகள்", weekAbbrev: "வாரம்", jobsAppliedSuffix: "விண்ணப்பித்தனர்", jobsSuffix: "வேலைகள்", platformDemoBuild: "WorkHub தளம் · டெமோ கட்டமைப்பு",
    rightsTitle1: "குறைந்தபட்ச ஊதியம்", rightsText1: "ஒவ்வொரு தொழிலாளிக்கும் அவரது திறமை வகைக்கான மாநிலம் அறிவித்த குறைந்தபட்ச ஊதியம் கட்டாயம் வழங்கப்பட வேண்டும் — வாய்மொழி ஒப்பந்தங்கள் இருந்தாலும் இதைவிடக் குறைவாக ஒருபோதும் இல்லை.",
    rightsTitle2: "சரியான நேரத்தில் ஊதியம்", rightsText2: "ஊதியம் ஒப்புக்கொள்ளப்பட்ட அட்டவணையின்படி செலுத்தப்பட வேண்டும். ஒப்புக்கொள்ளப்பட்ட சுழற்சியை மீறிய தாமதங்களை பணம் தாவலில் இருந்து நேரடியாக புகாரளிக்கலாம்.",
    rightsTitle3: "பாதுகாப்பான பணி நிலைமைகள்", rightsText3: "முதலாளிகள் ஆபத்தான வேலைக்கு பாதுகாப்பு உபகரணங்களையும் ஆபத்து இல்லாத தளத்தையும் வழங்க வேண்டும். தண்டனையின்றி பாதுகாப்பற்ற வேலையை நீங்கள் மறுக்கலாம்.",
    rightsTitle4: "எழுத்துப்பூர்வ வேலை நிபந்தனைகள்", rightsText4: "தொடங்கும் முன் தெளிவான நிபந்தனைகள் — ஊதியம், காலம், நேரம், உணவு & தங்குமிடம் — பெற உங்களுக்கு உரிமை உண்டு, இது ஒவ்வொரு வேலை பதிவிலும் காணப்படும்.",
    rightsTitle5: "வாராந்திர ஓய்வு நாள்", rightsText5: "உங்கள் வேலை வகைக்கு ஏற்ப, வாரத்திற்கு குறைந்தது ஒரு ஊதியம் பெறும் அல்லது ஊதியமில்லா ஓய்வு நாளுக்கு உங்களுக்கு உரிமை உண்டு.",
    rightsTitle6: "குறை தீர்வு", rightsText6: "WorkHub இல் தாக்கல் செய்யப்படும் ஒவ்வொரு புகாரும் தீர்வு காலவரையறையுடன் கண்காணிக்கப்படும், தீர்க்கப்படாவிட்டால் நிர்வாக குழுவிற்கு அனுப்பப்படும்.",
    respTitle1: "சரியான நேரத்தில் ஊதியம் செலுத்துங்கள்", respText1: "சரிபார்க்கப்பட்ட, கண்காணிக்கக்கூடிய பணம் செலுத்தும் முறை மூலம் உறுதியளிக்கப்பட்ட சுழற்சியில் ஒப்புக்கொள்ளப்பட்ட ஊதியத்தை வழங்கவும்.",
    respTitle2: "எழுத்துப்பூர்வ ஒப்பந்தத்தை வழங்கவும்", respText2: "பணியமர்த்தலுக்கு முன் வேலை பதிவில் ஊதியம், காலம், நேரம் மற்றும் தள நிலைமைகளை தெளிவாகக் குறிப்பிடவும்.",
    respTitle3: "தள பாதுகாப்பை உறுதி செய்யவும்", respText3: "ஆபத்தான வேலைக்கு பாதுகாப்பு உபகரணங்களை வழங்கி, பாதுகாப்பான, ஆபத்து இல்லாத தளத்தை பராமரிக்கவும்.",
    respTitle4: "ஆவணங்களை பறிமுதல் செய்யக் கூடாது", respText4: "வேலைவாய்ப்பு நிபந்தனையாக தொழிலாளியின் அசல் அடையாள ஆவணங்களை ஒருபோதும் தடுத்து வைக்க வேண்டாம்.",
    respTitle5: "பாகுபாடு இன்மை", respText5: "மதம், சாதி, பாலினம் அல்லது பிராந்தியம் பாராமல் அனைத்து தொழிலாளர்களையும் நியாயமாக பணியமர்த்தி நடத்தவும்.",
    respTitle6: "குறைகளுக்கு பதிலளிக்கவும்", respText6: "தளத்தின் மூலம் எழுப்பப்படும் தொழிலாளர் புகார்களை SLA காலக்கெடுவிற்குள் ஏற்று தீர்க்கவும்.",
    compTitle1: "குறைந்தபட்ச ஊதிய அமலாக்கம்", compText1: "ஒரு திறமை வகைக்கான மாநில குறைந்தபட்ச ஊதியத்திற்கு கீழே உள்ள வேலை பதிவுகள் வெளியிடப்படுவதற்கு முன் தானாக தடுக்கப்படும்.",
    compTitle2: "பாகுபாடு-எதிர்ப்பு கொள்கை", compText2: "வேலை பதிவுகள் மற்றும் பணியமர்த்தல் முடிவுகள் பாகுபாடான மொழி அல்லது அளவுகோல்களுக்காக சரிபார்க்கப்படும்.",
    compTitle3: "மோசடி பூஜ்ஜிய-சகிப்புத்தன்மை", compText3: "2+ உறுதிப்படுத்தப்பட்ட மோசடி புகார்கள் உள்ள நிறுவனங்கள் விசாரணை நிலுவையில் இருக்கும்போது இடைநிறுத்தப்படும்.",
    compTitle4: "தரவு தனியுரிமை", compText4: "தொழிலாளர் ஆவணங்கள் செயலில் உள்ள வேலை சலுகையுடன் சரிபார்க்கப்பட்ட முதலாளிகளுக்கு மட்டுமே தெரியும்.",
    compTitle5: "குறை தீர்வு SLA", compText5: "அனைத்து புகார்களும் 48 மணி நேரத்திற்குள் முதல் பதிலைப் பெற வேண்டும்.",
    compTitle6: "தொழிலாளர் பாதுகாப்பு தரநிலை", compText6: "கட்டுமான வகை வேலை பதிவுகளுக்கு கட்டாய பாதுகாப்பு-உபகரண சரிபார்ப்புப் பட்டியல்.",
    notifViewed: "'வில்லா திட்டத்திற்கான பெயிண்டர்கள்' என்பதற்கான உங்கள் விண்ணப்பத்தை Skyline Constructions பார்த்தது.", notifPaymentCredited: "₹6,300 பணம் உங்கள் கணக்கில் வரவு வைக்கப்பட்டுள்ளது.", notifNewMatch: "புனேவிற்கு அருகில் புதிய வேலை பொருத்தம் கிடைத்தது: கிச்சன் குக், 90% பொருத்தம்.", notifAadhaarApproved: "உங்கள் ஆதார் சரிபார்ப்பு ஒப்புதல் பெற்றது.",
    timeAgo2h: "2 மணி நேரத்திற்கு முன்", timeAgo1d: "1 நாளுக்கு முன்", timeAgo2d: "2 நாட்களுக்கு முன்", timeAgo5d: "5 நாட்களுக்கு முன்",
  },
  bn: {
    appName: "WorkHub", tagline: "যাচাইকৃত কাজ। ন্যায্য মজুরি। আজই নিয়োগ।",
    dashboard: "ড্যাশবোর্ড", profile: "প্রোফাইল", skills: "দক্ষতা", recommendations: "এআই চাকরির সুপারিশ", applications: "আবেদন", payments: "পেমেন্ট", history: "কাজের ইতিহাস", ratings: "রেটিং", emergency: "জরুরি এসওএস", rights: "আপনার অধিকার জানুন", documents: "নথি", notifications: "বিজ্ঞপ্তি",
    postJob: "চাকরি পোস্ট করুন", aiMatches: "এআই শ্রমিক সুপারিশ", hiring: "নিয়োগ প্রক্রিয়া", attendance: "উপস্থিতি", responsibilities: "নিয়োগকর্তার দায়িত্ব",
    workers: "শ্রমিক", companies: "কোম্পানি", approvals: "চাকরি অনুমোদন", verification: "যাচাই সারি", complaints: "অভিযোগ", fraud: "জালিয়াতি সনাক্তকরণ", analytics: "বিশ্লেষণ", matching: "এআই ম্যাচিং", compliance: "সম্মতি",
    apply: "এখনই আবেদন করুন", save: "সংরক্ষণ করুন", verified: "যাচাইকৃত", pending: "মুলতুবি", listening: "শুনছি…", selectLanguage: "ভাষা", logout: "লগ আউট", switchRole: "পরিবর্তন", sos: "এসওএস", myJobs: "আমার কাজ",
    edit: "সম্পাদনা করুন", cancel: "বাতিল করুন", saveChanges: "পরিবর্তন সংরক্ষণ করুন", editProfile: "প্রোফাইল সম্পাদনা করুন", close: "বন্ধ করুন", add: "যোগ করুন", search: "অনুসন্ধান", filter: "ফিল্টার", next: "পরবর্তী", prev: "পূর্ববর্তী", all: "সব",
    profileUpdated: "প্রোফাইল সফলভাবে আপডেট হয়েছে।", fillRequiredFields: "সংরক্ষণ করার আগে অনুগ্রহ করে সমস্ত প্রয়োজনীয় ক্ষেত্র সঠিকভাবে পূরণ করুন।", requiredField: "এই ক্ষেত্রটি আবশ্যক।", invalidPhone: "একটি বৈধ ফোন নম্বর লিখুন।", invalidWage: "শূন্যের চেয়ে বেশি একটি বৈধ মজুরি পরিমাণ লিখুন।", invalidEmail: "একটি বৈধ ইমেইল ঠিকানা লিখুন।", invalidGstin: "একটি বৈধ জিএসটিআইএন লিখুন।", invalidNumber: "একটি বৈধ সংখ্যা লিখুন।",
    aiPoweredBadge: "এআই-চালিত ম্যাচিং · ভয়েস-সক্ষম · 5টি ভাষা", heroDesc: "ভারতের শ্রম বাজার যা যাচাইকৃত দৈনিক মজুরি ও দক্ষ শ্রমিকদের বিশ্বস্ত নিয়োগকর্তাদের সাথে সংযুক্ত করে — ন্যায্য মজুরি, নিরাপত্তা এবং সর্বত্র সঙ্গে থাকা কাজের ইতিহাসের ভিত্তিতে গড়া।",
    statVerifiedWorkers: "যাচাইকৃত শ্রমিক", statHiringCompanies: "নিয়োগকারী কোম্পানি", statWagesPaid: "প্রদত্ত মজুরি",
    continueAs: "হিসাবে চালিয়ে যান", enterPanel: "প্যানেলে প্রবেশ করুন", signInAs: "সাইন ইন করুন —", otpDesc: "ওটিপি-ভিত্তিক ফোন লগইন প্রতিটি সাক্ষরতার স্তরের জন্য নিবন্ধন সহজ করে।", passwordDesc: "নিয়োগকর্তা / অ্যাডমিন প্রমাণপত্র সহ নিরাপদ সাইন-ইন।",
    mobileNumber: "মোবাইল নম্বর", workEmail: "কর্ম ইমেইল", otpLabel: "ওটিপি", passwordLabel: "পাসওয়ার্ড", continueAsUser: "হিসাবে চালিয়ে যান", demoNote: "ডেমো বিল্ড — কোনো প্রকৃত প্রমাণপত্র প্রয়োজন নেই। তথ্য দৃষ্টান্তমূলক।", back: "ফিরে যান",
    roleWorkerTitle: "শ্রমিক", roleWorkerDesc: "আপনার কাছাকাছি যাচাইকৃত দৈনিক মজুরি ও দক্ষ কাজ খুঁজুন, সময়মতো অর্থ পান, আপনার অধিকার জানুন।",
    roleCompanyTitle: "কোম্পানি / নিয়োগকর্তা", roleCompanyDesc: "চাকরি পোস্ট করুন, এআই-মিলিত শ্রমিক পান, উপস্থিতি ও বেতন এক জায়গা থেকে পরিচালনা করুন।",
    roleAdminTitle: "অ্যাডমিন", roleAdminDesc: "অ্যাকাউন্ট যাচাই করুন, চাকরি অনুমোদন করুন, জালিয়াতি পর্যবেক্ষণ করুন এবং প্ল্যাটফর্মের সম্মতি তদারকি করুন।",
    platformAdmin: "প্ল্যাটফর্ম অ্যাডমিন", trustSafetyTeam: "ট্রাস্ট অ্যান্ড সেফটি টিম", roleLabelWorker: "শ্রমিক", roleLabelCompany: "কোম্পানি", roleLabelAdmin: "অ্যাডমিন", roleTagWorker: "শ্রমিক প্যানেল", roleTagCompany: "নিয়োগকর্তা প্যানেল", roleTagAdmin: "অ্যাডমিন প্যানেল",
    thisMonth: "এই মাসে", vsLastMonth: "গত মাসের তুলনায় +11%", activeApplications: "সক্রিয় আবেদন", totalLifetime: "মোট আজীবন", jobsCompletedLabel: "সম্পন্ন কাজ", bestAiMatch: "সেরা এআই ম্যাচ",
    earningsTrend: "উপার্জনের প্রবণতা", last6Months: "গত 6 মাস, ₹ তে", applicationFunnel: "আবেদন ফানেল", whereThingsStand: "বর্তমান অবস্থা", nearbyJobsNow: "এখন কাছাকাছি চাকরি", within12kmOf: "12 কিমি এর মধ্যে",
    profileDetailsTitle: "প্রোফাইল বিবরণ", fullName: "পুরো নাম", primarySkill: "প্রধান দক্ষতা", experienceLabel: "অভিজ্ঞতা", yearsSuffix: "বছর", cityLabel: "শহর", phoneLabel: "ফোন", languagesSpokenLabel: "কথ্য ভাষা", expectedWageLabel: "প্রত্যাশিত মজুরি", perDayLabel: "/ দিন", availabilityLabel: "প্রাপ্যতা",
    skillsCertifications: "দক্ষতা ও সনদপত্র", addSkillPlaceholder: "একটি দক্ষতা যোগ করুন, যেমন ওয়েল্ডিং", primaryTag: "(প্রধান)",
    wageTransparency: "মজুরি স্বচ্ছতা", wageTransparencyDesc: "এর জন্য গড় মজুরি", wageTransparencyDesc2: "এ", wageTransparencyDesc3: "গত 30 দিনে, WorkHub-এ সম্পন্ন কাজের ভিত্তিতে।", yourRate: "আপনার হার", marketMedian: "বাজার গড়", top10pct: "শীর্ষ 10%",
    voiceRegistrationTitle: "ভয়েস নিবন্ধন", voiceAssistantLabel: "ভয়েস সহায়ক", voiceRegistrationDesc: "নতুন শ্রমিকরা তাদের নিজস্ব ভাষায়, শুধুমাত্র ভয়েস দিয়েই সম্পূর্ণ নিবন্ধন করতে পারেন — টাইপ করার প্রয়োজন নেই।", speakToUpdateProfile: "প্রোফাইল আপডেট করতে কথা বলুন", stopListening: "শোনা বন্ধ করুন", voiceAssistantAvailable: "নিবন্ধন, চাকরি অনুসন্ধান এবং সহায়তার জন্য 5টি আঞ্চলিক ভাষায় ভয়েস সহায়তা উপলব্ধ।",
    applyNowLabel: "এখনই আবেদন করুন", alreadyApplied: "ইতিমধ্যে আবেদন করা হয়েছে", aiMatchScoreLabel: "এআই ম্যাচ স্কোর",
    noApplicationsYet: "এখনও কোনো আবেদন নেই — শুরু করতে এআই চাকরির সুপারিশ দেখুন।", appliedOnLabel: "আবেদন করেছেন",
    totalReceived: "মোট প্রাপ্ত", processingLabel: "প্রক্রিয়াধীন", paymentProtection: "পেমেন্ট সুরক্ষা", paymentProtectionSub: "এসক্রো-সমর্থিত বিতরণ", paymentHistory: "পেমেন্ট ইতিহাস", colDate: "তারিখ", colJob: "চাকরি", colMethod: "পদ্ধতি", colAmount: "পরিমাণ", colStatus: "অবস্থা",
    jobsCompletedStat: "সম্পন্ন কাজ", yearsActiveStat: "সক্রিয় বছর", avgRatingStat: "গড় রেটিং", jobsCompletedOverTime: "সময়ের সাথে সম্পন্ন কাজ", monthlyCompletedEngagements: "মাসিক সম্পন্ন কাজ", timelineTitle: "টাইমলাইন", completedLabel: "সম্পন্ন",
    reviewsCountLabel: "পর্যালোচনা",
    emergencySupportTitle: "জরুরি সহায়তা", immediateDangerNote: "আপনি তাৎক্ষণিক বিপদে থাকলে, প্রথমে স্থানীয় জরুরি পরিষেবার সাথে যোগাযোগ করুন।", sendSosAlert: "এসওএস সতর্কতা পাঠান",
    nationalEmergencyLabel: "জাতীয় জরুরি", labourHelplineLabel: "শ্রম হেল্পলাইন", trustSafetyLabel: "WorkHub ট্রাস্ট অ্যান্ড সেফটি",
    whatHappensSosTitle: "আপনি এসওএস পাঠালে কী ঘটে", sosStep1: "আপনার লাইভ অবস্থান এবং বর্তমান কাজের স্থান WorkHub-এর ট্রাস্ট অ্যান্ড সেফটি টিমের সাথে শেয়ার করা হয়।", sosStep2: "একজন অ্যাডমিন অবিলম্বে সতর্কতা পর্যালোচনা করেন এবং কল করে আপনার সাথে যোগাযোগের চেষ্টা করেন।", sosStep3: "যোগাযোগ করা না গেলে, আপনার তালিকাভুক্ত জরুরি যোগাযোগ এবং স্থানীয় কর্তৃপক্ষকে জানানো হয়।",
    documentOf: "নথি", documentOfSep: "এর মধ্যে",
    docAadhaar: "আধার কার্ড", docSkillCert: "দক্ষতা সনদ — ইলেকট্রিশিয়ান", docPoliceVerification: "পুলিশ যাচাই", docBankPassbook: "ব্যাংক পাসবই", docProfilePhoto: "প্রোফাইল ছবি",
    docNoteGovId: "সরকারি পরিচয়পত্র • 12 জানুয়ারি 2026-এ আপলোড করা হয়েছে", docNoteIti: "আইটিআই পুনে • 2019-এ প্রদত্ত", docNoteSubmitted: "01 আগস্ট 2026-এ জমা দেওয়া হয়েছে", docNoteBank: "মজুরি বিতরণের জন্য", docNotePhoto: "পাসপোর্ট-স্টাইল ছবি",
    docGst: "জিএসটি সনদ", docPan: "কোম্পানি প্যান", docAddress: "অফিস ঠিকানা প্রমাণ", docNoteGstSubmit: "04 আগস্ট 2026-এ জমা দেওয়া হয়েছে", docNotePanVerified: "এনএসডিএল-এর মাধ্যমে যাচাইকৃত", docNoteAwaiting: "পর্যালোচনার অপেক্ষায়",
    openJobsLabel: "খোলা চাকরি", activeWorkersLabel: "সক্রিয় শ্রমিক", onActiveEngagements: "সক্রিয় কাজে", payrollAug: "বেতন (আগস্ট)", acrossAllSites: "সমস্ত সাইট জুড়ে", employerRating: "নিয়োগকর্তা রেটিং", workerReviewsCount: "শ্রমিক পর্যালোচনা",
    hiringTrendTitle: "নিয়োগ প্রবণতা", postedLabel: "পোস্ট করা হয়েছে", jobsPostedVsHired: "পোস্ট করা চাকরি বনাম নিয়োগপ্রাপ্ত শ্রমিক", demandByCategory: "বিভাগ অনুযায়ী চাহিদা", platformWideLabel: "প্ল্যাটফর্ম জুড়ে",
    verifiedBannerTitle: "আপনার কোম্পানি WorkHub-এ যাচাইকৃত", gstinLabel: "জিএসটিআইএন", memberSinceLabel: "সদস্য হওয়ার তারিখ", trustScoreLabel: "ট্রাস্ট স্কোর 92/100",
    jobDetailsTitle: "চাকরির বিবরণ", jobTitleLabel: "চাকরির শিরোনাম", jobTitlePlaceholder: "যেমন সাইট ইলেকট্রিশিয়ান প্রয়োজন", skillRequiredLabel: "প্রয়োজনীয় দক্ষতা", locationCityLabel: "অবস্থান (শহর)", wagePerDayLabel: "মজুরি (₹ / দিন)", workDurationLabel: "কাজের মেয়াদ", durationPlaceholder: "যেমন 30 দিন",
    foodProvidedLabel: "খাবার প্রদান করা হয়", accommodationProvidedLabel: "থাকার ব্যবস্থা প্রদান করা হয়", additionalReqLabel: "অতিরিক্ত প্রয়োজনীয়তা", additionalReqPlaceholder: "প্রয়োজনীয় সরঞ্জাম, শিফটের সময়, নিরাপত্তা সরঞ্জাম ইত্যাদি।",
    belowMinWageWarning: "এই মজুরি রাজ্যের ন্যূনতম মজুরি নির্দেশিকার চেয়ে কম", belowMinWageWarning2: "ন্যূনতম মজুরির নিচে চাকরির পোস্ট স্বয়ংক্রিয়ভাবে ব্লক করা হয়।",
    postJobBtn: "চাকরি পোস্ট করুন — এআই ম্যাচিং শুরু করবে", jobPostedBtn: "চাকরি পোস্ট হয়েছে!", livePreviewTitle: "লাইভ প্রিভিউ", yourJobTitlePlaceholder: "আপনার চাকরির শিরোনাম", yourCompanyPlaceholder: "আপনার কোম্পানি", cityPlaceholder: "শহর", durationFallback: "মেয়াদ",
    wageTransparencyCheckTitle: "মজুরি স্বচ্ছতা পরীক্ষা", wageTransparencyCheckDesc: "WorkHub প্রতিটি পোস্ট করা মজুরিকে দক্ষতা ও শহরের জন্য যাচাইকৃত বাজার তথ্যের সাথে তুলনা করে, যাতে শ্রমিকরা আবেদনের আগে একটি ন্যায্য, স্বচ্ছ প্রস্তাব দেখতে পান।",
    matchesDescBanner: "দক্ষতা মিল, দূরত্ব, মজুরি সামঞ্জস্য, অভিজ্ঞতা এবং উল্লিখিত প্রাপ্যতার ভিত্তিতে ম্যাচগুলি র‍্যাঙ্ক করা হয় — নতুন শ্রমিকরা নিবন্ধন করার সাথে সাথে রিয়েল-টাইমে আপডেট হয়।", messageBtn: "বার্তা", shortlistBtn: "শর্টলিস্ট",
    stageApplied: "আবেদন করেছেন", stageShortlisted: "শর্টলিস্ট হয়েছে", stageHired: "নিয়োগপ্রাপ্ত", stageRejected: "প্রত্যাখ্যাত", nothingHereLabel: "এখানে কিছু নেই", advanceBtn: "এগিয়ে নিন", rejectBtn: "প্রত্যাখ্যান করুন",
    thisWeekAttendance: "এই সপ্তাহের উপস্থিতি", acrossAllActiveSites: "সমস্ত সক্রিয় সাইট জুড়ে", todaysRosterTitle: "আজকের রোস্টার — সাইট ইলেকট্রিশিয়ান দল", colWorker: "শ্রমিক", colCheckIn: "চেক-ইন", colCheckOut: "চেক-আউট", colStatus2: "অবস্থা",
    statusPresent: "উপস্থিত", statusLate: "দেরি", statusAbsent: "অনুপস্থিত",
    paidThisMonth: "এই মাসে প্রদত্ত", pendingPayouts: "মুলতুবি পরিশোধ", workersPaidLabel: "প্রদত্ত শ্রমিক", recentPayouts: "সাম্প্রতিক পরিশোধ", contractSuffix: "চুক্তি", statusPaid: "প্রদত্ত", statusPending2: "মুলতুবি",
    responsibilitiesBanner: "WorkHub-এ নিয়োগকর্তারা প্রতিটি চাকরির পোস্টিংয়ের অংশ হিসাবে এই দায়িত্বগুলিতে সম্মত হন। মেনে না চললে স্থগিতাদেশ হতে পারে।",
    companyProfileTitle: "কোম্পানি প্রোফাইল", companyDetailsTitle: "কোম্পানির বিবরণ", companyNameLabel: "কোম্পানির নাম", industryLabel: "শিল্প", contactEmailLabel: "যোগাযোগ ইমেইল", contactPhoneLabel: "যোগাযোগ ফোন", aboutCompanyLabel: "কোম্পানি সম্পর্কে", aboutPlaceholder: "শ্রমিকদের আপনার কোম্পানি, সংস্কৃতি এবং সাইটের অবস্থা সম্পর্কে বলুন।",
    jobReqDefaultsTitle: "ডিফল্ট চাকরির প্রয়োজনীয়তা", jobReqDefaultsDesc: "এই ডিফল্টগুলি নতুন চাকরির পোস্টে আগে থেকে পূরণ করা থাকে যাতে আপনার সমস্ত তালিকায় প্রয়োজনীয়তা সামঞ্জস্যপূর্ণ থাকে।", defaultWageRangeLabel: "ডিফল্ট মজুরি পরিসীমা (₹ / দিন)", preferredSkillsLabel: "পছন্দের দক্ষতা", standardDurationLabel: "মানক চুক্তির মেয়াদ", safetyRequirementsLabel: "নিরাপত্তা প্রয়োজনীয়তা", safetyReqPlaceholder: "যেমন সাইটে হেলমেট, হার্নেস এবং স্টিল-টো বুট বাধ্যতামূলক।",
    totalWorkersLabel: "মোট শ্রমিক", thisMonthSuffix2: "এই মাসে", companiesLabel2: "কোম্পানি", openJobsLabel2: "খোলা চাকরি", activeFraudFlagsLabel: "সক্রিয় জালিয়াতি ফ্ল্যাগ",
    platformGrowthTitle: "প্ল্যাটফর্ম প্রবৃদ্ধি", registeredWorkersVsCompanies: "নিবন্ধিত শ্রমিক বনাম কোম্পানি", verificationStatusTitle: "যাচাই অবস্থা", allAccountsLabel: "সমস্ত অ্যাকাউন্ট",
    jobsByCategoryTitle: "বিভাগ অনুযায়ী চাকরি", fraudFlagsRaisedTitle: "উত্থাপিত জালিয়াতি ফ্ল্যাগ", weeklyLabel: "সাপ্তাহিক",
    searchWorkersPlaceholder: "নাম বা দক্ষতা দিয়ে শ্রমিক খুঁজুন…", colSkill: "দক্ষতা", colCity: "শহর", colRating: "রেটিং", colStatus4: "অবস্থা",
    verifyBtn: "যাচাই করুন", rejectBtn2: "প্রত্যাখ্যান করুন",
    noJobsWaiting: "এই মুহূর্তে অনুমোদনের জন্য কোনো চাকরি অপেক্ষমাণ নেই।", approveBtn: "অনুমোদন করুন", rejectNotifyBtn: "প্রত্যাখ্যান করুন ও জানান",
    pendingReviewTitle: "পর্যালোচনার জন্য মুলতুবি", approveNameBtn: "অনুমোদন করুন", rejectBtn3: "প্রত্যাখ্যান করুন",
    vsLabel: "বনাম",
    fraudBannerText: "WorkHub-এর এআই প্রতিটি চাকরির পোস্ট ও প্রোফাইল জালিয়াতির প্যাটার্নের জন্য স্ক্যান করে — অবাস্তব মজুরি, অবৈধ জিএসটিআইএন, নকল নথি এবং প্ল্যাটফর্মের বাইরের পেমেন্ট অনুরোধ।", suspendAccountBtn: "অ্যাকাউন্ট স্থগিত করুন", investigateBtn: "তদন্ত করুন", riskScoreLabel: "ঝুঁকি স্কোর",
    factorWeightsTitle: "এআই ম্যাচিং অ্যালগরিদম — ফ্যাক্টর ওয়েট", howEngineScoresDesc: "সুপারিশ ইঞ্জিন কীভাবে একটি শ্রমিক-চাকরি জোড়াকে স্কোর করে", recentMatchEventsTitle: "সাম্প্রতিক ম্যাচ ইভেন্ট", colWorker4: "শ্রমিক", colJob3: "চাকরি", colMatchScore: "ম্যাচ স্কোর", colOutcome: "ফলাফল",
    statusActive: "সক্রিয়", statusUnderReview: "পর্যালোচনাধীন",
    statusOpen: "খোলা", statusPendingApproval: "অনুমোদন মুলতুবি", statusClosed: "বন্ধ", statusFlagged: "ফ্ল্যাগ করা হয়েছে", urgentLabel: "জরুরি", foodLabel: "খাবার", stayLabel: "থাকার ব্যবস্থা",
    notificationsTitle: "বিজ্ঞপ্তি", weekAbbrev: "সপ্তাহ", jobsAppliedSuffix: "আবেদন করেছেন", jobsSuffix: "চাকরি", platformDemoBuild: "WorkHub প্ল্যাটফর্ম · ডেমো বিল্ড",
    rightsTitle1: "ন্যূনতম মজুরি", rightsText1: "প্রতিটি শ্রমিককে তাদের দক্ষতা বিভাগের জন্য রাজ্য-বিজ্ঞপ্তিত ন্যূনতম মজুরি অবশ্যই দিতে হবে — মৌখিক চুক্তি সত্ত্বেও এর চেয়ে কম কখনোই নয়।",
    rightsTitle2: "সময়মতো পরিশোধ", rightsText2: "সম্মত সময়সূচী অনুযায়ী মজুরি পরিশোধ করতে হবে। সম্মত চক্রের বাইরে বিলম্ব পেমেন্ট ট্যাব থেকে সরাসরি রিপোর্ট করা যায়।",
    rightsTitle3: "নিরাপদ কাজের পরিবেশ", rightsText3: "নিয়োগকর্তাদের বিপজ্জনক কাজের জন্য নিরাপত্তা সরঞ্জাম এবং ঝুঁকিমুক্ত সাইট প্রদান করতে হবে। আপনি জরিমানা ছাড়াই অনিরাপদ কাজ প্রত্যাখ্যান করতে পারেন।",
    rightsTitle4: "লিখিত চাকরির শর্তাবলী", rightsText4: "শুরু করার আগে আপনি স্পষ্ট শর্তাবলী — মজুরি, মেয়াদ, ঘণ্টা, খাবার ও থাকার ব্যবস্থা — পাওয়ার অধিকারী, যা প্রতিটি চাকরির পোস্টে দৃশ্যমান।",
    rightsTitle5: "সাপ্তাহিক বিশ্রামের দিন", rightsText5: "আপনার কাজের বিভাগ অনুযায়ী, আপনি সপ্তাহে অন্তত একটি বেতনসহ বা বেতনহীন বিশ্রামের দিন পাওয়ার অধিকারী।",
    rightsTitle6: "অভিযোগ নিষ্পত্তি", rightsText6: "WorkHub-এ দাখিল করা প্রতিটি অভিযোগ একটি সমাধানের সময়সীমা সহ ট্র্যাক করা হয় এবং সমাধান না হলে অ্যাডমিন দলে পাঠানো হয়।",
    respTitle1: "সময়মতো মজুরি প্রদান করুন", respText1: "একটি যাচাইকৃত, ট্রেসযোগ্য পেমেন্ট পদ্ধতির মাধ্যমে প্রতিশ্রুত চক্রে সম্মত মজুরি বিতরণ করুন।",
    respTitle2: "একটি লিখিত চুক্তি প্রদান করুন", respText2: "নিয়োগের আগে চাকরির পোস্টে মজুরি, মেয়াদ, ঘণ্টা এবং সাইটের অবস্থা স্পষ্টভাবে উল্লেখ করুন।",
    respTitle3: "সাইট নিরাপত্তা নিশ্চিত করুন", respText3: "বিপজ্জনক কাজের জন্য প্রতিরক্ষামূলক সরঞ্জাম সরবরাহ করুন এবং একটি নিরাপদ, ঝুঁকিমুক্ত সাইট বজায় রাখুন।",
    respTitle4: "নথি আটকে রাখা নিষিদ্ধ", respText4: "কর্মসংস্থানের শর্ত হিসাবে কখনো শ্রমিকের মূল পরিচয় নথি আটকে রাখবেন না।",
    respTitle5: "বৈষম্যহীনতা", respText5: "ধর্ম, বর্ণ, লিঙ্গ বা অঞ্চল নির্বিশেষে সমস্ত শ্রমিককে ন্যায্যভাবে নিয়োগ ও আচরণ করুন।",
    respTitle6: "অভিযোগের জবাব দিন", respText6: "প্ল্যাটফর্মের মাধ্যমে উত্থাপিত শ্রমিকদের অভিযোগ SLA উইন্ডোর মধ্যে স্বীকার করুন ও সমাধান করুন।",
    compTitle1: "ন্যূনতম মজুরি প্রয়োগ", compText1: "একটি দক্ষতা বিভাগের জন্য রাজ্যের ন্যূনতম মজুরির নিচে চাকরির পোস্ট প্রকাশের আগে স্বয়ংক্রিয়ভাবে ব্লক করা হয়।",
    compTitle2: "বৈষম্য-বিরোধী নীতি", compText2: "চাকরির পোস্ট এবং নিয়োগের সিদ্ধান্তগুলি বৈষম্যমূলক ভাষা বা মানদণ্ডের জন্য পরীক্ষা করা হয়।",
    compTitle3: "জালিয়াতি শূন্য-সহনশীলতা", compText3: "2+ নিশ্চিত জালিয়াতি রিপোর্ট সহ কোম্পানিগুলি তদন্ত মুলতুবি থাকাকালীন স্থগিত করা হয়।",
    compTitle4: "তথ্য গোপনীয়তা", compText4: "শ্রমিকদের নথি শুধুমাত্র সক্রিয় চাকরির অফার সহ যাচাইকৃত নিয়োগকর্তাদের কাছে দৃশ্যমান।",
    compTitle5: "অভিযোগ নিষ্পত্তি SLA", compText5: "সমস্ত অভিযোগের 48 ঘণ্টার মধ্যে প্রথম প্রতিক্রিয়া পেতে হবে।",
    compTitle6: "শ্রমিক নিরাপত্তা মান", compText6: "নির্মাণ-বিভাগের চাকরির পোস্টের জন্য বাধ্যতামূলক নিরাপত্তা-সরঞ্জাম চেকলিস্ট।",
    notifViewed: "'ভিলা প্রকল্পের জন্য রংমিস্ত্রি' এর জন্য আপনার আবেদন Skyline Constructions দেখেছে।", notifPaymentCredited: "₹6,300 পেমেন্ট আপনার অ্যাকাউন্টে জমা হয়েছে।", notifNewMatch: "পুনের কাছে নতুন চাকরির ম্যাচ পাওয়া গেছে: কিচেন কুক, 90% ম্যাচ।", notifAadhaarApproved: "আপনার আধার যাচাই অনুমোদিত হয়েছে।",
    timeAgo2h: "2 ঘণ্টা আগে", timeAgo1d: "1 দিন আগে", timeAgo2d: "2 দিন আগে", timeAgo5d: "5 দিন আগে",
  },
};

function makeT(lang) {
  return (key) => TRANSLATIONS[lang]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}

const VOICE_PROMPTS = {
  en: "Please tell me your name, skill, and city to register.",
  hi: "कृपया पंजीकरण के लिए अपना नाम, कौशल और शहर बताएं।",
  mr: "कृपया नोंदणीसाठी तुमचे नाव, कौशल्य आणि शहर सांगा.",
  ta: "பதிவு செய்ய உங்கள் பெயர், திறமை மற்றும் நகரத்தை சொல்லுங்கள்.",
  bn: "নিবন্ধনের জন্য আপনার নাম, দক্ষতা এবং শহর বলুন।",
};

/* ---- Skill / status / calendar label maps — translate structural enum
   values from the mock data without touching proper nouns or free text. ---- */
const SKILL_LABELS = {
  en: { Electrician: "Electrician", Mason: "Mason", Plumber: "Plumber", Painter: "Painter", Driver: "Driver", Carpenter: "Carpenter", "Construction Labour": "Construction Labour", "Domestic Help": "Domestic Help", "Security Guard": "Security Guard", Cook: "Cook" },
  hi: { Electrician: "इलेक्ट्रीशियन", Mason: "राजमिस्त्री", Plumber: "प्लंबर", Painter: "पेंटर", Driver: "ड्राइवर", Carpenter: "बढ़ई", "Construction Labour": "निर्माण श्रमिक", "Domestic Help": "घरेलू सहायक", "Security Guard": "सुरक्षा गार्ड", Cook: "रसोइया" },
  mr: { Electrician: "इलेक्ट्रिशियन", Mason: "गवंडी", Plumber: "प्लंबर", Painter: "पेंटर", Driver: "चालक", Carpenter: "सुतार", "Construction Labour": "बांधकाम कामगार", "Domestic Help": "घरगुती मदतनीस", "Security Guard": "सुरक्षा रक्षक", Cook: "स्वयंपाकी" },
  ta: { Electrician: "மின்பணியாளர்", Mason: "கொத்தனார்", Plumber: "குழாய் பணியாளர்", Painter: "பெயின்டர்", Driver: "ஓட்டுநர்", Carpenter: "தச்சர்", "Construction Labour": "கட்டுமான தொழிலாளி", "Domestic Help": "வீட்டு உதவியாளர்", "Security Guard": "பாதுகாப்பு காவலர்", Cook: "சமையல்காரர்" },
  bn: { Electrician: "ইলেকট্রিশিয়ান", Mason: "রাজমিস্ত্রি", Plumber: "প্লাম্বার", Painter: "রংমিস্ত্রি", Driver: "চালক", Carpenter: "কাঠমিস্ত্রি", "Construction Labour": "নির্মাণ শ্রমিক", "Domestic Help": "গৃহকর্মী", "Security Guard": "নিরাপত্তারক্ষী", Cook: "রাঁধুনি" },
};
function skillLabel(skill, lang) { return SKILL_LABELS[lang]?.[skill] ?? SKILL_LABELS.en[skill] ?? skill; }

const STATUS_LABELS = {
  en: { Open: "Open", "Pending Approval": "Pending Approval", Closed: "Closed", Flagged: "Flagged", Verified: "Verified", Pending: "Pending", Present: "Present", Late: "Late", Absent: "Absent", Applied: "Applied", Shortlisted: "Shortlisted", Hired: "Hired", Rejected: "Rejected", Investigating: "Investigating", Resolved: "Resolved", Paid: "Paid", Processing: "Processing", Active: "Active", "Under Review": "Under Review", High: "High", Medium: "Medium", Low: "Low", Immediate: "Immediate" },
  hi: { Open: "खुला", "Pending Approval": "अनुमोदन लंबित", Closed: "बंद", Flagged: "फ़्लैग किया गया", Verified: "सत्यापित", Pending: "लंबित", Present: "उपस्थित", Late: "देर से", Absent: "अनुपस्थित", Applied: "आवेदन किया", Shortlisted: "शॉर्टलिस्ट किया", Hired: "नियुक्त", Rejected: "अस्वीकृत", Investigating: "जांच जारी", Resolved: "सुलझाया गया", Paid: "भुगतान किया गया", Processing: "प्रक्रियाधीन", Active: "सक्रिय", "Under Review": "समीक्षाधीन", High: "उच्च", Medium: "मध्यम", Low: "निम्न", Immediate: "तत्काल" },
  mr: { Open: "खुली", "Pending Approval": "मंजुरी प्रलंबित", Closed: "बंद", Flagged: "फ्लॅग केले", Verified: "सत्यापित", Pending: "प्रलंबित", Present: "उपस्थित", Late: "उशीरा", Absent: "अनुपस्थित", Applied: "अर्ज केला", Shortlisted: "शॉर्टलिस्ट केले", Hired: "नियुक्त", Rejected: "नाकारले", Investigating: "तपासात", Resolved: "निकाली", Paid: "दिले", Processing: "प्रक्रियेत", Active: "सक्रिय", "Under Review": "आढाव्याखाली", High: "उच्च", Medium: "मध्यम", Low: "कमी", Immediate: "तातडीने" },
  ta: { Open: "திறந்துள்ளது", "Pending Approval": "ஒப்புதல் நிலுவையில்", Closed: "மூடப்பட்டது", Flagged: "கொடியிடப்பட்டது", Verified: "சரிபார்க்கப்பட்டது", Pending: "நிலுவையில்", Present: "வந்துள்ளார்", Late: "தாமதம்", Absent: "வரவில்லை", Applied: "விண்ணப்பித்தது", Shortlisted: "சிறுபட்டியலிடப்பட்டது", Hired: "பணியமர்த்தப்பட்டது", Rejected: "நிராகரிக்கப்பட்டது", Investigating: "விசாரணையில்", Resolved: "தீர்க்கப்பட்டது", Paid: "செலுத்தப்பட்டது", Processing: "செயலாக்கத்தில்", Active: "செயலில்", "Under Review": "மதிப்பாய்வில்", High: "அதிகம்", Medium: "நடுத்தரம்", Low: "குறைவு", Immediate: "உடனடி" },
  bn: { Open: "খোলা", "Pending Approval": "অনুমোদন মুলতুবি", Closed: "বন্ধ", Flagged: "ফ্ল্যাগ করা", Verified: "যাচাইকৃত", Pending: "মুলতুবি", Present: "উপস্থিত", Late: "দেরি", Absent: "অনুপস্থিত", Applied: "আবেদন করেছেন", Shortlisted: "শর্টলিস্ট হয়েছে", Hired: "নিয়োগপ্রাপ্ত", Rejected: "প্রত্যাখ্যাত", Investigating: "তদন্তাধীন", Resolved: "সমাধান হয়েছে", Paid: "প্রদত্ত", Processing: "প্রক্রিয়াধীন", Active: "সক্রিয়", "Under Review": "পর্যালোচনাধীন", High: "উচ্চ", Medium: "মাঝারি", Low: "নিম্ন", Immediate: "তাৎক্ষণিক" },
};
function statusLabel(status, lang) { return STATUS_LABELS[lang]?.[status] ?? STATUS_LABELS.en[status] ?? status; }

const DAY_LABELS = {
  en: { Mon: "Mon", Tue: "Tue", Wed: "Wed", Thu: "Thu", Fri: "Fri", Sat: "Sat" },
  hi: { Mon: "सोम", Tue: "मंगल", Wed: "बुध", Thu: "गुरु", Fri: "शुक्र", Sat: "शनि" },
  mr: { Mon: "सोम", Tue: "मंगळ", Wed: "बुध", Thu: "गुरु", Fri: "शुक्र", Sat: "शनि" },
  ta: { Mon: "தி", Tue: "செ", Wed: "பு", Thu: "வி", Fri: "வெ", Sat: "ச" },
  bn: { Mon: "সোম", Tue: "মঙ্গল", Wed: "বুধ", Thu: "বৃহ", Fri: "শুক্র", Sat: "শনি" },
};
function dayLabel(d, lang) { return DAY_LABELS[lang]?.[d] ?? DAY_LABELS.en[d] ?? d; }

const MONTH_LABELS = {
  en: { Mar: "Mar", Apr: "Apr", May: "May", Jun: "Jun", Jul: "Jul", Aug: "Aug" },
  hi: { Mar: "मार्च", Apr: "अप्रैल", May: "मई", Jun: "जून", Jul: "जुलाई", Aug: "अगस्त" },
  mr: { Mar: "मार्च", Apr: "एप्रिल", May: "मे", Jun: "जून", Jul: "जुलै", Aug: "ऑगस्ट" },
  ta: { Mar: "மார்", Apr: "ஏப்", May: "மே", Jun: "ஜூன்", Jul: "ஜூலை", Aug: "ஆக" },
  bn: { Mar: "মার্চ", Apr: "এপ্রিল", May: "মে", Jun: "জুন", Jul: "জুলাই", Aug: "আগস্ট" },
};
function monthLabel(m, lang) { return MONTH_LABELS[lang]?.[m] ?? MONTH_LABELS.en[m] ?? m; }
function weekLabel(w, lang) { const t = makeT(lang); return `${t("weekAbbrev")} ${String(w).replace(/^W/, "")}`; }

const CATEGORY_LABELS = {
  en: { Construction: "Construction", Domestic: "Domestic", Logistics: "Logistics", Hospitality: "Hospitality", "Facility Mgmt": "Facility Mgmt" },
  hi: { Construction: "निर्माण", Domestic: "घरेलू", Logistics: "लॉजिस्टिक्स", Hospitality: "आतिथ्य", "Facility Mgmt": "सुविधा प्रबंधन" },
  mr: { Construction: "बांधकाम", Domestic: "घरगुती", Logistics: "लॉजिस्टिक्स", Hospitality: "आदरातिथ्य", "Facility Mgmt": "सुविधा व्यवस्थापन" },
  ta: { Construction: "கட்டுமானம்", Domestic: "வீட்டு", Logistics: "தளவாடம்", Hospitality: "விருந்தோம்பல்", "Facility Mgmt": "வசதி மேலாண்மை" },
  bn: { Construction: "নির্মাণ", Domestic: "গৃহস্থালি", Logistics: "লজিস্টিকস", Hospitality: "আতিথেয়তা", "Facility Mgmt": "সুবিধা ব্যবস্থাপনা" },
};
function categoryLabel(c, lang) { return CATEGORY_LABELS[lang]?.[c] ?? CATEGORY_LABELS.en[c] ?? c; }

/* ======================================================================
   MOCK DATA — a fictional labour marketplace snapshot
====================================================================== */
const SKILL_META = {
  "Electrician": { icon: Zap, color: THEME.amber },
  "Mason": { icon: Hammer, color: THEME.steel },
  "Plumber": { icon: Wrench, color: THEME.teal },
  "Painter": { icon: PaintBucket, color: THEME.green },
  "Driver": { icon: Truck, color: THEME.navySoft },
  "Carpenter": { icon: Hammer, color: THEME.amberDark },
  "Construction Labour": { icon: HardHat, color: THEME.red },
  "Domestic Help": { icon: Home, color: THEME.teal },
  "Security Guard": { icon: ShieldCheck, color: THEME.navy },
  "Cook": { icon: UtensilsCrossed, color: THEME.green },
};

const WORKERS = [
  { id: "W-1042", name: "Ramesh Kumar", skill: "Electrician", extraSkills: ["Wiring", "Solar Panels", "AC Repair"], exp: 6, city: "Pune", verified: true, rating: 4.8, jobsDone: 42, wage: 850, langs: ["Hindi", "Marathi"], phone: "98•••••210", passport: "KS-WK-000982", availability: "Immediate" },
  { id: "W-1043", name: "Suresh Yadav", skill: "Mason", extraSkills: ["Tiling", "Plastering"], exp: 9, city: "Nagpur", verified: true, rating: 4.6, jobsDone: 71, wage: 700, langs: ["Hindi"], phone: "97•••••114", passport: "KS-WK-000871", availability: "In 3 days" },
  { id: "W-1044", name: "Fatima Sheikh", skill: "Domestic Help", extraSkills: ["Cooking", "Elderly Care"], exp: 4, city: "Mumbai", verified: true, rating: 4.9, jobsDone: 58, wage: 600, langs: ["Hindi", "Urdu"], phone: "96•••••552", passport: "KS-WK-001120", availability: "Immediate" },
  { id: "W-1045", name: "Velan Raj", skill: "Plumber", extraSkills: ["Pipe Fitting", "Bore Well"], exp: 5, city: "Chennai", verified: false, rating: 4.3, jobsDone: 19, wage: 750, langs: ["Tamil"], phone: "95•••••887", passport: "KS-WK-001208", availability: "Immediate" },
  { id: "W-1046", name: "Amitava Das", skill: "Driver", extraSkills: ["Heavy Vehicle", "Logistics"], exp: 8, city: "Kolkata", verified: true, rating: 4.5, jobsDone: 63, wage: 800, langs: ["Bengali", "Hindi"], phone: "94•••••330", passport: "KS-WK-000765", availability: "In 1 week" },
  { id: "W-1047", name: "Geeta Devi", skill: "Cook", extraSkills: ["North Indian", "Catering"], exp: 7, city: "Pune", verified: true, rating: 4.7, jobsDone: 55, wage: 650, langs: ["Hindi", "Marathi"], phone: "93•••••441", passport: "KS-WK-000934", availability: "Immediate" },
  { id: "W-1048", name: "Arun Prakash", skill: "Construction Labour", extraSkills: ["Excavation", "Loading"], exp: 3, city: "Bengaluru", verified: true, rating: 4.2, jobsDone: 27, wage: 550, langs: ["Tamil", "Kannada"], phone: "92•••••118", passport: "KS-WK-001305", availability: "Immediate" },
  { id: "W-1049", name: "Iqbal Ansari", skill: "Painter", extraSkills: ["Textured Paint", "Waterproofing"], exp: 10, city: "Pune", verified: true, rating: 4.9, jobsDone: 88, wage: 720, langs: ["Hindi", "Marathi"], phone: "91•••••209", passport: "KS-WK-000512", availability: "In 2 days" },
];

const COMPANIES = [
  { id: "C-201", name: "Skyline Constructions", industry: "Real Estate & Construction", city: "Pune", verified: true, rating: 4.6, jobsPosted: 34, activeWorkers: 61, gstin: "27ABCDE••••1Z5", since: 2016, email: "hr@skylineconstructions.in", phone: "020•••••400", about: "Skyline Constructions builds residential and commercial towers across Pune with a focus on worker safety and on-time wage disbursal.", defaultWageRange: "700–950", preferredSkills: "Electrician, Mason, Painter", standardDuration: "30–60 days", safetyRequirements: "Helmet, harness, and steel-toe boots mandatory on site." },
  { id: "C-202", name: "GreenNest Facility Services", industry: "Facility Management", city: "Mumbai", verified: true, rating: 4.4, jobsPosted: 21, activeWorkers: 38, gstin: "27FGHIJ••••1Z2", since: 2019 },
  { id: "C-203", name: "Metro Logistics Pvt Ltd", industry: "Logistics & Transport", city: "Kolkata", verified: true, rating: 4.1, jobsPosted: 12, activeWorkers: 22, gstin: "19KLMNO••••1Z8", since: 2014 },
  { id: "C-204", name: "UrbanCraft Interiors", industry: "Interior & Renovation", city: "Bengaluru", verified: false, rating: 3.8, jobsPosted: 6, activeWorkers: 9, gstin: "29PQRST••••1Z1", since: 2022 },
  { id: "C-205", name: "QuickBuild Contractors", industry: "Real Estate & Construction", city: "Chennai", verified: true, rating: 4.3, jobsPosted: 18, activeWorkers: 30, gstin: "33UVWXY••••1Z9", since: 2018 },
];

const JOBS = [
  { id: "J-501", title: "Site Electrician Needed", company: "Skyline Constructions", companyId: "C-201", city: "Pune", skill: "Electrician", wage: 900, wageType: "per day", duration: "30 days", food: true, accommodation: true, posted: "2 days ago", status: "Open", applicants: 14, urgent: true, match: 96 },
  { id: "J-502", title: "Masons for Residential Tower", company: "Skyline Constructions", companyId: "C-201", city: "Pune", skill: "Mason", wage: 750, wageType: "per day", duration: "60 days", food: true, accommodation: true, posted: "4 days ago", status: "Open", applicants: 22, urgent: false, match: 81 },
  { id: "J-503", title: "Housekeeping Staff", company: "GreenNest Facility Services", companyId: "C-202", city: "Mumbai", skill: "Domestic Help", wage: 620, wageType: "per day", duration: "Ongoing", food: false, accommodation: false, posted: "1 day ago", status: "Open", applicants: 9, urgent: false, match: 74 },
  { id: "J-504", title: "Plumbing Contract — New Layout", company: "UrbanCraft Interiors", companyId: "C-204", city: "Bengaluru", skill: "Plumber", wage: 800, wageType: "per day", duration: "15 days", food: false, accommodation: false, posted: "6 days ago", status: "Pending Approval", applicants: 5, urgent: false, match: 63 },
  { id: "J-505", title: "Heavy Vehicle Driver", company: "Metro Logistics Pvt Ltd", companyId: "C-203", city: "Kolkata", skill: "Driver", wage: 900, wageType: "per day", duration: "90 days", food: true, accommodation: false, posted: "3 days ago", status: "Open", applicants: 11, urgent: true, match: 88 },
  { id: "J-506", title: "Kitchen Cook — Corporate Canteen", company: "GreenNest Facility Services", companyId: "C-202", city: "Pune", skill: "Cook", wage: 680, wageType: "per day", duration: "Ongoing", food: true, accommodation: false, posted: "5 days ago", status: "Open", applicants: 17, urgent: false, match: 90 },
  { id: "J-507", title: "General Labour — Excavation", company: "QuickBuild Contractors", companyId: "C-205", city: "Chennai", skill: "Construction Labour", wage: 580, wageType: "per day", duration: "45 days", food: true, accommodation: true, posted: "1 week ago", status: "Closed", applicants: 30, urgent: false, match: 55 },
  { id: "J-508", title: "Painters for Villa Project", company: "Skyline Constructions", companyId: "C-201", city: "Pune", skill: "Painter", wage: 750, wageType: "per day", duration: "20 days", food: true, accommodation: false, posted: "Today", status: "Open", applicants: 3, urgent: true, match: 93 },
  { id: "J-509", title: "Suspicious Overseas Painting Contract", company: "QuickRich Overseas Works", companyId: "C-999", city: "Unknown", skill: "Painter", wage: 3500, wageType: "per day", duration: "Unclear", food: false, accommodation: false, posted: "Today", status: "Flagged", applicants: 41, urgent: false, match: 12 },
];

const APPLICATIONS = [
  { id: "A-1", jobId: "J-501", jobTitle: "Site Electrician Needed", company: "Skyline Constructions", stage: "Hired", appliedOn: "20 Jul 2026", wage: 900 },
  { id: "A-2", jobId: "J-506", jobTitle: "Kitchen Cook — Corporate Canteen", company: "GreenNest Facility Services", stage: "Shortlisted", appliedOn: "28 Jul 2026", wage: 680 },
  { id: "A-3", jobId: "J-508", jobTitle: "Painters for Villa Project", company: "Skyline Constructions", stage: "Applied", appliedOn: "05 Aug 2026", wage: 750 },
  { id: "A-4", jobId: "J-502", jobTitle: "Masons for Residential Tower", company: "Skyline Constructions", stage: "Rejected", appliedOn: "18 Jul 2026", wage: 750 },
];

const PAYMENTS = [
  { id: "P-1", date: "02 Aug 2026", job: "Site Electrician Needed", company: "Skyline Constructions", amount: 6300, status: "Paid", method: "UPI" },
  { id: "P-2", date: "26 Jul 2026", job: "Site Electrician Needed", company: "Skyline Constructions", amount: 6300, status: "Paid", method: "UPI" },
  { id: "P-3", date: "19 Jul 2026", job: "Site Electrician Needed", company: "Skyline Constructions", amount: 5400, status: "Paid", method: "Bank Transfer" },
  { id: "P-4", date: "09 Aug 2026", job: "Kitchen Cook — Corporate Canteen", company: "GreenNest Facility Services", amount: 4760, status: "Processing", method: "UPI" },
];

const EARNINGS_TREND = [
  { month: "Mar", amount: 14200 }, { month: "Apr", amount: 16800 }, { month: "May", amount: 15100 },
  { month: "Jun", amount: 19400 }, { month: "Jul", amount: 21200 }, { month: "Aug", amount: 12300 },
];

const REVIEWS_FOR_WORKER = [
  { by: "Skyline Constructions", rating: 5, comment: "Punctual and skilled. Finished wiring ahead of schedule.", date: "24 Jul 2026" },
  { by: "BrightHome Renovators", rating: 4, comment: "Good work, occasionally arrived late in the first week.", date: "02 Jun 2026" },
  { by: "Skyline Constructions", rating: 5, comment: "Very safety-conscious on site. Would rehire.", date: "10 Apr 2026" },
];

const REVIEWS_FOR_COMPANY = [
  { by: "Ramesh Kumar", rating: 5, comment: "Paid on time every week, food provided was good.", date: "26 Jul 2026" },
  { by: "Iqbal Ansari", rating: 4, comment: "Fair wages, site could be safer during monsoon.", date: "15 Jun 2026" },
  { by: "Suresh Yadav", rating: 5, comment: "Clear instructions and respectful supervisors.", date: "30 May 2026" },
];

const COMPLAINTS = [
  { id: "CMP-88", from: "Velan Raj (Worker)", against: "UrbanCraft Interiors", type: "Delayed Wages", status: "Investigating", priority: "High", date: "03 Aug 2026" },
  { id: "CMP-87", from: "Skyline Constructions", against: "Unknown Applicant", type: "Fake Documents", status: "Open", priority: "High", date: "02 Aug 2026" },
  { id: "CMP-86", from: "Fatima Sheikh (Worker)", against: "GreenNest Facility Services", type: "Working Hours Dispute", status: "Resolved", priority: "Medium", date: "27 Jul 2026" },
  { id: "CMP-85", from: "Arun Prakash (Worker)", against: "QuickBuild Contractors", type: "No Safety Gear", status: "Resolved", priority: "Medium", date: "20 Jul 2026" },
];

const FRAUD_ALERTS = [
  { id: "FR-14", type: "Fake Job Posting", entity: "QuickRich Overseas Works", risk: 92, detail: "Wage 4x market rate, no verified GSTIN, urgent overseas relocation ask.", date: "Today" },
  { id: "FR-13", type: "Duplicate Identity", entity: "Applicant #99231", risk: 78, detail: "Aadhaar number matches an existing blocked profile.", date: "Yesterday" },
  { id: "FR-12", type: "Payment Anomaly", entity: "UrbanCraft Interiors", risk: 65, detail: "Wages routed through personal account, not registered business account.", date: "2 days ago" },
  { id: "FR-11", type: "Fake Company", entity: "Bharat Mega Builders", risk: 88, detail: "Registered office address does not exist; GSTIN invalid.", date: "3 days ago" },
];

const NOTIFICATIONS = [
  { id: 1, textKey: "notifViewed", timeKey: "timeAgo2h", read: false },
  { id: 2, textKey: "notifPaymentCredited", timeKey: "timeAgo1d", read: false },
  { id: 3, textKey: "notifNewMatch", timeKey: "timeAgo2d", read: true },
  { id: 4, textKey: "notifAadhaarApproved", timeKey: "timeAgo5d", read: true },
];

const DOCUMENTS = [
  { typeKey: "docAadhaar", status: "Verified", noteKey: "docNoteGovId" },
  { typeKey: "docSkillCert", status: "Verified", noteKey: "docNoteIti" },
  { typeKey: "docPoliceVerification", status: "Pending", noteKey: "docNoteSubmitted" },
  { typeKey: "docBankPassbook", status: "Verified", noteKey: "docNoteBank" },
  { typeKey: "docProfilePhoto", status: "Verified", noteKey: "docNotePhoto" },
];

const RIGHTS = [
  { titleKey: "rightsTitle1", icon: IndianRupee, textKey: "rightsText1" },
  { titleKey: "rightsTitle2", icon: Clock, textKey: "rightsText2" },
  { titleKey: "rightsTitle3", icon: HardHat, textKey: "rightsText3" },
  { titleKey: "rightsTitle4", icon: FileText, textKey: "rightsText4" },
  { titleKey: "rightsTitle5", icon: Calendar, textKey: "rightsText5" },
  { titleKey: "rightsTitle6", icon: Scale, textKey: "rightsText6" },
];

const EMPLOYER_RESPONSIBILITIES = [
  { titleKey: "respTitle1", detailKey: "respText1" },
  { titleKey: "respTitle2", detailKey: "respText2" },
  { titleKey: "respTitle3", detailKey: "respText3" },
  { titleKey: "respTitle4", detailKey: "respText4" },
  { titleKey: "respTitle5", detailKey: "respText5" },
  { titleKey: "respTitle6", detailKey: "respText6" },
];

const COMPLIANCE_POLICIES = [
  { titleKey: "compTitle1", status: "Active", detailKey: "compText1" },
  { titleKey: "compTitle2", status: "Active", detailKey: "compText2" },
  { titleKey: "compTitle3", status: "Active", detailKey: "compText3" },
  { titleKey: "compTitle4", status: "Active", detailKey: "compText4" },
  { titleKey: "compTitle5", status: "Active", detailKey: "compText5" },
  { titleKey: "compTitle6", status: "Under Review", detailKey: "compText6" },
];

const PLATFORM_GROWTH = [
  { month: "Mar", workers: 4200, companies: 210 }, { month: "Apr", workers: 4850, companies: 238 },
  { month: "May", workers: 5300, companies: 255 }, { month: "Jun", workers: 6100, companies: 271 },
  { month: "Jul", workers: 7050, companies: 296 }, { month: "Aug", workers: 7600, companies: 312 },
];

const JOBS_BY_CATEGORY = [
  { name: "Construction", value: 412 }, { name: "Domestic", value: 268 }, { name: "Logistics", value: 154 },
  { name: "Hospitality", value: 121 }, { name: "Facility Mgmt", value: 97 },
];

const VERIFICATION_SPLIT = [
  { name: "Verified", value: 7180, color: THEME.green }, { name: "Pending", value: 340, color: THEME.amber },
  { name: "Rejected", value: 80, color: THEME.red },
];

const FRAUD_TREND = [
  { week: "W1", flags: 12 }, { week: "W2", flags: 18 }, { week: "W3", flags: 9 },
  { week: "W4", flags: 22 }, { week: "W5", flags: 15 }, { week: "W6", flags: 11 },
];

const HIRING_TREND = [
  { month: "Mar", posted: 8, hired: 6 }, { month: "Apr", posted: 11, hired: 8 }, { month: "May", posted: 9, hired: 7 },
  { month: "Jun", posted: 14, hired: 11 }, { month: "Jul", posted: 16, hired: 12 }, { month: "Aug", posted: 10, hired: 5 },
];

const ATTENDANCE_WEEK = [
  { day: "Mon", present: 58, absent: 3, late: 2 }, { day: "Tue", present: 60, absent: 1, late: 2 },
  { day: "Wed", present: 55, absent: 5, late: 3 }, { day: "Thu", present: 59, absent: 2, late: 2 },
  { day: "Fri", present: 61, absent: 0, late: 2 }, { day: "Sat", present: 47, absent: 4, late: 6 },
];

const MATCH_WEIGHTS = [
  { factor: "Skill Fit", weight: 32 }, { factor: "Location", weight: 24 }, { factor: "Wage Fit", weight: 20 },
  { factor: "Experience", weight: 14 }, { factor: "Availability", weight: 10 },
];

const AI_MATCH_LOG = [
  { worker: "Ramesh Kumar", job: "Site Electrician Needed", score: 96, outcome: "Hired" },
  { worker: "Iqbal Ansari", job: "Painters for Villa Project", score: 93, outcome: "Shortlisted" },
  { worker: "Geeta Devi", job: "Kitchen Cook — Corporate Canteen", score: 90, outcome: "Shortlisted" },
  { worker: "Amitava Das", job: "Heavy Vehicle Driver", score: 88, outcome: "Applied" },
  { worker: "Suresh Yadav", job: "Masons for Residential Tower", score: 81, outcome: "Applied" },
];

/* ======================================================================
   PRIMITIVES
====================================================================== */
function Badge({ tone = "neutral", children, icon: Icon }) {
  const tones = {
    success: { bg: THEME.greenSoft, fg: THEME.green },
    warning: { bg: THEME.amberSoft, fg: THEME.amberDark },
    danger: { bg: THEME.redSoft, fg: THEME.red },
    info: { bg: THEME.tealSoft, fg: THEME.teal },
    neutral: { bg: "#EDF1F4", fg: THEME.muted },
    navy: { bg: "#E7ECF1", fg: THEME.navy },
  };
  const t = tones[tone] || tones.neutral;
  return (
    <span
      className="ks-body inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
      style={{ backgroundColor: t.bg, color: t.fg }}
    >
      {Icon ? <Icon size={12} strokeWidth={2.5} /> : null}
      {children}
    </span>
  );
}

function Card({ children, className = "", style = {}, padded = true }) {
  return (
    <div
      className={`rounded-2xl bg-white border ${padded ? "p-5" : ""} ${className}`}
      style={{ borderColor: THEME.border, boxShadow: "0 1px 2px rgba(16,24,32,0.04)", ...style }}
    >
      {children}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, tone = "navy" }) {
  const tones = {
    navy: THEME.navy, amber: THEME.amberDark, green: THEME.green, red: THEME.red, teal: THEME.teal,
  };
  const c = tones[tone] || THEME.navy;
  return (
    <Card className="flex flex-col gap-3 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide ks-body" style={{ color: THEME.muted }}>{label}</span>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: c + "1A" }}>
          <Icon size={17} style={{ color: c }} />
        </div>
      </div>
      <div className="ks-display text-2xl sm:text-3xl font-800" style={{ color: THEME.ink, fontWeight: 800 }}>{value}</div>
      {sub ? <div className="text-xs ks-body" style={{ color: THEME.muted }}>{sub}</div> : null}
    </Card>
  );
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
      <div>
        <h2 className="ks-display text-xl sm:text-2xl" style={{ color: THEME.ink, fontWeight: 800 }}>{title}</h2>
        {subtitle ? <p className="text-sm ks-body mt-0.5" style={{ color: THEME.muted }}>{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

function PrimaryButton({ children, onClick, icon: Icon, tone = "amber", full = false, type = "button", small = false }) {
  const tones = {
    amber: { bg: THEME.amber, fg: THEME.navy },
    navy: { bg: THEME.navy, fg: "#fff" },
    teal: { bg: THEME.teal, fg: "#fff" },
    red: { bg: THEME.red, fg: "#fff" },
    outline: { bg: "transparent", fg: THEME.navy },
  };
  const t = tones[tone] || tones.amber;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`ks-body inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-transform active:scale-95 hover:opacity-90 ${small ? "px-3 py-1.5 text-xs" : "px-4 py-2.5 text-sm"} ${full ? "w-full" : ""}`}
      style={{ backgroundColor: t.bg, color: t.fg, border: tone === "outline" ? `1.5px solid ${THEME.border}` : "none" }}
    >
      {Icon ? <Icon size={small ? 14 : 16} /> : null}
      {children}
    </button>
  );
}

function ProgressBar({ value, tone = "amber", height = 8 }) {
  const colors = { amber: THEME.amber, green: THEME.green, teal: THEME.teal, navy: THEME.navy };
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ backgroundColor: "#EAEEF2", height }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: colors[tone] || THEME.amber }} />
    </div>
  );
}

function StarRow({ rating, size = 13 }) {
  const full = Math.round(rating);
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= full ? THEME.amber : "none"} color={i <= full ? THEME.amber : "#CBD5DD"} />
      ))}
      <span className="ml-1 text-xs font-semibold ks-mono" style={{ color: THEME.muted }}>{rating.toFixed(1)}</span>
    </span>
  );
}

function EmptyState({ icon: Icon, text }) {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center gap-2">
      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#EDF1F4" }}>
        <Icon size={20} style={{ color: THEME.muted }} />
      </div>
      <p className="text-sm ks-body" style={{ color: THEME.muted }}>{text}</p>
    </div>
  );
}

/* ---- Document viewer with prev / next navigation ---- */
function DocumentViewer({ documents, lang }) {
  const t = makeT(lang);
  const [idx, setIdx] = useState(0);
  const doc = documents[idx];
  const docType = doc.typeKey ? t(doc.typeKey) : doc.type;
  const docNote = doc.noteKey ? t(doc.noteKey) : doc.note;
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wide ks-body" style={{ color: THEME.muted }}>
          {t("documentOf")} {idx + 1} {t("documentOfSep")} {documents.length}
        </span>
        <Badge tone={doc.status === "Verified" ? "success" : "warning"} icon={doc.status === "Verified" ? CheckCircle2 : Clock}>{statusLabel(doc.status, lang)}</Badge>
      </div>
      <div
        className="rounded-2xl flex flex-col items-center justify-center gap-3 py-10 mb-4 relative overflow-hidden"
        style={{ background: `repeating-linear-gradient(135deg, ${THEME.navy}0D 0 10px, transparent 10px 20px)`, border: `1.5px dashed ${THEME.border}` }}
      >
        <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: THEME.navy }}>
          <FileText size={26} color={THEME.amber} />
        </div>
        <p className="ks-display font-800 text-base" style={{ color: THEME.ink }}>{docType}</p>
        <p className="text-xs ks-body" style={{ color: THEME.muted }}>{docNote}</p>
      </div>
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => setIdx((i) => Math.max(0, i - 1))}
          disabled={idx === 0}
          className="ks-body inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold disabled:opacity-30"
          style={{ border: `1.5px solid ${THEME.border}`, color: THEME.navy }}
        >
          <ChevronLeft size={16} /> {t("prev")}
        </button>
        <div className="flex items-center gap-1.5">
          {documents.map((_, i) => (
            <span key={i} className="rounded-full transition-all" style={{ width: i === idx ? 16 : 6, height: 6, backgroundColor: i === idx ? THEME.amber : "#D8DEE4" }} />
          ))}
        </div>
        <button
          onClick={() => setIdx((i) => Math.min(documents.length - 1, i + 1))}
          disabled={idx === documents.length - 1}
          className="ks-body inline-flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold disabled:opacity-30"
          style={{ border: `1.5px solid ${THEME.border}`, color: THEME.navy }}
        >
          {t("next")} <ChevronRight size={16} />
        </button>
      </div>
    </Card>
  );
}

/* ---- Signature element: the Digital Work Passport card ---- */
function PassportCard({ worker, lang = "en" }) {
  const t = makeT(lang);
  const meta = SKILL_META[worker.skill] || { icon: Briefcase, color: THEME.navy };
  const SkillIcon = meta.icon;
  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: THEME.navy, boxShadow: "0 10px 30px rgba(14,36,54,0.35)" }}>
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="flex items-center gap-2">
          <Fingerprint size={16} color={THEME.amber} />
          <span className="ks-body text-[11px] font-bold tracking-[0.18em] uppercase" style={{ color: THEME.amber }}>Digital Work Passport</span>
        </div>
        <BadgeCheck size={18} color={worker.verified ? THEME.amber : "#5B6B7A"} />
      </div>
      <div className="flex items-center gap-4 px-5 pt-4">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: THEME.amber }}>
          <span className="ks-display font-900 text-xl" style={{ color: THEME.navy }}>{worker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}</span>
        </div>
        <div className="min-w-0">
          <p className="ks-display font-800 text-lg text-white truncate">{worker.name}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <SkillIcon size={13} color={THEME.amber} />
            <span className="ks-body text-sm" style={{ color: "#C9D6E0" }}>{skillLabel(worker.skill, lang)} • {worker.exp} {t("yearsSuffix")}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 px-5 pt-3 text-xs ks-body" style={{ color: "#9FB0BE" }}>
        <span className="inline-flex items-center gap-1"><MapPin size={12} />{worker.city}</span>
        <span className="inline-flex items-center gap-1"><Star size={12} fill={THEME.amber} color={THEME.amber} />{worker.rating}</span>
        <span className="inline-flex items-center gap-1"><Briefcase size={12} />{worker.jobsDone} {t("jobsSuffix")}</span>
      </div>
      <div className="mx-5 my-4" style={{ borderTop: `1.5px dashed #33526B` }} />
      <div className="flex items-center justify-between px-5 pb-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide ks-body" style={{ color: "#7F94A4" }}>Passport ID</p>
          <p className="ks-mono text-sm font-semibold text-white">{worker.passport}</p>
        </div>
        <Badge tone={worker.verified ? "success" : "warning"} icon={worker.verified ? CheckCircle2 : Clock}>
          {worker.verified ? t("verified") : t("pending")}
        </Badge>
      </div>
    </div>
  );
}

/* ---- Job card (used in worker recommendations / applications / company listings) ---- */
function JobCard({ job, footer, lang = "en" }) {
  const t = makeT(lang);
  const meta = SKILL_META[job.skill] || { icon: Briefcase, color: THEME.navy };
  const SkillIcon = meta.icon;
  const flagged = job.status === "Flagged";
  return (
    <Card className={flagged ? "border-2" : ""} style={flagged ? { borderColor: THEME.red } : {}}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: meta.color + "1A" }}>
            <SkillIcon size={19} style={{ color: meta.color }} />
          </div>
          <div className="min-w-0">
            <p className="ks-display font-800 text-base truncate" style={{ color: THEME.ink }}>{job.title}</p>
            <p className="text-sm ks-body truncate" style={{ color: THEME.muted }}>{job.company}</p>
          </div>
        </div>
        {job.urgent && !flagged ? <Badge tone="danger" icon={Zap}>{t("urgentLabel")}</Badge> : null}
        {flagged ? <Badge tone="danger" icon={AlertTriangle}>{statusLabel("Flagged", lang)}</Badge> : null}
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-sm ks-body" style={{ color: THEME.muted }}>
        <span className="inline-flex items-center gap-1"><MapPin size={13} />{job.city}</span>
        <span className="inline-flex items-center gap-1 ks-mono font-semibold" style={{ color: THEME.ink }}><IndianRupee size={13} />{job.wage}/{t("perDayLabel").replace("/ ", "")}</span>
        <span className="inline-flex items-center gap-1"><Clock size={13} />{job.duration}</span>
        <span className="inline-flex items-center gap-1"><Users size={13} />{job.applicants} {t("jobsAppliedSuffix")}</span>
      </div>

      <div className="flex flex-wrap gap-2 mt-3">
        {job.food ? <Badge tone="info" icon={UtensilsCrossed}>{t("foodLabel")}</Badge> : null}
        {job.accommodation ? <Badge tone="info" icon={BedDouble}>{t("stayLabel")}</Badge> : null}
        <Badge tone={job.status === "Open" ? "success" : job.status === "Pending Approval" ? "warning" : job.status === "Flagged" ? "danger" : "neutral"}>
          {statusLabel(job.status, lang)}
        </Badge>
      </div>

      {typeof job.match === "number" ? (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold ks-body inline-flex items-center gap-1" style={{ color: THEME.teal }}><Sparkles size={12} /> {t("aiMatchScoreLabel")}</span>
            <span className="text-xs ks-mono font-bold" style={{ color: THEME.teal }}>{job.match}%</span>
          </div>
          <ProgressBar value={job.match} tone={job.match > 80 ? "green" : job.match > 60 ? "amber" : "navy"} />
        </div>
      ) : null}

      {footer ? <div className="mt-4 pt-4 flex items-center gap-2" style={{ borderTop: `1px solid ${THEME.border}` }}>{footer}</div> : null}
    </Card>
  );
}

/* ---- Worker row card (used in company AI matches / admin worker mgmt) ---- */
function WorkerCard({ worker, footer, lang = "en" }) {
  const t = makeT(lang);
  const meta = SKILL_META[worker.skill] || { icon: Briefcase, color: THEME.navy };
  const SkillIcon = meta.icon;
  return (
    <Card>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 ks-display font-800" style={{ backgroundColor: THEME.navy, color: THEME.amber }}>
            {worker.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
          <div className="min-w-0">
            <p className="ks-display font-800 text-base truncate" style={{ color: THEME.ink }}>{worker.name}</p>
            <p className="text-sm ks-body inline-flex items-center gap-1" style={{ color: THEME.muted }}><SkillIcon size={13} />{skillLabel(worker.skill, lang)} • {worker.exp} {t("yearsSuffix")}</p>
          </div>
        </div>
        <Badge tone={worker.verified ? "success" : "warning"} icon={worker.verified ? BadgeCheck : Clock}>{worker.verified ? t("verified") : t("pending")}</Badge>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-sm ks-body" style={{ color: THEME.muted }}>
        <span className="inline-flex items-center gap-1"><MapPin size={13} />{worker.city}</span>
        <span className="inline-flex items-center gap-1 ks-mono font-semibold" style={{ color: THEME.ink }}><IndianRupee size={13} />{worker.wage}{t("perDayLabel")}</span>
        <StarRow rating={worker.rating} />
      </div>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {worker.extraSkills.map((s) => <Badge key={s} tone="neutral">{s}</Badge>)}
      </div>
      {footer ? <div className="mt-4 pt-4 flex items-center gap-2" style={{ borderTop: `1px solid ${THEME.border}` }}>{footer}</div> : null}
    </Card>
  );
}

/* ---- Voice assistant floating trigger + panel ---- */
function VoiceAssistant({ lang, active, onToggle }) {
  const t = makeT(lang);
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`relative w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${active ? "ks-pulse" : ""}`}
        style={{ backgroundColor: active ? THEME.amber : "#EDF1F4", color: active ? THEME.navy : THEME.navy }}
        title={t("voiceAssistantLabel")}
      >
        <Mic size={17} />
      </button>
      {active ? (
        <div className="absolute right-0 top-12 w-72 rounded-2xl bg-white p-4 z-30" style={{ boxShadow: "0 12px 32px rgba(16,24,32,0.18)", border: `1px solid ${THEME.border}` }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-end gap-0.5 h-4">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="w-1 rounded-full" style={{ height: "100%", backgroundColor: THEME.amber, animation: `ks-bar ${0.6 + i * 0.15}s ease-in-out infinite` }} />
              ))}
            </span>
            <span className="text-xs font-semibold ks-body" style={{ color: THEME.teal }}>{t("listening")}</span>
          </div>
          <p className="text-sm ks-body" style={{ color: THEME.ink }}>{VOICE_PROMPTS[lang]}</p>
          <p className="text-xs ks-body mt-2" style={{ color: THEME.muted }}>{t("voiceAssistantAvailable")}</p>
        </div>
      ) : null}
    </div>
  );
}

/* ---- Language switcher ---- */
function LanguageSwitcher({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="ks-body inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold"
        style={{ border: `1.5px solid ${THEME.border}`, color: THEME.navy }}
      >
        <Languages size={15} /> {LANGUAGES.find((l) => l.code === lang)?.label}
      </button>
      {open ? (
        <div className="absolute right-0 top-11 w-40 rounded-xl bg-white py-1.5 z-30" style={{ boxShadow: "0 12px 32px rgba(16,24,32,0.18)", border: `1px solid ${THEME.border}` }}>
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              onClick={() => { setLang(l.code); setOpen(false); }}
              className="ks-body w-full text-left px-3 py-2 text-sm hover:bg-gray-50"
              style={{ color: l.code === lang ? THEME.amberDark : THEME.ink, fontWeight: l.code === lang ? 700 : 500 }}
            >
              {l.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ---- Notification bell + dropdown ---- */
function NotificationBell({ notifications, lang = "en" }) {
  const t = makeT(lang);
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;
  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className="relative w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#EDF1F4" }}>
        <Bell size={17} color={THEME.navy} />
        {unread > 0 ? (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: THEME.red }}>{unread}</span>
        ) : null}
      </button>
      {open ? (
        <div className="absolute right-0 top-12 w-80 rounded-2xl bg-white z-30 overflow-hidden" style={{ boxShadow: "0 12px 32px rgba(16,24,32,0.18)", border: `1px solid ${THEME.border}` }}>
          <div className="px-4 py-3" style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("notificationsTitle")}</p>
          </div>
          <div className="max-h-80 overflow-y-auto ks-scroll">
            {notifications.map((n) => (
              <div key={n.id} className="px-4 py-3 flex gap-2.5" style={{ borderBottom: `1px solid ${THEME.border}`, backgroundColor: n.read ? "transparent" : "#FBF6EB" }}>
                <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: n.read ? "#D8DEE4" : THEME.amber }} />
                <div className="min-w-0">
                  <p className="text-sm ks-body" style={{ color: THEME.ink }}>{n.textKey ? t(n.textKey) : n.text}</p>
                  <p className="text-xs ks-body mt-0.5" style={{ color: THEME.muted }}>{n.timeKey ? t(n.timeKey) : n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ---- Top bar shared across panels ---- */
function TopBar({ title, lang, setLang, voiceActive, setVoiceActive, roleLabel, userName, onMenu, onSwitchRole }) {
  const t = makeT(lang);
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-white" style={{ borderBottom: `1px solid ${THEME.border}` }}>
      <div className="flex items-center gap-3 min-w-0">
        <button onClick={onMenu} className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: "#EDF1F4" }}>
          <Menu size={17} color={THEME.navy} />
        </button>
        <div className="min-w-0">
          <p className="ks-display font-800 text-lg truncate" style={{ color: THEME.ink }}>{title}</p>
          <p className="text-xs ks-body" style={{ color: THEME.muted }}>{roleLabel} • {userName}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <LanguageSwitcher lang={lang} setLang={setLang} />
        <VoiceAssistant lang={lang} active={voiceActive} onToggle={() => setVoiceActive((v) => !v)} />
        <NotificationBell notifications={NOTIFICATIONS} lang={lang} />
        <button onClick={onSwitchRole} className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold ks-body" style={{ border: `1.5px solid ${THEME.border}`, color: THEME.navy }}>
          <LogOut size={15} /> {t("switchRole")}
        </button>
      </div>
    </div>
  );
}

/* ---- Sidebar shared across panels ---- */
function Sidebar({ navItems, active, onSelect, roleLabel, roleTag, mobileOpen, setMobileOpen, extra, lang = "en" }) {
  const t = makeT(lang);
  return (
    <>
      {mobileOpen ? <div onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black/40 z-30 lg:hidden" /> : null}
      <aside
        className={`fixed lg:sticky top-0 h-screen z-40 lg:z-0 w-72 shrink-0 flex flex-col transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ backgroundColor: THEME.navy }}
      >
        <div className="flex items-center justify-between px-5 pt-6 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: THEME.amber }}>
              <HardHat size={18} color={THEME.navy} />
            </div>
            <div>
              <p className="ks-display font-900 text-lg leading-none text-white">WorkHub</p>
              <p className="text-[10px] ks-body tracking-wide" style={{ color: "#8FA3B3" }}>{roleTag}</p>
            </div>
          </div>
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/70"><X size={18} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto ks-scroll px-3 pb-4 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => { onSelect(item.key); setMobileOpen(false); }}
                className="ks-body w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-left transition-colors"
                style={{
                  backgroundColor: isActive ? THEME.amber : "transparent",
                  color: isActive ? THEME.navy : "#C4D2DD",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                <Icon size={16} />
                <span className="truncate">{item.label}</span>
                {item.badge ? (
                  <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: isActive ? THEME.navy : THEME.red, color: "#fff" }}>{item.badge}</span>
                ) : null}
              </button>
            );
          })}
        </nav>

        {extra}
        <p className="ks-body text-[10px] text-center pb-4" style={{ color: "#5F7484" }}>{t("platformDemoBuild")}</p>
      </aside>
    </>
  );
}

/* ---- Generic panel shell wrapping Sidebar + TopBar + content ---- */
function PanelShell({ navItems, active, onSelect, roleLabel, roleTag, title, lang, setLang, voiceActive, setVoiceActive, userName, onSwitchRole, sidebarExtra, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full" style={{ backgroundColor: THEME.bg }}>
      <Sidebar navItems={navItems} active={active} onSelect={onSelect} roleLabel={roleLabel} roleTag={roleTag} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} extra={sidebarExtra} lang={lang} />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar title={title} lang={lang} setLang={setLang} voiceActive={voiceActive} setVoiceActive={setVoiceActive} roleLabel={roleLabel} userName={userName} onMenu={() => setMobileOpen(true)} onSwitchRole={onSwitchRole} />
        <main className="flex-1 p-4 sm:p-6 max-w-[1400px] w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}

/* ---- Reusable chart card wrapper ---- */
function ChartCard({ title, subtitle, children, height = 240 }) {
  return (
    <Card>
      <p className="ks-display font-800 text-sm mb-0.5" style={{ color: THEME.ink }}>{title}</p>
      {subtitle ? <p className="text-xs ks-body mb-3" style={{ color: THEME.muted }}>{subtitle}</p> : <div className="mb-3" />}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">{children}</ResponsiveContainer>
      </div>
    </Card>
  );
}

/* ======================================================================
   LANDING / ROLE SELECT + AUTH
====================================================================== */
function Landing({ lang, setLang, onEnter }) {
  const t = makeT(lang);
  const [pendingRole, setPendingRole] = useState(null);
  const [phase, setPhase] = useState("pick"); // pick | auth
  const roles = [
    { key: "worker", title: t("roleWorkerTitle"), desc: t("roleWorkerDesc"), icon: HardHat, user: WORKERS[0].name, sub: `${skillLabel(WORKERS[0].skill, lang)} • ${WORKERS[0].city}` },
    { key: "company", title: t("roleCompanyTitle"), desc: t("roleCompanyDesc"), icon: Building2, user: COMPANIES[0].name, sub: `${COMPANIES[0].industry}` },
    { key: "admin", title: t("roleAdminTitle"), desc: t("roleAdminDesc"), icon: ShieldCheck, user: t("platformAdmin"), sub: t("trustSafetyTeam") },
  ];

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: THEME.navy }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-6 pb-16">
        <div className="flex items-center justify-between mb-10 sm:mb-16">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: THEME.amber }}>
              <HardHat size={18} color={THEME.navy} />
            </div>
            <p className="ks-display font-900 text-xl text-white">{t("appName")}</p>
          </div>
          <LanguageSwitcher lang={lang} setLang={setLang} />
        </div>

        {phase === "pick" ? (
          <>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-5" style={{ backgroundColor: "#1B3A52" }}>
                <Sparkles size={13} color={THEME.amber} />
                <span className="ks-body text-xs font-semibold" style={{ color: THEME.amber }}>{t("aiPoweredBadge")}</span>
              </div>
              <h1 className="ks-display font-900 text-4xl sm:text-6xl leading-[1.05] text-white">{t("tagline")}</h1>
              <p className="ks-body text-base sm:text-lg mt-5" style={{ color: "#AEC0CD" }}>
                {t("heroDesc")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-10 max-w-xl">
              {[
                { v: "7,600+", l: t("statVerifiedWorkers") },
                { v: "312", l: t("statHiringCompanies") },
                { v: "₹2.1Cr+", l: t("statWagesPaid") },
              ].map((s) => (
                <div key={s.l}>
                  <p className="ks-display font-900 text-2xl sm:text-3xl text-white">{s.v}</p>
                  <p className="ks-body text-xs mt-1" style={{ color: "#8FA3B3" }}>{s.l}</p>
                </div>
              ))}
            </div>

            <p className="ks-body text-xs font-bold uppercase tracking-[0.18em] mt-14 mb-4" style={{ color: "#6F869A" }}>{t("continueAs")}</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.key}
                    onClick={() => { setPendingRole(r.key); setPhase("auth"); }}
                    className="text-left rounded-2xl p-5 flex flex-col gap-3 transition-transform hover:-translate-y-0.5"
                    style={{ backgroundColor: "#16374F", border: `1.5px solid #26445C` }}
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: THEME.amber }}>
                      <Icon size={20} color={THEME.navy} />
                    </div>
                    <div>
                      <p className="ks-display font-800 text-lg text-white">{r.title}</p>
                      <p className="ks-body text-sm mt-1" style={{ color: "#9FB0BE" }}>{r.desc}</p>
                    </div>
                    <span className="ks-body inline-flex items-center gap-1 text-xs font-semibold mt-1" style={{ color: THEME.amber }}>
                      {t("enterPanel")} <ArrowRight size={13} />
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <div className="max-w-md mx-auto mt-6">
            <button onClick={() => setPhase("pick")} className="ks-body inline-flex items-center gap-1 text-sm mb-6" style={{ color: "#9FB0BE" }}>
              <ChevronLeft size={15} /> {t("back")}
            </button>
            <div className="rounded-2xl p-6" style={{ backgroundColor: "#16374F", border: `1.5px solid #26445C` }}>
              <p className="ks-display font-800 text-xl text-white mb-1">{t("signInAs")} {roles.find((r) => r.key === pendingRole)?.title}</p>
              <p className="ks-body text-sm mb-5" style={{ color: "#9FB0BE" }}>
                {pendingRole === "worker" ? t("otpDesc") : t("passwordDesc")}
              </p>
              <label className="ks-body text-xs font-semibold" style={{ color: "#9FB0BE" }}>{pendingRole === "worker" ? t("mobileNumber") : t("workEmail")}</label>
              <input
                readOnly
                value={pendingRole === "worker" ? "+91 98••• •••210" : pendingRole === "company" ? "hr@skylineconstructions.in" : "admin@workhub.in"}
                className="ks-mono w-full mt-1.5 mb-4 px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "#0E2436", color: "white", border: `1px solid #26445C` }}
              />
              <label className="ks-body text-xs font-semibold" style={{ color: "#9FB0BE" }}>{pendingRole === "worker" ? t("otpLabel") : t("passwordLabel")}</label>
              <input
                readOnly
                value={pendingRole === "worker" ? "• • • • • •" : "• • • • • • • •"}
                className="ks-mono w-full mt-1.5 mb-5 px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "#0E2436", color: "white", border: `1px solid #26445C` }}
              />
              <PrimaryButton full icon={ArrowRight} onClick={() => onEnter(pendingRole)}>{t("continueAsUser")} {roles.find((r) => r.key === pendingRole)?.user}</PrimaryButton>
              <p className="ks-body text-[11px] text-center mt-4" style={{ color: "#6F869A" }}>{t("demoNote")}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ======================================================================
   WORKER PANEL
====================================================================== */
const WORKER_NAV = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "profile", label: "Profile & Passport", icon: User },
  { key: "recommendations", label: "AI Job Matches", icon: Sparkles },
  { key: "applications", label: "Applications", icon: ClipboardList },
  { key: "payments", label: "Payments", icon: Wallet },
  { key: "history", label: "Work History", icon: BarChart3 },
  { key: "ratings", label: "Ratings", icon: Star },
  { key: "documents", label: "Documents", icon: FileText },
  { key: "rights", label: "Know Your Rights", icon: Scale },
  { key: "notifications", label: "Notifications", icon: Bell, badge: NOTIFICATIONS.filter((n) => !n.read).length || null },
];

function WorkerDashboardView({ worker, applications, lang }) {
  const t = makeT(lang);
  const stageCounts = ["Applied", "Shortlisted", "Hired"].map((s) => ({ stage: statusLabel(s, lang), count: applications.filter((a) => a.stage === s).length }));
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet} label={t("thisMonth")} value="₹18,200" sub={t("vsLastMonth")} tone="green" />
        <StatCard icon={Briefcase} label={t("activeApplications")} value={applications.filter((a) => a.stage !== "Rejected").length} sub={`${applications.length} ${t("totalLifetime")}`} tone="teal" />
        <StatCard icon={Star} label={t("ratings")} value={worker.rating.toFixed(1)} sub={`${worker.jobsDone} ${t("jobsCompletedLabel")}`} tone="amber" />
        <StatCard icon={Sparkles} label={t("bestAiMatch")} value="96%" sub="Site Electrician Needed" tone="navy" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title={t("earningsTrend")} subtitle={t("last6Months")}>
            <AreaChart data={EARNINGS_TREND.map((d) => ({ ...d, month: monthLabel(d.month, lang) }))} margin={{ left: -18, top: 5 }}>
              <defs>
                <linearGradient id="earnGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={THEME.amber} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={THEME.amber} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
              <Area type="monotone" dataKey="amount" stroke={THEME.amberDark} strokeWidth={2.5} fill="url(#earnGrad)" />
            </AreaChart>
          </ChartCard>
        </div>
        <ChartCard title={t("applicationFunnel")} subtitle={t("whereThingsStand")}>
          <BarChart data={stageCounts} layout="vertical" margin={{ left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis dataKey="stage" type="category" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} width={70} />
            <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
            <Bar dataKey="count" radius={[0, 8, 8, 0]} fill={THEME.teal} />
          </BarChart>
        </ChartCard>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-1">
          <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("nearbyJobsNow")}</p>
          <span className="text-xs ks-body inline-flex items-center gap-1" style={{ color: THEME.muted }}><MapPinned size={13} /> {t("within12kmOf")} {worker.city}</span>
        </div>
        <div className="grid sm:grid-cols-3 gap-3 mt-3">
          {JOBS.filter((j) => j.city === worker.city && j.status === "Open").slice(0, 3).map((j) => (
            <div key={j.id} className="rounded-xl p-3.5" style={{ border: `1px solid ${THEME.border}` }}>
              <p className="ks-body font-semibold text-sm truncate" style={{ color: THEME.ink }}>{j.title}</p>
              <p className="ks-body text-xs mt-0.5" style={{ color: THEME.muted }}>{j.company}</p>
              <p className="ks-mono text-sm font-bold mt-2" style={{ color: THEME.green }}>₹{j.wage}{t("perDayLabel")}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function WorkerProfileView({ worker, lang, voiceActive, setVoiceActive, onSave }) {
  const t = makeT(lang);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(worker);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = () => { setForm(worker); setErrors({}); setShowSuccess(false); setIsEditing(true); };
  const cancelEdit = () => { setForm(worker); setErrors({}); setIsEditing(false); };

  const validate = (f) => {
    const e = {};
    if (!f.name || !f.name.trim()) e.name = t("requiredField");
    if (!f.city || !f.city.trim()) e.city = t("requiredField");
    if (!f.phone || !f.phone.trim()) e.phone = t("invalidPhone");
    if (!f.exp || Number(f.exp) < 0 || Number.isNaN(Number(f.exp))) e.exp = t("invalidNumber");
    if (!f.wage || Number(f.wage) <= 0 || Number.isNaN(Number(f.wage))) e.wage = t("invalidWage");
    if (!f.availability || !f.availability.trim()) e.availability = t("requiredField");
    return e;
  };

  const saveEdit = () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    const normalized = { ...form, exp: Number(form.exp), wage: Number(form.wage) };
    onSave && onSave(normalized);
    setIsEditing(false);
    setShowSuccess(true);
  };

  const fieldError = (k) => errors[k] ? <p className="text-xs mt-1" style={{ color: THEME.red }}>{errors[k]}</p> : null;
  const inputStyle = { border: `1.5px solid ${errors ? THEME.border : THEME.border}` };

  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <div className="lg:col-span-1 flex flex-col gap-4">
        <PassportCard worker={worker} lang={lang} />
        <Card>
          <p className="ks-display font-800 text-sm mb-3 inline-flex items-center gap-2" style={{ color: THEME.ink }}><Mic size={15} color={THEME.teal} /> {t("voiceRegistrationTitle")}</p>
          <p className="text-sm ks-body mb-3" style={{ color: THEME.muted }}>{t("voiceRegistrationDesc")}</p>
          <PrimaryButton icon={Mic} tone={voiceActive ? "red" : "teal"} full onClick={() => setVoiceActive((v) => !v)}>
            {voiceActive ? t("stopListening") : t("speakToUpdateProfile")}
          </PrimaryButton>
          {voiceActive ? <p className="text-xs ks-body mt-3 p-3 rounded-xl" style={{ backgroundColor: THEME.tealSoft, color: THEME.teal }}>"{VOICE_PROMPTS[lang]}"</p> : null}
        </Card>
      </div>

      <div className="lg:col-span-2 flex flex-col gap-4">
        {showSuccess ? (
          <Card style={{ backgroundColor: THEME.greenSoft, border: "none" }} className="flex items-center gap-2">
            <CheckCircle2 size={17} color={THEME.green} />
            <p className="text-sm ks-body font-semibold" style={{ color: THEME.green }}>{t("profileUpdated")}</p>
          </Card>
        ) : null}

        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("profileDetailsTitle")}</p>
            {!isEditing ? (
              <PrimaryButton small tone="navy" icon={FileText} onClick={startEdit}>{t("editProfile")}</PrimaryButton>
            ) : (
              <div className="flex gap-2">
                <PrimaryButton small tone="outline" icon={X} onClick={cancelEdit}>{t("cancel")}</PrimaryButton>
                <PrimaryButton small tone="navy" icon={CheckCircle2} onClick={saveEdit}>{t("saveChanges")}</PrimaryButton>
              </div>
            )}
          </div>

          {!isEditing ? (
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { l: t("fullName"), v: worker.name }, { l: t("primarySkill"), v: skillLabel(worker.skill, lang) },
                { l: t("experienceLabel"), v: `${worker.exp} ${t("yearsSuffix")}` }, { l: t("cityLabel"), v: worker.city },
                { l: t("phoneLabel"), v: worker.phone }, { l: t("languagesSpokenLabel"), v: worker.langs.join(", ") },
                { l: t("expectedWageLabel"), v: `₹${worker.wage} ${t("perDayLabel")}` }, { l: t("availabilityLabel"), v: worker.availability },
              ].map((f) => (
                <div key={f.l}>
                  <p className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{f.l}</p>
                  <p className="ks-body text-sm mt-1 font-medium" style={{ color: THEME.ink }}>{f.v}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("fullName")}</label>
                <input value={form.name} onChange={(e) => update("name", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${errors.name ? THEME.red : THEME.border}` }} />
                {fieldError("name")}
              </div>
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("primarySkill")}</label>
                <select value={form.skill} onChange={(e) => update("skill", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none bg-white" style={{ border: `1.5px solid ${THEME.border}` }}>
                  {Object.keys(SKILL_META).map((s) => <option key={s} value={s}>{skillLabel(s, lang)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("experienceLabel")}</label>
                <input type="number" value={form.exp} onChange={(e) => update("exp", e.target.value)} className="ks-mono w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${errors.exp ? THEME.red : THEME.border}` }} />
                {fieldError("exp")}
              </div>
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("cityLabel")}</label>
                <input value={form.city} onChange={(e) => update("city", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${errors.city ? THEME.red : THEME.border}` }} />
                {fieldError("city")}
              </div>
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("phoneLabel")}</label>
                <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="ks-mono w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${errors.phone ? THEME.red : THEME.border}` }} />
                {fieldError("phone")}
              </div>
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("languagesSpokenLabel")}</label>
                <input value={form.langs.join(", ")} onChange={(e) => update("langs", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${THEME.border}` }} />
              </div>
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("expectedWageLabel")}</label>
                <input type="number" value={form.wage} onChange={(e) => update("wage", e.target.value)} className="ks-mono w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${errors.wage ? THEME.red : THEME.border}` }} />
                {fieldError("wage")}
              </div>
              <div>
                <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("availabilityLabel")}</label>
                <input value={form.availability} onChange={(e) => update("availability", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${errors.availability ? THEME.red : THEME.border}` }} />
                {fieldError("availability")}
              </div>
            </div>
          )}
        </Card>

        <Card>
          <p className="ks-display font-800 text-sm mb-3" style={{ color: THEME.ink }}>{t("skillsCertifications")}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge tone="navy" icon={CheckCircle2}>{skillLabel(worker.skill, lang)} {t("primaryTag")}</Badge>
            {worker.extraSkills.map((s) => (
              <Badge key={s} tone="neutral">{s}</Badge>
            ))}
          </div>
          {isEditing ? (
            <div className="flex gap-2">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder={t("addSkillPlaceholder")}
                className="ks-body flex-1 px-3.5 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: `1.5px solid ${THEME.border}` }}
              />
              <PrimaryButton icon={PlusCircle} tone="navy" onClick={() => { if (newSkill.trim()) { onSave && onSave({ ...worker, extraSkills: [...worker.extraSkills, newSkill.trim()] }); setNewSkill(""); } }}>{t("add")}</PrimaryButton>
            </div>
          ) : null}
        </Card>

        <Card>
          <p className="ks-display font-800 text-sm mb-3 inline-flex items-center gap-2" style={{ color: THEME.ink }}><IndianRupee size={15} color={THEME.green} /> {t("wageTransparency")}</p>
          <p className="text-sm ks-body mb-3" style={{ color: THEME.muted }}>{t("wageTransparencyDesc")} {skillLabel(worker.skill, lang)} {t("wageTransparencyDesc2")} {worker.city} {t("wageTransparencyDesc3")}</p>
          <div className="flex items-center gap-6">
            <div><p className="ks-display font-900 text-2xl" style={{ color: THEME.ink }}>₹{worker.wage}</p><p className="text-xs ks-body" style={{ color: THEME.muted }}>{t("yourRate")}</p></div>
            <div><p className="ks-display font-900 text-2xl" style={{ color: THEME.green }}>₹{worker.wage - 60}</p><p className="text-xs ks-body" style={{ color: THEME.muted }}>{t("marketMedian")}</p></div>
            <div><p className="ks-display font-900 text-2xl" style={{ color: THEME.muted }}>₹{worker.wage + 150}</p><p className="text-xs ks-body" style={{ color: THEME.muted }}>{t("top10pct")}</p></div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function WorkerRecommendationsView({ jobs, applications, onApply, lang }) {
  const t = makeT(lang);
  const [filterCity, setFilterCity] = useState("All");
  const cities = ["All", ...new Set(jobs.map((j) => j.city))];
  const shown = jobs.filter((j) => j.status !== "Flagged" && (filterCity === "All" || j.city === filterCity)).sort((a, b) => b.match - a.match);
  return (
    <div className="flex flex-col gap-4">
      <Card padded className="!p-3.5 flex flex-wrap items-center gap-2">
        <Filter size={15} color={THEME.muted} />
        {cities.map((c) => (
          <button
            key={c}
            onClick={() => setFilterCity(c)}
            className="ks-body px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ backgroundColor: filterCity === c ? THEME.navy : "#EDF1F4", color: filterCity === c ? "#fff" : THEME.navy }}
          >
            {c === "All" ? t("all") : c}
          </button>
        ))}
      </Card>
      <div className="grid sm:grid-cols-2 gap-4">
        {shown.map((job) => {
          const applied = applications.some((a) => a.jobId === job.id);
          return (
            <JobCard
              key={job.id}
              job={job}
              lang={lang}
              footer={
                applied ? (
                  <Badge tone="success" icon={CheckCircle2}>{t("alreadyApplied")}</Badge>
                ) : (
                  <PrimaryButton icon={ArrowRight} onClick={() => onApply(job)}>{t("applyNowLabel")}</PrimaryButton>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function WorkerApplicationsView({ applications, lang }) {
  const t = makeT(lang);
  const stageTone = { Applied: "info", Shortlisted: "warning", Hired: "success", Rejected: "danger" };
  return (
    <div className="flex flex-col gap-3">
      {applications.length === 0 ? <EmptyState icon={ClipboardList} text={t("noApplicationsYet")} /> : null}
      {applications.map((a) => (
        <Card key={a.id} className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{a.jobTitle}</p>
            <p className="ks-body text-sm mt-0.5" style={{ color: THEME.muted }}>{a.company} • {t("appliedOnLabel")} {a.appliedOn}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="ks-mono text-sm font-bold" style={{ color: THEME.ink }}>₹{a.wage}{t("perDayLabel")}</span>
            <Badge tone={stageTone[a.stage]}>{statusLabel(a.stage, lang)}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
}

function WorkerPaymentsView({ payments, lang }) {
  const t = makeT(lang);
  const total = payments.filter((p) => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Wallet} label={t("totalReceived")} value={`₹${total.toLocaleString("en-IN")}`} tone="green" />
        <StatCard icon={Clock} label={t("processingLabel")} value={payments.filter((p) => p.status === "Processing").length} tone="amber" />
        <StatCard icon={ShieldCheck} label={t("paymentProtection")} value={t("statusActive")} sub={t("paymentProtectionSub")} tone="teal" />
      </div>
      <Card padded={false}>
        <div className="px-5 py-4"><p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("paymentHistory")}</p></div>
        <div className="ks-scroll overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="ks-body text-xs uppercase" style={{ color: THEME.muted, borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left px-5 py-2.5 font-semibold">{t("colDate")}</th>
                <th className="text-left px-5 py-2.5 font-semibold">{t("colJob")}</th>
                <th className="text-left px-5 py-2.5 font-semibold">{t("colMethod")}</th>
                <th className="text-right px-5 py-2.5 font-semibold">{t("colAmount")}</th>
                <th className="text-right px-5 py-2.5 font-semibold">{t("colStatus")}</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td className="px-5 py-3 ks-body" style={{ color: THEME.ink }}>{p.date}</td>
                  <td className="px-5 py-3 ks-body" style={{ color: THEME.ink }}>{p.job}</td>
                  <td className="px-5 py-3 ks-body" style={{ color: THEME.muted }}>{p.method}</td>
                  <td className="px-5 py-3 ks-mono text-right font-semibold" style={{ color: THEME.ink }}>₹{p.amount.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3 text-right"><Badge tone={p.status === "Paid" ? "success" : "warning"}>{statusLabel(p.status, lang)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function WorkerHistoryView({ worker, lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Briefcase} label={t("jobsCompletedStat")} value={worker.jobsDone} tone="navy" />
        <StatCard icon={Award} label={t("yearsActiveStat")} value={worker.exp} tone="amber" />
        <StatCard icon={Star} label={t("avgRatingStat")} value={worker.rating.toFixed(1)} tone="green" />
      </div>
      <ChartCard title={t("jobsCompletedOverTime")} subtitle={t("monthlyCompletedEngagements")} height={220}>
        <LineChart data={EARNINGS_TREND.map((d) => ({ ...d, month: monthLabel(d.month, lang) }))} margin={{ left: -18 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
          <Line type="monotone" dataKey="amount" name={`${t("earningsTrend")} ₹`} stroke={THEME.navy} strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ChartCard>
      <Card>
        <p className="ks-display font-800 text-sm mb-3" style={{ color: THEME.ink }}>{t("timelineTitle")}</p>
        <div className="flex flex-col gap-4">
          {APPLICATIONS.filter((a) => a.stage === "Hired").concat([{ id: "hist-1", jobTitle: "Wiring — BrightHome Renovators", company: "BrightHome Renovators", appliedOn: "Apr 2026", stage: "Completed", wage: 820 }]).map((a, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: THEME.amber }} />
                {i < 1 ? <span className="w-px flex-1" style={{ backgroundColor: THEME.border }} /> : null}
              </div>
              <div className="pb-2">
                <p className="ks-body text-sm font-semibold" style={{ color: THEME.ink }}>{a.jobTitle}</p>
                <p className="ks-body text-xs" style={{ color: THEME.muted }}>{a.company} • {a.appliedOn} • ₹{a.wage}{t("perDayLabel")}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function WorkerRatingsView({ worker, reviews, lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <Card className="flex items-center gap-6 flex-wrap">
        <div className="text-center">
          <p className="ks-display font-900 text-4xl" style={{ color: THEME.ink }}>{worker.rating.toFixed(1)}</p>
          <StarRow rating={worker.rating} size={16} />
          <p className="text-xs ks-body mt-1" style={{ color: THEME.muted }}>{reviews.length} {t("reviewsCountLabel")}</p>
        </div>
        <div className="flex-1 min-w-[200px] flex flex-col gap-1.5">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs ks-body w-3" style={{ color: THEME.muted }}>{star}</span>
                <ProgressBar value={(count / reviews.length) * 100 || 0} tone="amber" height={6} />
              </div>
            );
          })}
        </div>
      </Card>
      <div className="flex flex-col gap-3">
        {reviews.map((r, i) => (
          <Card key={i}>
            <div className="flex items-center justify-between">
              <p className="ks-body font-semibold text-sm" style={{ color: THEME.ink }}>{r.by}</p>
              <StarRow rating={r.rating} />
            </div>
            <p className="ks-body text-sm mt-2" style={{ color: THEME.muted }}>{r.comment}</p>
            <p className="ks-body text-xs mt-2" style={{ color: "#9AA8B3" }}>{r.date}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

function WorkerEmergencyView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <Card style={{ backgroundColor: THEME.navy }} className="border-0">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="ks-display font-800 text-lg text-white inline-flex items-center gap-2"><Siren size={20} color={THEME.red} /> {t("emergencySupportTitle")}</p>
            <p className="ks-body text-sm mt-1" style={{ color: "#AEC0CD" }}>{t("immediateDangerNote")}</p>
          </div>
          <PrimaryButton tone="red" icon={Siren}>{t("sendSosAlert")}</PrimaryButton>
        </div>
      </Card>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { l: t("nationalEmergencyLabel"), v: "112", icon: Siren },
          { l: t("labourHelplineLabel"), v: "1800-11-3333", icon: Phone },
          { l: t("trustSafetyLabel"), v: "1800-22-7788", icon: HeartHandshake },
        ].map((c) => (
          <Card key={c.l} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: THEME.redSoft }}>
              <c.icon size={18} color={THEME.red} />
            </div>
            <div>
              <p className="text-xs ks-body" style={{ color: THEME.muted }}>{c.l}</p>
              <p className="ks-mono font-bold text-base" style={{ color: THEME.ink }}>{c.v}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <p className="ks-display font-800 text-sm mb-3" style={{ color: THEME.ink }}>{t("whatHappensSosTitle")}</p>
        <div className="flex flex-col gap-3">
          {[t("sosStep1"), t("sosStep2"), t("sosStep3")].map((s, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span className="ks-mono w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ backgroundColor: THEME.amberSoft, color: THEME.amberDark }}>{i + 1}</span>
              <p className="ks-body text-sm" style={{ color: THEME.ink }}>{s}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function WorkerRightsView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {RIGHTS.map((r) => (
        <Card key={r.titleKey} className="flex gap-3.5">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: THEME.tealSoft }}>
            <r.icon size={19} color={THEME.teal} />
          </div>
          <div>
            <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t(r.titleKey)}</p>
            <p className="ks-body text-sm mt-1.5" style={{ color: THEME.muted }}>{t(r.textKey)}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}

function WorkerNotificationsView({ notifications, lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-3">
      {notifications.map((n) => (
        <Card key={n.id} className="flex items-start gap-3" style={{ backgroundColor: n.read ? "#fff" : "#FBF6EB" }}>
          <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: n.read ? "#D8DEE4" : THEME.amber }} />
          <div className="min-w-0"><p className="ks-body text-sm" style={{ color: THEME.ink }}>{n.textKey ? t(n.textKey) : n.text}</p><p className="ks-body text-xs mt-1" style={{ color: THEME.muted }}>{n.timeKey ? t(n.timeKey) : n.time}</p></div>
        </Card>
      ))}
    </div>
  );
}

function WorkerPanel({ lang, setLang, voiceActive, setVoiceActive, onSwitchRole }) {
  const t = makeT(lang);
  const [tab, setTab] = useState("dashboard");
  const [applications, setApplications] = useState(APPLICATIONS);
  const [worker, setWorker] = useState(WORKERS[0]);

  const handleApply = (job) => {
    setApplications((apps) => [{ id: `A-${Date.now()}`, jobId: job.id, jobTitle: job.title, company: job.company, stage: "Applied", appliedOn: "Today", wage: job.wage }, ...apps]);
  };

  const titles = { dashboard: t("dashboard"), profile: t("profile"), recommendations: t("recommendations"), applications: t("applications"), payments: t("payments"), history: t("history"), ratings: t("ratings"), documents: t("documents"), rights: t("rights"), notifications: t("notifications") };

  const navItems = WORKER_NAV.map((n) => ({ ...n, label: titles[n.key] || n.label }));

  return (
    <PanelShell
      navItems={navItems}
      active={tab}
      onSelect={setTab}
      roleLabel={t("roleLabelWorker")}
      roleTag={t("roleTagWorker")}
      title={titles[tab] || t("dashboard")}
      lang={lang} setLang={setLang} voiceActive={voiceActive} setVoiceActive={setVoiceActive}
      userName={worker.name}
      onSwitchRole={onSwitchRole}
      sidebarExtra={
        <div className="px-3 pb-3">
          <button onClick={() => setTab("emergency")} className="ks-body w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold" style={{ backgroundColor: THEME.red, color: "#fff" }}>
            <Siren size={16} /> {t("sos")}
          </button>
        </div>
      }
    >
      {tab === "dashboard" && <WorkerDashboardView worker={worker} applications={applications} lang={lang} />}
      {tab === "profile" && <WorkerProfileView worker={worker} lang={lang} voiceActive={voiceActive} setVoiceActive={setVoiceActive} onSave={setWorker} />}
      {tab === "recommendations" && <WorkerRecommendationsView jobs={JOBS} applications={applications} onApply={handleApply} lang={lang} />}
      {tab === "applications" && <WorkerApplicationsView applications={applications} lang={lang} />}
      {tab === "payments" && <WorkerPaymentsView payments={PAYMENTS} lang={lang} />}
      {tab === "history" && <WorkerHistoryView worker={worker} lang={lang} />}
      {tab === "ratings" && <WorkerRatingsView worker={worker} reviews={REVIEWS_FOR_WORKER} lang={lang} />}
      {tab === "documents" && <div className="max-w-md"><DocumentViewer documents={DOCUMENTS} lang={lang} /></div>}
      {tab === "rights" && <WorkerRightsView lang={lang} />}
      {tab === "notifications" && <WorkerNotificationsView notifications={NOTIFICATIONS} lang={lang} />}
      {tab === "emergency" && <WorkerEmergencyView lang={lang} />}
    </PanelShell>
  );
}

/* ======================================================================
   COMPANY / HIRER PANEL
====================================================================== */
const COMPANY_NAV = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "profile", label: "Profile", icon: Building2 },
  { key: "postJob", label: "Post a Job", icon: PlusCircle },
  { key: "aiMatches", label: "AI Worker Matches", icon: Sparkles },
  { key: "hiring", label: "Hiring Pipeline", icon: Users },
  { key: "attendance", label: "Attendance", icon: Calendar },
  { key: "payments", label: "Payroll", icon: Wallet },
  { key: "ratings", label: "Ratings", icon: Star },
  { key: "responsibilities", label: "Employer Duties", icon: HeartHandshake },
];

function CompanyDashboardView({ company, lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Briefcase} label={t("openJobsLabel")} value={JOBS.filter((j) => j.companyId === company.id && j.status === "Open").length} tone="teal" />
        <StatCard icon={Users} label={t("activeWorkersLabel")} value={company.activeWorkers} sub={t("onActiveEngagements")} tone="navy" />
        <StatCard icon={IndianRupee} label={t("payrollAug")} value="₹4.1L" sub={t("acrossAllSites")} tone="green" />
        <StatCard icon={Star} label={t("employerRating")} value={company.rating.toFixed(1)} sub={`${REVIEWS_FOR_COMPANY.length} ${t("workerReviewsCount")}`} tone="amber" />
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title={t("hiringTrendTitle")} subtitle={t("jobsPostedVsHired")}>
            <BarChart data={HIRING_TREND.map((d) => ({ ...d, month: monthLabel(d.month, lang) }))} margin={{ left: -18 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="posted" name={t("postedLabel")} fill="#C7D1DA" radius={[6, 6, 0, 0]} />
              <Bar dataKey="hired" name={t("stageHired")} fill={THEME.teal} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartCard>
        </div>
        <ChartCard title={t("demandByCategory")} subtitle={t("platformWideLabel")}>
          <PieChart>
            <Pie data={JOBS_BY_CATEGORY} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
              {JOBS_BY_CATEGORY.map((_, i) => <Cell key={i} fill={[THEME.navy, THEME.teal, THEME.amber, THEME.green, "#8FA3B3"][i % 5]} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
          </PieChart>
        </ChartCard>
      </div>

      <Card className="flex items-center justify-between flex-wrap gap-3" style={{ backgroundColor: THEME.tealSoft, border: "none" }}>
        <div className="flex items-center gap-3">
          <BadgeCheck size={22} color={THEME.teal} />
          <div>
            <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("verifiedBannerTitle")}</p>
            <p className="text-xs ks-body" style={{ color: THEME.muted }}>{t("gstinLabel")} {company.gstin} • {t("memberSinceLabel")} {company.since}</p>
          </div>
        </div>
        <Badge tone="success" icon={CheckCircle2}>{t("trustScoreLabel")}</Badge>
      </Card>
    </div>
  );
}

function CompanyProfileView({ company, lang, onSave }) {
  const t = makeT(lang);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(company);
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const startEdit = () => { setForm(company); setErrors({}); setShowSuccess(false); setIsEditing(true); };
  const cancelEdit = () => { setForm(company); setErrors({}); setIsEditing(false); };

  const validate = (f) => {
    const e = {};
    if (!f.name || !f.name.trim()) e.name = t("requiredField");
    if (!f.industry || !f.industry.trim()) e.industry = t("requiredField");
    if (!f.city || !f.city.trim()) e.city = t("requiredField");
    if (!f.gstin || f.gstin.trim().length < 8) e.gstin = t("invalidGstin");
    if (!f.email || !/\S+@\S+\.\S+/.test(f.email)) e.email = t("invalidEmail");
    if (!f.phone || !f.phone.trim()) e.phone = t("invalidPhone");
    if (!f.defaultWageRange || !f.defaultWageRange.trim()) e.defaultWageRange = t("requiredField");
    if (!f.standardDuration || !f.standardDuration.trim()) e.standardDuration = t("requiredField");
    return e;
  };

  const saveEdit = () => {
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    onSave && onSave(form);
    setIsEditing(false);
    setShowSuccess(true);
  };

  const fieldError = (k) => errors[k] ? <p className="text-xs mt-1" style={{ color: THEME.red }}>{errors[k]}</p> : null;
  const borderFor = (k) => ({ border: `1.5px solid ${errors[k] ? THEME.red : THEME.border}` });

  return (
    <div className="flex flex-col gap-4">
      {showSuccess ? (
        <Card style={{ backgroundColor: THEME.greenSoft, border: "none" }} className="flex items-center gap-2">
          <CheckCircle2 size={17} color={THEME.green} />
          <p className="text-sm ks-body font-semibold" style={{ color: THEME.green }}>{t("profileUpdated")}</p>
        </Card>
      ) : null}

      <Card>
        <div className="flex items-center justify-between mb-4">
          <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("companyDetailsTitle")}</p>
          {!isEditing ? (
            <PrimaryButton small tone="navy" icon={FileText} onClick={startEdit}>{t("editProfile")}</PrimaryButton>
          ) : (
            <div className="flex gap-2">
              <PrimaryButton small tone="outline" icon={X} onClick={cancelEdit}>{t("cancel")}</PrimaryButton>
              <PrimaryButton small tone="navy" icon={CheckCircle2} onClick={saveEdit}>{t("saveChanges")}</PrimaryButton>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { l: t("companyNameLabel"), v: company.name }, { l: t("industryLabel"), v: company.industry },
              { l: t("cityLabel"), v: company.city }, { l: t("gstinLabel"), v: company.gstin },
              { l: t("contactEmailLabel"), v: company.email }, { l: t("contactPhoneLabel"), v: company.phone },
            ].map((f) => (
              <div key={f.l}>
                <p className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{f.l}</p>
                <p className="ks-body text-sm mt-1 font-medium" style={{ color: THEME.ink }}>{f.v}</p>
              </div>
            ))}
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("aboutCompanyLabel")}</p>
              <p className="ks-body text-sm mt-1" style={{ color: THEME.ink }}>{company.about}</p>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("companyNameLabel")}</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("name")} />
              {fieldError("name")}
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("industryLabel")}</label>
              <input value={form.industry} onChange={(e) => update("industry", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("industry")} />
              {fieldError("industry")}
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("cityLabel")}</label>
              <input value={form.city} onChange={(e) => update("city", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("city")} />
              {fieldError("city")}
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("gstinLabel")}</label>
              <input value={form.gstin} onChange={(e) => update("gstin", e.target.value)} className="ks-mono w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("gstin")} />
              {fieldError("gstin")}
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("contactEmailLabel")}</label>
              <input value={form.email} onChange={(e) => update("email", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("email")} />
              {fieldError("email")}
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("contactPhoneLabel")}</label>
              <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="ks-mono w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("phone")} />
              {fieldError("phone")}
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("aboutCompanyLabel")}</label>
              <textarea value={form.about} onChange={(e) => update("about", e.target.value)} rows={3} placeholder={t("aboutPlaceholder")} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none" style={borderFor("about")} />
            </div>
          </div>
        )}
      </Card>

      <Card>
        <p className="ks-display font-800 text-sm mb-1" style={{ color: THEME.ink }}>{t("jobReqDefaultsTitle")}</p>
        <p className="text-xs ks-body mb-4" style={{ color: THEME.muted }}>{t("jobReqDefaultsDesc")}</p>
        {!isEditing ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { l: t("defaultWageRangeLabel"), v: `₹${company.defaultWageRange}` }, { l: t("preferredSkillsLabel"), v: company.preferredSkills },
              { l: t("standardDurationLabel"), v: company.standardDuration }, { l: t("safetyRequirementsLabel"), v: company.safetyRequirements },
            ].map((f) => (
              <div key={f.l}>
                <p className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{f.l}</p>
                <p className="ks-body text-sm mt-1 font-medium" style={{ color: THEME.ink }}>{f.v}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("defaultWageRangeLabel")}</label>
              <input value={form.defaultWageRange} onChange={(e) => update("defaultWageRange", e.target.value)} className="ks-mono w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("defaultWageRange")} />
              {fieldError("defaultWageRange")}
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("preferredSkillsLabel")}</label>
              <input value={form.preferredSkills} onChange={(e) => update("preferredSkills", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${THEME.border}` }} />
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("standardDurationLabel")}</label>
              <input value={form.standardDuration} onChange={(e) => update("standardDuration", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={borderFor("standardDuration")} />
              {fieldError("standardDuration")}
            </div>
            <div>
              <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("safetyRequirementsLabel")}</label>
              <input value={form.safetyRequirements} onChange={(e) => update("safetyRequirements", e.target.value)} placeholder={t("safetyReqPlaceholder")} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${THEME.border}` }} />
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function CompanyPostJobView({ onPosted, lang }) {
  const t = makeT(lang);
  const [form, setForm] = useState({ title: "", skill: "Electrician", city: "Pune", wage: "", duration: "", food: false, accommodation: false, description: "" });
  const [posted, setPosted] = useState(false);
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card className="lg:col-span-2">
        <p className="ks-display font-800 text-base mb-4" style={{ color: THEME.ink }}>{t("jobDetailsTitle")}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("jobTitleLabel")}</label>
            <input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder={t("jobTitlePlaceholder")} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${THEME.border}` }} />
          </div>
          <div>
            <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("skillRequiredLabel")}</label>
            <select value={form.skill} onChange={(e) => update("skill", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none bg-white" style={{ border: `1.5px solid ${THEME.border}` }}>
              {Object.keys(SKILL_META).map((s) => <option key={s} value={s}>{skillLabel(s, lang)}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("locationCityLabel")}</label>
            <input value={form.city} onChange={(e) => update("city", e.target.value)} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${THEME.border}` }} />
          </div>
          <div>
            <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("wagePerDayLabel")}</label>
            <input value={form.wage} onChange={(e) => update("wage", e.target.value)} type="number" placeholder="750" className="ks-mono w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${THEME.border}` }} />
          </div>
          <div>
            <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("workDurationLabel")}</label>
            <input value={form.duration} onChange={(e) => update("duration", e.target.value)} placeholder={t("durationPlaceholder")} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none" style={{ border: `1.5px solid ${THEME.border}` }} />
          </div>
          <div className="sm:col-span-2 flex items-center gap-6 pt-1">
            <label className="ks-body flex items-center gap-2 text-sm font-medium" style={{ color: THEME.ink }}>
              <input type="checkbox" checked={form.food} onChange={(e) => update("food", e.target.checked)} /> {t("foodProvidedLabel")}
            </label>
            <label className="ks-body flex items-center gap-2 text-sm font-medium" style={{ color: THEME.ink }}>
              <input type="checkbox" checked={form.accommodation} onChange={(e) => update("accommodation", e.target.checked)} /> {t("accommodationProvidedLabel")}
            </label>
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold ks-body" style={{ color: THEME.muted }}>{t("additionalReqLabel")}</label>
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} rows={3} placeholder={t("additionalReqPlaceholder")} className="ks-body w-full mt-1.5 px-3.5 py-2.5 rounded-xl text-sm outline-none resize-none" style={{ border: `1.5px solid ${THEME.border}` }} />
          </div>
        </div>
        {form.wage && Number(form.wage) < 400 ? (
          <div className="mt-4 p-3 rounded-xl flex items-center gap-2" style={{ backgroundColor: THEME.redSoft }}>
            <AlertTriangle size={15} color={THEME.red} />
            <p className="text-xs ks-body" style={{ color: THEME.red }}>{t("belowMinWageWarning")} {skillLabel(form.skill, lang)}. {t("belowMinWageWarning2")}</p>
          </div>
        ) : null}
        <div className="mt-5">
          <PrimaryButton icon={posted ? CheckCircle2 : Sparkles} onClick={() => { setPosted(true); onPosted && onPosted(); }}>{posted ? t("jobPostedBtn") : t("postJobBtn")}</PrimaryButton>
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <Card>
          <p className="ks-display font-800 text-sm mb-3 inline-flex items-center gap-2" style={{ color: THEME.ink }}><Eye size={15} color={THEME.teal} /> {t("livePreviewTitle")}</p>
          <JobCard lang={lang} job={{ title: form.title || t("yourJobTitlePlaceholder"), company: t("yourCompanyPlaceholder"), city: form.city || t("cityPlaceholder"), skill: form.skill, wage: form.wage || "—", wageType: "per day", duration: form.duration || t("durationFallback"), food: form.food, accommodation: form.accommodation, status: "Open", applicants: 0, urgent: false, match: undefined }} />
        </Card>
        <Card style={{ backgroundColor: THEME.tealSoft, border: "none" }}>
          <p className="ks-display font-800 text-sm mb-2 inline-flex items-center gap-2" style={{ color: THEME.ink }}><Sparkles size={15} color={THEME.teal} /> {t("wageTransparencyCheckTitle")}</p>
          <p className="text-xs ks-body" style={{ color: THEME.muted }}>{t("wageTransparencyCheckDesc")}</p>
        </Card>
      </div>
    </div>
  );
}

function CompanyAiMatchesView({ workers, lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <Card style={{ backgroundColor: THEME.navy, border: "none" }} className="flex items-center gap-3">
        <Sparkles size={20} color={THEME.amber} />
        <p className="ks-body text-sm text-white">{t("matchesDescBanner")}</p>
      </Card>
      <div className="grid sm:grid-cols-2 gap-4">
        {workers.map((w) => (
          <WorkerCard
            key={w.id}
            worker={w}
            lang={lang}
            footer={
              <>
                <PrimaryButton small icon={MessageSquare} tone="outline">{t("messageBtn")}</PrimaryButton>
                <PrimaryButton small icon={ThumbsUp} tone="navy">{t("shortlistBtn")}</PrimaryButton>
              </>
            }
          />
        ))}
      </div>
    </div>
  );
}

function CompanyHiringView({ lang }) {
  const t = makeT(lang);
  const [pipeline, setPipeline] = useState([
    { id: 1, name: "Ramesh Kumar", skill: "Electrician", job: "Site Electrician Needed", stage: "Hired" },
    { id: 2, name: "Iqbal Ansari", skill: "Painter", job: "Painters for Villa Project", stage: "Shortlisted" },
    { id: 3, name: "Geeta Devi", skill: "Cook", job: "Kitchen Cook — Corporate Canteen", stage: "Shortlisted" },
    { id: 4, name: "Suresh Yadav", skill: "Mason", job: "Masons for Residential Tower", stage: "Applied" },
    { id: 5, name: "Arun Prakash", skill: "Construction Labour", job: "Masons for Residential Tower", stage: "Applied" },
  ]);
  const stages = ["Applied", "Shortlisted", "Hired", "Rejected"];
  const advance = (id) => setPipeline((p) => p.map((c) => c.id === id ? { ...c, stage: stages[Math.min(stages.indexOf(c.stage) + 1, 2)] } : c));
  const reject = (id) => setPipeline((p) => p.map((c) => c.id === id ? { ...c, stage: "Rejected" } : c));
  return (
    <div className="grid lg:grid-cols-4 gap-4">
      {stages.map((stage) => (
        <div key={stage} className="flex flex-col gap-3">
          <p className="ks-display font-800 text-xs uppercase tracking-wide px-1" style={{ color: THEME.muted }}>{statusLabel(stage, lang)} ({pipeline.filter((c) => c.stage === stage).length})</p>
          {pipeline.filter((c) => c.stage === stage).map((c) => (
            <Card key={c.id} className="!p-3.5">
              <p className="ks-body font-semibold text-sm" style={{ color: THEME.ink }}>{c.name}</p>
              <p className="ks-body text-xs mt-0.5" style={{ color: THEME.muted }}>{skillLabel(c.skill, lang)}</p>
              <p className="ks-body text-xs mt-1 truncate" style={{ color: "#9AA8B3" }}>{c.job}</p>
              {stage !== "Hired" && stage !== "Rejected" ? (
                <div className="flex gap-1.5 mt-3">
                  <button onClick={() => advance(c.id)} className="flex-1 rounded-lg py-1.5 text-xs font-semibold ks-body" style={{ backgroundColor: THEME.greenSoft, color: THEME.green }}>{t("advanceBtn")}</button>
                  <button onClick={() => reject(c.id)} className="flex-1 rounded-lg py-1.5 text-xs font-semibold ks-body" style={{ backgroundColor: THEME.redSoft, color: THEME.red }}>{t("rejectBtn")}</button>
                </div>
              ) : null}
            </Card>
          ))}
          {pipeline.filter((c) => c.stage === stage).length === 0 ? <p className="text-xs ks-body px-1" style={{ color: "#B3BFC8" }}>{t("nothingHereLabel")}</p> : null}
        </div>
      ))}
    </div>
  );
}

function CompanyAttendanceView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <ChartCard title={t("thisWeekAttendance")} subtitle={t("acrossAllActiveSites")} height={260}>
        <BarChart data={ATTENDANCE_WEEK.map((d) => ({ ...d, day: dayLabel(d.day, lang) }))} margin={{ left: -18 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} vertical={false} />
          <XAxis dataKey="day" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="present" name={t("statusPresent")} stackId="a" fill={THEME.green} radius={[0, 0, 0, 0]} />
          <Bar dataKey="late" name={t("statusLate")} stackId="a" fill={THEME.amber} />
          <Bar dataKey="absent" name={t("statusAbsent")} stackId="a" fill={THEME.red} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ChartCard>
      <Card padded={false}>
        <div className="px-5 py-4"><p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("todaysRosterTitle")}</p></div>
        <div className="ks-scroll overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="ks-body text-xs uppercase" style={{ color: THEME.muted, borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left px-5 py-2.5 font-semibold">{t("colWorker")}</th><th className="text-left px-5 py-2.5 font-semibold">{t("colCheckIn")}</th><th className="text-left px-5 py-2.5 font-semibold">{t("colCheckOut")}</th><th className="text-right px-5 py-2.5 font-semibold">{t("colStatus2")}</th>
              </tr>
            </thead>
            <tbody>
              {[
                { n: "Ramesh Kumar", in: "8:58 AM", out: "6:02 PM", s: "Present" }, { n: "Suresh Yadav", in: "9:14 AM", out: "6:00 PM", s: "Late" },
                { n: "Arun Prakash", in: "—", out: "—", s: "Absent" }, { n: "Iqbal Ansari", in: "8:45 AM", out: "5:58 PM", s: "Present" },
              ].map((r) => (
                <tr key={r.n} style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td className="px-5 py-3 ks-body font-medium" style={{ color: THEME.ink }}>{r.n}</td>
                  <td className="px-5 py-3 ks-mono" style={{ color: THEME.muted }}>{r.in}</td>
                  <td className="px-5 py-3 ks-mono" style={{ color: THEME.muted }}>{r.out}</td>
                  <td className="px-5 py-3 text-right"><Badge tone={r.s === "Present" ? "success" : r.s === "Late" ? "warning" : "danger"}>{statusLabel(r.s, lang)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function CompanyPaymentsView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={Wallet} label={t("paidThisMonth")} value="₹3.4L" tone="green" />
        <StatCard icon={Clock} label={t("pendingPayouts")} value="₹68,400" tone="amber" />
        <StatCard icon={Users} label={t("workersPaidLabel")} value="47" tone="teal" />
      </div>
      <Card padded={false}>
        <div className="px-5 py-4"><p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("recentPayouts")}</p></div>
        <div className="ks-scroll overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="ks-body text-xs uppercase" style={{ color: THEME.muted, borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left px-5 py-2.5 font-semibold">{t("colWorker")}</th><th className="text-left px-5 py-2.5 font-semibold">{t("colJob")}</th><th className="text-right px-5 py-2.5 font-semibold">{t("colAmount")}</th><th className="text-right px-5 py-2.5 font-semibold">{t("colStatus")}</th>
              </tr>
            </thead>
            <tbody>
              {WORKERS.slice(0, 5).map((w, i) => (
                <tr key={w.id} style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td className="px-5 py-3 ks-body font-medium" style={{ color: THEME.ink }}>{w.name}</td>
                  <td className="px-5 py-3 ks-body" style={{ color: THEME.muted }}>{skillLabel(w.skill, lang)} {t("contractSuffix")}</td>
                  <td className="px-5 py-3 ks-mono text-right font-semibold" style={{ color: THEME.ink }}>₹{(w.wage * 7).toLocaleString("en-IN")}</td>
                  <td className="px-5 py-3 text-right"><Badge tone={i === 2 ? "warning" : "success"}>{i === 2 ? t("statusPending2") : t("statusPaid")}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function CompanyRatingsView({ reviews }) {
  return (
    <div className="flex flex-col gap-3">
      {reviews.map((r, i) => (
        <Card key={i} className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="ks-body font-semibold text-sm" style={{ color: THEME.ink }}>{r.by}</p>
            <p className="ks-body text-sm mt-1" style={{ color: THEME.muted }}>{r.comment}</p>
            <p className="ks-body text-xs mt-2" style={{ color: "#9AA8B3" }}>{r.date}</p>
          </div>
          <StarRow rating={r.rating} />
        </Card>
      ))}
    </div>
  );
}

function CompanyResponsibilitiesView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <Card style={{ backgroundColor: THEME.amberSoft, border: "none" }} className="flex items-center gap-3">
        <Scale size={20} color={THEME.amberDark} />
        <p className="ks-body text-sm" style={{ color: THEME.ink }}>{t("responsibilitiesBanner")}</p>
      </Card>
      <div className="grid sm:grid-cols-2 gap-4">
        {EMPLOYER_RESPONSIBILITIES.map((r) => (
          <Card key={r.titleKey} className="flex gap-3">
            <CheckCircle2 size={18} color={THEME.green} className="shrink-0 mt-0.5" />
            <div><p className="ks-body font-semibold text-sm" style={{ color: THEME.ink }}>{t(r.titleKey)}</p><p className="ks-body text-sm mt-1" style={{ color: THEME.muted }}>{t(r.detailKey)}</p></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CompanyPanel({ lang, setLang, voiceActive, setVoiceActive, onSwitchRole }) {
  const t = makeT(lang);
  const [tab, setTab] = useState("dashboard");
  const [company, setCompany] = useState(COMPANIES[0]);
  const titles = { dashboard: t("dashboard"), profile: t("companyProfileTitle"), postJob: t("postJob"), aiMatches: t("aiMatches"), hiring: t("hiring"), attendance: t("attendance"), payments: t("payments"), ratings: t("ratings"), responsibilities: t("responsibilities") };
  const navItems = COMPANY_NAV.map((n) => ({ ...n, label: titles[n.key] || n.label }));
  return (
    <PanelShell
      navItems={navItems} active={tab} onSelect={setTab} roleLabel={t("roleLabelCompany")} roleTag={t("roleTagCompany")}
      title={titles[tab] || t("dashboard")} lang={lang} setLang={setLang} voiceActive={voiceActive} setVoiceActive={setVoiceActive}
      userName={company.name} onSwitchRole={onSwitchRole}
    >
      {tab === "dashboard" && <CompanyDashboardView company={company} lang={lang} />}
      {tab === "profile" && <CompanyProfileView company={company} lang={lang} onSave={setCompany} />}
      {tab === "postJob" && <CompanyPostJobView lang={lang} />}
      {tab === "aiMatches" && <CompanyAiMatchesView workers={WORKERS} lang={lang} />}
      {tab === "hiring" && <CompanyHiringView lang={lang} />}
      {tab === "attendance" && <CompanyAttendanceView lang={lang} />}
      {tab === "payments" && <CompanyPaymentsView lang={lang} />}
      {tab === "ratings" && <CompanyRatingsView reviews={REVIEWS_FOR_COMPANY} />}
      {tab === "responsibilities" && <CompanyResponsibilitiesView lang={lang} />}
    </PanelShell>
  );
}

/* ======================================================================
   ADMIN PANEL
====================================================================== */
const ADMIN_NAV = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "workers", label: "Workers", icon: Users },
  { key: "companies", label: "Companies", icon: Building2 },
  { key: "approvals", label: "Job Approvals", icon: ClipboardList, badge: JOBS.filter((j) => j.status === "Pending Approval").length || null },
  { key: "verification", label: "Verification Queue", icon: Fingerprint },
  { key: "complaints", label: "Complaints", icon: MessageSquare, badge: COMPLAINTS.filter((c) => c.status !== "Resolved").length || null },
  { key: "fraud", label: "Fraud Detection", icon: ShieldAlert, badge: FRAUD_ALERTS.length || null },
  { key: "matching", label: "AI Matching", icon: Sparkles },
  { key: "compliance", label: "Compliance", icon: Scale },
];

function AdminDashboardView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label={t("totalWorkersLabel")} value="7,600" sub={`+550 ${t("thisMonthSuffix2")}`} tone="navy" />
        <StatCard icon={Building2} label={t("companiesLabel2")} value="312" sub={`+16 ${t("thisMonthSuffix2")}`} tone="teal" />
        <StatCard icon={Briefcase} label={t("openJobsLabel2")} value={JOBS.filter((j) => j.status === "Open").length} tone="green" />
        <StatCard icon={ShieldAlert} label={t("activeFraudFlagsLabel")} value={FRAUD_ALERTS.length} tone="red" />
      </div>
      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <ChartCard title={t("platformGrowthTitle")} subtitle={t("registeredWorkersVsCompanies")}>
            <LineChart data={PLATFORM_GROWTH.map((d) => ({ ...d, month: monthLabel(d.month, lang) }))} margin={{ left: -8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="l" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line yAxisId="l" type="monotone" dataKey="workers" name={t("workers")} stroke={THEME.navy} strokeWidth={2.5} dot={{ r: 3 }} />
              <Line yAxisId="r" type="monotone" dataKey="companies" name={t("companies")} stroke={THEME.amberDark} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ChartCard>
        </div>
        <ChartCard title={t("verificationStatusTitle")} subtitle={t("allAccountsLabel")}>
          <PieChart>
            <Pie data={VERIFICATION_SPLIT.map((d) => ({ ...d, name: statusLabel(d.name, lang) }))} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
              {VERIFICATION_SPLIT.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ChartCard>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        <ChartCard title={t("jobsByCategoryTitle")} height={220}>
          <BarChart data={JOBS_BY_CATEGORY.map((d) => ({ ...d, name: categoryLabel(d.name, lang) }))} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} horizontal={false} />
            <XAxis type="number" hide />
            <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} width={90} />
            <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} fill={THEME.steel} />
          </BarChart>
        </ChartCard>
        <ChartCard title={t("fraudFlagsRaisedTitle")} subtitle={t("weeklyLabel")} height={220}>
          <AreaChart data={FRAUD_TREND.map((d) => ({ ...d, week: weekLabel(d.week, lang) }))} margin={{ left: -18 }}>
            <defs>
              <linearGradient id="fraudGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={THEME.red} stopOpacity={0.45} />
                <stop offset="100%" stopColor={THEME.red} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
            <Area type="monotone" dataKey="flags" stroke={THEME.red} strokeWidth={2.5} fill="url(#fraudGrad)" />
          </AreaChart>
        </ChartCard>
      </div>
    </div>
  );
}

function AdminWorkersView({ workers, lang }) {
  const t = makeT(lang);
  const [query, setQuery] = useState("");
  const filtered = workers.filter((w) => w.name.toLowerCase().includes(query.toLowerCase()) || w.skill.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="flex flex-col gap-4">
      <Card padded className="!p-3.5 flex items-center gap-2">
        <Search size={16} color={THEME.muted} />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={t("searchWorkersPlaceholder")} className="ks-body flex-1 text-sm outline-none" />
      </Card>
      <Card padded={false}>
        <div className="ks-scroll overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="ks-body text-xs uppercase" style={{ color: THEME.muted, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left px-5 py-3 font-semibold">{t("colWorker")}</th><th className="text-left px-5 py-3 font-semibold">{t("colSkill")}</th><th className="text-left px-5 py-3 font-semibold">{t("colCity")}</th><th className="text-left px-5 py-3 font-semibold">{t("colRating")}</th><th className="text-right px-5 py-3 font-semibold">{t("colStatus4")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((w) => (
                <tr key={w.id} style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td className="px-5 py-3 ks-body font-medium" style={{ color: THEME.ink }}>{w.name}<span className="block ks-mono text-xs" style={{ color: "#9AA8B3" }}>{w.passport}</span></td>
                  <td className="px-5 py-3 ks-body" style={{ color: THEME.muted }}>{skillLabel(w.skill, lang)}</td>
                  <td className="px-5 py-3 ks-body" style={{ color: THEME.muted }}>{w.city}</td>
                  <td className="px-5 py-3"><StarRow rating={w.rating} /></td>
                  <td className="px-5 py-3 text-right"><Badge tone={w.verified ? "success" : "warning"} icon={w.verified ? BadgeCheck : Clock}>{w.verified ? t("verified") : t("pending")}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AdminCompaniesView({ companies, lang }) {
  const t = makeT(lang);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {companies.map((c) => (
        <Card key={c.id}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: THEME.navy }}>
                <Building2 size={18} color={THEME.amber} />
              </div>
              <div>
                <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{c.name}</p>
                <p className="ks-body text-xs mt-0.5" style={{ color: THEME.muted }}>{c.industry}</p>
              </div>
            </div>
            <Badge tone={c.verified ? "success" : "warning"} icon={c.verified ? BadgeCheck : Clock}>{c.verified ? t("verified") : t("pending")}</Badge>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-4 text-sm ks-body" style={{ color: THEME.muted }}>
            <span className="inline-flex items-center gap-1"><MapPin size={13} />{c.city}</span>
            <span className="inline-flex items-center gap-1"><Briefcase size={13} />{c.jobsPosted} {t("jobsSuffix")}</span>
            <StarRow rating={c.rating} />
          </div>
          <p className="ks-mono text-xs mt-3" style={{ color: "#9AA8B3" }}>{t("gstinLabel")} {c.gstin}</p>
          {!c.verified ? (
            <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
              <PrimaryButton small tone="navy" icon={CheckCircle2}>{t("verifyBtn")}</PrimaryButton>
              <PrimaryButton small tone="outline" icon={XCircle}>{t("rejectBtn2")}</PrimaryButton>
            </div>
          ) : null}
        </Card>
      ))}
    </div>
  );
}

function AdminApprovalsView({ lang }) {
  const t = makeT(lang);
  const [jobs, setJobs] = useState(JOBS.filter((j) => j.status === "Pending Approval" || j.status === "Flagged"));
  const decide = (id, decision) => setJobs((js) => js.filter((j) => j.id !== id));
  return (
    <div className="flex flex-col gap-4">
      {jobs.length === 0 ? <EmptyState icon={ClipboardList} text={t("noJobsWaiting")} /> : null}
      {jobs.map((j) => (
        <JobCard
          key={j.id}
          job={j}
          lang={lang}
          footer={
            <>
              <PrimaryButton small tone="navy" icon={Check} onClick={() => decide(j.id, "approve")}>{t("approveBtn")}</PrimaryButton>
              <PrimaryButton small tone="red" icon={XCircle} onClick={() => decide(j.id, "reject")}>{t("rejectNotifyBtn")}</PrimaryButton>
            </>
          }
        />
      ))}
    </div>
  );
}

function AdminVerificationView({ lang }) {
  const t = makeT(lang);
  const queue = [
    { name: "Velan Raj", typeKey: "workers", docs: DOCUMENTS },
    { name: "UrbanCraft Interiors", typeKey: "companies", docs: [{ typeKey: "docGst", status: "Pending", noteKey: "docNoteGstSubmit" }, { typeKey: "docPan", status: "Verified", noteKey: "docNotePanVerified" }, { typeKey: "docAddress", status: "Pending", noteKey: "docNoteAwaiting" }] },
  ];
  const [sel, setSel] = useState(0);
  return (
    <div className="grid lg:grid-cols-3 gap-5">
      <Card padded={false} className="lg:col-span-1 h-fit">
        <div className="px-4 py-3"><p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("pendingReviewTitle")}</p></div>
        {queue.map((q, i) => (
          <button key={q.name} onClick={() => setSel(i)} className="w-full text-left px-4 py-3 flex items-center justify-between" style={{ borderTop: `1px solid ${THEME.border}`, backgroundColor: sel === i ? "#F3F6F8" : "transparent" }}>
            <div><p className="ks-body text-sm font-semibold" style={{ color: THEME.ink }}>{q.name}</p><p className="ks-body text-xs" style={{ color: THEME.muted }}>{t(q.typeKey)}</p></div>
            <ChevronRight size={15} color={THEME.muted} />
          </button>
        ))}
      </Card>
      <div className="lg:col-span-2 flex flex-col gap-4">
        <DocumentViewer documents={queue[sel].docs} lang={lang} />
        <div className="flex gap-2">
          <PrimaryButton tone="navy" icon={CheckCircle2} full>{t("approveNameBtn")} {queue[sel].name}</PrimaryButton>
          <PrimaryButton tone="red" icon={XCircle} full>{t("rejectBtn3")}</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function AdminComplaintsView({ complaints, lang }) {
  const t = makeT(lang);
  const tone = { Open: "danger", Investigating: "warning", Resolved: "success" };
  return (
    <div className="flex flex-col gap-3">
      {complaints.map((c) => (
        <Card key={c.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{c.type}</p>
              <p className="ks-body text-sm mt-1" style={{ color: THEME.muted }}>{c.from} {t("vsLabel")} {c.against}</p>
              <p className="ks-body text-xs mt-1" style={{ color: "#9AA8B3" }}>{c.date} • {c.id}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={c.priority === "High" ? "danger" : "warning"}>{statusLabel(c.priority, lang)}</Badge>
              <Badge tone={tone[c.status]}>{statusLabel(c.status, lang)}</Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AdminFraudView({ alerts, lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <Card style={{ backgroundColor: THEME.redSoft, border: "none" }} className="flex items-center gap-3">
        <ShieldAlert size={20} color={THEME.red} />
        <p className="ks-body text-sm" style={{ color: THEME.ink }}>{t("fraudBannerText")}</p>
      </Card>
      {alerts.map((a) => (
        <Card key={a.id}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{a.type}</p>
              <p className="ks-body text-sm mt-1" style={{ color: THEME.muted }}>{a.entity}</p>
              <p className="ks-body text-sm mt-2" style={{ color: THEME.ink }}>{a.detail}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="ks-mono font-800 text-xl" style={{ color: a.risk > 80 ? THEME.red : THEME.amberDark }}>{a.risk}</p>
              <p className="text-[10px] ks-body uppercase tracking-wide" style={{ color: THEME.muted }}>{t("riskScoreLabel")}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 pt-4" style={{ borderTop: `1px solid ${THEME.border}` }}>
            <PrimaryButton small tone="red" icon={ShieldAlert}>{t("suspendAccountBtn")}</PrimaryButton>
            <PrimaryButton small tone="outline" icon={Eye}>{t("investigateBtn")}</PrimaryButton>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AdminMatchingView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="flex flex-col gap-4">
      <ChartCard title={t("factorWeightsTitle")} subtitle={t("howEngineScoresDesc")} height={220}>
        <BarChart data={MATCH_WEIGHTS} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={THEME.border} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis dataKey="factor" type="category" tick={{ fontSize: 12, fill: THEME.muted }} axisLine={false} tickLine={false} width={100} />
          <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${THEME.border}`, fontSize: 12 }} />
          <Bar dataKey="weight" radius={[0, 8, 8, 0]} fill={THEME.teal} />
        </BarChart>
      </ChartCard>
      <Card padded={false}>
        <div className="px-5 py-4"><p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t("recentMatchEventsTitle")}</p></div>
        <div className="ks-scroll overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="ks-body text-xs uppercase" style={{ color: THEME.muted, borderTop: `1px solid ${THEME.border}`, borderBottom: `1px solid ${THEME.border}` }}>
                <th className="text-left px-5 py-2.5 font-semibold">{t("colWorker4")}</th><th className="text-left px-5 py-2.5 font-semibold">{t("colJob3")}</th><th className="text-left px-5 py-2.5 font-semibold">{t("colMatchScore")}</th><th className="text-right px-5 py-2.5 font-semibold">{t("colOutcome")}</th>
              </tr>
            </thead>
            <tbody>
              {AI_MATCH_LOG.map((m, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td className="px-5 py-3 ks-body font-medium" style={{ color: THEME.ink }}>{m.worker}</td>
                  <td className="px-5 py-3 ks-body" style={{ color: THEME.muted }}>{m.job}</td>
                  <td className="px-5 py-3 w-40"><ProgressBar value={m.score} tone={m.score > 85 ? "green" : "amber"} /></td>
                  <td className="px-5 py-3 text-right"><Badge tone={m.outcome === "Hired" ? "success" : "info"}>{statusLabel(m.outcome, lang)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function AdminComplianceView({ lang }) {
  const t = makeT(lang);
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {COMPLIANCE_POLICIES.map((p) => (
        <Card key={p.titleKey} className="flex items-start justify-between gap-3">
          <div>
            <p className="ks-display font-800 text-sm" style={{ color: THEME.ink }}>{t(p.titleKey)}</p>
            <p className="ks-body text-sm mt-1.5" style={{ color: THEME.muted }}>{t(p.detailKey)}</p>
          </div>
          <Badge tone={p.status === "Active" ? "success" : "warning"} icon={p.status === "Active" ? CheckCircle2 : Clock}>{p.status === "Active" ? t("statusActive") : t("statusUnderReview")}</Badge>
        </Card>
      ))}
    </div>
  );
}

function AdminPanel({ lang, setLang, voiceActive, setVoiceActive, onSwitchRole }) {
  const t = makeT(lang);
  const [tab, setTab] = useState("dashboard");
  const titles = { dashboard: t("dashboard"), workers: t("workers"), companies: t("companies"), approvals: t("approvals"), verification: t("verification"), complaints: t("complaints"), fraud: t("fraud"), matching: t("matching"), compliance: t("compliance") };
  const navItems = ADMIN_NAV.map((n) => ({ ...n, label: titles[n.key] || n.label }));
  return (
    <PanelShell
      navItems={navItems} active={tab} onSelect={setTab} roleLabel={t("roleLabelAdmin")} roleTag={t("roleTagAdmin")}
      title={titles[tab] || t("dashboard")} lang={lang} setLang={setLang} voiceActive={voiceActive} setVoiceActive={setVoiceActive}
      userName={t("platformAdmin")} onSwitchRole={onSwitchRole}
    >
      {tab === "dashboard" && <AdminDashboardView lang={lang} />}
      {tab === "workers" && <AdminWorkersView workers={WORKERS} lang={lang} />}
      {tab === "companies" && <AdminCompaniesView companies={COMPANIES} lang={lang} />}
      {tab === "approvals" && <AdminApprovalsView lang={lang} />}
      {tab === "verification" && <AdminVerificationView lang={lang} />}
      {tab === "complaints" && <AdminComplaintsView complaints={COMPLAINTS} lang={lang} />}
      {tab === "fraud" && <AdminFraudView alerts={FRAUD_ALERTS} lang={lang} />}
      {tab === "matching" && <AdminMatchingView lang={lang} />}
      {tab === "compliance" && <AdminComplianceView lang={lang} />}
    </PanelShell>
  );
}

/* ======================================================================
   ROOT APP
====================================================================== */
export default function WorkHubPlatform() {
  const [role, setRole] = useState(null); // null | worker | company | admin
  const [lang, setLang] = useState("en");
  const [voiceActive, setVoiceActive] = useState(false);

  const handleSwitchRole = () => { setRole(null); setVoiceActive(false); };

  return (
    <div className="ks-body w-full" style={{ minHeight: "100vh" }}>
      <style>{FONTS}</style>
      {!role && <Landing lang={lang} setLang={setLang} onEnter={(r) => setRole(r)} />}
      {role === "worker" && <WorkerPanel lang={lang} setLang={setLang} voiceActive={voiceActive} setVoiceActive={setVoiceActive} onSwitchRole={handleSwitchRole} />}
      {role === "company" && <CompanyPanel lang={lang} setLang={setLang} voiceActive={voiceActive} setVoiceActive={setVoiceActive} onSwitchRole={handleSwitchRole} />}
      {role === "admin" && <AdminPanel lang={lang} setLang={setLang} voiceActive={voiceActive} setVoiceActive={setVoiceActive} onSwitchRole={handleSwitchRole} />}
    </div>
  );
}
