import { ComponentPropsWithoutRef } from 'react';
import styles from './Button.module.scss';

export type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    variant?: 'text' | 'outlined' | 'contained';
};

export const Button = ({ variant = 'contained', ...props }: ButtonProps) => {
    return (
        <button
            {...props}
            className={`${styles.button} ${styles[variant]} ${props.className ?? ''}`}
        >
            {props.children}
        </button>
    );
};
