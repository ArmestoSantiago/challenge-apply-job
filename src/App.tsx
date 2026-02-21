import { useEffect, useState } from 'react';
import { getUser } from './services/getUser';
import { UserInformation } from './types/types';
import { JobsList } from './components/JobsList';

export function App() {
  const [user, setUser] = useState<UserInformation>();
  const [error, setError] = useState<string | false>(false);

  useEffect(() => {
    const searchUser = async () => {
      try {
        const fetchedUSer = await getUser();
        setUser(fetchedUSer);
      } catch (err: any) {
        setError(err.message);
      }
    };

    searchUser();
  }, []);
  return (
    <>
      <header>
        <h1>Coding Challenge</h1>
        {user && <p><strong>Welcome {user.firstName}</strong></p>}
        {error && <p><strong>User Not Found</strong></p>}
      </header>
      <main>
        <span>Open Positions</span>
        <JobsList user={user} />
      </main>
    </>
  );
}