import React from 'react';
import StarSVG from 'atoms/Svgs/Star';
import { Container, Stars, StarWrapper, Value } from './styles';

type Props = {
  value: number;
};

const Score: React.FC<Props> = (props: Props) => {
  const { value } = props;
  const flooredValue = Math.floor(value);
  return (
    <Container>
      <Stars>
        {[...Array(flooredValue)].map((_, index) => (
          <StarWrapper key={`score-star-${index}`}>
            <StarSVG
              width='17px'
              height='17px'
            />
          </StarWrapper>
        ))}
        {value < 5 ? [...Array(5 - flooredValue)].map((_, index) => (
          <StarWrapper key={`score-empty-star-${index}`}>
            <StarSVG
              color='#b2b2b2'
              width='17px'
              height='17px'
            />
          </StarWrapper>
        )) : null}
      </Stars>
      <Value>
        {value.toFixed(1)}
      </Value>
    </Container>
  );
};

export default Score;
