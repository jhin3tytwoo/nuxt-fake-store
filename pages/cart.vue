<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/"
              class="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              กลับไปช้อปต่อ
            </NuxtLink>
          </div>
          <h1 class="text-xl font-semibold text-gray-900">ตะกร้าสินค้า</h1>
          <div class="w-24"></div>
          <!-- Spacer for center alignment -->
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Empty Cart State -->
      <div v-if="cart.length === 0" class="text-center py-16">
        <div
          class="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6"
        >
          <svg
            class="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
            />
          </svg>
        </div>
        <h2 class="text-2xl font-semibold text-gray-900 mb-2">
          ตะกร้าของคุณว่างเปล่า
        </h2>
        <p class="text-gray-600 mb-8">
          เริ่มเพิ่มสินค้าเข้าตะกร้าเพื่อดำเนินการสั่งซื้อ
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          เริ่มช้อปปิ้ง
        </NuxtLink>
      </div>

      <!-- Cart Items -->
      <div v-else class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <!-- Cart Items Section -->
        <div class="lg:col-span-7">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <!-- Cart Header -->
            <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900">
                  รายการสินค้า ({{ itemCount }} รายการ)
                </h2>
                <button
                  @click="clearAllItems"
                  class="text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                >
                  ล้างตะกร้าทั้งหมด
                </button>
              </div>
            </div>

            <!-- Cart Items List -->
            <div class="divide-y divide-gray-200">
              <TransitionGroup name="cart-item" tag="div">
                <div
                  v-for="item in cart"
                  :key="item.id"
                  class="p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <div class="flex items-center space-x-4">
                    <!-- Product Image -->
                    <div
                      class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 relative"
                    >
                      <img
                        v-if="item.image || item.thumbnail"
                        :src="item.image || item.thumbnail"
                        :alt="item.title"
                        class="w-full h-full object-cover"
                        @error="handleImageError"
                      />
                      <div
                        v-else
                        class="w-full h-full flex items-center justify-center"
                        :class="{ hidden: item.image || item.thumbnail }"
                      >
                        <svg
                          class="w-8 h-8 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    </div>

                    <!-- Product Details -->
                    <div class="flex-1 min-w-0">
                      <h3 class="text-base font-medium text-gray-900 truncate">
                        {{ item.title }}
                      </h3>
                      <p class="text-sm text-gray-500 mt-1">
                        ราคา ${{ item.price.toFixed(2) }}
                      </p>
                    </div>

                    <!-- Quantity Controls -->
                    <div class="flex items-center space-x-3">
                      <div
                        class="flex items-center border border-gray-300 rounded-lg"
                      >
                        <button
                          @click="decreaseQuantity(item.id)"
                          class="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-l-lg"
                          :disabled="item.quantity <= 1"
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
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <span
                          class="px-4 py-2 text-sm font-medium text-gray-900 min-w-[3rem] text-center"
                        >
                          {{ item.quantity }}
                        </span>
                        <button
                          @click="increaseQuantity(item.id)"
                          class="p-2 hover:bg-gray-100 transition-colors duration-200 rounded-r-lg"
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
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                          </svg>
                        </button>
                      </div>

                      <!-- Item Total -->
                      <div class="text-right min-w-[5rem]">
                        <p class="text-lg font-semibold text-gray-900">
                          ${{ (item.price * item.quantity).toFixed(2) }}
                        </p>
                      </div>

                      <!-- Remove Button -->
                      <button
                        @click="removeItem(item.id)"
                        class="ml-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="ลบสินค้า"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </TransitionGroup>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="mt-8 lg:mt-0 lg:col-span-5">
          <div
            class="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8"
          >
            <div class="px-6 py-4 border-b border-gray-200">
              <h2 class="text-lg font-semibold text-gray-900">
                สรุปคำสั่งซื้อ
              </h2>
            </div>

            <div class="px-6 py-4 space-y-4">
              <!-- Summary Details -->
              <div class="space-y-3">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">จำนวนสินค้า</span>
                  <span class="font-medium">{{ itemCount }} รายการ</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">ราคารวม</span>
                  <span class="font-medium">${{ total }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">ค่าจัดส่ง</span>
                  <span class="font-medium text-green-600">ฟรี</span>
                </div>
                <div class="border-t border-gray-200 pt-3">
                  <div class="flex justify-between text-lg font-semibold">
                    <span>ยอดรวมทั้งสิ้น</span>
                    <span class="text-blue-600">${{ total }}</span>
                  </div>
                </div>
              </div>

              <!-- Checkout Button -->
              <NuxtLink
                to="/checkout"
                class="w-full bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                <span>ดำเนินการชำระเงิน</span>
              </NuxtLink>

              <!-- Continue Shopping -->
              <NuxtLink
                to="/"
                class="w-full border border-gray-300 text-gray-700 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span>ช้อปต่อ</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const cart = computed(() => cartStore.items);
const total = computed(() => cartStore.total);
const itemCount = computed(() => cartStore.itemCount);

function removeItem(id) {
  cartStore.removeFromCart(id);
}

function increaseQuantity(id) {
  cartStore.increaseQuantity(id);
}

function decreaseQuantity(id) {
  cartStore.decreaseQuantity(id);
}

function clearAllItems() {
  if (confirm("คุณต้องการล้างสินค้าทั้งหมดในตะกร้าหรือไม่?")) {
    cartStore.clearCart();
  }
}

function handleImageError(event) {
  // Hide the broken image and show placeholder
  event.target.style.display = "none";
  event.target.nextElementSibling?.classList.remove("hidden");
}
</script>

<style scoped>
.cart-item-enter-active,
.cart-item-leave-active {
  transition: all 0.3s ease;
}

.cart-item-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.cart-item-leave-to {
  opacity: 0;
  transform: translateX(10px);
}

.cart-item-move {
  transition: transform 0.3s ease;
}
</style>
