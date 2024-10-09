import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import emailjs from 'emailjs-com';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import db from '../../Config/firebase';
import "./TicketStyle.modules.css"
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
            const eventImageUrl = data.eventImg;
            seteventImageUrl(eventImageUrl);
            setEventDetails(data);

            const eventDateTime = new Date(`${data.date} ${data.time}`);
            setMeetingStartTime(eventDateTime);

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
          } else {
            console.error("No such event!");
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
      const { name, eventImg, date, time } = eventDetails;
      emailjs.send('service_0q4y7cx', 'template_8phzq4h', {
        to_Email: userEmail,
        event_name: name,
        event_image: eventImg,
        event_date: new Date(date).toLocaleString(),
        event_time: time,
        from_name: 'HandiCraft',
        from_email: 'hanaamohammed840@gmail.com',
        message: 'Please join the event room when the event starts.',
      }, 'hUtqF8AIeJloZc1Rr')
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
    if (milliseconds <= 0) {
      return { hours: '00', minutes: '00', seconds: '00' };
    }
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return {
      hours: String(hours).padStart(2, '0'),
      minutes: String(minutes).padStart(2, '0'),
      seconds: String(seconds).padStart(2, '0'),
    };
  };

  const time = formatTimeRemaining(timeRemaining);

  return (
    <div className="  p-8     mt-7 ">
      <div>
        {!showMeeting ? (
          <div>
            {timeRemaining !== null && (
              <div className="text-center mb-4">
                {timeRemaining > 0 ? (
                  <div>
                  <h1 className="text-4xl text-red-900 font-semibold mb-9">The Meeting Will Start After:</h1>
                  
                  <p className="text-5xl font-bold flex items-center justify-center space-x-4">
                    <span className={`text-gray-600 ${time.hours !== '00' ? 'flipInUp' : ''}`}>
                      {time.hours} h
                    </span>
                    <span>:</span>
                    <span className={`text-gray-600 ${time.minutes !== '00' ? 'flipInUp' : ''}`}>
                      {time.minutes} m
                    </span>
                    <span>:</span>
                    <span className="text-gray-600 flipInUp">
                      {time.seconds} s
                    </span>
                  </p>
<div className="scene">
  <div className="forest">
    <div className="tree tree1">
      <div className="branch branch-top"></div>
      <div className="branch branch-middle"></div>
    </div>

    <div className="tree tree2">
      <div className="branch branch-top"></div>
      <div className="branch branch-middle"></div>
      <div className="branch branch-bottom"></div>
    </div>

    <div className="tree tree3">
      <div className="branch branch-top"></div>
      <div className="branch branch-middle"></div>
      <div className="branch branch-bottom"></div>
    </div>

    <div className="tree tree4">
      <div className="branch branch-top"></div>
      <div className="branch branch-middle"></div>
      <div className="branch branch-bottom"></div>
    </div>

    <div className="tree tree5">
      <div className="branch branch-top"></div>
      <div className="branch branch-middle"></div>
      <div className="branch branch-bottom"></div>
    </div>

    <div className="tree tree6">
      <div className="branch branch-top"></div>
      <div className="branch branch-middle"></div>
      <div className="branch branch-bottom"></div>
    </div>

    <div className="tree tree7">
      <div className="branch branch-top"></div>
      <div className="branch branch-middle"></div>
      <div className="branch branch-bottom"></div>
    </div>
  </div>
  
  <div className="tent">
      <div className="roof"></div>
      <div className="roof-border-left">
        <div className="roof-border roof-border1"></div>
        <div className="roof-border roof-border2"></div>
        <div className="roof-border roof-border3"></div>
      </div>
      <div className="entrance">
        <div className="door left-door">
          <div className="left-door-inner"></div>
        </div>
        <div className="door right-door">
          <div className="right-door-inner"></div>
        </div>
      </div>
    </div>

  <div className="floor">
      <div className="ground ground1"></div>
      <div className="ground ground2"></div>
    </div>
  
  <div className="fireplace">
    <div className="support"></div>
    <div className="support"></div>
    <div className="bar"></div>
    <div className="hanger"></div>
    <div className="smoke"></div>
    <div className="pan"></div>
    <div className="fire">
      <div className="line line1">
        <div className="particle particle1"></div>
        <div className="particle particle2"></div>
        <div className="particle particle3"></div>
        <div className="particle particle4"></div>
      </div>
      <div className="line line2">
        <div className="particle particle1"></div>
        <div className="particle particle2"></div>
        <div className="particle particle3"></div>
        <div className="particle particle4"></div>
      </div>
      <div className="line line3">
        <div className="particle particle1"></div>
        <div className="particle particle2"></div>
        <div className="particle particle3"></div>
        <div className="particle particle4"></div>
      </div>
    </div>
  </div>
  
  <div className="time-wrapper">
    <div className="time">
      <div className="day"></div>
      <div className="night">
        <div className="moon"></div>
        <div className="star star1 star-big"></div>
        <div className="star star2 star-big"></div>
        <div className="star star3 star-big"></div>
        <div className="star star4"></div>
        <div className="star star5"></div>
        <div className="star star6"></div>
        <div className="star star7"></div>
      </div>
    </div>
  </div>
</div>


                </div>
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
    </div>
  );
}

export default TicketOnline;
