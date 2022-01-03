import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../../Utils/Service'

export const loginUser = createAsyncThunk(
    'login/user',
    async (data, thunkAPI) => {
        let result = await Service.callApi("users/login", "POST", data);
        if (result.success) {
            Service.setItem('isLogin', true);
            Service.setItem('user', result.result);
            Service.setItem('userId', result.result.user_id);
            Service.setItem('token', result.token);
            Service.setItem('walletAddress', result.result.eth_address);
            return result;
        }
        else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);
export const getUserData = createAsyncThunk(
    'login/getuserdata',
    async (data, thunkAPI) => {
        let user_id = await Service.getItem('userId');
        let userData = {
            "user_id": user_id,
        };
        let result = await Service.callApi("users/getUser", "POST", userData);
        if (result.success) {
            return result;
        }
        else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const userUpdateData = createAsyncThunk(
    'login/userupdatedata',
    async (data, thunkAPI) => {
        let user_id = await Service.getItem('userId');
        let result = await Service.callApi("users/update/" + user_id, "POST", data);
        if (result.success) {
            return result;
        }
        else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const createWallet = createAsyncThunk(
    'login/createWallet',
    async (data, thunkAPI) => {
        let result = await Service.callApi("users/createWallet", "POST", data);
        if (result.success) {
            Service.setItem('walletAddress', result.result.eth_address)
            return result;
        }
        else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const getBalance = createAsyncThunk(
    'login/getBalance',
    async (data, thunkAPI) => {
        let result = await Service.callApi("users/getBalance", "POST", data);
        if (result.success) {
            return result;
        }
        else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);


export const redeemCoin = createAsyncThunk(
    'user/redeem',
    async (data, thunkAPI) => {
        let result = await Service.callApi("users/redeem", "POST", data);
        if (result) {
            if (result.success) {
                return result;
            } else {
                return thunkAPI.rejectWithValue(result);
            }
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);


export const transferCoin = createAsyncThunk(
    'user/transfer',
    async (data, thunkAPI) => {
        let result = await Service.callApi("users/transfer", "POST", data);
        if (result) {
            return result;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);

export const setUserdata = createAsyncThunk(
    'user/setuser',
    async (data, thunkAPI) => {
        if (data) {
            return data;
        } else {
            return thunkAPI.rejectWithValue(result);
        }
    }
);




export const loginSlice = createSlice({
    name: 'loginuser',
    initialState: {
        loginuserdata: [],
        isLogin: false,
        token: '',
        walletAddress: '',
        balance: 0,
        transactions: [],
        iswalletAddress: '',
        isTransfer: '',
        isRedeem: '',
        isFetching: false,
        isSuccess: false,
        isRegetdata: false,
        isUpdate: false,
        isError: false,
        errorMessage: '',
    },
    reducers: {
        clearState: (state) => {
            state.isRegetdata = false;
            state.isUpdate = false;
            state.isError = false;
            state.isSuccess = false;
            state.isTransfer = '';
            state.isRedeem = '';
            state.isFetching = false;
            state.errorMessage = '';
            return state;
        },
        resetState: (state) => {
            state.loginuserdata = [];
            state.isLogin = false;
            state.token = '';
            state.walletAddress = '';
            state.balance = 0;
            state.transactions = [];
            state.iswalletAddress = '';
            state.isTransfer = '';
            state.isRedeem = false;
            state.iswalletAddress = '';
            state.isSuccess = false;
            state.isRegetdata = false;
            state.isUpdate = false;
            state.isError = false;
            state.errorMessage = '';
            return state;
        },
    },
    extraReducers: {
        [loginUser.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.isLogin = true;
            state.loginuserdata = payload.result;
            state.balance = payload.balance;
            state.walletAddress = payload.result.eth_address;
            state.token = payload.token;
            state.errorMessage = '';
            return state;
        },
        [loginUser.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.loginuserdata = [];
            state.isLogin = false;
            state.token = '';
            state.walletAddress = '';
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [loginUser.pending]: (state) => {
            state.isFetching = true;
        },

        [getUserData.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.isRegetdata = true;
            state.loginuserdata = payload.result;
            state.errorMessage = '';
            return state;
        },
        [getUserData.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.isRegetdata = false;
            state.loginuserdata = [];
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [getUserData.pending]: (state) => {
            state.isFetching = true;
        },

        [userUpdateData.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.isUpdate = true;
            state.loginuserdata = payload.result;
            state.errorMessage = '';
            return state;
        },
        [userUpdateData.rejected]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = true;
            state.isUpdate = false;
            state.loginuserdata = [];
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [userUpdateData.pending]: (state) => {
            state.isFetching = true;
        },

        [createWallet.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.isLogin = true;
            state.iswalletAddress = true;
            state.loginuserdata = payload.result;
            state.walletAddress = payload.result.eth_address;
            state.errorMessage = '';
            return state;
        },
        [createWallet.rejected]: (state, { payload }) => {

            state.isFetching = false;
            state.isError = true;
            state.isLogin = false;
            state.iswalletAddress = false;
            state.walletAddress = '';
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [createWallet.pending]: (state) => {
            state.isFetching = true;
        },

        [getBalance.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.balance = payload.balance;
            state.transactions = payload.transactions;
            state.errorMessage = '';
            return state;
        },
        [getBalance.rejected]: (state, { payload }) => {

            state.isFetching = false;
            state.isError = true;
            state.balance = 0;
            state.transactions = [];
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [getBalance.pending]: (state) => {
            state.isFetching = true;
        },



        [redeemCoin.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.balance = payload.balance;
            state.isRedeem = true;
            state.transactions = payload.transactions;
            state.errorMessage = '';
            return state;
        },
        [redeemCoin.rejected]: (state, { payload }) => {

            state.isFetching = false;
            state.isError = true;
            state.balance = 0;
            state.isRedeem = false;
            state.transactions = [];
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [redeemCoin.pending]: (state) => {
            state.isFetching = true;
        },


        [transferCoin.fulfilled]: (state, { payload }) => {
            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.isTransfer = true;
            state.balance = payload.balance;
            state.transactions = payload.transactions;
            state.errorMessage = '';
            return state;
        },
        [transferCoin.rejected]: (state, { payload }) => {

            state.isFetching = false;
            state.isError = true;
            state.isTransfer = false;
            state.balance = 0;
            state.transactions = [];
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [transferCoin.pending]: (state) => {
            state.isFetching = true;
        },



        [setUserdata.fulfilled]: (state, { payload }) => {

            state.isFetching = false;
            state.isError = false;
            state.isSuccess = true;
            state.isLogin = true;
            state.loginuserdata = payload.user;
            state.walletAddress = '';
            state.token = payload.token;
            state.errorMessage = '';
            return state;
        },
        [setUserdata.rejected]: (state, { payload }) => {

            state.isFetching = false;
            state.isError = true;
            state.loginuserdata = [];
            state.isLogin = false;
            state.walletAddress = '';
            state.token = '';
            state.errorMessage = payload.error ? payload.error : 'please try somtime';
        },
        [setUserdata.pending]: (state) => {
            state.isFetching = true;
        },
    },
});

export const { clearState, resetState } = loginSlice.actions;
export const loginSelector = (state) => state.main.loginuser;
export default loginSlice.reducer;

