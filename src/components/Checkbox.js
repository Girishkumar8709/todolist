import { doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify'; // Import toast from react-toastify
import { firestore } from '../firebase';

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = async () => {
    const taskDocRef = doc(firestore, 'tasks', id);
    try {
      await updateDoc(taskDocRef, { archived: true });

      // Show toast notification when task is completed
      toast.success(`Task "${taskDesc}" has been marked as completed.`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      console.error('Error archiving task:', error);
      toast.error('Failed to archive task. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      className="checkbox-holder"
      data-testid="checkbox-action"
      onClick={() => archiveTask()}
      onKeyDown={(e) => {
        if (e.key === 'Enter') archiveTask();
      }}
      aria-label={`Mark ${taskDesc} as done?`}
      role="button"
      tabIndex={0}
    >
      <span className="checkbox" />
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
  taskDesc: PropTypes.string.isRequired,
};
