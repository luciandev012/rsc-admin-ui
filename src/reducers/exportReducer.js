const exportP = (state = [], action) => {
  switch (action.type) {
    case "GETALL": {
      return action.payload;
    }
    case "DELETE": {
      return state.filter((imp) => imp.exportId != action.payload);
    }
    default:
      return state;
  }
};

export default exportP;
