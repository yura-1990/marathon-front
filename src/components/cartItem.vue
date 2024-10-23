<script setup lang="ts">
import {useSettingStore} from "@/stores/setting";
import {useCartStore} from "@/stores/carts";
import {useToast} from "vue-toast-notification";
import { useI18n } from 'vue-i18n'
import Timer from '@/components/timer.vue'
const { t } = useI18n();
const cartStore = useCartStore()
const $toast = useToast();
const settingStore = useSettingStore()

const props = defineProps<{
  cart: any;
}>();

async function deleteCart(): Promise<void>
{
  if (confirm(t('are_you_sure_you_want_to_delete'))){
    await cartStore.deleteNumberStatus(props.cart.id)
    $toast.info(t('remove_from_cart'))
    settingStore.deleteCarts(props.cart.id)
  }
}

</script>

<template>
  <blockquote class="position-relative overflow-hidden shadow" >
    <Timer :cart="props.cart"/>

    <div class="qoute-text">
      <div>
        <h3>{{ cart.marathon.marathon_type.name }}
          <span class="text-theme float-end">{{ cart.marathon.marathon_type ? settingStore.formatNumber(cart?.marathon?.marathon_type?.price) : 0 }}  <small>sum</small></span>
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
          <span class="me-3 text-theme">{{ cart.number }}</span>
          <span class="float-end text-theme"> {{ cart?.number_price ? settingStore.formatNumber(cart?.number_price) : 0 }} <small>sum</small></span>
        </h4>
        <h4 class="prt-tags-links-title mt_10">
          <span>{{ cart.participant.uniform.type }}: </span>
          <span class="float-end text-theme"> {{ cart.participant.uniform.size }}</span>
        </h4>
        <h3>
          <span>{{ $t('total') }}:</span>
          <span class="float-end text-theme">{{ settingStore.formatNumber(Number(cart.description)) }} <small>sum</small></span>
        </h3>

      </div>

      <div class="cart-delete" @click="deleteCart"><i class="fa-solid fa-trash"></i></div>
    </div>

  </blockquote>
</template>

<style scoped>

</style>