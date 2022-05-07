import Interstellar from "../images/audio/Interstellar-01.mp3";
import {useRef, useState} from 'react';
import play from "../images/play.svg"
import pause from "../images/pause.svg"

function Audio() {
    const [songStatus, isSongStatus] = useState(false);
    const audio = useRef();

    function startSong(){
        audio.current.volume = 0.3;

        isSongStatus(!songStatus);

        if(audio.current.paused){
            audio.current.play();
        }else{
            audio.current.pause();
        }
    }

    return (
        <>
            <audio ref={audio} src={Interstellar}/>
            <button
                onClick={startSong}
                className="button-play"
            >
                <img className="button-play-img" src={songStatus ? pause : play} alt={songStatus ? "Button: музыка выключена" : "Button: музыка включена"}/>
            </button>
        </>

    );
}


export default Audio;