
import { LanguageProvider } from "@/contexts/language-context"
import { ClientPageWrapper } from "@/components/client-page-wrapper"

export default function ClubberLandingPage() {
  return (
    <LanguageProvider>
      <ClientPageWrapper/>

    </LanguageProvider>
  )
}
