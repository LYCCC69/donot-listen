<template>
  <div id="app-shell">
    <router-view />
  </div>
</template>

<script setup>
import { useAppShellNavigation } from './composables/useAppShellNavigation'
useAppShellNavigation()
</script>

<style>
@import './styles/base.css';
</style>
