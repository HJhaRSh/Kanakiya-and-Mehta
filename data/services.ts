export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  scope: string[];
}

export const homeServices: ServiceItem[] = [
  {
    id: "statutory",
    title: "Statutory Audit",
    shortDesc: "Nationalized banks, co-op banks, companies",
    description:
      "Comprehensive statutory audits for nationalized banks, cooperative banks, and companies. Our team brings decades of experience in regulatory compliance and financial reporting.",
    scope: [
      "Nationalized bank branch audits",
      "Co-operative bank statutory audits",
      "Company audits (private & public sector)",
      "Regulatory compliance reporting",
    ],
  },
  {
    id: "tax",
    title: "Tax Advisory",
    shortDesc: "Direct tax, indirect tax, ITAT representation",
    description:
      "End-to-end tax advisory including direct tax, GST, corporate tax planning, and representation before ITAT and other authorities.",
    scope: [
      "Income Tax planning and compliance",
      "GST advisory and returns",
      "ITAT appearances",
      "Corporate tax structuring",
    ],
  },
  {
    id: "coop",
    title: "Co-operative Bank Audits",
    shortDesc: "District Central Co-op Banks, Urban Co-ops",
    description:
      "Specialized audits for District Central Co-operative Banks and Urban Co-operative Banks across Maharashtra, with working capital experience up to ₹11,000 Crore.",
    scope: [
      "District Central Co-op Bank audits",
      "Urban Co-operative Bank audits",
      "Compliance with RBI/NABARD guidelines",
      "Investment and treasury audits",
    ],
  },
  {
    id: "government",
    title: "Government Audits",
    shortDesc: "DRDA, MREGS, MPLAD, Zilla Parishad",
    description:
      "CAG-empanelled firm for government and public sector audits including DRDA, MPLAD, MREGS, Zilla Parishad, and development schemes.",
    scope: [
      "DRDA audits",
      "MPLAD scheme audits",
      "MREGS audits",
      "Zilla Parishad & Swachh Bharat audits",
      "IWMP / Vasundhara projects",
    ],
  },
  {
    id: "system",
    title: "System & Concurrent Audit",
    shortDesc: "Bank IT systems, concurrent audits",
    description:
      "Concurrent and system audits for nationalized and cooperative banks. IT system audits and process reviews for robust internal controls.",
    scope: [
      "Bank concurrent audits",
      "IT system audits",
      "Process and internal control reviews",
      "Stock and insurance audits",
    ],
  },
  {
    id: "corporate",
    title: "Corporate Law & Compliance",
    shortDesc: "Company law, SEZ consultancy, secretarial",
    description:
      "Company law compliance, SEZ consultancy, secretarial services, and corporate governance support for businesses across sectors.",
    scope: [
      "Companies Act compliance",
      "SEZ consultancy",
      "Secretarial services",
      "Corporate governance",
    ],
  },
];

export const servicesDetail = {
  statutory: {
    title: "Statutory Bank Audits",
    intro:
      "We conduct statutory audits for nationalized banks, regional rural banks, and branches across Maharashtra and beyond.",
    subsections: [
      {
        heading: "Nationalized Banks",
        items: [
          "Punjab National Bank — Solapur, Colaba Mumbai, Pune, Aurangabad, Dhule, Kothrud branches",
          "State Bank of India — multiple branches",
        ],
      },
      {
        heading: "Regional Rural Banks",
        items: [
          "Maharashtra Gramin Bank (Nanded) — Working Capital up to ₹4,900 Crore",
        ],
      },
    ],
  },
  coop: {
    title: "Co-operative Bank Audits",
    intro:
      "District Central Co-operative Banks and Urban Co-operative Banks with extensive working capital experience.",
    subsections: [
      {
        heading: "District Central Co-op Banks",
        items: [
          "Ahmednagar, Pune, Beed, Sangli, Nasik — Working Capital up to ₹11,000 Crore",
        ],
      },
      {
        heading: "Urban Co-op Banks",
        items: [
          "Sangamner Merchants Co-op, Nasik Merchants Co-op, Jalgaon Janta Sahakari Bank, Niphad Urban Co-op, and others",
        ],
      },
    ],
  },
  concurrent: {
    title: "Concurrent & System Audits",
    intro: "Concurrent and system audit experience across major nationalized banks.",
    subsections: [
      {
        heading: "Concurrent Audit",
        items: [
          "Corporation Bank, Bank of Baroda, Bank of Maharashtra, Central Bank of India, Bank of India, Dena Bank, UCO Bank, Syndicate Bank, Canara Bank, Union Bank",
        ],
      },
      {
        heading: "System Audit",
        items: [
          "Bank of Maharashtra, Sainik Sahakari Bank, Ambika Mahila Co-op Bank, Oriental Bank of Commerce",
        ],
      },
    ],
  },
  government: {
    title: "Government & Public Sector Audits",
    intro: "CAG-empanelled (WR 1683) for government and development scheme audits.",
    subsections: [
      {
        heading: "Audit Assignments",
        items: [
          "DRDA (District Rural Development Agency) — 2007-08 to 2015-16",
          "Collector Office MPLAD Scheme audits — 2007-08 to 2016-17",
          "Zilla Parishad Ahmednagar — Swachata Abhiyan",
          "MREGS — Ahmednagar District",
          "IWMP — Vasundhara Project",
          "Rahuri Krushi Vidyapith — CAAST Project",
        ],
      },
    ],
  },
  corporate: {
    title: "Corporate & Company Audits",
    intro: "Statutory and tax audits for insurance companies, PSUs, and private sector.",
    subsections: [
      {
        heading: "Insurance & PSU",
        items: [
          "National Insurance Co. Ltd, The New India Assurance Co. Ltd, United India Assurance, Oriental Insurance Co. Ltd",
          "Maruti Udyog Ltd, Maharashtra State Electricity Distribution Company Ltd",
        ],
      },
      {
        heading: "Private Sector",
        items: ["Various private sector companies in Ahmednagar and Pune region"],
      },
    ],
  },
  tax: {
    title: "Tax Advisory & Representation",
    intro: "Direct tax, indirect tax (GST), and ITAT representation.",
    subsections: [
      {
        heading: "Scope",
        items: [
          "Direct Tax (Income Tax) planning and compliance",
          "Indirect Tax (GST) advisory",
          "ITAT appearances",
          "Corporate tax planning and compliance",
        ],
      },
    ],
  },
  system: {
    title: "System Audit",
    intro: "IT system audits for cooperative and nationalized banks.",
    subsections: [
      {
        heading: "Scope",
        items: ["IT System Audits for co-op and nationalized banks"],
      },
    ],
  },
  corporatelaw: {
    title: "Corporate Law & Compliance",
    intro: "Company law, SEZ consultancy, and secretarial services.",
    subsections: [
      {
        heading: "Scope",
        items: ["Company Law", "SEZ Consultancy", "Secretarial services"],
      },
    ],
  },
};
