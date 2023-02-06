import styled from 'styled-components';

type Container = {
  isHovering?: boolean;
};
type ThumbnailsWrapper = {
  width?: string;
};
type Tip = {
  isLast?: boolean;
};
type PriceItem = {
  color: string;
};

export const Wrapper = styled.li`
  position: relative;
  padding: 7px 0;
  width: 100%;
  height: 178px;
  cursor: pointer;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: solid 1px #ebebed;
  }
`;
export const Container = styled.div`
  display: flex;
  padding: 7px;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  transition: background-color 0.1s;
  -webkit-transition: background-color 0.1s;
  background-color: ${({ isHovering }: Container) => isHovering ? '#ebebeb' : 'transparent'};
  &:hover {
    background-color: #ebebeb;
  }
`;
export const ThumbnailsWrapper = styled.div`
  margin-right: 15px;
  min-width: ${({ width }: ThumbnailsWrapper) => width || '150px;'};
  max-width: ${({ width }: ThumbnailsWrapper) => width || '150px;'};
  border-radius: 5px;
  overflow: hidden;
`;
export const Content = styled.div`
  width: 100%;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;
export const TagsWrapper = styled.div``;
export const Tag = styled.span`
  display: block;
  padding: 0 8px;
  height: 26px;
  min-height: 26px;
  line-height: 26px;
  font-size: 13px;
  font-weight: 600;
  color: #ff5353;
  background-color: #ffcdcd;
  border-radius: 4px;
`;
export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
export const Action = styled.div`
  &:first-child {
    margin-right: 10px;
  }
  &:last-child {
    margin-right: 0 !important;
  }
  & + & {
    margin-right: 6px;
  }
`;
export const VacancyLabel = styled.span`
  display: block;
  padding: 0 11px;
  height: 34px;
  line-height: calc(34px - 2px);
  font-size: 13px;
  font-weight: 600;
  color: #ff5353;
  border: solid 2px #c8c8c8;
  border-radius: 22px;
`;
export const FavoriteLabel = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 7px;
  width: 34px;
  min-width: 34px;
  height: 34px;
  min-height: 34px;
  border: solid 2px #c8c8c8;
  border-radius: 22px;
`;
export const Name = styled.h4`
  margin: 5px 0 4px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  font-size: 18px;
  font-weight: 600;
`;
export const Tips = styled.div`
  display: flex;
  margin-top: 4px;
`;
export const Tip = styled.span`
  position: relative;
  font-size: 14px;
  font-weight: 500;
  color: #949494;
  & + & {
    margin-left: 18px;
  }
  ${({ isLast }: Tip) => !isLast ? `
    &:before {
      content: "";
      position: absolute;
      display: block;
      margin: auto;
      top: 0;
      bottom: 0;
      right: -11px;
      width: 3px;
      height: 3px;
      background-color: #949494;
      border-radius: 50%;
    }
  ` : ''}
`;
export const Prices = styled.div`
  display: flex;
  margin-top: 2px;
`;
export const PriceItem = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: ${({ color }: PriceItem) => color};
  & + & {
    margin-left: 15px;
  }
`;
export const PriceItemLabel = styled.span`
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
`;
export const PriceItemValue = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
