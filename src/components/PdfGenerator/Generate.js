import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
const generatePDF = (images, text) => {
  // images.push(
  //   "http://res.cloudinary.com/dgmvs5fih/image/upload/v1706632226/a0vwq7arguafp7wd2abk.jpg"
  // );
  // images.push(
  //   "http://res.cloudinary.com/dgmvs5fih/image/upload/v1706632226/a0vwq7arguafp7wd2abk.jpg"
  // );
  // images.push(
  //   "http://res.cloudinary.com/dgmvs5fih/image/upload/v1706632226/a0vwq7arguafp7wd2abk.jpg"
  // );
  // images.push(
  //   "http://res.cloudinary.com/dgmvs5fih/image/upload/v1706632226/a0vwq7arguafp7wd2abk.jpg"
  // );

  console.log(images);
  console.log(images.length);

  const doc = new jsPDF();



  // Calculate total height required for images
  let totalImageHeight = 0;
  if (Math.ceil(images.length / 2) % 3 === 0) {
    totalImageHeight = 3 * 70 + 20;
  }
  else {
    totalImageHeight = ((Math.ceil(images.length / 2)) % 3) * 70 + 20;
  }// Height for images plus some spacing

  // Add images to the PDF document
  let temp = 0;
  let names = ["Original", "Otsu", "Adaptive", "SobelX", "SobelY", "Canny", "Clahe"]
  doc.text("Medical Report", 90, 10);
  let temp_str = "Predicted Label: " + text;
  // Add text below the images
  doc.text(temp_str, 40, 20);
  images.forEach((image, index) => {

    if (index % 6 === 0 && index !== 0) {
      temp = 0;
      doc.addPage();
    }
    doc.addImage(
      image,
      "JPEG",
      40 + (index % 2) * 70,
      25 + Math.floor(temp / 2) * 70,
      60,
      50
    );
    doc.text(
      names[index],
      40 + (index % 2) * 70,
      25 + 57 + Math.floor(temp / 2) * 70
    );
    temp++; // Adjust image size and positioning as needed
  });
  // let temp_str="Predicted Label: "+text;
  //   // Add text below the images
  //   doc.text(temp_str, 40, totalImageHeight + 10);

  // Save the PDF
  doc.save("report.pdf");
};


const Generate = ({ images, text }) => {


  const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "bold",
    marginRight: "10px",
  };

  return (
    <div>
      <button style={buttonStyle} onClick={() => generatePDF(images, text)}>
        Generate Report
      </button>
    </div>
  );
};

export default Generate;
