import styles from './Style1.module.scss';
import React from 'react';
import Link from 'next/link'

interface Props  {
    value: any,
    href: string,
    color?: "main" | "white" | "dark" | "black",
    padding?: string,
    margin?: string,
    center?: boolean,
    open?: boolean,
}

const Style1 = ({value, color="black", padding, margin, center, href, open}: Props) => (
    <div className={`${styles.container} ${center ? styles.center : ""}`}>
        <Link className={`${styles[color]}`} style={{padding: padding, margin: margin}} href={href} rel={open ? "noopener noreferrer" : ""} target={open ? "_blank" : ""}>
            {value}
        </Link>
        
    </div>
)

export default Style1