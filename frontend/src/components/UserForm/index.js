import React, {useState} from 'react'
import InputBlock from '../InputBlock'
import './styles.css'
import moment from 'moment'

function UserForm({onSubmit}){  
    const [name, setName] = useState('')
    const [motherName, setMotherName] = useState('')
    const [cpf, setCpf] = useState('')
    const [rg, setRg] = useState('')
    const [birthDate, setBirthDate] = useState('')
    
    async function handleSubmit(e){ 
        e.preventDefault()

        var now = moment().toISOString()
        var birthDateTime = moment(birthDate).toISOString()

        await onSubmit({
            name,
            motherName,
            cpf,
            rg,
            birthDate: birthDateTime,
            signupDate: now
        })

        setName('');
        setMotherName('');
        setCpf('');
        setRg('');
        setBirthDate('');
    }
    
    //Frontend Validation
    function validateName(value){
      return (value.length > 5 && value.match(/^[A-Za-z+ ]+$/));
    }

    function validateCpf(value){
      return (value.length === 11 && value.match(/^[0-9]+$/));
    }
    
    function validateRg(value){
      return (value.length === 9 && value.match(/^[0-9]+$/));
    }

    function ValidateBirthDate(value){
      var birthDateTime = new moment(value);
      var now = new moment();
      return (birthDateTime? now.diff(birthDateTime, 'years') < 100: false);
    }

    return (

        <form onSubmit={handleSubmit}>

          <InputBlock className="input-block" title="User Name:" validation={validateName} name="name" type="string" 
          value={name} updateValue={setName}/>

          <InputBlock className="input-block" title="Mother's Name:" validation={validateName} name="motherName" type="string" 
          value={motherName} updateValue={setMotherName}/>

          <InputBlock className="input-block" title="CPF: (Only Numbers)" validation={validateCpf} name="cpf" type="string" 
          value={cpf} updateValue={setCpf}/>

          <InputBlock className="input-block" title="RG: (Only Numbers)" validation={validateRg} name="rg" type="string" 
          value={rg} updateValue={setRg}/>

          <InputBlock className="input-block" title="Birth Date:" validation={ValidateBirthDate} name="birthdate" type="date" 
          value={birthDate} updateValue={setBirthDate}/>

          
          <button type="submit">Sign Up</button>
        </form>
    )
}

export default UserForm