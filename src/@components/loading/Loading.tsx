import styles from './Loading.module.scss';
import React, { useEffect, useState } from 'react';

interface Props {
  message?: string,
}

const Loading = ({message} : Props) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 7000);

    return () => setLoading(false);
  }, [])

  return (
    <div className={styles.container}>
      {loading ? 
        <span className={styles.loader} />
        :
        <div className={styles.children}>
          <a href={`/`}>{message}</a>
        </div>
      }
    </div>
  )
}

export default Loading