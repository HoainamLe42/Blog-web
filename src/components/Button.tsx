import { VariantProps, cva } from 'class-variance-authority';
import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const buttonStyles = cva(['transition-colors'], {
    variants: {
        variant: {
            default: [
                'bg-primary',
                'hover:bg-primary-hover',
                'text-white',
                'flex',
                'justify-center',
            ],
            ghost: ['hover:underline'],
            dark: [
                'bg-secondary-dark',
                'hover:bg-secondary-dark-hover',
                'text-secondary',
            ],
            outline: [''],
            borderOnly: [
                'border',
                'border-secondary-border',
                'rounded-md',
                'hover:border-primary',
                'hover:text-primary',
                'dark:text-white',
                'dark:text-secondary-border',
                'dark:hover:text-primary',
            ],
        },
        size: {
            default: ['rounded', 'py-4', 'px-5'],
            icon: [
                'rounded-full',
                'w-10',
                'h-10',
                'flex',
                'items-center',
                'justify-center',
                'p-2.5',
                'text-white',
            ],
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
    },
});

type ButtonProps = VariantProps<typeof buttonStyles> & {
    to?: string; // URL nếu là thẻ <Link>
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ size, variant, className, to, ...props }: ButtonProps) => {
    const buttonClassName = twMerge(buttonStyles({ size, variant }), className);

    if (to) {
        return (
            <Link
                to={to}
                {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
                className={buttonClassName}
            ></Link>
        );
    }

    return <button {...props} className={buttonClassName} />;
};

export default Button;
