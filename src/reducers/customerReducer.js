const customer = (state = [], action) => {
  switch (action.type) {
    case "GETALL":
      return action.payload;
    case "DELETE":
      return state.filter((cus) => cus.id != action.payload);
    default:
      return state;
  }
};
export default customer;
