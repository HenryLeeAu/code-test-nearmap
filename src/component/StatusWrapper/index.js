import LoadingScreen from "./LoadingScreen";
import FailedScreen from "./FailedScreen";

const StatusWrapper = ({ children, loadingStatus }) => {
  switch (loadingStatus) {
    case "SUCCESS":
      return children;
    case "LOADING":
      return <LoadingScreen />;
    case "FAILED":
      return <FailedScreen />;
    default:
      return null;
  }
};

export default StatusWrapper;
