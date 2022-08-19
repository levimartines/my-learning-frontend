import NavBarComponent from '../NavBarComponent/NavBarComponent';
import React, { useEffect, useState } from 'react';
import PrincipalService from '../../services/PrincipalService';
import AuthenticationService from '../../services/AuthenticationService';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { User } from '../../models/user';


export default function ProfileComponent() {
  const [qrCodeUrl, setQrCodeUrl] = useState<any>();
  const [user, setUser] = useState<User>({ usingMfa: false, password: '', id: 0, email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    PrincipalService.me().then(async res => {
      setUser(res.data);
    });
    fetchQrUrl();
  }, []);

  function fetchQrUrl() {
    PrincipalService.getQrUrl()
      .then((res) => {
        const base64 = 'data:image/png;base64,' + res.data;
        setQrCodeUrl(base64);
      })
      .catch((err) => console.error('Error fetching QR URL', err));
  }

  function setValue(checked: boolean) {
    setUser({ ...user, usingMfa: checked });
    PrincipalService.setMFA(checked).then()
      .catch(e => console.error('Error setting ', e));
  }

  function logout() {
    AuthenticationService.deleteTokens();
    navigate('/login');
  }

  return (
    <div className="base-component">
      <NavBarComponent/>
      <div className="mt-3 mb-4">
        PROFILE!
      </div>
      <Form.Check
        type="checkbox"
        id="mfaActive"
        label="Use MFA"
        defaultChecked={user.usingMfa}
        onChange={v => setValue(v.target.checked)}
        className="mb-4"
      />
      {user.usingMfa && <>
          <div className="text-center">
            {qrCodeUrl !== '' &&
                <img src={qrCodeUrl} alt="QR code"/>}
          </div>
          <div className="m-4">
              <p>NEVER USE ONLINE QR GENERATORS FOR MFA SECRETS IN REAL SCENARIOS!</p>
              <p>You are sharing your TOTP secret, as well as your username and issuer with a 3th-party company with no
                  legal
                  obligation to keep then secret.</p>
              <p>The ideal is to process and generate your QR code locally.</p>
          </div>
      </>
      }
      <div className="mb-4">
        <Button variant="primary" type="button" onClick={logout}>
          Logout
        </Button>
      </div>
    </div>
  );
}
