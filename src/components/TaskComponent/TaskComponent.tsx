import NavBar from '../NavBar/NavBar';

export default function TaskComponent() {
  return (
    <div className="base-component">
      <NavBar/>
      <div className="mt-3 mb-4">
        TASKS!
      </div>
    </div>
  );
}