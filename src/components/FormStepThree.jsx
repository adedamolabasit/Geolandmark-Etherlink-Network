import React from "react"
import {
  input_container_styles,
  general_input_styles,
  label_styles,
} from "../utils/index.js"

function FormStepThree({ setData, data }) {
  return (
    <div className="flex flex-col gap-[4.17vh] mb-[7.40vh] ">
      <div className={input_container_styles}>
        <label htmlFor="" className={label_styles}>
          Full Name
        </label>
        <input
          id="full_name"
          type="text"
          onChange={(e) => setData({ ...data, full_name: e.target.value })}
          value={data.full_name}
          placeholder="Enter your full name"
          className={general_input_styles}
        />
      </div>
      <div className={input_container_styles}>
        <label htmlFor="" className={label_styles}>
          Email Address
        </label>
        <input
          id="email_address"
          type="email"
          onChange={(e) => setData({ ...data, email_address: e.target.value })}
          value={data.email_address}
          placeholder="Enter your email address"
          className={general_input_styles}
        />
      </div>
      <div className={input_container_styles}>
        <label htmlFor="" className={label_styles}>
          Phone Number
        </label>
        <input
          id="phone_number"
          type="number"
          onChange={(e) => setData({ ...data, phone_number: e.target.value })}
          value={data.phone_number}
          placeholder="Enter your phone number"
          className={general_input_styles}
        />
      </div>
    </div>
  );
}

export default FormStepThree;
