const initialState = {
  loading: false,
  allTruffles: [],
  allOwnerTruffles: [],
  getAllIitemSell: [],
  admin: "",
  mintFee: 0,
  levelUpFee: 0,
  sellFee: 0,
  breedFee: 0,
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
        getAllIitemSell: action.payload.getAllIitemSell,
        admin: action.payload.admin,
        mintFee: action.payload.mintFee,
        levelUpFee: action.payload.levelUpFee,
        sellFee: action.payload.sellFee,
        breedFee: action.payload.breedFee,
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