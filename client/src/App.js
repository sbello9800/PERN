import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import Menu from "./components/Navbar";
import { Container } from "@mui/material";
export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Container>
        <Routes>
          <Route path="" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          {/* Edit route */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
