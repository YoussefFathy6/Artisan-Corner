import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import emailjs from 'emailjs-com';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import db from '../../Config/firebase';

function TicketOnline() {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);  
  const [eventImageUrl, seteventImageUrl] = useState("");

  const [userEmail, setUserEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [showMeeting, setShowMeeting] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [meetingStartTime, setMeetingStartTime] = useState(null); 



  
  useEffect(() => {
    if (eventId) {
      const fetchEventDetails = async () => {
        try {
   
          const eventDoc = await getDoc(doc(db, "add event", eventId));
          if (eventDoc.exists()) {
            const data = eventDoc.data();

      const eventImageUrl=eventDoc.data().eventImg;
      seteventImageUrl(eventImageUrl);

            setEventDetails(data);

   
            const eventDateTime = new Date(`${data.date} ${data.time}`);
            setMeetingStartTime(eventDateTime);  

          } else {
            console.error("No such event!");
          }

     
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
      const { name, eventImg, date ,time } = eventDetails;

   
      emailjs.send('service_0q4y7cx', 'template_8phzq4h', {
        to_Email: userEmail,
        event_name: name,
        event_image: eventImg,


        event_date: new Date(date).toLocaleString(),
        event_time:time,
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

  useEffect(() => {
    if (meetingStartTime) {
      const updateRemainingTime = () => {
        const now = new Date();
        const timeDiff = meetingStartTime - now;
        if (timeDiff <= 0) {
          setTimeRemaining(0);
          setShowMeeting(true); 
        } else {
          setTimeRemaining(timeDiff);
        }
      };

      const timer = setInterval(updateRemainingTime, 1000);

      return () => clearInterval(timer);
    }
  }, [meetingStartTime]);

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

  const formatTimeRemaining = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="container mx-auto p-8 max-w-lg bg-white rounded-lg border border-gray-200 mt-7">
      <div>
        {!showMeeting ? (
          <div>
            {timeRemaining !== null && (
              <div className="text-center mb-4">
                {timeRemaining > 0 ? (
                  <p className="text-gray-600">Time until meeting starts: {formatTimeRemaining(timeRemaining)}</p>
                ) : (
                  <p className="text-gray-600">Starting meeting...</p>
                )}
              </div>
            )}
            {timeRemaining === 0 && (  
              <button onClick={handleStartMeeting} className="btn btn-primary">Start Video Call</button>
            )}
          </div>
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
