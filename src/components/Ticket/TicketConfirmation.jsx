import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./../../Config/firebase";

function TicketConfirmation() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const imageRef = ref(storage, 'eventimg/images (3).jpg');

    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching image URL: ", error);
      });
  }, []);

  const handleDownload = () => {
    if (imageUrl) {
      // Create a new link element
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "ticket-image.jpg"; // Specify the file name

      // Append the link to the body
      document.body.appendChild(link);
      link.click();
      
      // Remove the link from the body
      document.body.removeChild(link);
    } else {
      console.log("No image URL available for download.");
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-lg bg-white rounded-lg border border-gray-200 mt-7">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🎫 Your Ticket</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase!</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-600 mb-4">Your ticket has been successfully booked.</p>
      </div>

      {/* Download Button */}
      {imageUrl ? (
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
            onClick={handleDownload}
          >
            Download Ticket
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-600">Loading...</div>
      )}
    </div>
  );
}

export default TicketConfirmation;
