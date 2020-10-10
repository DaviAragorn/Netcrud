import React from 'react' 

import './styles.css'

function LogItem({ log }){

    return (
        <li className="log-item">
          <header>
            <div className="log-info">
              <span>Type:</span>
              <strong>{log.type}</strong>
              <span>Target:</span>
              <strong>{log.target}</strong>
              <span>Date:</span>
              <strong>{log.date}</strong>
            </div>
          </header>
        </li>
    )
}

export default LogItem