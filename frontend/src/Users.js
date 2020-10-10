import React, {useState, useEffect } from 'react';

import './App.css';
import './global.css';

import Header from './components/Header'

import UserForm from './components/UserForm'
import UserItem from './components/UserItem'

import moment from 'moment'

import api from './services/api'

function Users() {

  const [users, setUsers] = useState([])
  const [logs, setLogs] = useState([])

  const [search, setSearch] = useState("")
  const [searchOption, setSearchOption] = useState("")
  const [warn, setWarn] = useState("Use only numbers when searching for CPFs and RGs")

  useEffect(() => {
    async function loadUsers(){
      const response = await api.get('/api/UserItems')

      setUsers(response.data)
    }

    async function loadLogs(){
      const response = await api.get('/api/LogItems')

      setLogs(response.data)
    }

    loadUsers()
    loadLogs()
  }, [])

  async function handleAddUser(data) {
    var type = "User Creation"
    var target = data.cpf
    var date = moment().toISOString()
    const response = await api.post('/api/UserItems', data)

    if(response.data){
      setUsers([...users, response.data])
    }

    handleAddLogs({type, target, date})
  }

  async function handleAddLogs(data) {
    const response = await api.post('/api/LogItems', data)

    if(response.logs){
      setLogs([...logs, response.data])
    }

  }

  async function handleSearch() {
    var type = ""
    var target = search
    var date = moment().toISOString()

    if(search === ""){
      const response = await api.get('/api/UserItems')
      setWarn("Default Query Reset")
      setUsers(response.data)
    }

    else if(searchOption === "cpf"){

      type="Cpf Search"
      await api.get('/api/UserItems/'+search)
      .then((response) => {
        setUsers([response.data])
        setWarn("User Found")
      }, (error) => {
        setWarn("No User Found")
      });
    }

    else if(searchOption === "name"){
      type="Name Search"
      await api.get(`/api/UserItems/`, { params: { name:search } })
      .then((response) => {
        if(response.data.length > 0){
          setUsers(response.data)
          setWarn("User Found")
        }
        else{
          setWarn("No User Found")
        }
        
      }, (error) => {
        setWarn("No User Found")
      });
    }

    else if(searchOption === "delete"){
      type="Deletion"
      await api.delete('/api/UserItems/'+search)
      .then((response) => {
        setUsers([response.data])
        setWarn("User below deleted")
      }, (error) => {
        setWarn("No User Found")
      });
    }

    else{
      setWarn("Select an option above")
    }

    handleAddLogs({type, target, date})

  }
  
  return (
    
    <div>
      <Header></Header>

      <div id="search">
        <input type="text" onChange={e=> setSearch(e.target.value)}></input>
        <button onClick={handleSearch}><strong>⇛</strong></button>
      </div>



      <div id="search-options">

        <input type="radio" id="cpf" name="option" value="cpf" onChange={e=> setSearchOption("cpf")}></input>
        <label>Search by Cpf or Rg</label>

        <input type="radio" id="name" name="option" value="name" onChange={e=> setSearchOption("name")}></input>
        <label>Search by Name</label>

        <input type="radio" id="delete" name="option" value="delete" onChange={e=> setSearchOption("delete")}></input>
        <label>Delete by Cpf or Rg</label>
      </div>

      <h1 id="warn">{warn}</h1>

      <div id="app">
        <aside>
          <strong>Sign Up</strong>
          <UserForm onSubmit={handleAddUser}/>
        </aside>
        <main>
          <ul>
            {
              users.map(user => (
                <UserItem key={user.cpf} user={user} />
              ))
            }
          </ul>
        </main>
      </div>
    </div>
  );
}

export default Users;
