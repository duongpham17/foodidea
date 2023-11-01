import styles from './Style1.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    color?: "main" | "light" | "dark" | "grey" | "white" | "lighty" | "black" | "default"
}

const Line1 = ({color, ...props}: Props ) => (
    <div className={`${styles.container} ${styles[color || "default"]}`} {...props}/>
)

export default Line1