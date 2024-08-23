import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ToolbarState {
    value: number;
    punctuationBool: boolean;
    numberBool: boolean;
    toggleMenuValue: string;
    toggleTimerValue: string;
    toggleTexLengthValue: string;
    toggleQuoteLengthValue: string;
    showLeftTabs: boolean;
    showRightTabs: boolean;
}

// Initial state
const initialState: ToolbarState = {
    value: 0,
    punctuationBool: false,
    numberBool: false,
    toggleMenuValue: 'time',
    toggleTimerValue: '30',
    toggleTexLengthValue: '50',
    toggleQuoteLengthValue: 'all',
    showLeftTabs: true,
    showRightTabs: true,
};

// Create slice
const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.value += 1;
        // },
        // decrement: (state) => {
        //     state.value -= 1;
        // },
        // incrementByAmount: (state, action: PayloadAction<number>) => {
        //     state.value += action.payload;
        // },
        setPunctuationToggle: (state, action: PayloadAction<boolean>) => {
            state.punctuationBool = action.payload;
        },
        setNumberToggle: (state, action: PayloadAction<boolean>) => {
            state.numberBool = action.payload;
        },
        setMenuToggle: (state, action: PayloadAction<string>) => {
            state.toggleMenuValue = action.payload;
        },
        setTimerValueToggle: (state, action: PayloadAction<string>) => {
            state.toggleTimerValue = action.payload;
        },
        setTextLengthValueToggle: (state, action: PayloadAction<string>) => {
            state.toggleTexLengthValue = action.payload;
        },
        setQuoteLengthValueToggle: (state, action: PayloadAction<string>) => {
            state.toggleQuoteLengthValue = action.payload;
        },
        setShowLeftTabs: (state, action: PayloadAction<boolean>) => {
            state.showLeftTabs = action.payload;
        },
        setShowRightTabs: (state, action: PayloadAction<boolean>) => {
            state.showRightTabs = action.payload;
        },
    },
});

// Export actions
export const {
    setPunctuationToggle,
    setNumberToggle,
    setMenuToggle,
    setTimerValueToggle,
    setTextLengthValueToggle,
    setQuoteLengthValueToggle,
    setShowLeftTabs,
    setShowRightTabs,
} = counterSlice.actions;

// Export reducer
export default counterSlice.reducer;
