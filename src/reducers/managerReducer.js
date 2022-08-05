const manager = (state = [], action) => {
  switch (action.type) {
    case "GETALLMAN": {
      return action.payload;
    }
    case "DELETEMAN": {
      return state.filter((manager) => manager.id != action.payload);
    }
    default:
      return state;
  }
};

export default manager;
