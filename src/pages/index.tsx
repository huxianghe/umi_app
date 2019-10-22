import React, { useState, useEffect  } from 'react';
import styles from './index.css';
import moment from 'moment'

export default function() {
  const [nowTime, setNowTime] = useState(moment().format('YYYY年MM月DD日 ddd HH:mm'))
    useEffect(() => {
      const timer = setInterval(() => {
        setNowTime(moment().format('YYYY年MM月DD日 ddd HH:mm:ss'))
      }, 1000);
      return () => {
        clearInterval(timer);
      }
    },[nowTime])


  const [count, setCount] = useState<number>(0)

  const comcount: any = () => {
    setCount(count + 1)
  }

  const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = ()=>{
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    }, [width]); // width 没有变化则不处理,性能优化

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <p>You clicked {count} times</p>
      <button onClick={comcount}>
        Click me
      </button>
      <div>{nowTime}</div>
      <div>这里是屏幕宽度:{width}</div>
    </div>
  )
}
