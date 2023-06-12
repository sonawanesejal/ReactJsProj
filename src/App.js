
import "./App.css";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login";
import Edit from "./pages/Edit";
import Add from "./pages/Add";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add" element={<Add/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;