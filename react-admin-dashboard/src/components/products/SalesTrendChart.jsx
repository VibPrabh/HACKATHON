// SalesTrendChart.jsx
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const SalesTrendChart = ({ productData }) => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className="text-lg font-medium mb-4 text-gray-100">
				Micrographia Severity (UPDRS-Motor)
			</h2>
			<div className="h-80">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={productData}>
						<CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
						<XAxis dataKey="date" stroke="#9ca3af" />
						<YAxis stroke="#9ca3af" />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type="monotone"
							dataKey="score"
							stroke="#6366F1"
							strokeWidth={3}
							dot={(props) => {
								const { cx, cy, index } = props;
								return (
									<circle
										cx={cx}
										cy={cy}
										r={6}
										fill={index === 1 ? "red" : "#6366F1"}
										stroke="white"
										strokeWidth={2}
									/>
								);
							}}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesTrendChart;
