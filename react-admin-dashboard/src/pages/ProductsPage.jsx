import { motion } from "framer-motion";

import React, { useState } from "react"; 
import { Upload } from "lucide-react"; 
import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";

import { AlertTriangle, DollarSign, Package, TrendingUp } from "lucide-react";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesTrendChart from "../components/products/SalesTrendChart";
import ProductsTable from "../components/products/ProductsTable";
import DrawingCanvas from "../components/products/Draw";
import data from '../components/common/data.json';


const StatCard_Upload = ({ name, icon: Icon, color }) => {
	const [file, setFile] = useState(null);
	const [uploadVisible, setUploadVisible] = useState(false);  // Hide the upload UI by default
  
	// Handle file selection
	const handleFileChange = (e) => {
	  const selectedFile = e.target.files[0];
	  if (selectedFile) {
		console.log('Selected file:', selectedFile);  // Debug log
		setFile(selectedFile);
	  }
	};
  
	// Handle file upload
	const handleUpload = async () => {
	  console.log('Upload button clicked!');  // Debug log
	  if (file) {
		const formData = new FormData();
		formData.append('image', file);
  
		try {
		  const response = await fetch('http://localhost:5000/upload', {
			method: 'POST',
			body: formData,
		  });
  
		  if (response.ok) {
			alert('Image uploaded successfully!');
			clearUI();  // Reset the UI after a successful upload
		  } else {
			alert('Upload failed.');
		  }
		} catch (error) {
		  console.error('Error uploading image:', error);
		  alert('Upload failed.');
		}
	  }
	};
  
	// Clear the UI (reset to original state)
	const clearUI = () => {
	  setFile(null);
	  setUploadVisible(false);
	};
  
	return (
	  <motion.div
		className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 cursor-pointer'
		whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
	  >
		<div className='px-4 py-5 sm:p-6'>
		  <span className='flex items-center text-sm font-medium text-gray-400'>
			<Icon size={20} className='mr-2' style={{ color }} />
			{name}
		  </span>
  
		  {/* Show file input and upload button if upload is visible */}
		  {uploadVisible ? (
			<>
			  <input
				type="file"
				onChange={handleFileChange}
				accept="image/*"
			  />
			  <div className="mt-2 space-x-2">
				{/* Upload Button */}
				<button
				  onClick={handleUpload}
				  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
				>
				  Upload
				</button>
				{/* Clear Button */}
				<button
				  onClick={clearUI}
				  className="px-4 py-2 bg-lightblue-500 text-white rounded-lg hover:bg-lightblue-600 transition duration-200"
				  style={{ backgroundColor: "#ADD8E6" }} // Light blue background color
				>
				  Clear
				</button>
			  </div>
			</>
		  ) : (
			<button onClick={() => setUploadVisible(true)}>Add Document</button>
		  )}
		</div>
	  </motion.div>
	);
  };

const ProductsPage = () => {

	const [productData, setProductData] = useState([
		{ id: 1, name: "Spiral test 1", score: "2", confidence: "0.78", date: "March 1 2024" },
		{ id: 2, name: "Spiral test 2", score: "2", confidence: "0.8", date: "March 22 2024" },
		{ id: 3, name: "Spiral test 3", score: "3", confidence: "0.88", date: "July 1 2024" },
		{ id: 4, name: "Spiral test 4", score: "3", confidence: "0.78", date: "December 22 2024" },
		{ id: 5, name: "Spiral test 5", score: "4", confidence: "0.92", date: "March 1 2025" },
	  ]);

	  const addNewProduct = (newProduct) => {
		setProductData((prev) => [...prev, newProduct]);
	  };


	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Spiral Test' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total tests taken' icon={Package} value={55} color='#6366F1' />
					<StatCard name='Most recent score' icon={TrendingUp} value={4} color='#10B981' />
					<StatCard_Upload name='Upload Spiral Test' icon={Upload} value={data["Stage"]} color='#6366F1' />
				</motion.div>
				<DrawingCanvas addNewProduct={addNewProduct}/>
				<ProductsTable productData={productData} />

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					<SalesTrendChart productData={productData}  />
				</div>
			</main>
		</div>
	);
};
export default ProductsPage;
