const bill = (state = [], action) => {
  switch (action.type) {
    case "GETBILLBYORDER":
      return action.payload;
    default:
      return state;
  }
};

export default bill;
