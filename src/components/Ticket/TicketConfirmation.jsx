import { useState, useEffect } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./../../Config/firebase";
import { useParams } from "react-router-dom";
import emailjs from 'emailjs-com'; 

function TicketConfirmation() {
  const { eventId } = useParams();
  const [ticketImageUrl, setTicketImageUrl] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    console.log('Fetching image URL for event:', eventId);
    if (eventId) {
      const ticketImageRef = ref(storage, `ticketimg/${eventId}.jpg`);
      console.log('Image Reference Path:', ticketImageRef.fullPath); 
      getDownloadURL(ticketImageRef)
        .then((url) => {
          console.log('Ticket Image URL:', url);
          setTicketImageUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching ticket image URL: ", error);
        });
    } else {
      console.error('No event ID provided.');
    }
  }, [eventId]);

  const sendTicketByEmail = () => {
    if (ticketImageUrl) {
      emailjs.send('service_0j6gsa6', 'template_fjy76b1', {
        event_id: eventId,
        ticket_image_url: ticketImageUrl,
      }, 'oHU2f0mLFm9mvleo5')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        setEmailSent(true);
      }, (error) => {
        console.error('Failed to send email:', error);
      });
    } else {
      console.log('No ticket image URL available.');
    }
  };

  return (
    <div>
      <h1>Your Ticket</h1>
      {ticketImageUrl ? (
        <>
          <img src={ticketImageUrl} alt="Ticket" />
          <button 
            onClick={sendTicketByEmail}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            Send Ticket to Email
          </button>
          {emailSent && <p className="mt-2 text-green-500">Ticket has been sent to your email!</p>}
        </>
      ) : (
        <p>No ticket image available.</p>
      )}
    </div>
  );
}

export default TicketConfirmation;
