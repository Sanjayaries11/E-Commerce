import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutStep from "./CheckoutStep";
import { toast } from "react-toastify";

export const validateShipping = (shippingInfo, navigate) => {
    if (!shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.country || !shippingInfo.phoneNo || !shippingInfo.postalCode) {
        toast.error("Please fill the details", { position: "bottom-center" });
        navigate("/shipping")
    }
}
export default function Shipping() {
    const { shippingInfo } = useSelector(state => state.cartState);
    const [countries, setCountries] = useState([]);
    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [country, setCountry] = useState(shippingInfo.country)
    const [state, setState] = useState(shippingInfo.state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const { data } = await axios.get(`https://restcountries.com/v3.1/all`);
                const countryList = data.map((country) => country.name.common);
                setCountries(countryList);
            } catch (error) {
                console.log("Error Fetching Countries", error)
            }
        };
        fetchCountries();
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country, state }));
        navigate("/order/confirm");
    }

    return (
        <Fragment>
            <MetaData title={"Shipping Info"} />
            <CheckoutStep shipping />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mb-4">Shipping Info</h1>
                        <div className="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input type="text" id="address_field" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="city_field">City</label>
                            <input type="text" id="city_field" className="form-control" value={city} onChange={(e) => setCity(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlhtmlFor="phone_field">Phone No</label>
                            <input type="phone" id="phone_field" className="form-control" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input type="number" id="postal_code_field" className="form-control" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="state_field">State</label>
                            <input type="text" id="state_field" className="form-control" value={state} onChange={(e) => setState(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select id="country_field" className="form-control" value={country} onChange={(e) => setCountry(e.target.value)} required>
                                <option value="" >Select your country</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button id="shipping_btn" type="submit" className="btn btn-block py-3">
                            CONTINUE
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}