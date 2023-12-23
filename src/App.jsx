import './App.css'
import { Routes, Route } from 'react-router-dom'
import PublicPage from './pages/PublicPage'
import SigninForm from './pages/SigninForm'
import SignupForm from './pages/SignupForm'
import ChallengePage from './pages/ChallengePage'
import PlayChallengePage from './pages/PlayChallengePage'
import ScorePage from './pages/ScorePage'
import ChallengeManagementPage from './pages/ChallengeManagementPage'
import ScoreDisplayPage from './pages/ScoreDisplayPage'
import ProfilePage from './pages/ProfilePage'
import UserManagementPage from './pages/UserManagementPage'
import SidebarComponent from './Components/SidebarComponent'
import AuthProvider from './Components/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute'

/**
 * 
 * @returns 
 * Known Bugs in application: 
 *  - signin Messages from the backend are not processed/ gotten correctly so that propper error handling is not possible
 *  - While playing a board of sudoku refreshing the browser before submission will result in a faulty submission breaking the score screen
 * 
 * ToDos
 *  - add admin signup option/secure the admin signup
 *  - add a more detailed user management
 *  - add marketing material to the front page
 *  - Organize the Styling of the pages centrally
 *  - Write Test cases fot the code
 *  - Reorganize code base for better overview
 *  - Edit challenges
 * 
 */
function App() {

  return (
    <>
      <AuthProvider>
        <div className='app-container'>
          <SidebarComponent />
          <div className='main-content'>
            <Routes>
              <Route path="/" element={<PublicPage />} />
              <Route path="/Signin" element={<SigninForm />} />
              <Route path="/Signup" element={<SignupForm />} />
              <Route path="/challenges" element={<ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}><ChallengePage /></ProtectedRoute>} />
              <Route path="/playChallenge/:challengeId" element={<ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}><PlayChallengePage /></ProtectedRoute>} />
              <Route path="/Score" element={<ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}><ScorePage /></ProtectedRoute>} />
              <Route path="/ManageChallenge" element={<ProtectedRoute roles={['ROLE_ADMIN']}><ChallengeManagementPage /></ProtectedRoute>} />
              <Route path="/TopScores" element={<ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}><ScoreDisplayPage /></ProtectedRoute>} />
              <Route path="/Profile" element={<ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}><ProfilePage /></ProtectedRoute>} />
              <Route path="/ManageUser" element={<ProtectedRoute roles={['ROLE_ADMIN']}><UserManagementPage /></ProtectedRoute>} />
            </Routes>
          </div></div>
      </AuthProvider>
    </>
  )
}

export default App
