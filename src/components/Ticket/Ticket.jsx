import { useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Carousel } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

function Ticket() {
  const location = useLocation();
  const event = location.state?.event || {};
  const ticketPrice = event.pricetTcket || 1;
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(ticketPrice);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState(""); 
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const db = getFirestore(); 

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
      return;
    }
    try {
      await addDoc(collection(db, "sendTicket"), {
        email: email,
        eventId: event.id,
      });
      console.log("Email saved to Firestore successfully!");
    } catch (error) {
      console.error("Error adding email to Firestore:", error);
    }
  };

  const handlePayment = (event) => {
    event.preventDefault();
    handleEmailSubmission();
    console.log(`Paying ${total} with Visa`);
    setShowModal(false);
  };

  return (
    <>
      <h1 className="capitalize font-bold text-3xl m-5">{event.name}</h1>

      <section className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 p-4">
          <img
            src={event.eventImg}
            alt="Event"
            className="w-full h-96 object-cover"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
        </div>

        <div className="w-full md:w-1/2 p-4">
          <div className="container w-full text-2xl">
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              required={true}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={emailError ? "failure" : ""}
              helperText={emailError && <span>{emailError}</span>}
            />
            <p className="mb-4">{event.description}</p>
            <p className="mb-2">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="mb-6">
              <strong>Time:</strong> {event.time}
            </p>

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
        onApprove={async (data, actions) => {
          try {
            await actions.order.capture();
            console.log("Payment approved and captured");
            handleEmailSubmission(); // Save email after payment success
            navigate(`/TicketConfirmation/${event.id}`);
          } catch (error) {
            console.error("Error capturing payment:", error);
          }
        }}
        onError={(err) => {
          console.error("PayPal Error:", err);
        }}
      />
    </PayPalScriptProvider>

    <Button
      className="capitalize w-full font-bold text-white bg-blue-500 border-none mt-5 rounded-md"
      onClick={() => {
        handleEmailSubmission();
        navigate(`/TicketConfirmation/${event.id}`);
      }}
    >
      Proceed without Payment
    </Button>
  </Modal.Body>
</Modal>


      {/* Carousel */}
      <section className="container mt-5 mb-5" id="slid">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel autoPlay infiniteLoop interval={3000}>
            <div>
              <img
                className="w-full"
                src="/dist/handicraft.jpeg"
                alt="First slide"
              />
            </div>
            {/* Other carousel images */}
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default Ticket;
