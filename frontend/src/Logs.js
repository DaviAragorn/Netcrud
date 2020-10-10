import React, {useState, useEffect} from 'react';

import './App.css';
import './global.css';
import api from './services/api'

import Header from './components/Header'

import LogItem from './components/LogItem'

function Logs() {
    const [logs, setLogs] = useState([])

    useEffect(() => {

        async function loadLogs(){
            const response = await api.get('/api/LogItems')

            setLogs(response.data)
        }

        loadLogs()
    }, [])

    return (
        
        <div>
            <Header></Header>
            <div style={{"height": "50px"}}></div>
            <div id="app">
                <main>
                <ul>
                    {
                    logs.map(log => (
                        <LogItem key={log.date} log={log} />
                    ))
                    }
                </ul>
                </main>
            </div>
        </div>
    );
    }

export default Logs;
