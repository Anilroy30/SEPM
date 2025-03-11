import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter> {/* ✅ Wrap the entire app inside BrowserRouter */}
        <Body />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
