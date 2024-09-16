import { useState } from "react";
import "./Users.modules.css";
import { useNavigate } from "react-router-dom";

function Cards({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const descriptionMaxLength = 80;

  const aboutText = data.about ? data.about : 'No description available';

  return (
    <ul className="cards">
      <li>
        <a href="#" className="card">
          <img
            className="card__image"
            src={data.profilePic || "https://th.bing.com/th/id/OIP.PW1QzPVwoZHjpHacJ3WjjwAAAA?rs=1&pid=ImgDetMain"}
            alt="Profile Picture"
          />
          <div className="card__overlay">
            <div className="card__header">
              <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
                <path />
              </svg>
              <img
                className="card__thumb"
                src={data.profilePic || "https://static.vecteezy.com/system/resources/previews/007/409/970/non_2x/flat-customer-support-icon-membership-line-icon-vector.jpg"}
                alt="Profile Picture"
              />
              <div className="card__header-text">
                <h3 className="card__title">{data.firstname} {data.lastname}</h3>
                <span className="card__status">{data.accountType}</span>
              </div>
            </div>
            <p className="card__description">
              {isExpanded
                ? aboutText
                : `${aboutText.substring(0, descriptionMaxLength)}...`}
            </p>
            <div className="justify-center mt-4 mx-16">
              <button
                onClick={() => navigate("/profile", { state: { user: data } })}
                className="bg-red-900 hover:bg-red-800 text-white p-3 m-auto w-32 rounded-xl text-sm"
              >
                View Profile
              </button>
            </div>
          </div>
        </a>
      </li>
    </ul>
  );
}

export default Cards;
