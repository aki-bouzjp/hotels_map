import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;
export const SideMenu = styled.div`
  width: 520px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: 0 0 8px 0 rgb(0 0 0 / 12%), 0 8px 8px 0 rgb(0 0 0 / 24%);
  z-index: 1;
`;
export const Map = styled.div`
  width: calc(100% - 520px);
  height: 100%;
`;
