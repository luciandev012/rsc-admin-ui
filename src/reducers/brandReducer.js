const brand = (state = [], action) => {
  switch (action.type) {
    case "GETBRANDS":
      return action.payload;
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE": {
      return state.map((brand) =>
        brand.brandId !== action.payload.brandId ? brand : action.payload
      );
    }
    case "DELETE": {
      return state.filter((brand) => brand.brandId != action.payload);
    }
    default:
      return state;
  }
};

export default brand;
