import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {


    const navigate = useNavigate()
    const [Keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${Keyword}`);
    }


    return (
        <form onSubmit={searchHandler}>
            <div className="input-group">
                <input
                    type="text"
                    id="search_field"
                    className="form-control"
                    placeholder="Enter Product Name ..."
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