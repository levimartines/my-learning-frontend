import classes from './ErrorContainer.module.css';

interface IProps {
  showError: boolean;
  message: string;
}

function ErrorContainer({ showError, message}: IProps) {

  return (
    showError ?
      <div className={classes.errorContainer}>
        <p><strong>{message}</strong></p>
      </div>
      : <></>
  );
}

export default ErrorContainer;