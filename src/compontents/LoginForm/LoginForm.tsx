import { useState } from "react";

type LoginFormProps = {
  handleAuthToken: (authToken: string) => void
}

export const LoginForm = ({ handleAuthToken }: LoginFormProps) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logInAction = async () => {
    console.log('log in')
    console.log(`email: "${email}"`);
    console.log(`password: "${password}"`);


    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error (data.error.message || 'Login failed');
      }

      console.log('goo credentials')
      console.log(data);
      handleAuthToken(data.authToken)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      <h2>Welcome in Bulky Bull App - you need to log in</h2>
      <form 
        style={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: "flex-start",
          margin: "0 auto",
          width: '300px'
        }}
        action={logInAction}
      >
        <label>
          Email
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </label>
        <label>
          Password
          <input type='password' name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </label>
        <button type="submit">Log In</button>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
      </form>
    </>
  )
}