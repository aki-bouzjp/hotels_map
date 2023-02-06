import styled, { createGlobalStyle } from 'styled-components';

type Container = {
  width?: string;
  imageNo?: number;
  enableDuration?: boolean;
};
type Images = {
  imageNo?: number;
  imageLength?: number;
  isMovingRight?: boolean;
};

export const GlobalStyle = createGlobalStyle`
  .hotelsmap__thumbnails {
    .swiper-pagination {
      position: absolute;
      display: flex;
      justify-content: center;
      bottom: 10px;
      width: 100%;
      text-align: center;
      z-index: 2;
    }
    .swiper-pagination-bullet {
      display: inline-block;
      margin: 0 2px;
      width: 7px;
      height: 7px;
      background-color: #ffffff80;
      border-radius: 50%;
    }
    .swiper-pagination-bullet-active {
      background-color: #ffffff;
    }
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
export const SwiperWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
