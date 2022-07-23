import { FormEvent, useRef, useState } from 'react';
import classes from './SignupComponent.module.css';
import { Button, Form } from 'react-bootstrap';
import ErrorContainer from '../ErrorContainer/ErrorContainer';
import AuthenticationService from '../../services/AuthenticationService';
import { Link, useNavigate } from 'react-router-dom';

function SignupComponent() {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  const [passwordsNotMatch, setPasswordsNotMatch] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const password = passwordInputRef.current!.value;
    const repeatedPassword = repeatPasswordInputRef.current!.value;
    if (repeatedPassword !== password) {
      setPasswordsNotMatch(true);
      return;
    }
    const email = emailInputRef.current!.value;
    createUserAndLogIn(email, password);
  };

  function createUserAndLogIn(email: string, password: string) {
    AuthenticationService.signUp({ email, password })
      .then(() => {
        AuthenticationService.login(email, password).then(res => {
          AuthenticationService.registerSuccessfulLogin(email, res.headers['authorization']);
          navigate(`/`);
        }).catch(err => console.error('Error during Log in', err));
      }).catch(err => console.error('Error during User creation', err));

  }

  return (
    <Form className={classes.signupForm} onSubmit={handleSubmit}>

      <Form.Group className="mb-3 mt-3" controlId="formEmail">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="user@email.com"
          ref={emailInputRef}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please insert a valid email.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          name="password"
          ref={passwordInputRef}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please insert a valid password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formRepeatPassword">
        <Form.Label>Repeat password: </Form.Label>
        <Form.Control
          type="password"
          name="repeatPassword"
          ref={repeatPasswordInputRef}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please insert a valid password.
        </Form.Control.Feedback>
        <ErrorContainer showError={passwordsNotMatch} message="Passwords not match" />
      </Form.Group>

      <div className={classes.center}>
        <Button variant="primary" type="submit">
          Signup
        </Button>
      </div>

      <ErrorContainer showError={passwordsNotMatch} message=""/>
      <div className="mt-3 mb-3">
        Login <Link to={'/login'}>here</Link> !
      </div>
    </Form>
  );
}

export default SignupComponent;
