import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cityName: '',
  forcastDays: [],
  selectedWeather: {
    date: '',
    temp: 0,
    humidity: 0,
    wind: 0,
    hoursData: [],
  },
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCityName: (state, action) => {
      state.cityName = action.payload;
    },
    setForcastDays: (state, action) => {
      state.forcastDays = action.payload;
    },
    setSelectedWeather: (state, action) => {
      state.selectedWeather = action.payload;
    },
  },
});

export const { setCityName, setForcastDays, setSelectedWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
