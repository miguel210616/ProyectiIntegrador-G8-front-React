import React from 'react';
import '../App.css';
import './css/HeroSection.css';
import Cards from './Cards';
import Footer from './Footer';

function Home() {
  return (
    <>
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>"CuyoPe"</h1>
      <p>"En momentos difíciles...saca tu mejor sonrisa"</p>
      <div className='hero-btns'>
      </div>
    </div>
    <Cards/>
    <Footer/>
    </>
    
    
  );
}

export default Home;
