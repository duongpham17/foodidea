import styles from './Round.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    value: any,
    href: string,
    color?: "main" | "white" | "dark" | "black",
    padding?: string,
    margin?: string,
    center?: boolean,
    open?: boolean,
}

const Style1 = ({value, color="black", padding, margin, center, href, open, ...props}: Props) => (
    <div className={`${styles.container} ${center ? styles.center : ""}`}>
        <a 
            className={`${styles[color]}`} 
            style={{padding: padding, margin: margin}}
            href={href} 
            rel={open ? "noopener noreferrer" : ""} 
            target={open ? "_blank" : ""} 
            {...props}
        >
            {value}
        </a>
    </div>
)

export default Style1