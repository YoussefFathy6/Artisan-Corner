/* eslint-disable no-unused-vars */




import profile from "../../assets/imges/newww/best11.jpg";
import profile2 from "../../assets/imges/newww/artist1.jpeg";
import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaLinkedinIn,
  FaFacebookF,
  FaUserEdit,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Masonry from "react-masonry-css";
import db from "../../Config/firebase";
import Side from "./Side";
import Counter from "./Counter";
import Addproduct from "./Addproduct";
import Cards2 from "./Cards2";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import "./style.css";
import AddDeitalsprofile from "./AddDeitalsprofile";
import Eventuser from "./Eventuser";
import ReactStars from "react-rating-stars-component"; // Assuming you're using this for stars
import Accountbalance from "./Accountbalance";
import SpecialOrderPage from "../SpecialOrder/SpecialOrderPage";
function Setting() {
  const [activeItem, setActiveItem] = useState("profile");
  const [products, setProducts] = useState([]);
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewsData, setReviewsData] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true); // State for reviews loading

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userid = localStorage.getItem("id");
        if (userid) {
          setUserId(userid);
          const usersCollection = collection(db, "users");
          const q = query(usersCollection, where("id", "==", userid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setData(userData);
          } else {
            console.error("No user found!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (userId) {
      const q = query(
        collection(db, "add product"),
        where("ownerID", "==", userId)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsArray = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProducts(productsArray);
      });

      return () => unsubscribe();
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setLoadingReviews(true);
      const reviewsQuery = query(
        collection(db, "userReviews"),
        where("userID", "==", userId)
      );

      const unsubscribeReviews = onSnapshot(reviewsQuery, async (snapshot) => {
        const reviewsList = await Promise.all(
          snapshot.docs.map(async (reviewDoc) => {
            const reviewData = reviewDoc.data();
            const userDoc = await getDoc(doc(db, "users", reviewData.userID));
            const userName = userDoc.exists()
              ? userDoc.data().name
              : "Unknown User";
            return {
              id: reviewDoc.id,
              ...reviewData,
              userName,
            };
          })
        );
        setReviewsData(reviewsList);
        setLoadingReviews(false); // Set loading to false after fetching
      });

      return () => unsubscribeReviews();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // الدالة لتحديث العنصر النشط
  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  // التحقق من نوع الحساب
  const accountType = data.length > 0 ? data[0].accountType : "";

  return (
    <div className="flex page-fade-in justify-centerd">
      {/* Sidebar يظهر فقط إذا لم يكن نوع الحساب Customer */}
      {accountType !== "Customer" && (
        <div className="">
          <Side activeItem={activeItem} onItemClick={handleItemClick} />
        </div>
      )}

      {/* Main Content */}

      <div
        className={`p-5  ${accountType === "Customer" ? "w-[85vw] mx-auto my-10"  : "w-[65vw]"}`}
      >
        {activeItem === "profile" && (
          <div>
            {data.length > 0 &&
              data.map((item, index) => (
                <div key={index} className="mb-10">
                  <div className="relative">
                    {/* الكارد الأحمر */}
                    <div
                      className="  rounded-3xl p-9 shadow-2xl my-7 border-2 "
                      style={{ animation: "fadeInUp 1s forwards" }}
                    >
                      <div className="flex flex-col ">
                        {/* صورة الغلاف */}
                        <div className="h-[300px] w-[100%] ">
                          <img
                            src={
                              item.coverPic ||
                              "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                            }
                            // src={profile}
                            className=" h-[100%] w-[100%] rounded-3xl object-cover  shadow-lg"
                          />
                        </div>

                        <div className=" flex justify-between">
                          {/* صورة الملف الشخصي */}
                          <div className=" w-[180px] absolute top-[240px] left-[80px] mr-[55px]   rounded-3xl">
                            <img
                              src={
                                item.profilePic ||
                                "https://www.alleganyco.gov/wp-content/uploads/unknown-person-icon-Image-from.png"
                              }
                              // src={item.profilePic || profile2}
                              alt="Profile"
                              className="rounded-3xl w-[100%] h-[100%] object-cover transition-transform duration-500 ease-in-out hover:scale-110 shadow-lg border-4 border-[#94e7d1]"
                            />
                          </div>

                          {/* معلومات النصوص */}
                          <div className="ms-[250px] mt-10">
                            <h1
                              style={{ fontFamily: "Playwrite DE Grund" }}
                              className="text-2xl font-bold "
                            >
                              {item.firstname} {item.lastname}
                            </h1>
                            <p className=" ms-3 text-[#4b535c]">
                              {item.jobtitle}
                            </p>
                          </div>

                          {/* الروابط الاجتماعية */}
                          <div className="flex  w-[20%] mt-6 ">
                            <a
                              href={item.facebook}
                              className="icon text-[#94e7d1]   hover:text-blue-600 transition-colors duration-300"
                            >
                              <FaFacebookF size={25} />
                            </a>
                            <a
                              href={item.instagram}
                              className="icon mx-5 text-[#94e7d1]  hover:text-pink-600 transition-colors duration-300"
                            >
                              <FaInstagram size={25} />
                            </a>
                            <a
                              href={item.linkedin}
                              className="icon  text-[#94e7d1]  hover:text-blue-800 transition-colors duration-300"
                            >
                              <FaLinkedinIn size={25} />
                            </a>
                          </div>

                          {/* تعديل الكارد الأحمر */}
                          {data.length > 0 && data[0].accountType !== "" && //متلعبوش فيها 
                          (
                            <div className="mt-2 me-2 transition-transform  ease-in-out translate-x-3 transform hover:scale-110 ">
                              <Link
                                to="/adddeitalsprofile"
                                className="text-[#204d43]"
                              >
                                <FaUserEdit
                                  size={50}
                                  color="#53958e"
                                  className=" hover:translate-x-8 duration-300"
                                />
                                Edite profile
                              </Link>
                            </div>
                          )}
        
                        </div>

                        <div className="w-[80%] mx-auto mt-10">
                          <div className="about mb-10 mt-5">
                            <h2 className="text-2xl mr-6 text-[#37977f] font-medium">
                              About :
                            </h2>
                            <p className=" mt-2 text-[#3e6258] mb-2">
                              {item.about}
                            </p>
                          </div>
                          <div className="email flex border-b-2 my-5">
                            <h2 className="text-lg">Email :</h2>
                            <h4 className="text-lg ms-10 text-[#3e6258] mb-2">
                              {item.email}
                            </h4>
                          </div>

                          <div className="email flex border-b-2 mb-5">
                            <h2 className="text-lg">Account Type :</h2>
                            <h4 className="text-lg ms-10 text-[#3e6258] mb-2">
                              {item.accountType}
                            </h4>
                          </div>

                          {/* Reviews Section */}
                          {accountType !== "Customer" && (
                            <div className="mt-10 flex border-b-2">
                              <h2 className="text-lg">Reviews :</h2>
                              {loadingReviews ? (
                                <div>Loading reviews...</div>
                              ) : reviewsData.length > 0 ? (
                                reviewsData.map((review) => (
                                  <div
                                    key={review.id}
                                    className="my-4 p-4 border rounded-lg shadow w-[90%]"
                                  >
                                    <h4 className="font-semibold">
                                      {review.userName}{" "}
                                    </h4>
                                    <ReactStars
                                      count={5}
                                      value={review.rating}
                                      size={24}
                                      activeColor="#ffd700"
                                      edit={false}
                                    />
                                    <p>{review.reviewText}</p>
                                    <p className="text-sm text-gray-500">
                                      {review.rating} / 5 stars
                                    </p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-lg ms-10 text-[#3e6258] mb-2">
                                  No reviews available. Be the first to review!
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {/* العداد إذا لم يكن الحساب Customer */}
                        {accountType !== "Customer" && (
                          <div className="mt-8 flex justify-center">
                            <Counter />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
        {activeItem === "products" && accountType !== "Customer" && (
          <div>
            {data.length > 0 && data[0].accountType !== "Customer" && (
              <>
              
              <div className="flex justify-between mt-12">
                  <h1 className="text-5xl font-semibold">Products</h1>
                  <Addproduct />
                </div>

                <div className="mt-14">
                  {products.length ? (
                    <section className="grid gap-5">
                      <Masonry
                        breakpointCols={{
                          default: 4,
                          1100: 2,
                          700: 1,
                          500: 1,
                        }}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                      >
                        {products.map((item, index) => (
                          <Cards2
                            data={item}
                            key={index}
                            className="shadow-lg rounded-lg transition-transform hover:scale-105"
                          />
                        ))}
                      </Masonry>
                    </section>
                  ) : (
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="loader m-auto items-center  "
                    >
                      <path
                        pathLength="360"
                        d="M 56.3752 2 H 7.6248 C 7.2797 2 6.9999 2.268 6.9999 2.5985 V 61.4015 C 6.9999 61.7321 7.2797 62 7.6248 62 H 56.3752 C 56.7203 62 57.0001 61.7321 57.0001 61.4015 V 2.5985 C 57.0001 2.268 56.7203 2 56.3752 2 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 55.7503 60.803 H 8.2497 V 3.1971 H 55.7503 V 60.803 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 29.7638 47.6092 C 29.4971 47.3997 29.1031 47.4368 28.8844 47.6925 C 28.6656 47.9481 28.7046 48.3253 28.9715 48.5348 L 32.8768 51.6023 C 32.9931 51.6936 33.1333 51.738 33.2727 51.738 C 33.4533 51.738 33.6328 51.6634 33.7562 51.519 C 33.975 51.2634 33.936 50.8862 33.6692 50.6767 L 29.7638 47.6092 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 42.3557 34.9046 C 38.4615 34.7664 36.9617 37.6749 36.7179 39.2213 L 35.8587 44.2341 C 35.8029 44.5604 36.0335 44.8681 36.374 44.9218 C 36.4084 44.9272 36.4424 44.9299 36.476 44.9299 C 36.7766 44.9299 37.0415 44.7214 37.0918 44.4281 L 37.9523 39.4076 C 37.9744 39.2673 38.544 35.9737 42.311 36.1007 C 42.6526 36.1124 42.9454 35.8544 42.9577 35.524 C 42.9702 35.1937 42.7006 34.9164 42.3557 34.9046 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 13.1528 55.5663 C 13.1528 55.8968 13.4326 56.1648 13.7777 56.1648 H 50.2223 C 50.5674 56.1648 50.8472 55.8968 50.8472 55.5663 V 8.4339 C 50.8472 8.1034 50.5674 7.8354 50.2223 7.8354 H 13.7777 C 13.4326 7.8354 13.1528 8.1034 13.1528 8.4339 V 55.5663 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 25.3121 26.5567 C 24.9717 27.4941 25.0042 28.8167 25.0634 29.5927 C 23.6244 29.8484 20.3838 31.0913 18.9478 37.0352 C 18.5089 37.5603 17.8746 38.1205 17.2053 38.7114 C 16.2598 39.546 15.2351 40.4515 14.4027 41.5332 V 20.5393 H 23.7222 C 23.7178 22.6817 24.1666 25.4398 25.3121 26.5567 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 49.5975 43.4819 C 48.3838 39.1715 46.3138 33.6788 43.4709 29.7736 C 42.6161 28.5995 40.7095 27.0268 39.6852 26.1818 L 39.6352 26.1405 C 39.4176 24.783 39.1158 22.5803 38.8461 20.5394 H 49.5976 V 43.4819 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 29.8161 45.151 C 29.0569 44.7516 28.3216 44.4344 27.6455 44.185 C 27.6488 44.0431 27.6397 43.8917 27.6478 43.7715 C 27.9248 39.7036 30.4491 36.2472 35.1502 33.4979 C 38.7221 31.4091 42.2682 30.5427 42.3036 30.5341 C 42.3563 30.5213 42.416 30.5119 42.4781 30.5037 C 42.6695 30.7681 42.8577 31.0407 43.0425 31.3217 C 42.1523 31.4917 39.6591 32.0721 37.0495 33.6188 C 34.2273 35.2912 30.7775 38.4334 29.9445 44.0105 C 29.9025 44.2924 29.8211 45.0524 29.8161 45.151 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 32.2021 33.6346 C 29.1519 33.8959 26.6218 32.5634 25.6481 31.4461 C 25.9518 30.3095 28.4436 28.4847 30.2282 27.4911 C 30.436 27.3755 30.5563 27.1556 30.5372 26.9261 L 30.4311 25.6487 C 30.5264 25.6565 30.622 25.6621 30.7181 25.6642 L 30.8857 25.6672 C 32.0645 25.6912 33.2094 25.302 34.1059 24.5658 L 34.112 24.5607 L 34.4024 32.5344 C 33.8302 32.8724 33.2863 33.2227 32.7728 33.5852 C 32.5227 33.6032 32.3068 33.6258 32.2021 33.6346 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 27.8056 17.9207 C 27.8041 17.9207 27.8025 17.9207 27.8012 17.9207 L 27.0155 17.9259 L 26.8123 15.4718 C 26.8174 15.4609 26.8238 15.4501 26.8282 15.4389 C 27.2218 15.0856 28.158 14.3463 29.1923 14.252 C 31.0985 14.0778 33.442 14.3386 33.8213 16.5565 L 34.0564 23.0299 L 33.2927 23.6566 C 32.6306 24.2004 31.7888 24.4889 30.9118 24.4703 L 30.7437 24.4673 C 29.7977 24.4473 28.8841 24.0555 28.2376 23.3933 C 27.9671 23.1152 27.748 22.7967 27.5871 22.4474 C 27.426 22.0961 27.3292 21.7272 27.2989 21.3494 L 27.1145 19.1223 L 27.8097 19.1178 C 28.1548 19.1154 28.4327 18.8457 28.4303 18.5152 C 28.4278 18.186 28.1487 17.9207 27.8056 17.9207 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 38.4358 26.5433 C 38.4589 26.6829 38.5326 26.8101 38.6443 26.9026 L 38.8697 27.0889 C 39.5266 27.6307 40.6931 28.5938 41.5811 29.4829 C 40.6409 29.7428 38.2545 30.4762 35.6283 31.8516 L 35.3161 23.281 C 35.316 23.2777 35.3158 23.2743 35.3157 23.271 L 35.0692 16.4785 C 35.0682 16.455 35.0659 16.4316 35.0621 16.4082 C 34.6703 13.9692 32.4875 12.7498 29.0741 13.0603 C 28.5659 13.1067 28.0885 13.255 27.6614 13.4468 C 28.321 12.6324 29.4568 11.8605 31.3984 11.8605 C 32.892 11.8605 34.2086 12.4323 35.3118 13.5599 C 36.3478 14.6187 36.9981 15.9821 37.1923 17.5023 C 37.5097 19.987 38.0932 24.4655 38.4358 26.5433 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 25.6994 17.1716 L 26.053 21.4425 C 26.094 21.9536 26.225 22.4539 26.4434 22.93 C 26.6613 23.403 26.9574 23.8335 27.3242 24.2106 C 27.833 24.7317 28.4641 25.128 29.1549 25.3746 L 29.2609 26.6526 C 28.8063 26.9219 27.959 27.4459 27.0978 28.0926 C 26.7982 28.3177 26.5261 28.5365 26.2766 28.7503 C 26.2677 27.9385 26.3477 27.0941 26.6128 26.699 C 26.7087 26.5561 26.7368 26.3807 26.6898 26.2168 C 26.6428 26.0528 26.5253 25.9159 26.3667 25.8398 C 25.2812 25.3198 24.639 20.7943 25.134 18.7283 C 25.2757 18.1366 25.4822 17.6126 25.6994 17.1716 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 14.4025 54.9677 V 43.9616 C 15.1297 42.1745 16.6798 40.8031 18.052 39.5917 C 18.5756 39.1296 19.0771 38.6852 19.5054 38.243 C 20.1455 38.2763 21.8243 38.4721 22.2856 39.611 C 22.526 40.696 22.9861 41.6387 23.6573 42.3985 C 23.7809 42.5383 23.9573 42.6104 24.1347 42.6104 C 24.2773 42.6104 24.4206 42.5639 24.5381 42.4688 C 24.8014 42.2553 24.8343 41.8776 24.6115 41.6252 C 22.2978 39.0062 23.8504 34.5445 23.8663 34.4997 C 23.9782 34.1872 23.8046 33.8471 23.4785 33.7397 C 23.1507 33.6321 22.7964 33.7986 22.6843 34.1111 C 22.6657 34.1631 22.2262 35.4024 22.1149 37.0253 C 22.0992 37.2529 22.0927 37.476 22.0916 37.6958 C 21.4663 37.3478 20.7678 37.1827 20.215 37.1057 C 21.266 32.9598 23.2109 31.5061 24.4867 30.9973 C 24.4164 31.2001 24.3769 31.3974 24.3692 31.5894 C 24.3639 31.7208 24.404 31.8501 24.4831 31.9575 C 25.0708 32.7551 26.1363 33.5207 27.4065 34.0584 C 28.2686 34.4232 29.5576 34.8194 31.1457 34.861 C 28.2499 37.3877 26.6257 40.39 26.4009 43.6936 C 26.3992 43.7195 26.3962 43.7461 26.3928 43.7729 C 25.1023 43.399 24.2167 43.2969 24.1252 43.2873 C 23.9888 43.2728 23.8487 43.3023 23.7304 43.3716 C 23.0495 43.7702 22.591 44.3922 22.4046 45.1703 C 22.2331 45.8868 22.3106 46.6885 22.6019 47.3807 C 22.0046 47.6438 21.3269 47.7784 20.7914 47.848 C 19.4939 45.6912 20.8219 44.6351 20.989 44.5146 C 21.2655 44.3207 21.3274 43.9492 21.1268 43.6822 C 20.9253 43.4139 20.5346 43.3533 20.2546 43.5462 C 19.4539 44.0983 18.406 45.6195 19.3656 47.7888 C 18.685 47.5329 17.6255 46.8145 17.8055 44.832 C 17.8836 43.9718 18.1884 43.3352 18.7117 42.9403 C 19.5815 42.2834 20.8198 42.451 20.8366 42.4537 C 21.1748 42.503 21.4952 42.2819 21.5494 41.9563 C 21.6037 41.6297 21.3713 41.3231 21.0306 41.2712 C 20.9582 41.2599 19.2558 41.0142 17.9494 41.9917 C 17.1375 42.5992 16.6703 43.5199 16.5605 44.7282 C 16.1991 48.7092 19.7376 49.1126 19.7732 49.116 C 19.7951 49.1182 22.2326 49.1079 23.7782 48.1211 C 23.8053 48.1039 24.4158 47.7528 24.4158 47.7528 C 24.5214 47.8841 24.6624 48.0532 24.8294 48.2438 L 22.3598 49.4874 C 22.1544 49.5908 22.0257 49.7949 22.0257 50.0171 V 51.8127 C 22.0257 52.1432 22.3054 52.4112 22.6505 52.4112 S 23.2754 52.1432 23.2754 51.8127 V 50.3786 L 25.6987 49.1582 C 26.021 49.4709 26.3894 49.7985 26.7963 50.1188 L 24.6627 50.7144 C 24.4768 50.7663 24.3269 50.8977 24.2559 51.0702 L 23.3968 53.1651 C 23.2704 53.4729 23.4286 53.8202 23.7498 53.9409 C 23.8248 53.9694 23.9023 53.9825 23.9782 53.9825 C 24.2277 53.9825 24.4632 53.8384 24.5599 53.6028 L 25.307 51.7814 L 28.0879 51.0053 C 28.5412 51.2713 29.0239 51.51 29.5341 51.6979 C 29.6079 51.7252 29.6836 51.738 29.7582 51.738 C 30.0092 51.738 30.246 51.592 30.3415 51.3542 C 30.4653 51.0457 30.3048 50.6994 29.9825 50.5808 C 27.1642 49.5423 25.2952 46.9394 25.2771 46.9138 C 25.1245 46.6979 24.8439 46.6013 24.5831 46.6746 L 23.7537 46.9082 C 23.5672 46.4465 23.5125 45.8992 23.623 45.4377 C 23.7168 45.046 23.9138 44.7341 24.21 44.508 C 25.267 44.6734 29.863 45.5842 33.2732 49.2905 C 33.3967 49.4247 33.569 49.4932 33.7423 49.4932 C 33.889 49.4932 34.0364 49.444 34.1551 49.3437 C 34.414 49.1251 34.439 48.747 34.2108 48.4989 C 33.9947 48.2641 33.7738 48.0421 33.5507 47.8278 L 38.211 47.0175 C 38.3595 47.0014 40.1672 46.8356 41.295 48.2161 C 41.4182 48.3671 41.6019 48.4458 41.7875 48.4458 C 41.9222 48.4458 42.0578 48.4043 42.1721 48.3186 C 42.4439 48.1148 42.4919 47.7386 42.2791 47.4784 C 40.6703 45.5094 38.1379 45.8184 38.0305 45.8327 C 38.0218 45.8339 38.0132 45.8353 38.0043 45.8368 L 32.3855 46.8136 C 31.945 46.4667 31.4998 46.1528 31.0557 45.8697 C 31.0618 45.5534 31.0651 45.1775 31.0836 44.9842 C 31.1138 44.6713 31.1524 44.3635 31.1997 44.0606 C 31.8329 40.0032 34.0061 36.8432 37.6695 34.6587 C 40.6334 32.8915 43.5195 32.4536 43.5682 32.4464 C 43.604 32.4413 43.663 32.4341 43.7302 32.4251 C 47.2229 38.3378 49.3982 46.7588 49.5976 49.5158 V 54.9673 H 14.4025 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 49.5975 9.0325 V 19.3422 H 38.689 C 38.5937 18.6105 38.5061 17.9301 38.4329 17.3569 C 38.2063 15.5828 37.4422 13.9868 36.2237 12.7413 C 34.8748 11.3624 33.2514 10.6633 31.3984 10.6633 C 27.3688 10.6633 25.8233 13.5309 25.556 15.0901 C 25.1526 15.5932 24.3175 16.7856 23.916 18.46 C 23.8568 18.7069 23.8106 19.0066 23.7778 19.3421 H 14.4025 V 9.0323 H 49.5975 Z"
                      ></path>
                      <path
                        pathLength="360"
                        d="M 30.2223 21.2875 C 30.5674 21.2875 30.8471 21.0195 30.8471 20.6889 V 18.92 L 31.9916 18.9675 C 32.3376 18.9833 32.628 18.7259 32.643 18.3956 C 32.658 18.0654 32.3907 17.786 32.0459 17.7717 L 30.2495 17.6969 C 30.077 17.6889 29.9133 17.7497 29.7902 17.8624 C 29.6671 17.9753 29.5976 18.1315 29.5976 18.2948 V 20.6889 C 29.5974 21.0195 29.8772 21.2875 30.2223 21.2875 Z"
                      ></path>
                    </svg>
                  )}
                </div>
              </>
            )}
          </div>
        )}
        {activeItem === "settings" && <AddDeitalsprofile />}
        {activeItem === "Events" && <Eventuser />}
        {activeItem === "earnings" && <Accountbalance />}
        {activeItem === "special" && <SpecialOrderPage />}
      </div>
    </div>
  );
}

export default Setting;
