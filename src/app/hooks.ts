import { useRef, useState } from 'react';
import HotelsMap from 'modules/hotelsMap';

export const customHooks = () => {
  const mapModuleRef = useRef<HotelsMap>(null);
  const paramsRef = useRef<{
    features: Feature[];
    clickedFeature: Feature | undefined;
    hoveringFeature: Feature | undefined;
  }>({
    features: [],
    clickedFeature: undefined,
    hoveringFeature: undefined,
  });
  const [_date, setDate] = useState(new Date);
  const setMapModule = (hotelsMap: HotelsMap) =>
    mapModuleRef.current = hotelsMap;
  const handleClickFeature = (event: any) => {
    const feature = event.data.features[0] as Feature;
    paramsRef.current = {
      ...paramsRef.current,
      clickedFeature: feature,
    };
    setDate(new Date);
  };
  const handleHoverStartFeature = (event: any) => {
    paramsRef.current = {
      ...paramsRef.current,
      hoveringFeature: event.data.feature,
    };
    setDate(new Date);
  };
  const handleHoverEndFeature = (event: any) => {
    paramsRef.current = {
      ...paramsRef.current,
      hoveringFeature: undefined,
    };
    setDate(new Date);
  };
  const handleMoveEnd = (event: any) => {
    const features = mapModuleRef.current.getFeaturesOnBound();
    paramsRef.current = {
      ...paramsRef.current,
      features,
    };
    setDate(new Date);
  };
  return {
    ...paramsRef.current,
    hotelsMap: mapModuleRef.current,
    setMapModule,
    handleClickFeature,
    handleHoverStartFeature,
    handleHoverEndFeature,
    handleMoveEnd,
  };
};
