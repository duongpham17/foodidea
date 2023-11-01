import styles from './Style2.module.scss';
import React from 'react';

interface Props extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    value: any,
    href: string,
    color?: "main" | "white" | "dark" | "black" | "default",
    padding?: string,
    margin?: string,
    center?: boolean,
    open?: boolean,
}

const Style1 = ({value, color="default", padding, margin, center, href, open, ...props}: Props) => (
    <div className={`${styles.container} ${center ? styles.center : ""}`}>
        <a 
            className={`${styles[color]}`} 
            style={{padding: padding, margin: margin}}
            href={href} 
            rel={open ? "noopener noreferrer" : ""} 
            target={open ? "_blank" : ""} 
            {...props}
        >
            <span>{value}</span>
            <span>&#x2192;</span>
        </a>
    </div>
)

export default Style1