import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../context/AuthContext";


const wait = (duration: number) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}

const fetchUser = async (authToken: string, userId: string) => {
  await wait(1000);
  const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
    headers: {
      'authentication': `Bearer ${authToken}`
    },
  })
  return await response.json();
}

const fetchWorkouts = async (authToken: string, userId: string) => {
  await wait(1000);
  const response = await fetch(`http://localhost:8080/api/users/${userId}/workouts`, {
    headers: {
      'authentication': `Bearer ${authToken}`
    },
  })
  return await response.json();
}

export const UserHomeView = () => {

  const { authToken, userId, isAuthenticated, logout } = useAuth();
  if (!isAuthenticated) return;

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(authToken!, userId!) 
  })

  const workoutsQuery = useQuery({
    queryKey: ["workouts"],
    queryFn: () => fetchWorkouts(authToken!, userId!)
  })

  return (
    <>
      <h2>Welcome in Bulky Bull App - you are logged in</h2>

      {userQuery.isLoading && <p>Loading user...</p>}
      {userQuery.data && <p>Hello {userQuery.data.firstName} {userQuery.data.lastName}</p>}

      {workoutsQuery.isLoading && <p>Loading workouts...</p>}
      {workoutsQuery.data && <p>Workouts number: {workoutsQuery.data.length}</p>}

      <button onClick={logout}>Log Out</button>
    </>
  )
}