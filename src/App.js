import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <div className="no-scrollbar">
        <Body />
      </div>
    </Provider>
  );
}

export default App;
