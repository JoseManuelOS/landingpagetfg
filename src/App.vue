<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppCursor from '@/components/AppCursor.vue'
import Marquee from '@/components/Marquee.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProblemSection from '@/components/sections/ProblemSection.vue'
import ImmersiveStorySection from '@/components/sections/ImmersiveStorySection.vue'
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

const marqueeItems = ['Roomate', 'Flutter', 'Supabase', 'IA', 'OCR', 'Stripe', 'Firebase', 'RLS']
</script>

<template>
  <AppCursor />
  <AppHeader />
  <main>
    <HeroSection />
    <Marquee :items="marqueeItems" accent="indigo" />
    <ProblemSection />
    <ImmersiveStorySection />
    <FinanceSection />
    <TasksSection />
    <AISection />
    <SecuritySection />
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
