"use client";

import { useState } from "react";
import { useCompare } from "../../context/CompareContext";
import { searchProducts, getProductById } from "../../lib/api";
import Link from "next/link";
import Image from "next/image";

export default function ComparePage() {
    const { items, addToCompare, removeFromCompare, clearCompare } = useCompare();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [addingId, setAddingId] = useState(null);
    const [searchError, setSearchError] = useState("");

    const handleSearch = async (e) => {
        e.preventDefault();
        const q = searchQuery.trim();
        if (!q) return;

        setIsSearching(true);
        setSearchError("");

        try {
            const res = await searchProducts(q);
            const payload = res?.data || res;
            const itemsArr = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload) ? payload : [];

            const mapped = itemsArr.map((p) => {
                const basePrice = Number(p.retails_price || p.discounted_price || 0);
                const discountValue = Number(p.discount || 0);
                const discountType = String(p.discount_type || "").toLowerCase();
                const hasDiscount = discountValue > 0 && discountType !== "0";

                const price = hasDiscount
                    ? discountType === "percentage"
                        ? Math.max(0, Math.round(basePrice * (1 - discountValue / 100)))
                        : Math.max(0, basePrice - discountValue)
                    : basePrice;

                const discountLabel = hasDiscount
                    ? discountType === "percentage"
                        ? `-${discountValue}%`
                        : `৳ ${discountValue.toLocaleString("en-IN")}`
                    : null;

                const imageUrl =
                    p.image_path ||
                    p.image_path1 ||
                    p.image_path2 ||
                    (Array.isArray(p.image_paths) && p.image_paths[0]) ||
                    "/no-image.svg";

                return {
                    id: p.id,
                    name: p.name,
                    price: `৳ ${price.toLocaleString("en-IN")}`,
                    oldPrice: hasDiscount ? `৳ ${basePrice.toLocaleString("en-IN")}` : null,
                    discount: discountLabel,
                    imageUrl,
                    brand: p.brands?.name || "",
                };
            });

            setSearchResults(mapped);
        } catch {
            setSearchError("Something went wrong. Please try again.");
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddToCompare = async (resultItem) => {
        if (!resultItem?.id) return;
        try {
            setAddingId(resultItem.id);
            const res = await getProductById(resultItem.id);
            const payload = res?.data || res;
            if (!payload || !payload.id) return;

            const p = payload;

            const originalPrice = Number(p.retails_price || resultItem.price?.replace(/[^\d]/g, "") || 0);

            const imeis = Array.isArray(p.imeis)
                ? p.imeis.filter((i) => i.in_stock === 1)
                : [];
            const imeiPrices = imeis
                .map((i) => Number(i.sale_price || 0))
                .filter((v) => Number.isFinite(v) && v > 0);

            const effectivePrice =
                imeiPrices.length > 0
                    ? Math.min(...imeiPrices)
                    : originalPrice;

            const colors = Array.from(
                new Set(imeis.map((i) => i.color).filter(Boolean))
            );
            const storages = Array.from(
                new Set(imeis.map((i) => i.storage).filter(Boolean))
            );
            const rams = Array.from(
                new Set(imeis.map((i) => i.ram).filter(Boolean))
            );
            const regions = Array.from(
                new Set(imeis.map((i) => i.region).filter(Boolean))
            );

            addToCompare({
                id: p.id,
                name: p.name,
                brand: p.brand_name || p.brands?.name || resultItem.brand || "",
                price: effectivePrice
                    ? `৳ ${Number(effectivePrice).toLocaleString("en-IN")}`
                    : resultItem.price,
                oldPrice: resultItem.oldPrice || null,
                discount: resultItem.discount || null,
                imageUrl: resultItem.imageUrl,
                colors,
                storages,
                rams,
                regions,
            });
        } catch {
            // ignore for now; toast handled in context if needed
        } finally {
            setAddingId(null);
        }
    };

    return (
        <div className="w-full bg-gray-50 py-10 md:py-16">
            <div className="max-w-[1440px] mx-auto px-4 md:px-8 space-y-8">
                {/* Heading + search */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                            Compare Phones
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Add products using the search below, then compare them side by side.
                        </p>
                    </div>
                    <div className="w-full md:w-1/2">
                        <form
                            onSubmit={handleSearch}
                            className="flex w-full bg-white rounded-full items-center px-3 py-1.5 shadow-sm border border-gray-200"
                        >
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for products to compare..."
                                className="flex-1 px-2 py-1 text-base text-gray-900 outline-none border-none bg-transparent"
                            />
                            <button
                                type="submit"
                                className="px-4 py-1.5 text-xs font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                                disabled={isSearching}
                            >
                                {isSearching ? "Searching..." : "Search"}
                            </button>
                        </form>
                        {searchError && (
                            <p className="mt-1 text-xs text-red-500">{searchError}</p>
                        )}
                    </div>
                </div>

                {/* Search results */}
                {searchResults.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-gray-800">
                                Search results
                            </h2>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-500">
                                    {searchResults.length} item{searchResults.length > 1 ? "s" : ""} found
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchResults([]);
                                        setSearchQuery("");
                                        setSearchError("");
                                    }}
                                    className="text-[11px] font-semibold text-gray-400 hover:text-red-500"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                            {searchResults.map((p) => (
                                <div
                                    key={p.id}
                                    className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors"
                                >
                                    <div className="w-12 h-12 relative bg-white border border-gray-100 rounded">
                                        <Image
                                            src={p.imageUrl}
                                            alt={p.name}
                                            fill
                                            className="object-contain p-1"
                                            unoptimized
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[11px] font-semibold text-gray-900 line-clamp-2">
                                            {p.name}
                                        </p>
                                        <p className="text-[11px] text-gray-500">
                                            {p.brand || "—"}
                                        </p>
                                        <p className="text-xs font-bold text-red-600">
                                            {p.price}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleAddToCompare(p)}
                                        className="px-2 py-1 text-[10px] font-semibold rounded border border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 whitespace-nowrap"
                                        disabled={addingId === p.id}
                                    >
                                        {addingId === p.id ? "Adding..." : "Add"}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Comparison table */}
                {items && items.length > 0 && (
                    <div>
                        {(() => {
                            const hasColors = items.some(
                                (p) => Array.isArray(p.colors) && p.colors.length > 0
                            );
                            const hasStorages = items.some(
                                (p) => Array.isArray(p.storages) && p.storages.length > 0
                            );
                            const hasRams = items.some(
                                (p) => Array.isArray(p.rams) && p.rams.length > 0
                            );
                            const hasRegions = items.some(
                                (p) => Array.isArray(p.regions) && p.regions.length > 0
                            );

                            const rows = [
                                { id: "brand", label: "Brand", show: true, get: (p) => p.brand || "—" },
                                { id: "price", label: "Price", show: true, get: (p) => p.price || "—" },
                                {
                                    id: "colors",
                                    label: "Colors",
                                    show: hasColors,
                                    get: (p) =>
                                        p.colors && p.colors.length > 0 ? p.colors.join(", ") : "—",
                                },
                                {
                                    id: "storage",
                                    label: "Storage",
                                    show: hasStorages,
                                    get: (p) =>
                                        p.storages && p.storages.length > 0
                                            ? p.storages.join(", ")
                                            : "—",
                                },
                                {
                                    id: "ram",
                                    label: "RAM",
                                    show: hasRams,
                                    get: (p) =>
                                        p.rams && p.rams.length > 0 ? p.rams.join(", ") : "—",
                                },
                                {
                                    id: "regions",
                                    label: "Regions",
                                    show: hasRegions,
                                    get: (p) =>
                                        p.regions && p.regions.length > 0
                                            ? p.regions.join(", ")
                                            : "—",
                                },
                            ].filter((row) => row.show);

                            return (
                                <>
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className="text-lg md:text-xl font-bold text-gray-900">
                                            Comparison
                                        </h2>
                                        <div className="flex items-center gap-4 text-xs md:text-sm">
                                            <span className="text-gray-500">
                                                {items.length} product{items.length > 1 ? "s" : ""} in
                                                compare list
                                            </span>
                                            <button
                                                type="button"
                                                onClick={clearCompare}
                                                className="font-semibold text-red-600 hover:text-red-700"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <div className="min-w-[600px] rounded-2xl border border-gray-100 bg-white shadow-sm">
                                            {/* Product row */}
                                            <div className="grid grid-cols-[160px_repeat(auto-fit,minmax(200px,1fr))]">
                                                <div className="px-4 py-4 text-xs md:text-sm font-semibold text-gray-500 border-b border-gray-100 flex items-center">
                                                    Product
                                                </div>
                                                {items.map((product) => (
                                                    <div
                                        key={product.id}
                                                        className="px-4 py-4 border-b border-l border-gray-100 flex flex-col items-center justify-center relative"
                                                    >
                                                        <button
                                                            type="button"
                                                            onClick={() => removeFromCompare(product.id)}
                                                            className="absolute top-2 right-2 text-xs text-gray-400 hover:text-red-500"
                                                        >
                                                            ✕
                                                        </button>
                                                        <div className="w-20 h-20 relative mb-2">
                                                            <Image
                                                                src={product.imageUrl || "/no-image.svg"}
                                                                alt={product.name}
                                                                fill
                                                                className="object-contain"
                                                                unoptimized
                                                            />
                                                        </div>
                                                        <Link
                                                            href={`/product/${product.name
                                                                .toLowerCase()
                                                                .replace(/\s+/g, "-")}-${product.id}`}
                                                            className="text-[11px] md:text-xs font-semibold text-gray-900 text-center line-clamp-2 hover:text-blue-600"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Spec rows */}
                                            {rows.map((row) => (
                                                <div
                                                    key={row.id}
                                                    className="grid grid-cols-[160px_repeat(auto-fit,minmax(200px,1fr))] border-t border-gray-100"
                                                >
                                                    <div className="px-4 py-3 text-xs md:text-sm font-semibold text-gray-500 bg-gray-50 flex items-center">
                                                        {row.label}
                                                    </div>
                                                    {items.map((product) => (
                                                        <div
                                                            key={product.id}
                                                            className="px-4 py-3 text-xs md:text-sm text-gray-700 border-l border-gray-100 flex items-center"
                                                        >
                                                            {row.get(product)}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            );
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
}

