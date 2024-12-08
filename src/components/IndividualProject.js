import { deleteDoc, doc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ProjectsContext } from '../context/projects-context';
import { firestore } from '../firebase';

const IndividualProject = ({ project }) => {
  const { projects, setProjects } = useContext(ProjectsContext); // Accessing context directly

  const deleteProject = async (docId) => {
    const projectDocRef = doc(firestore, 'projects', docId);
    try {
      // Delete project from Firestore
      await deleteDoc(projectDocRef);

      // Remove project from local state
      const updatedProjects = projects.filter((project) => project.docId !== docId);
      setProjects(updatedProjects);

      // Show success notification
      toast.success(`Project "${project.name}" has been deleted.`, {
        position: 'top-right',
        autoClose: 5000,
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project. Please try again.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="sidebar__project">
      <span className="sidebar__dot">•</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="sidebar__project-delete"
        onClick={() => deleteProject(project.docId)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') deleteProject(project.docId);
        }}
        tabIndex={0}
        role="button"
        aria-label="Delete project"
      >
        <FaTrashAlt />
      </span>
    </div>
  );
};

IndividualProject.propTypes = {
  project: PropTypes.shape({
    docId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default IndividualProject;
