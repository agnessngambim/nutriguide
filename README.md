# NutriGuide Daily

create an app this                                                                                                                                              <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>People's Choice Nutrition Care</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
  :root{
    --clay:#B24C31;
    --leaf:#2F5233;
    --leaf-dim:#3F6B45;
    --maize:#E3A72F;
    --sand:#F7EFDE;
    --sand-deep:#EFE3C7;
    --ink:#23201B;
    --ink-soft:#5B564B;
    --paper:#FFFDF8;
    --line:#DCD0B2;
    --danger:#9C3B2B;
  }
  *{box-sizing:border-box;}
  html,body{margin:0;padding:0;}
  body{
    background:var(--sand);
    color:var(--ink);
    font-family:'Inter',sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  h1,h2,h3,.display{
    font-family:'Fraunces',serif;
    font-weight:600;
    letter-spacing:-0.01em;
  }
  .mono{font-family:'IBM Plex Mono',monospace;}
  a{color:inherit;}
  button{font-family:inherit;cursor:pointer;}
  ::selection{background:var(--maize);color:var(--ink);}

  /* ---------- Layout shell ---------- */
  #app{min-height:100vh;display:flex;flex-direction:column;}
  .wrap{max-width:1040px;margin:0 auto;padding:0 24px;}

  header.top{
    border-bottom:1px solid var(--line);
    background:var(--paper);
    position:sticky;top:0;z-index:20;
  }
  .top-inner{
    display:flex;align-items:center;justify-content:space-between;
    padding:16px 24px;max-width:1040px;margin:0 auto;
  }
  .brand{display:flex;align-items:center;gap:10px;cursor:pointer;}
  .brand-mark{
    width:34px;height:34px;border-radius:50%;
    background:conic-gradient(var(--leaf) 0 50%, var(--maize) 50% 100%);
    flex:none;
  }
  .brand-text{line-height:1.1;}
  .brand-text .name{font-family:'Fraunces',serif;font-weight:700;font-size:16px;}
  .brand-text .tag{font-size:11px;color:var(--ink-soft);text-transform:uppercase;letter-spacing:.08em;}
  nav.top-nav{display:flex;gap:22px;font-size:14px;font-weight:500;}
  nav.top-nav span{cursor:pointer;color:var(--ink-soft);}
  nav.top-nav span:hover{color:var(--ink);}
  nav.top-nav span.active{color:var(--leaf);}

  /* ---------- Hero ---------- */
  .hero{padding:64px 24px 40px;border-bottom:1px solid var(--line);}
  .eyebrow{
    font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:.12em;
    text-transform:uppercase;color:var(--clay);margin-bottom:14px;display:block;
  }
  .hero h1{font-size:44px;line-height:1.08;max-width:680px;margin:0 0 16px;}
  .hero h1 em{font-style:italic;color:var(--leaf);}
  .hero p.lead{font-size:17px;color:var(--ink-soft);max-width:520px;margin:0 0 28px;}

  .search-row{display:flex;gap:10px;max-width:520px;flex-wrap:wrap;}
  .search-row input{
    flex:1;min-width:220px;padding:13px 16px;border:1px solid var(--line);
    border-radius:8px;background:var(--paper);font-size:15px;color:var(--ink);
  }
  .search-row input:focus{outline:2px solid var(--leaf);outline-offset:1px;}
  .filter-pills{display:flex;gap:8px;margin-top:18px;flex-wrap:wrap;}
  .pill{
    padding:7px 14px;border-radius:999px;border:1px solid var(--line);
    background:var(--paper);font-size:13px;font-weight:500;color:var(--ink-soft);
  }
  .pill.active{background:var(--leaf);border-color:var(--leaf);color:#fff;}

  /* ---------- Section labels (market-stall dividers) ---------- */
  .section-label{
    display:flex;align-items:baseline;gap:12px;margin:48px 0 18px;
  }
  .section-label .num{font-family:'IBM Plex Mono',monospace;color:var(--clay);font-size:13px;}
  .section-label h2{font-size:20px;margin:0;}
  .section-label .rule{flex:1;height:1px;background:var(--line);}

  /* ---------- Disease grid ---------- */
  .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:8px;}
  @media(max-width:760px){.grid{grid-template-columns:repeat(2,1fr);}}
  @media(max-width:480px){.grid{grid-template-columns:1fr;}}

  .card{
    background:var(--paper);border:1px solid var(--line);border-radius:10px;
    padding:18px;cursor:pointer;transition:transform .15s ease, box-shadow .15s ease, border-color .15s ease;
    display:flex;flex-direction:column;gap:10px;min-height:132px;
  }
  .card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgba(35,32,27,0.08);border-color:var(--leaf-dim);}
  .card .plate{
    width:30px;height:30px;border-radius:50%;flex:none;
    background:conic-gradient(var(--leaf) 0 var(--split), var(--maize) var(--split) 100%);
  }
  .card .cname{font-family:'Fraunces',serif;font-weight:600;font-size:16px;line-height:1.25;}
  .card .ccat{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-soft);}

  .empty{color:var(--ink-soft);padding:30px 0;font-size:14px;}

  /* ---------- Detail view ---------- */
  .detail{padding:40px 0 80px;}
  .back{
    display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--ink-soft);
    margin-bottom:22px;font-weight:500;
  }
  .back:hover{color:var(--leaf);}
  .detail-head{display:flex;align-items:center;gap:16px;margin-bottom:6px;}
  .detail-plate{
    width:56px;height:56px;border-radius:50%;flex:none;
    background:conic-gradient(var(--leaf) 0 var(--split), var(--maize) var(--split) 100%);
    box-shadow:inset 0 0 0 4px var(--paper), 0 0 0 1px var(--line);
  }
  .detail h1{font-size:32px;margin:0;}
  .detail .ccat{color:var(--clay);font-size:12px;text-transform:uppercase;letter-spacing:.08em;font-weight:600;}
  .goal-box{
    background:var(--sand-deep);border-left:3px solid var(--leaf);border-radius:6px;
    padding:16px 18px;margin:22px 0 30px;font-size:15px;line-height:1.55;
  }
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:30px;}
  @media(max-width:640px){.two-col{grid-template-columns:1fr;}}
  .food-box{border:1px solid var(--line);border-radius:10px;padding:20px;background:var(--paper);}
  .food-box h3{font-size:14px;text-transform:uppercase;letter-spacing:.06em;margin:0 0 14px;display:flex;align-items:center;gap:8px;}
  .food-box.eat h3{color:var(--leaf);}
  .food-box.limit h3{color:var(--danger);}
  .food-box ul{margin:0;padding-left:18px;font-size:14.5px;line-height:1.7;}

  .sample-day{border:1px solid var(--line);border-radius:10px;overflow:hidden;margin-bottom:30px;}
  .sample-day h3{font-size:14px;text-transform:uppercase;letter-spacing:.06em;background:var(--sand-deep);margin:0;padding:12px 20px;}
  .meal-row{display:grid;grid-template-columns:120px 1fr;gap:14px;padding:14px 20px;border-top:1px solid var(--line);font-size:14.5px;}
  .meal-row .mono{color:var(--ink-soft);font-size:12px;}

  .safety{
    background:#F5E6DE;border:1px solid #E6C4B2;border-radius:10px;padding:18px 20px;
    font-size:14px;line-height:1.6;margin-bottom:34px;
  }
  .safety strong{color:var(--danger);}

  .cta-row{display:flex;gap:12px;flex-wrap:wrap;}
  .btn{
    display:inline-flex;align-items:center;gap:8px;padding:13px 22px;border-radius:8px;
    font-weight:600;font-size:14.5px;border:1px solid transparent;text-decoration:none;
  }
  .btn-primary{background:var(--leaf);color:#fff;}
  .btn-primary:hover{background:var(--leaf-dim);}
  .btn-outline{border-color:var(--line);background:var(--paper);color:var(--ink);}
  .btn-outline:hover{border-color:var(--ink);}

  /* ---------- Personalize ---------- */
  .personalize{padding:60px 0 30px;}
  .p-intro{max-width:560px;margin-bottom:30px;}
  .p-intro .eyebrow{margin-bottom:10px;}
  .p-intro h2{font-size:28px;margin:0 0 10px;}
  .p-intro p{color:var(--ink-soft);font-size:15px;line-height:1.6;}
  .form-box{
    background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:28px;
    display:grid;grid-template-columns:1fr 1fr;gap:16px;
  }
  @media(max-width:640px){.form-box{grid-template-columns:1fr;}}
  .field{display:flex;flex-direction:column;gap:6px;}
  .field.full{grid-column:1/-1;}
  .field label{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-soft);}
  .field select,.field input{
    padding:11px 12px;border:1px solid var(--line);border-radius:7px;font-size:14.5px;background:#fff;color:var(--ink);
  }
  .form-actions{grid-column:1/-1;margin-top:6px;}

  .plan-result{
    margin-top:28px;border:1px solid var(--line);border-radius:12px;background:var(--paper);overflow:hidden;
  }
  .plan-head{background:var(--leaf);color:#fff;padding:20px 26px;}
  .plan-head .mono{opacity:.75;font-size:12px;}
  .plan-head h3{margin:4px 0 0;font-size:20px;}
  .plan-body{padding:24px 26px;}
  .plan-meal{display:grid;grid-template-columns:110px 1fr;gap:16px;padding:12px 0;border-bottom:1px solid var(--line);font-size:14.5px;}
  .plan-meal:last-of-type{border-bottom:none;}
  .plan-meal .mono{color:var(--ink-soft);font-size:12px;text-transform:uppercase;}
  .plan-note{
    margin-top:18px;background:var(--sand-deep);border-radius:8px;padding:14px 16px;font-size:13.5px;color:var(--ink-soft);line-height:1.6;
  }
  .shopping{margin-top:22px;}
  .shopping h4{font-size:13px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px;color:var(--ink-soft);}
  .chips{display:flex;flex-wrap:wrap;gap:8px;}
  .chip{
    background:var(--sand);border:1px solid var(--line);border-radius:999px;padding:6px 12px;font-size:13px;
  }

  /* ---------- Pricing ---------- */
  .pricing{padding:60px 0 80px;}
  .tiers{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
  @media(max-width:760px){.tiers{grid-template-columns:1fr;}}
  .tier{border:1px solid var(--line);border-radius:12px;padding:26px;background:var(--paper);display:flex;flex-direction:column;}
  .tier.mid{border-color:var(--leaf);box-shadow:0 8px 24px rgba(47,82,51,0.12);position:relative;}
  .tier.mid::before{
    content:"Most booked";position:absolute;top:-11px;left:26px;background:var(--maize);
    color:var(--ink);font-size:11px;font-weight:700;padding:3px 10px;border-radius:999px;
    text-transform:uppercase;letter-spacing:.04em;
  }
  .tier .tname{font-family:'Fraunces',serif;font-weight:600;font-size:18px;margin-bottom:6px;}
  .tier .tprice{font-family:'IBM Plex Mono',monospace;font-size:22px;color:var(--clay);margin-bottom:16px;}
  .tier ul{padding-left:18px;margin:0 0 22px;font-size:14px;line-height:1.8;color:var(--ink-soft);flex:1;}
  .tier .btn{align-self:flex-start;}

  footer{border-top:1px solid var(--line);padding:26px 24px;text-align:center;font-size:13px;color:var(--ink-soft);}
</style>
</head>
<body>
<div id="app"></div>

<script>
/* ===================== DATA ===================== */
const CONDITIONS = [
  {
    id:"diabetes", name:"Type 2 Diabetes", cat:"NCD", split:"55%",
    goal:"Keep blood sugar steady through the day by choosing slower-digesting carbohydrates, spacing meals evenly, and pairing starch with protein or vegetables rather than eating it alone.",
    eat:["Small, regular portions of nshima made with mixed roller/whole grain meal","Beans, groundnuts, kapenta and other proteins at most meals","Rape, pumpkin leaves, cabbage and other leafy vegetables","Whole fruit in moderation (avoid fruit juice)","Plenty of water instead of sugary drinks"],
    limit:["Sugary tea, soft drinks and juice","Large single portions of nshima with no protein or vegetables","Fried foods and added sugar in cooking","Refined snacks like biscuits and sweets"],
    sample:{breakfast:"Plain porridge with groundnut powder, boiled egg",lunch:"Moderate nshima, beans, rape",dinner:"Fish, sweet potato, mixed vegetables",snack:"Small handful of groundnuts or a piece of fruit"},
    safety:"If taking insulin or diabetes tablets, meal timing matters for avoiding low blood sugar — this plan should be reviewed against your medication schedule. Seek medical attention for very high or very low blood sugar symptoms."
  },
  {
    id:"hypertension", name:"Hypertension", cat:"NCD", split:"50%",
    goal:"Reduce salt intake and increase potassium-rich foods to help manage blood pressure. WHO recommends adults keep sodium intake under 2,000mg a day (about one teaspoon of salt), unless a clinician advises otherwise.",
    eat:["Fresh vegetables — rape, pumpkin leaves, tomatoes, okra","Fruit such as bananas and oranges","Beans and unsalted groundnuts","Fish and skinless chicken prepared with herbs instead of salt","Plain nshima, roller meal, sweet potato"],
    limit:["Added table salt and salty stock cubes/seasoning","Processed and salted foods (chips, salted dried fish in excess, processed meats)","Pickled or heavily preserved foods"],
    sample:{breakfast:"Porridge with fruit, no added salt",lunch:"Nshima, grilled fish, steamed rape (herbs instead of salt)",dinner:"Bean stew with vegetables, sweet potato",snack:"Banana or orange"},
    safety:"If you are on blood pressure medication, do not stop or adjust it based on diet alone. Seek urgent medical care for severe headache, chest pain, or very high readings."
  },
  {
    id:"heart", name:"Heart Disease / High Cholesterol", cat:"NCD", split:"52%",
    goal:"Reduce saturated fat and reintroduce more fibre and plant-based protein to support heart health, while keeping meals satisfying and locally accessible.",
    eat:["Beans, groundnuts and other legumes","Fish (especially small fish like kapenta) more often than red meat","Vegetables and whole fruit","Small amounts of unsaturated oil (e.g. sunflower) for cooking"],
    limit:["Deep-fried foods and excess cooking oil","Fatty cuts of red meat and processed meats","Full-cream dairy in large amounts","Added salt and sugar"],
    sample:{breakfast:"Oats or porridge with fruit",lunch:"Nshima, beans, steamed cabbage",dinner:"Grilled fish, vegetables, small portion of sweet potato",snack:"Groundnuts (unsalted, small handful)"},
    safety:"This guidance supports — but does not replace — any cholesterol or heart medication prescribed by a doctor. Chest pain, breathlessness or swelling needs urgent medical attention."
  },
  {
    id:"ckd", name:"Chronic Kidney Disease", cat:"NCD", split:"38%",
    goal:"Kidney-friendly eating is highly individual — it depends on your stage of kidney disease, blood test results and whether you're on dialysis. This section gives general orientation only.",
    eat:["Foods generally lower in potassium and phosphorus (this varies by stage — get personalised guidance)","Controlled, moderate protein portions as advised by your care team","Plenty of appropriately guided fluid — again, individualized"],
    limit:["Self-restricting entire food groups without professional advice","High-salt processed foods","Salt substitutes containing potassium, unless cleared by your clinician"],
    sample:{breakfast:"To be individualized with a professional",lunch:"To be individualized with a professional",dinner:"To be individualized with a professional",snack:"To be individualized with a professional"},
    safety:"IMPORTANT: Kidney disease nutrition should not be self-managed from a general guide. Potassium, phosphorus, protein and fluid needs change by stage and by lab results. Please book a professional consultation before making any specific changes."
  },
  {
    id:"gout", name:"Gout / High Uric Acid", cat:"NCD", split:"48%",
    goal:"Reduce foods high in purines, which raise uric acid, and stay well hydrated to help the body clear it.",
    eat:["Plenty of water throughout the day","Vegetables, whole fruit (cherries and berries are often mentioned favourably)","Low-fat dairy where available","Whole grains and beans in moderate amounts"],
    limit:["Organ meats (liver, kidney)","Red meat and shellfish in large amounts","Beer and other alcohol","Sugary drinks, especially those with high-fructose sweeteners"],
    sample:{breakfast:"Porridge with fruit",lunch:"Nshima, vegetables, small portion of chicken",dinner:"Bean stew, steamed vegetables",snack:"Fruit, plenty of water"},
    safety:"A sudden, very painful, hot or swollen joint needs medical attention — this can be an acute gout flare that may need treatment beyond diet."
  },
  {
    id:"gastritis", name:"Gastritis / Peptic Ulcer Symptoms", cat:"NCD", split:"45%",
    goal:"Reduce foods and habits that irritate the stomach lining, and eat smaller, more frequent meals rather than large ones.",
    eat:["Smaller, more frequent meals","Soft-cooked vegetables","Plain porridge, rice, nshima","Non-acidic fruit like banana"],
    limit:["Very spicy or heavily peppered food","Excess coffee, strong tea and alcohol","Citrus and very acidic foods if they trigger symptoms","Eating very large meals or lying down right after eating"],
    sample:{breakfast:"Plain porridge, banana",lunch:"Nshima, well-cooked vegetables, mild chicken stew",dinner:"Rice, soft vegetables, mild fish",snack:"Banana"},
    safety:"Persistent pain, black stools, or vomiting blood are medical emergencies — seek care immediately, this is beyond dietary management."
  },
  {
    id:"obesity", name:"Weight Management", cat:"NCD", split:"50%",
    goal:"Create a modest, sustainable energy deficit through portion control and food choice, without cutting out entire food groups or crash dieting.",
    eat:["Vegetables at most meals to add volume without many calories","Lean protein — fish, chicken, beans","Moderate portions of starch (nshima, sweet potato) rather than very large ones","Water instead of sugary drinks"],
    limit:["Deep-fried foods and excess cooking oil","Sugary drinks and snacks","Very large starch portions with little vegetable or protein"],
    sample:{breakfast:"Boiled egg, small porridge portion, fruit",lunch:"Moderate nshima, grilled fish, large portion of vegetables",dinner:"Bean stew, salad or steamed greens",snack:"Fruit or a small handful of groundnuts"},
    safety:"Rapid or extreme weight loss approaches are not recommended without medical supervision, especially if other health conditions are present."
  },
  {
    id:"hiv", name:"HIV", cat:"Communicable", split:"58%",
    goal:"Support the body's energy and immune needs, particularly maintaining a healthy weight and eating enough protein and micronutrients, alongside consistent antiretroviral treatment.",
    eat:["Protein at most meals — beans, groundnuts, fish, eggs, meat when available","A variety of colourful vegetables and fruit for vitamins and minerals","Enough energy-dense food (nshima, sweet potato) to maintain healthy weight","Clean, safely prepared water and food"],
    limit:["Skipping meals, which can affect medication tolerance and energy","Unsafe or undercooked food, which carries higher risk when immunity is affected"],
    sample:{breakfast:"Porridge with groundnut powder, boiled egg",lunch:"Nshima, beans, vegetables",dinner:"Fish or meat, vegetables, sweet potato",snack:"Fruit, groundnuts"},
    safety:"Nutrition supports treatment — it does not replace ART. Take medication as prescribed and follow up with your clinic regularly. Unexplained rapid weight loss should be discussed with your care provider."
  },
  {
    id:"tb", name:"Tuberculosis (TB)", cat:"Communicable", split:"56%",
    goal:"Support weight and strength during treatment, since TB significantly increases energy and protein needs while often reducing appetite.",
    eat:["Protein-rich foods at every meal — beans, groundnuts, eggs, fish, meat","Energy-dense foods to help rebuild weight — nshima, sweet potato, avocado where available","Frequent small meals if appetite is low, rather than three large ones","Fruit and vegetables for micronutrients"],
    limit:["Skipping meals due to low appetite — small frequent meals work better","Alcohol, which can interact with TB medication and stress the liver"],
    sample:{breakfast:"Porridge with groundnut powder and milk if tolerated",lunch:"Nshima, beans, vegetables, extra protein portion",dinner:"Fish or meat, vegetables, sweet potato",snack:"Groundnuts, fruit, small extra meal if appetite allows"},
    safety:"Nutrition supports recovery but does not replace TB treatment — completing the full course of medication is essential. Ongoing weight loss or worsening symptoms should be reported to your clinic promptly."
  },
  {
    id:"diarrhoea", name:"Acute Diarrhoea", cat:"Communicable", split:"40%",
    goal:"Prevent dehydration and keep eating through the illness — prolonged fasting is not recommended for most cases.",
    eat:["Oral rehydration solution or a home sugar-salt-water solution as advised by a health worker","Plain, easily digested foods — porridge, rice, ripe banana, well-cooked vegetables","Continue breastfeeding for infants","Small, frequent meals as appetite allows"],
    limit:["Very fatty, sugary or spicy foods until symptoms settle","Unsafe water — always use clean or boiled water"],
    sample:{breakfast:"Plain porridge, ripe banana",lunch:"Rice, well-cooked vegetables, oral rehydration solution",dinner:"Soft nshima, well-cooked vegetables",snack:"Oral rehydration solution, banana"},
    safety:"Seek urgent medical care for: blood in stool, signs of dehydration (very little urine, sunken eyes, lethargy), high fever, or diarrhoea lasting more than a couple of days, especially in young children."
  },
  {
    id:"liver", name:"Hepatitis / Liver Disease", cat:"Communicable", split:"46%",
    goal:"Support liver function with regular, balanced meals while avoiding substances that add extra strain on the liver.",
    eat:["Regular balanced meals with moderate protein — beans, fish, eggs","Vegetables and fruit for vitamins and antioxidants","Whole grains and moderate starch portions","Adequate clean water"],
    limit:["Alcohol — avoid completely","Very fatty and fried foods","Unnecessary or unprescribed medications and supplements, which the liver has to process"],
    sample:{breakfast:"Porridge, fruit",lunch:"Nshima, beans, steamed vegetables",dinner:"Fish, vegetables, small sweet potato portion",snack:"Fruit"},
    safety:"Yellowing of the eyes/skin, severe abdominal pain, or confusion require urgent medical attention. Follow your clinician's guidance closely, especially around medication."
  },
  {
    id:"anaemia", name:"Anaemia / Iron Deficiency", cat:"Other", split:"53%",
    goal:"Increase iron intake and pair it with vitamin C to improve absorption, while addressing any underlying cause with a health worker.",
    eat:["Iron-rich foods — beans, groundnuts, dark leafy greens (rape, pumpkin leaves), kapenta, liver in moderation","Vitamin C-rich fruit alongside iron-rich meals (e.g. orange, guava) to boost absorption","Eggs and fish"],
    limit:["Tea or coffee immediately with meals, which can reduce iron absorption — have these between meals instead"],
    sample:{breakfast:"Porridge with groundnut powder, orange",lunch:"Nshima, beans, rape, tomato relish",dinner:"Kapenta or liver (occasionally), vegetables",snack:"Guava or orange"},
    safety:"Persistent fatigue, dizziness, pale skin/gums, or breathlessness should be checked by a health worker — anaemia can have several underlying causes that need proper diagnosis."
  }
];
const CAT_ORDER = ["NCD","Communicable","Other"];
const CAT_LABEL = {NCD:"Noncommunicable diseases", Communicable:"Communicable diseases", Other:"Other nutrition-related conditions"};

/* ===================== STATE ===================== */
let state = { view:"home", conditionId:null, search:"", filter:"All" };

function setState(patch){ state = {...state, ...patch}; render(); window.scrollTo({top:0,behavior:"smooth"}); }

/* ===================== HELPERS ===================== */
function matches(c){
  const q = state.search.trim().toLowerCase();
  const passSearch = !q || c.name.toLowerCase().includes(q);
  const passFilter = state.filter==="All" || c.cat===state.filter;
  return passSearch && passFilter;
}
function styleSplit(c){ return `--split:${c.split}`; }

/* ===================== RENDER: HEADER ===================== */
function renderHeader(){
  return `
  <header class="top">
    <div class="top-inner">
      <div class="brand" onclick="setState({view:'home'})">
        <div class="brand-mark"></div>
        <div class="brand-text">
          <div class="name">People's Choice</div>
          <div class="tag">Nutrition Care</div>
        </div>
      </div>
      <nav class="top-nav">
        <span class="${state.view==='home'?'active':''}" onclick="setState({view:'home'})">Conditions</span>
        <span class="${state.view==='personalize'?'active':''}" onclick="setState({view:'personalize'})">Build My Plan</span>
        <span class="${state.view==='pricing'?'active':''}" onclick="setState({view:'pricing'})">Consultation</span>
      </nav>
    </div>
  </header>`;
}

/* ===================== RENDER: HOME ===================== */
function renderHome(){
  const grouped = CAT_ORDER.map(cat=>({
    cat, items: CONDITIONS.filter(c=>c.cat===cat && matches(c))
  })).filter(g=>g.items.length>0);

  const sections = grouped.map((g,i)=>`
    <div class="section-label">
      <span class="num mono">0${i+1}</span>
      <h2>${CAT_LABEL[g.cat]}</h2>
      <div class="rule"></div>
    </div>
    <div class="grid">
      ${g.items.map(c=>`
        <div class="card" onclick="setState({view:'detail',conditionId:'${c.id}'})">
          <div class="plate" style="${styleSplit(c)}"></div>
          <div class="cname">${c.name}</div>
          <div class="ccat">${c.cat}</div>
        </div>
      `).join("")}
    </div>
  `).join("");

  const emptyMsg = grouped.length===0 ? `<div class="empty">No condition matches "${state.search}". Try a different search, or clear filters.</div>` : "";

  return `
    <section class="hero">
      <span class="eyebrow">Zambia · Evidence-informed · Locally built</span>
      <h1>What health condition<br>are you <em>managing</em> today?</h1>
      <p class="lead">Practical, food-first guidance built around what's actually in the Zambian market — nshima, kapenta, beans, rape and more. Not a substitute for medical care, but a clear place to start.</p>
      <div class="search-row">
        <input type="text" placeholder="Search a condition — e.g. diabetes, HIV, gout" value="${state.search}" oninput="setState({search:this.value})">
      </div>
      <div class="filter-pills">
        ${["All","NCD","Communicable","Other"].map(f=>`
          <button class="pill ${state.filter===f?'active':''}" onclick="setState({filter:'${f}'})">${f==="All"?"All conditions":CAT_LABEL[f]||f}</button>
        `).join("")}
      </div>
    </section>
    <section class="wrap">
      ${sections || emptyMsg}
    </section>
  `;
}

/* ===================== RENDER: DETAIL ===================== */
function renderDetail(){
  const c = CONDITIONS.find(x=>x.id===state.conditionId);
  if(!c) return renderHome();
  return `
    <section class="wrap detail">
      <span class="back" onclick="setState({view:'home'})">&larr; All conditions</span>
      <div class="detail-head">
        <div class="detail-plate" style="${styleSplit(c)}"></div>
        <div>
          <div class="ccat">${c.cat}</div>
          <h1>${c.name}</h1>
        </div>
      </div>
      <div class="goal-box"><strong>Nutrition goal —</strong> ${c.goal}</div>

      <div class="two-col">
        <div class="food-box eat">
          <h3>&#10003; Foods to eat</h3>
          <ul>${c.eat.map(x=>`<li>${x}</li>`).join("")}</ul>
        </div>
        <div class="food-box limit">
          <h3>&#10005; Foods to limit</h3>
          <ul>${c.limit.map(x=>`<li>${x}</li>`).join("")}</ul>
        </div>
      </div>

      <div class="sample-day">
        <h3>Sample day</h3>
        <div class="meal-row"><div class="mono">Breakfast</div><div>${c.sample.breakfast}</div></div>
        <div class="meal-row"><div class="mono">Lunch</div><div>${c.sample.lunch}</div></div>
        <div class="meal-row"><div class="mono">Dinner</div><div>${c.sample.dinner}</div></div>
        <div class="meal-row"><div class="mono">Snack</div><div>${c.sample.snack}</div></div>
      </div>

      <div class="safety"><strong>Safety note:</strong> ${c.safety}</div>

      <div class="cta-row">
        <a class="btn btn-primary" href="#" onclick="setState({view:'personalize'});return false;">Build my personal plan</a>
        <a class="btn btn-outline" href="#" onclick="setState({view:'pricing'});return false;">Book a consultation</a>
      </div>
    </section>
  `;
}

/* ===================== RENDER: PERSONALIZE ===================== */
function renderPersonalize(){
  return `
    <section class="wrap personalize">
      <div class="p-intro">
        <span class="eyebrow">Free preview</span>
        <h2>Build a starting plan</h2>
        <p>Answer a few questions for a general, food-based starting point. For conditions needing lab-based individualization (like kidney disease or insulin-treated diabetes), this preview will point you to a professional consultation instead of guessing.</p>
      </div>

      <div class="form-box">
        <div class="field">
          <label>Condition</label>
          <select id="pf-condition">
            <option value="">General healthy eating</option>
            ${CONDITIONS.map(c=>`<option value="${c.id}">${c.name}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>Goal</label>
          <select id="pf-goal">
            <option>Manage my condition</option>
            <option>Lose weight</option>
            <option>Maintain / gain weight</option>
            <option>General healthy eating</option>
          </select>
        </div>
        <div class="field">
          <label>Budget level</label>
          <select id="pf-budget">
            <option>Modest</option>
            <option>Moderate</option>
            <option>Flexible</option>
          </select>
        </div>
        <div class="field">
          <label>Meals per day</label>
          <select id="pf-meals">
            <option>3</option>
            <option>4</option>
            <option>2</option>
          </select>
        </div>
        <div class="field full">
          <label>Any foods to avoid (allergies, dislikes)</label>
          <input type="text" id="pf-avoid" placeholder="e.g. no fish, no groundnuts">
        </div>
        <div class="form-actions">
          <button class="btn btn-primary" onclick="generatePlan()">Generate my plan</button>
        </div>
      </div>

      <div id="plan-slot"></div>
    </section>
  `;
}

function generatePlan(){
  const condId = document.getElementById("pf-condition").value;
  const goal = document.getElementById("pf-goal").value;
  const avoid = document.getElementById("pf-avoid").value.trim().toLowerCase();
  const c = CONDITIONS.find(x=>x.id===condId);
  const slot = document.getElementById("plan-slot");

  if(c && c.id==="ckd"){
    slot.innerHTML = `
      <div class="plan-result">
        <div class="plan-head"><span class="mono">PREVIEW BLOCKED</span><h3>This one needs a real professional</h3></div>
        <div class="plan-body">
          <p>Kidney-friendly eating depends on your stage of kidney disease and recent lab results — a generic plan here could do more harm than good.</p>
          <div class="plan-note">Please book a professional consultation so your plan can be built around your actual test results.</div>
          <div class="cta-row" style="margin-top:16px;">
            <a class="btn btn-primary" href="#" onclick="setState({view:'pricing'});return false;">Book a consultation</a>
          </div>
        </div>
      </div>`;
    return;
  }

  const base = c || CONDITIONS[0];
  const filterAvoid = (txt)=> avoid && txt.toLowerCase().includes(avoid.split(" ")[0]) ? null : txt;
  const meals = [
    ["Breakfast", base.sample.breakfast],
    ["Lunch", base.sample.lunch],
    ["Dinner", base.sample.dinner],
    ["Snack", base.sample.snack],
  ].map(([label,txt])=>[label, filterAvoid(txt) || `${txt.split(",")[0]} (adjusted — avoid noted item)`]);

  const shoppingSeed = [...base.eat].slice(0,6);

  slot.innerHTML = `
    <div class="plan-result">
      <div class="plan-head">
        <span class="mono">${(c?c.name:"General").toUpperCase()} · ${goal.toUpperCase()}</span>
        <h3>Your starting plan</h3>
      </div>
      <div class="plan-body">
        ${meals.map(([label,txt])=>`<div class="plan-meal"><div class="mono">${label}</div><div>${txt}</div></div>`).join("")}
        <div class="plan-note">This is a general starting point, not a medical prescription. ${c?c.safety:"For anything condition-specific, a short consultation will make this far more precise to your body, budget and medication."}</div>
        <div class="shopping">
          <h4>Shopping list to get started</h4>
          <div class="chips">${shoppingSeed.map(x=>`<span class="chip">${x.split(",")[0].split("(")[0].trim()}</span>`).join("")}</div>
        </div>
      </div>
    </div>
  `;
  slot.scrollIntoView({behavior:"smooth", block:"nearest"});
}

/* ===================== RENDER: PRICING / CONSULTATION ===================== */
function renderPricing(){
  return `
    <section class="wrap pricing">
      <div class="section-label" style="margin-top:40px;">
        <span class="num mono">03</span>
        <h2>From free guidance to a professional plan</h2>
        <div class="rule"></div>
      </div>
      <div class="tiers">
        <div class="tier">
          <div class="tname">Free</div>
          <div class="tprice">K0</div>
          <ul>
            <li>Browse all condition guides</li>
            <li>General eat / limit lists</li>
            <li>Sample day per condition</li>
          </ul>
          <a class="btn btn-outline" href="#" onclick="setState({view:'home'});return false;">Browse conditions</a>
        </div>
        <div class="tier mid">
          <div class="tname">Premium Digital Guide</div>
          <div class="tprice">K120</div>
          <ul>
            <li>Full downloadable guide, all conditions</li>
            <li>7–14 day meal plans</li>
            <li>Auto-generated shopping lists</li>
            <li>Editable, printable format</li>
          </ul>
          <a class="btn btn-primary" href="#">Get the guide</a>
        </div>
        <div class="tier">
          <div class="tname">Professional Consultation</div>
          <div class="tprice">from K350</div>
          <ul>
            <li>1-on-1 session with a nutrition professional</li>
            <li>Plan personalised to your labs, budget and meds</li>
            <li>Follow-up check-in</li>
            <li>Priority for complex conditions (CKD, insulin-treated diabetes, etc.)</li>
          </ul>
          <a class="btn btn-primary" href="#">Book a session</a>
        </div>
      </div>
    </section>
  `;
}

/* ===================== MAIN RENDER ===================== */
function render(){
  let body;
  if(state.view==="detail") body = renderDetail();
  else if(state.view==="personalize") body = renderPersonalize();
  else if(state.view==="pricing") body = renderHome() ? renderPricing() : renderPricing();
  else body = renderHome() + renderPricing();

  document.getElementById("app").innerHTML = `
    ${renderHeader()}
    <main style="flex:1;">${body}</main>
    <footer>People's Choice Nutrition Care · Prototype · General guidance only — not a substitute for medical advice</footer>
  `;
}
render();
</script>
</body>
</html>

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f91993fe-57af-4bc2-9762-0f0b78fa89c4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
