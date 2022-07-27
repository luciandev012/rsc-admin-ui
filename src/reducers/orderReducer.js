const order = (state = [], action) => {
  switch (action.type) {
    case "GETALL": {
      return action.payload;
    }
    case "DELETE": {
      return state.filter((order) => order.orderId != action.payload);
    }
    default:
      return state;
  }
};

export default order;
