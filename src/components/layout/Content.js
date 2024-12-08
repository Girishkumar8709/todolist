import React from 'react';
import { Tasks } from '../Tasks';
import { Sidebar } from './Sidebar';

export const Content = ({ sidebarVisible, toggleSidebar }) => (
  <section className="content">
    <Sidebar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} /> {/* Pass props to Sidebar */}
    <Tasks />
  </section>
);
