import * as d3 from 'd3';
import { useRef } from 'react';

function ChartGraph({ yearCounts }) {
    const chartRef = useRef();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 1000 - margin.left - margin.right;
    const height = 160 - margin.top - margin.bottom;

    d3.select(chartRef .current).selectAll('svg').remove();

    // Create SVG canvas
    const svg = d3.select(chartRef.current)
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create scales
    const x = d3.scaleBand()
    .domain(yearCounts.map(d => d.year))
    .range([0, width])
    .padding(0.1);

    const y = d3.scaleLinear()
    .domain([0, d3.max(yearCounts, d => d.count)])
    .nice()
    .range([height, 0]);

    // Draw axes
    svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('transform', 'rotate(-45)')
    .style('text-anchor', 'end');

    svg.append('g')
    .call(d3.axisLeft(y));

    // Draw bars
    svg.selectAll('.bar')
    .data(yearCounts)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => x(d.year))
    .attr('y', d => y(d.count))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.count))
    .attr('fill', '#69b3a2');

    // Add labels if needed
    svg.selectAll('.label')
    .data(yearCounts)
    .enter()
    .append('text')
    .attr('x', d => x(d.year) + x.bandwidth() / 2)
    .attr('y', d => y(d.count) - 5)
    .attr('text-anchor', 'middle')
    .text(d => d.count);

    return (
        <div ref={chartRef} className={`w-full h-full`}>

        </div>
    )
}

export default ChartGraph;
