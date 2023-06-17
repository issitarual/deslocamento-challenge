import { useRouter } from 'next/router';
import HomePage from '../../components/HomePage';

const User = () => {
  const router = useRouter()
  const { userId } = router?.query

  return (
    <>
        <HomePage userId={userId as string || ''}/>
    </>
)
}

export default User