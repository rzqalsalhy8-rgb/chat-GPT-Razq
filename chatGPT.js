// ===== تسجيل الدخول =====
const loginSection = document.getElementById("login-section");
const chatSection  = document.getElementById("chat-section");

const loginForm  = document.getElementById("login-form");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const loginError = document.getElementById("login-error");

// بيانات دخول بسيطة (ثابتة للمشروع)
const VALID_USERNAME = "رزق";
const VALID_PASSWORD = "1234";

loginForm.addEventListener("submit", function (e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  const u = usernameEl.value.trim();
  const p = passwordEl.value.trim();

  if (u === VALID_USERNAME && p === VALID_PASSWORD) {
    // إخفاء شاشة الدخول وإظهار الدردشة
    loginSection.classList.add("hidden");
    chatSection.classList.remove("hidden");
    loginError.textContent = "";
  } else {
    loginError.textContent = "الاسم أو الرمز غير صحيح، جرّب مرة أخرى.";
  }
});
// ربط عناصر HTML بالجافاسكربت
const chat = document.getElementById("chat"); // مكان عرض الرسائل
const txt  = document.getElementById("txt");  // صندوق الإدخال
const btn  = document.getElementById("send"); // زر الإرسال

// إضافة رسالة داخل الدردشة
function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = "msg " + type;  // msg user أو msg bot
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight; // التمرير لآخر الرسائل
}

// قاعدة ذكاء بسيطة (أسئلة + إجابات جاهزة)
const knowledge = [
  {
    keywords: ["كيف حالك", "شلونك", "اخبارك"],
    answer: "الحمد لله بخير 😊 شكرًا لسؤالك! وأنت كيف حالك؟"
  },
  {
    keywords: ["اسمك", "من انت", "مين انت"],
    answer: "أنا نموذج محادثة بسيط مبرمج بـ HTML + CSS + JavaScript 🤖"
  },
  {
    keywords: ["اين انت", "وينك"],
    answer: "أنا موجود داخل موقعك على الإنترنت 🌐"
  },
  {
    keywords: ["html"],
    answer: "HTML = تبني هيكل الصفحة، مثل الأساس 🧱"
  },
  {
    keywords: ["css"],
    answer: "CSS = تعطي ألوان وشكل وتصميم جميل للموقع 🎨"
  },
  {
    keywords: ["js", "javascript", "جافا"],
    answer: "JavaScript = تضيف تفاعل وذكاء للموقع ⚡"
  },
  {
    keywords: ["من برمجك", "من سواك", "من صنعك"],
    answer: "مُبرمجي هو الطالب المبدع: رزق عبدالله الصالحي  (كل الفخر 🔥)"
  },
  {
    keywords: ["المشروع تحت اشراف من"],
    answer: "الدكتور الفاضل /فتحي الجراد  (حفظة الله ورعاه)"
  }
];

// دالة الذكاء للرد على المستخدم
function smartReply(text) {
  const msg = text.toLowerCase();

  // نبحث لو السؤال يحتوي كلمة ضمن القاعدة
  for (const item of knowledge) {
    for (const key of item.keywords) {
      if (msg.includes(key.toLowerCase())) return item.answer;
    }
  }

  // رد افتراضي لو ما فهم السؤال
  return "لم أفهم سؤالك 😅\nجرّب تسأل عن: HTML - CSS - JavaScript - كيف حالك";
}

// عند إرسال رسالة
function sendMsg() {
  const text = txt.value.trim();
  if (!text) return;

  addMessage(text, "user"); // عرض رسالة المستخدم
  txt.value = "";

  // إضافة رسالة انتظار وهمية
  const thinking = document.createElement("div");
  thinking.className = "msg bot";
  thinking.textContent = "جاري التفكير 🤔...";
  chat.appendChild(thinking);
  chat.scrollTop = chat.scrollHeight;

  setTimeout(() => {
    thinking.remove();                 // حذف جاري التفكير
    addMessage(smartReply(text), "bot"); // الرد الذكي
  }, 600);
}

// الضغط على زر إرسال
btn.addEventListener("click", sendMsg);

// إرسال بالإنتر
txt.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendMsg();
  }
});