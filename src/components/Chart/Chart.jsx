import PropTypes from 'prop-types';
import * as d3 from 'd3';

import styles from './Chart.module.css';
import ChartGraph from './ChartGraph';

function Chart({ selectedTree, plantingYearsList }) {

    // Calculate bins
    const [minYear, maxYear] = d3.extent(plantingYearsList); // Get range of years
    const binGenerator = d3.bin()
        .domain([1840, maxYear]) // Set the domain to the range of years
        .thresholds(15); // Set the number of bins

    const bins = binGenerator(plantingYearsList);

    // Convert bins into chart-friendly format
    const binData = bins.map(bin => ({
        range: `${bin.x0}-${bin.x1}`, // Bin range
        count: bin.length // Number of items in the bin
    }));

    return (
        <div className={`absolute bottom-5 right-5 flex flex-col h-40 w-8/12 ${styles.chart_container}`}>
            {/* <h2 className='p-2.5'>It is {!selectedTree ? 'All' : selectedTree}</h2> */}
            <ChartGraph binData={binData} />
        </div>
    );
}

// PropTypes validation
Chart.propTypes = {
    selectedTree: PropTypes.string.isRequired,
    plantingYearsList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Chart;
