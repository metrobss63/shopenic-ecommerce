import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const fetchUserFromLocalStorage = () => {
    const userData = localStorage.getItem("user_credentials");
    return userData ? JSON.parse(userData) : null;
};

const initialState = {
    user: null,
    authStatus: STATUS.IDLE,
    error: null,
    loginUrl:'',
    signupUrl:''

};

// Auto-authenticate user if stored credentials exist
export const autoLoginUser = createAsyncThunk(
    'user/autoLogin',
    async (_, { rejectWithValue }) => {
        const savedUser = fetchUserFromLocalStorage();
        if (!savedUser) return rejectWithValue('No saved credentials');

        try {
            const response = await fetch(`${BASE_URL}login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(savedUser),
            });

            const data = await response.json();

            if (response.status !== 200) throw new Error(data.response || "Auto-login failed");
            return data.response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Manual login
export const loginUser = createAsyncThunk(
    'user/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();


            if (response.status !== 200){
                throw new Error(data.response);
            } 

            // Save for future auto-login
            localStorage.setItem("user_credentials", JSON.stringify(credentials));
            return data.response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Signup
export const signupUser = createAsyncThunk(
    'user/signup',
    async (userInfo, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userInfo),
            });

            const data = await response.json();
            console.log(data)

            if (response.status !== 200) throw new Error(data.response || "Signup failed");

            // Save for future auto-login
            localStorage.setItem("user_credentials", JSON.stringify({
                email: userInfo.email,
                password: userInfo.password
            }));

            return data.response;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.authStatus = STATUS.IDLE;
            state.error = null;
            localStorage.removeItem("user_credentials");
        },
        setAuthStatusOn: (state) => {
            state.authStatus = STATUS.SUCCEEDED;
        },
        setAuthStatusOff: (state) => {
            state.authStatus = STATUS.IDLE; // or STATUS.FAILED if you prefer
        },
        setSignupUrlOff: (state) => {
            state.signupUrl = ' '; 
        },
        setLoginUrlOff: (state) => {
            state.loginUrl = '' 
        },
    },

    extraReducers: (builder) => {
        builder
            // Auto-login
            .addCase(autoLoginUser.pending, (state) => {
                state.authStatus = STATUS.LOADING;
            })
            .addCase(autoLoginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.authStatus = STATUS.SUCCEEDED;
            })
            .addCase(autoLoginUser.rejected, (state, action) => {
                state.authStatus = STATUS.FAILED;
                state.error = action.payload;
            })

            // Manual login
            .addCase(loginUser.pending, (state) => {
                state.authStatus = STATUS.LOADING;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
               
                state.user = action.payload;
                state.authStatus = STATUS.SUCCEEDED;
                state.loginUrl = '/';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.authStatus = STATUS.FAILED;
                state.error = action.payload;
            })

            // Signup
            .addCase(signupUser.pending, (state) => {
                state.authStatus = STATUS.LOADING;
            })

            .addCase(signupUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.signupUrl = '/';
                state.authStatus = STATUS.SUCCEEDED;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.authStatus = STATUS.FAILED;
                state.error = action.payload;
            });
    }
});


// Selectors
export const getUser = (state) => state.user.user;
export const getAuthStatus = (state) => state.user.authStatus;
export const getLoginUrl = (state) => state.user.loginUrl;
export const getSignupUrl = (state) => state.user.signupUrl;
export const getUserError = (state) => state.user.error;

export const { logout, setAuthStatusOn, setAuthStatusOff,setLoginUrlOff,setSignupUrlOff } = userSlice.actions;

export default userSlice.reducer;
