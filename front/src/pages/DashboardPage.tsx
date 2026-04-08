import { useEffect, useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
  ScatterChart, Scatter,
  LineChart, Line,
} from "recharts";
import { PresentationChartBarIcon } from "@heroicons/react/24/outline";
import type { Product } from "my-types";
import { getAllProducts } from "../api/productapi";

const inputClass = "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";
const labelClass = "block text-xs font-medium text-gray-600 mb-1";

const COLORS = [
  "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16",
];

const KpiCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
    <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const ChartCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-800 mb-4">{title}</h3>
    {children}
  </div>
);

const DashboardPage: React.FC = () => {

    // states
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPriceStr, setMaxPriceStr] = useState("");
    const [minRating, setMinRating] = useState(0);
    const [maxRating, setMaxRating] = useState(10);

    // load
    useEffect(() => {
        getAllProducts().then(setProducts);
    }, []);
  
    const categories = useMemo(
        () => [...new Set(products.map((p) => p.category.title))].sort(),
        [products]
    );

    // filter
    const filtered = useMemo(() => {
    const maxPrice = maxPriceStr === "" ? Infinity : Number(maxPriceStr);
    return products.filter(
        (p) =>
        (selectedCategory === "all" || p.category.title === selectedCategory) &&
        p.price >= minPrice &&
        p.price <= maxPrice &&
        p.rating >= minRating &&
        p.rating <= maxRating
    );
    }, [products, selectedCategory, minPrice, maxPriceStr, minRating, maxRating]);

    // stats
    const totalProducts   = filtered.length;
    const uniqueCategories = new Set(filtered.map((p) => p.category.title)).size;

    const avgPrice = filtered.length > 0
    ? filtered.reduce((s, p) => s + p.price, 0) / filtered.length
    : 0;

    const avgRating = filtered.length > 0
    ? filtered.reduce((s, p) => s + p.rating, 0) / filtered.length
    : 0;

    // transform
    const countByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.forEach((p) => {
        map[p.category.title] = (map[p.category.title] || 0) + 1;
    });
    return Object.entries(map)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
    }, [filtered]);

    const scatterData = useMemo(
        () => filtered.map((p) => ({ price: p.price, rating: p.rating, name: p.title })),
        [filtered]
    );

    const avgPriceByCategory = useMemo(() => {
    const map: Record<string, { sum: number; count: number }> = {};
    filtered.forEach((p) => {
        if (!map[p.category.title]) map[p.category.title] = { sum: 0, count: 0 };
        map[p.category.title].sum += p.price;
        map[p.category.title].count += 1;
    });
    return Object.entries(map)
        .map(([name, { sum, count }]) => ({
        name,
        avgPrice: Math.round((sum / count) * 100) / 100,
        }))
        .sort((a, b) => b.avgPrice - a.avgPrice);
    }, [filtered]);

    // filter functions
    const handleReset = () => {
        setSelectedCategory("all");
        setMinPrice(0);
        setMaxPriceStr("");
        setMinRating(0);
        setMaxRating(10);
    };

    return (
        <>
        
            {/* Header */}
            <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 rounded-lg flex items-center gap-2">
                <PresentationChartBarIcon className="h-4 w-4 text-blue-700" />
                <p className="text-sm font-semibold text-blue-900">Dashboard</p>
            </div>

            {/* Filters */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm px-4 py-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Filters</h2>
                <div className="flex flex-wrap gap-4 items-end">
                    
                    {/*Categories*/}
                    <div>
                        <label className={labelClass}>Category</label>
                        <select
                        className={inputClass + " w-44"}
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                        <option value="all">All categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                        </select>
                    </div>
                    
                    {/*Min price*/}
                    <div>
                        <label className={labelClass}>Min price ($)</label>
                        <input
                        type="number"
                        min={0}
                        className={inputClass + " w-28"}
                        value={minPrice || ""}
                        onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
                        placeholder="0"
                        />
                    </div>

                    
                    {/*Max price*/}
                    <div>
                        <label className={labelClass}>Max price ($)</label>
                        <input
                        type="number"
                        min={0}
                        className={inputClass + " w-28"}
                        value={maxPriceStr}
                        onChange={(e) => setMaxPriceStr(e.target.value)}
                        placeholder="No limit"
                        />
                    </div>
                    
                    {/*Min rating*/}
                    <div>
                        <label className={labelClass}>Min Rating</label>
                        <input
                        type="number"
                        min={0}
                        max={10}
                        className={inputClass + " w-28"}
                        value={minRating || ""}
                        onChange={(e) => setMinRating(Number(e.target.value) || 0)}
                        placeholder="0"
                        />
                    </div>

                    {/*Max rating*/}
                    <div>
                        <label className={labelClass}>Max Rating</label>
                        <input
                        type="number"
                        min={0}
                        max={10}
                        className={inputClass + " w-28"}
                        value={maxRating || ""}
                        onChange={(e) => setMaxRating(Number(e.target.value) || 10)}
                        placeholder="10"
                        />
                    </div>



                    <button
                        onClick={handleReset}
                        className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                        Reset
                    </button>

                </div>
            </div>

            
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <KpiCard label="Total Products"  value={String(totalProducts)} />
                <KpiCard label="Categories"      value={String(uniqueCategories)} />
                <KpiCard label="Avg. Price"      value={`$${avgPrice.toFixed(2)}`} />
                <KpiCard label="Avg. Rating"     value={`${avgRating.toFixed(1)} / 5`} />
            </div>

            {/*Grid*/}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

                {/* Bar Graph */}
                <ChartCard title="Products per Category">
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={countByCategory} margin={{ top: 4, right: 16, left: 0, bottom: 48 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis tick={{ fontSize: 11 }} allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" name="Products" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
                </ChartCard>
                
                {/* Pie Graph */}
                <ChartCard title="Category Distribution">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                    <Pie
                        data={countByCategory}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        outerRadius={90}
                    >
                        {countByCategory.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number | string) => [`${value} products`, "Count"]} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} iconSize={10} />
                    </PieChart>
                </ResponsiveContainer>
                </ChartCard>
                
                
                {/* Scatter Graph */}
                <ChartCard title="Price vs. Rating">
                <ResponsiveContainer width="100%" height={280}>
                    <ScatterChart margin={{ top: 4, right: 16, left: 0, bottom: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="price" name="Price" unit="$" tick={{ fontSize: 11 }}
                        label={{ value: "Price ($)", position: "insideBottom", offset: -14, fontSize: 11, fill: "#6b7280" }}
                    />
                    <YAxis type="number" dataKey="rating" name="Rating" domain={[0, 5]} tick={{ fontSize: 11 }}
                        label={{ value: "Rating", angle: -90, position: "insideLeft", offset: 10, fontSize: 11, fill: "#6b7280" }}
                    />
                    <Tooltip
                        cursor={{ strokeDasharray: "3 3" }}
                        content={({ payload }) => {
                        if (!payload?.length) return null;
                        const d = payload[0].payload as { name: string; price: number; rating: number };
                        return (
                            <div className="bg-white border border-gray-200 rounded p-2 text-xs shadow">
                            <p className="font-medium text-gray-800 mb-1">{d.name}</p>
                            <p className="text-gray-600">Price: ${d.price}</p>
                            <p className="text-gray-600">Rating: {d.rating}</p>
                            </div>
                        );
                        }}
                    />
                    <Scatter data={scatterData} fill="#3b82f6" fillOpacity={0.65} />
                    </ScatterChart>
                </ResponsiveContainer>
                </ChartCard>
                
                {/* Line Graph */}
                <ChartCard title="Avg. Price per Category">
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={avgPriceByCategory} margin={{ top: 4, right: 16, left: 0, bottom: 48 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-35} textAnchor="end" interval={0} />
                    <YAxis tick={{ fontSize: 11 }} unit="$" />
                    <Tooltip formatter={(value: number | string) => [`$${Number(value).toFixed(2)}`, "Avg. Price"]} />
                    <Line
                        type="monotone"
                        dataKey="avgPrice"
                        name="Avg. Price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6", r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    </LineChart>
                </ResponsiveContainer>
                </ChartCard>
            </div>

        </>
    )
}

export default DashboardPage;