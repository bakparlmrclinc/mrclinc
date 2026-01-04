"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface Question {
  id: string;
  question: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
  explanation: string;
}

interface ModuleContent {
  id: string;
  title: string;
  sections: {
    title: string;
    content: string[];
  }[];
  questions: Question[];
  passScore: number;
}

<<<<<<< HEAD
// Module content data - REVISED per MD specification
=======
// Module content data
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
const moduleData: Record<string, ModuleContent> = {
  fundamentals: {
    id: "fundamentals",
    title: "PD Fundamentals",
    sections: [
      {
        title: "What is a Pathway Developer?",
        content: [
<<<<<<< HEAD
          "A Pathway Developer (PD) is an independent professional who creates visibility for MrClinc within their own professional channels, ensures requests enter the platform correctly, and supports patients with platform and process-related questions (excluding any medical or treatment-related topics).",
          "What a PD is NOT: NOT an employee of MrClinc, NOT a sales agent or affiliate, NOT a medical advisor, NOT a travel companion, NOT a broker or referrer.",
          "Key Terminology — Use These: 'Pathway Developer' (not Referrer/Agent), 'Earnings' (not Commission), 'Request' (not Referral/Lead), 'Case' (not Lead/Client), 'Coordinate' (not Sell/Generate), 'Patient' (not Customer/Client), 'Coordination' (not Facilitation of treatment).",
=======
          "A Pathway Developer (PD) is an independent professional who creates patient flow through their own channels, ensures requests enter the platform correctly, and supports patients passively (no travel accompaniment).",
          "PD is NOT: An employee of MrClinc, a sales agent or affiliate, a medical advisor, or a travel companion.",
          "Key terminology: 'Pathway Developer' (not 'referrer'), 'Earnings' (not 'commission'), 'Request' (not 'referral'), 'Case' (not 'lead').",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
      {
        title: "PD's Five Core Responsibilities",
        content: [
<<<<<<< HEAD
          "1. Build & Manage Your Own Channel - You choose where to create visibility (GP practices, pharmacies, community spaces, etc.). Platform does NOT dictate your channel strategy. You manage your professional relationships and approach.",
          "2. Be the Entry Point - Explain what MrClinc is (and what it is NOT), direct patients to the application form, ensure the request contains sufficient information to proceed within the platform.",
          "3. Ensure Good Case Start - Minimum information collected correctly, patient understands the process, escalate to platform if something is stuck.",
          "4. Follow Platform Standards - NO medical advice, NO clinic selection or recommendation, NO promises or guarantees, NO bargaining or price negotiation, NO pressure tactics.",
          "5. Record & Transparency - Log cases in platform, report obstacles or issues, maintain trackable, documentable flow.",
=======
          "1. Build & Manage Own Channel - You choose where to create visibility (GP practices, pharmacies, etc.). Platform does NOT dictate your channel strategy.",
          "2. Be the Entry Gate - Explain what MrClinc is (and is NOT), direct patients to application form, ensure case becomes usable.",
          "3. Ensure Good Case Start - Minimum info collected, documents gathered if required, escalate to platform if stuck.",
          "4. Follow Platform Standards - NO medical advice, NO clinic selection judgement, NO promises or bargaining, NO pressure tactics.",
          "5. Record & Transparency - Log cases in platform, report obstacles, maintain trackable flow.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
      {
        title: "What PDs Do NOT Do (Boundaries)",
        content: [
<<<<<<< HEAD
          "PDs do NOT: Provide medical advice or diagnosis, recommend specific clinics or doctors, access patient medical records, access clinic quotes or pricing through the platform, make promises about outcomes or results, negotiate prices with clinics, handle patient payments.",
          "Why These Boundaries Exist: Legal (only licensed professionals can give medical advice), Ethical (patient must control all decisions), Quality (platform maintains consistent standards), GDPR (patient data privacy must be protected), Trust (boundaries protect both patient and PD).",
=======
          "PDs do NOT: Provide medical advice or diagnosis, recommend specific clinics, access patient medical records, see clinic quotes/pricing (unless patient shares), accompany patients on travel, make promises about outcomes, or negotiate prices.",
          "Why these boundaries exist: Legal (only licensed professionals can give medical advice), Ethical (patient must control all decisions), Quality (platform maintains standards), GDPR (patient data privacy must be protected).",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
      {
        title: "The MrClinc Model",
        content: [
<<<<<<< HEAD
          "MrClinc is a coordination platform that: Connects patients with clinical channels, coordinates the introduction process, facilitates communication flow, ensures consent-based workflow, tracks cases with reference codes (TRK-XXXXX).",
          "MrClinc does NOT: Provide medical treatment, set prices or negotiate, make clinical decisions, choose 'best' clinic for patient, handle medical documents, guarantee outcomes.",
          "Your Role as PD: Help patient ACCESS the platform, ensure quality case entry, support patient with process questions, escalate issues when needed, NOT make medical/clinical decisions.",
        ],
      },
      {
        title: "Understanding the Patient Journey",
        content: [
          "Patient Flow Through MrClinc: Patient Contact → Request Submitted → Case Prepared → Clinical Channel Connected → Clinic Contacts Patient → Patient Decides",
          "Where PD is Involved: ✅ Initial contact and explanation, ✅ Guiding to request form, ✅ Answering process questions, ✅ Escalating delays or issues. ❌ NOT involved in clinical communication, ❌ NOT involved in pricing/quotes, ❌ NOT involved in medical decisions.",
=======
          "MrClinc is a coordination platform that connects patients with clinics, coordinates the introduction process, facilitates communication, and ensures consent-based workflow.",
          "MrClinc does NOT: Provide medical treatment, set prices or negotiate, make clinical decisions, or choose 'best' clinic for patient.",
          "Your role as PD: Help patient ACCESS the platform, ensure quality case entry, support patient with process questions, NOT make medical/clinical decisions.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        question: "A Pathway Developer is best described as:",
        options: [
          { label: "A sales agent earning commissions on medical referrals", value: "a" },
<<<<<<< HEAD
          { label: "An independent professional creating visibility for MrClinc and ensuring quality case entry", value: "b" },
=======
          { label: "An independent professional creating patient flow and ensuring quality case entry", value: "b" },
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          { label: "A travel companion helping patients navigate Antalya", value: "c" },
          { label: "A medical advisor helping patients choose the best clinic", value: "d" },
        ],
        correctAnswer: "b",
<<<<<<< HEAD
        explanation: "PDs are independent professionals who create visibility and ensure cases enter correctly. They do NOT sell, accompany, or advise medically.",
=======
        explanation: "PDs are independent professionals who create flow and ensure cases enter correctly. They do NOT sell, accompany, or advise medically.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
      },
      {
        id: "q2",
        question: "Which term is CORRECT to use?",
        options: [
          { label: "'I earn commissions on referrals'", value: "a" },
          { label: "'I earn earnings on requests I coordinate'", value: "b" },
          { label: "'I get paid for leads I generate'", value: "c" },
          { label: "'I'm an affiliate marketer for clinics'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Correct terminology: 'Earnings' (not commission), 'Requests' (not referrals), 'Coordinate' (not generate/sell).",
      },
      {
        id: "q3",
        question: "A patient asks: 'Which clinic should I choose?' You should:",
        options: [
<<<<<<< HEAD
          { label: "Recommend the clinic with the best earnings rate", value: "a" },
          { label: "Say: 'Clinic A is the best in Antalya'", value: "b" },
          { label: "Say: 'You'll receive information from clinics. You compare and decide. I can't make that choice for you.'", value: "c" },
          { label: "Ask your MrClinc contact which clinic to recommend", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "PDs NEVER recommend specific clinics. Patient compares and decides. This is a firm boundary.",
=======
          { label: "Recommend the clinic with the best commission rate", value: "a" },
          { label: "Say: 'Clinic A is the best in Antalya'", value: "b" },
          { label: "Say: 'You'll receive quotes from clinics. You compare and decide. I can't make that choice for you.'", value: "c" },
          { label: "Ask your MrClinc contact which clinic to recommend", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "PDs NEVER recommend specific clinics. Patient compares quotes and decides. This is a firm boundary.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
      },
      {
        id: "q4",
        question: "Which of these is a PD's responsibility?",
        options: [
          { label: "Negotiate prices with clinics on patient's behalf", value: "a" },
          { label: "Review patient's medical records to assess suitability", value: "b" },
          { label: "Ensure the patient's request contains minimum necessary information", value: "c" },
          { label: "Accompany patient to Antalya and translate at appointments", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "PD ensures case has minimum info for platform to process. PDs do NOT negotiate, review medical data, or accompany.",
      },
      {
        id: "q5",
        question: "A patient shows you their lab results and asks: 'Is this cancer?' You should:",
        options: [
          { label: "Review the results and give your medical opinion", value: "a" },
<<<<<<< HEAD
          { label: "Say: 'I'm not qualified to interpret results. Please discuss with your doctor or request a Second Opinion through the platform.'", value: "b" },
=======
          { label: "Say: 'I'm not medically qualified to interpret results. Please discuss with your doctor or request a Second Opinion through the platform.'", value: "b" },
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          { label: "Google the results and explain what you find", value: "c" },
          { label: "Ask a doctor friend and relay their opinion", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "PDs NEVER give medical advice. Redirect to qualified professionals or platform's Second Opinion service.",
      },
      {
        id: "q6",
        question: "MrClinc's role is best described as:",
        options: [
          { label: "A medical tourism agency that finds the best deals", value: "a" },
          { label: "A hospital in Antalya providing treatments", value: "b" },
<<<<<<< HEAD
          { label: "A coordination platform connecting patients with clinical channels", value: "c" },
=======
          { label: "A coordination platform connecting patients with providers", value: "c" },
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          { label: "A price comparison website for medical procedures", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "MrClinc coordinates introductions. We do NOT provide treatment, set prices, or act as an agency.",
      },
      {
        id: "q7",
<<<<<<< HEAD
        question: "Can you access clinic quotes sent to your patients?",
        options: [
          { label: "Yes, I have access to all quotes in my PD portal", value: "a" },
          { label: "No, PDs do not access clinic quotes or pricing through the platform", value: "b" },
=======
        question: "Can you see the clinic quotes sent to your patients?",
        options: [
          { label: "Yes, I have access to all quotes in my PD portal", value: "a" },
          { label: "No, unless the patient voluntarily shares them with me", value: "b" },
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          { label: "Yes, but only after the patient accepts a quote", value: "c" },
          { label: "Yes, I need to see quotes to help patients decide", value: "d" },
        ],
        correctAnswer: "b",
<<<<<<< HEAD
        explanation: "PDs do NOT access quotes/pricing through the platform. This is patient-controlled data.",
      },
      {
        id: "q8",
        question: "Why do boundaries exist for PDs?",
        options: [
          { label: "To make the job harder", value: "a" },
          { label: "To protect patients, maintain legal compliance, and ensure ethical practice", value: "b" },
          { label: "To prevent PDs from earning too much", value: "c" },
          { label: "Because MrClinc doesn't trust PDs", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Boundaries protect patients, ensure legal compliance (medical advice, GDPR), and maintain ethical standards.",
      },
      {
        id: "q9",
        question: "A patient asks you to call the clinic and negotiate a lower price. You should:",
        options: [
          { label: "Call and negotiate — happy patients mean good reviews", value: "a" },
          { label: "Explain that you don't negotiate prices; pricing is between patient and clinic", value: "b" },
          { label: "Add a fake discount and pocket the difference", value: "c" },
          { label: "Tell the patient to find a cheaper option elsewhere", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "PDs do NOT negotiate prices. This is strictly between patient and clinic.",
      },
      {
        id: "q10",
        question: "What happens when a patient submits a request?",
        options: [
          { label: "PD reviews medical details and forwards to best clinic", value: "a" },
          { label: "Platform assigns a tracking code and coordinates with clinical channels", value: "b" },
          { label: "PD calls clinics to get the best price", value: "c" },
          { label: "Patient is automatically booked for surgery", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Platform handles coordination. PD's role ends at quality case entry; they don't see medical details or choose clinics.",
      },
    ],
    passScore: 80,
  },
  "target-hints": {
    id: "target-hints",
    title: "Target Hints Masterclass",
    sections: [
      {
        title: "The Win-Win Principle",
        content: [
          "Core Concept: Target professions where the professional's business continues even if the patient proceeds with treatment abroad.",
          "Win-Win Means: The professional you approach doesn't lose business, they may even gain (e.g., referral for pre/post care), no conflict of interest, sustainable long-term relationship possible.",
          "Examples: Barber/Hairdresser ✅ Yes (patient still needs haircuts regardless of hair transplant), Pharmacist ✅ Yes (patient still needs medications before/after), GP ✅ Yes (GP remains primary care provider), UK Plastic Surgeon ❌ No (direct competitor — loses the surgery), UK Dental Clinic ❌ No (direct competitor — loses the procedure).",
        ],
      },
      {
        title: "Green Light Professions",
        content: [
          "Tier 1 — Highest Compatibility: Barbers/Hairdressers (see hair concerns daily, no conflict — 'Your clients ask about hair loss options'), Pharmacists (trusted, see health queries, no treatment conflict — 'Patients ask you about options abroad'), Gym Trainers/PTs (body image conversations, no medical conflict — 'Members mention cosmetic goals'), Beauty Salons (aesthetic conversations natural, no surgery offered — 'Clients discuss procedure options').",
          "Tier 2 — Good Compatibility: GPs (primary care touchpoints, patients may ask about additional options — 'Patients ask about alternatives'), Physiotherapists (see post-injury patients, no surgery conflict — 'Patients mention surgical options'), Opticians (see patients, no overlap with MrClinc services — general health touchpoint), Community Nurses (trusted, home visits, see unmet needs — 'Patients mention scheduling concerns').",
        ],
      },
      {
        title: "Red Light Professions (Avoid)",
        content: [
          "Do NOT Target: UK Private Surgeons (direct competitors — you're taking their business), UK Private Clinics (same — conflict of interest), Hospital Staff NHS (complex ethics, employment restrictions), Insurance Brokers (regulatory complications).",
          "Why This Matters: Conflict creates resistance, unethical to approach competitors, damages MrClinc reputation, not sustainable long-term.",
        ],
      },
      {
        title: "The Approach Framework",
        content: [
          "Step 1: Permission First - Never leave materials without asking, explain briefly what you do, ask: 'Would you be open to having some cards here for patients who ask?'",
          "Step 2: Win-Win Explanation - Explain how it doesn't affect their business, show potential benefit (patients return for pre/post care), be clear about what MrClinc is (and is NOT).",
          "Step 3: Minimal Ask - Start with just leaving cards, don't ask them to actively refer, let the relationship develop naturally.",
          "Step 4: Respect 'No' - If they decline, thank them and move on, don't argue or pressure, maintain professionalism.",
          "Example Script: 'Hi, I'm [name]. I coordinate healthcare pathways for UK patients exploring treatment options in Turkey. Patients going abroad for procedures still need their regular care here — haircuts, prescriptions, check-ups. Would you be open to having some information cards here for anyone who asks about it? No pressure to actively recommend — just information for those already looking.'",
        ],
      },
      {
        title: "Building Long-Term Channels",
        content: [
          "Sustainable Relationships: Check in periodically (not too often), provide updates if materials run low, share success stories (anonymised, with consent), be a resource, not a burden.",
          "Signs of a Good Channel: Professional is comfortable with arrangement, patients contact you mentioning the location, relationship feels mutual, not transactional.",
          "Signs to Move On: Professional seems uncomfortable, no patient contact after reasonable time, negative feedback from patients about the location.",
        ],
      },
    ],
    questions: [
      {
        id: "q1",
=======
        explanation: "PDs do NOT see quotes/pricing. This is patient-controlled data. Patient may share if they choose.",
      },
      {
        id: "q8",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        question: "'Win-win' in PD work means:",
        options: [
          { label: "Both patient and clinic are happy", value: "a" },
          { label: "The profession you target doesn't lose business if patient proceeds", value: "b" },
          { label: "You and the platform both earn money", value: "c" },
          { label: "Patient saves money and clinic gets business", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "'Win-win' = conflict-free targeting. The professional's business continues even if patient proceeds.",
      },
      {
<<<<<<< HEAD
        id: "q2",
        question: "Which profession is a GREEN LIGHT target?",
        options: [
          { label: "UK Private Plastic Surgeon", value: "a" },
          { label: "Barber/Hairdresser", value: "b" },
          { label: "UK Dental Clinic", value: "c" },
          { label: "Private Hospital Administrator", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Barbers see clients with hair concerns but don't offer hair transplants — no conflict.",
      },
      {
        id: "q3",
        question: "Why is a pharmacist a good target?",
        options: [
          { label: "They can prescribe treatments for Turkey", value: "a" },
          { label: "They're trusted health touchpoints with no treatment conflict", value: "b" },
          { label: "They give discounts on medications", value: "c" },
          { label: "They can diagnose patients for you", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Pharmacists are trusted, see health queries, and don't offer competing services.",
      },
      {
        id: "q4",
        question: "You should AVOID targeting:",
        options: [
          { label: "Gym trainers", value: "a" },
          { label: "UK private cosmetic surgeons", value: "b" },
          { label: "Beauty salon owners", value: "c" },
          { label: "Physiotherapists", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "UK private surgeons are direct competitors — targeting them is unethical and creates conflict.",
      },
      {
        id: "q5",
        question: "When approaching a new profession, your FIRST step should be:",
        options: [
          { label: "Leave materials and walk away", value: "a" },
          { label: "Ask permission and explain what you do", value: "b" },
          { label: "Offer them a cut of your earnings", value: "c" },
          { label: "Tell them how much money they could make", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Always ask permission first. Explain briefly, then make a minimal ask.",
      },
      {
        id: "q6",
        question: "A hairdresser says 'No thanks, not interested.' You should:",
        options: [
          { label: "Argue that it's a great opportunity", value: "a" },
          { label: "Leave materials anyway", value: "b" },
          { label: "Thank them and move on professionally", value: "c" },
          { label: "Offer them money to reconsider", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Respect 'no.' Thank them and maintain professionalism. Don't pressure.",
      },
      {
        id: "q7",
        question: "Which is the BEST opening line?",
        options: [
          { label: "'Want to make extra money referring patients?'", value: "a" },
          { label: "'I coordinate healthcare pathways for patients exploring options in Turkey. Would you be open to having information cards here?'", value: "b" },
          { label: "'I can get your clients cheap surgery abroad'", value: "c" },
          { label: "'Sign up as my referral partner'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Professional, explains role clearly, minimal ask, no pressure or financial incentive language.",
      },
      {
        id: "q8",
        question: "A gym trainer asks 'What's in it for me?' You should say:",
        options: [
          { label: "'I'll give you £50 per referral'", value: "a" },
          { label: "'Your members still train with you before and after any procedure — it doesn't affect your business'", value: "b" },
          { label: "'You could make thousands'", value: "c" },
          { label: "'Nothing, just help people'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Explain the win-win: their business isn't affected. Don't offer financial incentives.",
      },
      {
        id: "q9",
        question: "Signs of a GOOD channel include:",
        options: [
          { label: "The professional actively sells your services", value: "a" },
          { label: "Patients contact you mentioning that location", value: "b" },
          { label: "You have to visit weekly to maintain it", value: "c" },
          { label: "The professional asks for commission", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Patients mentioning the location = successful passive channel. No active selling required.",
=======
        id: "q9",
        question: "A patient asks for medical advice about recovery after surgery. You should:",
        options: [
          { label: "Share what you've learned from other patients", value: "a" },
          { label: "Give basic advice since recovery isn't as sensitive as diagnosis", value: "b" },
          { label: "Say: 'I can't advise medically. The clinic will guide you, or escalate questions to MrClinc team.'", value: "c" },
          { label: "Research online and share helpful articles", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "NO medical advice, ever. This includes recovery, side effects, complications. Always redirect.",
      },
      {
        id: "q10",
        question: "What does 'escalation' mean for a PD?",
        options: [
          { label: "Increasing your commission rate", value: "a" },
          { label: "Flagging an issue to the platform team when you're stuck", value: "b" },
          { label: "Promoting the platform more aggressively", value: "c" },
          { label: "Upgrading a patient to a premium service", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Escalation = reporting obstacles, stuck cases, or issues you can't resolve to the platform team.",
      },
    ],
    passScore: 80,
  },
  "target-hints": {
    id: "target-hints",
    title: "Target Hints Masterclass",
    sections: [
      {
        title: "Why Conflict-Free Targeting Matters",
        content: [
          "If you target a professional whose business COMPETES with the service you're promoting, they will NOT want to help you. Worse, it's unethical.",
          "Example of CONFLICT: Targeting a hair transplant surgeon in the UK to refer patients to Turkey. You're asking them to give away their own business.",
          "Example of WIN-WIN: Targeting a barber to refer hair loss patients. Barber can't do surgery. Barber's business (haircuts) continues even if patient gets transplant.",
          "The Principle: Target professions whose core business continues even if the patient proceeds with the medical service.",
        ],
      },
      {
        title: "How to Approach Target Professions",
        content: [
          "Step 1: Permission First - NEVER leave materials without permission. Speak to owner/manager.",
          "Step 2: Explain Win-Win - Make it clear their business is NOT threatened. 'Your service continues. This is for cases you can't handle.'",
          "Step 3: Leave Information and Go - Don't be pushy. Leave card, QR code, or link. Check back occasionally.",
          "Step 4: Log and Track - Record which locations you've approached, note permission granted/denied.",
        ],
      },
      {
        title: "What NOT to Do (Red Lines)",
        content: [
          "DO NOT: Leave materials without permission (trespassing/littering), target competitors, use aggressive tactics, approach patients directly without professional's knowledge.",
          "DO NOT: Make medical claims ('100% success rate'), promise outcomes ('You'll definitely get great results'), target vulnerable groups aggressively.",
          "If a professional says NO, respect it immediately. Do not return or pressure.",
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        question: "'Conflict-free targeting' means:",
        options: [
          { label: "Avoiding arguments with professionals you approach", value: "a" },
          { label: "Targeting professions whose business continues even if patient proceeds", value: "b" },
          { label: "Only targeting professionals you already know", value: "c" },
          { label: "Avoiding competitive markets", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Conflict-free means their core business is unaffected by the patient's medical decision.",
      },
      {
        id: "q2",
        question: "You want to approach a barber shop. What's the FIRST step?",
        options: [
          { label: "Leave information cards when no one is looking", value: "a" },
          { label: "Talk to a few customers and give them flyers", value: "b" },
          { label: "Speak to the owner/manager and ask permission to leave materials", value: "c" },
          { label: "Post information on their social media page", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Always get permission first from the owner/manager before leaving any materials.",
      },
      {
        id: "q3",
        question: "Why is targeting a UK hair transplant surgeon a BAD idea?",
        options: [
          { label: "They're too busy to help", value: "a" },
          { label: "It's direct competition - you're asking them to give away their own business", value: "b" },
          { label: "They don't know about Turkish clinics", value: "c" },
          { label: "UK surgeons can't refer internationally", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "This creates a direct conflict of interest. They would be undermining their own business.",
      },
      {
        id: "q4",
        question: "A pharmacist asks: 'Why would I help you? Won't this hurt my business?' You respond:",
        options: [
          { label: "'You'll earn a commission if you help'", value: "a" },
          { label: "'Your product sales continue. This is for cases where products alone aren't enough. We're complementary, not competitive.'", value: "b" },
          { label: "'It won't hurt you, trust me'", value: "c" },
          { label: "'I'll send customers to you in return'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Explain the win-win clearly - their business continues, this is complementary.",
      },
      {
        id: "q5",
        question: "A barber says: 'I'm not comfortable with this.' You should:",
        options: [
          { label: "Explain more aggressively until they understand", value: "a" },
          { label: "Leave materials anyway; they might change their mind", value: "b" },
          { label: "Respect their decision, thank them politely, and leave", value: "c" },
          { label: "Ask to speak to another staff member instead", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Respect 'no' immediately. Don't pressure or circumvent their decision.",
      },
      {
        id: "q6",
        question: "Which approach is appropriate for cancer patients?",
        options: [
          { label: "Approach patients directly in waiting rooms", value: "a" },
          { label: "Speak to oncology nurses about offering free Second Opinion information", value: "b" },
          { label: "Post ads in cancer support group forums without permission", value: "c" },
          { label: "Tell patients 'Turkish clinics are better than NHS'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Extra sensitivity required for cancer. Work through professionals, offer FREE Second Opinion, never claim superiority.",
      },
      {
        id: "q7",
        question: "Target Hints are:",
        options: [
          { label: "Mandatory requirements for where you must create flow", value: "a" },
          { label: "Advisory suggestions of conflict-free professions; you choose your own strategy", value: "b" },
          { label: "A list of professions that have already agreed to work with MrClinc", value: "c" },
          { label: "The only legal way to promote MrClinc", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Target Hints are advisory suggestions, not mandates. You build your own channel strategy.",
      },
      {
        id: "q8",
        question: "You've been given permission to leave cards at a GP practice. When should you return?",
        options: [
          { label: "Every day to check if cards are gone", value: "a" },
          { label: "Monthly to restock and briefly check in (if permission was for ongoing)", value: "b" },
          { label: "Never, just leave cards once", value: "c" },
          { label: "Whenever you feel like it", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Maintain relationships with reasonable, agreed-upon check-ins - not too frequent, not abandoned.",
      },
      {
        id: "q9",
        question: "You discover a UK private clinic that does hair transplants. Should you approach them?",
        options: [
          { label: "Yes, approach them - they might refer overflow cases", value: "a" },
          { label: "No, this is direct competition - violates conflict-free principle", value: "b" },
          { label: "Yes, but offer them a partnership deal", value: "c" },
          { label: "Yes, approach anonymously", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Never target direct competitors. Their business would be negatively affected.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
      },
      {
        id: "q10",
        question: "A dietitian asks: 'What's the success rate of bariatric surgery in Turkey?' You respond:",
        options: [
          { label: "Research and give them specific numbers you find online", value: "a" },
          { label: "'I don't have clinical data. Patients can request detailed information through the platform, and clinics provide it directly.'", value: "b" },
          { label: "'Very high! Everyone is happy with results.'", value: "c" },
          { label: "'I can send you testimonials from past patients'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "PDs don't provide clinical data, success rates, or testimonials. Redirect to platform/clinic.",
      },
    ],
    passScore: 80,
  },
  "second-opinion": {
    id: "second-opinion",
    title: "Second Opinion Strategy",
    sections: [
      {
<<<<<<< HEAD
        title: "What is the Free Second Opinion?",
        content: [
          "The Free Second Opinion (FSO) is available for oncology and general surgery cases. It allows patients to receive a clinical evaluation from specialist clinics at no cost.",
          "How it works: 1) Patient submits a request through MrClinc (no documents uploaded to us), 2) We assign a tracking code and connect with the relevant clinical channel, 3) The clinic contacts patient directly to request any necessary documents, 4) Specialist clinicians review the case and share their evaluation, 5) Patient decides whether to proceed — there's no obligation.",
          "The FSO is a pathway to clarity, not a sales funnel. If patient chooses not to proceed, that's the end of it.",
        ],
      },
      {
        title: "Why Second Opinion is Powerful for PDs",
        content: [
          "Zero Risk: Completely free for patient, no obligation to proceed, no documents uploaded to MrClinc.",
          "Natural Conversation Starter: Easy to introduce without seeming 'sales-y', builds immediate trust.",
          "High Conversion: 40-60% vs 10-20% for cold inquiries, because patient already engaged with process.",
          "Key Points to Emphasize: FREE (no hidden fees), NO obligation, PROFESSIONAL review by specialist clinicians, FAST turnaround (typically 5-7 days).",
=======
        title: "Why Second Opinion is Powerful",
        content: [
          "Second Opinion is a FREE professional medical review of a patient's diagnosis or treatment plan by qualified specialists. Available for Cancer Surgery and General Surgery ONLY.",
          "Why it's powerful: Zero risk for patient (completely free, no obligation), natural conversation starter, builds immediate trust, and has a high conversion rate (40-60% vs 10-20% for cold inquiries).",
          "The process: Patient submits request, clinic reviews documents (5-7 days), patient receives written report. NO travel required, NO commitment needed.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
      {
        title: "How to Introduce Second Opinion",
        content: [
<<<<<<< HEAD
          "Framework: Identify candidates (cancer patients, general surgery patients, those with scheduling concerns), explain the service clearly, emphasize FREE and NO obligation, guide to platform.",
          "Example Approach: 'MrClinc offers free second opinions from specialist clinics. Completely free, no obligation. The clinic reviews your case within about a week and shares their evaluation. Many patients find it helpful for peace of mind.'",
          "What to Say: 'Some patients find second opinions helpful for clarity or peace of mind. It's an option if you'd like.' What NOT to Say: 'You NEED to get this!' or 'NHS is overwhelmed.'",
=======
          "Framework: Identify candidates (cancer patients, general surgery patients, NHS waiters), explain the service clearly, emphasize FREE and NO obligation, guide to platform.",
          "Example approach: 'MrClinc offers free second opinions from experienced specialists. Completely free, no obligation. Review happens within 5-7 days and you receive a written report. Many patients find it helpful for peace of mind.'",
          "Key points to emphasize: FREE (no hidden fees), NO obligation, PROFESSIONAL review, FAST turnaround.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
      {
        title: "Special Sensitivity for Cancer Patients",
        content: [
          "Cancer patients are in a vulnerable state. Extra care is required.",
<<<<<<< HEAD
          "DO: Be empathetic and patient, use phrases like 'some patients find helpful', emphasize 'no pressure', offer information and step back, acknowledge their trust in their current doctors is valid.",
          "DO NOT: Use urgency tactics ('act fast!'), criticize NHS or their current care, make promises ('they'll find better treatment'), push hard or follow up repeatedly.",
          "If they say 'I trust my NHS doctor': 'That's absolutely fine. Trust in your doctor is important. If you ever change your mind, the option exists.'",
        ],
      },
      {
        title: "When to Escalate",
        content: [
          "Escalate to Platform When: Patient has complex medical questions you can't answer, patient is very distressed, patient reports problem or delay with clinic, you're unsure how to proceed.",
          "Remember: FSO is about providing options, not pushing decisions. Your role is to make patients aware of the service, not to convince them to use it.",
=======
          "DO: Be empathetic and patient, use phrases like 'some patients find helpful', emphasize 'no pressure', offer information and step back.",
          "DO NOT: Use urgency tactics ('act fast!'), criticize NHS, make promises ('they'll find better treatment'), push hard.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        question: "Second Opinion is powerful for PDs because:",
        options: [
          { label: "It's a high-commission service", value: "a" },
          { label: "It's free and low-risk, making it easy to introduce without seeming 'sales-y'", value: "b" },
          { label: "It guarantees the patient will proceed with treatment", value: "c" },
          { label: "It allows you to give medical advice", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Free and no-risk makes Second Opinion the easiest conversation starter that builds trust.",
      },
      {
        id: "q2",
        question: "A cancer patient asks: 'Should I get a second opinion?' You respond:",
        options: [
          { label: "'Definitely! NHS might be wrong.'", value: "a" },
          { label: "'Many patients find it helpful for peace of mind. It's free and no obligation. Completely your choice.'", value: "b" },
          { label: "'You should always get a second opinion for cancer.'", value: "c" },
          { label: "'Let me review your diagnosis first, then I'll tell you.'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Supportive without pressure, emphasizes free/no obligation, respects patient's decision.",
      },
      {
        id: "q3",
        question: "Which phrase is APPROPRIATE when discussing Second Opinion?",
        options: [
          { label: "'You NEED to get a second opinion before it's too late!'", value: "a" },
          { label: "'NHS is overwhelmed; get a better opinion from Turkey.'", value: "b" },
          { label: "'Some patients find second opinions helpful for clarity or peace of mind. It's an option if you'd like.'", value: "c" },
          { label: "'I've seen many cases like yours; you should definitely proceed.'", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Neutral, supportive, no pressure - the appropriate approach.",
      },
      {
        id: "q4",
        question: "A patient says: 'I trust my NHS doctor. I don't need a second opinion.' You respond:",
        options: [
          { label: "'Are you sure? It's free, you might as well.'", value: "a" },
          { label: "'NHS doctors are overworked; you should get a better opinion.'", value: "b" },
          { label: "'That's absolutely fine. Trust in your doctor is important. If you ever change your mind, the option exists.'", value: "c" },
          { label: "Keep trying to convince them over the next few days", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Respect their decision completely. No pressure, door stays open.",
      },
      {
        id: "q5",
        question: "When should you escalate a Second Opinion case?",
        options: [
          { label: "Never, you should handle everything yourself", value: "a" },
          { label: "Only if the patient is angry", value: "b" },
          { label: "If patient has complex medical questions, is very distressed, or you're unsure how to proceed", value: "c" },
          { label: "Every time, for every case", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Escalate when you're stuck, patient is distressed, or questions exceed your scope.",
      },
      {
        id: "q6",
        question: "Which is the BEST target profession for Second Opinion services?",
        options: [
          { label: "Private hospital surgeons in the UK", value: "a" },
          { label: "Oncology nurse specialists (high patient contact, no treatment competition)", value: "b" },
          { label: "Random people on the street", value: "c" },
          { label: "Social media cancer groups (unsolicited)", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Oncology nurses have high patient contact and don't compete with surgical treatment.",
      },
      {
        id: "q7",
        question: "A patient asks: 'Will the second opinion be better than my NHS diagnosis?' You respond:",
        options: [
          { label: "'Yes, Turkish specialists are more experienced.'", value: "a" },
          { label: "'Probably, NHS is overwhelmed.'", value: "b" },
          { label: "'I can't compare medical expertise. A second opinion provides an additional professional perspective. You and your doctors decide how to use that information.'", value: "c" },
          { label: "'Definitely! NHS often misses things.'", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Never claim superiority. Second opinion is additional perspective, not replacement.",
      },
      {
        id: "q8",
        question: "What does 'no obligation' mean in the context of Second Opinion?",
        options: [
          { label: "Patient doesn't have to pay for the review", value: "a" },
          { label: "Patient doesn't have to proceed with treatment in Turkey after review", value: "b" },
          { label: "Both A and B", value: "c" },
          { label: "Patient doesn't have to share their results with anyone", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "No obligation means: free (no payment) AND no requirement to proceed with treatment.",
      },
    ],
    passScore: 80,
  },
  compliance: {
    id: "compliance",
    title: "Compliance & Ethics",
    sections: [
      {
        title: "GDPR Basics for PDs",
        content: [
          "Personal data includes: name, email, phone, medical information, location - any identifiable information.",
          "PD's GDPR Responsibilities: Minimal data collection (only what's necessary), secure storage, patient consent required, no sharing without permission.",
<<<<<<< HEAD
          "Use platform messaging whenever possible; avoid storing or sharing patient data in personal messaging apps.",
=======
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          "Don't discuss Patient A with Patient B. Don't post patient stories without explicit written permission.",
        ],
      },
      {
        title: "Medical Advice Boundaries (Hard Lines)",
        content: [
          "YOU CANNOT: Diagnose, recommend treatment, interpret results, predict outcomes, advise on medications, compare treatments.",
<<<<<<< HEAD
          "YOU CAN: Provide platform information, explain process, offer Second Opinion pathway, escalate questions to team.",
=======
          "YOU CAN: Provide platform information, explain process, offer Second Opinion, escalate questions to team.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          "Even 'helpful' medical advice is crossing the line. Always redirect to qualified professionals.",
        ],
      },
      {
<<<<<<< HEAD
        title: "Financial Boundaries",
        content: [
          "PDs do NOT: Discuss pricing or quotes with patients (unless patient voluntarily shares), negotiate prices with clinics, collect any payments from patients, promise specific costs or savings.",
          "The coordination service is free for patients. Payment is directly between patient and clinic.",
        ],
      },
      {
        title: "Ethical Scenarios",
        content: [
          "Patient shares full medical records: 'I don't need to see these. Keep them secure and share only with licensed professionals through the platform.'",
          "Patient asks you to negotiate price: 'I don't negotiate prices. That's between you and the clinic directly.'",
=======
        title: "Ethical Scenarios",
        content: [
          "Patient shares full medical records: 'I don't need to see these. Keep them secure and share only with licensed professionals.'",
          "Patient asks you to negotiate price: 'I don't negotiate prices. That's between you and the clinic.'",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          "Patient wants you to choose clinic: 'I can't make that choice for you. You compare based on your priorities.'",
          "Another patient asks about a previous patient: 'I can't discuss other patients due to privacy rules.'",
        ],
      },
    ],
    questions: [
      {
        id: "q1",
        question: "Under GDPR, which information is considered 'personal data'?",
        options: [
          { label: "Only credit card numbers", value: "a" },
          { label: "Name, email, phone, medical info, any identifiable information", value: "b" },
          { label: "Only medical information", value: "c" },
          { label: "Only if patient says it's sensitive", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Personal data is any information that can identify a person.",
      },
      {
        id: "q2",
        question: "A patient sends you their full medical records. You should:",
        options: [
          { label: "Review them carefully to understand their case", value: "a" },
          { label: "Forward them to MrClinc team immediately", value: "b" },
          { label: "Say: 'I don't need these. Keep them secure and share only with licensed professionals through the platform.'", value: "c" },
          { label: "Store them securely in case you need them later", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "You're not qualified to review medical records, and keeping them adds unnecessary data handling.",
      },
      {
        id: "q3",
        question: "Patient asks: 'What does this biopsy result mean?' You respond:",
        options: [
          { label: "Google it and explain what you find", value: "a" },
          { label: "'I can't interpret medical results. Please discuss with your doctor or request Second Opinion for professional review.'", value: "b" },
          { label: "'Looks like cancer. You should act fast.'", value: "c" },
          { label: "Ask a medical professional friend and relay their interpretation", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Never interpret medical results - redirect to qualified professionals.",
      },
      {
        id: "q4",
        question: "Can you discuss Patient A's experience with Patient B?",
        options: [
          { label: "Yes, if it's encouraging", value: "a" },
          { label: "Yes, if you don't use their full name", value: "b" },
          { label: "No, unless Patient A has given explicit written consent", value: "c" },
          { label: "Yes, if it's general information", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "GDPR requires explicit written consent to share any patient information.",
      },
      {
        id: "q5",
        question: "Patient: 'Can you get me a discount from the clinic?' You respond:",
        options: [
          { label: "'I'll try to negotiate for you.'", value: "a" },
          { label: "'I don't negotiate prices. Clinics provide quotes directly. You discuss with them if needed.'", value: "b" },
          { label: "'Let me talk to my MrClinc contact.'", value: "c" },
          { label: "'I can probably get you 10% off.'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "PDs never negotiate prices - that's between patient and clinic.",
      },
      {
        id: "q6",
        question: "Which of these is a GDPR violation?",
        options: [
          { label: "Keeping a secure list of patients you've helped", value: "a" },
          { label: "Posting on Facebook: 'Just helped another patient! John from Manchester is going to Turkey!'", value: "b" },
          { label: "Escalating a patient's case to MrClinc team", value: "c" },
          { label: "Asking patient to provide contact info for platform request", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Sharing patient name and location publicly without consent is a serious GDPR violation.",
      },
      {
        id: "q7",
        question: "Can you tell a patient: 'Clinic X has a 95% success rate'?",
        options: [
          { label: "Yes, if you found it on their website", value: "a" },
          { label: "Yes, if another patient told you", value: "b" },
<<<<<<< HEAD
          { label: "No, PDs don't share clinical data or statistics - clinics provide that directly", value: "c" },
=======
          { label: "No, unless you have verified clinical data (which you're not authorized to share)", value: "c" },
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          { label: "Yes, if it seems accurate", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "PDs don't share clinical data, success rates, or statistics - clinics provide that directly.",
      },
      {
        id: "q8",
        question: "Patient (post-op): 'I have unusual bleeding. What should I do?' You respond:",
        options: [
          { label: "'It's probably normal. Give it a few days.'", value: "a" },
          { label: "'Apply pressure and see if it stops.'", value: "b" },
          { label: "'Contact your clinic immediately. They have 24/7 support for post-op issues. This is urgent.'", value: "c" },
          { label: "Research online and share advice", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Post-op complications need immediate clinic contact - never give medical advice.",
      },
      {
        id: "q9",
        question: "Patient asks: 'Should I get dental implants or bridges?' You respond:",
        options: [
          { label: "'Implants are better. More permanent.'", value: "a" },
          { label: "'I can't advise on treatment options. Dentists will explain pros/cons during consultation. You decide what's best for you.'", value: "b" },
          { label: "'Bridges are cheaper and faster.'", value: "c" },
          { label: "Research both and explain the differences", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Treatment comparisons are medical advice - redirect to consultation with specialists.",
      },
      {
        id: "q10",
        question: "You suspect a patient is being dishonest about their medical history. You should:",
        options: [
          { label: "Confront them directly", value: "a" },
          { label: "Refuse to help them", value: "b" },
          { label: "Escalate to MrClinc team with your concerns (via escalation note)", value: "c" },
          { label: "Ignore it; it's not your problem", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Escalate suspicions to platform - don't accuse, but flag concerns.",
      },
      {
        id: "q11",
<<<<<<< HEAD
        question: "What is the recommended approach for messaging patients?",
        options: [
          { label: "Use your personal WhatsApp exclusively for convenience", value: "a" },
          { label: "Use platform messaging whenever possible; avoid storing patient data in personal apps", value: "b" },
          { label: "Only use email, never messaging apps", value: "c" },
          { label: "It doesn't matter which platform you use", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Platform messaging is preferred for data protection; avoid storing patient data in personal messaging apps.",
=======
        question: "How long should you keep records of completed cases?",
        options: [
          { label: "Forever", value: "a" },
          { label: "2 years (for audits/disputes), then delete", value: "b" },
          { label: "Until the patient asks you to delete", value: "c" },
          { label: "6 months", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "2 years for audit purposes, then delete - standard GDPR practice.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
      },
      {
        id: "q12",
        question: "What should you record about each patient you help?",
        options: [
          { label: "Full medical history", value: "a" },
          { label: "Name, contact info, which channel they came from, date of request", value: "b" },
          { label: "Their passwords and login details", value: "c" },
          { label: "The clinic quotes they received", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Only essential tracking info - not medical data, not quotes, not passwords.",
      },
    ],
    passScore: 83,
  },
  communication: {
    id: "communication",
    title: "Patient Communication",
    sections: [
      {
        title: "Explaining MrClinc",
        content: [
<<<<<<< HEAD
          "Who we are: 'MrClinc is a healthcare pathway coordination platform based in Antalya, Turkey.'",
          "What we do: 'We coordinate pathways between UK patients and healthcare providers in Turkey. We prepare your case, connect you with clinical channels, and support you through the coordination process.'",
          "What we do NOT do: 'We don't provide medical treatment, set prices, or make clinical decisions. We don't recommend specific clinics.'",
          "How it works: 'You submit a request. We prepare your case and connect you with the relevant clinical channel. They contact you directly.'",
          "Cost: 'The coordination service is free for patients. Any treatment costs are between you and the clinic directly.'",
=======
          "Who we are: 'MrClinc is an Antalya-based coordination platform.'",
          "What we do: 'We connect UK patients with healthcare providers in Turkey. We coordinate the introduction and process.'",
          "What we do NOT do: 'We don't provide medical treatment, set prices, or make clinical decisions. Clinics do that.'",
          "How it works: 'You submit a request. Clinics review and send you quotes directly. You compare and decide.'",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
      {
        title: "Common Patient Questions",
        content: [
<<<<<<< HEAD
          "'How much does it cost?' - 'I don't have pricing. Clinics provide information after reviewing your case. The coordination service is free.'",
          "'Which clinic is best?' - 'I can't recommend specific clinics. You'll receive information and you compare based on your priorities.'",
          "'Will this work for me?' - 'I can't make medical predictions. Clinics will evaluate your case during consultation.'",
          "'Is this safe?' - 'Turkey has internationally accredited hospitals. Safety for your specific case is discussed directly with clinics.'",
          "'How long until I hear back?' - 'Typically within a few working days, depending on clinical availability.'",
        ],
      },
      {
        title: "Handling Difficult Conversations",
        content: [
          "The Skeptical Patient ('What's the catch?'): Acknowledge skepticism, explain transparently. 'Fair question. The coordination service is free for patients. We're funded through partnerships with clinics. You're never obligated to proceed.'",
          "The Emotional Patient ('I'm so scared'): Acknowledge feelings, offer process support, don't make decisions for them. 'I hear you — this is a difficult time. I can't make this decision for you, but I can help you understand the process and options. Have you spoken with your UK doctor about your concerns?'",
          "The Demanding Patient ('Just tell me which one!'): Hold boundary but offer alternative help. 'I understand the frustration, but I genuinely can't make that choice for you. What I CAN do is help you think through what matters most to you.'",
=======
          "'How much does it cost?' - 'I don't have pricing. Clinics provide quotes after reviewing your case.'",
          "'Which clinic is best?' - 'I can't recommend specific clinics. You'll receive info from multiple clinics and compare.'",
          "'Will this work for me?' - 'I can't make medical predictions. Clinics will evaluate during consultation.'",
          "'Is this safe?' - 'Turkey has internationally accredited hospitals. Safety for your case is discussed with clinics.'",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        ],
      },
      {
        title: "Managing Expectations & Escalation",
        content: [
<<<<<<< HEAD
          "Set realistic timelines: 'Clinics typically respond within a few working days, depending on clinical availability.'",
          "Clarify your role: 'I help with process questions. For medical questions, speak with clinics directly.'",
          "When to escalate: Patient reports clinic non-response beyond expected time, patient has process issue you can't resolve, patient is distressed or mentions urgent situation, you're unsure how to handle something.",
          "Tone: Professional but warm, helpful but boundaried, honest about limitations.",
        ],
      },
      {
        title: "Communication Don'ts",
        content: [
          "Never: Criticise NHS or UK healthcare, compare Turkish vs UK quality, promise specific outcomes, share other patients' information, use pressure or urgency tactics, make jokes about medical conditions, discuss your earnings with patients, bad-mouth competitors.",
          "Why: These damage trust, create legal risk, and undermine MrClinc's positioning as neutral coordinator.",
        ],
      },
=======
          "Set realistic timelines: 'Clinics typically respond within 48-72 hours.'",
          "Clarify your role: 'I help with process questions. For medical questions, speak with clinics directly.'",
          "When to escalate: Patient complaints, no clinic response after 5 days, complex medical questions, patient is distressed.",
          "Tone: Professional but warm, helpful but boundaried, honest about limitations.",
        ],
      },
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    ],
    questions: [
      {
        id: "q1",
<<<<<<< HEAD
        question: "The best way to describe MrClinc is:",
        options: [
          { label: "'A medical tourism agency finding the best deals'", value: "a" },
          { label: "'A coordination platform connecting patients with clinical channels'", value: "b" },
          { label: "'A price comparison website'", value: "c" },
          { label: "'A travel booking service for medical trips'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "MrClinc coordinates — doesn't sell, compare prices, or book travel.",
      },
      {
        id: "q2",
        question: "A patient asks 'How long until I hear back?' You should say:",
        options: [
          { label: "'Tomorrow, guaranteed'", value: "a" },
          { label: "'Typically within a few working days, depending on clinical availability'", value: "b" },
          { label: "'I'll make sure you hear today'", value: "c" },
          { label: "'I don't know, maybe weeks'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Give realistic ranges, acknowledge variables, don't promise specifics.",
      },
      {
        id: "q3",
        question: "When a patient says 'I'm scared,' you should:",
        options: [
          { label: "Tell them not to worry — everything will be fine", value: "a" },
          { label: "Acknowledge their feelings and offer process support", value: "b" },
          { label: "Change the subject", value: "c" },
          { label: "Tell them to toughen up", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Acknowledge feelings, offer what you can (process help), don't dismiss or over-promise.",
      },
      {
        id: "q4",
        question: "Which phrase is APPROPRIATE?",
        options: [
          { label: "'This is a limited-time deal'", value: "a" },
          { label: "'You'll get the best results'", value: "b" },
          { label: "'You're in control of this decision'", value: "c" },
          { label: "'Hurry before prices go up'", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Emphasising patient control is appropriate. Sales/pressure language is not.",
      },
      {
        id: "q5",
        question: "A patient hasn't heard from clinics in 5 days. You should:",
        options: [
          { label: "Tell them to be patient", value: "a" },
          { label: "Escalate via the platform to check status", value: "b" },
          { label: "Call the clinic yourself", value: "c" },
          { label: "Tell them to submit a new request", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Use platform escalation for delays beyond expected timeframes.",
      },
      {
        id: "q6",
        question: "'NHS is terrible — that's why you should come to Turkey' is:",
        options: [
          { label: "Helpful context", value: "a" },
          { label: "Inappropriate and should never be said", value: "b" },
          { label: "Okay if the patient agrees", value: "c" },
          { label: "Good marketing", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Never criticise other healthcare systems. It's unprofessional and damages positioning.",
      },
      {
        id: "q7",
        question: "A patient says 'What's the catch?' You should:",
        options: [
          { label: "Ignore the question", value: "a" },
          { label: "Get defensive and argue", value: "b" },
          { label: "Acknowledge skepticism and explain transparently", value: "c" },
          { label: "Offer a discount to prove there's no catch", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Acknowledge concern, explain calmly, transparency builds trust.",
      },
      {
        id: "q8",
        question: "When should you escalate to emergency services (999)?",
        options: [
          { label: "When a patient is annoyed", value: "a" },
          { label: "When a patient mentions self-harm or medical emergency", value: "b" },
          { label: "When you don't know an answer", value: "c" },
          { label: "When a clinic doesn't respond", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Life-threatening situations go to emergency services. Don't attempt to handle yourself.",
      },
      {
        id: "q9",
        question: "Which is acceptable to discuss with patients?",
        options: [
          { label: "Your earnings per case", value: "a" },
          { label: "Other patients' cases", value: "b" },
          { label: "The coordination process and next steps", value: "c" },
          { label: "Which clinic you think is best", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Process information is appropriate. Earnings, other patients, and recommendations are not.",
      },
      {
        id: "q10",
        question: "A patient insists you choose a clinic for them. You should:",
        options: [
          { label: "Choose one to keep them happy", value: "a" },
          { label: "Explain you can't choose, but offer to help them think through priorities", value: "b" },
          { label: "Refuse to help at all", value: "c" },
          { label: "Secretly choose and make it seem like their decision", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Hold the boundary, but offer alternative support within your scope.",
=======
        question: "Patient asks: 'What is MrClinc?' Your response should emphasize:",
        options: [
          { label: "'We're a medical tourism agency finding you the best deals'", value: "a" },
          { label: "'We're a coordination platform connecting patients with clinics. You decide everything.'", value: "b" },
          { label: "'We're a hospital in Turkey'", value: "c" },
          { label: "'We're a discount healthcare service'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Coordination platform, patient control - accurate positioning.",
      },
      {
        id: "q2",
        question: "Patient: 'How much will my hair transplant cost?' You respond:",
        options: [
          { label: "'About €2,000-€3,000 usually'", value: "a" },
          { label: "'I don't have pricing. Clinics send quotes directly after reviewing your case.'", value: "b" },
          { label: "'Let me check with clinics and get back to you'", value: "c" },
          { label: "'Much cheaper than UK, around €2,500'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "PDs don't have or provide pricing - redirect to clinic quote process.",
      },
      {
        id: "q3",
        question: "Patient: 'Can you guarantee this will work?' You respond:",
        options: [
          { label: "'Yes, Turkish clinics have very high success rates'", value: "a" },
          { label: "'I can't guarantee medical outcomes. Only doctors can discuss likely results for your case during consultation.'", value: "b" },
          { label: "'Probably! Most patients are happy.'", value: "c" },
          { label: "'Definitely, if you follow doctor's instructions'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "No guarantees ever - medical outcomes are for doctors to discuss.",
      },
      {
        id: "q4",
        question: "When should you escalate to MrClinc team?",
        options: [
          { label: "Patient asks a simple process question", value: "a" },
          { label: "Patient asks about pricing", value: "b" },
          { label: "Patient hasn't heard from clinics after 5 days, or patient is very distressed", value: "c" },
          { label: "Every time a patient submits a request", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Escalate when timeline is exceeded or patient needs more support than you can provide.",
      },
      {
        id: "q5",
        question: "Patient: 'Will you come with me to Turkey?' You respond:",
        options: [
          { label: "'Yes, if you want. I can arrange that.'", value: "a" },
          { label: "'My role is to help you access the platform. I don't accompany patients. Clinics provide support in Turkey.'", value: "b" },
          { label: "'I can for an additional fee.'", value: "c" },
          { label: "'Only if necessary for translation.'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "PDs don't accompany - clinics provide in-country support.",
      },
      {
        id: "q6",
        question: "Patient hasn't heard from clinics for 6 days. You should:",
        options: [
          { label: "Tell patient to be patient and wait longer", value: "a" },
          { label: "Contact clinics yourself and ask what's going on", value: "b" },
          { label: "Escalate to MrClinc team: 'Patient submitted 6 days ago, no response. Can you check?'", value: "c" },
          { label: "Assume the case isn't viable and move on", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "6 days exceeds normal timeline - escalate to platform.",
      },
      {
        id: "q7",
        question: "Patient: 'Do I pay you or MrClinc?' You respond:",
        options: [
          { label: "'You pay me a coordination fee, then the clinic separately.'", value: "a" },
          { label: "'You don't pay me. Payment is between you and the clinic. MrClinc doesn't handle patient payments.'", value: "b" },
          { label: "'You pay MrClinc, and we pay the clinic.'", value: "c" },
          { label: "'I'll send you an invoice after treatment.'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Patients pay nothing to PD or MrClinc - only to chosen clinic.",
      },
      {
        id: "q8",
        question: "Patient is frustrated: 'Why can't you just tell me which clinic to choose?' You should:",
        options: [
          { label: "'I'm not being difficult! That's not my role!'", value: "a" },
          { label: "Explain why: 'My role is coordination, not clinical guidance. Each patient's priorities are different. I can help you think through what matters to YOU.'", value: "b" },
          { label: "'It's company policy. I'm not allowed.'", value: "c" },
          { label: "'If you keep asking, I can't help you.'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Explain WHY boundary exists, offer alternative support within scope.",
      },
      {
        id: "q9",
        question: "Which tone is MOST appropriate?",
        options: [
          { label: "'You NEED to do this surgery in Turkey! NHS wait is too long!'", value: "a" },
          { label: "'This is an option worth considering. Turkey offers value and shorter wait times. Ultimately, your decision.'", value: "b" },
          { label: "'Whatever you decide is fine. I don't really care.'", value: "c" },
          { label: "'Let me be honest: UK healthcare is a disaster. Go to Turkey.'", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Professional, informative, no pressure - appropriate tone.",
      },
      {
        id: "q10",
        question: "Patient sends: 'Thank you so much for your help!' You respond:",
        options: [
          { label: "'No problem. Let me know if you need anything else.'", value: "a" },
          { label: "'You're very welcome! Glad I could help. Wishing you the best. Feel free to reach out if you have questions.'", value: "b" },
          { label: "'Just doing my job.'", value: "c" },
          { label: "Ignore the message", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Acknowledge gratitude warmly - strengthens relationship.",
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
      },
    ],
    passScore: 80,
  },
};

export default function ModuleDetailPage() {
  const router = useRouter();
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<"content" | "quiz" | "results">("content");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  const module = moduleData[moduleId];

  useEffect(() => {
    const session = localStorage.getItem("pdSession");
    if (!session) {
      router.push("/pd/login");
      return;
    }

    const parsed = JSON.parse(session);
    if (!parsed.loggedIn) {
      router.push("/pd/login");
      return;
    }

    if (!module) {
      router.push("/pd/portal/education");
      return;
    }

    // Mark as in-progress
    const savedProgress = localStorage.getItem("pdEducationProgress");
    const progress = savedProgress ? JSON.parse(savedProgress) : {};
    if (!progress[moduleId] || progress[moduleId].status === "not-started") {
      progress[moduleId] = {
        moduleId,
        status: "in-progress",
        score: null,
        completedAt: null,
      };
      localStorage.setItem("pdEducationProgress", JSON.stringify(progress));
    }

    setIsLoading(false);
  }, [router, moduleId, module]);

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmitQuestion = () => {
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestion < module.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctCount = module.questions.filter(
        (q) => answers[q.id] === q.correctAnswer
      ).length;
      const finalScore = Math.round((correctCount / module.questions.length) * 100);
      setScore(finalScore);

      // Save progress
      const savedProgress = localStorage.getItem("pdEducationProgress");
      const progress = savedProgress ? JSON.parse(savedProgress) : {};
      const passed = finalScore >= module.passScore;
      
      progress[moduleId] = {
        moduleId,
        status: passed ? "completed" : "in-progress",
        score: finalScore,
        completedAt: passed ? new Date().toISOString() : null,
      };
      localStorage.setItem("pdEducationProgress", JSON.stringify(progress));

      setCurrentView("results");
    }
  };

  const handleRetry = () => {
    setCurrentView("quiz");
    setCurrentQuestion(0);
    setAnswers({});
    setShowFeedback(false);
    setScore(0);
  };

  if (isLoading || !module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const currentQ = module.questions[currentQuestion];
  const currentAnswer = answers[currentQ?.id];
  const isCorrect = currentAnswer === currentQ?.correctAnswer;
  const passed = score >= module.passScore;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
<<<<<<< HEAD
              <Link href="/" className="flex-shrink-0"><img src="/images/logo.svg" alt="MrClinc" className="h-[42px] w-auto" /></Link>
=======
              <Link href="/" className="text-xl font-bold text-primary-600">MrClinc</Link>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">PD Portal</span>
            </div>
            <Link href="/pd/portal/education">
              <Button variant="outline" size="sm">Back to Education</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/pd/portal/education" className="text-sm text-primary-600 hover:underline">Education</Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-sm text-gray-600">{module.title}</span>
        </div>

        {/* Content View */}
        {currentView === "content" && (
          <>
            <Card variant="bordered" className="mb-6">
              <CardContent className="py-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{module.title}</h1>
                <p className="text-gray-600">Read through the content below, then take the quiz to complete this module.</p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {module.sections.map((section, index) => (
                <Card key={index} variant="bordered">
                  <CardHeader>
                    <CardTitle>{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-700 leading-relaxed">{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex justify-end">
              <Button variant="primary" size="lg" onClick={() => setCurrentView("quiz")}>
                Start Quiz ({module.questions.length} questions)
              </Button>
            </div>
          </>
        )}

        {/* Quiz View */}
        {currentView === "quiz" && currentQ && (
          <Card variant="bordered">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Question {currentQuestion + 1} of {module.questions.length}</CardTitle>
                <span className="text-sm text-gray-500">
                  {module.passScore}% needed to pass
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / module.questions.length) * 100}%` }}
                />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium text-gray-900 mb-6">{currentQ.question}</p>

              <div className="space-y-3">
                {currentQ.options.map((option) => {
                  const isSelected = currentAnswer === option.value;
                  const showCorrect = showFeedback && option.value === currentQ.correctAnswer;
                  const showWrong = showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={option.value}
                      onClick={() => !showFeedback && handleAnswer(currentQ.id, option.value)}
                      disabled={showFeedback}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        showCorrect
                          ? "border-success-500 bg-success-50"
                          : showWrong
                          ? "border-error-500 bg-error-50"
                          : isSelected
                          ? "border-primary-500 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          showCorrect
                            ? "border-success-500 bg-success-500 text-white"
                            : showWrong
                            ? "border-error-500 bg-error-500 text-white"
                            : isSelected
                            ? "border-primary-500 bg-primary-500 text-white"
                            : "border-gray-300"
                        }`}>
                          {option.value.toUpperCase()}
                        </span>
                        <span className="text-gray-900">{option.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`mt-6 p-4 rounded-lg ${isCorrect ? "bg-success-50" : "bg-error-50"}`}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <svg className="w-5 h-5 text-success-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-error-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                    <div>
                      <p className={`font-medium ${isCorrect ? "text-success-800" : "text-error-800"}`}>
                        {isCorrect ? "Correct!" : "Incorrect"}
                      </p>
                      <p className={`text-sm mt-1 ${isCorrect ? "text-success-700" : "text-error-700"}`}>
                        {currentQ.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="mt-6 flex justify-end gap-3">
                {!showFeedback ? (
                  <Button
                    variant="primary"
                    onClick={handleSubmitQuestion}
                    disabled={!currentAnswer}
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button variant="primary" onClick={handleNextQuestion}>
                    {currentQuestion < module.questions.length - 1 ? "Next Question" : "See Results"}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results View */}
        {currentView === "results" && (
          <Card variant="bordered">
            <CardContent className="py-12 text-center">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
                passed ? "bg-success-100" : "bg-error-100"
              }`}>
                {passed ? (
                  <svg className="w-10 h-10 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-error-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {passed ? "Module Completed!" : "Not Quite Yet"}
              </h2>

              <p className="text-gray-600 mb-6">
                {passed
                  ? `You scored ${score}% and passed the ${module.title} module.`
                  : `You scored ${score}%. You need ${module.passScore}% to pass.`}
              </p>

              <div className="text-4xl font-bold mb-8">
                <span className={passed ? "text-success-600" : "text-error-600"}>{score}%</span>
                <span className="text-gray-400 text-lg ml-2">/ {module.passScore}% required</span>
              </div>

              <div className="flex justify-center gap-4">
                {!passed && (
                  <Button variant="primary" onClick={handleRetry}>
                    Try Again
                  </Button>
                )}
                <Link href="/pd/portal/education">
                  <Button variant={passed ? "primary" : "outline"}>
                    {passed ? "Continue Learning" : "Back to Education"}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
