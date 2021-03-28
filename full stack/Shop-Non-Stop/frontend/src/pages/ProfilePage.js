import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_PROFILE_RESET } from '../redux/actionConstants/userConstants'
import { detailsUser, updateUserProfile } from '../redux/actions/userActions'

const ProfilePage = () =>{


    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState("");
    const [sellerName, setSellerName] = useState("");
    const [sellerLogo, setSellerLogo] = useState("");
    const [sellerDescription, setSellerDescription] = useState("");
    const userSignin = useSelector(state => state.userSignin)
    const{userInfo} = userSignin
    const userDetails = useSelector(state => {
      console.log("this is useDetailsSelector",state)
      return state.userDetails})
    const{loading,error,user} = userDetails;
    console.log("this is user details",user)
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const{success:successUpdate,error:errorUpdate,loading:loadingUpdate} = userUpdateProfile

    const dispatch = useDispatch()
    useEffect(()=>{
        if(!user){
          dispatch({type: USER_UPDATE_PROFILE_RESET})
          dispatch(detailsUser(userInfo._id));
        }
        else{
          setName(user.name);
          setEmail(user.email)
           if (user.seller) {
             setSellerName(user.seller.name);
             setSellerLogo(user.seller.logo);
             setSellerDescription(user.seller.description);
           }
        }
       

    },[dispatch, userInfo._id,user])

    const submitHandler = (e) =>{
        e.preventDefault()
        if(password !== confirmPassword){
          alert("Password and confirm password are not matched")
        }
        else{
          dispatch(
            updateUserProfile({
              userId: user._id,
              name,
              email,
              password,
              sellerName,
              sellerLogo,
              sellerDescription,
            })
          );
        }
    }

    return (
      <div>
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>User Profile</h1>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          ) : (
            <>
              {loadingUpdate && <LoadingBox></LoadingBox>}
              {errorUpdate && (
                <MessageBox variant="danger">{errorUpdate}</MessageBox>
              )}
              {successUpdate && (
                <MessageBox variant="success">
                  Profile Update Successfully
                </MessageBox>
              )}
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Password">Password</label>
                <input
                  type="text"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="Password">Confirm Password</label>
                <input
                  type="text"
                  id="Password"
                  placeholder="Confirm your Password"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
              {user.isSeller && (
                <>
                  <h2>Seller</h2>
                  <div>
                    <label htmlFor="sellerName">Seller Name</label>
                    <input
                      id="sellerName"
                      type="text"
                      placeholder="Enter Seller Name"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="sellerLogo">Seller Logo</label>
                    <input
                      id="sellerLogo"
                      type="text"
                      placeholder="Enter Seller Logo"
                      value={sellerLogo}
                      onChange={(e) => setSellerLogo(e.target.value)}
                    ></input>
                  </div>
                  <div>
                    <label htmlFor="sellerDescription">
                      Seller Description
                    </label>
                    <input
                      id="sellerDescription"
                      type="text"
                      placeholder="Enter Seller Description"
                      value={sellerDescription}
                      onChange={(e) => setSellerDescription(e.target.value)}
                    ></input>
                  </div>
                </>
              )}
              <div>
                <label />
                <button className="button block" type="submit">
                  Update
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    );

}

export default ProfilePage