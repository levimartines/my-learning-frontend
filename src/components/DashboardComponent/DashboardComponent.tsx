import gif from '../../assets/gif_dashboard.gif';
import NavBarComponent from '../NavBarComponent/NavBarComponent';

export default function DashboardComponent() {
  return (
    <div className="base-component">
      <NavBarComponent/>
      <div className="mt-3 mb-4">
        <img src={gif} alt="loading"/>
      </div>
    </div>
  );
}
