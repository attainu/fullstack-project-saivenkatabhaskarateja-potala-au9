import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { signin } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const SigninPage = (props) =>{

    const redirect = props.location.search? props.location.search.split("=")[1]:"/"
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo, loading, error } = userSignin;
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    
    const submitHandler = (e) =>{
        console.log("inside sigin page,type of email",typeof(email))
        e.preventDefault();
        //sign in actoin
        dispatch(signin(email,password));
    }

    useEffect(() => {
      if (userInfo) {
        props.history.push(redirect);
      }
    }, [props.history, redirect, userInfo]);

    return (
      <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Sigin In</h1>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label />
            <button className="button form-button" type="submit">
              Sign in
            </button>
          </div>
          <div>
            <label />
            <div className="div">
              New Customer?{" "}
              <Link to={`/register?redirect=${redirect}`}>
                {" "}
                Create Your Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
}

export default SigninPage