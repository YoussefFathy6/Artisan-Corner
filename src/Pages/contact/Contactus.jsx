import best11 from '../../assets/imges/newww/best11.jpg';

function Contactus() {
  return (
    <>
      <div className="relative w-full h-[80vh] bg-cover bg-center" 
        style={{
          backgroundImage: `url(${best11})`,
        }}
      >
        <div
          className="absolute inset-0 bg-[#344646cc]"
          style={{ zIndex: 1 }}
        ></div>
        <div className="relative z-10 text-white mt-64 text-center h-full">
          <h1 className='text-7xl  '>Contact Information</h1>
          <p className='w-[60%] ml-96 mt-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex ea esse excepturi veniam nihil fuga recusandae adipisci. Ipsam, sint Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque sapiente, assumenda deserunt nesciunt neque incidunt?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis corrupti facilis placeat ullam vel accusamus?</p>        </div>
      </div>
      <div className="flex justify-around items-center py-32 bg-gray-100">
      <div className=" w-[90%] flex justify-around p-10 bg-white shadow-lg ">
        {/* Left Side - Contact Info */}
        <div className="w-[35%] mt-20">
  <div
    className="mb-3 bg-gray-100 p-8 cursor-pointer transform transition-transform duration-300 active:scale-105"
  >
    <h3 className="text-lg font-semibold">Phone Number</h3>
    <p className="text-sm">+123 456 7890</p>
  </div>
  <div
    className="mb-3 bg-gray-100 p-8 cursor-pointer transform transition-transform duration-300 active:scale-105"
  >
    <h3 className="text-lg font-semibold">Email Address</h3>
    <p className="text-sm">example@gmail.com</p>
  </div>
</div>


        {/* Right Side - Contact Form */}
        <div className="w-[35%] p-6 mt-10">
          <h3 className="text-xl font-semibold mb-4">Send Message</h3>
          <p className="text-sm mb-6">
            There are all kinds of passages available, but the majority have
            suffered alteration in some form.
          </p>
          <form>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your name"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <input
                type="email"
                placeholder="Email address"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Phone number"
                className="p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <textarea
              placeholder="Message"
              className="p-2 border border-gray-300 rounded-md w-full h-32"
            />
            <button className="mt-4 px-6 py-2 bg-[#3d5050cc] text-white font-semibold rounded-md">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contactus;
