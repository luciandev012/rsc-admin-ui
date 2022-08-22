const dish = (state = [], action) => {
  switch (action.type) {
    case "GETALLDISH": {
      return action.payload;
    }
    default:
      return state;
  }
};

export default dish;
