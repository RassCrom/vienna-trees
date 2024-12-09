
import styles from './Legend.module.css'

function LegendYear() {

    return (
        <div className={styles.legend_year}>
            <h2 className={styles.year_heading}>Planting year</h2>
            <div className={styles.year_items}>
                <div className={styles.item}>
                    <span className={styles.item_color}></span>
                    <p className={styles.item_text}>Older 1980</p>
                </div>
                <div className={styles.item}>
                    <span className={styles.item_color}></span>
                    <p className={styles.item_text}>Older 1990</p>
                </div>
                <div className={styles.item}>
                    <span className={styles.item_color}></span>
                    <p className={styles.item_text}>Older 2000</p>
                </div>
                <div className={styles.item}>
                    <span className={styles.item_color}></span>
                    <p className={styles.item_text}>Older 2010</p>
                </div>
                <div className={styles.item}>
                    <span className={styles.item_color}></span>
                    <p className={styles.item_text}>Older 2020</p>
                </div>
            </div>
        </div>
    )
}

export default LegendYear;