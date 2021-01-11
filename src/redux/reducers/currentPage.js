import { UPDATE_CURRENT_PAGE, UPDATE_LOADING_STATUS } from "../constants";

const initState = {
  data: {},
  status: "LOADING",
};

const currentPage = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_LOADING_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
    case UPDATE_CURRENT_PAGE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default currentPage;
