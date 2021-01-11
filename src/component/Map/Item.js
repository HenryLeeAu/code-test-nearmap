import { memo } from "react";
import styled from "styled-components";
import marker from "../../images/marker.png";
import markerSelected from "../../images/marker-selected.png";

const Pin = styled.div`
  background-repeat: no-repeat;
  background-image: url(${(props) =>
    props.isSelected ? markerSelected : marker});
  width: 23px;
  height: 37px;
  position: absolute;
  left: ${(props) => `${props.positionX}px`};
  top: ${(props) => `${props.positionY}px`};
  cursor: pointer;

  &:hover {
    background-image: url(${markerSelected});
  }
`;

const Item = ({ positionX, positionY, isSelected }) => (
  <>
    <Pin
      src={marker}
      positionX={positionX}
      positionY={positionY}
      isSelected={isSelected}
    />
  </>
);

export default memo(Item);
