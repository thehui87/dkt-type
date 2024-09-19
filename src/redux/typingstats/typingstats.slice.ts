import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TypingStatsState {
    accuracy: number;
    correctCharacters: number;
    incorrectCharacters: number;
    extraCharacters: number;
    missedCharacters: number;
    correctWords: number;
    totalWords: number;
    wrongKeystrokes: number;
    wpm: number;
    time: number;
}

// Initial state
const initialState: TypingStatsState = {
    accuracy: 0,
    correctCharacters: 0,
    incorrectCharacters: 0,
    extraCharacters: 0,
    missedCharacters: 0,
    correctWords: 0,
    totalWords: 0,
    wrongKeystrokes: 0,
    wpm: 0,
    time: 0,
};

// Create slice
const typingStatsSlice = createSlice({
    name: 'typingstats',
    initialState,
    reducers: {
        setStats: (state, action: PayloadAction<TypingStatsState>) => {
            state.correctCharacters = action.payload?.correctCharacters;
            state.incorrectCharacters = action.payload?.incorrectCharacters;
            state.extraCharacters = action.payload?.extraCharacters;
            state.missedCharacters = action.payload?.missedCharacters;
            state.correctWords = action.payload?.correctWords;
            state.totalWords = action.payload?.totalWords;
            state.wrongKeystrokes = action.payload?.wrongKeystrokes;
            state.accuracy = Math.round(
                (1 -
                    (action.payload?.wrongKeystrokes +
                        action.payload?.incorrectCharacters +
                        action.payload?.extraCharacters +
                        action.payload?.missedCharacters) /
                        action.payload?.correctCharacters) *
                    100
            );
            state.wpm = Math.round(
                action.payload?.correctWords / action.payload?.time
            );
        },
        resetStats: (state) => {
            state.accuracy = 0;
            state.correctCharacters = 0;
            state.incorrectCharacters = 0;
            state.extraCharacters = 0;
            state.missedCharacters = 0;
            state.correctWords = 0;
            state.totalWords = 0;
            state.wrongKeystrokes = 0;
            state.wpm = 0;
            state.time = 0;
        },
    },
});

// Export actions
export const { setStats, resetStats } = typingStatsSlice.actions;

// Export reducer
export default typingStatsSlice.reducer;
