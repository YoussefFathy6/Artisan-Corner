import { useState } from "react";
import { Button, Modal } from "flowbite-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Carousel } from "flowbite-react";
import { useNavigate, useLocation } from "react-router-dom";

function Ticket() {
  const location = useLocation();
  const event = location.state?.event || {};
  const ticketPrice = event.pricetTcket || 1;
  const [count, setCount] = useState(1);
  const [total, setTotal] = useState(ticketPrice);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const increaseCount = () => {
    setCount(count + 1);
    setTotal((count + 1) * ticketPrice);
  };

  const decreaseCount = () => {
    const newCount = count > 0 ? count - 1 : 0;
    setCount(newCount);
    setTotal(newCount * ticketPrice);
  };

  const handlePayment = (event) => {
    event.preventDefault();
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
          <form onSubmit={handlePayment}>{/* Payment form fields */}</form>
          <hr className="my-4" />
          <PayPalScriptProvider
            options={{
              "client-id":
                "ATBfWLdcSL5fcFoV_C4Se5IXgxtt0vEBBeLAC3GKgfq13_Wg77OUfsWclzaKidoLU3mfDhnv1mObIFJh",
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
            onClick={() => navigate(`/TicketConfirmation/${event.id}`)}
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
