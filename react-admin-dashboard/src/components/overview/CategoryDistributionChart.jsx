import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import data from '../common/data.json';

const categoryData = [
	{ name: "Electronics", value: 4500 },
	{ name: "Clothing", value: 3200 },
	{ name: "Home & Garden", value: 2800 },
	{ name: "Books", value: 2100 },
	{ name: "Sports & Outdoors", value: 1900 },
];

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const CategoryDistributionChart = () => {
	return (
		<motion.div
			className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full max-w-xl"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			{/* Medication List - Fitting the Whole Box */}
			<h3 className="text-lg font-medium mt-6 mb-4 text-gray-100">Current Medications</h3>
			<ul className="list-disc list-inside text-gray-300 space-y-2">
				{data.Medications.map((med, index) => (
					<li key={index}>
						<strong>{med.medication}</strong>
						<ul className="ml-4 list-none text-gray-400">
							<li>💊 <b>Dose:</b> {med.dose}</li>
							<li>⏰ <b>Frequency:</b> {med.frequency}</li>
							<li>📅 <b>Start Date:</b> {med.start_date}</li>
							<li>🔄 <b>Last Update:</b> {med.last_update}</li>
						</ul>
					</li>
				))}
			</ul>
		</motion.div>
	);
};

export default CategoryDistributionChart;
