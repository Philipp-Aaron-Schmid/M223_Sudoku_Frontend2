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
