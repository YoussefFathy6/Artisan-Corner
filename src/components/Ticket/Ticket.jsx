import { useState } from "react";
import { Button, TextInput, Modal } from "flowbite-react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Carousel } from "flowbite-react";
import { useNavigate, useLocation } from 'react-router-dom';

function Ticket() {
  const location = useLocation();
  const event = location.state?.event || {};
  const ticketPrice = 1; 
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
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
      <h1 className="capitalize font-bold text-3xl m-5">{event.name || "Event Name"}</h1>

      <section className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2 p-4">
          <img
            src={event.eventImg || '../dist/WhatsApp Image 2024-07-20 at 2.21.10 PM.jpeg'}
            alt="Event"
            className="w-full h-96 object-cover"
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </div>

        <div className="w-full md:w-1/2 p-4">
          <div className="container w-full text-2xl">
            <div className="mb-6">
              <TextInput
                id="name"
                type="text"
                placeholder="Your name"
                required
                shadow
              />
            </div>
            <div className="mb-6">
              <TextInput
                id="phon"
                type="text"
                placeholder="Phone number"
                required
                shadow
              />
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
              <div className="text-lg font-bold mb-4">
                Total: {total} EGP
              </div>
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
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="card-number"
              >
                Card Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="card-number"
                type="text"
                placeholder="Enter your card number"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="expiry-date"
              >
                Expiry Date
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="expiry-date"
                type="text"
                placeholder="MM/YY"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cvv"
                type="text"
                placeholder="Enter CVV"
              />
            </div>

            <div className="flex items-center justify-between">
              <Button
                type="submit"
                className="capitalize w-full font-bold text-white bg-orange-400 border-none mt-5 rounded-md"
              >
                Pay Now
              </Button>
            </div>
          </form>
          <hr className="my-4" />
          <PayPalScriptProvider
            options={{
              "client-id": "ATBfWLdcSL5fcFoV_C4Se5IXgxtt0vEBBeLAC3GKgfq13_Wg77OUfsWclzaKidoLU3mfDhnv1mObIFJh", // Replace with your PayPal client ID
              currency: "EGP"
            }}
          >
            <PayPalButtons
              style={{ layout: "vertical" }}
              amount={total.toFixed(2)}
              onApprove={async (data, actions) => {
                try {
                  await actions.order.capture();
                  console.log('Payment approved and captured');
                  navigate('/TicketConfirmation');
                } catch (error) {
                  console.error('Error capturing payment:', error);
                }
              }}
              onError={(err) => {
                console.error('PayPal Error:', err);
              }}
            />
          </PayPalScriptProvider>
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
            <div>
              <img
                className="w-full"
                src="/dist/Wire Wrap Labradorite Copper Pendant Wire Wrapped Pendant Copper Wire Wrapped Pendant HandMand Jewelry Birthday Gift for Friend Unique Item.jpeg"
                alt="Second slide"
              />
            </div>
            <div>
              <img
                className="w-full"
                src="/dist/pexels-minan1398-713661.jpg"
                alt="Third slide"
              />
            </div>
            <div>
              <img
                className="w-full"
                src="/dist/istockphoto-1309646840-612x612.jpg"
                alt="Fourth slide"
              />
            </div>
            <div>
              <img
                className="w-full"
                src="/dist/handicraft.jpeg"
                alt="Fifth slide"
              />
            </div>
          </Carousel>
        </div>
      </section>
    </>
  );
}

export default Ticket;
