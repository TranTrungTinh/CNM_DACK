const profile = {
  id: '',
  name: '',
  state: '',
  lat: '',
  lng: ''
}

const currentUserReducer = (state = profile , action) => {
  if(action.type === "LOG_IN") {
    const {id , name , lat , lng , state} = action.payload;
    return {id , name , lat , lng , state};
  }

  if(action.type === "LOG_OUT") {
    return profile;
  }

  return state;
}

export default currentUserReducer;