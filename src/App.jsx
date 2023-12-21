import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import PrivatePage from './pages/PrivatePage'
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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<PublicPage />} />
          <Route path="/private" element={<PrivatePage />} />
          <Route path="/Signin" element={<SigninForm />} />
          <Route path="/Signup" element={<SignupForm />} />
          <Route path="/challenges" element={<ChallengePage />} />
          <Route path="/playChallenge/:challengeId" element={<PlayChallengePage />} />
          <Route path="/Score" element={<ScorePage />} />
          <Route path="/ManageChallenge" element={<ChallengeManagementPage/>} />
          <Route path="/TopScores" element={<ScoreDisplayPage/>} />
          <Route path="/Profile" element={<ProfilePage/>} />
          <Route path="/ManageUser" element={<UserManagementPage/>} />
        </Routes>
      </div>
    </>
  )
}

export default App
