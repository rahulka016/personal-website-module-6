
function app() {
  return {
    dark: false,
    mm: false,
    sc: false,
    s: 'hero',

    init() {
      // dark mode
      this.dark = localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.$watch('dark', v => localStorage.setItem('theme', v ? 'dark' : 'light'));

      // scroll
      window.addEventListener('scroll', () => {
        this.sc = window.scrollY > 20;
        this.updateSection();
      }, { passive: true });

      // reveal
      const io = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      document.querySelectorAll('.reveal').forEach(el => io.observe(el));

      // year
      document.getElementById('yr').textContent = new Date().getFullYear();
    },

    updateSection() {
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 60;
      if (atBottom) { this.s = 'contact'; return; }
      const ids = ['contact','blog','reviews','about','work','services','hero'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) { this.s = id; return; }
      }
    }
  }
  
}
function sendmail() {
    const email = document.getElementById("femail").value.trim();
const phone = document.getElementById("fphone").value.trim();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9]{10}$/;

if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
}

if (!phonePattern.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
}
    var params = {
        fname: document.getElementById("fname").value,
        femail: document.getElementById("femail").value,
        fmessage: document.getElementById("fmessage").value,
         fsubject: document.getElementById("fsubject").value,
        fphone: document.getElementById("fphone").value,
    };

    const serviceID = "service_wlu69zy";
    const templateID = "template_3fbev6b";
console.log(params);
console.log("Phone:", document.getElementById("fphone").value);
    emailjs.send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("fname").value = "";
            document.getElementById("femail").value = "";
            document.getElementById("fmessage").value = "";
            document.getElementById("fsubject").value = "";
            document.getElementById("fphone").value = "";

            console.log(res);
            alert("Your message was sent successfully!");
        })
        .catch((err) => {
            console.log(err);
            alert("Failed to send message.");
        });
}

