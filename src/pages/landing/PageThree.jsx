import React from "react";
import vec from "../../assets/vec.svg";
import illustration from "../../assets/illustration.svg";

function PageThree() {
  return (
    <div className="bg-[#05001B]  py-[11.57vh] text-center px-[6.46vw] flex flex-col items-center ">
      <h2 className="text-white font-black text-[1.875rem] ">
        GeoLandmark: Ensuring Land Interest Protection!
      </h2>
      <img src={vec} alt="" />
      <div className="text-[#B9B9B9] mt-[3.70vh] mb-[4vh] md:mb-[8.33vh] font-medium ">
        <p>
          Transparency and Security: Blockchain technology ensures transparent
          ownership records and secure transactions, reducing fraud, and
          enhancing trust in the market. With GeoLandmark, your land assets are
          protected by the immutable nature of blockchain, providing a reliable
          and transparent ledger for ownership and transactions.
        </p>
        <br />
        <p>
          Fractional Ownership: Empower landowners with the ability to tokenize
          their property, allowing investors to purchase fractional shares. This
          innovative approach makes real estate investment more accessible and
          inclusive, opening new opportunities for asset diversification and
          investment growth.
        </p>
        <br />
        <p>
          Increased Liquidity: Unlock the potential of your land assets through
          tokenization on GeoLandmark. Tokenized assets can be traded seamlessly
          on decentralized platforms, providing liquidity and flexibility to
          asset owners. Enjoy the benefits of a liquid market where buying,
          selling, and exchanging land tokens is efficient and accessible.
        </p>
      </div>
      <img
        src={illustration}
        alt=""
        className="w-[43rem] h-[33rem] md:mb-[13.98vh] mb-[9.26vh] "
      />
    </div>
  );
}

export default PageThree;
