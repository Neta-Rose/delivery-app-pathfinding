import { BrowserRouter, Routes, Route } from "react-router-dom";
import { pages } from "./router";
import { Navbar } from "./components/Navbar";

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
        {pages.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
        ))}
        </Routes>
      </BrowserRouter>
    </div>
    
  );
};

export default App;