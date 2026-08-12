import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // =====================================================
  // CALENDAR LIST
  // =====================================================
  calendar: [],
  calendarLoading: false,
  calendarError: null,

  // =====================================================
  // TODAY'S SCHEDULE
  // =====================================================
  today: [],
  todayLoading: false,
  todayError: null,

  // =====================================================
  // CALENDAR DETAIL
  // =====================================================
  calendarDetail: null,
  calendarDetailLoading: false,
  calendarDetailError: null,

  // =====================================================
  // CREATE
  // =====================================================
  createLoading: false,
  createSuccess: false,
  createError: null,

  // =====================================================
  // UPDATE
  // =====================================================
  updateLoading: false,
  updateSuccess: false,
  updateError: null,

  // =====================================================
  // DELETE
  // =====================================================
  deleteLoading: false,
  deleteSuccess: false,
  deleteError: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,

  reducers: {
    // =====================================================
    // GET CALENDAR
    // =====================================================

    getCalendarRequest: (state) => {
      state.calendarLoading = true;
      state.calendarError = null;
    },

    getCalendarSuccess: (state, action) => {
      state.calendarLoading = false;

      // API response agar { data: [] } bheje
      // ya direct [] bheje dono handle honge
      state.calendar =
        action.payload?.data ||
        action.payload ||
        [];
    },

    getCalendarFailure: (state, action) => {
      state.calendarLoading = false;
      state.calendarError = action.payload;
    },

    // =====================================================
    // GET TODAY
    // =====================================================

    getCalendarTodayRequest: (state) => {
      state.todayLoading = true;
      state.todayError = null;
    },

    getCalendarTodaySuccess: (state, action) => {
      state.todayLoading = false;

      state.today =
        action.payload?.data ||
        action.payload ||
        [];
    },

    getCalendarTodayFailure: (state, action) => {
      state.todayLoading = false;
      state.todayError = action.payload;
    },

    // =====================================================
    // GET CALENDAR BY ID
    // =====================================================

    getCalendarByIdRequest: (state) => {
      state.calendarDetailLoading = true;
      state.calendarDetailError = null;
    },

    getCalendarByIdSuccess: (state, action) => {
      state.calendarDetailLoading = false;

      state.calendarDetail =
        action.payload?.data ||
        action.payload ||
        null;
    },

    getCalendarByIdFailure: (state, action) => {
      state.calendarDetailLoading = false;
      state.calendarDetailError = action.payload;
    },

    // =====================================================
    // CREATE CALENDAR
    // =====================================================

    createCalendarRequest: (state) => {
      state.createLoading = true;
      state.createSuccess = false;
      state.createError = null;
    },

    createCalendarSuccess: (state, action) => {
      state.createLoading = false;
      state.createSuccess = true;

      const newEvent =
        action.payload?.data ||
        action.payload;

      if (newEvent) {
        state.calendar.unshift(newEvent);
      }
    },

    createCalendarFailure: (state, action) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = action.payload;
    },

    // =====================================================
    // UPDATE CALENDAR
    // =====================================================

    updateCalendarRequest: (state) => {
      state.updateLoading = true;
      state.updateSuccess = false;
      state.updateError = null;
    },

    updateCalendarSuccess: (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = true;

      const updatedEvent =
        action.payload?.data ||
        action.payload;

      if (!updatedEvent?._id) return;

      const index = state.calendar.findIndex(
        (item) => item._id === updatedEvent._id
      );

      if (index !== -1) {
        state.calendar[index] = updatedEvent;
      }

      if (
        state.calendarDetail?._id === updatedEvent._id
      ) {
        state.calendarDetail = updatedEvent;
      }
    },

    updateCalendarFailure: (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = action.payload;
    },

    // =====================================================
    // DELETE CALENDAR
    // =====================================================

    deleteCalendarRequest: (state) => {
      state.deleteLoading = true;
      state.deleteSuccess = false;
      state.deleteError = null;
    },

    deleteCalendarSuccess: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = true;

      const id = action.payload?.id;

      state.calendar = state.calendar.filter(
        (item) => item._id !== id
      );

      if (state.calendarDetail?._id === id) {
        state.calendarDetail = null;
      }
    },

    deleteCalendarFailure: (state, action) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = action.payload;
    },

    // =====================================================
    // RESET CREATE STATE
    // =====================================================

    resetCalendarCreateState: (state) => {
      state.createLoading = false;
      state.createSuccess = false;
      state.createError = null;
    },

    // =====================================================
    // RESET UPDATE STATE
    // =====================================================

    resetCalendarUpdateState: (state) => {
      state.updateLoading = false;
      state.updateSuccess = false;
      state.updateError = null;
    },

    // =====================================================
    // RESET DELETE STATE
    // =====================================================

    resetCalendarDeleteState: (state) => {
      state.deleteLoading = false;
      state.deleteSuccess = false;
      state.deleteError = null;
    },

    // =====================================================
    // CLEAR DETAIL
    // =====================================================

    clearCalendarDetail: (state) => {
      state.calendarDetail = null;
      state.calendarDetailError = null;
    },
  },
});

export const {
  // GET
  getCalendarRequest,
  getCalendarSuccess,
  getCalendarFailure,

  // TODAY
  getCalendarTodayRequest,
  getCalendarTodaySuccess,
  getCalendarTodayFailure,

  // DETAIL
  getCalendarByIdRequest,
  getCalendarByIdSuccess,
  getCalendarByIdFailure,

  // CREATE
  createCalendarRequest,
  createCalendarSuccess,
  createCalendarFailure,

  // UPDATE
  updateCalendarRequest,
  updateCalendarSuccess,
  updateCalendarFailure,

  // DELETE
  deleteCalendarRequest,
  deleteCalendarSuccess,
  deleteCalendarFailure,

  // RESET
  resetCalendarCreateState,
  resetCalendarUpdateState,
  resetCalendarDeleteState,

  // DETAIL
  clearCalendarDetail,
} = calendarSlice.actions;

export default calendarSlice.reducer;