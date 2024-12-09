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
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi natus deleniti exercitationem quidem autem asperiores. 
            Praesentium corrupti excepturi quod dolorem iure? Autem eveniet ad quasi. Nobis quibusdam laudantium autem tenetur.
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
