import { useState } from 'react'
import './App.css'
import { LoginForm } from './compontents/LoginForm/LoginForm'
import { UserHomeView } from './compontents/UserHomeVIew/UserHomeView';

function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);


  const handleAuthToken = (authToken: string) => {
    setAuthToken(authToken)
  }

  const handleUserId = (userId: string) => {
    setUserId(userId)
  }

  return (
    <>
      <h1>Bulky Bull App</h1>
      {
        authToken && userId
        ? <UserHomeView 
          authToken={authToken}
          userId={userId}
        />
        : <LoginForm
          handleAuthToken={handleAuthToken}
          handleUserId={handleUserId}
        />
      }
    </>
  )
}

export default App
