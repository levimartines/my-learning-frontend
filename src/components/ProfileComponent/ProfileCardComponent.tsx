import React, { FormEvent, useEffect, useRef, useState } from 'react';
import './ProfileCardComponent.css';
import { User } from '../../models/user';
import { Accordion, Button, Form } from 'react-bootstrap';
import PrincipalService from '../../services/PrincipalService';
import defaultImg from '../../assets/default.jpg';

type IProps = {
  user: User
}

const ProfileCardComponent = ({ user }: IProps) => {
  const [img, setImg] = useState<string>(defaultImg);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchProfilePicture();
  }, []);

  const fetchProfilePicture = () => {
    PrincipalService.getProfilePicture()
      .then((res) => {
        const base64 = 'data:image/jpg;base64,' + res.data;
        setImg(base64);
      })
      .catch();
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const files = inputRef.current?.files;
    if (files && files.item(0)) {
      const file = files.item(0);
      PrincipalService.uploadPicture(file!)
        .then(() => {
          fetchProfilePicture();
          inputRef.current!.value = '';
        })
        .catch(e => console.error('Error uploading picture: ', e));
    }

  };

  return (
    <div className="white-box">
      <div className="avatar">
        <img src={img} alt=""/>
      </div>
      <div className="profile-data">
        <h5 className="mb-3">
          E-Mail: {user.email}
        </h5>
        <p>ID: {user.id}</p>
        <p>MFA: {user.usingMfa ? 'Enabled' : 'Disabled'}</p>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Upload Profile Picture</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Control type="file" ref={inputRef}/>
                </Form.Group>
                <div className="justify-content-start">
                  <Button variant="primary" type="submit">
                    Upload !
                  </Button>
                </div>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default ProfileCardComponent;