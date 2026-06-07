import { useEffect, useState } from 'react'
import { AppLayout } from './components/AppLayout'
import { candidates } from './data/mockUsers'
import { CompatibilityReportPage } from './pages/CompatibilityReportPage'
import { LandingPage } from './pages/LandingPage'
import { MatchesPage } from './pages/MatchesPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { RelationshipMapPage } from './pages/RelationshipMapPage'
import { emptySymbolicProfile } from './data/symbolic'
import type {
  AnswerValue,
  AppPage,
  CandidateProfile,
  SymbolicProfile,
} from './types'

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing')
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
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

  const isMinimal = currentPage === 'onboarding'

  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={navigate}
      minimal={isMinimal}
    >
      {currentPage === 'landing' && (
        <LandingPage onStart={() => navigate('onboarding')} />
      )}

      {currentPage === 'onboarding' && (
        <OnboardingPage
          answers={answers}
          symbolicProfile={symbolicProfile}
          onAnswer={(questionId, value) =>
            setAnswers((current) => ({ ...current, [questionId]: value }))
          }
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
          symbolicProfile={symbolicProfile}
          onBack={() => navigate('matches')}
        />
      )}
    </AppLayout>
  )
}

export default App
