import React from "react";
import vec from "../../assets/vec.svg";
import one from "../../assets/one.svg";
import two from "../../assets/two.svg";
import three from "../../assets/three.svg";
import four from "../../assets/four.svg";
import five from "../../assets/five.svg";
import six from "../../assets/six.svg";

function PageFour() {
  const cards = [
    {
      id: 1,
      img: one,
      title: "Hassle-Free Asset Tokenization",
      description: "Simplify and ensure accuracy with smart contracts.",
    },
    {
      id: 2,
      img: two,
      title: "Comprehensive Land Management",
      description: "Organize and track your property details effortlessly.",
    },
    {
      id: 3,
      img: three,
      title: "Efficient Land Transactions",
      description: "Amplify property visibility and streamline transactions using blockchain technology.y",
    },
    {
      id: 4,
      img: four,
      title: "Expert Assistance with Blockchain",
      description:
        "ccess a network of trusted experts leveraging blockchain technology..",
    },
    {
      id: 5,
      img: five,
      title: "Enhanced Transaction Security",
      description: "Ensure safe and transparent land transactions.",
    },
    {
      id: 6,
      img: six,
      title: "Efficient Property Search",
      description:
        "Discover the perfect land or apartment with ease using blockchain technology.",
    },
  ];

  return (
    <div className="bg-[#1B1B1B] pt-[39.07vh] pb-[21.57vh]  flex flex-col gap-4 items-center justify-center ">
      <h2 className="text-[#FFFFFF] font-black text-3xl leading-tight">
        Why Choose GeoLandmark?
      </h2>
      <img src={vec} alt="" className="self-center ml-6" />

      <p className="text-[#B9B9B9] text-center w-[82.7vw] mb-[8.80vh] ">
        Choose GeoLandmark as your trusted partner for accurate and efficient
        land registration. Experience the convenience, reliability, and peace of
        mind that comes with our comprehensive platform. Let us simplify the
        complexities while you focus on your land-related goals.
      </p>
      <div className="grid grid-cols-3 gap-x-[2.60vw] gap-y-[6.48vh] ">
        {cards.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-start justify-center text-center rounded-[2.5rem] bg-black h-[37.69vh] w-[25.32vw] px-[1.61vw] "
          >
            <img src={card.img} alt="" className="h-[13.61vh] w-[9.375vw] " />
            <h3 className="text-[#009FBD] font-black text-lg leading-tight mt-[4.35vh]">
              {card.title}
            </h3>
            <p className="text-[#B9B9B9] font-medium text-start text-base mt-[1.02vh]">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageFour;
