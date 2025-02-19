<script setup lang="ts">
import { usePaymentStore } from '@/stores/payment'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { useI18n } from 'vue-i18n'
import QrcodeVue from 'qrcode.vue';

const { locale } = useI18n();
const paymentStore = usePaymentStore()
const settingStore = useSettingStore()
const { invoices } = storeToRefs(paymentStore)
const invoiceId = ref<number|null>(null)
const qrcodeimage = ref<number|null>(null)

onMounted(async ()=>{
  await paymentStore.getInvoice(locale.value)
})

function getInvoice(id: number){
  invoiceId.value = id
}

watch(()=>locale.value, async (language)=>{
  await paymentStore.getInvoice(language)
})

function showQrCode(qrcodeImg: number){
  qrcodeimage.value = qrcodeImg
}

function hideQRcode(e: Event){
  if (e.target === e.currentTarget){
    qrcodeimage.value = null
  }
}

</script>

<template>
  <div class="site-main">
    <section class="prt-row overflow-hidden pricing-section-1 bg-layer-equal-height clearfix">
      <div class="container mt-50">
        <div class="section-title title-style-center_text">
          <div class="title-header">
            <h2 class="title">{{ $t('invoices') }}</h2>
          </div>
        </div>
        <div class="about-text res-991-mt-0">
          <div class="tm-scrollintetx-wrapper Frist">
            <div class="big-title" style="transform: translateX(91.0049px);">{{ $t('invoices') }}</div>
          </div>
        </div>

        <div class="prt-tabs prt-tab-style-01">
          <ul class="tabs active vh-100 overflow-auto" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <li><h3>{{ $t('invoice_number') }}</h3></li>
            <template v-for="item in invoices.invoices" :key="item.id">
              <li class="tab border-bottom" @click="getInvoice(item.id)" id="v-pills-home-tab" data-bs-toggle="pill" :data-bs-target="`#v-pills-${item.id}`" type="button" role="tab" :aria-controls="`v-pills-${item.id}`" aria-selected="true">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex flex-column">
                    <span>#{{ item?.invoice_number }}</span>
                    <span class="text-theme">{{ settingStore.formatNumber(item?.total_sum) }} sum</span>
                  </div>
                </div>
              </li>
            </template>
          </ul>
          <div class="content-tab vh-100 overflow-auto w-100" id="v-pills-tabContent">
            <template v-for="item in invoices?.invoices?.filter((el:any)=>el?.id === invoiceId)" :key="item.id">
              <div class="tab-pane content-inner fade show active" :id="`v-pills-${item.id}`" role="tabpanel" :aria-labelledby="`v-pills-${item.id}-tab`">

                <div class="prt-pricing-plan">
                  <div class="prt-p_table-body d-flex justify-content-between pb-3 border-bottom  ">
                    <div>

                      <div class="prt-p_table-amount pricing-price">
                        <h3>{{ $t('total') }}</h3>
                      </div>
                    </div>

                    <div>
                      <div class="prt-p_table-amount pricing-price">
                        <h3>{{ settingStore.formatNumber(item.total_sum) }}</h3>
                        <span class="pac_frequency"> UZS </span>
                      </div>
                      <ul class="prt-p_table-features">
                        <li>
                          <i class="ti ti-check"></i>
                          <span v-if="item.is_paid">
                            <template v-if="locale === 'en' || locale === 'ru'">
                              {{ $t('paid_with') }}
                              <span class="px-2 bg-theme rounded">{{ item.type }}</span>
                            </template>

                             <template v-else>
                               <span class="px-2 bg-theme rounded">{{ item.type }}</span>
                              {{ $t('paid_with') }}
                            </template>
                          </span>
                          <span v-else>
                            {{ $t('not_paid') }}
                          </span>
                        </li>
                        <li v-if="item.is_paid">
                          <i class="ti ti-check"></i>
                          <template v-if="locale === 'en' || locale === 'ru'">
                            {{ $t('paid') }} {{ settingStore.formatDate(item.updated_at)}}
                          </template>
                          <template v-else>
                             {{ settingStore.formatDate(item.updated_at)}} {{ $t('paid') }}
                          </template>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div v-if="item.is_paid">
                    <h3>{{ $t('payment_composition') }}</h3>
                    <div  class="pb-2">
                      <ul class="prt-p_table-features list-unstyled">
                        <li v-for="value in item.invoice_items" :key="value.id">
                          <div class="d-flex justify-content-between py-2">
                            <span class="text-theme">{{ value.marathon.marathon_type.name }} <br> {{ value?.marathon?.name }}</span>
                            <span class="text-end text-theme">{{ value.marathon.marathon_type.price }} <br> {{ settingStore.formatDate(value?.marathon?.event_has_marathon?.date_event) }}</span>
                          </div>
                          <div class="d-flex justify-content-between py-2">
                            <span class="text-uppercase text-info fw-bold" >
                              {{ value?.number_type?.type }}
                            </span>
                            <span class="text-end text-info fw-bold">
                              {{ value.number }} <br>  {{ value?.number_price ? settingStore.formatNumber(value?.number_price) + ' sum' : '' }}
                            </span>
                          </div>
                          <div class="qrcode-image  " @click="showQrCode(value?.id)" >
                            <div class="bg-white qrcode-image-item ">

                              <QrcodeVue
                                :value="`https://roadrunning.uz/show-qrcode/${value?.id}`"
                                :size="212"
                                level="M"
                                render-as="canvas"
                                color="#000000"
                              />
                            </div>
                          </div>
                          <hr />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
    
    <div class="show-qrcode " @click="hideQRcode" :class="{ 'active': qrcodeimage }" >
      <div class="bg-white qrcode-image-item ">
        <QrcodeVue
          :value="`https://roadrunning.uz/show-qrcode/${qrcodeimage}`"
          :size="320"
          level="M"
          render-as="canvas"
          color="#000000"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  width: 5px;
  border-radius:10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius:10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.show-qrcode{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.87);
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;
}

.show-qrcode.active{
  display: flex;
}

.qrcode-image-item{
  width: max-content;
  padding: 8px 8px 3px 8px;
  margin-bottom: 0;
  border-radius: 5px;
}
</style>