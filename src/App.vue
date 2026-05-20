<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppCursor from '@/components/AppCursor.vue'
import Marquee from '@/components/Marquee.vue'
import SectionBanner from '@/components/SectionBanner.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProblemSection from '@/components/sections/ProblemSection.vue'
import FinanceSection from '@/components/sections/FinanceSection.vue'
import TasksSection from '@/components/sections/TasksSection.vue'
import AISection from '@/components/sections/AISection.vue'
import SecuritySection from '@/components/sections/SecuritySection.vue'
import ShowcaseSection from '@/components/sections/ShowcaseSection.vue'
import CTASection from '@/components/sections/CTASection.vue'

import { useLenisScroll } from '@/composables/useLenisScroll'
import { useScrollAnimations } from '@/composables/useScrollAnimations'

useLenisScroll()
useScrollAnimations()

const marqueeItems = [
  'Flutter',
  'Supabase',
  'PostgreSQL',
  'Riverpod',
  'GoRouter',
  'Stripe',
  'OpenAI',
  'ML Kit OCR',
  'Edge Functions',
  'RLS',
  'FCM',
  'fl_chart',
  'PDF Export',
]
</script>

<template>
  <AppCursor />
  <AppHeader />
  <main>
    <HeroSection />
    <Marquee :items="marqueeItems" accent="indigo" />
    <ProblemSection />
    <SectionBanner text="Finanzas claras · Sin Excel · Sin discusiones" variant="indigo" />
    <FinanceSection />
    <SectionBanner text="Convivencia en común · Tareas asignadas · Sin olvidos" variant="amber" />
    <TasksSection />
    <SectionBanner text="IA · OCR · Procesos backend automatizados" variant="cyan" />
    <AISection />
    <SectionBanner text="RLS por hogar · Datos sensibles aislados" variant="green" />
    <SecuritySection />
    <SectionBanner text="Pantallas reales · TFG completo" variant="indigo" />
    <ShowcaseSection />
    <CTASection />
  </main>
</template>

<style lang="scss">
main {
  position: relative;
  z-index: 1;
}
</style>
