import React from 'react';
import ProjectCard from './ProjectCard';
import '../css/ProjectCollection.css';

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