/* eslint-disable no-nested-ternary */
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { collatedTasksExist } from '../helpers';

export const useTasks = (selectedProject) => {
  const [tasks, setTasks] = useState([]);
  const [archivedTasks, setArchivedTasks] = useState([]);

  useEffect(() => {
    const tasksCollectionRef = collection(firestore, 'tasks');
    let tasksQuery = query(tasksCollectionRef, where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw'));

    if (selectedProject && !collatedTasksExist(selectedProject)) {
      tasksQuery = query(tasksQuery, where('projectId', '==', selectedProject));
    } else if (selectedProject === 'TODAY') {
      tasksQuery = query(tasksQuery, where('date', '==', moment().format('DD/MM/YYYY')));
    } else if (selectedProject === 'INBOX' || selectedProject === 0) {
      tasksQuery = query(tasksQuery, where('date', '==', ''));
    }

    const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        ...task.data(),
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                !task.archived
            )
          : newTasks.filter((task) => !task.archived)
      );

      setArchivedTasks(newTasks.filter((task) => task.archived));
    });

    return () => unsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const projectsCollectionRef = collection(firestore, 'projects');
    const projectsQuery = query(
      projectsCollectionRef,
      where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw'),
      orderBy('projectId')
    );

    getDocs(projectsQuery).then((snapshot) => {
      const allProjects = snapshot.docs.map((project) => ({
        ...project.data(),
        docId: project.id,
      }));
      setProjects(allProjects);
    });
  }, []);

  return { projects, setProjects };
};
