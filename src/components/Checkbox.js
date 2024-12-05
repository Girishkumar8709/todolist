import { doc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React from 'react';
import { firestore } from '../firebase';

export const Checkbox = ({ id, taskDesc }) => {
  const archiveTask = async () => {
    const taskDocRef = doc(firestore, 'tasks', id);
    await updateDoc(taskDocRef, { archived: true });
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
