<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Header Section -->
    <div
      class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-200"
    >
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
            >
              <span class="text-white font-bold text-lg">🛒</span>
            </div>
            <h1
              class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Fake Store
            </h1>
          </div>
          <div class="flex items-center space-x-4">
            <div
              class="hidden md:flex items-center space-x-2 text-sm text-gray-600"
            >
              <span
                class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              ></span>
              <span>สินค้าใหม่ทุกวัน</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8">
      <!-- Stats Bar -->
      <div
        class="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20"
      >
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-2xl font-bold text-blue-600">
              {{ products.length }}
            </div>
            <div class="text-sm text-gray-600">สินค้าทั้งหมด</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-purple-600">20+</div>
            <div class="text-sm text-gray-600">หมวดหมู่</div>
          </div>
          <div class="text-center">
            <div class="text-2xl font-bold text-green-600">24/7</div>
            <div class="text-sm text-gray-600">เปิดบริการ</div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <div class="inline-flex items-center space-x-3">
          <div
            class="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"
          ></div>
          <span class="text-lg text-gray-700 font-medium"
            >กำลังโหลดสินค้า...</span
          >
        </div>
        <div
          class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div
            v-for="i in 8"
            :key="i"
            class="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm animate-pulse"
          >
            <div class="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
            <div class="h-4 bg-gray-200 rounded mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
            <div class="h-5 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div
          class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4"
        >
          <span class="text-2xl">❌</span>
        </div>
        <h2 class="text-xl font-semibold text-gray-800 mb-2">เกิดข้อผิดพลาด</h2>
        <p class="text-gray-600 mb-6">ไม่สามารถโหลดข้อมูลสินค้าได้</p>
        <button
          @click="retryLoad"
          class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>

      <!-- Products Grid -->
      <div v-else>
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-2xl font-bold text-gray-800">สินค้าแนะนำ</h2>
          <div class="text-sm text-gray-600">{{ products.length }} รายการ</div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <NuxtLink
            v-for="product in products"
            :key="product.id"
            :to="`/product/${product.id}`"
            class="group bg-white/60 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-[1.02] hover:bg-white/80 block"
          >
            <!-- Product Image -->
            <div class="relative overflow-hidden rounded-xl mb-4 bg-gray-50">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-300"
              />
              <div
                class="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
              >
                <svg
                  class="w-4 h-4 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  ></path>
                </svg>
              </div>
            </div>

            <!-- Product Info -->
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span
                  class="px-2 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  {{ product.category }}
                </span>
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400 text-sm">⭐</span>
                  <span class="text-xs text-gray-500">{{
                    product.rating?.rate || "4.0"
                  }}</span>
                </div>
              </div>

              <h3
                class="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200"
              >
                {{ product.title }}
              </h3>

              <div class="flex items-center justify-between pt-2">
                <div class="flex items-baseline space-x-1">
                  <span
                    class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  >
                    ${{ product.price }}
                  </span>
                  <span class="text-xs text-gray-400 line-through">
                    ${{ (product.price * 1.2).toFixed(2) }}
                  </span>
                </div>
                <div
                  class="opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-x-2 group-hover:translate-x-0"
                >
                  <div
                    class="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
                  >
                    <svg
                      class="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Floating Action Button -->
    <div class="fixed bottom-6 right-6">
      <button
        class="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-110 flex items-center justify-center"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 11m0 0L4 13m2-2v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 21v-6m6 6v-6"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const products = ref([]);
const loading = ref(true);
const error = ref(false);

const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = false;
    const res = await fetch("https://fakestoreapi.com/products");
    if (!res.ok) throw new Error("Failed to fetch");
    products.value = await res.json();
  } catch (e) {
    error.value = true;
    console.error("Error fetching products:", e);
  } finally {
    loading.value = false;
  }
};

const retryLoad = () => {
  fetchProducts();
};

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
