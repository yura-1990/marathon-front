<script setup lang="ts">
import {useSettingStore} from "@/stores/setting";
import {storeToRefs} from "pinia";

import {onMounted, ref} from "vue";
import {useProfileStore} from "@/stores/profile";

const profileStore = useProfileStore()
const settings = useSettingStore()
const { profile } = storeToRefs(profileStore)
const { user } = storeToRefs(settings)


interface User{
  name: string,
  email: string,
  phone: string,
}

const form = ref<User>({
  name: '',
  email: '',
  phone: '',
})
const file = ref<File | null>(null);

onMounted(() => {
  settings.getToken()
})

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    file.value = target.files[0];
  }
};

async function submit(): Promise<void>
{
  const data = {
    name: form.value.name,
    email: form.value.email,
    file: file.value,
  }

  await profileStore.updateProfile(data)
}


</script>

<template>

  <div class="card">
    <div class="card-header ">
      <h4 class="text-dark m-0">Profile</h4>
    </div>
    <div class="card-body">
      <form id="profile" @submit.prevent="submit" class="row needs-validation" >
        <div class="col-md-8">
          <div class="mb-3">
            <label for="name" class="form-label">Full name</label>
            <input type="text" v-model="form.name" class="form-control-sm border rounded" id="name">
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="text" v-model="form.email" class="form-control-sm border rounded" id="email">
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label">Phone</label>
            <input type="text" v-model="form.phone" class="form-control-sm border rounded" id="phone">
            <div class="valid-feedback">
              Looks good!
            </div>
          </div>
        </div>

        <div class="col">
          <div class="border d-flex justify-content-center align-items-center">
            <img :src="`http://api.roadrunning.uz/storage/${user?.payload?.user?.avatar}`"  height="300px" alt="images" />
          </div>

          <div class="w-100">
            <input type="file" @change="handleFileChange" class="form-control-sm border w-100" id="photo">
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