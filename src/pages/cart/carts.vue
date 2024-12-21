<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {useSettingStore} from "@/stores/setting";
import {storeToRefs} from "pinia";
import CartItem from "@/components/cartItem.vue";
import Payment from '@/components/payment.vue'
import { usePaymentStore } from '@/stores/payment'
const paymentStore = usePaymentStore()

const { invoiceStatus } = storeToRefs(paymentStore)
const settingStore = useSettingStore()
const { user, carts } = storeToRefs(settingStore)


onMounted( () => {
  settingStore.getCarts()
});

onMounted(async() => {
  await settingStore.getToken();
})
const totalPrice = computed(() => {
  return carts.value.reduce((total, participant) => {
    const priceFromNumberType = Number(participant.number_price) || 0;
    const marathonPrice = Number(participant.marathon.price) || 0;

    return total + priceFromNumberType + marathonPrice;
  }, 0);
})

watch(()=>invoiceStatus.value, async ()=>{
  if (invoiceStatus.value.is_paid){
    settingStore.getCarts()
  }
})

</script>

<template>
  <div>
    <div class="site-main">
      <div class="prt-row blog-details-section clearfix">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="prt-blog-single-content">
                <div class="entry-content">
                  <div class="blog-single-title">
                    <h2 class="text-center">{{ $t('cart_details') }}</h2>
                  </div>
                  <template v-if="carts.length > 0">
                    <CartItem v-for="cart in carts" :cart="cart" :key="cart.id" />
                  </template>
                  <template v-else>
                    <blockquote>
                      <div class="qoute-text">
                        {{ $t('no_purchases_in_cart') }}
                      </div>
                      <a class="prt-btn prt-btn-size-lg prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor mt-20" href="/events">{{ $t('participate') }}</a>
                    </blockquote>
                  </template>
                </div>
              </div>
            </div>
            <div class="col-lg-4 prt-sticky-column">
              <div class="p-0">
                <div class="featured-icon-box icon-align-top-content style6">
                  <div class="featured-icon d-flex justify-content-between">
                    <img src="/assets/images/logo_itog2.png" alt="" width="90px">
                    <h3 class="float-end">{{ $t('total') }}</h3>
                  </div>
                  <div class="featured-content">
                    <div class="featured-title">
                      <h4 class="text-end">{{ settingStore.formatNumber(totalPrice) }} sum</h4>
                    </div>
                    <div class="featured-desc">
                    </div>
                  </div>
                  <template v-if="!user">

                    <a type="button"
                       data-bs-toggle="modal"
                       data-bs-target="#exampleModal"
                       class="prt-btn prt-btn-size-lg text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor w-100 mt-20"
                       href="#"
                    >{{ $t('login') }}</a>

                  </template>
                  <template v-else>
                    <a class="prt-btn prt-btn-size-lg text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor w-100 mt-20"
                       :href="carts.length > 0 ? '/payment' : '#' "
                       role="button"
                    >{{ $t('payment') }}</a>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Payment />
  </div>
</template>

<style scoped>
.progress-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
  height: 20px;
}

.progress-bar {
  height: 100%;
  background-color: #76c7c0;
  transition: width 1s linear;
}
</style>