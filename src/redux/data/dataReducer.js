const initialState = {
  loading: false,
  allTruffles: [],
  allOwnerTruffles: [],
  allMarketItems: [],
  allOwnerItems: [],
  listingPrice: "",
  error: false,
  errorMsg: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHECK_DATA_REQUEST":
      return {
        ...initialState,
        loading: true,
      };
    case "CHECK_DATA_SUCCESS":
      return {
        ...initialState,
        loading: false,
        allTruffles: action.payload.allTruffles,
        allOwnerTruffles: action.payload.allOwnerTruffles,
        allMarketItems: action.payload.allMarketItems,
        allOwnerItems: action.payload.allOwnerItems,
        listingPrice: action.payload.listingPrice,
      };
    case "CHECK_DATA_FAILED":
      return {
        ...initialState,
        loading: false,
        error: true,
        errorMsg: action.payload,
      };
    case "REMOVE_SELECTED_PRODUCT":
      return {}
    default:
      return state;
  }
};

export default dataReducer;