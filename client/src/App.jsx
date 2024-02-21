
import './App.css';
import { useEffect,useState } from 'react';


let clientID="6c91e696fe923978ac3b";
function App() {
  let[a,seta]=useState(false);
  let[userData,setUserData]=useState({});

  useEffect(()=>{
    let querystring=window.location.search;
    console.log(querystring);
    let urlparams=new URLSearchParams(querystring);
    console.log(urlparams);
    let codeparams=urlparams.get("code");
    console.log(codeparams);

    if(codeparams && (localStorage.getItem("accessToken")===null)){
      let call=async function getAccessToken(){
        console.log("codeparams",codeparams);
        await fetch(`http://localhost:4000/getAccessToken?code=${codeparams}`,{
          method:"GET"
        }).then((response)=>{
          return response.json()
        }).then((data)=>{
          console.log(data);
          if(data.access_token){
            localStorage.setItem("accessToken",data.access_token);
            seta(!a);
          }
        })
      }
      call()
    }

  },[])

  async function getUserData(){
    console.log("inside get user data1",localStorage.getItem("accessToken"))
    await fetch("http://localhost:4000/getuserdata",{
      method:"GET",
      headers:{
        "Authorization" : "Bearer "+localStorage.getItem("accessToken")
      }
    }).then((response)=>{
      return response.json();
    }).then((data)=>{
      console.log(data);
      setUserData(data);
    })
  }

  function loginwithgithub(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id="+clientID);
  }


  return (
    <>
    {localStorage.getItem("accessToken")?
    <>
    <h2>we have access token</h2>
    <button onClick={()=>{localStorage.removeItem("accessToken");seta(!a)}}>logout</button>
    <button onClick={getUserData}>get user data</button>
    {Object.keys(userData).length !==0?
    <>
    <p>hello {userData.login}!</p>
    </>
    :
    <>
    </>}
    </>
    :
    <>
        <button onClick={loginwithgithub}>Login withh github</button>
    </>
    }
      
       
    </>
  )
}

export default App
