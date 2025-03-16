import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const PRODUCT_DATA = [
	{ id: 1, name: "Spiral test 1", score: "2", confidence: "0.78", date: "March 1 2024"},
	{ id: 2, name: "Spiral test 2", score: "2", confidence: "0.8",  date: "March 22 2024"},
	{ id: 3, name: "Spiral test 3", score: "3", confidence: "0.88",  date: "July 1 2024"},
	{ id: 4, name: "Spiral test 4", score: "3", confidence: "0.78", date: "December 22 2024"},
	{ id: 5, name: "Spiral test 5", score: "4", confidence: "0.92", date: "March 1 2025"},
];


const SalesOverviewChart = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-gray-100'>Micrographia Severity (UPDRS-Motor)</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={PRODUCT_DATA}>
						<CartesianGrid strokeDasharray='3 3' stroke='#4B5563' />
						<XAxis dataKey={"date"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Line
							type='monotone'
							dataKey='score'
							stroke='#6366F1'
							strokeWidth={3}
							dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesOverviewChart;
