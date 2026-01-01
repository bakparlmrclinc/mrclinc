"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";

interface Scenario {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  situation: string;
  task: string;
  options: { label: string; value: string }[];
  correctAnswer: string;
  explanation: string;
  keyPrinciple: string;
}

interface CategoryData {
  id: string;
  title: string;
  description: string;
  scenarios: Scenario[];
}

// Scenario data from TRAINING_LAB.md
const categoryData: Record<string, CategoryData> = {
  "first-contact": {
    id: "first-contact",
    title: "First Contact",
    description: "Initial patient interactions - how to introduce yourself and MrClinc professionally.",
    scenarios: [
      {
        id: "1.1",
        title: "The Curious Barber Customer",
        difficulty: "Easy",
        situation: "You're at a barber shop (where you have permission to leave materials). A customer picks up your card and asks: \"What's this? What do you do?\"",
        task: "Give a brief, accurate explanation that doesn't violate boundaries.",
        options: [
          { label: "\"I help people get cheap medical treatments in Turkey. It's much better than UK.\"", value: "a" },
          { label: "\"I'm a medical tourism agent. I find you the best deals on surgeries abroad.\"", value: "b" },
          { label: "\"I coordinate healthcare pathways. I help UK patients connect with Turkish providers. They send you quotes; you compare and decide.\"", value: "c" },
          { label: "\"I'm a travel agent for medical trips. I can book everything for you.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Accurate positioning (coordination, not agency), neutral language, emphasizes patient control.",
        keyPrinciple: "Always position as coordinator, not agent. Emphasize patient control.",
      },
      {
        id: "1.2",
        title: "The Skeptical Pharmacy Customer",
        difficulty: "Easy",
        situation: "You're at a pharmacy (with permission). A customer overhears you talking to the pharmacist and asks skeptically: \"So you're selling medical procedures abroad? Sounds dodgy.\"",
        task: "Address skepticism professionally without being defensive.",
        options: [
          { label: "\"It's not dodgy! Thousands of people do this!\"", value: "a" },
          { label: "\"I understand it might sound unfamiliar. I coordinate introductions between patients and Turkish healthcare providers. Patients get quotes, ask questions, and decide. It's transparent and consent-based.\"", value: "b" },
          { label: "\"Well, if you don't trust it, that's fine. Your loss.\"", value: "c" },
          { label: "\"Let me show you testimonials from happy patients.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Acknowledges concern, explains calmly, uses correct terminology, emphasizes transparency.",
        keyPrinciple: "Respond to skepticism with calm professionalism and transparency, not defensiveness.",
      },
      {
        id: "1.3",
        title: "The Interested but Nervous Patient",
        difficulty: "Medium",
        situation: "Someone calls you after seeing your card. They say: \"I'm interested in dental treatment, but I'm nervous about going abroad for medical stuff. What if something goes wrong?\"",
        task: "Address concern without making promises you can't keep.",
        options: [
          { label: "\"Nothing will go wrong! Turkish clinics are the best in the world.\"", value: "a" },
          { label: "\"I understand the concern. That's something to discuss directly with clinics during consultation. They explain their safety protocols, post-operative support, and what happens if complications arise. Many UK patients travel to Turkey annually, but the decision is yours.\"", value: "b" },
          { label: "\"You're right to be nervous. It is risky.\"", value: "c" },
          { label: "\"I can guarantee you'll be fine. I've never heard of problems.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Validates concern, redirects to clinics for specific safety info, mentions industry context, respects patient's decision-making.",
        keyPrinciple: "Validate concerns, redirect to qualified sources, don't make promises.",
      },
      {
        id: "1.4",
        title: "The Impatient Patient",
        difficulty: "Medium",
        situation: "A patient submitted a request yesterday and calls you: \"I haven't heard anything yet! How long does this take? I need answers now!\"",
        task: "Manage expectations and calm the patient.",
        options: [
          { label: "\"Relax! It takes time. You need to be patient.\"", value: "a" },
          { label: "\"Let me call the clinics and hurry them up for you.\"", value: "b" },
          { label: "\"I understand you're eager for answers. Clinics typically respond within 48-72 hours after reviewing requests. Since you submitted yesterday, they're likely reviewing now. If you haven't heard by [day after tomorrow], let me know and I'll escalate.\"", value: "c" },
          { label: "\"That's not my problem. Contact the clinics yourself.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Empathetic, sets realistic timeline, offers to escalate if needed, professional tone.",
        keyPrinciple: "Manage expectations with empathy and realistic timelines.",
      },
      {
        id: "1.5",
        title: "The Price-Focused Patient",
        difficulty: "Easy",
        situation: "A patient's first question is: \"How much does a hair transplant cost? Can you give me a price?\"",
        task: "Respond without violating boundaries (you don't have pricing).",
        options: [
          { label: "\"About €2,500 typically, but it varies.\"", value: "a" },
          { label: "\"I don't have pricing information. Clinics provide quotes directly after reviewing your specific case. Costs vary based on your needs.\"", value: "b" },
          { label: "\"Let me ask the clinics and get back to you with a price.\"", value: "c" },
          { label: "\"Turkey is much cheaper than UK. You'll save at least 50%.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Honest about limitations, explains process, doesn't guess.",
        keyPrinciple: "Don't guess at prices. Redirect to clinic quote process.",
      },
      {
        id: "1.6",
        title: "The Second Opinion Inquiry",
        difficulty: "Easy",
        situation: "A cancer patient asks: \"I've heard you offer second opinions. How does that work? Do I have to pay?\"",
        task: "Explain Second Opinion service accurately.",
        options: [
          { label: "\"Yes, it's €500 but worth it for peace of mind.\"", value: "a" },
          { label: "\"It's completely free. You submit your medical info, and specialists review within 5-7 days. No obligation to proceed with treatment. It's for clarity and peace of mind.\"", value: "b" },
          { label: "\"It's free, and honestly, you should do it because NHS might be wrong.\"", value: "c" },
          { label: "\"Free second opinions, but only if you proceed with treatment afterward.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Accurate (free), explains process, emphasizes no obligation, supportive tone.",
        keyPrinciple: "Second Opinion is FREE, no obligation, for clarity/peace of mind.",
      },
      {
        id: "1.7",
        title: "The Referral from a Friend",
        difficulty: "Medium",
        situation: "Someone calls you: \"My friend Sarah used MrClinc for dental work. She said you're great and I should call you. I need the same thing. Can you just send me to the same clinic she used?\"",
        task: "Handle the referral appropriately without violating boundaries.",
        options: [
          { label: "\"Sure! I'll send you to the same clinic. They're the best.\"", value: "a" },
          { label: "\"I'm glad Sarah had a good experience. However, I can't recommend a specific clinic. You'll submit your request, receive quotes from multiple clinics, and decide based on your needs. The clinic Sarah used will be among those you can consider.\"", value: "b" },
          { label: "\"I can't discuss Sarah's case with you due to privacy rules.\"", value: "c" },
          { label: "\"Sarah's clinic is fully booked. Let me find you another one.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Positive about referral, but maintains boundary (no clinic recommendation), explains process, patient still in control.",
        keyPrinciple: "Welcome referrals but maintain 'no clinic recommendation' boundary.",
      },
      {
        id: "1.8",
        title: "The Anxious Partner",
        difficulty: "Medium",
        situation: "A man calls about his wife who needs aesthetic surgery: \"She's really anxious about this. She's not confident. Can you reassure her it'll go well? Maybe talk to her?\"",
        task: "Offer appropriate support without overstepping.",
        options: [
          { label: "\"Sure, I'll call her and tell her it'll be fine. Everyone is happy afterward.\"", value: "a" },
          { label: "\"I can't provide medical reassurance, but I'm happy to explain the process to her if it helps. Ultimately, clinics will answer her medical questions during consultation. Many patients feel nervous; it's normal.\"", value: "b" },
          { label: "\"She needs to see a therapist first if she's that anxious.\"", value: "c" },
          { label: "\"Tell her there's nothing to worry about. Turkish doctors are experts.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Offers process support (within scope), redirects medical concerns to clinics, validates anxiety, doesn't overpromise.",
        keyPrinciple: "Offer process support, validate feelings, redirect medical concerns to clinics.",
      },
      {
        id: "1.9",
        title: "The Misinformed Patient",
        difficulty: "Medium",
        situation: "A patient says: \"I read online that MrClinc is a hospital in Antalya. So you'll be doing my surgery, right?\"",
        task: "Correct the misunderstanding clearly.",
        options: [
          { label: "\"Yes, that's right. We're a hospital.\"", value: "a" },
          { label: "\"No, we're a coordination platform, not a hospital. We connect you with Turkish hospitals and clinics. They provide the medical treatment, not us.\"", value: "b" },
          { label: "\"Sort of. We work with hospitals.\"", value: "c" },
          { label: "Ignore the misunderstanding and just move forward with the request", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Direct correction, clear explanation of what MrClinc actually is.",
        keyPrinciple: "Correct misunderstandings immediately and clearly.",
      },
      {
        id: "1.10",
        title: "The Multi-Question Inquiry",
        difficulty: "Hard",
        situation: "A patient emails with 10 questions: pricing for 3 different services, which clinic is best, success rates, recovery time, whether you can negotiate, visa requirements, etc.",
        task: "Respond appropriately to the multi-question email.",
        options: [
          { label: "Ignore the email; it's too much work", value: "a" },
          { label: "Answer all questions with your best guesses", value: "b" },
          { label: "Reply: \"I can answer process questions (visa, timeline). For pricing, success rates, and clinic selection, clinics provide that info directly after you submit a request. Would you like help understanding how to submit a request?\"", value: "c" },
          { label: "Forward the email to MrClinc team without responding", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Sorts questions into 'I can answer' vs 'clinic answers,' offers specific help, remains boundaried.",
        keyPrinciple: "Triage questions - answer what's in your scope, redirect the rest appropriately.",
      },
    ],
  },
  "boundary-enforcement": {
    id: "boundary-enforcement",
    title: "Boundary Enforcement",
    description: "Saying 'no' professionally - maintaining boundaries without damaging relationships.",
    scenarios: [
      {
        id: "2.1",
        title: "The Medical Advice Request",
        difficulty: "Easy",
        situation: "A patient sends you photos of their scalp and asks: \"Do you think I'm a good candidate for a hair transplant? Is my hair loss too advanced?\"",
        task: "Decline to give medical assessment while remaining helpful.",
        options: [
          { label: "\"Looks fine to me. You should be a good candidate.\"", value: "a" },
          { label: "\"I can't assess medical suitability. That's for specialists during consultation. Submit your request, and clinics will evaluate.\"", value: "b" },
          { label: "\"Your hair loss looks too advanced for a transplant.\"", value: "c" },
          { label: "\"Let me ask a doctor friend and get back to you.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear boundary, redirects to appropriate source (clinics), remains helpful by suggesting next step.",
        keyPrinciple: "NEVER provide medical assessments, even casually.",
      },
      {
        id: "2.2",
        title: "The Pressure to Recommend",
        difficulty: "Medium",
        situation: "A patient insists: \"Just tell me which clinic you'd choose if it were you. I won't hold you responsible. I just need guidance.\"",
        task: "Hold the boundary firmly but politely.",
        options: [
          { label: "\"Okay, if I had to choose, I'd probably go with Clinic A. But that's just me.\"", value: "a" },
          { label: "\"I understand you want guidance, but I genuinely can't make that choice for you. Each clinic has information; compare based on your priorities. If you're overwhelmed, I can help you think through what matters most to YOU, but I can't pick for you.\"", value: "b" },
          { label: "\"Fine, I'll tell you off the record, but don't say I recommended it officially.\"", value: "c" },
          { label: "\"You're putting me in a difficult position. I can't help you if you keep asking.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Firm boundary, empathetic, offers alternative support (helping them decide), doesn't budge.",
        keyPrinciple: "Hold boundaries firmly with empathy. Offer alternative forms of support within scope.",
      },
      {
        id: "2.3",
        title: "The Post-Op Complication",
        difficulty: "Medium",
        situation: "A patient had surgery 3 days ago. They call you, panicked: \"I have swelling and pain. Is this normal? What should I do?\"",
        task: "Direct them to appropriate help without providing medical assessment.",
        options: [
          { label: "\"Swelling is normal after surgery. You're fine.\"", value: "a" },
          { label: "\"That doesn't sound good. You should go to A&E.\"", value: "b" },
          { label: "\"I'm not medically qualified to assess this. Contact your clinic immediately—they have 24/7 post-op support. If it's an emergency, call 112 (Turkey) or go to the nearest hospital. Do you need help reaching your clinic?\"", value: "c" },
          { label: "\"Wait a few days and see if it improves.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Clear boundary, urgent redirect to clinic, acknowledges potential emergency, offers practical help.",
        keyPrinciple: "Post-op issues = immediate clinic contact. Offer to facilitate contact, not medical advice.",
      },
      {
        id: "2.4",
        title: "The Negotiation Request",
        difficulty: "Easy",
        situation: "Patient: \"The quote from Clinic B is €3,000. Can you negotiate it down to €2,500 for me?\"",
        task: "Decline negotiation while remaining helpful.",
        options: [
          { label: "\"I'll try! Let me see what I can do.\"", value: "a" },
          { label: "\"I don't negotiate prices. That's between you and the clinic. If budget is a concern, you can discuss with them directly or consider different clinics' quotes.\"", value: "b" },
          { label: "\"€3,000 is already cheap. You won't get lower.\"", value: "c" },
          { label: "\"I take a commission, so I can't lower the price.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear boundary, suggests alternative paths (patient can negotiate, or compare clinics).",
        keyPrinciple: "No price negotiation. Suggest patient discuss directly or compare quotes.",
      },
      {
        id: "2.5",
        title: "The Data Sharing Request",
        difficulty: "Medium",
        situation: "Patient A says: \"I know Patient B went to the same clinic. Can you show me their before/after photos so I know what to expect?\"",
        task: "Decline to share other patient's info while explaining why.",
        options: [
          { label: "\"Sure, here are Patient B's photos. They gave me permission to share.\"", value: "a" },
          { label: "\"I can't share another patient's information without their explicit written consent. That's a privacy rule (GDPR). If you want to see results, ask clinics for their portfolio (with consented patients).\"", value: "b" },
          { label: "\"I can describe the results verbally without showing photos.\"", value: "c" },
          { label: "\"Patient B wouldn't mind. Let me ask them quickly.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear GDPR boundary, explains why, offers alternative (clinic portfolios).",
        keyPrinciple: "NEVER share patient data without explicit written consent. Direct to clinic portfolios.",
      },
      {
        id: "2.6",
        title: "The Accompaniment Request",
        difficulty: "Easy",
        situation: "Patient: \"I'm nervous about going to Turkey alone. Can you come with me and translate at my appointments?\"",
        task: "Decline travel accompaniment while offering alternatives.",
        options: [
          { label: "\"Sure, but there's a fee for that.\"", value: "a" },
          { label: "\"I don't accompany patients. That's not part of my role. However, clinics provide translators and support staff in Turkey. You won't be alone.\"", value: "b" },
          { label: "\"Sorry, I don't travel.\"", value: "c" },
          { label: "\"I can come if it's a big surgery. What procedure is it?\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear boundary, reassures patient (clinic support exists), remains helpful.",
        keyPrinciple: "PDs do NOT accompany patients. Clinics provide in-country support.",
      },
      {
        id: "2.7",
        title: "The Success Rate Question",
        difficulty: "Medium",
        situation: "Patient: \"What's the success rate of hair transplants at Turkish clinics? I want to know before I proceed.\"",
        task: "Decline to provide clinical statistics while directing to proper source.",
        options: [
          { label: "\"Around 90-95% from what I've heard.\"", value: "a" },
          { label: "\"I don't have verified clinical data on success rates. That's something clinics provide during consultation, based on their specific outcomes and your case.\"", value: "b" },
          { label: "\"Very high! Everyone I've worked with is happy.\"", value: "c" },
          { label: "\"Google says 95%, so probably around there.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Honest about limitations, directs to verified source (clinics).",
        keyPrinciple: "No clinical statistics unless verified and authorized to share (which you're not).",
      },
      {
        id: "2.8",
        title: "The Urgency Pressure",
        difficulty: "Hard",
        situation: "A patient says: \"I need surgery in 2 weeks. Can you guarantee I'll get an appointment? Can you push my case to the top of the list?\"",
        task: "Manage expectations without making promises.",
        options: [
          { label: "\"Yes, I'll make sure you get priority.\"", value: "a" },
          { label: "\"Let me contact clinics and expedite your case.\"", value: "b" },
          { label: "\"I can't guarantee timelines or priority. Clinics schedule based on their availability and case urgency. Submit your request now, and I'll escalate to the platform that you have a tight timeline. They'll coordinate with clinics.\"", value: "c" },
          { label: "\"Two weeks is impossible. Forget it.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Realistic (no promises), offers to escalate (within scope), explains clinic decision-making.",
        keyPrinciple: "Don't promise timelines. Escalate urgent cases to platform.",
      },
      {
        id: "2.9",
        title: "The Comparison Request",
        difficulty: "Medium",
        situation: "Patient: \"I got quotes from Clinic A (€2,500) and Clinic B (€3,200). Which is better value? Why is B more expensive?\"",
        task: "Decline to judge value or explain clinic pricing.",
        options: [
          { label: "\"Clinic A is better value. Go with them.\"", value: "a" },
          { label: "\"Clinic B is overpriced. I'd choose A.\"", value: "b" },
          { label: "\"I can't assess value or explain clinic pricing. You'd need to ask clinics why their prices differ (experience, techniques, inclusions). Compare what's included, ask questions, and decide based on your priorities.\"", value: "c" },
          { label: "\"They're probably the same quality, so just pick the cheaper one.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Maintains boundary, suggests patient ask clinics for explanation, empowers decision-making.",
        keyPrinciple: "No value judgments or clinic comparisons. Empower patient to ask clinics directly.",
      },
      {
        id: "2.10",
        title: "The Insider Info Request",
        difficulty: "Hard",
        situation: "Patient: \"You must know which clinics have the best doctors. Just between us, which surgeon would YOU choose for your own family?\"",
        task: "Firmly decline 'insider info' while explaining why.",
        options: [
          { label: "\"Okay, just between us: Dr. X at Clinic A is the best.\"", value: "a" },
          { label: "\"I understand you want insider info, but I genuinely don't rank surgeons. My role is coordination, not clinical assessment. Even 'just between us,' I can't guide you to a specific surgeon. That would undermine your decision-making process.\"", value: "b" },
          { label: "\"I'm not allowed to say, but if you read reviews online, you'll figure it out.\"", value: "c" },
          { label: "\"All the surgeons are good. Just pick one.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Firm boundary, explains WHY (not just 'I can't'), respects patient but doesn't budge.",
        keyPrinciple: "'Just between us' doesn't change boundaries. Explain WHY you maintain them.",
      },
    ],
  },
  "channel-development": {
    id: "channel-development",
    title: "Channel Development",
    description: "Approaching target professions - permission, win-win explanation, and relationship building.",
    scenarios: [
      {
        id: "3.1",
        title: "Approaching a Barber Shop",
        difficulty: "Easy",
        situation: "You want to approach a busy barber shop to leave information cards.",
        task: "Plan your approach.",
        options: [
          { label: "Wait until the shop is empty, then quickly leave cards on the counter and leave", value: "a" },
          { label: "Walk in during busy time, ask to speak to the owner/manager, explain briefly who you are and ask permission to leave materials", value: "b" },
          { label: "Give cards directly to customers as they leave the shop", value: "c" },
          { label: "Post about the shop on social media and tag them", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Permission first, professional approach, right person (owner/manager).",
        keyPrinciple: "ALWAYS get permission before leaving materials.",
      },
      {
        id: "3.2",
        title: "The Win-Win Explanation",
        difficulty: "Medium",
        situation: "A barber asks: \"Why would I help you? Won't this hurt my business?\"",
        task: "Explain the win-win clearly.",
        options: [
          { label: "\"You'll get a commission for each referral.\"", value: "a" },
          { label: "\"It won't hurt you. Trust me.\"", value: "b" },
          { label: "\"Your business is cutting hair. This is for customers considering hair transplants—surgical work you can't provide. Even if they get a transplant, they'll still need regular haircuts. Your business continues, and you've helped someone solve a problem you can't fix. It's complementary, not competitive.\"", value: "c" },
          { label: "\"Actually, you'll get more business because transplant patients need more haircuts!\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Clear win-win explanation, addresses concern directly, logical reasoning.",
        keyPrinciple: "Win-win = their business continues. Explain clearly and logically.",
      },
      {
        id: "3.3",
        title: "The Skeptical Pharmacist",
        difficulty: "Medium",
        situation: "You approach a pharmacist about leaving information for hair loss product customers. The pharmacist says: \"Sounds like a scam. I'm not getting involved.\"",
        task: "Respond professionally to the skepticism.",
        options: [
          { label: "\"It's not a scam! Thousands of people do this!\"", value: "a" },
          { label: "\"Your loss. I'll try the pharmacy down the street.\"", value: "b" },
          { label: "\"I understand your concern. This is a legitimate coordination platform (mrclinc.com). Happy to provide more information if you'd like to review. No pressure—just wanted to offer the option.\"", value: "c" },
          { label: "\"You're just scared of losing product sales.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Validates concern, offers information, no pressure, professional exit.",
        keyPrinciple: "Respond to skepticism with calm professionalism. Respect 'no.'",
      },
      {
        id: "3.4",
        title: "Permission Denied",
        difficulty: "Easy",
        situation: "A GP practice receptionist says: \"We're not interested. Please don't leave anything.\"",
        task: "Handle rejection gracefully.",
        options: [
          { label: "\"Can I speak to the practice manager? They might feel differently.\"", value: "a" },
          { label: "\"Thank you for your time. If anything changes, here's my contact info.\" (Offer your card only)", value: "b" },
          { label: "Leave materials anyway when receptionist isn't looking", value: "c" },
          { label: "\"Are you sure? This could really help your patients.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Graceful exit, leaves door open, respects decision.",
        keyPrinciple: "Respect 'no' immediately. Graceful exit preserves professionalism.",
      },
      {
        id: "3.5",
        title: "The Interested Professional",
        difficulty: "Medium",
        situation: "A physiotherapist says: \"This sounds helpful for some of my patients with chronic issues. What do I need to do?\"",
        task: "Explain their role clearly.",
        options: [
          { label: "\"Just send patients to me, and I'll pay you per referral.\"", value: "a" },
          { label: "\"You don't have to do anything active. If a patient mentions they're considering surgery or has long NHS waits, you can mention MrClinc as a coordination option and direct them to the website or give them this card. That's it.\"", value: "b" },
          { label: "\"I need you to actively promote this to all your patients.\"", value: "c" },
          { label: "\"You become a partner and earn commission on every successful case.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Low-pressure, passive role, clear boundaries, no payment expectations.",
        keyPrinciple: "Target professions have a PASSIVE role—simply making patients aware.",
      },
      {
        id: "3.6",
        title: "The Overenthusiastic Contact",
        difficulty: "Medium",
        situation: "A gym receptionist you approached is now actively promoting you to EVERY gym member, even those not relevant (young, fit people with no medical needs).",
        task: "Gently correct the approach.",
        options: [
          { label: "Let it continue; any exposure is good", value: "a" },
          { label: "\"Actually, I only need you to mention it to people who express medical/surgical needs or concerns. Not everyone is relevant. Quality over quantity.\"", value: "b" },
          { label: "Thank them profusely and encourage them to keep doing it", value: "c" },
          { label: "\"Stop promoting me. I didn't ask for this.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Redirects to targeted approach, maintains relationship, emphasizes quality.",
        keyPrinciple: "Targeted, quality flow > high volume irrelevant exposure.",
      },
      {
        id: "3.7",
        title: "The Competitive Environment",
        difficulty: "Hard",
        situation: "You discover a UK private clinic that does hair transplants. Should you approach them?",
        task: "Decide whether this is an appropriate target.",
        options: [
          { label: "Yes, approach them. They might refer overflow cases.", value: "a" },
          { label: "No, this is direct competition. They perform the same service you're coordinating for abroad. Not conflict-free.", value: "b" },
          { label: "Yes, but offer them a partnership deal.", value: "c" },
          { label: "Yes, approach anonymously without revealing you coordinate Turkish services.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "This is competition, violates 'conflict-free' principle.",
        keyPrinciple: "Never target direct competitors. Conflict-free means their business continues.",
      },
      {
        id: "3.8",
        title: "The Sensitive Environment (Cancer Support Group)",
        difficulty: "Hard",
        situation: "You want to approach a cancer support charity about Second Opinion services.",
        task: "Plan the approach with appropriate sensitivity.",
        options: [
          { label: "Attend a support group meeting and hand out flyers to members", value: "a" },
          { label: "Contact the charity coordinator, explain Second Opinion (FREE, no obligation), ask if it's appropriate to provide information as a resource", value: "b" },
          { label: "Post about Second Opinion in their online forum", value: "c" },
          { label: "Approach individual cancer patients outside the charity center", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Goes through proper channel (coordinator), extra sensitivity, positions as resource (not promotion), asks permission.",
        keyPrinciple: "Sensitive groups (cancer, etc.) require EXTRA care—work through coordinators, emphasize FREE/no obligation.",
      },
      {
        id: "3.9",
        title: "The Logging Question",
        difficulty: "Easy",
        situation: "You've approached 10 locations this week. Should you log this activity?",
        task: "Decide what to record.",
        options: [
          { label: "No need to log. Just remember mentally.", value: "a" },
          { label: "Yes, log: locations approached, permission granted/denied, date, brief notes (e.g., \"receptionist interested, left 20 cards\")", value: "b" },
          { label: "Only log locations that granted permission", value: "c" },
          { label: "Only log if a patient actually comes from that location", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Complete logging = useful tracking, platform transparency, learning which channels work.",
        keyPrinciple: "Log ALL channel-building activity—both successes and failures.",
      },
      {
        id: "3.10",
        title: "The Long-Term Relationship",
        difficulty: "Medium",
        situation: "A barber shop gave you permission 6 months ago, and cards are gone. Should you return?",
        task: "Decide how to maintain the relationship.",
        options: [
          { label: "Never return; they know about you now", value: "a" },
          { label: "Return monthly to restock cards and briefly check in (if permission was for ongoing presence)", value: "b" },
          { label: "Return only if you hear they need more cards", value: "c" },
          { label: "Return weekly to ensure constant stock", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Maintains visibility, shows you're not abandoning them, reasonable frequency.",
        keyPrinciple: "Maintain relationships with reasonable, agreed-upon check-ins.",
      },
    ],
  },
  "complex-cases": {
    id: "complex-cases",
    title: "Complex Cases",
    description: "Difficult situations requiring careful handling - distressed patients, unrealistic expectations, escalation.",
    scenarios: [
      {
        id: "4.1",
        title: "The Distressed Cancer Patient",
        difficulty: "Hard",
        situation: "A newly diagnosed cancer patient calls you, crying: \"I don't know what to do. I'm terrified. NHS says I need to wait 8 weeks for treatment. Can you help me?\"",
        task: "Provide appropriate support without overstepping.",
        options: [
          { label: "\"Don't worry! Turkish clinics will treat you immediately. You'll be fine.\"", value: "a" },
          { label: "\"I'm so sorry you're going through this. I can offer information about a free Second Opinion service that might provide clarity. However, for urgent medical decisions and timeline concerns, you should also speak with your NHS oncologist. Would information about Second Opinion be helpful?\"", value: "b" },
          { label: "\"You should definitely go to Turkey. NHS wait times are dangerous for cancer.\"", value: "c" },
          { label: "\"I can't help with cancer cases. Try calling MrClinc directly.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Empathetic, offers appropriate service (Second Opinion), doesn't criticize NHS, maintains boundary (not advising medically).",
        keyPrinciple: "Be empathetic with distressed patients, offer appropriate services, don't overpromise or criticize.",
      },
      {
        id: "4.2",
        title: "The Unrealistic Expectations",
        difficulty: "Hard",
        situation: "A patient says: \"I want a hair transplant that looks like [celebrity]. Can you guarantee I'll look like that?\"",
        task: "Manage expectations without dashing hopes entirely.",
        options: [
          { label: "\"Yes, Turkish surgeons can do that!\"", value: "a" },
          { label: "\"I can't guarantee any specific outcome. Hair transplant results depend on many factors (your hair quality, donor area, etc.). Clinics will assess during consultation and show you realistic expectations. You may achieve significant improvement, but matching a specific celebrity look isn't something anyone can guarantee.\"", value: "b" },
          { label: "\"That's impossible. Lower your expectations.\"", value: "c" },
          { label: "\"Sure, if you have the right donor hair, it's possible.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Realistic without crushing, explains why guarantees aren't possible, redirects to clinic consultation.",
        keyPrinciple: "Manage unrealistic expectations gently—no guarantees, redirect to clinic assessment.",
      },
      {
        id: "4.3",
        title: "The Financial Desperation",
        difficulty: "Hard",
        situation: "A patient says: \"I've saved for 2 years for this. It's all the money I have. I HAVE to get a good result or my life is ruined.\"",
        task: "Respond with sensitivity to financial/emotional pressure.",
        options: [
          { label: "\"Don't worry! You'll definitely get a good result. It's worth it.\"", value: "a" },
          { label: "\"I understand this is a significant investment for you. That's exactly why it's important to take your time, ask clinics all your questions, and make sure you feel confident before proceeding. No one should pressure you, including me. The decision is yours.\"", value: "b" },
          { label: "\"Maybe you should reconsider if it's all your money.\"", value: "c" },
          { label: "\"Turkish clinics are cheap, so it's less risky than UK.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Validates pressure, emphasizes careful decision-making, removes pressure, supports patient agency.",
        keyPrinciple: "Acknowledge high stakes, encourage careful consideration, remove pressure.",
      },
      {
        id: "4.4",
        title: "The Multiple Service Inquiry",
        difficulty: "Medium",
        situation: "A patient wants hair transplant, dental work, AND rhinoplasty: \"Can I do all three in one trip?\"",
        task: "Respond without making medical decisions.",
        options: [
          { label: "\"Yes, definitely! Save time and money.\"", value: "a" },
          { label: "\"No, that's too much. You'd need multiple trips.\"", value: "b" },
          { label: "\"I can't advise on medical safety or scheduling multiple procedures. That's something clinics will assess based on your health, procedure complexity, and recovery needs. Submit your request and ask clinics about combining procedures.\"", value: "c" },
          { label: "\"Hair and dental, yes. Rhinoplasty, no.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Doesn't make medical decision, redirects to clinics, acknowledges complexity.",
        keyPrinciple: "Combining procedures = medical decision. Clinics assess safety.",
      },
      {
        id: "4.5",
        title: "The Conflict of Interest",
        difficulty: "Hard",
        situation: "Your close friend is considering a hair transplant. They want YOU to coordinate their case and ask lots of questions you'd normally redirect to clinics.",
        task: "Navigate the personal relationship appropriately.",
        options: [
          { label: "Help them fully since they're a friend; answer all their questions", value: "a" },
          { label: "\"I can help you access the platform, but I have to maintain the same boundaries with you as any patient. For medical/pricing questions, clinics will answer. Fair?\"", value: "b" },
          { label: "Refuse to help them at all to avoid conflict", value: "c" },
          { label: "Help them but don't log the case in the platform", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Maintains professional boundaries even with friends, explains why, seeks their understanding.",
        keyPrinciple: "Professional boundaries apply to EVERYONE, including friends/family.",
      },
      {
        id: "4.6",
        title: "The Escalation Decision",
        difficulty: "Medium",
        situation: "A patient submitted a request 7 days ago. No clinic has responded yet. Patient is frustrated and asks for an update.",
        task: "Decide whether to escalate.",
        options: [
          { label: "Tell patient to wait longer; clinics are busy", value: "a" },
          { label: "Contact clinics yourself to find out what's going on", value: "b" },
          { label: "Escalate to MrClinc team: \"Patient submitted request 7 days ago (case [code]). No clinic response yet. Patient is understandably frustrated. Can you check status?\"", value: "c" },
          { label: "Assume the case isn't viable and tell patient to try elsewhere", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "7 days exceeds normal timeline (48-72 hours), escalation appropriate, provides context.",
        keyPrinciple: "Escalate when timelines exceeded or patient frustrated (valid concern).",
      },
      {
        id: "4.7",
        title: "The Contradictory Advice",
        difficulty: "Hard",
        situation: "Patient: \"My NHS doctor says I'm not a candidate for surgery. But I really want it. Can Turkish clinics still do it?\"",
        task: "Navigate the contradiction carefully.",
        options: [
          { label: "\"Turkish doctors are less strict. They'll probably do it.\"", value: "a" },
          { label: "\"Your NHS doctor is wrong. Get a second opinion in Turkey.\"", value: "b" },
          { label: "\"I can't comment on your doctor's assessment. If you'd like another professional perspective, you can request a free Second Opinion. But ultimately, medical suitability is determined by qualified specialists, not me.\"", value: "c" },
          { label: "\"If NHS says no, you shouldn't proceed.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Doesn't contradict NHS doctor, offers Second Opinion, maintains boundary (no medical judgment).",
        keyPrinciple: "Never contradict doctors. Offer Second Opinion as a perspective tool.",
      },
      {
        id: "4.8",
        title: "The Suspicious Behavior",
        difficulty: "Hard",
        situation: "A patient's story keeps changing (first says UK resident, then admits living elsewhere; first says single procedure, then asks about multiple unrelated procedures). Something feels off.",
        task: "Decide how to handle suspicion.",
        options: [
          { label: "Ignore suspicions and proceed normally", value: "a" },
          { label: "Confront patient: \"You're lying. I can't help you.\"", value: "b" },
          { label: "Escalate to MrClinc team: \"Patient's information inconsistent (details in note). Request platform review before proceeding.\"", value: "c" },
          { label: "Refuse to help without explanation", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Escalation appropriate for suspicious cases, provides details, lets platform investigate.",
        keyPrinciple: "Escalate suspicions to platform. Don't accuse, but flag concerns.",
      },
      {
        id: "4.9",
        title: "The Language Barrier",
        difficulty: "Medium",
        situation: "A patient's English is very limited. They're struggling to understand the process and fill out the request form.",
        task: "Provide appropriate support.",
        options: [
          { label: "Fill out the form for them based on what you think they mean", value: "a" },
          { label: "\"I can help guide you through the form, but YOU need to provide the answers. If there's a language barrier, would you like to involve a family member or friend who can translate? Clinics also provide translation services once you're connected.\"", value: "b" },
          { label: "Tell them you can't help if they don't speak English", value: "c" },
          { label: "Use Google Translate to fill out the form without verifying understanding", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Offers guidance (in scope), suggests involving translator, ensures patient provides info (not you), offers clinic translation as solution.",
        keyPrinciple: "Guide, don't provide patient's information. Suggest translation resources.",
      },
      {
        id: "4.10",
        title: "The Buyer's Remorse",
        difficulty: "Hard",
        situation: "Patient had surgery 1 month ago. Now regrets it: \"I hate the result. This is your fault for recommending Turkey.\"",
        task: "Respond to the accusation appropriately.",
        options: [
          { label: "\"I didn't recommend Turkey. You made that choice.\"", value: "a" },
          { label: "\"I'm sorry you're unhappy with the result. I didn't provide medical advice or recommend specific clinics—those were your decisions after consulting with professionals. If you have concerns about the result, please contact your clinic. They handle post-operative care and can assess whether adjustments are possible.\"", value: "b" },
          { label: "\"That's not my responsibility. Take it up with the clinic.\"", value: "c" },
          { label: "\"Give it time. You'll like it eventually.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Empathetic to unhappiness, clarifies your role (coordination, not recommendation), redirects to clinic for post-op care.",
        keyPrinciple: "Be empathetic but clarify boundaries. Redirect post-op concerns to clinic.",
      },
    ],
  },
  "communication-skills": {
    id: "communication-skills",
    title: "Communication Skills",
    description: "Professional language, tone, empathy, and managing patient emotions effectively.",
    scenarios: [
      {
        id: "5.1",
        title: "The Empathy Response",
        difficulty: "Easy",
        situation: "Patient: \"I'm so embarrassed about my hair loss. I don't even want to leave the house.\"",
        task: "Respond empathetically without overstepping.",
        options: [
          { label: "\"Don't be embarrassed! Hair loss is common.\"", value: "a" },
          { label: "\"I understand this is affecting your confidence. Many people feel this way. If you're considering options, I can help you explore pathways. But there's no pressure.\"", value: "b" },
          { label: "\"You should see a therapist about that.\"", value: "c" },
          { label: "\"Hair transplants will fix that. You'll feel great after.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Validates feeling, normalizes experience, offers help without pressure.",
        keyPrinciple: "Validate feelings, offer support within scope, no pressure.",
      },
      {
        id: "5.2",
        title: "The Professional Tone",
        difficulty: "Easy",
        situation: "Which message is MOST professional?",
        task: "Select the most appropriate message to send a patient.",
        options: [
          { label: "\"Hey! Got ur request. Clinics will hit u up soon lol 😊\"", value: "a" },
          { label: "\"Hi [Name], I've received your request and submitted it to the platform. Clinics typically respond within 48-72 hours. I'll check in if I don't hear updates. Let me know if you have questions.\"", value: "b" },
          { label: "\"YOUR REQUEST HAS BEEN RECEIVED. CLINICS WILL CONTACT YOU.\"", value: "c" },
          { label: "\"Request received. Wait for clinics.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Professional but warm, clear info, sets expectations, offers support.",
        keyPrinciple: "Professional + warm. Clear info, supportive tone.",
      },
      {
        id: "5.3",
        title: "The Clarifying Question",
        difficulty: "Medium",
        situation: "Patient sends vague message: \"Interested in procedure. Let me know.\"",
        task: "Respond to gather necessary info.",
        options: [
          { label: "\"Sure, I'll send you links.\"", value: "a" },
          { label: "\"Hi [Name], glad you're interested! To help you best, can you clarify which procedure you're considering? (e.g., hair transplant, dental, aesthetic surgery?) Also, are you UK-based?\"", value: "b" },
          { label: "\"You need to be more specific.\"", value: "c" },
          { label: "Guess they mean hair transplant and send info about that", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Polite, asks clarifying questions, explains why info is needed.",
        keyPrinciple: "Ask clarifying questions politely when info is vague.",
      },
      {
        id: "5.4",
        title: "The Follow-Up Timing",
        difficulty: "Medium",
        situation: "Patient submitted request 3 days ago. You said clinics respond in 48-72 hours. Should you follow up?",
        task: "Decide when to follow up.",
        options: [
          { label: "Don't follow up; they'll contact you if needed", value: "a" },
          { label: "Follow up now: \"Hi [Name], checking in. Have clinics responded yet? Let me know if you have questions.\"", value: "b" },
          { label: "Wait 7 days, then follow up", value: "c" },
          { label: "Follow up daily until they respond", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "3 days = end of expected timeline, proactive check-in shows care.",
        keyPrinciple: "Follow up at end of expected timeline (proactive, not reactive).",
      },
      {
        id: "5.5",
        title: "The Encouragement Balance",
        difficulty: "Hard",
        situation: "Patient is nervous about proceeding. How do you encourage without pressuring?",
        task: "Select the most balanced encouragement.",
        options: [
          { label: "\"You should definitely do it! You won't regret it!\"", value: "a" },
          { label: "\"It's natural to feel nervous about a big decision. Take your time. Ask clinics all your questions. If you decide to proceed, great. If not, that's okay too. I'm here to help with process questions either way.\"", value: "b" },
          { label: "\"If you're nervous, maybe it's not for you.\"", value: "c" },
          { label: "\"Don't overthink it. Just go for it.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Validates nervousness, removes pressure, offers support regardless of decision.",
        keyPrinciple: "Validate concerns, remove pressure, support regardless of decision.",
      },
      {
        id: "5.6",
        title: "The Bad News Delivery",
        difficulty: "Medium",
        situation: "You need to tell a patient that clinics reviewed their case and declined (not suitable candidates).",
        task: "Deliver news sensitively.",
        options: [
          { label: "\"Bad news: clinics said no. Sorry.\"", value: "a" },
          { label: "\"Hi [Name], I have an update. Clinics reviewed your case and unfortunately determined you're not a suitable candidate at this time. I know that's disappointing. If you'd like to understand why, you can contact the platform. Would you like me to escalate for more explanation?\"", value: "b" },
          { label: "\"Clinics rejected you.\"", value: "c" },
          { label: "\"You're not suitable. Try UK instead.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Direct but kind, acknowledges disappointment, offers path to more info.",
        keyPrinciple: "Bad news deserves empathy. Offer path to understanding.",
      },
      {
        id: "5.7",
        title: "The Technical Language",
        difficulty: "Medium",
        situation: "Patient asks: \"What's FUE?\"",
        task: "Explain without providing medical advice.",
        options: [
          { label: "\"FUE is Follicular Unit Extraction. It's a technique where individual hair follicles are extracted and transplanted. Clinics will explain the techniques they use and which might be best for your case.\"", value: "a" },
          { label: "\"FUE is the best technique. You should definitely get that.\"", value: "b" },
          { label: "\"I don't know. Ask the clinic.\"", value: "c" },
          { label: "Provide detailed medical explanation of the procedure", value: "d" },
        ],
        correctAnswer: "a",
        explanation: "Basic factual explanation, redirects to clinics for recommendation.",
        keyPrinciple: "Provide basic factual info; redirect to clinics for recommendations.",
      },
      {
        id: "5.8",
        title: "The Urgency Handling",
        difficulty: "Medium",
        situation: "Patient: \"I need an answer TODAY! Can you get clinics to respond faster?\"",
        task: "Handle urgency appropriately.",
        options: [
          { label: "\"I'll try to rush them.\"", value: "a" },
          { label: "\"I understand urgency, but I can't speed up clinics' review process. I can escalate to the platform that you have a tight timeline, and they'll coordinate. However, quality evaluation takes time.\"", value: "b" },
          { label: "\"Stop being impatient.\"", value: "c" },
          { label: "\"Sure, let me call them right now.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Acknowledges urgency, offers to escalate (realistic), manages expectations (quality takes time).",
        keyPrinciple: "Acknowledge urgency, offer realistic help (escalation), manage expectations.",
      },
      {
        id: "5.9",
        title: "The Gratitude Response",
        difficulty: "Easy",
        situation: "Patient sends: \"Thank you so much for all your help! You've been amazing!\"",
        task: "Respond appropriately.",
        options: [
          { label: "\"No problem. Let me know if you need anything else.\"", value: "a" },
          { label: "\"You're very welcome! I'm glad I could help you navigate the process. Wishing you the best with your treatment. Feel free to reach out if you have questions.\"", value: "b" },
          { label: "\"Just doing my job.\"", value: "c" },
          { label: "Ignore the message (no response needed for gratitude)", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Warm, gracious, leaves door open for future contact, professional.",
        keyPrinciple: "Acknowledge gratitude warmly. Strengthens relationship.",
      },
      {
        id: "5.10",
        title: "The Boundary Explanation",
        difficulty: "Hard",
        situation: "Patient is frustrated: \"Why can't you just tell me which clinic to choose? Why are you being so difficult?\"",
        task: "Explain boundary without sounding defensive.",
        options: [
          { label: "\"I'm not being difficult! That's just not my role!\"", value: "a" },
          { label: "\"I understand you'd like a recommendation, and I wish I could simplify it for you. However, my role is coordination, not clinical guidance. Each patient's priorities are different (price, experience, location, techniques). What's 'best' for one person may not be for another. I'm not withholding info to be difficult—I genuinely don't have the medical expertise to make that call. What I CAN do is help you think through what matters most to YOU.\"", value: "b" },
          { label: "\"It's company policy. I'm not allowed.\"", value: "c" },
          { label: "\"If you keep asking, I can't help you.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Acknowledges frustration, explains WHY boundary exists (not arbitrary), offers alternative help (thinking through priorities).",
        keyPrinciple: "Explain WHY boundaries exist, offer alternative support within scope.",
      },
    ],
  },
};

export default function TrainingLabCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const categoryId = params.category as string;

  const [isLoading, setIsLoading] = useState(true);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [progress, setProgress] = useState<{ completed: number; correct: number }>({ completed: 0, correct: 0 });
  const [viewMode, setViewMode] = useState<"practice" | "complete">("practice");

  const category = categoryData[categoryId];

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

    if (!category) {
      router.push("/pd/portal/education");
      return;
    }

    // Load progress
    const savedProgress = localStorage.getItem("pdTrainingLabProgress");
    if (savedProgress) {
      const allProgress = JSON.parse(savedProgress);
      if (allProgress[categoryId]) {
        setProgress(allProgress[categoryId]);
        if (allProgress[categoryId].completed === category.scenarios.length) {
          setViewMode("complete");
        }
      }
    }

    setIsLoading(false);
  }, [router, categoryId, category]);

  const saveProgress = (newProgress: { completed: number; correct: number }) => {
    const savedProgress = localStorage.getItem("pdTrainingLabProgress");
    const allProgress = savedProgress ? JSON.parse(savedProgress) : {};
    allProgress[categoryId] = newProgress;
    localStorage.setItem("pdTrainingLabProgress", JSON.stringify(allProgress));
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowFeedback(true);
  };

  const handleNext = () => {
    const scenario = category.scenarios[currentScenario];
    const isCorrect = selectedAnswer === scenario.correctAnswer;

    const newProgress = {
      completed: progress.completed + 1,
      correct: progress.correct + (isCorrect ? 1 : 0),
    };
    setProgress(newProgress);
    saveProgress(newProgress);

    if (currentScenario < category.scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setViewMode("complete");
    }
  };

  const handleRestart = () => {
    setCurrentScenario(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setProgress({ completed: 0, correct: 0 });
    saveProgress({ completed: 0, correct: 0 });
    setViewMode("practice");
  };

  if (isLoading || !category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const scenario = category.scenarios[currentScenario];
  const isCorrect = selectedAnswer === scenario?.correctAnswer;
  const scorePercentage = progress.completed > 0 ? Math.round((progress.correct / progress.completed) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-primary-600">MrClinc</Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">Training Lab</span>
            </div>
            <Link href="/pd/portal/education">
              <Button variant="outline" size="sm">Back to Education</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link href="/pd/portal/education" className="text-sm text-primary-600 hover:underline">Education</Link>
          <span className="text-gray-400 mx-2">/</span>
          <span className="text-sm text-gray-600">{category.title}</span>
        </div>

        {/* Complete View */}
        {viewMode === "complete" && (
          <Card variant="bordered">
            <CardContent className="py-12 text-center">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
                scorePercentage >= 80 ? "bg-success-100" : "bg-accent-100"
              }`}>
                {scorePercentage >= 80 ? (
                  <svg className="w-10 h-10 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-accent-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Complete!</h2>
              <p className="text-gray-600 mb-6">You&apos;ve completed all {category.scenarios.length} scenarios in {category.title}</p>

              <div className="text-4xl font-bold mb-2">
                <span className={scorePercentage >= 80 ? "text-success-600" : "text-accent-600"}>{scorePercentage}%</span>
              </div>
              <p className="text-gray-500 mb-8">{progress.correct} of {progress.completed} correct</p>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleRestart}>Practice Again</Button>
                <Link href="/pd/portal/education">
                  <Button variant="primary">Back to Education</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practice View */}
        {viewMode === "practice" && scenario && (
          <>
            {/* Progress Bar */}
            <Card variant="bordered" className="mb-6">
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{category.title}</span>
                  <span className="text-sm text-gray-500">
                    {currentScenario + 1} of {category.scenarios.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-accent-500 h-2 rounded-full transition-all"
                    style={{ width: `${((currentScenario + 1) / category.scenarios.length) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Scenario Card */}
            <Card variant="bordered">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{scenario.title}</CardTitle>
                  <Badge
                    variant={scenario.difficulty === "Easy" ? "success" : scenario.difficulty === "Medium" ? "warning" : "error"}
                    size="sm"
                  >
                    {scenario.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Situation */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Situation</h4>
                  <p className="text-gray-900">{scenario.situation}</p>
                </div>

                {/* Task */}
                <div className="mb-6 p-3 bg-primary-50 rounded-lg">
                  <h4 className="text-sm font-medium text-primary-700 mb-1">Your Task</h4>
                  <p className="text-primary-900">{scenario.task}</p>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  {scenario.options.map((option) => {
                    const isSelected = selectedAnswer === option.value;
                    const showCorrect = showFeedback && option.value === scenario.correctAnswer;
                    const showWrong = showFeedback && isSelected && !isCorrect;

                    return (
                      <button
                        key={option.value}
                        onClick={() => !showFeedback && setSelectedAnswer(option.value)}
                        disabled={showFeedback}
                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                          showCorrect ? "border-success-500 bg-success-50"
                            : showWrong ? "border-error-500 bg-error-50"
                            : isSelected ? "border-primary-500 bg-primary-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                            showCorrect ? "border-success-500 bg-success-500 text-white"
                              : showWrong ? "border-error-500 bg-error-500 text-white"
                              : isSelected ? "border-primary-500 bg-primary-500 text-white"
                              : "border-gray-300"
                          }`}>
                            {option.value.toUpperCase()}
                          </span>
                          <span className="text-gray-900 text-sm">{option.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback */}
                {showFeedback && (
                  <div className={`p-4 rounded-lg mb-6 ${isCorrect ? "bg-success-50" : "bg-error-50"}`}>
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
                          {isCorrect ? "Correct!" : "Not quite right"}
                        </p>
                        <p className={`text-sm mt-1 ${isCorrect ? "text-success-700" : "text-error-700"}`}>
                          {scenario.explanation}
                        </p>
                        <p className={`text-sm mt-2 font-medium ${isCorrect ? "text-success-800" : "text-error-800"}`}>
                          Key Principle: {scenario.keyPrinciple}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  {!showFeedback ? (
                    <Button variant="primary" onClick={handleSubmit} disabled={!selectedAnswer}>
                      Submit Answer
                    </Button>
                  ) : (
                    <Button variant="primary" onClick={handleNext}>
                      {currentScenario < category.scenarios.length - 1 ? "Next Scenario" : "See Results"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
