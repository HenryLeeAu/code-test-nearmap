import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMapData } from "./redux/actions/map";

import Map from "./component/Map";
import Modal from "./component/Modal";
import StatusWrapper from "./component/StatusWrapper";
import PopupContent from "./component/PopupContent";

import styled from "styled-components";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
`;

const App = () => {
  const dispatch = useDispatch();

  const loadingStatus = useSelector((state) => state.map.status);
  const list = useSelector((state) => state.map.data);

  useEffect(() => {
    dispatch(getMapData());
  }, [dispatch]);

  return (
    <Wrapper>
      <StatusWrapper loadingStatus={loadingStatus}>
        <Map list={list}>
          {(selectedData) => (
            <Modal isOpen={!!selectedData}>
              <PopupContent
                name={selectedData?.name}
                type={selectedData?.type}
                population={selectedData?.population}
                wealth={selectedData?.wealth}
                authority={selectedData?.authority}
                numGuards={selectedData?.numGuards}
              />
            </Modal>
          )}
        </Map>
      </StatusWrapper>
    </Wrapper>
  );
};

export default App;
