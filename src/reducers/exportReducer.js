const exportP = (state = [], action) => {
  switch (action.type) {
    case "GETALLEXP": {
      return action.payload;
    }
    case "DELETEEXP": {
      return state.filter((imp) => imp.exportId != action.payload);
    }
    default:
      return state;
  }
};

export default exportP;
