import { Hospital, ShoppingBag, Users, Zap, CalendarDays, PrinterCheck, Upload} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from 'react';

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import data from '../components/common/data.json';


const StatCard_Profile = ({ name, icon: Icon, patient_name, patient_age, patient_dob, color }) => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
		>
			<div className='px-4 py-5 sm:p-6'>
				<span className='flex items-center text-sm font-medium text-gray-400'>
					<Icon size={20} className='mr-2' style={{ color }} />
					{name}
				</span>
				<p className='mt-1 text-3xl font-semibold text-gray-100'>{patient_name}</p>
				<h2>{patient_dob}, {patient_age} years old</h2>
			</div>
		</motion.div>
	);
};

const StatCard_Clinic = ({ name, icon: Icon, color }) => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
		>
			<div className='px-4 py-5 sm:p-6'>
				<span className='flex items-center text-sm font-medium text-gray-400'>
					<Icon size={20} className='mr-2' style={{ color }} />
					{name}
				</span>
				<p className='mt-1 text-3xl font-semibold text-gray-100'>MedStar Georgetown</p>
				<a href="https://www.medstarhealth.org/locations/medstar-georgetown-university-hospital" target="_blank" rel="noopener noreferrer">
					Click to visit Clinic Website
				</a>
				<h2></h2>
			</div>
		</motion.div>
	);
};

const StatCard_Visits = ({ name, icon: Icon, color, visits }) => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
		>
			<div className='px-4 py-5 sm:p-6'>
				<span className='flex items-center text-sm font-medium text-gray-400'>
					<Icon size={20} className='mr-2' style={{ color }} />
					{name}
				</span>

				{/* Scrollable List */}
				<div className="mt-4 max-h-48 overflow-y-auto space-y-3 pr-2">
					{visits.map((visit, index) => (
						<div key={index} className="p-3 bg-gray-900 rounded-lg">
							<p className="text-sm text-gray-100">
								<strong>{visit.visit_date}</strong> - {visit.specialist}
							</p>
							<p className="text-xs text-gray-400">🩺 {visit.reason_for_visit}</p>
							<p className="text-xs text-gray-500">📝 {visit.notes}</p>
						</div>
					))}
				</div>
			</div>
		</motion.div>
	);
};

const StatCard_Fax = ({ name, icon: Icon, color }) => {
	const handleClick = () => {
		alert("All medical documents have been faxed to your clinic. A confirmation has been sent to you email.");
	};

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700 cursor-pointer'
			whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
			onClick={handleClick} // Click event triggers alert
		>
			<div className='px-4 py-5 sm:p-6'>
				<span className='flex items-center text-sm font-medium text-gray-400'>
					<Icon size={20} className='mr-2' style={{ color }} />
					{name}
				</span>
			</div>
		</motion.div>
	);
};

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
  
  
  


const OverviewPage = () => {
	return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Overview' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard_Profile name='Patient' icon={Users} patient_name={data["Name"]} patient_age={data["Age"]} patient_dob={data["DOB"]} color='#8B5CF6' />
					<StatCard name='Diagnosis' icon={Zap} value={data["Stage"]} color='#6366F1' />
					<StatCard_Clinic name='Clinic' icon={Hospital} value='567' color='#EC4899' />
					<StatCard_Visits name='Visits' icon={CalendarDays} visits={data["Doctor_Visits"]} color='#EC4899' />
					<StatCard_Fax name='Fax documents to clinic' icon={PrinterCheck} value={data["Stage"]} color='#6366F1' />
					<StatCard_Upload name='Upload Spiral Test' icon={Upload} value={data["Stage"]} color='#6366F1' />

				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
				</div>
			</main>
		</div>
	);
};
export default OverviewPage;
