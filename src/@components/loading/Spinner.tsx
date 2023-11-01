import styles from './Spinner.module.scss';

interface Props {
  size?: number,
  color?: "default" | "black" | "red" | "light" | "dark" | "blue" | "green",
  center?: boolean 
}

const Spinner = ({color="default", center=false, size=20}:Props) => {
  return (
    <span 
      className={`${styles.loading} ${center ? styles.center : "default"} ${color ? styles[color] : styles.default}`}  
      style={{width: `${size}px`, height: `${size}px`}}      
    />  
  )
}

export default Spinner