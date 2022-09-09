import { toast } from "@zerodevx/svelte-toast";

export const successToast = (m) => toast.push(m, {
  duration: 1500,
  theme: {
    '--toastBackground': '#BBF7D0',
    '--toastColor': 'black',
    '--toastBarBackground': '#22C55E',
    '--toastBorderRadius': '0.25rem',
  }
});

export const warningToast = (m) => toast.push(m, {
  duration: 1500,
  theme: {
    '--toastBackground': '#FECACA',
    '--toastColor': 'black',
    '--toastBarBackground': '#EF4444',
    '--toastBorderRadius': '0.25rem',
  }
});