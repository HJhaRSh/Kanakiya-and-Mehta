export interface Partner {
  id: string;
  name: string;
  age: number;
  icaiNo: string;
  qualifications: string[];
  experience: number;
  specialisation: string;
  bio: string;
}

export const partners: Partner[] = [
  {
    id: "ajay-mehta",
    name: "CA Ajay P. Mehta",
    age: 63,
    icaiNo: "034150",
    qualifications: ["FCA"],
    experience: 37,
    specialisation: "Company Audit & Corporate Taxation",
    bio: "Founder partner. 37+ years in corporate field, expert in company affairs. FCA.",
  },
  {
    id: "mukesh-kanakiya",
    name: "CA Mukesh C. Kanakiya",
    age: 60,
    icaiNo: "040772",
    qualifications: ["FCA"],
    experience: 35,
    specialisation: "Direct Tax",
    bio: "Founder partner. 35+ years in income tax matters and audit. FCA.",
  },
  {
    id: "mahesh-bhalgat",
    name: "CA Mahesh M. Bhalgat",
    age: 49,
    icaiNo: "101986",
    qualifications: ["FCA", "DISA", "FAFD"],
    experience: 25,
    specialisation: "Nationalised & Co-op Bank Audits",
    bio: "FCA, Forensic Auditor. Specialist in co-operative bank audits and investments in government securities & bonds.",
  },
  {
    id: "abhilash-munot",
    name: "CA Abhilash B. Munot",
    age: 47,
    icaiNo: "111902",
    qualifications: ["FCA", "DISA", "FAFD"],
    experience: 20,
    specialisation: "Concurrent Bank, Stock & Insurance Audit",
    bio: "FCA, DISA. Completed ICAI Concurrent Audit course. Expert in bank concurrent audits, stock audits, and insurance audits.",
  },
  {
    id: "kiran-maniyar",
    name: "CA Kiran H. Maniyar",
    age: 43,
    icaiNo: "112074",
    qualifications: ["FCA", "DISA"],
    experience: 20,
    specialisation: "Project Finance, KPO/BPO",
    bio: "FCA, DISA, Forensic Auditor. Specializes in project finance and KPO/BPO sectors.",
  },
  {
    id: "abhay-katariya",
    name: "CA Abhaykumar A. Katariya",
    age: 46,
    icaiNo: "113895",
    qualifications: ["FCA", "DISA"],
    experience: 19,
    specialisation: "Co-op Audit & System Audit",
    bio: "FCA, DISA, Forensic Auditor. Trained 1000+ directors/employees in cooperative sectors.",
  },
  {
    id: "nilamkumar-bhandari",
    name: "CA Nilamkumar P. Bhandari",
    age: 42,
    icaiNo: "118015",
    qualifications: ["FCA", "CS"],
    experience: 18,
    specialisation: "Corporate Law & SEZ Consultancy",
    bio: "FCA, CS, M.Com, MA(Eng), BSE-CDE, NCFM. Expert in Company Law & SEZ. Author of published CS law books. Hosts Lawlogic.in — online law learning platform.",
  },
  {
    id: "sushil-jain",
    name: "CA Sushil M. Jain",
    age: 51,
    icaiNo: "049355",
    qualifications: ["FCA", "FAFD"],
    experience: 27,
    specialisation: "Direct Tax, Indirect Tax, Govt. Accounting",
    bio: "FCA, Forensic Auditor. Certificate in Public Finance & Government Accounting. Expertise in indirect taxes, ITAT appearances.",
  },
];
