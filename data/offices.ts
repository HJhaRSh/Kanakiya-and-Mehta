export interface Office {
  id: string;
  name: string;
  type: "HQ" | "Branch";
  address: string;
  city: string;
  pin: string;
  phone?: string;
  mobile: string;
  email?: string;
  contactPerson?: string;
}

export const offices: Office[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    type: "HQ",
    address: "Flat No. 6, 2nd Floor, Parijat Co-op Scy., Jain Society Area, Near Gurunanak School, Sion (W)",
    city: "Mumbai",
    pin: "400022",
    mobile: "09821434598 / 09423793105",
    contactPerson: "CA Ajay P. Mehta",
  },
  {
    id: "ahmednagar",
    name: "Ahmednagar",
    type: "Branch",
    address: "35, Varad Estate, Near Swami Samarth Mandir, Gaikwad Colony, Nagar Manmad Road",
    city: "Ahmednagar",
    pin: "414003",
    phone: "0241-2340745",
    mobile: "09422220591",
    email: "cakm2007@gmail.com",
  },
  {
    id: "pune",
    name: "Pune",
    type: "Branch",
    address: "A-1 Flat No. 14, Vishnuvihar, above Hanuman Super Market, Bibvewadi, Kondhawa Road",
    city: "Pune",
    pin: "411037",
    mobile: "09823289222",
    contactPerson: "CA Nilamkumar Bhandari",
  },
];
