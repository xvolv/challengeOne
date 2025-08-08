import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const intialState = {
    name:"",
}
const nameSlice = createSlice(
    {
        name: "name",
        initialState: intialState,
        reducers: {
            setName: (state, action:PayloadAction<string>) => {
                state.name = action.payload;
            },
        },
    }
)
export const {setName} = nameSlice.actions;
export default nameSlice.reducer;