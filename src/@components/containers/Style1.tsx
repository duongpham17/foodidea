import styles from './Style1.module.scss';
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode,
  selected?: boolean,
  background?: "default" | "light" | "dark" | 'main' | "darker",
  width?: string,
};

const Container = ({children, selected, background, width,...props}: Props) => {
  return (
    <div className={` ${styles.container} ${selected?styles.selected:""} ${styles[background || "default"]}`} style={{maxWidth:width}} {...props}>
      <div onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Container