"use client"

import styles from './Style1.module.scss';
import { ReactElement, ReactNode, useState, useEffect } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';

interface Types {
  children: ReactNode | ReactElement,
  icon: ReactNode | ReactElement,
  openTop?: ReactNode | ReactElement,
  openBottom?: ReactNode | ReactElement,
  autoClose?: boolean
  width?: number,
  background?: string,
}

const Sidebar = ({children, icon, autoClose=true, width=500, openTop, openBottom, background}: Types) => {

    const [open, setOpen] = useState<boolean>(false); 

    const onOpen = (): void => setOpen(!open);

    //remove scrollbar from main body when menu is open, add bodySCrollBar to main css file for this to work
    /* 
        .bodyScrollBar{
            overflow: hidden;
            &::-webkit-scrollbar {
                display: none;
            }
        }
    */
    useEffect(() => {
        if(open) document.body.classList.add("bodyScrollBar");
        return () => document.body.classList.remove('bodyScrollBar');
    }, [open]);

    useEffect(() => {
        if(!autoClose) return;
        setOpen(false);
    }, [autoClose]);

    return (
        <div className={styles.container}>
            <div className={styles.icon} onClick={onOpen}> 
                {icon}
            </div>                                              
            { open &&
                <div className={styles.cover} onClick={onOpen}>
                    <div className={styles.sidebar} style={{maxWidth: `${width}px`, backgroundColor: background}} onClick={e => e.stopPropagation()}>
                        <div className={styles.openTop}>
                            <button className={styles.close} onClick={() => setOpen(!open)}><MdOutlineKeyboardBackspace/></button>
                            {openTop}
                        </div>
                        <div onClick={e => e.stopPropagation()}>
                            {children}
                        </div>
                        <div className={styles.openBottom}>
                            {openBottom}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Sidebar