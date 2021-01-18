import { useState } from "react";
import Item from "./Item";
import mapImg from "../../images/background-map.jpg";
import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const Map = ({ list = [], children }) => {
  const [selectedData, setSelectedData] = useState(null);

  const onClick = (obj) => {
    setSelectedData(obj);
  };

  const onClose = () => {
    setSelectedData(null);
  };

  return (
    <Wrapper>
      <img src={mapImg} alt="map" onClick={onClose} data-testid="map" />
      {list.map((item) => (
        <div
          key={`x${item.position[0]}Y${item.position[1]}`}
          onClick={() => onClick(item)}
          data-testid="pin"
        >
          <Item
            positionX={item.position[0]}
            positionY={item.position[1]}
            isSelected={
              selectedData?.position[0] === item.position[0] &&
              selectedData?.position[1] === item.position[1]
            }
          />
        </div>
      ))}
      {children(selectedData)}
    </Wrapper>
  );
};

export default Map;
