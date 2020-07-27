import React, { useEffect, useRef } from 'react';
import './App.css';
import queen from './img/sprite_running-alice-queen_small.png';
import pawn from './img/r_pawn_upright_small.png';
import paml from './img/palm3_small.png';
import palm2 from './img/palm1.png'
import cloud from './img/cloud.png';

function App() {

  const aliceSprite = useRef(null);
  const foreground = useRef(null);
  const background = useRef(null);
  const cloudBackground = useRef(null);

  useEffect(() => {
      let spriteFrames = [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-100%)' }   
      ];

      let alice = aliceSprite.current.animate(
        spriteFrames, {
          easing: 'steps(7, end)',
          direction: "reverse",
          duration: 1000,
          playbackRate: 1,
          iterations: Infinity
        });

      setInterval( function() {
        if (alice.playbackRate > .4) {
          alice.playbackRate -= .1;
          adjustSceneryPlayback();
        } 
      }, 3000);

      let sceneryFrames =   [
        { transform: 'translateX(100%)' },
        { transform: 'translateX(-100%)' }   
      ];
      
      let sceneryTimingBackground = {
        duration: 36000,
        iterations: Infinity
      };
      let cloudTimingBackGround = {
        duration: 10000,
        iterations: Infinity
      }
      
      let sceneryTimingForeground = {
        duration: 12000,
        iterations: Infinity
      };

      let foregroundMovement = foreground.current.animate(sceneryFrames, sceneryTimingForeground);
      let backgroundMovement = background.current.animate(sceneryFrames, sceneryTimingBackground);
      let cloudMovement = cloudBackground.current.animate(sceneryFrames,cloudTimingBackGround);

      let sceneries = [foregroundMovement, backgroundMovement,cloudMovement];

      let adjustSceneryPlayback = function() {
        console.log(alice.playbackRate)
        if (alice.playbackRate < .8) {
          sceneries.forEach(function(anim) {
            anim.playbackRate = alice.playbackRate/2 * -1;
          });
        } else if (alice.playbackRate > 1.2) {
          sceneries.forEach(function(anim) {
            anim.playbackRate = alice.playbackRate/2;
          });
        } else {
          sceneries.forEach(function(anim) {
            anim.playbackRate = 0;    
          });
        }   
      }
      adjustSceneryPlayback();

      const goFaster = () => {
        alice.playbackRate += 0.1;
        adjustSceneryPlayback();
      }
      
  
      window.addEventListener("click", goFaster);
      alert("To fast speed click on queen")
  })

  
  
  return (
    <div className="container">
      <div className="sky"></div>
      <img src={cloud} ref={cloudBackground} className="cloud" alt=""/>
      
      <div className="earth">
        <div className="alice">
            <img className="alicesprite" ref={aliceSprite} src={queen} alt=" " />
        </div>
      </div>
      
      <div className="scenery" id="foreground" ref={foreground}>
        <img id="treefore" src={paml} alt=" "/>
      </div>

      <div className="scenery background1" ref={background}>
        <img className="pawn" src={pawn} alt=" " />
        <img className="pawn2" src={pawn} alt=" " />
        <img className="treeback" src={palm2} alt=" " />
      </div>
      
    </div>
  );
}

export default App;
