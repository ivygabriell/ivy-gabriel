import { Hero } from '@/components/sections/Hero'
import { WaveDivider } from '@/components/ui/WaveDivider'
import { StackSection } from '@/components/sections/StackSection'
import { WorkPreview } from '@/components/sections/WorkPreview'
import { Reconhecimentos } from '@/components/sections/Reconhecimentos'
import { PontoDeVista } from '@/components/sections/PontoDeVista'
import { ContactCTA } from '@/components/sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <WaveDivider />
      <StackSection />
      <WorkPreview />
      <Reconhecimentos />
      <PontoDeVista />
      <ContactCTA />
    </>
  )
}
