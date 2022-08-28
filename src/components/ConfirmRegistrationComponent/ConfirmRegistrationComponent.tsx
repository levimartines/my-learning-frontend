import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserService from '../../services/UserService';

function ConfirmRegistrationComponent() {
  const [searchParams] = useSearchParams();
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    UserService.confirmRegistration(searchParams.get('code') as string)
      .then(() => setIsConfirmed(true))
      .catch(e => console.error('Error confirming account', e));
  });


  return (
    <div className="base-component">
      <div className="mt-3 mb-4">
        {
          isConfirmed
            ? <p>Account successful confirmed! Click <Link to="/login">here</Link> to go to login page.</p>
            : <p>Error confirming registration. Please try again later.</p>
        }
      </div>
    </div>
  );
}

export default ConfirmRegistrationComponent;
