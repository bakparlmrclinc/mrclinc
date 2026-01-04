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

// Scenario data - REVISED per PD-TRAINING-LAB-CONTENT-REVISED.md
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
          { label: "\"I coordinate healthcare pathways. I help UK patients connect with Turkish providers. They send you information; you compare and decide.\"", value: "c" },
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
          { label: "\"I understand it might sound unfamiliar. I coordinate introductions between patients and Turkish healthcare providers. Patients receive information, ask questions, and decide. It's transparent and consent-based.\"", value: "b" },
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
        situation: "Someone calls you after seeing your card. They say: \"I'm interested in cosmetic treatment, but I'm nervous about going abroad for medical stuff. What if something goes wrong?\"",
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
          { label: "\"I understand you're eager for answers. Response timing depends on clinical availability and may vary. Since you submitted yesterday, they're likely reviewing now. If you feel the process is taking longer than expected, let me know and I can escalate to the platform team.\"", value: "c" },
          { label: "\"That's not my problem. Contact the clinics yourself.\"", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Empathetic, sets realistic expectation without specific timeline, offers to escalate to platform team if needed, professional tone.",
        keyPrinciple: "Manage expectations with empathy. Avoid specific time promises. Escalate through platform.",
      },
      {
        id: "1.5",
        title: "The Price-Focused Patient",
        difficulty: "Easy",
        situation: "A patient's first question is: \"How much does a hair transplant cost? Can you give me a price?\"",
        task: "Respond without violating boundaries (you don't have pricing).",
        options: [
          { label: "\"About €2,500 typically, but it varies.\"", value: "a" },
          { label: "\"I don't have pricing information. Clinics provide that directly after reviewing your specific case. Costs vary based on your needs.\"", value: "b" },
          { label: "\"Let me ask the clinics and get back to you with a price.\"", value: "c" },
          { label: "\"Turkey is much cheaper than UK. You'll save at least 50%.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Honest about limitations, explains process, doesn't guess or compare.",
        keyPrinciple: "Don't guess at prices. Redirect to clinic information process.",
      },
      {
        id: "1.6",
        title: "The Second Opinion Inquiry",
        difficulty: "Easy",
        situation: "A cancer patient asks: \"I've heard you offer second opinions. How does that work? Do I have to pay?\"",
        task: "Explain Second Opinion service accurately.",
        options: [
          { label: "\"Yes, it's €500 but worth it for peace of mind.\"", value: "a" },
          { label: "\"It's completely free. You submit your request, and specialist clinicians review your case. Timing depends on clinical availability. No obligation to proceed with treatment. It's for clarity and peace of mind.\"", value: "b" },
          { label: "\"It's free, but honestly, you should do it because you might benefit from another perspective.\"", value: "c" },
          { label: "\"Free second opinions, but only if you proceed with treatment afterward.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Accurate (free), explains process without specific timeline, emphasizes no obligation, supportive tone.",
        keyPrinciple: "Second Opinion is FREE, no obligation, for clarity and peace of mind. No fixed timelines.",
      },
      {
        id: "1.7",
        title: "The Referral from a Friend",
        difficulty: "Medium",
        situation: "Someone calls you: \"My friend Sarah used MrClinc for cosmetic work. She said you're great and I should call you. I need the same thing. Can you just send me to the same clinic she used?\"",
        task: "Handle the referral appropriately without violating boundaries.",
        options: [
          { label: "\"Sure! I'll send you to the same clinic. They're the best.\"", value: "a" },
          { label: "\"I'm glad Sarah had a good experience. However, I can't recommend a specific clinic. You'll submit your request, receive information from clinics, and decide based on your needs. The clinic Sarah used will be among those you can consider.\"", value: "b" },
          { label: "\"I can't discuss Sarah's case with you due to privacy rules.\"", value: "c" },
          { label: "\"Sarah's clinic is fully booked. Let me find you another one.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Positive about referral, but maintains boundary (no clinic recommendation), explains process, patient still in control.",
        keyPrinciple: "Never recommend specific clinics, even when asked. Patient decides.",
      },
      {
        id: "1.8",
        title: "The \"Just Tell Me\" Patient",
        difficulty: "Hard",
        situation: "A patient says: \"Look, I don't want to fill out forms and wait. Just tell me — is this legit? Should I do it or not?\"",
        task: "Handle the shortcut request professionally.",
        options: [
          { label: "\"Yes, definitely do it. You won't regret it.\"", value: "a" },
          { label: "\"I can't tell you whether to proceed — that's your decision. What I can tell you is how the process works and what to expect. Would that help?\"", value: "b" },
          { label: "\"If you can't be bothered with the process, maybe this isn't for you.\"", value: "c" },
          { label: "\"Just trust me, it's fine. Fill out the form.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Maintains boundary (no decision-making for patient), offers what's within scope, keeps door open.",
        keyPrinciple: "Never tell patients what to do. Offer information and process support.",
      },
      {
        id: "1.9",
        title: "The Confused Patient",
        difficulty: "Easy",
        situation: "A patient says: \"So you're a Turkish hospital? Do you do the surgery yourself?\"",
        task: "Correct the misunderstanding clearly.",
        options: [
          { label: "\"Yes, basically. We handle everything.\"", value: "a" },
          { label: "\"No, MrClinc is a coordination platform, not a hospital. We connect you with clinics in Turkey, but we don't provide treatment ourselves. Clinics do the medical work; we coordinate the process.\"", value: "b" },
          { label: "\"Sort of. We work with hospitals.\"", value: "c" },
          { label: "Ignore the misunderstanding and just move forward with the request.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Direct correction, clear explanation of what MrClinc actually is.",
        keyPrinciple: "Correct misunderstandings immediately and clearly.",
      },
      {
        id: "1.10",
        title: "The Multi-Question Email",
        difficulty: "Hard",
        situation: "A patient emails with 10 questions: pricing for 3 different services, which clinic is best, success rates, recovery time, whether you can negotiate, visa requirements, etc.",
        task: "Respond appropriately to the multi-question email.",
        options: [
          { label: "Ignore the email; it's too much work.", value: "a" },
          { label: "Answer all questions with your best guesses.", value: "b" },
          { label: "Reply: \"I can answer process questions (visa, timeline). For pricing, clinical details, and clinic selection, clinics provide that information directly after you submit a request. Would you like help understanding how to submit a request?\"", value: "c" },
          { label: "Forward the email to MrClinc team without responding.", value: "d" },
        ],
        correctAnswer: "c",
        explanation: "Sorts questions into 'I can answer' vs 'clinic answers,' offers specific help, remains boundaried.",
        keyPrinciple: "Triage questions — answer what's in your scope, redirect the rest appropriately.",
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
          { label: "\"I understand you want guidance, but I genuinely can't make that choice for you. Each clinic provides information; compare based on your priorities. If you're overwhelmed, I can help you think through what matters most to YOU, but I can't pick for you.\"", value: "b" },
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
          { label: "\"I'm not medically qualified to assess this. Contact your clinic immediately — they have post-op support. If it's an emergency, call 112 (Turkey) or go to the nearest hospital. Do you need help reaching your clinic?\"", value: "c" },
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
        situation: "Patient: \"The information from Clinic B mentions €3,000. Can you negotiate it down to €2,500 for me?\"",
        task: "Decline negotiation while remaining helpful.",
        options: [
          { label: "\"I'll try! Let me see what I can do.\"", value: "a" },
          { label: "\"I don't negotiate prices. That's between you and the clinic. If budget is a concern, you can discuss with them directly or consider different clinics' information.\"", value: "b" },
          { label: "\"€3,000 is already cheap. You won't get lower.\"", value: "c" },
          { label: "\"I take a commission, so I can't lower the price.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear boundary, suggests alternative paths (patient can discuss directly, or compare clinics).",
        keyPrinciple: "No price negotiation. Suggest patient discuss directly or compare information.",
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
        title: "The Diagnosis Request",
        difficulty: "Hard",
        situation: "A patient shows you a document with medical terminology and asks: \"What does this mean? Is it serious? Should I be worried?\"",
        task: "Decline to interpret medical information.",
        options: [
          { label: "\"Let me look it up for you...\"", value: "a" },
          { label: "\"I'm not qualified to interpret medical documents. Please discuss this with your doctor or request a Second Opinion through the platform if you'd like a clinical perspective.\"", value: "b" },
          { label: "\"It looks fine to me, but I'm not a doctor.\"", value: "c" },
          { label: "\"That term usually means [explanation]...\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear boundary, offers alternatives (own doctor or Second Opinion), doesn't attempt interpretation.",
        keyPrinciple: "NEVER interpret medical information, even with disclaimers.",
      },
      {
        id: "2.8",
        title: "The Payment Request",
        difficulty: "Easy",
        situation: "A patient says: \"Can I pay you directly for the surgery and you sort it out with the clinic?\"",
        task: "Decline to handle payments.",
        options: [
          { label: "\"Sure, that would be easier. Send me the money.\"", value: "a" },
          { label: "\"I don't handle payments. All financial arrangements are directly between you and the clinic. They'll provide payment instructions when you're ready.\"", value: "b" },
          { label: "\"I can take a deposit to hold your spot.\"", value: "c" },
          { label: "\"That's not standard, but I could make an exception.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear boundary, explains correct process, protects both parties.",
        keyPrinciple: "PDs NEVER handle patient payments. Direct clinic relationship for all financial matters.",
      },
      {
        id: "2.9",
        title: "The \"Between Us\" Request",
        difficulty: "Hard",
        situation: "A patient says: \"Between us — which clinic has the best success rate? I won't tell anyone you told me.\"",
        task: "Maintain boundary despite the confidentiality offer.",
        options: [
          { label: "\"Well, between us, Clinic X has the best reputation...\"", value: "a" },
          { label: "\"I appreciate the trust, but I genuinely don't have that information, and even if I did, I couldn't share it. Clinics can share their own information with you directly.\"", value: "b" },
          { label: "\"I could tell you, but then I'd have to... just kidding. Clinic X is best.\"", value: "c" },
          { label: "\"I don't know the success rates. Ask the clinics.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Maintains boundary even with \"confidentiality\" framing, explains why, redirects appropriately.",
        keyPrinciple: "\"Between us\" doesn't change the rules. Boundaries apply regardless.",
      },
      {
        id: "2.10",
        title: "The Persistent Pusher",
        difficulty: "Hard",
        situation: "A patient has asked you three times in one conversation to recommend a clinic. They're getting frustrated: \"Why can't you just help me? This is your job!\"",
        task: "Hold the boundary under pressure without losing the patient.",
        options: [
          { label: "\"Fine! Go with Clinic B. Happy now?\"", value: "a" },
          { label: "\"I understand this is frustrating. Helping you IS my job — but my help is in the process, not the decision. I can help you understand the information, think through your priorities, or escalate to the platform team if something's stuck. But choosing the clinic has to be your decision. What would be most helpful right now?\"", value: "b" },
          { label: "\"If you keep asking, I'll have to end this conversation.\"", value: "c" },
          { label: "\"I've told you three times. I can't help you.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Acknowledges frustration, reframes what \"help\" means, offers concrete alternatives, stays professional.",
        keyPrinciple: "Repeated pressure doesn't change the boundary. Reframe and redirect.",
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
        title: "The Cold Approach",
        difficulty: "Easy",
        situation: "You walk into a barber shop you've never visited before. You want to ask if you can leave your cards there.",
        task: "Make an appropriate first approach.",
        options: [
          { label: "Leave cards on the counter and walk out.", value: "a" },
          { label: "\"Hi, I'm [name]. I coordinate healthcare pathways for UK patients exploring treatment options in Turkey. Would you be open to having some information cards here for anyone who asks? No pressure to actively recommend — just information for those already looking.\"", value: "b" },
          { label: "\"Want to make extra money? I pay for referrals.\"", value: "c" },
          { label: "\"Your customers probably want cheap surgery. Can I put my cards here?\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Professional introduction, clear explanation, minimal ask, no pressure.",
        keyPrinciple: "Always introduce yourself, explain what you do, and ASK permission.",
      },
      {
        id: "3.2",
        title: "The \"What's In It For Me?\" Question",
        difficulty: "Medium",
        situation: "A pharmacist listens to your explanation and asks: \"Okay, but what do I get out of this?\"",
        task: "Explain the win-win without offering financial incentives.",
        options: [
          { label: "\"I'll give you £20 for every patient who contacts me.\"", value: "a" },
          { label: "\"Your customers who explore treatment abroad still need prescriptions, check-ups, and care here. You remain their pharmacist. It's not about taking business away — it's information for those already looking.\"", value: "b" },
          { label: "\"You get to help people. Isn't that enough?\"", value: "c" },
          { label: "\"Nothing directly, but it's good karma.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Explains win-win (no business loss), doesn't offer financial incentive, positions as information sharing.",
        keyPrinciple: "Win-win means no business conflict. Never offer financial incentives to professionals.",
      },
      {
        id: "3.3",
        title: "The Competitor Location",
        difficulty: "Easy",
        situation: "You're considering approaching a UK cosmetic clinic to leave your cards.",
        task: "Decide whether this is an appropriate target.",
        options: [
          { label: "Go ahead — they might appreciate the partnership.", value: "a" },
          { label: "Don't approach — this is a direct competitor and creates a conflict of interest.", value: "b" },
          { label: "Offer them a commission to make it worthwhile.", value: "c" },
          { label: "Leave cards secretly in their waiting room.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "UK cosmetic clinics are direct competitors. Approaching them is unethical and will likely fail.",
        keyPrinciple: "NEVER target direct competitors. It's unethical and unsustainable.",
      },
      {
        id: "3.4",
        title: "The Hesitant Professional",
        difficulty: "Medium",
        situation: "A beauty salon owner says: \"I don't know... it sounds a bit medical. I'm not sure I should be involved.\"",
        task: "Address hesitation appropriately.",
        options: [
          { label: "\"It's fine, don't worry about it. Just leave the cards out.\"", value: "a" },
          { label: "\"I completely understand. You wouldn't be giving medical advice — just having information available for clients who ask. If you're not comfortable, that's absolutely fine. No pressure.\"", value: "b" },
          { label: "\"You're missing out on a great opportunity.\"", value: "c" },
          { label: "\"Other salons are doing it. Don't get left behind.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Validates concern, clarifies their role (just information), respects their decision, no pressure.",
        keyPrinciple: "Respect hesitation. Clarify, don't pressure. \"No\" is acceptable.",
      },
      {
        id: "3.5",
        title: "The GP Approach",
        difficulty: "Hard",
        situation: "You're considering approaching a local GP practice to introduce MrClinc.",
        task: "Decide how to approach this appropriately.",
        options: [
          { label: "Walk in and ask to speak to a doctor about partnership.", value: "a" },
          { label: "Research their policies, approach the practice manager, explain you coordinate healthcare pathways for patients exploring additional options, and ask if they'd be open to having information available for patients who enquire.", value: "b" },
          { label: "Offer GPs a referral fee for sending patients.", value: "c" },
          { label: "Tell them you have a solution for patients exploring additional options.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Professional approach through appropriate channel (practice manager), clear explanation, respectful framing.",
        keyPrinciple: "GPs are sensitive targets. Approach professionally, work through proper channels, maintain respectful positioning.",
      },
      {
        id: "3.6",
        title: "The Follow-Up Visit",
        difficulty: "Easy",
        situation: "You left cards at a barber shop 3 weeks ago. You want to check in.",
        task: "Make an appropriate follow-up.",
        options: [
          { label: "Don't follow up — they'll call if interested.", value: "a" },
          { label: "Visit, thank them, ask if they need more cards, and briefly check if anyone has asked questions.", value: "b" },
          { label: "Call and demand to know why no one has contacted you yet.", value: "c" },
          { label: "Send them an invoice for the marketing materials.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Professional follow-up, maintains relationship, low-pressure check-in.",
        keyPrinciple: "Follow up professionally. Be a resource, not a burden.",
      },
      {
        id: "3.7",
        title: "The Rejection",
        difficulty: "Easy",
        situation: "A gym owner says: \"No thanks, we don't want anything like that here.\"",
        task: "Respond to rejection professionally.",
        options: [
          { label: "\"Why not? It's a great opportunity!\"", value: "a" },
          { label: "\"No problem at all. Thank you for your time.\"", value: "b" },
          { label: "\"You're making a mistake.\"", value: "c" },
          { label: "Leave cards anyway when they're not looking.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Graceful acceptance, professional, preserves potential future relationship.",
        keyPrinciple: "Accept \"no\" gracefully. Never argue or pressure.",
      },
      {
        id: "3.8",
        title: "The Success Story Request",
        difficulty: "Medium",
        situation: "A pharmacist asks: \"Do you have any success stories from patients? Something I could share if people ask?\"",
        task: "Respond appropriately.",
        options: [
          { label: "\"Sure! Let me tell you about Sarah — she had great results...\"", value: "a" },
          { label: "\"I can share anonymised, general information about the process. For specific information, clinics have portfolios with consented patient stories. I can't share individual patient details due to privacy rules.\"", value: "b" },
          { label: "\"I'll get some patients to call you directly.\"", value: "c" },
          { label: "\"I don't have any success stories yet.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Respects privacy, offers what's appropriate (general info, clinic portfolios), clear boundary.",
        keyPrinciple: "Never share patient details without consent. Redirect to appropriate sources.",
      },
      {
        id: "3.9",
        title: "The NHS Staff Member",
        difficulty: "Hard",
        situation: "A friend who works as an NHS nurse asks if they could help spread the word about MrClinc at their hospital.",
        task: "Advise them appropriately.",
        options: [
          { label: "\"Yes! That would be great. The more people know, the better.\"", value: "a" },
          { label: "\"I appreciate the thought, but NHS staff face employment restrictions around this kind of thing. It could put you in a difficult position. I'd suggest not mixing this with your work.\"", value: "b" },
          { label: "\"Only do it if your manager approves.\"", value: "c" },
          { label: "\"Just be discreet about it.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Protects the friend, acknowledges ethical complexity, clear advice against.",
        keyPrinciple: "NHS staff are RED LIGHT. Never encourage them to promote MrClinc at work.",
      },
      {
        id: "3.10",
        title: "The Commission Request",
        difficulty: "Medium",
        situation: "A hairdresser says: \"I like the idea, but I'd want a cut. Can you pay me for referrals?\"",
        task: "Respond to the commission request.",
        options: [
          { label: "\"Sure, how about £50 per patient?\"", value: "a" },
          { label: "\"I understand, but I don't pay for referrals. The arrangement is just about having information available — your business isn't affected either way. If that doesn't work for you, no problem.\"", value: "b" },
          { label: "\"Let me check with MrClinc if we can arrange something.\"", value: "c" },
          { label: "\"I'll pay you under the table so no one knows.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear boundary, explains the actual arrangement, accepts if they decline.",
        keyPrinciple: "Never pay professionals for referrals. Win-win is about no conflict, not financial incentive.",
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
        title: "The Crying Cancer Patient",
        difficulty: "Hard",
        situation: "A cancer patient calls, crying: \"I just got my diagnosis. I don't know what to do. Can you help me? Should I come to Turkey?\"",
        task: "Handle this highly emotional situation appropriately.",
        options: [
          { label: "\"Yes, come to Turkey immediately. We can help.\"", value: "a" },
          { label: "\"I'm so sorry you're going through this. I can't tell you what to do, but I can explain the Second Opinion option — it's free, no obligation, and might give you additional information to consider alongside your existing care. Would you like to hear how it works? And please, make sure you're also talking to your UK doctors and loved ones.\"", value: "b" },
          { label: "\"You need to calm down before we can talk properly.\"", value: "c" },
          { label: "\"A second opinion could help you explore all your options.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Empathetic, offers appropriate option (FSO), maintains boundaries, encourages existing care relationships.",
        keyPrinciple: "High emotion requires high empathy — but boundaries still apply. Offer what you can, encourage professional support.",
      },
      {
        id: "4.2",
        title: "The Unrealistic Expectation",
        difficulty: "Medium",
        situation: "A patient says: \"I want to look exactly like this celebrity after my rhinoplasty. Can you guarantee the clinic will make me look like them?\"",
        task: "Address unrealistic expectations appropriately.",
        options: [
          { label: "\"I'm sure they can do something similar!\"", value: "a" },
          { label: "\"I can't guarantee any specific outcome — results depend on many factors including your individual anatomy. That's a conversation to have with the surgeons during consultation. They'll give you a realistic assessment.\"", value: "b" },
          { label: "\"That celebrity probably had multiple surgeries. You'll need more than one.\"", value: "c" },
          { label: "\"Sure, Turkish surgeons can do anything.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Clear about no guarantees, redirects to appropriate conversation (with surgeons), realistic framing.",
        keyPrinciple: "Never promise outcomes. Redirect to clinical consultation for realistic expectations.",
      },
      {
        id: "4.3",
        title: "The Aggressive Patient",
        difficulty: "Hard",
        situation: "A patient becomes aggressive: \"This is taking too long! You're useless! I want to speak to your manager NOW!\"",
        task: "Handle aggression professionally.",
        options: [
          { label: "\"Fine! I'll transfer you to someone else who can deal with you.\"", value: "a" },
          { label: "\"I understand you're frustrated. I want to help resolve this. Let me escalate your case to the platform team — they can investigate and get back to you. Would that help?\"", value: "b" },
          { label: "\"Don't speak to me like that. I'm hanging up.\"", value: "c" },
          { label: "\"I'm the manager. There's no one else.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Stays calm, acknowledges frustration, offers concrete action (escalation to platform team), professional.",
        keyPrinciple: "Don't match aggression. Stay calm, offer solutions, escalate to platform team if needed.",
      },
      {
        id: "4.4",
        title: "The Clinic Complaint",
        difficulty: "Medium",
        situation: "A patient calls, upset: \"The clinic was rude to me on the phone. They didn't answer my questions properly. I want to complain.\"",
        task: "Handle the complaint appropriately.",
        options: [
          { label: "\"That's between you and the clinic. Nothing to do with me.\"", value: "a" },
          { label: "\"I'm sorry to hear that. I can escalate this to the platform team so it's documented and addressed. Would you like me to do that? In the meantime, if you have questions about the process, I can try to help with those.\"", value: "b" },
          { label: "\"They're usually good. Are you sure you didn't misunderstand?\"", value: "c" },
          { label: "\"I'll call them and tell them off for you.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Validates concern, offers appropriate action (escalation to platform team), stays within scope.",
        keyPrinciple: "Take complaints seriously. Escalate through platform team. Don't defend or attack clinics.",
      },
      {
        id: "4.5",
        title: "The \"I Changed My Mind\" Patient",
        difficulty: "Easy",
        situation: "A patient who was about to proceed with treatment suddenly says: \"Actually, I've changed my mind. I don't want to do this anymore.\"",
        task: "Handle the withdrawal appropriately.",
        options: [
          { label: "\"Are you sure? You'll regret it!\"", value: "a" },
          { label: "\"That's completely fine. It's your decision. I'll note that you're withdrawing. If you ever want to explore this again in the future, you're welcome to. Is there anything else I can help with?\"", value: "b" },
          { label: "\"But you've come so far! Don't give up now.\"", value: "c" },
          { label: "\"What if I can get you a discount?\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Respects decision, no pressure, leaves door open, professional closure.",
        keyPrinciple: "Patient can withdraw at any time. No pressure, no guilt. Respectful closure.",
      },
      {
        id: "4.6",
        title: "The Multiple Clinic Problem",
        difficulty: "Medium",
        situation: "A patient is overwhelmed: \"I've got information from 4 clinics and I don't know how to compare them. Can you just tell me which one to pick?\"",
        task: "Help without making the decision.",
        options: [
          { label: "\"Just go with the cheapest one.\"", value: "a" },
          { label: "\"I can't choose for you, but I can help you think through it. What matters most to you — price, specific technique, surgeon experience, location? Let's work through your priorities.\"", value: "b" },
          { label: "\"Pick any one. They're all good.\"", value: "c" },
          { label: "\"You should have only requested from one clinic.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Maintains boundary, offers structured help (priorities framework), empowers patient.",
        keyPrinciple: "Help patients decide, don't decide for them. Framework + priorities = useful support.",
      },
      {
        id: "4.7",
        title: "The Emergency Situation",
        difficulty: "Hard",
        situation: "A patient in Turkey calls you in panic: \"Something's wrong. I'm bleeding heavily. The clinic isn't answering. What do I do?!\"",
        task: "Handle the potential emergency appropriately.",
        options: [
          { label: "\"Apply pressure to the wound and wait.\"", value: "a" },
          { label: "\"This sounds like an emergency. Call 112 immediately — that's Turkey's emergency number. Or go to the nearest hospital. I'll try to reach the clinic as well. But please call 112 NOW.\"", value: "b" },
          { label: "\"I'm sure it's fine. Bleeding happens after surgery.\"", value: "c" },
          { label: "\"I can't help with medical emergencies.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Recognizes emergency, gives clear action (112), doesn't provide medical advice, offers to help with clinic contact.",
        keyPrinciple: "Potential emergencies = direct to emergency services immediately. Don't assess, don't delay.",
      },
      {
        id: "4.8",
        title: "The Second Thoughts Patient",
        difficulty: "Medium",
        situation: "A patient scheduled for surgery next week says: \"I'm having second thoughts. Everyone says I'm crazy for doing this abroad. Maybe they're right?\"",
        task: "Handle the doubt appropriately.",
        options: [
          { label: "\"They don't know what they're talking about. You're doing the right thing.\"", value: "a" },
          { label: "\"It's natural to have doubts before a big decision. Have you discussed your concerns with the clinical team? They can address specific worries. And there's no pressure from my side — if you're not comfortable, you can postpone or withdraw.\"", value: "b" },
          { label: "\"You've already committed. It's too late to back out.\"", value: "c" },
          { label: "\"Your friends are probably just jealous.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Validates doubts, suggests appropriate source for reassurance, reminds of autonomy.",
        keyPrinciple: "Validate doubts, redirect to appropriate sources, remind patient they're in control.",
      },
      {
        id: "4.9",
        title: "The Elderly Patient's Family",
        difficulty: "Hard",
        situation: "An elderly patient's adult child calls: \"I don't think my mother should be doing this at her age. Can you tell her not to proceed?\"",
        task: "Handle the family concern appropriately.",
        options: [
          { label: "\"I agree. Let me talk to her about cancelling.\"", value: "a" },
          { label: "\"I understand your concern. However, I can only take direction from the patient herself. If she's competent to make her own medical decisions, it's her choice. I'd encourage you to have this conversation with her and perhaps involve her UK doctor.\"", value: "b" },
          { label: "\"Your mother's an adult. Mind your own business.\"", value: "c" },
          { label: "\"I'll tell her you called and said she should cancel.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Respects patient autonomy, doesn't take sides, encourages family communication.",
        keyPrinciple: "Patient autonomy is paramount. Don't take family direction over patient direction.",
      },
      {
        id: "4.10",
        title: "The Platform Error",
        difficulty: "Medium",
        situation: "A patient says their tracking code shows \"Processing\" but they received information from clinics days ago. The system seems wrong.",
        task: "Handle the technical/process issue.",
        options: [
          { label: "\"That's weird. Must be a glitch. Ignore it.\"", value: "a" },
          { label: "\"Thank you for flagging that. It sounds like there might be a sync issue. I'll escalate this to the platform team to investigate and correct. Your case is progressing even if the status display is delayed.\"", value: "b" },
          { label: "\"That's not my department. Call technical support.\"", value: "c" },
          { label: "\"Are you sure you're looking at the right case?\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Takes concern seriously, explains likely issue, commits to action (escalate to platform team), reassures patient.",
        keyPrinciple: "Take process issues seriously. Escalate to platform team. Keep patient informed.",
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
        title: "The Nervous First-Timer",
        difficulty: "Easy",
        situation: "A patient says: \"I've never done anything like this before. I don't even know what questions to ask.\"",
        task: "Help them feel comfortable starting the process.",
        options: [
          { label: "\"Don't worry, I'll handle everything.\"", value: "a" },
          { label: "\"That's completely normal. Let me walk you through how it works step by step. You don't need to know everything upfront — questions often come up as you learn more. What would you like to know first?\"", value: "b" },
          { label: "\"Just submit the form and figure it out later.\"", value: "c" },
          { label: "\"You should do more research before calling me.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Normalizes uncertainty, offers structured guidance, empowers gradual learning.",
        keyPrinciple: "Meet patients where they are. Normalize uncertainty and offer step-by-step support.",
      },
      {
        id: "5.2",
        title: "The Comparison Seeker",
        difficulty: "Medium",
        situation: "A patient asks: \"How does Turkish healthcare compare to the NHS? Is it better or worse?\"",
        task: "Respond without making inappropriate comparisons.",
        options: [
          { label: "\"Turkish private healthcare is much better than NHS.\"", value: "a" },
          { label: "\"Different healthcare systems have different strengths. Some patients explore additional options depending on their personal situation. It's about finding what's right for your specific needs.\"", value: "b" },
          { label: "\"NHS is struggling. That's why people come to us.\"", value: "c" },
          { label: "\"Turkish doctors are more experienced than UK doctors.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Balanced response, no system criticism, acknowledges both have merits, focuses on patient's situation.",
        keyPrinciple: "NEVER criticise any healthcare system. Balanced, factual, situation-specific.",
      },
      {
        id: "5.3",
        title: "The Professional Language Test",
        difficulty: "Easy",
        situation: "A patient uses very casual language and calls you \"mate.\" They ask: \"So mate, what's the deal with this? Can you hook me up?\"",
        task: "Respond professionally without being cold.",
        options: [
          { label: "\"Sure mate! I'll sort you out with the best deal.\"", value: "a" },
          { label: "\"Hi! I can definitely help explain how the process works. Essentially, you submit a request, receive information from clinics, and decide what's right for you. No pressure, all at your own pace. Would you like me to walk you through it?\"", value: "b" },
          { label: "\"Please address me professionally.\"", value: "c" },
          { label: "\"This isn't that kind of service.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Maintains professional tone without being cold, mirrors warmth without mimicking casual language.",
        keyPrinciple: "Stay professional regardless of how patient communicates. Warm but boundaried.",
      },
      {
        id: "5.4",
        title: "The Long-Winded Patient",
        difficulty: "Medium",
        situation: "A patient has been talking for 15 minutes, sharing their entire medical history and personal life, but hasn't asked a clear question.",
        task: "Redirect the conversation respectfully.",
        options: [
          { label: "\"I need to go. Can you get to the point?\"", value: "a" },
          { label: "\"Thank you for sharing that context. To make sure I help you effectively — what would be most useful for me to explain or help with today?\"", value: "b" },
          { label: "\"I'm not a therapist. Let's focus on the process.\"", value: "c" },
          { label: "Let them continue until they eventually ask a question.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Acknowledges what they've shared, redirects with purpose, respectful but focused.",
        keyPrinciple: "Redirect long conversations respectfully. Focus on how you can help.",
      },
      {
        id: "5.5",
        title: "The Written Communication",
        difficulty: "Easy",
        situation: "You need to email a patient confirming their request was received. What's the appropriate tone?",
        task: "Choose the appropriate email tone.",
        options: [
          { label: "\"Hey! Got your request. We'll be in touch. Cheers!\"", value: "a" },
          { label: "\"Dear Patient, Your request has been received and is being processed. Your tracking code is TRK-XXXXX. You can expect to hear from clinical teams — timing depends on clinical availability. If you have any questions about the process, please don't hesitate to ask. Best regards, [Name]\"", value: "b" },
          { label: "\"REQUEST RECEIVED. AWAIT FURTHER CONTACT.\"", value: "c" },
          { label: "\"Hi hun! Thanks for your request! So exciting! 🎉\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Professional, warm, informative, sets expectations without specific timeline, invites questions.",
        keyPrinciple: "Written communication = professional, clear, warm but not casual. No fixed timelines.",
      },
      {
        id: "5.6",
        title: "The Bad News Delivery",
        difficulty: "Hard",
        situation: "A clinic has reviewed a patient's case and determined they're not a suitable candidate for the procedure they wanted. You need to communicate this.",
        task: "Deliver disappointing news appropriately.",
        options: [
          { label: "\"Bad news — the clinic rejected you.\"", value: "a" },
          { label: "\"I've heard back from the clinical team. Based on their review, they don't feel this particular procedure would be suitable for your situation. This doesn't mean there aren't other options — would you like to discuss what they suggested, or explore other approaches?\"", value: "b" },
          { label: "\"Don't worry, I'll find you another clinic that says yes.\"", value: "c" },
          { label: "\"I told you this might happen.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Empathetic delivery, frames constructively, offers next steps, doesn't promise to override clinical judgment.",
        keyPrinciple: "Deliver disappointing news with empathy, offer constructive next steps, don't override clinical judgment.",
      },
      {
        id: "5.7",
        title: "The Gratitude Response",
        difficulty: "Easy",
        situation: "A patient whose case went well says: \"Thank you so much! You've been amazing. I couldn't have done this without you!\"",
        task: "Respond to praise appropriately.",
        options: [
          { label: "\"I know, I'm great at this.\"", value: "a" },
          { label: "\"Thank you for the kind words! I'm glad the process went smoothly for you. You did the hard work — making the decision and going through with it. Best wishes for your recovery.\"", value: "b" },
          { label: "\"Please leave me a 5-star review.\"", value: "c" },
          { label: "\"No problem. Send me more patients.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Gracious acceptance, credits patient, professional sign-off.",
        keyPrinciple: "Accept gratitude graciously. Credit the patient. Don't solicit reviews or referrals.",
      },
      {
        id: "5.8",
        title: "The Silence Breaker",
        difficulty: "Medium",
        situation: "A patient who was very engaged suddenly stopped responding. It's been 2 weeks since your last message to them.",
        task: "Re-engage appropriately.",
        options: [
          { label: "Don't contact them — if they wanted to continue, they would have responded.", value: "a" },
          { label: "Send one polite check-in: \"Hi [name], just checking in. If you're still exploring options, I'm here to help. If you've decided to put this on hold, no problem at all — just let me know and I can close your case. Best, [your name]\"", value: "b" },
          { label: "Send multiple messages asking why they're ignoring you.", value: "c" },
          { label: "Call them repeatedly until they answer.", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "One professional check-in, offers to close if needed, no pressure.",
        keyPrinciple: "One polite follow-up is appropriate. No pressure, no repeated contact.",
      },
      {
        id: "5.9",
        title: "The Cultural Sensitivity",
        difficulty: "Medium",
        situation: "A patient mentions specific dietary or religious requirements that might affect their treatment stay in Turkey.",
        task: "Respond appropriately to cultural/religious considerations.",
        options: [
          { label: "\"I'm sure Turkey can accommodate that.\"", value: "a" },
          { label: "\"That's important to communicate to the clinic directly. They work with international patients and can address specific requirements. I'd recommend mentioning this early so they can confirm they can accommodate your needs.\"", value: "b" },
          { label: "\"That might be difficult. Turkey is a Muslim country.\"", value: "c" },
          { label: "\"I don't deal with religious stuff.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Takes concern seriously, redirects to appropriate source (clinic), professional.",
        keyPrinciple: "Cultural and religious concerns are valid. Direct to clinic for confirmation. No assumptions.",
      },
      {
        id: "5.10",
        title: "The Final Farewell",
        difficulty: "Easy",
        situation: "A patient's case is complete (they've had their treatment and follow-up). You're closing the case.",
        task: "End the relationship professionally.",
        options: [
          { label: "\"Case closed. Goodbye.\"", value: "a" },
          { label: "\"Your case is now complete. I hope everything has gone well for you. If you have any questions in the future, you're welcome to reach out. Wishing you all the best with your recovery. Take care.\"", value: "b" },
          { label: "\"Remember to send your friends my way!\"", value: "c" },
          { label: "\"Finally! That one's done.\"", value: "d" },
        ],
        correctAnswer: "b",
        explanation: "Warm closure, leaves door open, well-wishes, professional.",
        keyPrinciple: "Close cases warmly. Don't solicit referrals. Leave door open for future contact.",
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success-100 text-success-700";
      case "Medium": return "bg-warning-100 text-warning-700";
      case "Hard": return "bg-error-100 text-error-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex-shrink-0"><img src="/images/logo.svg" alt="MrClinc" className="h-[42px] w-auto" /></Link>
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {scorePercentage >= 80 ? "Category Completed!" : "Keep Practicing"}
              </h2>

              <p className="text-gray-600 mb-6">
                You got {progress.correct} out of {progress.completed} scenarios correct.
              </p>

              <div className="text-4xl font-bold mb-8">
                <span className={scorePercentage >= 80 ? "text-success-600" : "text-accent-600"}>{scorePercentage}%</span>
              </div>

              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleRestart}>
                  Practice Again
                </Button>
                <Link href="/pd/portal/education">
                  <Button variant="primary">
                    Back to Education
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Practice View */}
        {viewMode === "practice" && scenario && (
          <div className="space-y-6">
            {/* Progress Bar */}
            <Card variant="bordered">
              <CardContent className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Scenario {currentScenario + 1} of {category.scenarios.length}</span>
                  <span className="text-sm text-gray-500">{progress.correct} correct so far</span>
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
                  <Badge className={getDifficultyColor(scenario.difficulty)} size="sm">
                    {scenario.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                {/* Situation */}
                <div className="mb-6">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Situation</p>
                  <p className="text-gray-700 leading-relaxed">{scenario.situation}</p>
                </div>

                {/* Task */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your Task</p>
                  <p className="text-gray-900 font-medium">{scenario.task}</p>
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
                          showCorrect
                            ? "border-success-500 bg-success-50"
                            : showWrong
                            ? "border-error-500 bg-error-50"
                            : isSelected
                            ? "border-accent-500 bg-accent-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                            showCorrect
                              ? "border-success-500 bg-success-500 text-white"
                              : showWrong
                              ? "border-error-500 bg-error-500 text-white"
                              : isSelected
                              ? "border-accent-500 bg-accent-500 text-white"
                              : "border-gray-300"
                          }`}>
                            {option.value.toUpperCase()}
                          </span>
                          <span className="text-gray-700 text-sm">{option.label}</span>
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
                        <svg className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-error-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      </div>
                    </div>

                    {/* Key Principle */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Key Principle</p>
                      <p className="text-gray-700 text-sm font-medium">{scenario.keyPrinciple}</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  {!showFeedback ? (
                    <Button
                      variant="primary"
                      onClick={handleSubmit}
                      disabled={!selectedAnswer}
                    >
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
          </div>
        )}
      </main>
    </div>
  );
}
