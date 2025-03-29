import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


interface SearchState {
    searches : string[]
}

const initialState : SearchState = {
    searches : [""]
}

const SearchSlice = createSlice({
    name : "search",
    initialState, 
    reducers : {
        addSearchItem : (state, action: PayloadAction<string>) => {
            if(state.searches.length === 3){
                state.searches.pop()
                state.searches.unshift(action.payload)
            } else {
                state.searches.unshift(action.payload)
            }
        }   
    }
})

export default SearchSlice.reducer
export const { addSearchItem } = SearchSlice.actions