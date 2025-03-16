// import { motion } from "framer-motion";
// import { Edit, Search, Trash2 } from "lucide-react";
// import { useState } from "react";

// const PRODUCT_DATA = [
// 	{ id: 1, name: "Spiral test 1", score: "2", confidence: "0.78", date: "March 1 2024"},
// 	{ id: 2, name: "Spiral test 2", score: "2", confidence: "0.8",  date: "March 22 2024"},
// 	{ id: 3, name: "Spiral test 3", score: "3", confidence: "0.88",  date: "July 1 2024"},
// 	{ id: 4, name: "Spiral test 4", score: "3", confidence: "0.78", date: "December 22 2024"},
// 	{ id: 5, name: "Spiral test 5", score: "4", confidence: "0.92", date: "March 1 2025"},
// ];

// const ProductsTable = () => {
// 	const [searchTerm, setSearchTerm] = useState("");
// 	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

// 	const handleSearch = (e) => {
// 		const term = e.target.value.toLowerCase();
// 		setSearchTerm(term);
// 		const filtered = PRODUCT_DATA.filter(
// 			(product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
// 		);

// 		setFilteredProducts(filtered);
// 	};

// 	return (
// 		<motion.div
// 			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
// 			initial={{ opacity: 0, y: 20 }}
// 			animate={{ opacity: 1, y: 0 }}
// 			transition={{ delay: 0.2 }}
// 		>
// 			<div className='flex justify-between items-center mb-6'>
// 				<h2 className='text-xl font-semibold text-gray-100'>Take your spiral test on the computer</h2>
// 				<div className='relative'>
// 					<input
// 						type='text'
// 						placeholder='Search test'
// 						className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
// 						onChange={handleSearch}
// 						value={searchTerm}
// 					/>
// 					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
// 				</div>
// 			</div>

// 			<div className='overflow-x-auto'>
// 				<table className='min-w-full divide-y divide-gray-700'>
// 					<thead>
// 						<tr>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Test Number
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Score
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Confidence
// 							</th>
// 							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
// 								Date Taken
// 							</th>
// 						</tr>
// 					</thead>

// 					<tbody className='divide-y divide-gray-700'>
// 						{filteredProducts.map((product) => (
// 							<motion.tr
// 								key={product.id}
// 								initial={{ opacity: 0 }}
// 								animate={{ opacity: 1 }}
// 								transition={{ duration: 0.3 }}
// 							>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center'>
// 									{product.name}
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 									{product.score}
// 								</td>

// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 									{product.confidence}
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 									{product.date}
// 								</td>
// 								<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
// 									{/* <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
// 										<Edit size={18} />
// 									</button>
// 									<button className='text-red-400 hover:text-red-300'>
// 										<Trash2 size={18} />
// 									</button> */}
// 								</td>
// 							</motion.tr>
// 						))}
// 					</tbody>
// 				</table>
// 			</div>
// 		</motion.div>
// 	);
// };
// export default ProductsTable;

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

const ProductsTable = ({ productData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productData);

  useEffect(() => {
    setFilteredProducts(productData);
  }, [productData]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = productData.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          Take your spiral test on the computer
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search test"
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Test Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Date Taken
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.score}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.confidence}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {product.date}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;