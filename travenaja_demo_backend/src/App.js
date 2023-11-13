import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GuideList from './components/GuideList';
import ApprovedGuide from './components/ApprovedGuide';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<GuideList />} />
          <Route path="/ApprovedGuide" element={<ApprovedGuide />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
