import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { customerReducer } from "../features/customers/customerSlice";
import { accountReducer } from "../features/accounts/accountSlice";
import thunk from "redux-thunk";
import logger from "redux-logger";

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, thunk))
);

// const ACCOUNT_DEPOSIT = "account/deposit";
// const ACCOUNT_WITHDRaW = "account/withdraw";
// const ACCOUNT_PAY_LOAN = "account/payLoan";
// const ACCOUNT_REQUEST_LOAN = "account/payLoan";

export default store;
