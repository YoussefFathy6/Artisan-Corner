import { useState, useEffect } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Carousel } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

function Ticket() {
  const location = useLocation();
  const event = location.state?.event || {};
  const ticketPrice = event.pricetacket || 1;
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(ticketPrice);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const [otherEvents, setOtherEvents] = useState([]);
  const navigate = useNavigate();
  const db = getFirestore(); 

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "add event"));
        const events = querySnapshot.docs.map(doc => ({
          id: doc.id, 
          ...doc.data() 
        }));
        setOtherEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [db]);
  

  const increaseCount = () => {
    setCount(count + 1);
    setTotal((count + 1) * ticketPrice);
  };

  const decreaseCount = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    setTotal(newCount * ticketPrice);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmission = async () => {
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email.");
      return false;
    }
    try {
      await addDoc(collection(db, "sendTicket"), {
        email: email,
        eventId: event.id,
      });
      console.log("Email saved to Firestore successfully!");
      return true;
    } catch (error) {
      console.error("Error adding email to Firestore:", error);
      return false;
    }
  };

  const handlePayment = async (event) => {
    event.preventDefault();
    
    const emailSubmitted = await handleEmailSubmission();
    if (!emailSubmitted) return;

    console.log(`Paying ${total} with Visa`);
    setShowModal(false);
  };

  const handlePayPalSuccess = async (data, actions) => {
    try {
      await actions.order.capture();
      console.log("Payment approved and captured");
      
      const platformFee = total * 0.10;
      const userAmount = total - platformFee;
      console.log("User Amount after platform fee:", userAmount);
      
      const emailSubmitted = await handleEmailSubmission();
      if (emailSubmitted) {
        if (event.eventtype === "online") {
          navigate(`/TicketOnline/${event.id}`);
        } else {
          navigate(`/TicketConfirmation/${event.id}`);
        }
      }
    } catch (error) {
      console.error("Error capturing payment or calculating fees:", error);
      alert("There was an issue processing your payment. Please try again later.");
    }
  };

  return (
    <>
      <h1 className="capitalize font-bold text-3xl m-5">{event.name}</h1>

      <section className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 p-4">
          <img src=".\src\assets\download_80.13978326416017.svg" alt="" />
        </div>

        <div className="w-full md:w-1/2 p-4">
          <div className="container w-full text-2xl">
            <div className="pt-6 pl-6">
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                color={emailError ? "failure" : ""}
                helperText={emailError && <span>{emailError}</span>}
                style={{border:'none' ,width:'100%' ,backgroundColor:"red"}}
              />
              <p className="mb-4 break-words text-lg pt-8">{event.description}</p>
              <p className="mb-2 text-lg ">
                <strong className="text-lg">Date:</strong> {event.date}
              </p>
              <p className="mb-6">
                <strong className="text-lg">Time:</strong> {event.time}
              </p>
              <p className="mb-6">
                <strong className="text-lg">Address:</strong> {event.address}
              </p>
            </div>
            <div className="flex justify-between flex-col">
              <div className="container flex mb-4 justify-between">
                <Button
                  className="button button-increase bg-orange-300"
                  onClick={increaseCount}
                >
                  Add Ticket
                </Button>
                <div className="count">{count}</div>
                <Button
                  className="button button-decrease bg-orange-300"
                  onClick={decreaseCount}
                >
                  Remove Ticket
                </Button>
              </div>
              <div className="text-lg font-bold mb-4">Total: {total} EGP</div>
              <Button
                type="submit"
                className="bg-orange-400"
                onClick={() => setShowModal(true)}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Payment</Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePayment}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Name on Card</label>
              <TextInput
                id="cardName"
                type="text"
                placeholder="Enter name on card"
                required={true}
              />
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Card Number</label>
              <TextInput
                id="cardNumber"
                type="text"
                placeholder="Enter card number"
                required={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium">Expiration Date</label>
                <TextInput
                  id="expDate"
                  type="text"
                  placeholder="MM/YY"
                  required={true}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">CVV</label>
                <TextInput
                  id="cvv"
                  type="password"
                  placeholder="CVV"
                  required={true}
                />
              </div>
            </div>

            <Button type="submit" className="bg-blue-500 text-white w-full">
              Pay {total} EGP
            </Button>
          </form>
          <hr className="my-4" />
          <PayPalScriptProvider
            options={{
              "client-id": "YOUR_CLIENT_ID",
              currency: "EGP",
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              amount={Number(total).toFixed(2)}
              onApprove={handlePayPalSuccess}
            />
          </PayPalScriptProvider>

          <Button
            className="capitalize w-full font-bold text-white bg-blue-500 border-none mt-5 rounded-md"
            onClick={async () => {
              const emailSubmitted = await handleEmailSubmission();
              if (emailSubmitted) {
                if (event.eventtype === "online") {
                  navigate(`/TicketOnline/${event.id}`);
                } else {
                  navigate(`/TicketConfirmation/${event.id}`);
                }
              }
            }}
          >
            Proceed without Payment
          </Button>
        </Modal.Body>
      </Modal>

      {/* Carousel */}
      <section className="container mt-20 mb-5" id="slid">
        <div className="flex overflow-x-auto pb-4">
          <Carousel autoPlay infiniteLoop interval={3000} showThumbs={false}>
            {otherEvents.length > 0 ? (
              otherEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="relative h-80 cursor-pointer overflow-hidden carousel-item"
                  onClick={() => navigate("/Ticket", { state: { event: ev } })}
                >
                  <div className="relative w-full h-full group"> 
                    <img
                      className="w-full h-full object-cover carousel-item__img"
                      src={ev.eventImg}
                      alt={ev.eventName}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-lg font-bold">{ev.eventName}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default Ticket;
