<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center space-x-4">
            <NuxtLink
              to="/cart"
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
              กลับไปตะกร้า
            </NuxtLink>
          </div>
          <h1 class="text-xl font-semibold text-gray-900">ชำระเงิน</h1>
          <div class="w-24"></div>
        </div>
      </div>
    </div>

    <!-- Progress Steps -->
    <div class="bg-white border-b">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-center space-x-8">
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium"
            >
              ✓
            </div>
            <span class="ml-2 text-sm font-medium text-green-600"
              >ตะกร้าสินค้า</span
            >
          </div>
          <div class="w-16 h-0.5 bg-green-500"></div>
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium"
            >
              2
            </div>
            <span class="ml-2 text-sm font-medium text-blue-600">ชำระเงิน</span>
          </div>
          <div class="w-16 h-0.5 bg-gray-300"></div>
          <div class="flex items-center">
            <div
              class="w-8 h-8 bg-gray-300 text-gray-500 rounded-full flex items-center justify-center text-sm font-medium"
            >
              3
            </div>
            <span class="ml-2 text-sm font-medium text-gray-500"
              >เสร็จสิ้น</span
            >
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Success State (After Payment) -->
      <div v-if="paymentSuccess" class="max-w-md mx-auto">
        <div
          class="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center"
        >
          <!-- Success Animation -->
          <div
            class="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6"
          >
            <svg
              class="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 class="text-2xl font-bold text-gray-900 mb-2">ชำระเงินสำเร็จ!</h2>
          <p class="text-gray-600 mb-6">คำสั่งซื้อของคุณได้รับการยืนยันแล้ว</p>

          <!-- Order Details -->
          <div class="bg-gray-50 rounded-lg p-4 mb-6">
            <div class="text-sm text-gray-600 mb-2">หมายเลขคำสั่งซื้อ</div>
            <div class="font-mono text-lg font-semibold text-gray-900">
              #{{ orderNumber }}
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="space-y-3">
            <NuxtLink
              to="/"
              class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
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
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>กลับสู่หน้าหลัก</span>
            </NuxtLink>

            <button
              @click="downloadReceipt"
              class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>ดาวน์โหลดใบเสร็จ</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Checkout Form -->
      <div v-else class="lg:grid lg:grid-cols-12 lg:gap-x-12">
        <!-- Payment Form -->
        <div class="lg:col-span-7">
          <form @submit.prevent="processPayment" class="space-y-6">
            <!-- Customer Information -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                ข้อมูลลูกค้า
              </h2>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >ชื่อ</label
                  >
                  <input
                    v-model="customerInfo.firstName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="กรอกชื่อ"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >นามสกุล</label
                  >
                  <input
                    v-model="customerInfo.lastName"
                    type="text"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="กรอกนามสกุล"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >อีเมล</label
                >
                <input
                  v-model="customerInfo.email"
                  type="email"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="example@email.com"
                />
              </div>

              <div class="mt-4">
                <label class="block text-sm font-medium text-gray-700 mb-1"
                  >เบอร์โทรศัพท์</label
                >
                <input
                  v-model="customerInfo.phone"
                  type="tel"
                  required
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="0XX-XXX-XXXX"
                />
              </div>
            </div>

            <!-- Shipping Address -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                ที่อยู่จัดส่ง
              </h2>

              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1"
                    >ที่อยู่</label
                  >
                  <textarea
                    v-model="shippingAddress.address"
                    required
                    rows="3"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    placeholder="บ้านเลขที่ ซอย ถนน"
                  ></textarea>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >จังหวัด</label
                    >
                    <input
                      v-model="shippingAddress.province"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="จังหวัด"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >รหัสไปรษณีย์</label
                    >
                    <input
                      v-model="shippingAddress.zipCode"
                      type="text"
                      required
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Payment Method -->
            <div
              class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h2 class="text-lg font-semibold text-gray-900 mb-4">
                วิธีการชำระเงิน
              </h2>

              <div class="space-y-3">
                <label
                  class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="credit_card"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <div class="ml-3 flex items-center">
                    <svg
                      class="w-6 h-6 text-gray-600 mr-2"
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
                    <span class="font-medium">บัตรเครดิต/เดบิต</span>
                  </div>
                </label>

                <label
                  class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="bank_transfer"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <div class="ml-3 flex items-center">
                    <svg
                      class="w-6 h-6 text-gray-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                      />
                    </svg>
                    <span class="font-medium">โอนเงินผ่านธนาคาร</span>
                  </div>
                </label>

                <label
                  class="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                >
                  <input
                    v-model="paymentMethod"
                    type="radio"
                    value="cash_on_delivery"
                    class="text-blue-600 focus:ring-blue-500"
                  />
                  <div class="ml-3 flex items-center">
                    <svg
                      class="w-6 h-6 text-gray-600 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span class="font-medium">เก็บเงินปลายทาง</span>
                  </div>
                </label>
              </div>
            </div>
          </form>
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

            <div class="px-6 py-4">
              <!-- Order Items -->
              <div class="space-y-3 mb-4" v-if="cart.length > 0">
                <div
                  v-for="item in cart"
                  :key="item.id"
                  class="flex justify-between items-center text-sm"
                >
                  <div class="flex-1">
                    <span class="font-medium">{{ item.title }}</span>
                    <span class="text-gray-500 ml-2">x{{ item.quantity }}</span>
                  </div>
                  <span class="font-medium"
                    >${{ (item.price * item.quantity).toFixed(2) }}</span
                  >
                </div>
              </div>

              <!-- Summary Totals -->
              <div class="border-t border-gray-200 pt-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">ราคาสินค้า</span>
                  <span class="font-medium">${{ cartTotal }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">ค่าจัดส่ง</span>
                  <span class="font-medium text-green-600">ฟรี</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">ภาษี</span>
                  <span class="font-medium">${{ tax }}</span>
                </div>
                <div class="border-t border-gray-200 pt-2">
                  <div class="flex justify-between text-lg font-semibold">
                    <span>ยอดรวมทั้งสิ้น</span>
                    <span class="text-blue-600">${{ finalTotal }}</span>
                  </div>
                </div>
              </div>

              <!-- Payment Button -->
              <button
                @click="processPayment"
                :disabled="isProcessing || !isFormValid"
                class="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <svg
                  v-if="isProcessing"
                  class="animate-spin w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2-2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>{{
                  isProcessing ? "กำลังดำเนินการ..." : "ยืนยันการชำระเงิน"
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

// Reactive data
const paymentSuccess = ref(false);
const isProcessing = ref(false);
const orderNumber = ref("");

const customerInfo = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
});

