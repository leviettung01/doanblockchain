// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

const removeSelectedProduct = () => {
  return {
    type: "REMOVE_SELECTED_PRODUCT",
  };
};

export const fetchData = (account) => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let allTruffles = await store
        .getState()
        .blockchain.truffleFactory.methods.getTruffle()
        .call();
      let allOwnerTruffles = await store
        .getState()
        .blockchain.truffleFactory.methods.getOwnerTruffles(account)
        .call();  

      dispatch(
        fetchDataSuccess({
          allTruffles,
          allOwnerTruffles,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};

export const removeData = () => {
  return async (dispatch) => {
    dispatch(removeSelectedProduct());
  };
};


