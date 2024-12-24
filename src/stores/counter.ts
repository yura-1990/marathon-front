import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useTimeStore = defineStore('timer', () => {
  const timeLeft = ref(0);
  const timer = ref<any | number | null>(null);

  // Computed property to format timeLeft in "HH:MM" format
  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  });

  function initializeCountdown() {
    const savedExpiryTime = localStorage.getItem('expiryTime');
    const now = Date.now();

    if (savedExpiryTime) {
      const expiryTime = parseInt(savedExpiryTime, 10);
      const remainingTime = expiryTime - now;

      timeLeft.value = remainingTime > 0 ? Math.floor(remainingTime / 1000) : 0;
    } else {
      resetCountdown();
    }
  }

  function startCountdown() {
    if (timer.value) clearInterval(timer.value);

    timer.value = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value -= 1;
      } else {
        clearInterval(timer.value);
        timeLeft.value = 0;
      }
    }, 1000); // Update every second
  }

  function resetCountdown() {
    const expiryTime = Date.now() + 120 * 1000;
    localStorage.setItem('expiryTime', String(expiryTime));
    timeLeft.value = 120;
    startCountdown();
  }

  function clearCountdown() {
    clearInterval(timer.value);
    localStorage.removeItem('expiryTime');
    timeLeft.value = 0;
  }

  function resendCode() {
    resetCountdown();
  }

  initializeCountdown();

  return {
    timeLeft,
    formattedTime,
    startCountdown,
    resetCountdown,
    clearCountdown,
    resendCode,
  };
});
