import React, { useState } from 'react';
import FeedbackForm from './features/FeedbackForm';
import SummaryScreen from './features/SummaryScreen';
import './App.css';
import logo from './assets/circlehd-logo.svg';

function App() {
  const [view, setView] = useState('form');
  const [submittedData, setSubmittedData] = useState(null);

  const handleFormSuccess = (data) => {
    setSubmittedData(data);
    setView('summary');
  };

  const handleReset = () => {
    setSubmittedData(null);
    setView('form');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg">
        {/* Dynamic View Section */}
        <div className="bg-white rounded-2xl mb-8 shadow-card p-6 sm:p-8 transition-all duration-300">
          {view === 'form' ? (
            <FeedbackForm onSuccess={handleFormSuccess} />
          ) : (
            <SummaryScreen data={submittedData} onReset={handleReset} />
          )}
        </div>
        {/* Branding */}
        <div className="text-center">
          <img src={logo} alt="CircleHD Logo" className="h-10 sm:h-12 mx-auto drop-shadow-sm" />
          <p className="mt-4 text-circlehd-gray font-medium">
            #1 AI-Powered Digital Learning Platform
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
