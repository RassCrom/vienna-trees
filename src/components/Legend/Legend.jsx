import PropTypes from 'prop-types';

import Dropdown from '../Dropdown/Dropdown';
import LegendYear from './LegendYear';
import LegendHeight from './LegendHeight';
import LegendDiam from './LegendDiam';
import TreeInfo from '../TreeInfo/TreeInfo';

import styles from './Legend.module.css'
import { useRef, useState } from 'react';

function Legend({ clickedTree, treeTypeList, handleSelectedTree }) {
    const legendContentRef = useRef();
    const legendRef = useRef();
    const [legendState, setLegendState] = useState(true)

    const hideLegend = () => {
        if (legendState) {
            legendContentRef.current.style.display = 'none'
            legendRef.current.style.bottom = 'auto'
            setLegendState(false)
        } else {
            legendContentRef.current.style.display = 'flex'
            legendRef.current.style.bottom = '1.25rem'
            setLegendState(true)
        }
        console.log(!legendState)
    }

    return (
      <div ref={legendRef} className={styles.legend}>
        <h1 onClick={hideLegend} className={`${styles.legend_heading} cursor-pointer`}>Legend</h1>
        <div ref={legendContentRef} className={`${styles.legend_content} flex flex-col gap-6`}>
            <Dropdown treeTypeList={treeTypeList} handleSelectedTree={handleSelectedTree} />
            <LegendYear />
            <LegendHeight />
            <LegendDiam />
            <TreeInfo type={clickedTree[0]} year={clickedTree[1]} 
                diam={clickedTree[2]} height={clickedTree[3]} 
                trunk={clickedTree[4]} 
            />
        </div>
      </div>
    );
  }
  

// PropTypes validation
Legend.propTypes = {
    clickedTree: PropTypes.array.isRequired,
};

export default Legend;