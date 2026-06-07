import { useEffect, useState } from 'react'
import { AppLayout } from './components/AppLayout'
import { candidates } from './data/mockUsers'
import { CompatibilityReportPage } from './pages/CompatibilityReportPage'
import { LandingPage } from './pages/LandingPage'
import { MatchesPage } from './pages/MatchesPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { RelationshipMapPage } from './pages/RelationshipMapPage'
import type {
  AnswerValue,
  AppPage,
  CandidateProfile,
} from './types'

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing')
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({})
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
          onAnswer={(questionId, value) =>
            setAnswers((current) => ({ ...current, [questionId]: value }))
          }
          onFinish={() => navigate('relationship-map')}
          onExit={() => navigate('landing')}
        />
      )}

      {currentPage === 'relationship-map' && (
        <RelationshipMapPage onViewMatches={() => navigate('matches')} />
      )}

      {currentPage === 'matches' && (
        <MatchesPage onSelectCandidate={selectCandidate} />
      )}

      {currentPage === 'compatibility-report' && (
        <CompatibilityReportPage
          candidate={selectedCandidate}
          onBack={() => navigate('matches')}
        />
      )}
    </AppLayout>
  )
}

export default App
