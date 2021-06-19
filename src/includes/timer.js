import { useEffect,useState } from "react";
import { Redirect } from "react-router";

export const Timer = props => {

    var TIME = props.time;
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
           // <Redirect to="/" />
        }
        }, 1000);
 
    if(times == "Time out") {
        return <Redirect to={"/report/" + props.set_id} />
    } else {
        return (<>{times}</>)
    }
    
}