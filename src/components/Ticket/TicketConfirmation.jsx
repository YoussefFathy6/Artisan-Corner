import { useState, useEffect } from "react";
import db from '../../Config/firebase';
import { useParams } from "react-router-dom"; 
import emailjs from 'emailjs-com'; 
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import "./TicketStyle.modules.css"
function TicketConfirmation() {
  const { eventId } = useParams();
  const [ticketImageUrl, setTicketImageUrl] = useState("");
  const [userEmail, setUserEmail] = useState(""); 
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (eventId) {
      const ticketDocRef = doc(db, "add event", eventId);
      getDoc(ticketDocRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const ticketImg = docSnap.data().ticketImg;
            setTicketImageUrl(ticketImg);
          } else {
            console.error("No such document!");
          }
        })
        .catch((error) => {
          console.error("Error fetching ticket image URL: ", error);
        });

      const emailQuery = query(
        collection(db, "sendTicket"),
        where("eventId", "==", eventId)
      );
      getDocs(emailQuery)
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            setUserEmail(userDoc.data().email);
          } else {
            console.error("No email found for this event.");
          }
        })
        .catch((error) => {
          console.error("Error fetching email from Firestore:", error);
        });
    }
  }, [eventId]);

  useEffect(() => {
    if (ticketImageUrl && userEmail) {
      emailjs.send('service_0j6gsa6', 'template_fjy76b1', {
        to_Email: userEmail,
        event_id: eventId,
        ticket_image_url: ticketImageUrl,
        from_name: 'ALKHAN',
        from_email: 'hanaamohammed840@gmail.com',
        bcc: '',
        cc: '',
      }, 'hUtqF8AIeJloZc1Rr')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        setEmailSent(true);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
    }
  }, [ticketImageUrl, userEmail, eventId]);

  return (
    <div className="justify-center items-center m-auto p-8   rounded-lg   mt-7">
      <div className="loader">
        <img width={"800px"}   src="..\src\assets\Animation - 1726432938139.gif" alt="" />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🎫 Your Ticket</h1>
        <p className="text-lg text-gray-600">Thank you for your purchase!</p>
      </div>

      <div className="text-center mb-6">
        <p className="text-lg text-gray-600 mb-4">Your ticket has been successfully booked.</p>
        <p className="text-lg text-gray-600">Please check your email for further details.</p>
      </div>

      <div className="text-center">
        {emailSent ? (
          <p className="mt-2 text-green-500">Ticket has been sent to your email!</p>
        ) : (
          <p className="text-gray-600">Sending your ticket...</p>
        )}
      </div>
    </div>
  );
}

export default TicketConfirmation;
