import { Box } from '@material-ui/core';
import { areNodesLoaded, getElements, getLayoutedElements, NodesMap } from 'apps/flowBuilder/models/FlowBuilder.model';
import { selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { Loader } from 'apps/ui';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactFlow, { Elements, ReactFlowProvider, useStoreState } from 'react-flow-renderer';
import { useSelector } from 'react-redux';
import { useStyles } from './FlowProductGraph.styles';

function FlowProductsGraphWithoutContext() {
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState<Elements>([]);
  const [isLayouted, setIsLayouted] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const nodes = useStoreState((state) => state.nodes);
  const products = useSelector(selectFlowBuilderProductsInGraphModel);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const classes = useStyles();

  const handleLoad = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  useEffect(() => {
    setElements(getElements(products.value));
    setIsLayouted(false);
  }, [products]);

  useEffect(() => {
    if (!isLayouted && areNodesLoaded(nodes, elements)) {
      setElements(getLayoutedElements(nodes, getElements(products.value)));
      setIsLayouted(true);
    }
  }, [products, nodes, elements, isLayouted]);

  useEffect(() => {
    if (isLayouted && !isCentered && reactFlowWrapper.current) {
      reactFlowInstance.setTransform({ x: reactFlowWrapper.current.offsetWidth / 2, y: 0, zoom: 1 });
      setIsCentered(true);
    }
  }, [isLayouted, reactFlowInstance, isCentered, reactFlowWrapper]);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move';
  }, []);

  if (!products.isLoaded) {
    return <Loader />;
  }
  return (
    <Box className={classes.root}>
      <div className={classes.wrapper} style={{ height: 2000, width: '100%' }} ref={reactFlowWrapper}>
        <ReactFlow
          elements={elements}
          nodeTypes={NodesMap}
          onDragOver={handleDragOver}
          onLoad={handleLoad}
          zoomOnScroll={false}
          paneMoveable={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          nodesDraggable={false}
          nodesConnectable={false}
        />
      </div>
    </Box>
  );
}

export function FlowProductsGraph() {
  return (
    <ReactFlowProvider>
      <FlowProductsGraphWithoutContext />
    </ReactFlowProvider>
  );
}
