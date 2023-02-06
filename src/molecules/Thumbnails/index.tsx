import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Swiper as SwiperClass } from 'swiper';
import {
  GlobalStyle,
  Container,
  SwiperWrapper,
  Image,
} from './styles';

type Props = {
  feature: Feature;
  images: string[];
};

const Thumbnails: React.FC<Props> = (props: Props) => {
  const { feature, images } = props;
  const { id } = feature.properties;
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(150);
  const [swiper, setSwiper] = useState<SwiperClass>();
  const handleClick = (event: React.MouseEvent) => {
    if (event.nativeEvent.offsetX >= width / 2) { // Slide right
      swiper?.slideNext();
    } else if (event.nativeEvent.offsetX < width / 2) { // Slide left
      swiper?.slidePrev();
    }
  };
  useEffect(() => {
    ref.current && setWidth(ref.current.clientWidth);
  }, [ref]);
  return (
    <Container className='hotelsmap__thumbnails' ref={ref}>
      <GlobalStyle />
      <SwiperWrapper onClick={handleClick}>
        <Swiper
          direction='horizontal'
          allowTouchMove={false}
          slidesPerView={1}
          speed={300}
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          onSwiper={(swiper: SwiperClass) => setSwiper(swiper)}
        >
          {images.map((image, index) => (
            <SwiperSlide>
              <Image
                src={`${process.env.S3_DOMAIN}/${image}`}
                key={`features-${id}__images-${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
    </Container>
  );
};

export default Thumbnails;
