import {useEffect} from 'react';
import './App.css';
import Login from "./components/Login";
import MainPage from "./components/MainPage";
import {useSelector} from "react-redux";

function App() {
    const user = useSelector(state=>state.loginUser.currentLogin);
    useEffect(() => {
        // TEST API, it might be removed
        fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
            console.log('API CONNECTION IS OK');
        }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))

    }, [user]);
    return (
        <div className="app-container">
            {!user ? (
                <Login/>
            ) : (
                <MainPage/>
            )}
        </div>
    );

}

export default App;
