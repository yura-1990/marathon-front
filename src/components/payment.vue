<script setup lang="ts">

</script>

<template>
  <div class="modal fade z-9999" id="cartModal" aria-hidden="true" aria-labelledby="cardModalToggleLabel" tabindex="-1">
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-theme font-600" id="cardModalToggleLabel">Payment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="d-flex justify-content-between align-items-center gap-3">
            <div class="contact-form-block ">
              <div class="d-flex">
                <form class="wrap-form query_form-1 needs-validation contact_form">
                  <span class="text-input">
                    <span class="heading-name">CART NUMBER</span>
                    <input
                      class="username border"
                      type="number"
                      placeholder="____ ____ ____ ____"
                      max="19"
                      min="19"
                    />
                  </span>
                  <span class="text-input">
                    <span class="heading-name">Expiration</span>
                    <input
                      class="username border"
                      type="text"
                      placeholder="__ / __"
                    />
                  </span>
                  <span class="text-input">
                    <span class="heading-name">SUM</span>
                    <input
                      class="username border"
                      type="text"
                      placeholder="000 000 000"
                    />
                  </span>

                </form>
              </div>
            </div>
            <div>

            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" data-bs-target="#cartModal" data-bs-toggle="modal" data-bs-dismiss="modal">Open second modal</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>