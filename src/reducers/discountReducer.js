const employee = (state = [], action) => {
  switch (action.type) {
    case "GETALLDIS":
      return action.payload;
    case "CREATEDIS":
      return [...state, action.payload];
    case "UPDATEDIS": {
      return state.map((discount) =>
        discount.discountId !== action.payload.discountId
          ? discount
          : action.payload
      );
    }
    case "DELETEDIS": {
      return state.filter((dis) => dis.discountId != action.payload);
    }
    default:
      return state;
  }
};

export default employee;
