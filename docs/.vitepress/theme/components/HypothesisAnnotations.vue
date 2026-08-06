<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'

const HYPOTHESIS_SCRIPT = 'https://hypothes.is/embed.js'
let script: HTMLScriptElement | null = null

onMounted(() => {
  if (document.querySelector(`script[src="${HYPOTHESIS_SCRIPT}"]`)) return

  const hypothesisWindow = window as Window & {
    hypothesisConfig?: () => Record<string, unknown>
  }

  hypothesisWindow.hypothesisConfig = () => ({ openSidebar: false })

  script = document.createElement('script')
  script.async = true
  script.src = HYPOTHESIS_SCRIPT
  document.head.appendChild(script)
})

onBeforeUnmount(() => {
  document
    .querySelector('link[type="application/annotator+html"][rel="sidebar"]')
    ?.dispatchEvent(new Event('destroy'))
  document.querySelectorAll('[data-hypothesis-asset]').forEach((asset) => asset.remove())
  script?.remove()

  for (const className of [...document.body.classList]) {
    if (className.startsWith('hypothesis-')) document.body.classList.remove(className)
  }

  delete (window as Window & { hypothesisConfig?: () => Record<string, unknown> }).hypothesisConfig
})
</script>

<template>
  <span aria-hidden="true"></span>
</template>
