
import styles from './Legend.module.css'

function LegendYear() {

    return (
        <div className={styles.legend_year}>
            <h2 className={styles.year_heading}>Tree height</h2>
            <div className={`${styles.year_items} ${styles.height_items}`}>
                <div className={`${styles.item} ${styles.item_height}`}>
                    <span className={`${styles.item_color} ${styles.item_stroke}`}></span>
                    <p className={styles.item_text}>Below 2 m</p>
                </div>
                <div className={`${styles.item} ${styles.item_height}`}>
                    <span className={`${styles.item_color} ${styles.item_stroke}`}></span>
                    <p className={styles.item_text}>Below 4 m</p>
                </div>
                <div className={`${styles.item} ${styles.item_height}`}>
                    <span className={`${styles.item_color} ${styles.item_stroke}`}></span>
                    <p className={styles.item_text}>Below 7 m</p>
                </div>
            </div>
        </div>
    )
}

export default LegendYear;