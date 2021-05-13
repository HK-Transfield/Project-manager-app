// https://medium.com/swlh/few-ways-to-update-a-state-array-in-redux-reducer-f2621ae8061

const initialState = {
  myProjects: []
};

const eventExists = (events, event) => {
  return events.find((e) => e.event_id === event.event_id);
}

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case "ADD_PROJECT":
      console.log("--- Triggered Form submission ---");
      console.log(state.myProjects);
      return {
        ...state,
        myProjects: [...state.myProjects, action.payload]
      }
    
    case "DELETE_PROJECT":
      const id = action.payload;
      console.log('---DELETING PROJECT---')
      console.log(id)
      console.log(state.myProjects)

      return {
        ...state,
        myProjects: state.myProjects.filter((myProjects) => myProjects.projectIdentifier !== id)
      }
    default:
      return state;
  }
}

export default reducer;