import React, { useMemo } from 'react';
import { Waypoint } from 'react-waypoint';
import PhoneSVG from 'atoms/Svgs/Phone';
import HartSVG from 'atoms/Svgs/Hart';
import Thumbnails from 'molecules/Thumbnails';
import Score from 'molecules/Score';
import {
  Wrapper,
  Container,
  ThumbnailsWrapper,
  Header,
  TagsWrapper,
  Tag,
  ActionsWrapper,
  Action,
  Content,
  VacancyLabel,
  FavoriteLabel,
  Name,
  Tips,
  Tip,
  Prices,
  PriceItem,
  PriceItemLabel,
  PriceItemValue,
} from './styles';

type Props = {
  feature: Feature;
  imageWidth: number;
  isHovering?: boolean;
  onClick: (feature: Feature) => void;
  onMouseEnter: (feature: Feature) => void;
  onMouseLeave: (feature: Feature) => void;
  onRead?: () => void;
};

const HotelItem: React.FC<Props> = (props: Props) => {
  const {
    feature,
    imageWidth,
    isHovering,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onRead,
  } = props;
  const {
    id,
    thumbnails,
    name,
    room_count,
    parking_count,
    parking_high_roof_count,
    score,
    single_price,
    rest_min_price,
    lodging_min_price,
  } = feature.properties;
  const images = useMemo(() => {
    try {
      return JSON.parse(thumbnails);
    } catch (error: any) {
      return [];
    }
  }, []);
  const tips = useMemo(() => {
    let tips: string[] = [];
    room_count              && tips.push(`部屋数 ${room_count}室`);
    parking_count           && tips.push(`駐車場数 ${parking_count}台`);
    parking_high_roof_count && tips.push(`ハイルーフ可 ${parking_high_roof_count}台`);
    return tips;
  }, []);
  const handleClick = () => onClick(feature);
  const handleMouseEnter = () => onMouseEnter(feature);
  const handleMouseLeave = () => onMouseLeave(feature);
  const handleRead = () => 
    onRead && onRead();

  return (
    <Wrapper
      id={`feature-${id}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Container isHovering={isHovering}>
        <ThumbnailsWrapper width={`${imageWidth}px`}>
          <Thumbnails
            feature={feature}
            images={images}
          />
        </ThumbnailsWrapper>
        <Content>
          <Header>
            <ActionsWrapper>
              <Action>
                <PhoneSVG />
              </Action>
              <Action>
                <VacancyLabel>
                  空有り
                </VacancyLabel>
              </Action>
              <Action>
                <FavoriteLabel>
                  <HartSVG
                    width='15'
                    height='15'
                  />
                </FavoriteLabel>
              </Action>
            </ActionsWrapper>
          </Header>          
          {/* 名前 */}
          <Name>{name}</Name>
          {/* 評価 */}
          <Score value={Number(score)} />
          {/* 料金（休憩、宿泊） */}
          <Prices>
            {single_price ? (
              <PriceItem color='#62a55f'>
                <PriceItemLabel>料金 /</PriceItemLabel>
                <PriceItemValue>{`¥${single_price}~`}</PriceItemValue>
              </PriceItem>
            ) : null}
            {lodging_min_price ? (
              <PriceItem color='#523e91'>
                <PriceItemLabel>宿泊 /</PriceItemLabel>
                <PriceItemValue>{`¥${lodging_min_price}~`}</PriceItemValue>    
              </PriceItem>
            ) : null}
          </Prices>
          {/* 詳細 */}
          {/* 住所、アクセス（徒歩、車） */}
          {/* 料金体系 */}
        </Content>
      </Container>
      <Waypoint onEnter={handleRead} />
    </Wrapper>
  );
};

export default HotelItem;
