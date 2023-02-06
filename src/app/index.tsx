import mapboxgl from 'mapbox-gl';
import React, { useRef, useEffect } from 'react';
import { INITIAL_MAP_STATE, STYLES } from 'utils/params';
import HotelsMap from 'modules/hotelsMap';
import HotelList from 'molecules/HotelList';
import { Container, SideMenu, Map } from './styles';
import { customHooks } from './hooks';

mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN;

const App: React.FC = () => {
  const ref = useRef(null);
  const mapModuleRef = useRef<HotelsMap>(null);
  const {
    features,
    clickedFeature,
    hoveringFeature,
    setMapModule,
    handleClickFeature,
    handleHoverStartFeature,
    handleHoverEndFeature,
    handleMoveEnd,
  } = customHooks();
  const handleClick = (feature: Feature) => {};
  const handleMouseEnter = (feature: Feature) => 
    mapModuleRef.current.highlightHotel(feature);
  const handleMouseLeave = (feature: Feature) =>
    mapModuleRef.current.highlightHotel();
  useEffect(() => {
    const { lng, lat, zoom } = INITIAL_MAP_STATE;
    const map = new mapboxgl.Map({
      container: ref.current as any,
      style: STYLES.STREET,
      center: [lng, lat],
      zoom,
    });
    const hotelsMap = new HotelsMap(map);
    hotelsMap.on('click', handleClickFeature);
    hotelsMap.on('hoverstart', handleHoverStartFeature);
    hotelsMap.on('hoverend', handleHoverEndFeature);
    hotelsMap.on('moveend', (event: any) => handleMoveEnd(event));
    setMapModule(hotelsMap);
    return () => map.remove();
  }, []);

  return (
    <Container>
      <SideMenu>
        <HotelList
          features={features}
          clickedFeature={clickedFeature}
          hoveringFeature={hoveringFeature}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </SideMenu>
      <Map ref={ref} />
    </Container>
  );
};

export default App;
