const customer = (state = [], action) => {
  switch (action.type) {
    case "GETALLCUS":
      return action.payload;
    case "DELETECUS":
      return state.filter((cus) => cus.id != action.payload);
    default:
      return state;
  }
};
export default customer;
