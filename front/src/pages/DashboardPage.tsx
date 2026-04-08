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
