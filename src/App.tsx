import { useEffect, useRef, useState } from 'react'
import { AppLayout } from './components/AppLayout'
import { candidates } from './data/mockUsers'
import { CompatibilityReportPage } from './pages/CompatibilityReportPage'
import { ConversationPage } from './pages/ConversationPage'
import { LandingPage } from './pages/LandingPage'
import { LibraryPage } from './pages/LibraryPage'
import { LoginPage } from './pages/LoginPage'
import { MatchesPage } from './pages/MatchesPage'
import { OnboardingPage } from './pages/OnboardingPage'
import { PaymentCancelPage } from './pages/PaymentCancelPage'
import { PaymentSuccessPage } from './pages/PaymentSuccessPage'
import { PricingPage } from './pages/PricingPage'
import { RegisterPage } from './pages/RegisterPage'
import { RelationshipMapPage } from './pages/RelationshipMapPage'
import { UserDashboardPage } from './pages/UserDashboardPage'
import { emptySymbolicProfile } from './data/symbolic'
import type {
  AnswerValue,
  AppPage,
  CandidateProfile,
  ConversationMessage,
  ConversationRequest,
  ConversationStatus,
  SymbolicProfile,
  UploadedProfilePhoto,
} from './types'

function getInitialPage(previewScreen: string | null): AppPage {
  const pathname = window.location.pathname

  if (pathname.includes('payment-success')) return 'payment-success'
  if (pathname.includes('payment-cancel')) return 'payment-cancel'
  if (previewScreen) return 'onboarding'

  return 'landing'
}

function App() {
  const previewScreen = new URLSearchParams(window.location.search).get(
    'preview',
  )
  const [currentPage, setCurrentPage] = useState<AppPage>(() =>
    getInitialPage(previewScreen),
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
  const [conversationCandidateId, setConversationCandidateId] = useState<
    string | null
  >(null)
  const [conversationStatus, setConversationStatus] =
    useState<ConversationStatus>('draft')
  const conversationStatusRef = useRef<ConversationStatus>('draft')
  const [conversationRequest, setConversationRequest] =
    useState<ConversationRequest | null>(null)
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessage[]
  >([])

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [currentPage])

  useEffect(() => {
    conversationStatusRef.current = conversationStatus
  }, [conversationStatus])

  const navigate = (page: AppPage) => {
    setCurrentPage(page)

    if (
      page !== 'payment-success' &&
      page !== 'payment-cancel' &&
      window.location.pathname !== '/'
    ) {
      window.history.replaceState({}, '', '/')
    }
  }

  const selectCandidate = (candidate: CandidateProfile) => {
    setSelectedCandidate(candidate)
    navigate('compatibility-report')
  }

  const openConversation = (candidate: CandidateProfile) => {
    setAuthenticated(true)
    setSelectedCandidate(candidate)

    if (
      conversationCandidateId !== candidate.id ||
      conversationStatus === 'closed'
    ) {
      setConversationCandidateId(candidate.id)
      setConversationStatus('draft')
      setConversationRequest(null)
      setConversationMessages([])
    }

    navigate('conversation')
  }

  const submitConversationRequest = (request: ConversationRequest) => {
    setConversationCandidateId(selectedCandidate.id)
    setConversationRequest(request)
    setConversationStatus('pending')
  }

  const simulateConversationAcceptance = () => {
    const now = new Date().toISOString()
    setConversationMessages([
      {
        id: `system-${Date.now()}`,
        sender: 'system',
        body: 'Ambas personas han aceptado abrir esta conversación.',
        sentAt: now,
      },
      {
        id: `candidate-${Date.now()}`,
        sender: 'candidate',
        body: `Hola, Alex. Gracias por acercarte con calma. He leído tu invitación y también me gustaría conocernos sin dar nada por hecho.`,
        sentAt: now,
        simulated: true,
      },
    ])
    setConversationStatus('active')
  }

  const sendConversationMessage = (body: string) => {
    const sentAt = new Date().toISOString()
    const messageId = `user-${Date.now()}`

    setConversationMessages((current) => [
      ...current,
      {
        id: messageId,
        sender: 'user',
        body,
        sentAt,
      },
    ])

    window.setTimeout(() => {
      if (conversationStatusRef.current !== 'active') return

      setConversationMessages((current) => [
        ...current,
        {
          id: `candidate-${Date.now()}`,
          sender: 'candidate',
          body: `Gracias por compartirlo así. Me ayuda a entender mejor desde dónde te acercas. Yo también prefiero que podamos hablarlo sin intentar responder “bien” ni llegar demasiado pronto a una conclusión.`,
          sentAt: new Date().toISOString(),
          simulated: true,
        },
      ])
    }, 700)
  }

  const withdrawConversation = () => {
    setConversationStatus('draft')
    setConversationRequest(null)
    setConversationMessages([])
    navigate('compatibility-report')
  }

  const viewConversation = () => {
    const candidate = candidates.find(
      (item) => item.id === conversationCandidateId,
    )

    if (candidate) {
      setSelectedCandidate(candidate)
    }

    navigate('conversation')
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
        <LandingPage
          onStart={() => navigate('onboarding')}
          onPricing={() => navigate('pricing')}
          onLogin={() => navigate('login')}
          onRegister={() => navigate('register')}
        />
      )}

      {currentPage === 'pricing' && (
        <PricingPage onStartFree={() => navigate('onboarding')} />
      )}

      {currentPage === 'payment-success' && (
        <PaymentSuccessPage
          onGoDashboard={enterPrototype}
          onContinueMap={() => navigate('onboarding')}
        />
      )}

      {currentPage === 'payment-cancel' && (
        <PaymentCancelPage
          onBackToPricing={() => navigate('pricing')}
          onStartFree={() => navigate('onboarding')}
        />
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
          onPricing={() => navigate('pricing')}
          conversationStatus={
            conversationCandidateId ? conversationStatus : undefined
          }
          conversationCandidate={
            conversationCandidateId
              ? candidates.find(
                  (candidate) => candidate.id === conversationCandidateId,
                )
              : undefined
          }
          onViewConversation={viewConversation}
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
          onPricing={() => navigate('pricing')}
        />
      )}

      {currentPage === 'matches' && (
        <MatchesPage
          onSelectCandidate={selectCandidate}
          onPricing={() => navigate('pricing')}
        />
      )}

      {currentPage === 'compatibility-report' && (
        <CompatibilityReportPage
          candidate={selectedCandidate}
          answers={answers}
          symbolicProfile={symbolicProfile}
          onBack={() => navigate('matches')}
          onOpenConversation={() => openConversation(selectedCandidate)}
        />
      )}

      {currentPage === 'conversation' && (
        <ConversationPage
          candidate={selectedCandidate}
          status={conversationStatus}
          request={conversationRequest}
          messages={conversationMessages}
          onSubmitRequest={submitConversationRequest}
          onSimulateAcceptance={simulateConversationAcceptance}
          onSendMessage={sendConversationMessage}
          onPause={() => setConversationStatus('paused')}
          onResume={() => setConversationStatus('active')}
          onClose={() => setConversationStatus('closed')}
          onWithdraw={withdrawConversation}
          onBack={() => navigate('compatibility-report')}
          onDashboard={() => navigate('dashboard')}
        />
      )}
    </AppLayout>
  )
}

export default App
