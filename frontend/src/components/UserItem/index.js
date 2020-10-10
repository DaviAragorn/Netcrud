import React from 'react' 

import './styles.css'

function UserItem({ user }){

    return (
        <li className="user-item">
          <header>
            <div className="user-info">
              <span>Name:</span>
              <strong>{user.name}</strong>
              <span>Mother's Name:</span>
              <strong>{user.motherName}</strong>
              <span>Birth Date:</span>
              <strong>{user.birthDate.substring(0, 10)}</strong>
              <span>Signup Date:</span>
              <strong>{user.signupDate.substring(0, 10)}</strong>
              <span>Cpf:</span>
              <strong>{user.cpf.substring(0,3)+'.'+user.cpf.substring(3,6)+'.'+user.cpf.substring(6,9)+'-'+user.cpf.substring(9,11)}</strong>
              <span>Rg:</span>
              <strong>{user.rg.substring(0,2)+'.'+user.rg.substring(2,5)+'.'+user.rg.substring(5,8)+'-'+user.rg.substring(8,9)}</strong>
              
            </div>
          </header>
        </li>
    )
}

export default UserItem