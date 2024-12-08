import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Content } from './components/layout/Content';
import { Header } from './components/layout/Header';
import LoginPage from './components/layout/Login';
import { TaskDate } from './components/TaskDate';
import { ProjectsProvider, SelectedProjectProvider } from './context';

const App = ({ darkModeDefault = false }) => {
  const [darkMode, setDarkMode] = useState(darkModeDefault);
  const [showTaskDate, setShowTaskDate] = useState(false);
  const [taskDate, setTaskDate] = useState('');

  // State to manage sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Loading screen while checking authentication state
  }

  return (
    <main data-testid="application" className={darkMode ? 'darkmode' : ''}>
      {/* Pass toggleSidebar function to Header */}
      <Header 
        darkMode={darkMode} 
        setDarkMode={setDarkMode} 
        isAuthenticated={isAuthenticated} 
        toggleSidebar={toggleSidebar} 
      />

      {/* Task Date Popup */}
      <TaskDate
        showTaskDate={showTaskDate}
        setShowTaskDate={setShowTaskDate}
        setTaskDate={setTaskDate}
      />

      {/* Conditionally render components based on authentication status */}
      {isAuthenticated ? (
        <>
          <button
            className="logout-button"
            onClick={() => logout({ returnTo: window.location.origin })}
          >
            Logout
          </button>
          <Content 
            sidebarVisible={isSidebarVisible} // Pass sidebar visibility state
            toggleSidebar={toggleSidebar} // Pass toggle function
          />
        </>
      ) : (
        <LoginPage loginWithRedirect={loginWithRedirect} />
      )}

      {/* ToastContainer for global notifications */}
      <ToastContainer />
    </main>
  );
};

App.propTypes = {
  darkModeDefault: PropTypes.bool,
};

const AppWithAuth = ({ darkModeDefault }) => (
  <Auth0Provider
    domain="dev-8p58jojmk251lhjf.us.auth0.com"
    clientId="uyUb8OTSHRSeaegs93zcoLdvPRA95nZ7"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <SelectedProjectProvider>
      <ProjectsProvider>
        <App darkModeDefault={darkModeDefault} />
      </ProjectsProvider>
    </SelectedProjectProvider>
  </Auth0Provider>
);

export default AppWithAuth;
