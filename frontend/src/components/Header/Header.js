import React, {useState, useEffect} from 'react';
import './style.css';

function Header(props){
    
    const [theme, setTheme] = useState(true);

    useEffect(() => {
      props.setLang(languages[langIndex]['name'])
    })

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
              <button>USERS</button>
              <button>ACTIONS</button> 
            </div>
            <button onClick={lightSwitch}><img  alt="theme" src="https://img.icons8.com/pastel-glyph/64/000000/light.png"/></button>
        </div>
    );
}


export default Header;