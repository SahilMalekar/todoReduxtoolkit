import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSignup , userSignin } from "../features/authSlice";

const Auth = () => {

    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })
    const { email, password } = inputs;
    const [auth, setAuth] = useState("Signin")

    const { loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch();

    const handleChnage = (event) => {
        const { name, value } = event.target;
        setInputs(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const authentication = (e) => {
        e.preventDefault();
        if (auth === "Signin") {
            dispatch(userSignin({
                email,
                password
            }))
        } else {
            dispatch(userSignup({
                email,
                password
            }))
        }
    }

    return (
        <div >
            {loading &&
                <div className="progress">
                    <div className="indeterminate"></div>
                </div>}
            <h1>Please {auth}</h1>
            {
                error && <h4>{error}</h4>
            }
            <input type="text" onChange={handleChnage} name="email" value={inputs.email} placeholder="Please enter username" />
            <input type="password" onChange={handleChnage} name="password" value={inputs.password} placeholder="Please enter password" />
            {
                auth === "Signin" ? <h6 onClick={() => setAuth('Signup')}>Don't have an account</h6> :
                    <h6 onClick={() => setAuth('Signin')}>Already have an account</h6>
            }
            <button className='btn #f50057 pink accent-3' onClick={authentication}>{auth}</button>
        </div>
    );
}

export default Auth;