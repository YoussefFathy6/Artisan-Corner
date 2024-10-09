import { useState, useEffect } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Carousel } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

function EventOnline() {
  const location = useLocation();
  const event = location.state?.event || {};
  const ticketPrice = event.pricetTcket;
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(ticketPrice);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otherEvents, setOtherEvents] = useState([]);
  const [soldOut, setSoldOut] = useState(false);
  const navigate = useNavigate();
  const db = getFirestore();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "add event"));
        const events = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOtherEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [db]);

  useEffect(() => {
    const checkSoldOut = async () => {
      if (event.id) {
        try {
          const eventDoc = doc(db, "add event", event.id);
          const docSnapshot = await getDocs(eventDoc);
          const eventData = docSnapshot.data();
          if (eventData?.ticketquantity <= 0) {
            setSoldOut(true);
          }
        } catch (error) {
          console.error("Error checking event status:", error);
        }
      }
    };

    checkSoldOut();
  }, [db, event.id]);

  const increaseCount = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      if (newCount <= event.ticketquantity) {
        setTotal(newCount * ticketPrice);
        return newCount;
      } else {
        alert("Cannot select more tickets than available.");
        return prevCount;
      }
    });
  };

  const decreaseCount = () => {
    setCount((prevCount) => {
      const newCount = Math.max(prevCount - 1, 1);
      setTotal(newCount * ticketPrice);
      return newCount;
    });
  };

  // const validateEmail = (email) => {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // };

  const handleEmailSubmission = async () => {
    // if (!validateEmail(email)) {
    //   setEmailError("Please enter a valid email.");
    //   return false;
    // }
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

    if (soldOut) {
      alert("This event is sold out.");
      return;
    }

    const emailSubmitted = await handleEmailSubmission();
    if (!emailSubmitted) return;

    console.log(`Paying ${total} with Visa`);
    setShowModal(false);
  };

  const handlePayPalSuccess = async (data, actions) => {
    try {
      await actions.order.capture();
      console.log("Payment approved and captured");

      const platformFee = total * 0.1;
      const userAmount = total - platformFee;
      console.log("User Amount after platform fee:", userAmount);

      const emailSubmitted = await handleEmailSubmission();
      if (emailSubmitted) {
        if (event.eventtype === "online") {
          navigate(`/TicketOnline/${event.id}`);
        } else {
          const eventDocRef = doc(db, "add event", event.id);
          const newQuantity = event.ticketquantity - count;
          await updateDoc(eventDocRef, {
            ticketquantity: newQuantity,
          });

          if (newQuantity <= 0) {
            setSoldOut(true);
          }
          navigate(`/TicketConfirmation/${event.id}`);
        }
      }
    } catch (error) {
      console.error("Error capturing payment or calculating fees:", error);
      alert(
        "There was an issue processing your payment. Please try again later."
      );
    }
  };

  return (
    <>

      <section className="  justify-center items-center m-auto ">
      
      
            <div className="pt-32 pb-32">
             
          <div className="ticket-card">
  <div className="ticket-header">
    <img src={event.eventImg} alt={event.name} />

  </div>
  <div className="ticket-details">
    <h2 className="ticket-title">{event.name}</h2>
    <div className="ticket-meta">
        <div className="flex gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M17 1c0-.552-.447-1-1-1s-1 .448-1 1v2c0 .552.447 1 1 1s1-.448 1-1v-2zm-12 2c0 .552-.447 1-1 1s-1-.448-1-1v-2c0-.552.447-1 1-1s1 .448 1 1v2zm13 5v10h-16v-10h16zm2-6h-2v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-8v1c0 1.103-.897 2-2 2s-2-.897-2-2v-1h-2v18h20v-18zm4 3v19h-22v-2h20v-17h2zm-17 7h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4h-2v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
</svg>
   <span>{event.date}</span></div>
   <div className="flex gap-2"> <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
  <path d="M19.004 1c-.947 0-1.895.268-2.719.803 3.17 1.218 5.694 3.739 6.914 6.909.534-.823.801-1.77.801-2.717 0-2.761-2.236-4.995-4.996-4.995m-7.004 20c-4.411 0-8.001-3.59-8.001-8 0-4.413 3.59-8.001 8.001-8.001 4.412 0 8.002 3.588 8.002 8.001 0 4.41-3.59 8-8.002 8m10.002-8c0-5.522-4.475-10.001-10.002-10.001-5.523 0-10.001 4.479-10.001 10.001 0 4.316 3.087 10 10.001 10 6.93 0 10.002-5.693 10.002-10m-21.199-4.285c-.535-.824-.802-1.772-.802-2.718 0-2.757 2.233-4.995 4.991-4.995.948 0 1.896.268 2.721.803-3.172 1.217-5.692 3.739-6.91 6.91m12.196 4.285v-5h-1.999v6.998h5.999v-1.998h-4z"/>
</svg>
 <span>{event.time}</span></div>
  
    </div>
    <p>{event.description}</p>
    <div className="text-lg font-bold mb-4 mt-3">Total: {total} EGP</div>

    <button className="ticket-button" onClick={() => setShowModal(true)}>
    Join
    </button>
  </div>
</div>

           
            </div>
   

      </section>

      {/* Modal */}
   {/* Modal */}
   <Modal show={showModal} size="3xl" onClose={() => setShowModal(false)}>
        <Modal.Header>Payment</Modal.Header>
        <Modal.Body>
          <form onSubmit={handlePayment} className="p-9">
            <label className="block mb-2 text-sm font-medium">Email</label>

            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={emailError ? "failure" : ""}
              helperText={emailError && <span>{emailError}</span>}
              style={{
                width: "100%",
                marginBottom: "1rem",
                backgroundColor: "#E0E3E1",
              }}
            />
            <div className="mb-4 ">
              <label className="block mb-2 text-sm font-medium">
                Name on Card
              </label>
              <TextInput
                id="cardName"
                type="text"
                placeholder="Enter name on card"
                required={true}
              />
            </div>

            <div className="mb-4 ">
              <label className="block mb-2 text-sm font-medium">
                Card Number
              </label>
              <TextInput
                id="cardNumber"
                type="text"
                placeholder="Enter card number"
                required={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Expiration Date
                </label>
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
              "client-id":
                "AcMz3qJ9DrjaDZH_asLE65SFuI7W2qIFLPVEkIqopOtb0YFEfAfW2Ht1cJR1bo0uoeP18SwV-urPXbz0", // Make sure to use the correct client ID
                currency: "USD",
              }}
            >
              <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: total.toString(), // Total amount in the correct currency
                        },
                      },
                    ],
                  });
                }}
                onApprove={handlePayPalSuccess}
              />
            </PayPalScriptProvider>
          </Modal.Body>
        </Modal>

     
    </>
  );
}

export default EventOnline;
