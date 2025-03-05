type FooterLink = {
  label: string;
  url: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterData = {
  logo: string;
  description: string;
  copyright: string;
  sections: FooterSection[];
  socialLinks: FooterLink[];
};

export const footerData: FooterData = {
  logo: "/images/logo.webp",
  description:
    "Get out there & discover your next slope, mountains & destination!",
  copyright: "© 2025 Explorer's Diary. All rights reserved.",
  sections: [
    {
      title: "About Us",
      links: [
        { label: "Our Story", url: "/about" },
        { label: "Team", url: "/team" },
        { label: "Careers", url: "/careers" },
      ],
    },
    {
      title: "Help",
      links: [
        { label: "Contact Us", url: "/contact" },
        { label: "Support", url: "/support" },
        { label: "FAQs", url: "/faqs" },
      ],
    },
    {
      title: "Explore",
      links: [
        { label: "Latest Posts", url: "/blog" },
        { label: "Popular Destinations", url: "/destinations" },
        { label: "Travel Tips", url: "/tips" },
      ],
    },
  ],
  socialLinks: [
    { label: "Facebook", url: "https://facebook.com" },
    { label: "Instagram", url: "https://instagram.com" },
    { label: "Twitter", url: "https://twitter.com" },
  ],
};