const shippingAddress = ref({
  address: "",
  province: "",
  zipCode: "",
});

const paymentMethod = ref("credit_card");

// Computed properties
const cart = computed(() => cartStore.items);
const cartTotal = computed(() => cartStore.total);
const tax = computed(() => (parseFloat(cartTotal.value) * 0.07).toFixed(2));
const finalTotal = computed(() =>
  (parseFloat(cartTotal.value) + parseFloat(tax.value)).toFixed(2)
);

const isFormValid = computed(() => {
  return (
    customerInfo.value.firstName &&
    customerInfo.value.lastName &&
    customerInfo.value.email &&
    customerInfo.value.phone &&
    shippingAddress.value.address &&
    shippingAddress.value.province &&
    shippingAddress.value.zipCode &&
    paymentMethod.value
  );
});

// Methods
function generateOrderNumber() {
  return "ORD" + Date.now().toString().slice(-8);
}

async function processPayment() {
  if (!isFormValid.value) return;

  isProcessing.value = true;

  // Save cart items before clearing (for receipt generation)
  const cartItems = JSON.parse(JSON.stringify(cart.value));

  // Simulate payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000));

  orderNumber.value = generateOrderNumber();
  paymentSuccess.value = true;
  isProcessing.value = false;

  // Store cart items for receipt generation
  window.receiptData = {
    items: cartItems,
    customerInfo: customerInfo.value,
    shippingAddress: shippingAddress.value,
    paymentMethod: paymentMethod.value,
    orderNumber: orderNumber.value,
    cartTotal: cartTotal.value,
    tax: tax.value,
    finalTotal: finalTotal.value,
  };

  // Clear cart after successful payment
  cartStore.clearCart();
}

