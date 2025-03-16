import { motion } from "framer-motion";
import { ResponsiveContainer } from "recharts";
import data from '../common/data.json'; // Make sure the data is correctly imported

const SalesByCategoryChart = ({ testname, metric, score }) => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold text-gray-100 mb-4 text-center">
        {testname.replace(/_/g, " ")}
      </h2>

      <div style={{ width: "100%", height: "300px", overflowY: "auto" }}>
        <ResponsiveContainer>
          {/* Table of Cognitive Assessments */}
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Test
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {data[testname].map((assessment, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`${
                    index % 2 === 0 ? "bg-gray-600" : "bg-gray-700"
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 text-center">
                    {assessment[metric].replace(/_/g, " ")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 text-center">
                    {assessment[score]}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 text-center">
                    {assessment.date}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesByCategoryChart;
