import NavBarComponent from '../NavBarComponent/NavBarComponent';
import React, { useEffect, useState } from 'react';
import MfaComponent from './MfaComponent';
import ProfileCardComponent from './ProfileCardComponent';
import LogoutButtonComponent from '../LogoutButtonComponent/LogoutButtonComponent';
import { User } from '../../models/user';
import PrincipalService from '../../services/PrincipalService';

export default function ProfileComponent() {
  const [user, setUser] = useState<User>({ usingMfa: false, password: '', id: 0, email: '' });

  useEffect(() => {
    PrincipalService.me().then(async res => {
      setUser(res.data);
    });
  }, []);

  function setUseMFA(checked: boolean) {
    setUser({ ...user, usingMfa: checked });
    PrincipalService.setMFA(checked).then()
      .catch(e => console.error('Error setting ', e));
  }

  return (
    <div className="base-component">
      <NavBarComponent/>
      <ProfileCardComponent user={user}/>
      <MfaComponent user={user} setUseMFA={setUseMFA}/>
      <LogoutButtonComponent/>
    </div>
  );
}
