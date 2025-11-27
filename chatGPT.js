const chat = document.getElementById("chat");
const txt  = document.getElementById("txt");
const btn  = document.getElementById("send");

function addMessage(text, type){
  const div = document.createElement("div");
  div.className = "msg " + type;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

function reply(text){
  let r = "تم استلام رسالتك 👍";
  if(text.toLowerCase().includes("html")) r = "HTML هي لغة هيكلة صفحات الويب.";
  if(text.toLowerCase().includes("css"))  r = "CSS لتنسيق الألوان والشكل.";
  if(text.toLowerCase().includes("js"))   r = "JavaScript تضيف تفاعل للموقع.";
  if(text.toLowerCase().includes("من هو صاحب المشروع")) r ="رزق عبدالله الصالحي";
  if(text.toLowerCase().includes("من افضل دكتور في جامعة اقليم سبأ")) r ="الدكتور فتحي الجرادي";
  if(text.toLowerCase().includes("اريد نبذة عنة")) r ="دكتور في جامعة اقليم سبأ  دكتور حبوب  ومرن";
  if(text.toLowerCase().includes("السلام عليكم")) r ="عليكم السلام ورحمة الله وبركاتة";
  if(text.toLowerCase().includes("كيف حالك")) r ="الحمدلله تمام";
  if(text.toLowerCase().includes("ويش اخبارك")) r ="طيبه ";
  addMessage(r, "bot");
}

function sendMsg(){
  const t = txt.value.trim();
  if(!t) return;
  addMessage(t, "user");
  txt.value = "";
  reply(t);
}

btn.addEventListener("click", sendMsg);

txt.addEventListener("keydown", e=>{
  if(e.key === "Enter") sendMsg();
});