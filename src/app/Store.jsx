import { configureStore } from "@reduxjs/toolkit";
import adminReducer from '../Features/adminSlice'
import usereducer from '../Features/userSlice';
import providerReducer from '../Features/providerSlice'
const Store = configureStore({
    reducer:{
        users:usereducer,
        admin:adminReducer,
        provider:providerReducer
    },
});

export default Store;