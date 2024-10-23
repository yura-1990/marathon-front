<script setup lang="ts">
import { usePaymentStore } from '@/stores/payment'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const paymentStore = usePaymentStore()
const {invoices} = storeToRefs(paymentStore)

onMounted(async ()=>{
  await paymentStore.getInvoice()
})

</script>

<template>
  <div class="site-main">
    <div class="prt-row blog-details-section clearfix">
      <div class="container">
        <section class="prt-row table-section clearfix">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-title title-style-center_text">
                  <div class="title-header">
                    <h2 class="title">Invoices</h2>
                  </div>
                </div>
                <div class="about-text res-991-mt-0">
                  <div class="tm-scrollintetx-wrapper Frist">
                    <div class="big-title" style="transform: translateX(91.0049px);"> Invoices </div>
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
                          <tr>
                            <th>
                              <div class="classes-days">Time</div>
                            </th>
                            <th>
                              <div class="classes-days">17 nov 2024</div>
                            </th>
                            <th>
                              <div class="classes-days">18 nov 2024</div>
                            </th>
                            <th>
                              <div class="classes-days">19 nov 2024</div>
                            </th>
                          </tr>
                          </thead>
                          <tbody>
                          <!--row one-->
                          <tr>
                            <td class="hours">
                              <div class="classes-time">8:00 am </div>
                            </td>
                            <td rowspan="1">
                              <div class="hover">
                                <div class="content-data">
                                  <p class="margin_bottom0">Velocity vanguard challenge</p>
                                </div>
                              </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Adrenaline rush grand prix</p>
                              </div>
                            </td>
                            <td>
                              <div class="content-blank"></div>
                            </td>
                          </tr>

                          <!--row two-->
                          <tr>
                            <td class="hours">
                              <div class="classes-time">9:00 am </div>
                            </td>
                            <td>
                              <div class="content-blank"></div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Turbocharged thunder showdown</p>
                              </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Ultimate velocity championship</p>
                              </div>
                            </td>
                          </tr>

                          <!--row three-->
                          <tr>
                            <td class="hours">
                              <div class="classes-time">10:00 am </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Supersonic speed spectacular</p>
                              </div>
                            </td>
                            <td>
                              <div class="content-blank"></div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Speedster sprint showdown series</p>
                              </div>
                            </td>
                          </tr>

                          <!--row four-->
                          <tr>
                            <td class="hours">
                              <div class="classes-time">11:00 am </div>
                            </td>
                            <td>
                              <div class="content-blank"></div>
                            </td>
                            <td>
                              <div class="content-blank"></div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Rapid rumble rally championship</p>
                              </div>
                            </td>
                          </tr>

                          <!--row five-->
                          <tr>
                            <td class="hours">
                              <div class="classes-time">2:00 pm </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Lightning-fast velocity challenge</p>
                              </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">High-octane turbo thrust showdown</p>
                              </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Rapid rumble rally championship circuit</p>
                              </div>
                            </td>
                          </tr>

                          <!--row six-->
                          <tr>
                            <td class="hours">
                              <div class="classes-time">3:00 pm </div>
                            </td>
                            <td>
                              <div class="content-blank"></div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Velocity vanguard vortex showdown</p>
                              </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Speedster sprint spectacular series</p>
                              </div>
                            </td>
                          </tr>

                          <!--row seven-->
                          <tr>
                            <td class="hours">
                              <div class="classes-time">4:00 pm </div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Turbocharged thunder grand prix</p>
                              </div>
                            </td>
                            <td>
                              <div class="content-blank"></div>
                            </td>
                            <td rowspan="1">
                              <div class="content-data">
                                <p class="margin_bottom0">Adrenaline rush challenge</p>
                              </div>
                            </td>
                            <td class="border-0">
                              <div class="content-blank"></div>
                            </td>
                          </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>