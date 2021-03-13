import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import { register } from "../redux/actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const RegisterPage = (props) =>{

    const redirect = props.location.search? props.location.search.split("=")[1]:"/"
    const userRegister = useSelector((state) => state.userRegister);
    const { userInfo, loading, error } = userRegister;
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [mobile,setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("");
    
    const dispatch = useDispatch()
    
    const submitHandler = (e) =>{
        console.log("inside sigin page,type of email",typeof(email))
        e.preventDefault();
        //sign in actoin
        if(password !== confirmPassword){
          alert("password not matching re-enter again")
        }
        else{
        dispatch(register(name, email, password, mobile));
        }
        
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
            <h1>Create Account</h1>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox variant="danger">{error}</MessageBox>}
          </div>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter name"
              required
              onChange={(e) => setName(e.target.value)}
            />
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
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="number"
              id="mobile"
              placeholder="Enter Mobile No"
              required
              onChange={(e) => setMobile(e.target.value)}
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
            <label htmlFor="password">Confirm Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
              onChange={(e) => setconfirmPassword(e.target.value)}
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
              Already have an account?{" "}
              <Link to={`/signin?redirect=${redirect}`}> Sign-In</Link>
            </div>
          </div>
        </form>
      </div>
    );
}

export default RegisterPage;