import { useEffect,useState } from "react";
import { Redirect } from "react-router";

export default function Timer(props) {

    var TIME = 180;
    const[times , setTime] = useState()
    const[fixtime] = useState(new Date().getTime() + TIME * 60 * 1000)

    const x = setInterval(function() {

        let now = new Date().getTime();
    
        let TimeLeft = fixtime - now;
    
        const minutes = Math.floor( (TimeLeft/1000/60) % TIME );
        const seconds = Math.floor( (TimeLeft/1000) % 60 );
        
        setTime(minutes + ":" + seconds)

        if (TimeLeft < 0) {
            clearInterval(x);
            setTime("Time out");
            // <Redirect to="/contact_us" />
        }
        }, 1000);
    

    return (
        <>
            <span>{times}</span>
        </>
    )
}