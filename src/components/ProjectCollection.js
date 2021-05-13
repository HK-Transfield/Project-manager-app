import React from 'react';
import ProjectCard from './ProjectCard';
import '../css/ProjectCollection.css';

/**
 * 
 * @param {array} projects 
 * @returns JSX of all projects, displayed as project cards
 */
const ProjectCollection = ({projects}) => {
    return(
        <div className='project_cards-container'>
          {projects.map(item => {
            return <ProjectCard {...item} key={item.projectIdentifier}/>
          })}
        </div>
    );
}

export default ProjectCollection;