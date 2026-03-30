export const getCustomer = () => import.meta.env.VITE_CUSTOMER || "webtrine";

const CUSTOMER_PROD_CONFIG: { name: string; domainURL: string }[] = [
  {
    name: "webtrine",
    domainURL: "https://webtrine.fr",
  },
  {
    name: "dipaolo",
    domainURL: "https://labodipaolo.com/",
  },
  {
    name: "chillpaws",
    domainURL: "https://chillpaws.fr/",
  },
  {
    name: "apt235",
    domainURL: "https://apt235.com/",
  },
];

export const getCustomerProdConfig = (customer: string) => {
  return CUSTOMER_PROD_CONFIG.find((config) => config.name === customer);
};
