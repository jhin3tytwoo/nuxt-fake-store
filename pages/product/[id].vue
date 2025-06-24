<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >
    <!-- Header Navigation -->
    <div
      class="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10 border-b border-gray-200"
    >
      <div class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/"
              class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200 group"
            >
              <div
                class="w-8 h-8 bg-gray-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  ></path>
                </svg>
              </div>
              <span class="font-medium">กลับหน้ารวม</span>
            </NuxtLink>
          </div>

          <div class="flex items-center space-x-3">
            <NuxtLink
              to="/cart"
              class="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
            >
              <svg
                class="w-4 h-4"
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
              <span class="font-medium">ตะกร้า</span>
              <span
                v-if="cart.totalItems > 0"
                class="bg-white/20 text-xs px-2 py-0.5 rounded-full"
              >
                {{ cart.totalItems }}
              </span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="animate-pulse">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8">
            <div class="w-full h-96 bg-gray-200 rounded-2xl"></div>
          </div>
          <div class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 space-y-6">
            <div class="h-8 bg-gray-200 rounded"></div>
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="space-y-2">
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded"></div>
              <div class="h-4 bg-gray-200 rounded w-4/5"></div>
            </div>
            <div class="h-6 bg-gray-200 rounded w-1/4"></div>
            <div class="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-20">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6"
        >
          <span class="text-3xl">😕</span>
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">ไม่พบสินค้า</h2>
        <p class="text-gray-600 mb-8">ขออภัย เราไม่พบสินค้าที่คุณต้องการ</p>
        <NuxtLink
          to="/"
          class="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
        >
          <span>กลับหน้าหลัก</span>
        </NuxtLink>
      </div>

      <!-- Product Content -->
      <div v-else-if="product" class="space-y-8">
        <!-- Breadcrumb -->
        <nav class="flex items-center space-x-2 text-sm text-gray-600">
          <NuxtLink to="/" class="hover:text-blue-600 transition-colors"
            >หน้าหลัก</NuxtLink
          >
          <span>•</span>
          <span class="text-blue-600 font-medium">{{ product.category }}</span>
          <span>•</span>
          <span class="truncate max-w-xs">{{ product.title }}</span>
        </nav>

        <!-- Main Product Section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Image -->
          <div
            class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/20"
          >
            <div class="relative group">
              <div class="bg-gray-50 rounded-2xl p-8 mb-6">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="w-full h-96 object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <!-- Image Actions -->
              <div class="flex items-center justify-center space-x-3">
                <button
                  class="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-white transition-all duration-200"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  <span>ขยายดู</span>
                </button>
                <button
                  class="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl text-sm text-gray-700 hover:bg-white transition-all duration-200"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  <span>บันทึก</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Product Details -->
          <div
            class="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-sm border border-white/20 space-y-6"
          >
            <!-- Category Badge -->
            <div class="flex items-center justify-between">
              <span
                class="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium rounded-full"
              >
                {{ product.category }}
              </span>
              <div class="flex items-center space-x-2">
                <div class="flex items-center space-x-1">
                  <span class="text-yellow-400">⭐</span>
                  <span class="text-sm font-medium">{{
                    product.rating?.rate || "4.0"
                  }}</span>
                  <span class="text-gray-400 text-sm"
                    >({{ product.rating?.count || "100" }})</span
                  >
                </div>
              </div>
            </div>

            <!-- Product Title -->
            <h1 class="text-3xl font-bold text-gray-800 leading-tight">
              {{ product.title }}
            </h1>

            <!-- Description -->
            <div class="prose prose-gray max-w-none">
              <p class="text-gray-700 leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Price Section -->
            <div
              class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100"
            >
              <div class="flex items-center justify-between mb-4">
                <div>
                  <p class="text-sm text-gray-600 mb-1">ราคา</p>
                  <div class="flex items-baseline space-x-2">
                    <span
                      class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    >
                      ${{ product.price }}
                    </span>
                    <span class="text-lg text-gray-400 line-through">
                      ${{ (product.price * 1.2).toFixed(2) }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm text-green-600 font-medium">ประหยัด 20%</p>
                  <p class="text-xs text-gray-500">เฉพาะวันนี้</p>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="flex items-center space-x-4">
              <span class="text-sm font-medium text-gray-700">จำนวน:</span>
              <div
                class="flex items-center bg-white rounded-xl border border-gray-200"
              >
                <button
                  @click="decreaseQuantity"
                  :disabled="quantity <= 1"
                  class="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-l-xl transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 12H4"
                    ></path>
                  </svg>
                </button>
                <span class="px-4 py-2 font-medium min-w-[3rem] text-center">{{
                  quantity
                }}</span>
                <button
                  @click="increaseQuantity"
                  class="p-2 hover:bg-gray-50 rounded-r-xl transition-colors"
                >
                  <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="space-y-3">
              <button
                @click="addToCart"
                :disabled="isAddingToCart"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                <svg
                  v-if="isAddingToCart"
                  class="w-5 h-5 animate-spin"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
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
                <span>{{
                  isAddingToCart ? "กำลังเพิ่ม..." : "เพิ่มใส่ตะกร้า"
                }}</span>
              </button>

              <button
                class="w-full bg-white border-2 border-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>ซื้อทันที</span>
              </button>
            </div>

            <!-- Additional Info -->
            <div class="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                <span>ของแท้ 100%</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
                <span>จัดส่งฟรี</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 text-purple-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
                <span>รับประกันคุณภาพ</span>
              </div>
              <div class="flex items-center space-x-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 text-orange-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  ></path>
                </svg>
                <span>คืนเงินได้</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success Toast -->
    <div
      v-if="showSuccessToast"
      class="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg flex items-center space-x-2 z-50 animate-bounce"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        ></path>
      </svg>
      <span>เพิ่มสินค้าลงตะกร้าแล้ว!</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCartStore } from "@/stores/cart";

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref(false);
const quantity = ref(1);
const isAddingToCart = ref(false);
const showSuccessToast = ref(false);
const cart = useCartStore();

const fetchProduct = async () => {
  try {
    loading.value = true;
    error.value = false;
    const res = await fetch(
      `https://fakestoreapi.com/products/${route.params.id}`
    );
    if (!res.ok) throw new Error("Product not found");
    product.value = await res.json();
  } catch (e) {
    error.value = true;
    console.error("Error fetching product:", e);
  } finally {
    loading.value = false;
  }
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const addToCart = async () => {
  if (product.value && !isAddingToCart.value) {
    isAddingToCart.value = true;

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    for (let i = 0; i < quantity.value; i++) {
      cart.addToCart(product.value);
    }

    isAddingToCart.value = false;
    showSuccessToast.value = true;

    // Hide toast after 3 seconds
    setTimeout(() => {
      showSuccessToast.value = false;
    }, 3000);
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<style scoped>
@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

.animate-bounce {
  animation: bounce 1s ease infinite;
}

.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 0;
}
</style>
