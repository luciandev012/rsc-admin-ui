const order = (state = [], action) => {
  switch (action.type) {
    case "GETALLORDER": {
      return action.payload;
    }
    case "DELETEORDER": {
      return state.filter((order) => order.orderId != action.payload);
    }
    default:
      return state;
  }
};

export default order;
