import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Search() {


    const navigate = useNavigate();  //navigate to desire url you want
    const location = useLocation();  //to get the current URL
    const [Keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${Keyword}`);
    }

    const clearKeyword = () => {
        setKeyword("");
    }
    useEffect(() => {
        if (location.pathname == "/") {
            clearKeyword();
        }
    }, [location]) //location can change anytime if you want whenever had "/" use dependency for useEffect

    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
                    autoComplete="off"
                    value={Keyword}
                    onChange={(e) => { setKeyword(e.target.value) }}
                />
                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </form>
    )
}