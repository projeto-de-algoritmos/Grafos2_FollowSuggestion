import Home from "./view/Home";
import Connection from "./view/Connection";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />}>
          <Route path=":login" exact element={<Home />} />
          <Route path=":login/:type" exact element={<Home />} />
        </Route>
        <Route path="/Connection" exact element={<Connection />}>
          <Route path=":login/:type" exact element={<Connection />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
