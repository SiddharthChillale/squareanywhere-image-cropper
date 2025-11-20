import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion } from 'framer-motion';

const Button = ({
    children,
    variant = 'filled',
    className,
    icon,
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

    const variants = {
        filled: "bg-primary text-onPrimary hover:bg-primary/90 active:bg-primary/80 shadow-sm hover:shadow",
        outlined: "border border-outline text-primary hover:bg-primary/10 active:bg-primary/20",
        text: "text-primary hover:bg-primary/10 active:bg-primary/20 px-4",
        tonal: "bg-secondaryContainer text-onSecondaryContainer hover:bg-secondaryContainer/80 active:bg-secondaryContainer/70",
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {icon && <i className={clsx(icon, "text-[18px]")}></i>}
            {children}
        </motion.button>
    );
};

export default Button;
