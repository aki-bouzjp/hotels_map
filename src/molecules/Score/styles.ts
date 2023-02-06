import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;
export const Stars = styled.div`
  display: flex;
`;
export const StarWrapper = styled.span`
  margin-left: 1px;
  &:first-child {
    margin-left: 0;
  }
`;
export const Value = styled.span`
  margin-left: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #949494;
`;
