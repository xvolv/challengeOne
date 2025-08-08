import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface NameState {
  name: string;
  loading: boolean;
  error: string | null;
  greeting: string | null;
}

const initialState: NameState = {
  name: "",
  loading: false,
  error: null,
  greeting: null,
};

export const fetchGreeting = createAsyncThunk(
  'name/fetchGreeting',
  async (name: string, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/greet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue(error.error || 'Failed to fetch greeting');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue('Network error occurred');
    }
  }
);

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.loading = false;
        state.greeting = action.payload.message;
      })
      .addCase(fetchGreeting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setName, clearError } = nameSlice.actions;
export default nameSlice.reducer;