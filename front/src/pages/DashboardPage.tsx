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
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPriceStr, setMaxPriceStr] = useState("");

}

export default DashboardPage;