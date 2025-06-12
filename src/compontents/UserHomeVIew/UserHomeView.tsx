
type UserHomeViewProps = {
  authToken: string;
  userId: string;
}

export const UserHomeView = ({ authToken, userId }: UserHomeViewProps) => {

  return (
    <>
      <h2>Welcome in Bulky Bull App - you are logged in</h2>
      <p>{authToken}</p>
      <p>{userId}</p>
    </>
  )
}