<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCartStore } from '@/stores/carts'
import { useToast } from 'vue-toast-notification'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const { t } = useI18n();
const cartStore = useCartStore()
const $toast = useToast();
const settingStore = useSettingStore()
const { cartStatus } = storeToRefs(cartStore)
const timeData = localStorage.getItem('cart_time')
const timer = timeData ?  JSON.parse(timeData) : ''

const props = defineProps<{
  cart: any;
}>();

onMounted((): void => {
  updateTimeLeft();
  intervalId = window.setInterval(updateTimeLeft, 200);
});

const timeLeft = ref<string>('');
const progressWidth = ref<number>(100);

const initialTime = new Date(timer.time).getTime();
console.log(new Date(timer.value))

const endTime = initialTime + 15 * 60 * 1000;
let intervalId: number | null = null;

function updateTimeLeft(): void
{
  const now: number = new Date().getTime();
  const timeDiff: number = endTime - now;

  if (timeDiff <= 0) {
    timeLeft.value = '00:00';
    progressWidth.value = 0;
    if (intervalId !== null) {
      clearInterval(intervalId);
    }
    onTimeOver();
    return
  }

  const minutes: number = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds: number = Math.floor((timeDiff % (1000 * 60)) / 1000);

  timeLeft.value = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalDuration = endTime - initialTime;
  progressWidth.value = (timeDiff / totalDuration) * 100;
}

onUnmounted((): void => {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }
});


async function onTimeOver (): Promise<void>
{
  await cartStore.deleteNumberStatus(props.cart.id)

  if (cartStatus.value){
    $toast.info(t('remove_from_cart'))

    settingStore.deleteCarts(props.cart.id)
  }
}

</script>

<template>
  <div class="progress-bar-container shadow">
    <div class="progress-bar bg-theme " :class="{'text-black': progressWidth < 5 }" :style="{ width: progressWidth + '%' }">{{ timeLeft }}</div>
  </div>
</template>

<style scoped>

</style>