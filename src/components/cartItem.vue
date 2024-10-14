<script setup lang="ts">
import {useSettingStore} from "@/stores/setting";
import {useCartStore} from "@/stores/carts";
import {useToast} from "vue-toast-notification";
import {onMounted, onUnmounted, ref} from "vue";
import {storeToRefs} from "pinia";
import { useI18n } from 'vue-i18n'
const { t } = useI18n();
const cartStore = useCartStore()
const $toast = useToast();
const settingStore = useSettingStore()
const props = defineProps<{
  cart: any;
  index: number;
}>();


const { cartStatus } = storeToRefs(cartStore)

const timeLeft = ref<string>('');
const progressWidth = ref<number>(100);

const initialTime = new Date(props.cart.time).getTime();
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



onMounted((): void => {
  updateTimeLeft();
  intervalId = window.setInterval(updateTimeLeft, 1000);
});

onUnmounted((): void => {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
  }
});

onUnmounted((): void => {
  if (intervalId !== undefined) {
    clearInterval(intervalId);
  }
});

async function deleteCart(): Promise<void>
{
  if (confirm(t('are_you_sure_you_want_to_delete'))){
    const data = {
      marathon_id: props.cart.marathon.id,
      number: props.cart.number.number,
      number_type_id: props.cart.number.numberType.id,
    }
    await cartStore.deleteNumberStatus(data)
    $toast.info(t('remove_from_cart'))
    settingStore.deleteCarts(props.index)
  }
}

async function onTimeOver (): Promise<void>
{
  const data = {
    marathon_id: props.cart.marathon.id,
    number: props.cart.number.number,
    number_type_id: props.cart.number.numberType.id,
  }
  await cartStore.deleteNumberStatus(data)

  if (cartStatus.value){
    $toast.info(t('remove_from_cart'))
    settingStore.deleteCarts(props.index)
  }
}

</script>

<template>
  <blockquote class="position-relative overflow-hidden shadow" >
    <div class="progress-bar-container shadow">
      <div class="progress-bar bg-theme " :style="{ width: progressWidth + '%' }">{{ timeLeft }}</div>
    </div>
    <div class="qoute-text">
      <div>
        <h3>{{ cart.marathon.marathon_type.name }}
          <span class="text-theme float-end">{{ cart.marathon ? settingStore.formatNumber(cart.marathon.price) : 0 }}  <small>sum</small></span>
        </h3>
        <h4>
          <span>{{ $t('date') }}: </span>
          <span class="text-theme">
            {{ settingStore.formatDate(cart.marathon.event_has_marathon.date_event)  }}
                              <time>{{ cart.marathon.datetime_from }} - {{ cart.marathon.datetime_to }}</time>
          </span>
        </h4>
        <h4 class="prt-tags-links-title mt_10">
          <span>{{ $t('number') }}: </span>
          <span class="me-3 text-theme">{{ cart.number.number }}</span>
          <span class="float-end text-theme"> {{ cart?.number?.numberType ? settingStore.formatNumber(cart?.number?.numberType?.pivot?.price) : 0 }} <small>sum</small></span>
        </h4>
        <h4 class="prt-tags-links-title mt_10">
          <span>{{ cart.uniform.type }}: </span>
          <span class="float-end text-theme"> {{ cart.uniform.size }}</span>
        </h4>
        <h3>
          <span>{{ $t('total') }}:</span>
          <span class="float-end text-theme">{{cart.number.numberType && cart.marathon.price ? settingStore.formatNumber(Number(cart.marathon.price) + (Number(cart.number.numberType.pivot.price) ?? 0)) : 0 }} <small>sum</small></span>
        </h3>

      </div>

      <div class="cart-delete" @click="deleteCart"><i class="fa-solid fa-trash"></i></div>
    </div>
  </blockquote>
</template>

<style scoped>
.progress-bar-container {
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  overflow: hidden;
  margin-top: 10px;
  position: absolute;
  z-index: -1;
  top: -10px;
  left: 0;

}

.progress-bar {
  height: 100%;
  transition: width 1s linear;
}
</style>