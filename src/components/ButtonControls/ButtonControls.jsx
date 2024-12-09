import PropTypes from 'prop-types';
import styles from './ButtonControls.module.css';

function ButtonControls({ onZoomIn, onZoomOut, onReset, onAnimate }) {
  return (
    <div className="absolute top-5 right-5 flex flex-col items-end gap-2.5">
      <button className={`${styles.btn}`} onClick={onZoomIn}>Zoom In</button>
      <button className={`${styles.btn}`} onClick={onZoomOut}>Zoom Out</button>
      <button className={`${styles.btn}`} onClick={onReset}>Reset</button>
      <button className={`${styles.btn}`} onClick={onAnimate}>Animate trees years</button>
    </div>
  );
}``

// PropTypes validation
ButtonControls.propTypes = {
  onZoomIn: PropTypes.func.isRequired, // Required function
  onZoomOut: PropTypes.func.isRequired, // Required function
  onReset: PropTypes.func.isRequired, // Required function
  onAnimate: PropTypes.func.isRequired, // Required function
};

export default ButtonControls;
