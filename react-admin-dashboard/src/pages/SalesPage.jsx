import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import { CreditCard, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import SalesOverviewChart from "../components/sales/SalesOverviewChart";
import SalesByCategoryChart from "../components/sales/SalesByCategoryChart";
import DailySalesTrend from "../components/sales/DailySalesTrend";

const salesStats = {
	totalRevenue: "$1,234,567",
	averageOrderValue: "$78.90",
	conversionRate: "3.45%",
	salesGrowth: "12.3%",
};


const SalesPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Assessments' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<SalesByCategoryChart testname="Cognitive_Assessments" metric="test" score = "score" />
					<SalesByCategoryChart testname="Speech_Assessment" metric="metric" score = "value" />
					<SalesByCategoryChart testname="Motor_Function"  metric = "metric" score = "value" />
					<SalesByCategoryChart testname="ADL_Scores" metric = "metric" score = "score" />
					<SalesByCategoryChart testname="Cognitive_Fluctuations" metric = "time_of_day" score = "cognitive_status" />
					<SalesByCategoryChart testname="Sleep_Patterns"  metric = "metric" score = "value" />
					<SalesByCategoryChart testname="Physical_Therapy_Progress"  metric = "metric" score = "value"/>
				</div>
			</main>
		</div>
	);
};
export default SalesPage;
