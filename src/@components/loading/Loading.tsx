import styles from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loader} />
    </div>
  )
}

export default Loading