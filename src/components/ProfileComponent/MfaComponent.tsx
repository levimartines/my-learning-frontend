import { Accordion, Form } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import PrincipalService from '../../services/PrincipalService';
import { User } from '../../models/user';
import './MfaComponent.css';

type IProps = {
  user: User;
  setUseMFA: (b: boolean) => void;
}

const MfaComponent = ({ user, setUseMFA }: IProps) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<any>();

  useEffect(() => {
    PrincipalService.getQrUrl()
      .then((res) => {
        const base64 = 'data:image/png;base64,' + res.data;
        setQrCodeUrl(base64);
      })
      .catch((err) => console.error('Error fetching QR URL', err));
  }, []);

  return (
    <div className="m-3 default-size">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>MFA</Accordion.Header>
          <Accordion.Body>
            <Form.Check
              type="checkbox"
              id="mfaActive"
              label="Use MFA"
              defaultChecked={user.usingMfa}
              onChange={v => setUseMFA(v.target.checked)}
            />
            {user.usingMfa && <>
                <div className="text-center">
                  {qrCodeUrl !== '' &&
                      <img src={qrCodeUrl} alt="QR code"/>}
                </div>
                <div className="m-4">
                    <p>NEVER USE ONLINE QR GENERATORS FOR MFA SECRETS IN REAL SCENARIOS!</p>
                    <p>You are sharing your TOTP secret, as well as your username and issuer with a 3th-party company
                        with no
                        legal
                        obligation to keep then secret.</p>
                    <p>The ideal is to process and generate your QR code locally.</p>
                </div>
            </>
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default MfaComponent;