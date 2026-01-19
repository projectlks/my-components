"use client"; // ✅ must be a client component

import { ToastContainer } from "react-toastify";
import { useTheme } from "next-themes";

export default function ThemeToast() {
    const { resolvedTheme } = useTheme();

    return <ToastContainer position="top-right" theme={resolvedTheme} className="top-20! " />;
}
