import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransportState, TransportItem } from "../../types";
import { persistenceService } from "../../services/persistence/persistenceService";

const initialState: TransportState = {
  items: [],
  favorites: [],
  loading: false,
};

const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {
    setTransportItems: (state, action: PayloadAction<TransportItem[]>) => {
      state.items = action.payload;
    },
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorites = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<string>) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
        // Save to persistence
        persistenceService.saveFavorites(state.favorites);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(id => id !== action.payload);
      // Save to persistence
      persistenceService.saveFavorites(state.favorites);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTransportItems, setFavorites, addToFavorites, removeFromFavorites, setLoading } = transportSlice.actions;
export default transportSlice.reducer;
