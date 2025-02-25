export const selectAllTests = state => state.test.tests;
export const selectCurrentTest = state => state.test.currentTest;
export const selectCurrentQuestions = state => state.test.currentTest?.questions;
