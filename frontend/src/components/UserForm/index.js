import React, {useState, useEffect} from 'react'
import InputBlock from '../InputBlock'
import './styles.scss'

function UserForm({onSubmit}){  
    const [name, setName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [birthdate, setBirthdate] = useState('')
    
    async function handleSubmit(e){
        e.preventDefault()

        await onSubmit({
            name,
            motherName,
            cpf,
            longitude,
        })

        setGithubUserName('');
        setTechs('');
    }

    function validateName(value){
      return (value !== null && (parseFloat(value) <= 90) && (parseFloat(value) >= -90));
    }

    function validateCpf(value){
      return (value !== null && (parseFloat(value) <= 90) && (parseFloat(value) >= -90));
    }
    
    function validateRg(value){
      return (value !== null && (parseFloat(value) <= 90) && (parseFloat(value) >= -90));
    }
    

    function validateLongitude(value){
      return (value !== null && ( parseFloat(value) <= 180) && (parseFloat(value) >= -180));
    }
    
    return (

        <form onSubmit={handleSubmit}>

          <InputBlock className="input-block" title="Nome Completo" validation={validateName} name="name" type="string" 
          value={name} updateValue={setName}/>

          <InputBlock className="input-block" title="Nome da Mãe" validation={validateName} name="motherName" type="string" 
          value={motherName} updateValue={setMotherName}/>

          <InputBlock className="input-block" title="Cpf do Usuário" validation={validateCpf} name="cpf" type="int" 
          value={cpf} updateValue={setCpf}/>

          <InputBlock className="input-block" title="Rg do Usuário" validation={validateRg} name="rg" type="int" 
          value={rg} updateValue={setRg}/>

          <InputBlock className="input-block" title="Data de Nascimento" validation={validateRg} name="birthdate" type="date" 
          value={birthdate} updateValue={setBirthdate}/>

          <button type="submit">Cadastrar</button>
        </form>
    )
}

export default DevForm