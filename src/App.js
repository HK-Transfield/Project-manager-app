import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateProjectForm from './components/CreateProjectForm';
import ProjectCard from './components/ProjectCard';

const test = [{
  "projectName": "Visitor Indicator System",
  "projectIdentifier": "4",
  "description": "This doorbell cum visitor indicator circuit can give identification of the visitor to your home in your absence.",
  "start_date": "2019-07-09 07:00",
  "end_date": "2020-01-31 10:00"
 },
 
 {
  "projectName": "E-Commerce Website for Visually Impaired",
  "projectIdentifier": "5",
  "description": "An ecommerce website is developed to assist blind people that automatically recognizes clothing patterns and colours.",
  "start_date": "2021-01-01 12:00",
  "end_date": "2021-05-05 12:00"
 }];

function App() {
  return (
    <div>
      {/* <CreateProjectForm/> */}
    <p>hi</p>
      {test.map(item => {
        return <ProjectCard {...item} key={item.projectIdentifier}/>
      })}
    </div>
   
  );
}

export default App;
