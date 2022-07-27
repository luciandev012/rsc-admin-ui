const product = (state = [], action) => {
  switch (action.type) {
    case "GETPRODUCTS":
      return action.payload;
    case "DELETE": {
      return state.filter((product) => product.productId != action.payload);
    }
    default:
      return state;
  }
};

export default product;
