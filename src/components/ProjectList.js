import React from 'react';
import ProjectCard from './ProjectCard';
import '../css/ProjectList.css';

/**
 * Maps through an array of projects added by either the user or fetched
 * from the server and displays a project card for each individual 
 * project.
 * 
 * @param {array} projects Contains all current products that are stored 
 * @returns JSX of all projects, displayed as project cards
 */
const ProjectList = ({projects}) => {
    return(
        <div className='project_cards-container'>
          {projects.map(item => {
            return <ProjectCard {...item} key={item.projectIdentifier}/>
          })}
        </div>
    );
}
export default ProjectList;
