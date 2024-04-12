import React from "react"
import {
  input_container_styles,
  general_input_styles,
  label_styles,
} from "../utils/index.js"

function FormStepOne({ setData, data }) {
  return (
    <div className="flex flex-col gap-[4.17vh] mb-[7.40vh] ">
      <div className={input_container_styles}>
        <label htmlFor="" className={label_styles}>
          Property Address
        </label>
        <input
          id="property_address"
          type="textarea"
          onChange={(e) =>
            setData({ ...data, property_address: e.target.value })
          }
          value={data.property_address}
          placeholder="Enter your property address"
          className={general_input_styles}
          required
        />
      </div>
      <div className="flex justify-between gap-4 w-full">
        <div className={input_container_styles}>
          <label htmlFor="" className={label_styles}>
            Property Size (sqm)
          </label>
          <input
            id="property_size"
            type="number"
            onChange={(e) =>
              setData({ ...data, property_size: e.target.value })
            }
            value={data.property_size}
            placeholder="Enter your property size"
            className={general_input_styles}
            required
          />
        </div>
        <div className={input_container_styles}>
          <label htmlFor="" className={label_styles}>
            Property Type
          </label>
          <select
            id="property_type"
            onChange={(e) =>
              setData({ ...data, property_type: e.target.value })
            }
            value={data.property_type}
            placeholder="Enter your property type"
            className={general_input_styles}
            required
          >
            <option value="nil">- Choose one - </option>
            <option value="Apartment">Apartment</option>
            <option value="Shared Apartment">Shared Apartment</option>
            <option value="Mini Flat">Mini Flat</option>
            <option value="Room and Parlour">Room and Parlour</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between gap-4 w-full">
        <div className={input_container_styles}>
          <label htmlFor="" className={label_styles}>
            Furnishing
          </label>
          <select
            id="furnishing"
            onChange={(e) => setData({ ...data, furnishing: e.target.value })}
            value={data.furnishing}
            placeholder="Enter your property furnishing"
            className={general_input_styles}
            required
          >
            <option value="nil">- Choose one - </option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>
        <div className={input_container_styles}>
          <label htmlFor="" className={label_styles}>
            Condition
          </label>
          <select
            id="property_condition"
            onChange={(e) =>
              setData({ ...data, property_condition: e.target.value })
            }
            value={data.property_condition}
            placeholder="Enter your property type"
            className={general_input_styles}
            required
          >
            <option value="nil">- Choose one - </option>
            <option value="Fairly Used">Fairly Used</option>
            <option value="Newly Built">Newly Built</option>
            <option value="Old">Old</option>
            <option value="Renovated">Renovated</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between gap-4 w-full">
        <div className={input_container_styles}>
          <label htmlFor="" className={label_styles}>
            No. of Bedrooms
          </label>
          <input
            id="no_of_bedrooms"
            type="number"
            onChange={(e) =>
              setData({ ...data, no_of_bedrooms: e.target.value })
            }
            value={data.no_of_bedrooms}
            placeholder="Enter your no. of bedrooms"
            className={general_input_styles}
            required
          />
        </div>
        <div className={input_container_styles}>
          <label htmlFor="" className={label_styles}>
            No. of Bathrooms
          </label>
          <input
            id="no_of_bathrooms"
            type="number"
            onChange={(e) =>
              setData({ ...data, no_of_bathrooms: e.target.value })
            }
            value={data.no_of_bathrooms}
            placeholder="Enter your no. of bathrooms"
            className={general_input_styles}
            required
          />
        </div>
      </div>
    </div>
  );
}

export default FormStepOne;
