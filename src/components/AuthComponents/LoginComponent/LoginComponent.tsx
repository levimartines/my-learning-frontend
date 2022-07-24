import { FormEvent, useRef, useState } from 'react';
import AuthenticationService from '../../../services/AuthenticationService';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import classes from '../AuthComponent.module.css';
import { Button, Form } from 'react-bootstrap';
import ErrorContainer from '../../ErrorContainer/ErrorContainer';

function LoginComponent() {
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const [hasLoginFailed, setHasLoginFailed] = useState(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;
    AuthenticationService.login(email, password).then(res => {
      const token = res.headers.authorization;
      AuthenticationService.registerSuccessfulLogin(email, token);
      navigate(`/dashboard`);
    }).catch(err => {
      AuthenticationService.deleteTokens();
      console.error('Error during Log in', err);
      setHasLoginFailed(true);
    });
  };

  if (AuthenticationService.isUserLoggedIn()) {
    return <Navigate to="/" replace/>;
  }

  return (
    <div className='base-component'>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 mt-3" controlId="formEmail">
          <Form.Label>Email: </Form.Label>
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

        <Form.Group className="mb-4" controlId="formPassword">
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
        <div className={classes.center}>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </div>
        <ErrorContainer showError={hasLoginFailed} message="Invalid username or password!"/>
      </Form>
      <div className="mt-3 mb-4">
        Register a new Account <Link to={'/signup'}>here</Link> !
      </div>
    </div>
  );
}

export default LoginComponent;