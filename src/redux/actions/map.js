import axios from "axios";

import { UPDATE_MAP_DATA, UPDATE_LOADING_STATUS } from "../constants";

const updateLoadingStatus = (status) => {
  return {
    type: UPDATE_LOADING_STATUS,
    payload: {
      status,
    },
  };
};

const updateMapData = (data) => {
  return {
    type: UPDATE_MAP_DATA,
    payload: data,
  };
};

const fetchMapData = (url) => (dispatch) => {
  dispatch(updateLoadingStatus("LOADING"));
  axios
    .get(url)
    .then(({ data }) => {
      dispatch(updateMapData(data));
      dispatch(updateLoadingStatus("SUCCESS"));
    })
    .catch((error) => {
      dispatch(updateLoadingStatus("FAILED"));
    });
};

export const getMapData = () => (dispatch) => {
  dispatch(fetchMapData("/api/map-data.json"));
};
