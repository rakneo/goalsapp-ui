import HomePage from "./pages/HomePage";
import { Provider } from './stores/baseStore'
function App() {
  return (<Provider><HomePage /></Provider>);
}

export default App;
