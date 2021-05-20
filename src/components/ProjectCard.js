import React from 'react';
import Card from 'react-bootstrap/Card';
import DeleteButton from './DeleteButton';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import '../css/ProjectCard.css';

/**
 * Displays a react-bootstrap popover component to 
 * display the project description when the user
 * hovers over the project ID
 * 
 * @param {string} description Information that describes what the project is about.
 */
const popover = description => (
    <Popover id="popover-basic">
      <Popover.Content>{description}</Popover.Content>
    </Popover>
);

/**
 * Using react-bootrap, this funcitonal component displays information
 * about a project
 * 
 * @param {string} props.projectName 
 * @param {string} props.projectIdentifier 
 * @param {string} props.description 
 * @param {date} props.start_date
 * @param {date} props.end_date 
 * 
 * @returns The DOM of a project card
 * 
 * @author Harmon Transfield 
 */
const ProjectCard = ({projectName, projectIdentifier, description, start_date, end_date}) => {
     
    return(
        <Card className='project-entry'>
            <Card.Body>
                <div className='card-details'>
                    <DeleteButton projectIdentifier={projectIdentifier}/>
                    <OverlayTrigger placement='right' overlay={popover(description)}>
                        <Card.Title>Project {projectIdentifier}</Card.Title>
                    </OverlayTrigger>
                    <Card.Subtitle className='mb-2 text-muted card-name'>{projectName}</Card.Subtitle>
                </div>
                <Card.Text className='text-dates end-date'>{end_date}</Card.Text>
                <Card.Text className='text-dates start-date'>{start_date}</Card.Text>
            </Card.Body>
      </Card>
    );
}
export default ProjectCard;
