import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  X,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

const RESEND_SECONDS = 90;

const ChangePasswordOtpModal = ({
  open,
  otp,
  setOtp,
  loading = false,
  resendLoading = false,
  onVerify,
  onResend,
  onClose,
  error = "",
}) => {
  const [countdown, setCountdown] =
    useState(RESEND_SECONDS);

  const inputRef = useRef(null);

  /* =====================================================
     OPEN MODAL
  ===================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    setCountdown(RESEND_SECONDS);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [open]);

  /* =====================================================
     AUTO FOCUS
  ===================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [open]);

  /* =====================================================
     ESCAPE KEY
  ===================================================== */

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (!loading && !resendLoading) {
          onClose?.();
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    open,
    loading,
    resendLoading,
    onClose,
  ]);

  /* =====================================================
     OTP CHANGE
  ===================================================== */

  const handleOtpChange = (event) => {
    const value = event.target.value
      .replace(/\D/g, "")
      .slice(0, 6);

    setOtp(value);
  };

  /* =====================================================
     OTP PASTE
  ===================================================== */

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedValue =
      event.clipboardData
        ?.getData("text")
        ?.replace(/\D/g, "")
        .slice(0, 6) || "";

    setOtp(pastedValue);
  };

  /* =====================================================
     RESEND
  ===================================================== */

  const handleResend = async () => {
    if (
      countdown > 0 ||
      resendLoading ||
      loading
    ) {
      return;
    }

    try {
      /*
        If onResend returns a Promise,
        wait for API response before
        starting the timer.
      */

      await onResend?.();

      setOtp("");

      setCountdown(RESEND_SECONDS);

      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } catch (error) {
      console.error(
        "RESEND OTP ERROR:",
        error
      );
    }
  };

  /* =====================================================
     VERIFY
  ===================================================== */

  const handleVerify = () => {
    if (
      loading ||
      resendLoading ||
      otp.length !== 6
    ) {
      return;
    }

    onVerify?.();
  };

  /* =====================================================
     CLOSE
  ===================================================== */

  const handleClose = () => {
    if (loading || resendLoading) {
      return;
    }

    onClose?.();
  };

  /* =====================================================
     UI
  ===================================================== */

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed inset-0 z-[100]
        flex items-center justify-center
        p-4

        bg-black/50
        dark:bg-black/70

        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="change-password-otp-title"
    >
      {/* BACKDROP */}

      <div
        className="
          absolute
          inset-0
        "
        onClick={handleClose}
      />

      {/* MODAL */}

      <div
        className="
          relative
          z-10

          w-full
          max-w-md

          bg-white
          dark:bg-slate-900

          rounded-2xl

          border
          border-slate-200
          dark:border-slate-700

          shadow-2xl

          overflow-hidden

          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            px-6
            py-5

            border-b
            border-slate-200
            dark:border-slate-700

            flex
            items-center
            justify-between
          "
        >
          <div className="flex items-center gap-3">
            {/* ICON */}

            <div
              className="
                w-11
                h-11

                rounded-xl

                bg-indigo-50
                dark:bg-indigo-500/10

                text-indigo-600
                dark:text-indigo-400

                flex
                items-center
                justify-center
              "
            >
              <ShieldCheck size={22} />
            </div>

            {/* TITLE */}

            <div>
              <h2
                id="change-password-otp-title"
                className="
                  font-bold
                  text-slate-800
                  dark:text-white
                "
              >
                Verify OTP
              </h2>

              <p
                className="
                  text-xs
                  text-slate-400
                  dark:text-slate-500

                  mt-1
                "
              >
                Verify your identity to change
                password.
              </p>
            </div>
          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={handleClose}
            disabled={
              loading ||
              resendLoading
            }
            aria-label="Close OTP modal"
            className="
              w-9
              h-9

              rounded-lg

              flex
              items-center
              justify-center

              text-slate-400

              hover:text-slate-700
              dark:hover:text-white

              hover:bg-slate-100
              dark:hover:bg-slate-800

              transition

              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* =================================================
            BODY
        ================================================= */}

        <div className="p-6">
          {/* INFO */}

          <div
            className="
              mb-5
              p-4

              rounded-xl

              bg-indigo-50
              dark:bg-indigo-500/10

              border
              border-indigo-100
              dark:border-indigo-500/20
            "
          >
            <div className="flex gap-3">
              <CheckCircle2
                size={19}
                className="
                  text-indigo-600
                  dark:text-indigo-400

                  shrink-0
                  mt-0.5
                "
              />

              <p
                className="
                  text-xs
                  leading-5

                  text-indigo-700
                  dark:text-indigo-300
                "
              >
                A 6-digit verification code has
                been sent to your registered email.
                The OTP is valid for 10 minutes.
              </p>
            </div>
          </div>

          {/* =================================================
              OTP
          ================================================= */}

          <div>
            <label
              htmlFor="change-password-otp"
              className="
                block

                text-sm
                font-semibold

                text-slate-700
                dark:text-slate-200

                mb-2
              "
            >
              Verification OTP
            </label>

            <input
              ref={inputRef}
              id="change-password-otp"
              type="text"
              value={otp}
              onChange={handleOtpChange}
              onPaste={handlePaste}
              placeholder="000000"
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              disabled={
                loading ||
                resendLoading
              }
              aria-invalid={Boolean(error)}
              aria-describedby={
                error
                  ? "otp-error"
                  : undefined
              }
              className={`
                w-full
                h-14
                px-4

                rounded-xl

                border

                bg-slate-50
                dark:bg-slate-800

                text-center

                tracking-[0.45em]

                text-xl
                font-bold

                text-slate-800
                dark:text-white

                placeholder:text-slate-400
                placeholder:tracking-normal

                outline-none

                transition

                disabled:opacity-60
                disabled:cursor-not-allowed

                ${
                  error
                    ? `
                      border-red-400
                      dark:border-red-500/50
                      focus:border-red-500
                      focus:ring-4
                      focus:ring-red-500/10
                    `
                    : `
                      border-slate-200
                      dark:border-slate-700

                      focus:bg-white
                      dark:focus:bg-slate-900

                      focus:border-indigo-400

                      focus:ring-4
                      focus:ring-indigo-500/10
                    `
                }
              `}
            />

            {/* ERROR */}

            {error && (
              <p
                id="otp-error"
                className="
                  mt-2
                  text-xs
                  text-red-500
                  dark:text-red-400
                "
              >
                {error}
              </p>
            )}
          </div>

          {/* =================================================
              RESEND
          ================================================= */}

          <div className="flex justify-center mt-5">
            {countdown > 0 ? (
              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Resend OTP in{" "}
                <span
                  className="
                    font-semibold

                    text-indigo-600
                    dark:text-indigo-400
                  "
                >
                  {countdown}s
                </span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                disabled={
                  resendLoading ||
                  loading
                }
                className="
                  inline-flex
                  items-center
                  gap-2

                  text-sm
                  font-semibold

                  text-indigo-600
                  dark:text-indigo-400

                  hover:text-indigo-700
                  dark:hover:text-indigo-300

                  disabled:opacity-50
                  disabled:cursor-not-allowed

                  transition
                "
              >
                <RefreshCw
                  size={16}
                  className={
                    resendLoading
                      ? "animate-spin"
                      : ""
                  }
                />

                {resendLoading
                  ? "Sending..."
                  : "Resend OTP"}
              </button>
            )}
          </div>

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div
            className="
              flex
              flex-col-reverse
              sm:flex-row

              justify-end

              gap-3

              mt-7
              pt-5

              border-t
              border-slate-100
              dark:border-slate-800
            "
          >
            {/* CANCEL */}

            <button
              type="button"
              onClick={handleClose}
              disabled={
                loading ||
                resendLoading
              }
              className="
                h-11
                px-5

                rounded-xl

                border
                border-slate-200
                dark:border-slate-700

                bg-white
                dark:bg-slate-800

                text-slate-600
                dark:text-slate-300

                text-sm
                font-semibold

                hover:bg-slate-50
                dark:hover:bg-slate-700

                transition

                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Cancel
            </button>

            {/* VERIFY */}

            <button
              type="button"
              onClick={handleVerify}
              disabled={
                loading ||
                resendLoading ||
                otp.length !== 6
              }
              className="
                h-11
                px-6

                rounded-xl

                bg-indigo-600
                hover:bg-indigo-700

                disabled:bg-slate-400
                disabled:cursor-not-allowed

                text-white

                text-sm
                font-semibold

                inline-flex
                items-center
                justify-center
                gap-2

                transition
              "
            >
              {loading ? (
                <>
                  <RefreshCw
                    size={17}
                    className="animate-spin"
                  />

                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck
                    size={17}
                  />

                  Verify & Update
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordOtpModal;