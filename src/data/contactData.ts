import { Facebook, Mail, Phone, Twitter, Unlink } from 'lucide-react';

type SocialLink = {
    label: string;
    url: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type ContactType = {
    socialLink: SocialLink[];
    phone: {
        title: string;
        value: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    };
    email: {
        title: string;
        value: string;
        icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    };
};

export const contactData: ContactType = {
    socialLink: [
        {
            label: 'Facebook',
            url: '#!',
            icon: Facebook,
        },
        { label: 'Twitter', url: '#!', icon: Twitter },
        { label: 'Unlink', url: '#!', icon: Unlink },
    ],
    phone: {
        title: 'Call Us',
        value: '+1 234 567 890',
        icon: Phone,
    },
    email: {
        title: 'Email',
        value: 'contact@gmail.com',
        icon: Mail,
    },
};
