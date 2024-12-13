import * as d3 from 'd3';
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

function ChartGraph({ binData }) {
    const chartRef = useRef();

    useEffect(() => {
        const container = chartRef.current;
        
        const renderChart = () => {
            const margin = { top: 20, right: 30, bottom: 40, left: 40 };
            const width = container.clientWidth - margin.left - margin.right;
            const height = container.clientHeight - margin.top - margin.bottom;

            d3.select(container).selectAll('svg').remove();

            const svg = d3.select(container)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            // Scales
            const x = d3.scaleBand()
                .domain(binData.map(d => d.range))
                .range([0, width])
                .padding(0.1);

            const y = d3.scaleLinear()
                .domain([0, d3.max(binData, d => d.count)])
                .nice()
                .range([height, 0]);

            // Axes
            svg.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .attr('transform', 'rotate(-45)')
                .style('text-anchor', 'end')
                ;

            svg.append('g')
                .call(d3.axisLeft(y).ticks(4));

            // Bars
            svg.selectAll('.bar')
                .data(binData)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.range))
                .attr('y', d => y(d.count))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.count))
                .attr('fill', '#69b3a2')
                .on('mouseover', function() {
                    d3.select(this).style("cursor", "pointer")
                        .attr('stroke', 'white')
                        .attr('fill', '#92c8bb')
                })
                .on('mouseout', function() {
                  d3.select(this).style("cursor", "default")
                  .attr("stroke", 'none')
                  .attr('fill', '#69b3a2');
                });

            // Labels
            svg.selectAll('.label')
                .data(binData)
                .enter()
                .append('text')
                .attr('x', d => x(d.range) + x.bandwidth() / 2)
                .attr('y', d => y(d.count) - 5)
                .attr('text-anchor', 'middle')
                .attr('fill', 'white')
                .text(d => d.count);
        };

        renderChart();
        const handleResize = () => {
            renderChart();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [binData]);

    return <div ref={chartRef} className="w-full h-full" />;
}

// PropTypes validation
ChartGraph.propTypes = {
    binData: PropTypes.array,
};


export default ChartGraph;
