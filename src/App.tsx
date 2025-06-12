import './App.css'
import { LoginForm } from './compontents/LoginForm/LoginForm'
import { UserHomeView } from './compontents/UserHomeVIew/UserHomeView';
import { useAuth } from './context/AuthContext';


function App() {
  const { authToken, userId } = useAuth();

  return (
    <>
      <h1>Bulky Bull App</h1>
      { authToken && userId ? <UserHomeView/> : <LoginForm/> }
    </>
  )
}

export default App
