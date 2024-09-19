import { HeadingTag } from '../components/headingTag';
import { useAuth } from '../context/authContext';
// import { logoutUser } from '../redux/auth/auth.api';
const Dashboard = () => {
    const { logout } = useAuth();
    return (
        <div>
            <HeadingTag>Dashboard</HeadingTag>
            <button onClick={() => logout}>Logout</button>
        </div>
    );
};

export default Dashboard;
