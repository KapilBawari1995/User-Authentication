import toast from "react-hot-toast";

const baseStyle = {
  borderRadius: "12px",
  padding: "14px 18px",
  fontSize: "14px",
  fontWeight: "600",
  boxShadow: "0 10px 25px rgba(0,0,0,.15)",
};

export const successToast = (message) => {
  toast.success(message, {
    duration: 3000,
    position: "top-right",
    icon: "✅",
    style: {
      ...baseStyle,
      background: "#ECFDF5",
      color: "#065F46",
      border: "1px solid #10B981",
    },
  });
};

export const errorToast = (message) => {
  toast.error(message, {
    duration: 3000,
    position: "top-right",
    icon: "❌",
    style: {
      ...baseStyle,
      background: "#FEF2F2",
      color: "#991B1B",
      border: "1px solid #EF4444",
    },
  });
};

export const loadingToast = (message = "Loading...") => {
  return toast.loading(message, {
    position: "top-right",
    style: {
      ...baseStyle,
      background: "#EFF6FF",
      color: "#1E40AF",
      border: "1px solid #3B82F6",
    },
  });
};

export const dismissToast = (id) => {
  toast.dismiss(id);
};