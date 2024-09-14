import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import emailjs from 'emailjs-com';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import db from '../../Config/firebase';

function TicketOnline() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (eventId) {
      const fetchEventDetails = async () => {
        try {
          // Fetch event details
          const eventDoc = await getDoc(doc(db, "add event", eventId));
          if (eventDoc.exists()) {
            setEventDetails(eventDoc.data());
          } else {
            console.error("No such event!");
          }

          // Fetch user email
          const emailQuery = query(
            collection(db, "sendTicket"),
            where("eventId", "==", eventId)
          );
          const emailSnapshot = await getDocs(emailQuery);
          if (!emailSnapshot.empty) {
            const userDoc = emailSnapshot.docs[0];
            setUserEmail(userDoc.data().email);
          } else {
            console.error("No email found for this event.");
          }
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };

      fetchEventDetails();
    }
  }, [eventId]);

  useEffect(() => {
    if (eventDetails && userEmail) {
      const { name, eventImg, date } = eventDetails;

      emailjs.send('service_0j6gsa6', 'template_fjy76b1', {
        to_Email: userEmail,
        event_name: name,
        event_image: eventImg,
        event_date: new Date(date).toLocaleString(),
        from_name: 'HandiCraft',
        from_email: 'hanaamohammed840@gmail.com',
        message: 'Please join the event room when the event starts.',
      }, 'oHU2f0mLFm9mvleo5')
      .then((response) => {
        console.log('Email successfully sent!', response.status, response.text);
        setEmailSent(true);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
      });
    }
  }, [eventDetails, userEmail]);


  const [showMeeting, setShowMeeting] = useState(false);  

  useEffect(() => {
    if (showMeeting) {
      const domain = "meet.jit.si";
      const options = {
        roomName: "MyCustomRoom",  
        width: "100%",
        height: "600px",
        parentNode: document.getElementById("jitsi-container"),
        configOverwrite: { startWithVideoMuted: true },
        interfaceConfigOverwrite: { filmStripOnly: false },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        api.dispose();  
      };
    }
  }, [showMeeting]);

  const handleStartMeeting = () => {
    setShowMeeting(true);  
  };



  return (
    <div className="container mx-auto p-8 max-w-lg bg-white rounded-lg border border-gray-200 mt-7">
  <div>
      {!showMeeting ? (
        <button onClick={handleStartMeeting}>Start Video Call</button>  
      ) : (
        <div id="jitsi-container" style={{ height: '600px', width: '100%' }} />
      )}
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

export default TicketOnline;
