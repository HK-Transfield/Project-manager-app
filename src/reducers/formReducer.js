const initialState = {
  allProjects: [],
  filteredProjects: [],
  
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_PROJECT":
      console.log(action.payload)
      return Object.assign({}, state, {
        allProjects: [...state.allProjects, action.payload],
        filteredProjects: [...state.allProjects, action.payload]
      });
    
    case "DELETE_PROJECT":
      return Object.assign({}, state, {
        allProjects: state.allProjects.filter((allProjects) => allProjects.projectIdentifier !== action.payload),
        filteredProjects: state.allProjects.filter((allProjects) => allProjects.projectIdentifier !== action.payload),
      });

    case 'FILTER_BY_VALUE':
      let value = action.payload.toLowerCase();
      console.log(state.allProjects);
      if (value) {
        return {
          ...state,
          filteredProjects: state.allProjects.filter((allProjects) => 
              allProjects.projectName.toLowerCase().includes(value) ||
              allProjects.projectIdentifier.toLowerCase().includes(value) ||
              allProjects.description.toLowerCase().includes(value) ||
              allProjects.start_date.toLowerCase().includes(value) ||
              allProjects.end_date.toLowerCase().includes(value)              
          )
        };
      } else {
        return Object.assign({}, state, {
          filteredProjects: state.allProjects
        });
      }
    case 'SORT_PROJECTS':
      let {order, field} = action.payload;

      if (order === 'asc')
        return {
          ...state,
          filteredProjects: state.allProjects.sort(
            (a,b) => {
              if(a[field] > b[field])
                return 1;
              
              if(b[field] > a[field])
                return -1;
              
              return 0;
            }
          )
        }
      else if (order === 'desc')
        return {
          ...state,
          filteredProjects: state.allProjects.sort(
            (a,b) => {
              if(a[field] > b[field])
                return -1;
              
              if(b[field] > a[field])
                return 1;
          
              return 0;
            }
          )
        }
      return state;
    default:
      return state;
  }
}
export default reducer;