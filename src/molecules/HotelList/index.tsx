import React, { useEffect, useState, useMemo } from 'react';
import HotelItem from 'molecules/HotelItem';
import { Container, Filter, Hotels } from './styles';

type Props = {
  features: Feature[];
  clickedFeature?: Feature;
  hoveringFeature?: Feature;
  onClick: (feature: Feature) => void;
  onMouseEnter: (feature: Feature) => void;
  onMouseLeave: (feature: Feature) => void;
};

const PER_COUNT = 10;
const MAX_MEDIUM_WIDTH = 1024;
const MIN_MEDIUM_WIDTH = 720;

const HotelList: React.FC<Props> = (props: Props) => {
  const {
    features,
    clickedFeature,
    hoveringFeature,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;
  const [page, setPage] = useState(0);
  const [imageWidth, setImageWidth] = useState(150);
  const featuresLength = useMemo(() => features.length, [features]);
  const handleClick = (feature: Feature) => onClick(feature);
  const handleMouseEnter = (feature: Feature) => onMouseEnter(feature);
  const handleMouseLeave = (feature: Feature) => onMouseLeave(feature);
  const handleRead = () => setPage(page + 1);
  useEffect(() => setPage(0), [features]);
  useEffect(() => {
    if (720 < window.innerWidth && window.innerWidth <= 1024) {
      setImageWidth(150 - 50 * (MAX_MEDIUM_WIDTH - window.innerWidth) / (MAX_MEDIUM_WIDTH - MIN_MEDIUM_WIDTH));
    }
  }, [window.innerWidth]);
  return (
    <Container>
      <Filter>
        {/* 名前 */}
        {/* <TextField placeholder='ホテル名を入力してください' /> */}
        {/* ソート（安い順、高い順、） */}
        {/* <Selector options={[
          { value: '', label: '価格の安い順' },
          { value: '', label: '価格の高い順' },
        ]} /> */}
        {/* 空きありのみ */}
        {/* <Button>
          {}
        </Button> */}
      </Filter>
      <Hotels>
        {features.slice(0, PER_COUNT * (page + 1)).map((feature, index) => {
          const { id } = feature.properties;
          const enableReadCollback = index === PER_COUNT * (page + 1) - 1 && index !== featuresLength - 1;
          return (
            <HotelItem
              feature={feature}
              imageWidth={imageWidth}
              isHovering={hoveringFeature && id === hoveringFeature.properties.id}
              onClick={handleClick}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onRead={enableReadCollback ? handleRead : undefined}
              key={`hotel-${id}`}
            />
          );
        })}
      </Hotels>
    </Container>
  );
};

export default HotelList;