function downloadReceipt() {
  // Create canvas for receipt
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set canvas size
  canvas.width = 600;
  canvas.height = 800;

  // Background
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Helper function to draw text
  function drawText(
    text,
    x,
    y,
    font = "16px Arial",
    color = "#000000",
    align = "left"
  ) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x, y);
  }

  // Header
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(0, 0, canvas.width, 80);

  drawText(
    "ใบเสร็จรับเงิน",
    canvas.width / 2,
    35,
    "bold 24px Arial",
    "#ffffff",
    "center"
  );
  drawText("RECEIPT", canvas.width / 2, 60, "14px Arial", "#ffffff", "center");

  let y = 120;

  // Order info
  drawText(
    `หมายเลขคำสั่งซื้อ: ${orderNumber.value}`,
    40,
    y,
    "bold 18px Arial",
    "#1f2937"
  );
  y += 30;
  drawText(
    `วันที่: ${new Date().toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}`,
    40,
    y,
    "14px Arial",
    "#6b7280"
  );
  y += 40;

  // Customer info
  drawText("ข้อมูลลูกค้า", 40, y, "bold 16px Arial", "#1f2937");
  y += 25;
  drawText(
    `ชื่อ: ${customerInfo.value.firstName} ${customerInfo.value.lastName}`,
    40,
    y,
    "14px Arial",
    "#374151"
  );
  y += 20;
  drawText(
    `อีเมล: ${customerInfo.value.email}`,
    40,
    y,
    "14px Arial",
    "#374151"
  );
  y += 20;
  drawText(
    `เบอร์โทร: ${customerInfo.value.phone}`,
    40,
    y,
    "14px Arial",
    "#374151"
  );
  y += 40;

  // Shipping address
  drawText("ที่อยู่จัดส่ง", 40, y, "bold 16px Arial", "#1f2937");
  y += 25;
  const addressLines = shippingAddress.value.address.split("\n");
  addressLines.forEach((line) => {
    drawText(line, 40, y, "14px Arial", "#374151");
    y += 20;
  });
  drawText(
    `${shippingAddress.value.province} ${shippingAddress.value.zipCode}`,
    40,
    y,
    "14px Arial",
    "#374151"
  );
  y += 40;

  // Items header
  drawText("รายการสินค้า", 40, y, "bold 16px Arial", "#1f2937");
  y += 25;

  // Draw line
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(40, y);
  ctx.lineTo(560, y);
  ctx.stroke();
  y += 20;

  // Items
  const savedItems = JSON.parse(JSON.stringify(cart.value)); // Save cart items before clearing
  savedItems.forEach((item) => {
    drawText(item.title, 40, y, "14px Arial", "#374151");
    drawText(`x${item.quantity}`, 400, y, "14px Arial", "#6b7280");
    drawText(
      `${(item.price * item.quantity).toFixed(2)}`,
      560,
      y,
      "14px Arial",
      "#374151",
      "right"
    );
    y += 25;
  });

  y += 20;

  // Draw line
  ctx.beginPath();
  ctx.moveTo(40, y);
  ctx.lineTo(560, y);
  ctx.stroke();
  y += 25;

  // Totals
  drawText("ราคาสินค้า:", 400, y, "14px Arial", "#6b7280");
  drawText(`${cartTotal.value}`, 560, y, "14px Arial", "#374151", "right");
  y += 25;

  drawText("ค่าจัดส่ง:", 400, y, "14px Arial", "#6b7280");
  drawText("ฟรี", 560, y, "14px Arial", "#16a34a", "right");
  y += 25;

  drawText("ภาษี (7%):", 400, y, "14px Arial", "#6b7280");
  drawText(`${tax.value}`, 560, y, "14px Arial", "#374151", "right");
  y += 30;

  // Final total
  ctx.fillStyle = "#3b82f6";
  ctx.fillRect(40, y - 5, 520, 30);

  drawText("ยอดรวมทั้งสิ้น:", 50, y + 15, "bold 16px Arial", "#ffffff");
  drawText(
    `${finalTotal.value}`,
    550,
    y + 15,
    "bold 18px Arial",
    "#ffffff",
    "right"
  );

  y += 60;

  // Payment method
  const paymentMethodText = {
    credit_card: "บัตรเครดิต/เดบิต",
    bank_transfer: "โอนเงินผ่านธนาคาร",
    cash_on_delivery: "เก็บเงินปลายทาง",
  };

  drawText(
    `วิธีการชำระเงิน: ${paymentMethodText[paymentMethod.value]}`,
    40,
    y,
    "14px Arial",
    "#374151"
  );
  y += 40;

  // Footer
  drawText(
    "ขอบคุณที่ใช้บริการ",
    canvas.width / 2,
    y,
    "bold 16px Arial",
    "#3b82f6",
    "center"
  );
  drawText(
    "Thank you for your business!",
    canvas.width / 2,
    y + 25,
    "12px Arial",
    "#6b7280",
    "center"
  );

  // Convert canvas to blob and download
  canvas.toBlob(function (blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `receipt-${orderNumber.value}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, "image/png");
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.bg-white {
  animation: fadeIn 0.3s ease-out;
}
</style>
