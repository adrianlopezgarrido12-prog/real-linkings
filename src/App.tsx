import { useEffect, useState } from 'react'
import { AppLayout } from './components/AppLayout'
import { candidates } from './data/mockUsers'
import { CompatibilityReportPage } from './pages/CompatibilityReportPage'
import { LandingPage } from './pages/LandingPage'
import { LibraryPage } from './pages/LibraryPage'
import { LoginPage } from './pages/LoginPage'
import { MatchesPage } from './pages/MatchesPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { RegisterPage } from './pages/RegisterPage'
import { RelationshipMapPage } from './pages/RelationshipMapPage'
import { UserDashboardPage } from './pages/UserDashboardPage'
import { emptySymbolicProfile } from './data/symbolic'
import type {
  AnswerValue,
  AppPage,
  CandidateProfile,
  SymbolicProfile,
  UploadedProfilePhoto,
} from './types'

function App() {
  const previewScreen = new URLSearchParams(window.location.search).get(
    'preview',
  )
  const [currentPage, setCurrentPage] = useState<AppPage>(
    previewScreen ? 'onboarding' : 'landing',
  )
  const [authenticated, setAuthenticated] = useState(false)
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
  const [profilePhotos, setProfilePhotos] = useState<UploadedProfilePhoto[]>([])
  const [symbolicProfile, setSymbolicProfile] = useState<SymbolicProfile>({
    ...emptySymbolicProfile,
    uploadedFiles: [],
  })
  const [selectedCandidate, setSelectedCandidate] =
    useState<CandidateProfile>(candidates[0])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentPage])

  const navigate = (page: AppPage) => setCurrentPage(page)

  const selectCandidate = (candidate: CandidateProfile) => {
    setSelectedCandidate(candidate)
    navigate('compatibility-report')
  }

  const enterPrototype = () => {
    setAuthenticated(true)
    navigate('dashboard')
  }

  const logout = () => {
    setAuthenticated(false)
    navigate('landing')
  }

  const isMinimal = currentPage === 'onboarding'

  return (
    <AppLayout
      currentPage={currentPage}
      authenticated={authenticated}
      onNavigate={navigate}
      onLogout={logout}
      minimal={isMinimal}
    >
      {currentPage === 'landing' && (
        <LandingPage onStart={() => navigate('onboarding')} />
      )}

      {currentPage === 'login' && (
        <LoginPage
          onEnter={enterPrototype}
          onRegister={() => navigate('register')}
        />
      )}

      {currentPage === 'register' && (
        <RegisterPage
          onEnter={enterPrototype}
          onLogin={() => navigate('login')}
        />
      )}

      {currentPage === 'dashboard' && (
        <UserDashboardPage
          answers={answers}
          onViewMap={() => navigate('relationship-map')}
          onEditMap={() => navigate('onboarding')}
          onViewMatches={() => navigate('matches')}
          onViewCandidate={selectCandidate}
          onViewLibrary={() => navigate('library')}
        />
      )}

      {currentPage === 'library' && <LibraryPage />}

      {currentPage === 'onboarding' && (
        <OnboardingPage
          answers={answers}
          initialScreenId={
            previewScreen === 'mbti'
              ? 'symbolic-personality'
              : previewScreen === 'astrology' || previewScreen === 'symbolic'
                ? 'symbolic-astrology'
                : undefined
          }
          profilePhotos={profilePhotos}
          symbolicProfile={symbolicProfile}
          onAnswer={(questionId, value) =>
            setAnswers((current) => ({ ...current, [questionId]: value }))
          }
          onProfilePhotosChange={setProfilePhotos}
          onSymbolicChange={setSymbolicProfile}
          onFinish={() => navigate('relationship-map')}
          onExit={() => navigate('landing')}
        />
      )}

      {currentPage === 'relationship-map' && (
        <RelationshipMapPage
          answers={answers}
          symbolicProfile={symbolicProfile}
          onViewMatches={() => navigate('matches')}
        />
      )}

      {currentPage === 'matches' && (
        <MatchesPage onSelectCandidate={selectCandidate} />
      )}

      {currentPage === 'compatibility-report' && (
        <CompatibilityReportPage
          candidate={selectedCandidate}
          answers={answers}
          symbolicProfile={symbolicProfile}
          onBack={() => navigate('matches')}
        />
      )}
    </AppLayout>
  )
}

export default App
