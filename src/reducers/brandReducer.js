const brand = (state = [], action) => {
  switch (action.type) {
    case "GETBRANDS":
      return action.payload;
    case "CREATEBRAND":
      return [...state, action.payload];
    case "UPDATEBRAND": {
      return state.map((brand) =>
        brand.brandId !== action.payload.brandId ? brand : action.payload
      );
    }
    case "DELETEBRAND": {
      return state.filter((brand) => brand.brandId != action.payload);
    }
    default:
      return state;
  }
};

export default brand;
