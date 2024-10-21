<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores/setting'
import { storeToRefs } from 'pinia'

const settingStore = useSettingStore()
const { carts } = storeToRefs(settingStore)
const cardInput = ref<string>('');
const expirationDate = ref<string>('')
const dateError = ref<string>('')
const total = ref<string>('')

const isValid = ref<boolean>(false)

function onCardInput()
{
  const digitsCount = cardInput.value.replace(/\s/g, '').length;
  if(digitsCount >= 15){
    isValid.value = !(digitsCount >= 15 && digitsCount <= 16)
  }
  cardInput.value = settingStore.maskCreditCard(cardInput.value)
}

onMounted(()=>{
  settingStore.getCarts()
})


function addAndFormat(num1: string | number | null, num2: string | number | null): string
{
  const number1 = num1 === null ? 0 : (typeof num1 === 'string' ? parseFloat(num1) : num1);
  const number2 = num2 === null ? 0 : (typeof num2 === 'string' ? parseFloat(num2) : num2);

  if (isNaN(number1) || isNaN(number2)) {
    throw new Error('Invalid input: Both inputs must be valid numbers, strings representing numbers, or null.');
  }

  const sum = number1 + number2;

  return sum.toLocaleString('en-US').replace(/,/g, ' ');
}

function formatExpirationDate(input: string)
{
  let sanitizedInput = input.replace(/\D/g, ''); // Remove non-numeric characters

  if (sanitizedInput.length > 6) {
    sanitizedInput = sanitizedInput.slice(0, 6);
  }

  if (sanitizedInput.length >= 2) {
    return sanitizedInput.slice(0, 2) + ' / ' + sanitizedInput.slice(2);
  } else {
    return sanitizedInput;
  }
}

function expirationDateInput()
{
  expirationDate.value = formatExpirationDate(expirationDate.value);

  if (expirationDate.value.length < 5 && expirationDate.value.length >= 7) {
    dateError.value = 'Expiration date must be in the format MM/YY';
  } else {
    dateError.value = '';
  }
}

const totalPrice = computed(() => {
  return carts.value.reduce((total, participant) => {
    const priceFromNumberType = Number(participant.number.numberType.pivot.price) || 0;
    const marathonPrice = Number(participant.marathon.price) || 0;

    return total + priceFromNumberType + marathonPrice;
  }, 0);
})

function submit(){

}

</script>

<template>
<div class="site-main ">
    <div class="prt-row table-section clearfix">
      <div class="container">
        <div class="row">
          <div class="col-lg-8">
            <div class="section-title title-style-center_text">
              <div class="title-header">
                <h2 class="title">INVOICE</h2>
              </div>
            </div>
            <div class="about-text res-991-mt-0">
              <div class="tm-scrollintetx-wrapper Frist">
                <div class="big-title" style="transform: translateX(13.8062px);"> INVOICE </div>
              </div>
            </div>
            <div class="prt-bg prt-col-bgimage-yes prt-col-bgcolor-yes
                            col-bg-img-four border-rad_30 h-auto">
              <div class="prt-col-wrapper-bg-layer prt-bg-layer">
                <div class="prt-col-wrapper-bg-layer-inner"></div>
              </div>
              <div class="layer-content">
                <div class="section-content position-relative">

                  <div class="time-zone-table1 table-responsive text-center mt_40 res-991-mt-0">
                    <table class="table">
                      <thead>
                      <tr >
                        <th>
                          <div class="classes-days">Invoice info</div>
                        </th>
                        <th>
                          <div class="classes-days">Cost</div>
                        </th>
                      </tr>
                      </thead>
                      <tbody>
                      <!--row one-->
                      <tr v-for="(item, index) in carts" :key="index">
                        <td>
                          <p class="text-white text-start px-3 m-0 ">Name: <span class="fw-500 text-theme float-end">{{ item.name }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Phone: <span class="fw-500 text-theme float-end">{{ item.phone }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Email: <span class="fw-500 text-theme float-end">{{ item.email }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Address: <span class="fw-500 text-theme float-end">{{ item.address }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Number: <span class="fw-500 text-theme float-end">{{ item.number.number }}</span></p>
                          <p class="text-white text-start px-3 m-0 ">Uniform: <span class="fw-500 text-theme float-end">{{ item.uniform.size }}</span></p>
                        </td>
                        <td rowspan="1">
                            <p class="margin_bottom0 text-white">{{ addAndFormat(item.marathon.price, item.number.numberType.pivot.price)  }} sum</p>
                        </td>
                      </tr>
                      <tr>
                        <td><h4>Total </h4></td>
                        <td><h4>{{ settingStore.formatNumber(totalPrice) }}</h4></td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4 prt-sticky-column">
            <div class="section-title title-style-center_text">
              <div class="title-header">
                <h2 class="title">Cart</h2>
              </div>
            </div>
            <div class="about-text res-991-mt-0">
              <div class="tm-scrollintetx-wrapper Frist">
                <div class="big-title" style="transform: translateX(13.8062px);"> Cart </div>
              </div>
            </div>
            <div class="prt-bg prt-col-bgimage-yes prt-col-bgcolor-yes  col-bg-img-four border-rad_30 h-auto">
              <div class="bg-base-body-color-dark rounded-5 shadow-lg prt-bg-layer">
                <div class="prt-col-wrapper-bg-layer-inner"></div>
              </div>
              <div class="layer-content">
                <div class="section-content position-relative">

                  <div class="time-zone-table1 table-responsive text-center mt_40 res-991-mt-0">
                    <div class="layer-content contact-form-block p-5 shadow-lg rounded-5">
                      <form
                        id="self-participation"
                        @submit.prevent="submit"
                        class="wrap-form query_form-1 needs-validation contact_form"
                        novalidate
                      >
                  <span class="text-input">
                    <span class="heading-name">{{ $t('cart_number') }}</span>
                    <input
                      class="username"
                      type="text"
                      placeholder="____ ____ _____ ____"
                      v-model="cardInput"
                      maxlength="19"
                      @input="onCardInput"
                    />
                    <span v-if="isValid" class="error">Invalid credit card number</span>
                  </span>
                        <span class="text-input">
                    <span class="heading-name">{{ $t('expire_date') }}</span>
                    <input
                      class="email"
                      type="text"
                      placeholder="MM / YY"
                      v-model="expirationDate"
                      @input="expirationDateInput"
                      maxlength="7"
                    />
                    <span v-if="dateError" class="error">{{ dateError }}</span>
                  </span>
                        <span class="text-input">
                    <span class="heading-name">{{ $t('amount') }}</span>
                    <input
                      readonly
                      class="email"
                      type="text"
                      :value="settingStore.formatNumber(totalPrice).toString()"
                      :placeholder="settingStore.formatNumber(totalPrice).toString()"
                    />
                  </span>
                        <button class="prt-btn prt-btn-size-lg text-uppercase prt-btn-shape-rounded prt-btn-style-border prt-btn-color-whitecolor w-100 mt-20">
                          pay
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<style scoped>
.error {
  color: red;
}
</style>