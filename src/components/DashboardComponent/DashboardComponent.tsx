import gif from '../../assets/gif_dashboard.gif';
import NavBar from '../NavBar/NavBar';

export default function DashboardComponent() {
  return (
    <div className="base-component">
      <NavBar/>
      <div className="mt-3 mb-4">
        <img src={gif} alt="loading"/>
      </div>
    </div>
  );
}
