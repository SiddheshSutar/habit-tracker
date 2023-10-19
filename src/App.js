import "./styles.css";
import { Provider } from 'react-redux'
import { store } from "./store";
import Notifications from "./Notifications/Notifications";

export default function App() {

  return (
    <div className="App">
      <h1>
        Track your habits
      </h1>
      <Provider store={store}>
        <div className='content'>

        </div>
        <Notifications />
      </Provider>
    </div>
  );
}
