const dish = (state = [], action) => {
  switch (action.type) {
    case "GETALLDISH": {
      return action.payload;
    }
    case "DELETEDISH": {
      return state.filter((s) => s.dishId != action.payload);
    }
    default:
      return state;
  }
};

export default dish;
