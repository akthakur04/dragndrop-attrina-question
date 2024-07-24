import logo from "./logo.svg";
import "./App.css";
import DraggablePage from "./Components/DraggablePage";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
      <Routes />
      </BrowserRouter>)
}

export default App;
