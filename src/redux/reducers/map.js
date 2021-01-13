import { UPDATE_MAP_DATA, UPDATE_LOADING_STATUS } from "../constants";

const initState = {
  data: {},
  status: "LOADING",
};

const map = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_LOADING_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    case UPDATE_MAP_DATA:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default map;
