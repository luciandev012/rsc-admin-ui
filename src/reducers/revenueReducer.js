const revenue = (state = [], action) => {
  switch (action.type) {
    case "GETALLREVENUE": {
      return action.payload;
    }
    case "GETBYDATE": {
      return action.payload;
    }
    default:
      return state;
  }
};
export default revenue;
