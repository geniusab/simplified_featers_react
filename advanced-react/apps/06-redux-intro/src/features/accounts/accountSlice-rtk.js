import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },

    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.loanPurpose = "";
      state.balance -= state.loan;
      state.loan = 0;
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { deposit, withdraw, payLoan, requestLoan } = accountSlice.actions;

export const depositAsync = (amount, currency) => async dispatch => {
  if (currency === "USD") {
    return dispatch(deposit(amount));
  } else {
    // API call
    const host = "api.frankfurter.app";

    const result = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await result.json();
    const converted = data.rates.USD;

    return dispatch(deposit(converted));
  }
};

export default accountSlice.reducer;
