import styles from './Choice.module.scss';

interface Props {
    items: string[],
    value: any,
    label: string,
    onClick: (s: string) => void
};

const Input = ({label, items, value, onClick}:Props) => {

  return (
    <div className={styles.container}>

        <label>{label}</label>

        <div className={styles.items}>
          {items.map((el, index) => 
            <button key={index} type="button" onClick={() => onClick(el)}>
              <span className={`${styles.check} ${el.toLowerCase() === value.toLowerCase() ? styles.selected : ""}`} />
              <p>{el}</p>
            </button>    
          )}
        </div>

    </div>
  )
}

export default Input