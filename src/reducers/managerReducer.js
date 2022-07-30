const manager = (state = [], action) => {
  switch (action.type) {
    case "GETALL": {
      return action.payload;
    }
    case "DELETE": {
      return state.filter((manager) => manager.id != action.payload);
    }
    default:
      return state;
  }
};

export default manager;
