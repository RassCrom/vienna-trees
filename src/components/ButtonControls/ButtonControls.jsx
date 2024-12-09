import PropTypes from 'prop-types';
import styles from './ButtonControls.module.css';
import { useRef } from 'react';

function ButtonControls({ onZoomIn, onZoomOut, onReset, onAnimate }) {
  const infoRef = useRef();

  function onInfo() {
    infoRef.current.style.display = 'flex';
  }

  function onInfoClose() {
    infoRef.current.style.display = 'none';
  }

  return (
    <>
      <div ref={infoRef} className={`${styles.info_box}`}>
        <div className={`${styles.info_text}`}>
          <h2 className={`mb-5`}>Some information about the map</h2>
          <p className={`${styles.info_p}`}>
            1. Age Distribution<br/>
            Trees are categorized based on planting year, and it seems the majority of trees were planted post-2000, indicated by the green and yellow markers.
            There is a significant decrease in the number of trees planted prior to 1980, highlighting potential gaps in older urban green spaces.
          </p>
          <p className={`${styles.info_p}`}>
          2. Tree Size <br/>
          The diameter and height classifications reveal that most trees fall below medium-to-large categories. This might indicate that a majority of these trees are relatively young and still maturing.
          </p>
          <p className={`${styles.info_p}`}>
          3. Clustered Planting<br/>
          Certain areas show dense clusters of trees, possibly reflecting urban planning initiatives or specific projects aimed at greening particular zones of the city.
          </p>
          <p className={`${styles.info_p}`}>
          4. Temporal Trends<br/>
          The bar chart shows a spike in tree planting during the 2000–2010 period, indicating a potential large-scale afforestation or urban greening project during that decade.
          </p>
          <p className={`${styles.info_p}`}>
          5. Urban Focus<br/>
          The distribution pattern suggests that tree planting is concentrated along major streets or urban zones, potentially prioritizing shade, air quality improvement, or aesthetic enhancement in public areas.
          </p>
          <span onClick={onInfoClose} className={`${styles.info_close}`}>x</span>
        </div>
      </div>
      <div className="absolute top-5 right-5 flex flex-col items-end gap-2.5">
        <button className={`${styles.btn}`} onClick={onZoomIn}>➕</button>
        <button className={`${styles.btn}`} onClick={onZoomOut}>➖</button>
        <button className={`${styles.btn}`} onClick={onReset}>🏠</button>
        <button className={`${styles.btn}`} onClick={onAnimate}>▶️ 🌳</button>
        <button className={`${styles.btn}`} onClick={onInfo}>ℹ️</button>
      </div>
    </>
  );
}

// PropTypes validation
ButtonControls.propTypes = {
  onZoomIn: PropTypes.func.isRequired, // Required function
  onZoomOut: PropTypes.func.isRequired, // Required function
  onReset: PropTypes.func.isRequired, // Required function
  onAnimate: PropTypes.func.isRequired, // Required function
};

export default ButtonControls;
