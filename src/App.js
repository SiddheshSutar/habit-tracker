import "./styles.css";
import { Provider } from 'react-redux'
import { store } from "./store";
import Content from "./Content/Content";
import Notifications from "./components/Notifications/Notifications";

export default function App() {

  return (
    <div className="App">
      <h1>
        Track your habits
      </h1>
      <Provider store={store}>
        <Content />
        <Notifications />
      </Provider>
    </div>
  );
}
