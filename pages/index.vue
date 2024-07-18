<template>
  <MainLayout>
    <div id="IndexPage" class="w-full overflow-auto">
      <div class="mx-auto max-w-[500px] overflow-hidden">
        <div id="Posts" class="px-4 max-w-[600px] mx-auto" >
          <div v-if="isPosts" v-for="post in posts" :key="post">
            <Post :post="post" @isDeleted="posts = userStore.getAllPosts()" />
          </div>
          <div v-else>
            <client-only>
              <div v-if="isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                <div class="text-white mx-auto flex flex-col items-center justify-center">
                  <Icon name="eos-icons:bubble-loading" size="50" class="text-white" />
                  <div class="w-full mt-1">Loading...</div>
                </div>
              </div>
              <div v-if="!isLoading" class="mt-20 w-full flex items-center justify-center mx-auto">
                <div class="text-white mx-auto flex flex-col items-center justify-center">
                  <Icon name="tabler:mood-empty" size="50" class="text-white" />
                  <div class="w-full">Make the first post!</div>
                </div>
              </div>
            </client-only>
          </div>
          <div class="mt-60" />
        </div>
        <div v-if="requestLogin" class="request-login">
          <p class="mb-[20px]">You need to login to continue</p>
          <button
          @click="navigateTo('/auth')"
          class="
            flex 
            items-center 
            justify-center 
            gap-3
            p-1.5
            px-[50px]
            border 
            rounded-full
            text-lg
            font-semibold
          "
          >
            Login / Register
          </button>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '../layouts/MainLayout'
import { useUserStore } from '../stores/user.js'
const userStore = useUserStore()
const user = useSupabaseUser()

let posts = ref([])
let isPosts = ref(false)
let isLoading = ref(false)
let requestLogin = ref(false)

watchEffect(() => {
  if(user.value) {
    console.log("user.value",user.value.identities[0]);
  } else {
    requestLogin.value = true
  }
  // if (!user.value) {
  //   return navigateTo('/auth')
  // }
})

onBeforeMount(async () => {
  try {
    isLoading.value = true
    await userStore.getAllPosts()
    isLoading.value = false
  } catch (error) {
    console.log(error)
  }
})

onMounted(() => {
  watchEffect(() => {
    posts.value = userStore.posts
    if (userStore.posts && userStore.posts.length >= 1) {
      isPosts.value = true
    } else {
      isPosts.value = false
    }
  })
})

watch(() => posts.value, () => {
  posts.value = userStore.posts
  if (userStore.posts && userStore.posts.length >= 1) {
    isPosts.value = true
  } else {
    isPosts.value = false
  }
}, { deep: true })
</script>

<style scoped>
.request-login {
    z-index: 99999;
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 200px;
    background: #000;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #c5c5c5;
}
</style>
