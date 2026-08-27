/**
 * Copy for the legal pages, kept out of the route files so it can be edited
 * without touching layout. It describes the data the site actually collects:
 * contact messages, newsletter emails and job applications.
 */
export type LegalSection = { heading: string; body: string[]; bullets?: string[] };

export const privacySections: LegalSection[] = [
  {
    heading: "Who we are",
    body: [
      "Dynamic Renaissance Biz Ents. Ltd. operates this website. We are the data controller for the personal information described below, and we handle it in line with the Nigeria Data Protection Act and, where it applies to visitors in the European Economic Area or the United Kingdom, the General Data Protection Regulation.",
    ],
  },
  {
    heading: "What we collect",
    body: ["We only collect information you choose to give us through one of three forms:"],
    bullets: [
      "Enquiry form — your name, company, email address, phone number, the department you selected and the message you wrote.",
      "Newsletter signup — your email address only.",
      "Job application — your name, email address, phone number, cover note and, if you attach one, your CV.",
    ],
  },
  {
    heading: "Why we use it",
    body: [
      "Enquiries are used to answer you and to follow up on the request you made. Newsletter addresses are used only to send company updates you asked for. Job applications are used to assess your suitability for the role you applied to and to contact you about it.",
      "We do not sell your information, and we do not use it for advertising or automated decision-making.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Enquiries are retained for as long as needed to handle the request and to keep a record of our correspondence. Newsletter addresses are kept until you unsubscribe. Job applications and CVs are retained for the duration of the recruitment process and for a reasonable period afterwards in case a similar role opens, unless you ask us to delete them sooner.",
    ],
  },
  {
    heading: "Where it is stored",
    body: [
      "Form submissions are stored in a managed Supabase database, and uploaded CVs are held in a private storage bucket that only authorised administrators can read. Access is limited to staff who need it to do their jobs.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You can ask us for a copy of the information we hold about you, ask us to correct it, ask us to delete it, or object to how we use it. Newsletter emails can be stopped at any time by contacting us. To exercise any of these rights, email us using the address below and we will respond within a reasonable period.",
    ],
  },
  {
    heading: "Cookies and analytics",
    body: [
      "This site does not set advertising or tracking cookies. Some pages embed a Google Maps frame and load fonts from Google Fonts; those third parties may receive your IP address as part of serving that content, under their own privacy terms.",
    ],
  },
  {
    heading: "Changes to this notice",
    body: [
      "If we change how we handle personal information we will update this page. Please check back from time to time for the current version.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "Acceptance",
    body: [
      "By using this website you agree to these terms. If you do not agree with them, please do not use the site.",
    ],
  },
  {
    heading: "Use of the site",
    body: [
      "You may browse this site and use its forms for genuine enquiries, subscriptions and job applications. You agree not to attempt to gain unauthorised access to any part of the site, to submit false or misleading information, to upload anything harmful, or to use automated tools to scrape or overload the site.",
    ],
  },
  {
    heading: "Information on this site",
    body: [
      "Content on this site is provided for general information about our group and its capabilities. Project figures, timelines and client references are illustrative of the work we do and are published with the permission of the parties involved where required. Nothing on this site is an offer, a warranty, or professional advice you should act on without speaking to us first.",
      "We work to keep the site accurate and current, but we do not guarantee that every page is free of errors or omissions.",
    ],
  },
  {
    heading: "Submissions",
    body: [
      "When you send us an enquiry, subscribe to our newsletter or apply for a role, you confirm the information you provide is accurate and that you are entitled to share it. Job applicants confirm that any CV they upload is their own. We handle everything you submit in line with our privacy policy.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The name, logo, text, imagery and design of this site belong to Dynamic Renaissance Biz Ents. Ltd. or its licensors. You may not reproduce or republish them for commercial purposes without our written permission.",
    ],
  },
  {
    heading: "External links",
    body: [
      "Where this site links to a third-party website or embeds third-party content, we do not control that content and are not responsible for it.",
    ],
  },
  {
    heading: "Liability",
    body: [
      "To the fullest extent permitted by law, we are not liable for any loss arising from your use of, or inability to use, this website. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the Federal Republic of Nigeria, and the Nigerian courts have jurisdiction over any dispute arising from them.",
    ],
  },
];
