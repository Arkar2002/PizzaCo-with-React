import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeolocation";

const initialState = {
  username: "",
  position: {},
  address: "",
  phone: "",
  urlStatus: false,
  status: "idle",
};

const getPosition = async () =>
  new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject),
  );

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    lat: positionObj.coords.latitude,
    lng: positionObj.coords.longitude,
  };
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;
  return { position, address };
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },

    updateUrlStatus(state, action) {
      state.urlStatus = action.payload;
    },

    updatePhoneNumber(state, action) {
      state.phone = action.payload;
    },
  },

  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
      }),
});

export const { updateName, updateUrlStatus, updatePhoneNumber } =
  userSlice.actions;

export default userSlice.reducer;

export const getUser = (state) => state.user.username;

export const getUrlStatus = (state) => state.user.urlStatus;
