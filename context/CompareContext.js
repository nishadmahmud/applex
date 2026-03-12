"use client";

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import toast from "react-hot-toast";

const CompareContext = createContext(null);

// Avoid triggering other components' state updates during this provider's render/update
function scheduleToast(fn) {
    if (typeof window === "undefined") return;
    setTimeout(() => {
        try {
            fn();
        } catch {
            // ignore toast errors
        }
    }, 0);
}

export function CompareProvider({ children }) {
    const [items, setItems] = useState([]);

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            const stored = localStorage.getItem("applex_compare");
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed)) {
                    setItems(parsed);
                }
            }
        } catch {
            // ignore parse errors
        }
    }, []);

    // Persist to localStorage when items change
    useEffect(() => {
        if (typeof window === "undefined") return;
        try {
            localStorage.setItem("applex_compare", JSON.stringify(items));
        } catch {
            // ignore storage errors
        }
    }, [items]);

    const addToCompare = useCallback((product) => {
        if (!product || !product.id) return;

        setItems((prev) => {
            const exists = prev.some((p) => p.id === product.id);
            if (exists) {
                scheduleToast(() => toast("Already in compare list", { icon: "ℹ️" }));
                return prev;
            }

            const next = [...prev, product];
            scheduleToast(() => toast.success("Added to compare"));
            return next;
        });
    }, []);

    const removeFromCompare = useCallback((productId) => {
        setItems((prev) => {
            const next = prev.filter((p) => p.id !== productId);
            scheduleToast(() => toast.success("Removed from compare"));
            return next;
        });
    }, []);

    const clearCompare = useCallback(() => {
        setItems([]);
        scheduleToast(() => toast.success("Cleared compare list"));
    }, []);

    const value = useMemo(
        () => ({
            items,
            addToCompare,
            removeFromCompare,
            clearCompare,
            count: items.length,
        }),
        [items, addToCompare, removeFromCompare, clearCompare]
    );

    return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
    const ctx = useContext(CompareContext);
    if (!ctx) {
        throw new Error("useCompare must be used within a CompareProvider");
    }
    return ctx;
}

