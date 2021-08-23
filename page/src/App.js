import "./App.css";
import Home from "./Component/Home";
import Display from "./Component/Display";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Component/Header";
import Loader from "./Component/Loader";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        {/* <Loader /> */}
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/display" component={Display}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
