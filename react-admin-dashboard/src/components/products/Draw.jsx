// import React, { useRef, useState, useEffect } from 'react';

// const DrawingCanvas = () => {
//   const canvasRef = useRef(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

//   // Use Effect to load any saved image
//   useEffect(() => {
//     const savedImage = localStorage.getItem('drawingImage');
//     if (savedImage) {
//       const canvas = canvasRef.current;
//       const ctx = canvas?.getContext('2d');
//       if (canvas && ctx) {
//         const img = new Image();
//         img.src = savedImage;
//         img.onload = () => {
//           ctx.clearRect(0, 0, canvas.width, canvas.height);
//           ctx.drawImage(img, 0, 0);
//         };
//       }
//     }
//   }, []);

//   // Function to start drawing
//   const startDrawing = (e) => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       setIsDrawing(true);
//       const rect = canvas.getBoundingClientRect();
//       setLastPos({
//         x: e.clientX - rect.left,
//         y: e.clientY - rect.top,
//       });

//       // Set the white background when starting the drawing
//       ctx.fillStyle = 'white';
//       ctx.fillRect(0, 0, canvas.width, canvas.height);  // White background
//     }
//   };

//   // Function to draw on the canvas
//   const draw = (e) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       const rect = canvas.getBoundingClientRect();
//       const currentX = e.clientX - rect.left;
//       const currentY = e.clientY - rect.top;

//       ctx.beginPath();
//       ctx.moveTo(lastPos.x, lastPos.y);
//       ctx.lineTo(currentX, currentY);
//       ctx.strokeStyle = 'black'; // Black color for drawing
//       ctx.lineWidth = 2;
//       ctx.lineCap = 'round';
//       ctx.stroke();
//       setLastPos({ x: currentX, y: currentY });
//     }
//   };

//   // Stop drawing
//   const stopDrawing = () => {
//     setIsDrawing(false);
//   };

//   // Clear the canvas
//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const ctx = canvas.getContext('2d');
//       if (ctx) {
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//       }
//     }
//   };

//   // Save the canvas as an image and send it to the backend
//   const saveAndSendImage = () => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       const dataUrl = canvas.toDataURL('image/png'); // Convert canvas to PNG
  
//       // Send image to the backend
//       fetch('http://localhost:5000/upload_drawing', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ image: dataUrl }), // Send base64 image
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           console.log('Success:', data);
  
//           // Check if the response has a result and display it in an alert
//           if (data.classification && data.confidence) {
//             alert(`Prediction: ${data.classification}\nConfidence: ${data.confidence}`);
//           } else if (data.error) {
//             alert(`Error: ${data.error}`);
//           }
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           alert('An error occurred while uploading the image.');
//         });
//     }
//   };
  

//   return (
//     <div>
//       <h1 className="text-3xl font-extrabold mb-6 text-center">
//         Draw a spiral from its center outward by hand
//       </h1>
//       <div className="flex w-[54vw] items-center m-auto mb-6 justify-center bg-gray-800 px-6 py-6 rounded-3xl">
//         <div>
//           <canvas
//             ref={canvasRef}
//             width={512}
//             height={512}
//             className="border border-zinc-900 bg-white rounded-3xl"
//             onMouseDown={startDrawing}
//             onMouseMove={draw}
//             onMouseUp={stopDrawing}
//             onMouseLeave={stopDrawing}
//           ></canvas>
//           <br />
//           <div className="flex gap-8 items-center justify-center">
//             {/* Save and Send Image Button */}
//             <button
//               onClick={saveAndSendImage}
//               className="px-4 py-2 ml-22 flex rounded-full text-sm font-medium transition-all duration-300 bg-orange-800 text-white/70 hover:bg-purple-700 hover:text-white"
//             >
//               Save and Send Image
//             </button>

