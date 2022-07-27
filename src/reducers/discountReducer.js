const employee = (state = [], action) => {
  switch (action.type) {
    case "GETALL":
      return action.payload;
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE": {
      return state.map((discount) =>
        discount.discountId !== action.payload.discountId
          ? discount
          : action.payload
      );
    }
    case "DELETE": {
      return state.filter((dis) => dis.discountId != action.payload);
    }
    default:
      return state;
  }
};

export default employee;
