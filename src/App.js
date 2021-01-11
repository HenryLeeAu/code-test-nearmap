import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getInitialPage } from "./redux/actions/currentPage";

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

  const loadingStatus = useSelector((state) => state.currentPage.status);
  const list = useSelector((state) => state.currentPage.data);

  const [selectedData, setSelectedData] = useState(null);

  const handleOnPinClick = (obj) => {
    setSelectedData(obj);
  };

  const handleOnModalClose = () => {
    setSelectedData(null);
  };

  useEffect(() => {
    dispatch(getInitialPage());
  }, [dispatch]);

  return (
    <Wrapper>
      <StatusWrapper loadingStatus={loadingStatus}>
        <>
          <Map
            list={list}
            selectedData={selectedData}
            onClick={handleOnPinClick}
            onClose={handleOnModalClose}
          />
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
        </>
      </StatusWrapper>
    </Wrapper>
  );
};

export default App;
