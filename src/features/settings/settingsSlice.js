import { createSlice } from "@reduxjs/toolkit";

// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  // =====================================================
  // SETTINGS
  // =====================================================

  settings: {
    notifications: true,
    theme: "light",
    language: "English",
  },

  // =====================================================
  // GET SETTINGS
  // =====================================================

  getSettingsLoading: false,
  getSettingsSuccess: false,
  getSettingsError: null,

  // =====================================================
  // UPDATE SETTINGS
  // =====================================================

  updateSettingsLoading: false,
  updateSettingsSuccess: false,
  updateSettingsError: null,
};

// =====================================================
// SLICE
// =====================================================

const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    // ===================================================
    // GET SETTINGS REQUEST
    // ===================================================

    getSettingsRequest: (state) => {
      state.getSettingsLoading = true;
      state.getSettingsSuccess = false;
      state.getSettingsError = null;
    },

    // ===================================================
    // GET SETTINGS SUCCESS
    // ===================================================

    getSettingsSuccess: (state, action) => {
      state.getSettingsLoading = false;
      state.getSettingsSuccess = true;
      state.getSettingsError = null;

      state.settings = {
        notifications:
          action.payload?.notifications ?? true,

        theme:
          action.payload?.theme ?? "light",

        language:
          action.payload?.language ?? "English",
      };
    },

    // ===================================================
    // GET SETTINGS FAILURE
    // ===================================================

    getSettingsFailure: (state, action) => {
      state.getSettingsLoading = false;
      state.getSettingsSuccess = false;

      state.getSettingsError =
        action.payload ||
        "Failed to get settings.";
    },

    // ===================================================
    // UPDATE SETTINGS REQUEST
    // ===================================================

    updateSettingsRequest: (state) => {
      state.updateSettingsLoading = true;
      state.updateSettingsSuccess = false;
      state.updateSettingsError = null;
    },

    // ===================================================
    // UPDATE SETTINGS SUCCESS
    // ===================================================

    updateSettingsSuccess: (state, action) => {
      state.updateSettingsLoading = false;
      state.updateSettingsSuccess = true;
      state.updateSettingsError = null;

      state.settings = {
        notifications:
          action.payload?.notifications ??
          state.settings.notifications,

        theme:
          action.payload?.theme ??
          state.settings.theme,

        language:
          action.payload?.language ??
          state.settings.language,
      };
    },

    // ===================================================
    // UPDATE SETTINGS FAILURE
    // ===================================================

    updateSettingsFailure: (state, action) => {
      state.updateSettingsLoading = false;
      state.updateSettingsSuccess = false;

      state.updateSettingsError =
        action.payload ||
        "Failed to update settings.";
    },

    // ===================================================
    // CLEAR SETTINGS STATE
    // ===================================================

    clearSettingsState: (state) => {
      state.getSettingsLoading = false;
      state.getSettingsSuccess = false;
      state.getSettingsError = null;

      state.updateSettingsLoading = false;
      state.updateSettingsSuccess = false;
      state.updateSettingsError = null;
    },
  },
});

// =====================================================
// ACTIONS
// =====================================================

export const {
  getSettingsRequest,
  getSettingsSuccess,
  getSettingsFailure,

  updateSettingsRequest,
  updateSettingsSuccess,
  updateSettingsFailure,

  clearSettingsState,
} = settingsSlice.actions;

// =====================================================
// REDUCER
// =====================================================

export default settingsSlice.reducer;