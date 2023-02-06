import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Container } from './styles';

type Props = {
  children?: React.ReactNode;
};

const HotelList: React.FC<Props> = (props: Props) => {
  const { children } = props;
  const ref = useRef(null);
  const handleRelease = (target: Node) => {
    if () {
      
    }
  };
  useEffect(() => {
    document.addEventListener('click', (event: MouseEvent) => 
      event.target && handleRelease(event.target as Node));
    return () => {
      document.removeEventListener('click', (event: MouseEvent) => 
        event.target && handleRelease(event.target as Node));
    };
  }, []);

  return (
    <Container
      ref={ref}
    >

    </Container>
  );
};

export default HotelList;
