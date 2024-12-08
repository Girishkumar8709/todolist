import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaBars, FaPizzaSlice } from 'react-icons/fa';
import { AddTask } from '../AddTask';

export const Header = ({ darkMode, setDarkMode, isAuthenticated, toggleSidebar }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="header">
      <nav>
        {/* Hamburger Button */}
        <div className='logo_first'>
          <div className="header__hamburger">
            <button
              aria-label="Toggle Sidebar"
              type="button"
              onClick={toggleSidebar} // Trigger sidebar toggle
              style={{ background: 'none', color: 'white', border: 'none' }}
            >
              <FaBars />
            </button>
          </div>

          {/* Logo */}
          <div className="logo">
            <img src="/images/logo.png" alt="Todoist" />
          </div>
        </div>

        {/* Dark Mode & Quick Add Task Buttons */}
        <div className="settings">
          <ul>
            <li className="settings__add">
              <button
                data-testid="quick-add-task-action"
                aria-label="Quick add task"
                type="button"
                onClick={() => {
                  setShowQuickAddTask(true); // This will show the quick add task form
                  setShouldShowMain(true);
                }}
              >
                +
              </button>
            </li>
            <li className="settings__darkmode">
              <button
                data-testid="dark-mode-action"
                aria-label="Darkmode on/off"
                type="button"
                onClick={() => setDarkMode(!darkMode)}
              >
                <FaPizzaSlice />
              </button>
            </li>
          </ul>
        </div>
      </nav>


      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />

    </header>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired, // Accept toggleSidebar prop
  setShowQuickAddTask: PropTypes.func.isRequired, // Accept setShowQuickAddTask function
};
