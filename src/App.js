import { BrowserRouter as Router, Link, Routes, Route, Navigate } from "react-router-dom";
import NavBar from './components/NavBar';
import Groups from './features/groups/Groups';
import Group from './features/groups/Group';
import { useSelector } from 'react-redux';
import Login from './features/login/Login';
import Members from './features/members/Members';
import Member from './features/members/Member';
import Courses from './features/courses/Courses';
import Classes from './features/classes/Classes';
import JoinRequests from './features/join/JoinRequests';
import Statistics from './features/statistics/Statistics';

function App() {
    const loggedIn = useSelector((state) => state.login)


    return (
    <Router>
        <div className='h-screen'>
            <NavBar/>
            <Routes>
                <Route path='/' element={loggedIn.status ? <Groups/> : <Navigate replace to={"/login"}/>} />
                
                <Route path='/login' element={!loggedIn.status ? <Login/> :<Navigate replace to={"/"}/>}/>
                <Route path='/groups' element={loggedIn.status ? <Groups/> :<Navigate replace to={"/"}/>}/>
                <Route path='/groups/:id' element={<Group/>}>
                    <Route index element={<Courses/>}/>
                    <Route path='members' element={<Members/>}/>
                    <Route path='courses' element={<Courses/>}/>
                    <Route path='classes' element={<Classes/>}/>
                    <Route path='requests' element={<JoinRequests/>}/>
                    <Route path='statistics' element={<Statistics/>}/>
                </Route>
                <Route path='/users/:id/' element={<Member/>}/>
            </Routes>
        </div>

    </Router>
    );
  
}


export default App;
