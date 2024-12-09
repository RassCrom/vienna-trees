import PropTypes from 'prop-types';
import * as d3 from 'd3';

import styles from './Chart.module.css'
import ChartGraph from './ChartGraph'

function Chart({ selectedTree, plantingYearsList }) {

    // console.log(plantingYearsList)

    // Count occurrences of each year
    let yearCounts = Array.from(
        d3.rollup(plantingYearsList, v => v.length, d => d),
        ([year, count]) => ({ year, count })
    ).sort((a, b) => a.year - b.year);

    yearCounts.splice(0, 1);

    // console.log(yearCounts)
    return (
        <div className={`absolute bottom-5 right-5 flex flex-col h-40 w-8/12 ${styles.chart_container}`}>
            {/* <h2 className='p-2.5'>It is {!selectedTree ? 'All' : selectedTree}</h2> */}
            <ChartGraph yearCounts={yearCounts} />
        </div>
    )
}

// PropTypes validation
Chart.propTypes = {
    selectedTree: PropTypes.string.isRequired,
};

export default Chart;