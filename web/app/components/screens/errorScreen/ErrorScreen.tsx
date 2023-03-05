import { useEffect, useState } from "react";

import Link from "next/link";

import styles from './errorScreen.module.scss'

export default function ErrorScreen(){

    const [ pageX, setPageX ] = useState<number>(0)
    const [ pageY, setPageY ] = useState<number>(0)
    const [ mouseX, setMouseX ] = useState<number>(0)
    const [ mouseY, setMouseY ] = useState<number>(0)
    const [ yAxis, setyAxis] = useState<number>(0)
    const [ xAxis, setxAxis] = useState<number>(0)

    useEffect(() => {
        setPageX(window.innerWidth)
        setPageY(window.innerHeight)
    }, [])

    return (
        <div onMouseMove={(e: any) => moveEyes(e)} className={styles.box_wrapper}>
            <div className={styles.box}>
                <div className={styles.box__ghost}>
                    <div className={styles.symbol}></div>
                    <div className={styles.symbol}></div>
                    <div className={styles.symbol}></div>
                    <div className={styles.symbol}></div>
                    <div className={styles.symbol}></div>
                    <div className={styles.symbol}></div>
                    
                    <div className={styles.box__ghost_container}>
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: '45%',
                        transform: 'translate('+ xAxis +'%,-'+ yAxis +'%)',
                        height: '12px',
                        width: '70px'
                    }}>
                        <div className={styles.box__eye_left}></div>
                        <div className={styles.box__eye_right}></div>
                    </div>
                    <div className={styles.box__ghost_bottom}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    </div>
                    <div className={styles.box__ghost_shadow}></div>
                </div>
                
                <div className={styles.box__description}>
                    <div className={styles.box__description_container}>
                    <div className={styles.box__description_title}>Whoops!</div>
                    <div className={styles.box__description_text}>404 Page Not Found</div>
                    </div>
                    
                    <Link href='/'>
                        <div className={styles.box__button}>Go To Home Page</div>
                    </Link>
                    
                    
                </div>
                
            </div>
        </div>
    )


    function moveEyes (event: MouseEvent) {
        setMouseY(event.pageY)
        setyAxis((pageY/2-mouseY)/pageY*300)

        setMouseX(event.pageX / -pageX)
        setxAxis(-mouseX * 100 - 100)
    }
}