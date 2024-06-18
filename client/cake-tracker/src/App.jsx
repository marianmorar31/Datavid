import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AddMember from './pages/AddMember';
import EditMember from './pages/EditMember';
import BirthdayCalendar from './components/BirthdayCalendar';
import Report from './components/Report';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-member" element={<AddMember />} />
            <Route path="/edit-member/:id" element={<EditMember />} />
            <Route path="/calendar" element={<BirthdayCalendar />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
