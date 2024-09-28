<script setup lang="ts">

</script>

<template>

  <div class="card">
    <div class="card-header ">
      <h4 class="text-dark m-0">Profile</h4>
    </div>
    <div class="card-body">
      <form id="profile" class="row needs-validation">
        <div class="col-md-8">
          <div class="mb-3">
            <label for="name" class="form-label">Full name</label>
            <input type="text" class="form-control-sm border rounded" id="name" required>
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" class="form-control-sm border rounded" id="email" required>
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" class="form-control-sm border rounded" id="phone" required>
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
        </div>

        <div class="col">
          <div class="border d-flex justify-content-center align-items-center">
            <img src="/assets/images/single-img-10-826x600.webp" height="300px" alt="images" />
          </div>

          <div class="w-100">
            <input type="file" class="form-control-sm border w-100" id="photo">
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
        </div>

      </form>

    </div>
    <div class="card-footer">
      <div class="col-12">
        <button class="btn btn-primary" form="profile" type="submit">Submit form</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-control-sm{
  padding: 5px 10px;
}
</style>