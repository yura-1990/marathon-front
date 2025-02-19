<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePaymentStore } from '@/stores/payment'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/stores/setting'

const paymentStore = usePaymentStore()
const { qrcodes } = storeToRefs(paymentStore)
const tools = useSettingStore()

const route = useRoute()
const { locale } = useI18n()

onMounted(async ()=>{
  await paymentStore.getQRCode(locale.value, route.params.id)
})

</script>

<template>
  <div class="w-100 vh-100 overflow-hidden">
    <div class="container-md h-100 overflow-auto">
      <div class="card mt-2">
        <div class="card-body">
          <div class="row d-flex flex-row justify-content-center pb-5">
            <div class="d-flex justify-content-between align-items-center flex-row gap-3">
              <h5><span class="far text-theme fa-check-square pe-2"></span>ACCEPTED</h5>
              <h4 class="text-theme ">{{ qrcodes?.description }} UZS</h4>
            </div>
            <div class="col-12 col-lg-7 mb-4 mb-md-0">
              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="text-theme fw-bold p-2">{{ qrcodes?.marathon?.marathon_type?.name }}</div>
                <div class="ms-auto p-2">{{ qrcodes?.marathon_price }} UZS</div>
              </div>
              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="text-theme fw-bold p-2">{{ qrcodes?.number_type?.type }} ({{ qrcodes.number }})</div>
                <div class="ms-auto p-2">{{ qrcodes.number_price }} UZS</div>
              </div>
              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="text-theme fw-bold p-2">Uniform</div>
                <div class="ms-auto p-2">{{ qrcodes?.participant?.uniform?.size }}</div>
              </div>
            </div>
            <div class="col-12 col-lg-7 mb-4 mb-md-0">
              <h4>PARTICIPANT INFO</h4>
              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-person-walking"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.last_name }} {{ qrcodes?.participant?.name }}</div>
              </div>

              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-cake-candles"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ tools.formatDate(qrcodes?.participant?.birth) }} ({{tools.getAge(qrcodes?.participant?.birth)}}years old)  </div>
              </div>

              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-envelope"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.email }}</div>
              </div>

              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-phone-volume"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.phone }}</div>
              </div>

              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-venus-mars"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.gender?.type }}</div>
              </div>

              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-globe"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.country?.name }}</div>
              </div>

              <div class="rounded d-flex flex-wrap bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-map-location-dot"></i></div>
                  <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.address }}</div>
              </div>

              <div class="rounded d-flex bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-building"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.category?.type }}</div>
              </div>

              <div class="rounded d-flex bg-body-tertiary mb-5">
                <div class="p-2"><i class="fa-solid fa-list"></i></div>
                <div class="ms-auto text-theme fw-bold p-2">{{ qrcodes?.participant?.organization?.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>