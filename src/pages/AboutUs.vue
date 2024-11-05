<script setup lang="ts">

</script>

<template>
  <div>
    <div class="prt-page-title-row" style="background-image: url('/assets/images/sport-bg.jpg'); ">
      <div class="prt-page-title-row-inner">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-lg-12">
              <div class="prt-page-title-row-heading">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="site-main">

      <section class="prt-row about-us-section bg-base-dark position-relative clearfix">
        <div class="winner-flag-1">
          <img src="/assets/images/flag-2.webp" alt="">
        </div>
        <div class="prt-row-wrapper-bg-layer prt-bg-layer bg-base-dark"></div>
        <div class="container position-relative">
          <div class="row">
            <div class="col-lg-12 text-center">
              <div class="section-title title-style-center_text style2">
                <div class="title-header mt-5">
                  <h2 class="title">{{ $t('something_about_road_running') }}</h2>
                </div>
              </div>
            </div>
          </div>
          <div class="row pt-75 res-991-pt-20">
            <div class="col-lg-5">
              <div class="prt_single_image-wrapper style3 ml_300 res-991-ml_15 res-991-mb-40">
                <img class="img-fluid position-relative" src="/assets/images/single-img-10-826x600.webp" alt="image">
              </div>
            </div>
            <div class="col-lg-7 align-self-center pl-80 res-991-pl-15">
              <div class="section-title">
                <div class="title-header">
                  <h2 class="title">{{ $t('we_provide_running_service') }}</h2>
                </div>
                <div class="title-desc">
                  <p>{{ $t('we_offer_running_services') }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="featured-icon-box icon-align-before-title style2">
                    <div class="featured-title pb-20">
                      <h3>{{ $t('on_the_day_entry') }}</h3>
                    </div>
                    <div class="featured-desc">
                      <p>{{ $t('on_the_day_entry_available') }}</p>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="featured-icon-box icon-align-before-title style2">
                    <div class="featured-title pb-20">
                      <h3>{{ $t('for_the_kid_free_entry') }}</h3>
                    </div>
                    <div class="featured-desc">
                      <p>{{ $t('kids_enter_free') }}</p>
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
</template>

<style scoped>

</style>