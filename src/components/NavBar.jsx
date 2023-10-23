import {React} from 'react'
import { Link } from 'react-router-dom';
import {ReactComponent as Logo} from '../assets/hh_logo_beta.svg';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../features/login/loginSlice';

export default function NavBar() {
  const loggedIn = useSelector((state) => state.login)
  const user = useSelector((state) => state.login.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/');
  }


  return (
    <nav className="bg-slate-700 border-gray-200 dark:bg-gray-900 h-10 px-10 flex justify-between items-center shadow-lg z-10 text-slate-50">
        <div className='flex space-x-4'>
            <a href='/'>
                <Logo/>
            </a>
            <Link to="/groups">Groups</Link>
        </div>
        <div className='flex space-x-4'>
          <a href="/">Go Pro</a>
          {loggedIn.status ? <div className='flex space-x-4'><Link to="/profile">{user.first_name}</Link>  <button onClick={handleLogOut}>Logout</button> </div> : <Link to="/login">Login</Link>}
        </div>
    </nav>
  )
}
