import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker
import 'react-datepicker/dist/react-datepicker.css'; // Import the CSS for DatePicker
import { FaRegPaperPlane, FaSpaceShuttle, FaSun } from 'react-icons/fa';

export const TaskDate = ({ setTaskDate, showTaskDate, setShowTaskDate }) => {
  const [selectedDate, setSelectedDate] = useState(null); // To hold the selected date

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setTaskDate(moment(date).format('DD/MM/YYYY')); // Set the selected date in the desired format
    setShowTaskDate(false); // Close the date picker
  };

  return (
    showTaskDate && (
      <div className="task-date" data-testid="task-date-overlay">
        <ul className="task-date__list">
          <li>
            <div
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().format('DD/MM/YYYY'));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowTaskDate(false);
                  setTaskDate(moment().format('DD/MM/YYYY'));
                }
              }}
              data-testid="task-date-today"
              tabIndex={0}
              aria-label="Select today as the task date"
              role="button"
            >
              <span>
                <FaSpaceShuttle />
              </span>
              <span>Today</span>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(1, 'day').format('DD/MM/YYYY'));
                }
              }}
              data-testid="task-date-tomorrow"
              role="button"
              tabIndex={0}
              aria-label="Select tomorrow as the task date"
            >
              <span>
                <FaSun />
              </span>
              <span>Tomorrow</span>
            </div>
          </li>
          <li>
            <div
              onClick={() => {
                setShowTaskDate(false);
                setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setShowTaskDate(false);
                  setTaskDate(moment().add(7, 'days').format('DD/MM/YYYY'));
                }
              }}
              data-testid="task-date-next-week"
              aria-label="Select next week as the task date"
              tabIndex={0}
              role="button"
            >
              <span>
                <FaRegPaperPlane />
              </span>
              <span>Next week</span>
            </div>
          </li>
        </ul>

        {/* Calendar Date Picker */}
        <div className="calendar-container">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange} // Set the selected date
            inline // Make the calendar visible directly
          />
        </div>
      </div>
    )
  );
};

TaskDate.propTypes = {
  setTaskDate: PropTypes.func.isRequired,
  showTaskDate: PropTypes.bool.isRequired,
  setShowTaskDate: PropTypes.func.isRequired,
};