//             {/* Clear Canvas Button */}
//             <button
//               onClick={clearCanvas}
//               className="px-4 py-2 flex rounded-full text-sm font-medium transition-all duration-300 bg-purple-800 text-white/70 hover:bg-orange-700 hover:text-white"
//             >
//               Clear
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const PRODUCT_DATA = [
// 	{ id: 1, name: "Spiral test 1", score: "2", confidence: "0.78", date: "March 1 2024"},
// 	{ id: 2, name: "Spiral test 2", score: "2", confidence: "0.8",  date: "March 22 2024"},
// 	{ id: 3, name: "Spiral test 3", score: "3", confidence: "0.88",  date: "July 1 2024"},
// 	{ id: 4, name: "Spiral test 4", score: "3", confidence: "0.78", date: "December 22 2024"},
// 	{ id: 5, name: "Spiral test 5", score: "4", confidence: "0.92", date: "March 1 2025"},
// ];

// export default DrawingCanvas;

import React, { useRef, useState, useEffect } from 'react';

const DrawingCanvas = ({addNewProduct}) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  // Use Effect to load any saved image
  useEffect(() => {
    const savedImage = localStorage.getItem('drawingImage');
    if (savedImage) {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
        const img = new Image();
        img.src = savedImage;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
      }
    }
  }, []);

  // Function to start drawing
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      setIsDrawing(true);
      const rect = canvas.getBoundingClientRect();
      setLastPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });

      // Set the white background when starting the drawing
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);  // White background
    }
  };

  // Function to draw on the canvas
  const draw = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(currentX, currentY);
      ctx.strokeStyle = 'black'; // Black color for drawing
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.stroke();
      setLastPos({ x: currentX, y: currentY });
    }
  };

  // Stop drawing
  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // Clear the canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  // Save the canvas as an image and send it to the backend
  const saveAndSendImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png'); // Convert canvas to PNG
  
      // Send image to the backend
      fetch('http://localhost:5000/upload_drawing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: dataUrl }), // Send base64 image
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
  
          // Check if the response has a result and display it in an alert
          if (data.classification && data.confidence) {
            const newProduct = {
                id: Date.now(),
                name: `Spiral test ${Date.now()}`,
                score: data.classification,
                confidence: data.confidence,
                date: new Date().toLocaleDateString(),
            }
            addNewProduct(newProduct);
            alert(`Prediction: ${data.classification}\nConfidence: ${data.confidence}`);
          } else if (data.error) {
            alert(`Error: ${data.error}`);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('An error occurred while uploading the image.');
        });
    }
  };
  

  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-6 text-center">
        Draw a spiral from its center outward by hand
      </h1>
      <div className="flex w-[54vw] items-center m-auto mb-6 justify-center bg-gray-800 px-6 py-6 rounded-3xl">
        <div>
          <canvas
            ref={canvasRef}
            width={512}
            height={512}
            className="border border-zinc-900 bg-white rounded-3xl"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          ></canvas>
          <br />
          <div className="flex gap-8 items-center justify-center">
            {/* Save and Send Image Button */}
            <button
              onClick={saveAndSendImage}
              className="px-4 py-2 ml-22 flex rounded-full text-sm font-medium transition-all duration-300 bg-orange-800 text-white/70 hover:bg-purple-700 hover:text-white"
            >
              Save and Send Image
            </button>

            {/* Clear Canvas Button */}
            <button
              onClick={clearCanvas}
              className="px-4 py-2 flex rounded-full text-sm font-medium transition-all duration-300 bg-purple-800 text-white/70 hover:bg-orange-700 hover:text-white"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const PRODUCT_DATA = [
	{ id: 1, name: "Spiral test 1", score: "2", confidence: "0.78", date: "March 1 2024"},
	{ id: 2, name: "Spiral test 2", score: "2", confidence: "0.8",  date: "March 22 2024"},
	{ id: 3, name: "Spiral test 3", score: "3", confidence: "0.88",  date: "July 1 2024"},
	{ id: 4, name: "Spiral test 4", score: "3", confidence: "0.78", date: "December 22 2024"},
	{ id: 5, name: "Spiral test 5", score: "4", confidence: "0.92", date: "March 1 2025"},
];

export default DrawingCanvas;
