import { useRef } from 'react';
import Map from './components/Map/Map';
import Legend from './components/Legend/Legend';
import ButtonControls from './components/ButtonControls/ButtonControls';
import { useState } from 'react';
import Chart from './components/Chart/Chart';

function App() {
  const mapRef = useRef();
  const [clickedTree, setClickedTree] = useState([]);
  const [treeTypeList, setTreeTypeList] = useState([]);
  const [selectedTree, setSelectedTree] = useState('');
  const [plantingYearsList, setPlantingYearsList] = useState([]);

  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
    console.log(2)
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleReset = () => {
    if (mapRef.current) {
      mapRef.current.resetZoom();
    }
  };

  const handleAnimate = () => {
    if (mapRef.current) {
      mapRef.current.animateCircles();
    }

  };

  const handleTreeInfo = (info) => {
    setClickedTree(info);
  }

  const handleTreeTypeList = (info) => {
    setTreeTypeList(Array.from(info));
  }

  const handleSelectedTree = (tree) => {
    setSelectedTree(tree);
  }

  const handlePlantingYearList = (years) => {
    setPlantingYearsList([...years])
  }

  return (
    <div>
      <Map selectedTree={selectedTree} 
        ref={mapRef} setClickedTree={handleTreeInfo} 
        handleTreeTypeList={handleTreeTypeList} 
        handlePlantingYearList={handlePlantingYearList} />
      <ButtonControls 
        onZoomIn={handleZoomIn} 
        onZoomOut={handleZoomOut} 
        onReset={handleReset} 
        onAnimate={handleAnimate}
      />
      <Legend handleSelectedTree={handleSelectedTree} clickedTree={clickedTree} treeTypeList={treeTypeList} />
      <Chart selectedTree={selectedTree} plantingYearsList={plantingYearsList} />
    </div>
  );
}

export default App;
