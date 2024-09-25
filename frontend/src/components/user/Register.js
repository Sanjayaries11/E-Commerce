import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../actions/userAction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png")
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState);
    const navigate = useNavigate();

    const onChange = (e) => {
        if (e.target.name === 'avatar') {
            const reader = new FileReader;  //holding the data from input which we selected as image,this is object 
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result)  //result having the result of reader
                    setAvatar(e.target.files[0])   //setting the pic to setAvatar state
                }
            }
            reader.readAsDataURL(e.target.files[0]);  //change the data to url and hold,in event target the files property we achieve after we select file, 0th index
        } else {
            setUserData({ ...userData, [e.target.name]: e.target.value })  //saying getting value as per name from each field
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();   //sending all data to action
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);
        dispatch(register(formData));
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
            return
        }
        if (error) {      //if not entering any data on register form
            toast.error(error, {
                position: "bottom-center"
            })
            return
        }
    }, [error, isAuthenticated])


    return (
        <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                    <h1 className="mb-3">Register</h1>
                    <div className="form-group">
                        <label htmlFor="email_field">Name</label>
                        <input type="name" id="name_field" name="name" onChange={onChange} className="form-control" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email_field">Email</label>
                        <input
                            type="email"
                            id="email_field"
                            className="form-control"
                            name="email"
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            name="password"
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='avatar_upload'>Avatar</label>
                        <div className='d-flex align-items-center'>
                            <div>
                                <figure className='avatar mr-3 item-rtl'>
                                    <img
                                        src={avatarPreview}
                                        className='rounded-circle'
                                        alt='image'
                                    />
                                </figure>
                            </div>
                            <div className='custom-file'>
                                <input
                                    type='file'
                                    name='avatar'
                                    onChange={onChange}
                                    className='custom-file-input'
                                    id='customFile'
                                />
                                <label className='custom-file-label' htmlFor='customFile'>
                                    Choose Avatar
                                </label>
                            </div>
                        </div>
                    </div>
                    <button
                        id="register_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={loading}>
                        REGISTER
                    </button>
                </form>
            </div>
        </div>
    )
}