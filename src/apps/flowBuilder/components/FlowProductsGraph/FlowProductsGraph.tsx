import { Box } from '@material-ui/core';
import { CustomReactFlowMemorised } from 'apps/flowBuilder/components/ReactFlowMemorised/CustomReactFlowMemorised';
import { areNodesLoaded, getElements, getLayoutedElements, getTotalGraphHeight } from 'apps/flowBuilder/models/FlowBuilder.model';
import { selectFlowBuilderProductsInGraphModel } from 'apps/flowBuilder/store/FlowBuilder.selectors';
import { Loader } from 'apps/ui';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Elements, ReactFlowProvider, useStoreState, Node } from 'react-flow-renderer';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useStyles } from './FlowProductGraph.styles';

function FlowProductsGraphWithoutContext() {
  const reactFlowWrapper = useRef(null);
  const [elements, setElements] = useState<Elements>([]);
  const [isLayouted, setIsLayouted] = useState(false);
  const [isCentered, setIsCentered] = useState(false);
  const [reactFlowWrapperHeight, setReactFlowWrapperHeight] = useState(0);
  const loadedNodes: Node[] = useStoreState((state) => state.nodes);
  const productsInGraphModel = useSelector(selectFlowBuilderProductsInGraphModel);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const intl = useIntl();
  const [isLanguageChanged, setIsLanguageChanged] = useState(false);
  const classes = useStyles();

  // we should wait ReactFlow to load nodes to get their actual width and height before layouting
  // load products
  useEffect(() => {
    setElements(getElements(productsInGraphModel.value));
    setIsLayouted(false);
  }, [productsInGraphModel]);

  // elements height may change after changing language
  useEffect(() => {
    setIsLanguageChanged(true);
  }, [intl]);

  // layout nodes
  useEffect(() => {
    if ((!isLayouted || isLanguageChanged) && areNodesLoaded(loadedNodes, elements)) {
      setElements(getLayoutedElements(loadedNodes, elements));
      setReactFlowWrapperHeight(getTotalGraphHeight(loadedNodes));
      setIsLayouted(true);
      setIsLanguageChanged(false);
    }
    // TODO: @ggrigorev won't work if add isLanguageChanged to deps
  }, [loadedNodes, elements, isLayouted]);

  useEffect(() => {
    if (isLayouted && !isCentered && reactFlowWrapper.current) {
      reactFlowInstance.setTransform({ x: reactFlowWrapper.current.offsetWidth / 2, y: 0, zoom: 1 });
      setIsCentered(true);
    }
  }, [isLayouted, reactFlowInstance, isCentered, reactFlowWrapper]);

  const handleLoad = useCallback((instance) => {
    setReactFlowInstance(instance);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    // eslint-disable-next-line no-param-reassign
    event.dataTransfer.dropEffect = 'move';
  }, []);

  if (!productsInGraphModel.isLoaded) {
    return <Loader />;
  }
  return (
    <Box className={classes.root}>
      <div className={classes.wrapper} style={{ height: reactFlowWrapperHeight }} ref={reactFlowWrapper}>
        <CustomReactFlowMemorised onDragOver={handleDragOver} onLoad={handleLoad} elements={elements} />
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
