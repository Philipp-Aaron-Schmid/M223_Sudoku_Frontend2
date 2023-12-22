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
              <Route path="/challenges" element={
                <ProtectedRoute roles={['ROLE_USER', 'ROLE_ADMIN']}>
                  <ChallengePage />
                </ProtectedRoute>
              } />
              <Route path="/playChallenge/:challengeId" element={<PlayChallengePage />} />
              <Route path="/Score" element={<ScorePage />} />
              <Route path="/ManageChallenge" element={<ChallengeManagementPage />} />
              <Route path="/TopScores" element={<ScoreDisplayPage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              <Route path="/ManageUser" element={<UserManagementPage />} />
            </Routes>
          </div></div>
      </AuthProvider>
    </>
  )
}

export default App
