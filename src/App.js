import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Delete from "./pages/delete/Delete";

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/delete/:id" element={<Delete />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
