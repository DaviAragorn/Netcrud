import React, {useState} from 'react';
import './style.css';
import { Link } from "react-router-dom";

function Header(props){
    
    const [theme, setTheme] = useState(true);

    function lightSwitch(){
        if(theme){
          document.documentElement.setAttribute('data-theme', 'light');
        }
        else{
          document.documentElement.setAttribute('data-theme', 'dark');
        }
        setTheme(!theme);
    }
    
    return(
        <div id="header">
            <div id="middle">
            <Link to="/">
              <button>USERS</button>
            </Link>
            <Link to="/logs">
              <button>LOGS</button>
            </Link>

            </div>
            <button onClick={lightSwitch}><img  alt="theme" src="https://img.icons8.com/pastel-glyph/64/000000/light.png"/></button>
        </div>
    );
}


export default Header;