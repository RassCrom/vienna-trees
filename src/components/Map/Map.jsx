import * as d3 from 'd3';
import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import styles from './Map.module.css';
import PropTypes from 'prop-types';

const Map = forwardRef((props, ref) => {
  const mapRef = useRef();
  const zoomBehavior = useRef();
  const circlesRef = useRef(null);

  useImperativeHandle(ref, () => ({
    zoomIn,
    zoomOut,
    resetZoom,
    animateCircles
  }));

  useEffect(() => {
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    d3.select(mapRef.current).selectAll('svg').remove();

    const canvas = d3.select(mapRef.current)
      .append('svg')
      .attr('preserveAspectRatio', 'xMidYMid')
      .attr('viewBox', [0, 0, width, height]);

    const l = canvas.append('g');
    const g = canvas.append('g');

    zoomBehavior.current = d3.zoom()
      .scaleExtent([0.5, 10])
      .on('zoom', (event) => {
        l.attr('transform', event.transform);
        g.attr('transform', event.transform);
      });

    canvas.call(zoomBehavior.current);

    const projection = d3.geoEquirectangular();
    const path = d3.geoPath().projection(projection);

    d3.json(
      'https://raw.githubusercontent.com/RassCrom/geovisual_vienna_trees/refs/heads/main/streets-oldtown.geojson.geojson'
    )
      .then((streets) => {
        projection.fitSize([width, height], streets);
        l.selectAll('path')
          .data(streets.features)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', 'white')
          .attr('stroke-width', 0.35)
          .attr('stroke-opacity', 0.7);
      })
      .catch((err) => {
        alert('There are some problems with the street dataset :(');
        console.error(err);
      });

    d3.json(
      'https://raw.githubusercontent.com/RassCrom/geovisual_vienna_trees/main/streets.geojson'
    )
      .then((trees) => {
        circlesRef.current = g.selectAll('circle')
          .data(
            (!props.selectedTree || props.selectedTree === 'all') 
              ? trees.features 
              : trees.features.filter(d => d.properties.TreeType.split(' ')[0] === props.selectedTree)
          )
          .enter()
          .append('circle')
          .attr('cx', (d) => projection(d.geometry.coordinates)[0])
          .attr('cy', (d) => projection(d.geometry.coordinates)[1])
          .attr('r', (d) => {
            let radiusSize = d3.scalePow()
              .domain([0, 100, 200, 300, 400, 500, 600])
              .range([1, 2, 3, 14, 15, 16, 17, 18, 19, 20]);
            let trunkSize = d.properties.TrunkSize || 0; // Fallback value
            return radiusSize(trunkSize);
          })
          .attr('stroke', (d) => {
            let treeHeight = d.properties.TreeHeight || 0;
            if (treeHeight < 2) return '#4B0082';
            if (treeHeight < 4) return '#00CED1';
            if (treeHeight < 7) return '#FF00FF';
            return 'none'; // No stroke for taller trees
          })
          .attr('stroke-width', .5)
          .attr('fill', (d) => {
            // Set fill color based on planting year
            let plantingYear = d.properties.PlantingYear || 0;
            if (plantingYear < 1980) return '#8B0000';
            if (plantingYear < 1990) return '#FF8C00'; 
            if (plantingYear < 2000) return '#FFD700';
            if (plantingYear < 2010) return '#32CD32'; 
            return '#008000';
          })
          .on('click', function(event, d) {
            const treeType = d.properties.TreeType;
            const plantingYear = d.properties.PlantingYear;
            const treeDiam = d.properties.TreeCrownDiameter;
            const treeHeight = d.properties.TreeHeight;
            const trunkSize = d.properties.TrunkSize;
            let infoList = [treeType, plantingYear, treeDiam, treeHeight, trunkSize]
            
            if (props.setClickedTree) {
              props.setClickedTree(infoList);
            }
          })
          .on('mouseover', function() {
            d3.select(this).style("cursor", "pointer")
            .raise()
            .transition()
            .duration(500)
            .attr("fill", "yellow")
            .attr("stroke-width", 1)
            .attr("cursor", "pointer");
          })
          .on('mouseout', function() { // Use 'mouseout'
            d3.select(this).style("cursor", "default")
            .lower()
            .transition()
            .duration(500)
            .attr('fill', (d) => {
              let plantingYear = d.properties.PlantingYear || 0;
              if (plantingYear < 1980) return '#8B0000';
              if (plantingYear < 1990) return '#FF8C00';
              if (plantingYear < 2000) return '#FFD700';
              if (plantingYear < 2010) return '#32CD32';
              return '#008000'; // Green for 2020 and newer
            })
            .attr("stroke-width", .5);
        });
        const treeTypeList = trees.features.map(el => el.properties.TreeType.split(' ')[0])
        const uniqueTreeTypeList = new Set(treeTypeList);
        props.handleTreeTypeList(uniqueTreeTypeList);

        const treeYearsList = trees
          .features
          .map(el => (el.properties.TreeType.split(' ')[0] === props.selectedTree 
            || props.selectedTree === 'all') 
            && parseInt(el.properties.PlantingYear));
        props.handlePlantingYearList(treeYearsList)
          
      })
      .catch((err) => {
        alert('There are some mistakes in the code with the trees dataset');
        console.error(err);
      });
  }, [props.selectedTree]);

  const animateCircles = () => {
    if (!circlesRef.current) {
      console.error('Circles are not ready for animation.');
      return;
    }
  
    circlesRef.current
      .attr('opacity', 0)
      .transition()
      .duration(1000)
      .delay((d) => {
        const year = d.properties.PlantingYear || 1957;
        return (year - 1957) * 100;
      })
      .attr('opacity', 1);
  };
  

  const zoomIn = () => {
    d3.select('svg')
      .transition()
      .duration(300)
      .call(zoomBehavior.current.scaleBy, 2);
  };

  const zoomOut = () => {
    d3.select('svg')
      .transition()
      .duration(300)
      .call(zoomBehavior.current.scaleBy, 0.5);
  };

  const resetZoom = () => {
    d3.select('svg')
      .transition()
      .duration(300)
      .call(zoomBehavior.current.transform, d3.zoomIdentity);
  };

  return (
    <div ref={mapRef} className={styles.canvas}></div>
  );
});

// PropTypes validation
Map.propTypes = {
  setClickedTree: PropTypes.func, // Required function
  handleTreeTypeList: PropTypes.func, // Required function
  selectedTree: PropTypes.string, // Required function
  handlePlantingYearList: PropTypes.array
};


Map.displayName = 'Map';

export default Map;
