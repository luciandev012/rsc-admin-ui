const subcate = (state = [], action) => {
  switch (action.type) {
    case "GETALLSUBCATE":
      return action.payload;
    default:
      return state;
  }
};

export default subcate;
