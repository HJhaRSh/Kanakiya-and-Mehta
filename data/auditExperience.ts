export interface AuditRow {
  bankName?: string;
  branch?: string;
  place?: string;
  workingCapital?: string;
  year?: number;
  nature?: string;
  departmentName?: string;
  companyName?: string;
}

export const nationalizedBankAudits: AuditRow[] = [
  { bankName: "Punjab National Bank", branch: "Solapur", year: 2020 },
  { bankName: "Punjab National Bank", branch: "Colaba Mumbai", year: 2020 },
  { bankName: "Punjab National Bank", branch: "Pune", year: 2019 },
  { bankName: "Punjab National Bank", branch: "Aurangabad", year: 2019 },
  { bankName: "Punjab National Bank", branch: "Dhule", year: 2018 },
  { bankName: "Punjab National Bank", branch: "Kothrud", year: 2018 },
  { bankName: "State Bank of India", branch: "Multiple branches", year: 2021 },
  { bankName: "State Bank of India", branch: "Ahmednagar", year: 2020 },
  { bankName: "State Bank of India", branch: "Pune", year: 2019 },
];

export const regionalRuralBankAudits: AuditRow[] = [
 {
   bankName: "Maharashtra Gramin Bank",
   place: "Nanded",
   workingCapital: "₹4,900 Crore",
   year: 2023,
 },
];

export const districtCentralCoopAudits: AuditRow[] = [
  { bankName: "Ahmednagar District Central Co-op Bank", place: "Ahmednagar", workingCapital: "₹2,200 Crore", year: 2023 },
  { bankName: "Pune District Central Co-op Bank", place: "Pune", workingCapital: "₹3,500 Crore", year: 2023 },
  { bankName: "Beed District Central Co-op Bank", place: "Beed", workingCapital: "₹1,800 Crore", year: 2022 },
  { bankName: "Sangli District Central Co-op Bank", place: "Sangli", workingCapital: "₹2,100 Crore", year: 2022 },
  { bankName: "Nasik District Central Co-op Bank", place: "Nasik", workingCapital: "₹1,900 Crore", year: 2022 },
];

export const cooperativeBankAudits: AuditRow[] = [
  { bankName: "Sangamner Merchants Co-op Bank", place: "Sangamner", year: 2023 },
  { bankName: "Nasik Merchants Co-op Bank", place: "Nasik", year: 2023 },
  { bankName: "Jalgaon Janta Sahakari Bank", place: "Jalgaon", year: 2022 },
  { bankName: "Niphad Urban Co-op Bank", place: "Niphad", year: 2022 },
  { bankName: "Ambika Mahila Co-op Bank", place: "Ahmednagar", year: 2021 },
  { bankName: "Sainik Sahakari Bank", place: "Pune", year: 2021 },
];

export const concurrentBankAudits: AuditRow[] = [
  { bankName: "Corporation Bank", branch: "Pune", year: 2019 },
  { bankName: "Bank of Baroda", branch: "Ahmednagar", year: 2019 },
  { bankName: "Bank of Maharashtra", branch: "Pune", year: 2020 },
  { bankName: "Central Bank of India", branch: "Mumbai", year: 2018 },
  { bankName: "Bank of India", branch: "Pune", year: 2018 },
  { bankName: "Dena Bank", branch: "Ahmednagar", year: 2017 },
  { bankName: "UCO Bank", branch: "Pune", year: 2017 },
  { bankName: "Syndicate Bank", branch: "Mumbai", year: 2016 },
  { bankName: "Canara Bank", branch: "Pune", year: 2016 },
  { bankName: "Union Bank", branch: "Ahmednagar", year: 2015 },
];

export const systemAudits: AuditRow[] = [
  { nature: "IT System Audit", bankName: "Bank of Maharashtra", branch: "HO", year: 2022 },
  { nature: "System Audit", bankName: "Sainik Sahakari Bank", branch: "Pune", year: 2021 },
  { nature: "IT Audit", bankName: "Ambika Mahila Co-op Bank", branch: "Ahmednagar", year: 2021 },
  { nature: "System Audit", bankName: "Oriental Bank of Commerce", branch: "Mumbai", year: 2019 },
];

export const governmentAudits: AuditRow[] = [
  { departmentName: "DRDA (District Rural Development Agency)", year: 2015 },
  { departmentName: "DRDA", year: 2014 },
  { departmentName: "Collector Office MPLAD Scheme", year: 2016 },
  { departmentName: "Collector Office MPLAD Scheme", year: 2015 },
  { departmentName: "Zilla Parishad Ahmednagar — Swachata Abhiyan", year: 2018 },
  { departmentName: "MREGS Ahmednagar District", year: 2017 },
  { departmentName: "IWMP Vasundhara Project", year: 2016 },
  { departmentName: "Rahuri Krushi Vidyapith — CAAST", year: 2019 },
];

export const companyAudits: string[] = [
  "National Insurance Co. Ltd",
  "The New India Assurance Co. Ltd",
  "United India Assurance",
  "Oriental Insurance Co. Ltd",
  "Maruti Udyog Ltd",
  "Maharashtra State Electricity Distribution Company Ltd",
  "Various private sector companies (Ahmednagar / Pune region)",
];

export type AuditCategoryKey =
  | "nationalized"
  | "rrb"
  | "dccb"
  | "coop"
  | "concurrent"
  | "system"
  | "government"
  | "company";

export const auditCategories: Record<
  AuditCategoryKey,
  { title: string; data: AuditRow[] | string[] }
> = {
  nationalized: { title: "Nationalized Bank Statutory Audits", data: nationalizedBankAudits },
  rrb: { title: "Regional Rural Bank Audits", data: regionalRuralBankAudits },
  dccb: { title: "District Central Co-op Bank Audits", data: districtCentralCoopAudits },
  coop: { title: "Co-operative Bank Audits", data: cooperativeBankAudits },
  concurrent: { title: "Concurrent Bank Audits", data: concurrentBankAudits },
  system: { title: "System Audits", data: systemAudits },
  government: { title: "Government Department Audits", data: governmentAudits },
  company: { title: "Company Audits", data: companyAudits },
};
