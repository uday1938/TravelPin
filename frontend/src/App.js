import React, {useState, useEffect} from 'react';
import Map,{Marker,Popup} from 'react-map-gl';
import {Room, Star} from '@material-ui/icons';
import "./app.css";
import './Register';
import './Login';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
// import {format} from 'timeago.js';
// require('dotenv').config()

function App() {
  //defining a variable that we use --------------------------------------------------------------
  const myStorage= window.localStorage;
  const [currentUser,setCurrentUser]=useState(myStorage.getItem("user"));
  let [newPlace,setNewPlace]= React.useState(null);
  let [pins,setPins]=useState([]); 
  let [currentPlaceId,setCurrentPlaceId]=React.useState(null);
  const [tittle,setTittle]=useState(null);
  const [desc,setDesc]=useState(null);
  const [rating,setRating]=useState(1);
  const [showRegister,setShowRegister]=useState(0);
  const [showLogin,setShowLogin]=useState(0);
  //-----------------------------------------------------------------------------------------------
  //defining the functions which we use to set the variable above---------------------------------------------------------------------------------------------------------------
  useEffect(()=>{
    const getPins=async()=>{
      try{
        const res= await axios.get("/pins");
        setPins(res.data);
      }catch(err){
        console.log(err);
      }
    }
    getPins(); //function call here itself
  });

  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id); 
    console.log(currentPlaceId);
  };
  const handleAddClick=(e)=>{
    const longitude=e.lngLat.lng;
    const latitude=e.lngLat.lat;
    setNewPlace({
      lat: latitude,
      long: longitude
    });
    // console.log(newPlace);
  };
  const handleSubmit= async(e)=>{
    e.preventDefault();
    const newPin={
      username: currentUser,
      tittle, 
      desc,
      rating,
      lat: newPlace.lat,
      long: newPlace.long,
    }
    try{
      const res= await axios.post("/pins",newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    }catch(err){
      console.log(err);
    }
  }
  const handleLogout=()=>{
    myStorage.removeItem("user");
    setCurrentUser(null);
  }
  //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return <Map
    initialViewState={{
      longitude: 78,
      latitude: 30,
      zoom: 3
    }}
    style={{width: '100vw', height: '100vh'}}
    mapStyle="mapbox://styles/mapbox/streets-v12"
    mapboxAccessToken={'pk.eyJ1IjoidWRheWthdXNoaWszMTIiLCJhIjoiY2xibTRoNDY3MGJ6bDNwb2R2M3c1NXRjZyJ9.ui1Hr8H6crvN0txF9IsGAg'}
    onDblClick={handleAddClick}
  >
    {pins.map(p=>(
      <>
      <Marker 
        latitude={p.lat}
        longitude={p.long}
      >
        <Room 
          style={{
            color: p.username===currentUser? 'tomato': 'slateblue', 
            cursor:'pointer'
          }} 
          onClick={() => handleMarkerClick(p._id, p.lat, p.long)}
        />
      </Marker>
      {p._id === currentPlaceId && (
        <Popup 
          longitude={p.long} 
          latitude={p.lat}
          anchor="left"
          onClose={()=>setCurrentPlaceId=null}
        >
        <div className='card'> 
          <label>Place</label>
            <h4 className='place'>{p.tittle}</h4>
          <label>Review</label>
            <p className='desc'>{p.desc}</p>
          <label>Rating</label>
            <div className='stars'>
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
              <Star className='star' />
            </div>
          <label>Information</label>
            <span className='username'>Created by <b>{p.username}</b></span>
            {/* <span className='date'>{format(p.createdAt)}</span> */}
        </div>
      </Popup>
    )} 
      </>
    ))}
    {newPlace && (
      <Popup 
        longitude={newPlace.long} 
        latitude={newPlace.lat}
        anchor="left"
        onClose={()=>setCurrentPlaceId=null}
      >
        <div>
          <form onSubmit={handleSubmit}>
            <label>Tittle</label>
            <input 
              placeholder="Enter a Tittle" 
              onChange={(e)=>setTittle(e.target.value)}
            />
            <label>Review</label>
            <textarea 
              placeholder='say us something about this place'
              onChange={(e)=>setDesc(e.target.value)}
            />
            <label>Rating</label>
            <select>
              onChange={(e)=>setRating(e.target.value)}
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <button className='submitButton' type='submit'>Add Pin</button>
          </form>
        </div>
      </Popup>
    )}
    {currentUser?(
      <button className='button logout' onClick={handleLogout}>Log out</button>
    ): (
      <div className='buttons'>
      <button className='button login' onClick={()=>setShowLogin(true)}>Login</button>
      <button className='button register' onClick={()=>setShowRegister(true)}>Register</button>
    </div>
  )}
  {showRegister && (
    <Register setShowRegister={setShowRegister}></Register>
  )}
  {showLogin && (
    <Login 
      setShowLogin={setShowLogin} 
      myStorage={myStorage}
      setCurrentUser={setCurrentUser}
    ></Login>
  )}  
    
    
  </Map>;
}
export default App;