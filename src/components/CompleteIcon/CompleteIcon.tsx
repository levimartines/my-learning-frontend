import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { FiCheck } from 'react-icons/fi';

interface IProps {
  click: () => void;
}

function CompleteIcon({ click }: IProps) {
  const [isDoneIconHovering, setIsDoneIconHovering] = useState(false);

  if (isDoneIconHovering) {
    return (
      <FaCheck
        className="pointer"
        aria-label="mark as done"
        onClick={click}
        onMouseOut={() => setIsDoneIconHovering(false)}
      />
    );
  }
  return <FiCheck
    className="pointer"
    aria-label="mark as done"
    onClick={click}
    onMouseOver={() => setIsDoneIconHovering(true)}
  />;
}

export default CompleteIcon;
