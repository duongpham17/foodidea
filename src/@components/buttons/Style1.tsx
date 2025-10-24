"use client"

import styles from './Style1.module.scss';
import React, {useState} from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label1: string | React.ReactNode;
    label2?: string | React.ReactNode;
    selected?: boolean,
    loading?: boolean,
    color?: "primary" | "white" | "black" | "dark" | "light" | "red" | "green",
    margin?: boolean,
    warning?: boolean,
};

const Button = ({label1, label2, loading, color, selected, margin, warning, ...props}: Props) => {

    const [sure, setSure] = useState(false);

    return (
        <div className={styles.container}>

            {warning 
            ?   
                !sure ? 
                    <button className={`${styles[color ? color : "default"]} ${selected && styles.selected} ${margin && styles.margin}`} onClick={() => setSure(true)}>
                        { label1 && !label2 && 
                            <div className={styles.single}>  
                                {!loading && <span> { label1 } </span>}
                                {loading && <div className={styles.loading1} />}
                            </div>
                        }
                        { label1 && label2 && 
                            <div className={styles.double}>  
                                <span>{ label1 } </span>
                                {!loading && <span>{ label2 }</span>}
                                {loading && <div className={styles.loading2} />}
                            </div> 
                        }
                    </button>   
                :
                    <div className={styles.warning}>
                        <button type="button" className={styles.sure} {...props}> SURE </button>
                        <button type="button" className={styles.exit} onClick={() => setSure(false)}> EXIT </button>
                    </div>
            :
                <button type="button" disabled={loading} className={`${styles[color ? color : "default"]} ${selected && styles.selected} ${margin && styles.margin}`} {...props}>

                    { label1 && !label2 && 
                        <div className={styles.single}>  
                            {!loading && <span> { label1 } </span>}
                            {loading && <div className={styles.loading1} />}
                        </div>
                    }

                    { label1 && label2 && 
                        <div className={styles.double}>  
                            <span>{ label1 } </span>
                            {!loading && <span>{ label2 }</span>}
                            {loading && <div className={styles.loading2} />}
                        </div> 
                    }

                </button>   
            }
            
        </div>
    )
}

export default Button