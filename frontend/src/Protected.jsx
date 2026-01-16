import WithAuth from './utils/withAuth.jsx';
import App from './landingpage/homepage/App.jsx'

const Protected = () => {
  return (
  <>
  <App/>
  </>
  )
}

export default WithAuth(Protected);