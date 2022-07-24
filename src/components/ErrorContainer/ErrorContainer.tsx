import classes from './ErrorContainer.module.css';

interface IProps {
  showError: boolean;
  message: string;
}

function ErrorContainer({ showError, message}: IProps) {

  return (
    showError ?
      <div className={classes.errorContainer}>
        <strong>{message}</strong>
      </div>
      : <></>
  );
}

export default ErrorContainer;