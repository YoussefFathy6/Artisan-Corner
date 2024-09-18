function EventCard({ data, onDelete }) {
    return (
      <>
        <div className="flex  my-20">
          <div className="max-w-[720px] mx-auto">
            <div className="relative flex flex-col text-gray-700   bg-clip-border rounded-xl w-96  group transition-all duration-300 ">
              <div className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
                <img
                  src={data.eventImg}
                  alt={data.title}
                  className="w-full h-full object-cover rounded-xl transition-all duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <h5 className="text-white text-2xl font-semibold mb-2">{data.name}</h5>
                  <p className="text-white text-base">{data.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  export default EventCard;
  