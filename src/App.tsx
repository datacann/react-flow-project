import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TeamProvider } from "./context/TeamContext";
import TeamForm from "./components/Team/TeamForm.tsx";
import UserForm from "./components/UserForm";
import DiagramPage from "./pages/DiagramPage.tsx";
import ChartsPage from "./pages/ChartsPage.tsx";
import Navbar from "./components/Navbar/Navbar.tsx";

function App() {

    return (
        <TeamProvider>
            <Router>
                <Navbar />
                <div className="container-fluid p-6 max-w-xl mx-auto">
                    <Routes>
                        <Route path="/" element={
                            <>
                                <div className="w-auto d-lg-flex row-cols-lg-2">
                                    <TeamForm />
                                    <UserForm />
                                </div>
                                <DiagramPage />
                            </>
                        } />
                        <Route path="/diagram" element={<DiagramPage />} />
                        <Route path="/charts" element={<ChartsPage />} />
                    </Routes>
                </div>
            </Router>
        </TeamProvider>
  );
}

export default App;