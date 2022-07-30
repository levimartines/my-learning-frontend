import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { FiTrash } from 'react-icons/fi';

interface IProps {
  click: () => void;
}

function DeleteIcon({ click }: IProps) {
  const [isDeleteIconHovering, setIsDeleteIconHovering] = useState(false);

  if (isDeleteIconHovering) {
    return (
      <FaTrash
        className="pointer"
        aria-label="delete"
        onClick={click}
        onMouseOut={() => setIsDeleteIconHovering(false)}
      />
    );
  }
  return <FiTrash
    className="pointer"
    aria-label="delete"
    onClick={click}
    onMouseOver={() => setIsDeleteIconHovering(true)}
  />;
}

export default DeleteIcon;
