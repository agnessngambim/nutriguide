export type Condition = {
  id: string;
  name: string;
  cat: "NCD" | "Communicable" | "Other";
  split: string;
  goal: string;
  eat: string[];
  limit: string[];
  sample: { breakfast: string; lunch: string; dinner: string; snack: string };
  safety: string;
  gallery?: string[];
};

const muscleBuildingGallery = Array.from({ length: 63 }, (_, index) => {
  const imageNumber = index + 1;
  const extension = imageNumber === 3 ? "png" : "jpeg";
  return `/muscle-building/image${imageNumber}.${extension}`;
});

export const CONDITIONS: Condition[] = [
  {
    id: "diabetes",
    name: "Type 2 Diabetes",
    cat: "NCD",
    split: "55%",
    goal: "Keep blood sugar steady through the day by choosing slower-digesting carbohydrates, spacing meals evenly, and pairing starch with protein or vegetables rather than eating it alone.",
    eat: [
      "Small, regular portions of nshima made with mixed roller/whole grain meal",
      "Beans, groundnuts, kapenta and other proteins at most meals",
      "Rape, pumpkin leaves, cabbage and other leafy vegetables",
      "Whole fruit in moderation (avoid fruit juice)",
      "Plenty of water instead of sugary drinks",
    ],
    limit: [
      "Sugary tea, soft drinks and juice",
      "Large single portions of nshima with no protein or vegetables",
      "Fried foods and added sugar in cooking",
      "Refined snacks like biscuits and sweets",
    ],
    sample: {
      breakfast: "Plain porridge with groundnut powder, boiled egg",
      lunch: "Moderate nshima, beans, rape",
      dinner: "Fish, sweet potato, mixed vegetables",
      snack: "Small handful of groundnuts or a piece of fruit",
    },
    safety:
      "If taking insulin or diabetes tablets, meal timing matters for avoiding low blood sugar — this plan should be reviewed against your medication schedule. Seek medical attention for very high or very low blood sugar symptoms.",
  },
  {
    id: "hypertension",
    name: "Hypertension",
    cat: "NCD",
    split: "50%",
    goal: "Reduce salt intake and increase potassium-rich foods to help manage blood pressure. WHO recommends adults keep sodium intake under 2,000mg a day (about one teaspoon of salt), unless a clinician advises otherwise.",
    eat: [
      "Fresh vegetables — rape, pumpkin leaves, tomatoes, okra",
      "Fruit such as bananas and oranges",
      "Beans and unsalted groundnuts",
      "Fish and skinless chicken prepared with herbs instead of salt",
      "Plain nshima, roller meal, sweet potato",
    ],
    limit: [
      "Added table salt and salty stock cubes/seasoning",
      "Processed and salted foods (chips, salted dried fish in excess, processed meats)",
      "Pickled or heavily preserved foods",
    ],
    sample: {
      breakfast: "Porridge with fruit, no added salt",
      lunch: "Nshima, grilled fish, steamed rape (herbs instead of salt)",
      dinner: "Bean stew with vegetables, sweet potato",
      snack: "Banana or orange",
    },
    safety:
      "If you are on blood pressure medication, do not stop or adjust it based on diet alone. Seek urgent medical care for severe headache, chest pain, or very high readings.",
  },
  {
    id: "heart",
    name: "Heart Disease / High Cholesterol",
    cat: "NCD",
    split: "52%",
    goal: "Reduce saturated fat and reintroduce more fibre and plant-based protein to support heart health, while keeping meals satisfying and locally accessible.",
    eat: [
      "Beans, groundnuts and other legumes",
      "Fish (especially small fish like kapenta) more often than red meat",
      "Vegetables and whole fruit",
      "Small amounts of unsaturated oil (e.g. sunflower) for cooking",
    ],
    limit: [
      "Deep-fried foods and excess cooking oil",
      "Fatty cuts of red meat and processed meats",
      "Full-cream dairy in large amounts",
      "Added salt and sugar",
    ],
    sample: {
      breakfast: "Oats or porridge with fruit",
      lunch: "Nshima, beans, steamed cabbage",
      dinner: "Grilled fish, vegetables, small portion of sweet potato",
      snack: "Groundnuts (unsalted, small handful)",
    },
    safety:
      "This guidance supports — but does not replace — any cholesterol or heart medication prescribed by a doctor. Chest pain, breathlessness or swelling needs urgent medical attention.",
  },
  {
    id: "ckd",
    name: "Chronic Kidney Disease",
    cat: "NCD",
    split: "38%",
    goal: "Kidney-friendly eating is highly individual — it depends on your stage of kidney disease, blood test results and whether you're on dialysis. This section gives general orientation only.",
    eat: [
      "Foods generally lower in potassium and phosphorus (this varies by stage — get personalised guidance)",
      "Controlled, moderate protein portions as advised by your care team",
      "Plenty of appropriately guided fluid — again, individualized",
    ],
    limit: [
      "Self-restricting entire food groups without professional advice",
      "High-salt processed foods",
      "Salt substitutes containing potassium, unless cleared by your clinician",
    ],
    sample: {
      breakfast: "To be individualized with a professional",
      lunch: "To be individualized with a professional",
      dinner: "To be individualized with a professional",
      snack: "To be individualized with a professional",
    },
    safety:
      "IMPORTANT: Kidney disease nutrition should not be self-managed from a general guide. Potassium, phosphorus, protein and fluid needs change by stage and by lab results. Please book a professional consultation before making any specific changes.",
  },
  {
    id: "gout",
    name: "Gout / High Uric Acid",
    cat: "NCD",
    split: "48%",
    goal: "Reduce foods high in purines, which raise uric acid, and stay well hydrated to help the body clear it.",
    eat: [
      "Plenty of water throughout the day",
      "Vegetables, whole fruit (cherries and berries are often mentioned favourably)",
      "Low-fat dairy where available",
      "Whole grains and beans in moderate amounts",
    ],
    limit: [
      "Organ meats (liver, kidney)",
      "Red meat and shellfish in large amounts",
      "Beer and other alcohol",
      "Sugary drinks, especially those with high-fructose sweeteners",
    ],
    sample: {
      breakfast: "Porridge with fruit",
      lunch: "Nshima, vegetables, small portion of chicken",
      dinner: "Bean stew, steamed vegetables",
      snack: "Fruit, plenty of water",
    },
    safety:
      "A sudden, very painful, hot or swollen joint needs medical attention — this can be an acute gout flare that may need treatment beyond diet.",
  },
  {
    id: "gastritis",
    name: "Gastritis / Peptic Ulcer Symptoms",
    cat: "NCD",
    split: "45%",
    goal: "Reduce foods and habits that irritate the stomach lining, and eat smaller, more frequent meals rather than large ones.",
    eat: [
      "Smaller, more frequent meals",
      "Soft-cooked vegetables",
      "Plain porridge, rice, nshima",
      "Non-acidic fruit like banana",
    ],
    limit: [
      "Very spicy or heavily peppered food",
      "Excess coffee, strong tea and alcohol",
      "Citrus and very acidic foods if they trigger symptoms",
      "Eating very large meals or lying down right after eating",
    ],
    sample: {
      breakfast: "Plain porridge, banana",
      lunch: "Nshima, well-cooked vegetables, mild chicken stew",
      dinner: "Rice, soft vegetables, mild fish",
      snack: "Banana",
    },
    safety:
      "Persistent pain, black stools, or vomiting blood are medical emergencies — seek care immediately, this is beyond dietary management.",
  },
  {
    id: "obesity",
    name: "Weight Management",
    cat: "NCD",
    split: "50%",
    goal: "Create a modest, sustainable energy deficit through portion control and food choice, without cutting out entire food groups or crash dieting.",
    eat: [
      "Vegetables at most meals to add volume without many calories",
      "Lean protein — fish, chicken, beans",
      "Moderate portions of starch (nshima, sweet potato) rather than very large ones",
      "Water instead of sugary drinks",
    ],
    limit: [
      "Deep-fried foods and excess cooking oil",
      "Sugary drinks and snacks",
      "Very large starch portions with little vegetable or protein",
    ],
    sample: {
      breakfast: "Boiled egg, small porridge portion, fruit",
      lunch: "Moderate nshima, grilled fish, large portion of vegetables",
      dinner: "Bean stew, salad or steamed greens",
      snack: "Fruit or a small handful of groundnuts",
    },
    safety:
      "Rapid or extreme weight loss approaches are not recommended without medical supervision, especially if other health conditions are present.",
  },
  {
    id: "hiv",
    name: "HIV",
    cat: "Communicable",
    split: "58%",
    goal: "Support the body's energy and immune needs, particularly maintaining a healthy weight and eating enough protein and micronutrients, alongside consistent antiretroviral treatment.",
    eat: [
      "Protein at most meals — beans, groundnuts, fish, eggs, meat when available",
      "A variety of colourful vegetables and fruit for vitamins and minerals",
      "Enough energy-dense food (nshima, sweet potato) to maintain healthy weight",
      "Clean, safely prepared water and food",
    ],
    limit: [
      "Skipping meals, which can affect medication tolerance and energy",
      "Unsafe or undercooked food, which carries higher risk when immunity is affected",
    ],
    sample: {
      breakfast: "Porridge with groundnut powder, boiled egg",
      lunch: "Nshima, beans, vegetables",
      dinner: "Fish or meat, vegetables, sweet potato",
      snack: "Fruit, groundnuts",
    },
    safety:
      "Nutrition supports treatment — it does not replace ART. Take medication as prescribed and follow up with your clinic regularly. Unexplained rapid weight loss should be discussed with your care provider.",
  },
  {
    id: "tb",
    name: "Tuberculosis (TB)",
    cat: "Communicable",
    split: "56%",
    goal: "Support weight and strength during treatment, since TB significantly increases energy and protein needs while often reducing appetite.",
    eat: [
      "Protein-rich foods at every meal — beans, groundnuts, eggs, fish, meat",
      "Energy-dense foods to help rebuild weight — nshima, sweet potato, avocado where available",
      "Frequent small meals if appetite is low, rather than three large ones",
      "Fruit and vegetables for micronutrients",
    ],
    limit: [
      "Skipping meals due to low appetite — small frequent meals work better",
      "Alcohol, which can interact with TB medication and stress the liver",
    ],
    sample: {
      breakfast: "Porridge with groundnut powder and milk if tolerated",
      lunch: "Nshima, beans, vegetables, extra protein portion",
      dinner: "Fish or meat, vegetables, sweet potato",
      snack: "Groundnuts, fruit, small extra meal if appetite allows",
    },
    safety:
      "Nutrition supports recovery but does not replace TB treatment — completing the full course of medication is essential. Ongoing weight loss or worsening symptoms should be reported to your clinic promptly.",
  },
  {
    id: "diarrhoea",
    name: "Acute Diarrhoea",
    cat: "Communicable",
    split: "40%",
    goal: "Prevent dehydration and keep eating through the illness — prolonged fasting is not recommended for most cases.",
    eat: [
      "Oral rehydration solution or a home sugar-salt-water solution as advised by a health worker",
      "Plain, easily digested foods — porridge, rice, ripe banana, well-cooked vegetables",
      "Continue breastfeeding for infants",
      "Small, frequent meals as appetite allows",
    ],
    limit: [
      "Very fatty, sugary or spicy foods until symptoms settle",
      "Unsafe water — always use clean or boiled water",
    ],
    sample: {
      breakfast: "Plain porridge, ripe banana",
      lunch: "Rice, well-cooked vegetables, oral rehydration solution",
      dinner: "Soft nshima, well-cooked vegetables",
      snack: "Oral rehydration solution, banana",
    },
    safety:
      "Seek urgent medical care for: blood in stool, signs of dehydration (very little urine, sunken eyes, lethargy), high fever, or diarrhoea lasting more than a couple of days, especially in young children.",
  },
  {
    id: "liver",
    name: "Hepatitis / Liver Disease",
    cat: "Communicable",
    split: "46%",
    goal: "Support liver function with regular, balanced meals while avoiding substances that add extra strain on the liver.",
    eat: [
      "Regular balanced meals with moderate protein — beans, fish, eggs",
      "Vegetables and fruit for vitamins and antioxidants",
      "Whole grains and moderate starch portions",
      "Adequate clean water",
    ],
    limit: [
      "Alcohol — avoid completely",
      "Very fatty and fried foods",
      "Unnecessary or unprescribed medications and supplements, which the liver has to process",
    ],
    sample: {
      breakfast: "Porridge, fruit",
      lunch: "Nshima, beans, steamed vegetables",
      dinner: "Fish, vegetables, small sweet potato portion",
      snack: "Fruit",
    },
    safety:
      "Yellowing of the eyes/skin, severe abdominal pain, or confusion require urgent medical attention. Follow your clinician's guidance closely, especially around medication.",
  },
  {
    id: "anaemia",
    name: "Anaemia / Iron Deficiency",
    cat: "Other",
    split: "53%",
    goal: "Increase iron intake and pair it with vitamin C to improve absorption, while addressing any underlying cause with a health worker.",
    eat: [
      "Iron-rich foods — beans, groundnuts, dark leafy greens (rape, pumpkin leaves), kapenta, liver in moderation",
      "Vitamin C-rich fruit alongside iron-rich meals (e.g. orange, guava) to boost absorption",
      "Eggs and fish",
    ],
    limit: [
      "Tea or coffee immediately with meals, which can reduce iron absorption — have these between meals instead",
    ],
    sample: {
      breakfast: "Porridge with groundnut powder, orange",
      lunch: "Nshima, beans, rape, tomato relish",
      dinner: "Kapenta or liver (occasionally), vegetables",
      snack: "Guava or orange",
    },
    safety:
      "Persistent fatigue, dizziness, pale skin/gums, or breathlessness should be checked by a health worker — anaemia can have several underlying causes that need proper diagnosis.",
  },
  {
    id: "cancer",
    name: "Cancer Nutrition Support",
    cat: "Other",
    split: "44%",
    goal: "Support strength, maintain weight, and improve tolerance to treatment through regular, balanced meals and hydration that match individual treatment needs.",
    eat: [
      "Small frequent meals with protein-rich foods such as eggs, beans, fish, groundnuts and chicken when possible",
      "Soft, easy-to-eat foods when appetite is low — porridge, soups, rice, mashed vegetables",
      "Fruit and vegetables for vitamins, minerals and fibre",
      "Plenty of clean water and oral fluids between meals",
    ],
    limit: [
      "Very heavy meals if appetite is poor",
      "Highly processed, sugary or greasy foods that can worsen nausea or reduce intake",
      "Skipping meals when appetite is low",
    ],
    sample: {
      breakfast: "Porridge, fruit, boiled egg",
      lunch: "Rice or nshima, beans, soft vegetables",
      dinner: "Fish or chicken, soup, steamed vegetables",
      snack: "Fruit, yogurt or a light snack if tolerated",
    },
    safety:
      "Cancer nutrition should follow the individual's treatment plan and clinical advice, especially if nausea, mouth sores, taste changes or weight loss are present.",
  },
  {
    id: "sports-nutrition",
    name: "Sports Nutrition",
    cat: "Other",
    split: "51%",
    goal: "Fuel training and recovery with enough energy, protein, fluids and timing around activity to support performance and adaptation.",
    eat: [
      "Carbohydrates before and after training, such as porridge, rice, nshima, bananas or sweet potato",
      "Protein in the meal after activity to support recovery — eggs, beans, chicken, fish, groundnuts",
      "Water and oral rehydration fluids for longer sessions or hot weather",
      "Regular meals rather than long gaps between eating",
    ],
    limit: [
      "Training on an empty stomach for long sessions",
      "Too much sugary drinks without enough real food",
      "Skipping water intake during exercise",
    ],
    sample: {
      breakfast: "Porridge with fruit and eggs",
      lunch: "Rice, chicken, vegetables",
      dinner: "Nshima, beans, greens",
      snack: "Banana, water, groundnuts",
    },
    safety:
      "If you are training hard, avoid extreme dehydration and seek professional guidance if you have dizziness, fainting, or ongoing fatigue.",
  },
  {
    id: "muscle-building",
    name: "Muscle Building",
    cat: "Other",
    split: "49%",
    goal: "Build or maintain muscle with enough total food intake, especially protein, plus consistent strength training and recovery.",
    eat: [
      "Protein-rich foods at each main meal — eggs, fish, chicken, beans, groundnuts, milk where available",
      "Adequate starch and energy to support training — nshima, rice, sweet potato, bread",
      "Fruit and vegetables to support recovery and micronutrients",
    ],
    limit: [
      "Very low-calorie diets that make recovery harder",
      "Skipping meals and relying only on snacks",
      "Excessive alcohol that can reduce recovery and muscle repair",
    ],
    sample: {
      breakfast: "Porridge with milk or groundnut powder, eggs",
      lunch: "Nshima, chicken, vegetables",
      dinner: "Beans, rice, greens",
      snack: "Fruit and milk or groundnuts",
    },
    gallery: muscleBuildingGallery,
    safety:
      "Muscle gain is best supported by consistent training and adequate sleep; sudden severe pain, dizziness or fainting should be evaluated medically.",
  },
  {
    id: "hydration-strategies",
    name: "Hydration Strategies",
    cat: "Other",
    split: "43%",
    goal: "Stay well hydrated throughout the day, especially during heat, physical activity, illness or when sweating heavily.",
    eat: [
      "Plain water throughout the day",
      "Oral rehydration solution when fluid loss is high or you have diarrhoea",
      "Fruit and soups to help fluid intake",
    ],
    limit: [
      "Waiting until you feel very thirsty before drinking",
      "Only relying on sugary drinks when water is needed",
    ],
    sample: {
      breakfast: "Water with breakfast, fruit",
      lunch: "Water with meals, soup if available",
      dinner: "Water with dinner, fruit",
      snack: "Water or oral rehydration solution as needed",
    },
    safety:
      "Very little urine, dizziness, confusion or severe dehydration need urgent medical attention.",
  },
  {
    id: "maternal-nutrition",
    name: "Maternal Nutrition",
    cat: "Other",
    split: "57%",
    goal: "Support mother and baby with balanced meals, sufficient protein, iron, folate and hydration across pregnancy and after birth.",
    eat: [
      "Balanced meals with protein, vegetables, fruit and whole grains",
      "Iron-rich foods such as beans, dark leafy greens, eggs, kapenta and meat where possible",
      "Plenty of clean water and regular meals",
    ],
    limit: [
      "Skipping meals or going too long without food",
      "Very heavy alcohol use and unnecessary supplements without clinician advice",
    ],
    sample: {
      breakfast: "Porridge with fruit and eggs",
      lunch: "Nshima, beans, vegetables",
      dinner: "Fish or chicken, greens, sweet potato",
      snack: "Fruit, milk or groundnuts",
    },
    safety:
      "Pregnancy and postpartum nutrition should be reviewed with a health worker, especially if there is vomiting, severe fatigue, swelling or bleeding.",
  },
  {
    id: "benign-prostatic-hyperplasia",
    name: "Benign Prostatic Hyperplasia",
    cat: "Other",
    split: "40%",
    goal: "Support urinary comfort and overall wellbeing with balanced meals, adequate hydration and healthy weight habits that reduce pressure on the body.",
    eat: [
      "Plenty of water throughout the day",
      "Balanced meals with vegetables, fruit, beans and lean protein",
      "Whole grains and moderate portions of starch",
    ],
    limit: [
      "Heavy evening fluid intake if nighttime urination is a problem",
      "Very high caffeine or alcohol loads that can worsen urinary symptoms",
    ],
    sample: {
      breakfast: "Porridge, fruit",
      lunch: "Nshima, beans, vegetables",
      dinner: "Fish, greens, sweet potato",
      snack: "Fruit and water",
    },
    safety:
      "Urinary symptoms like trouble starting urination, weak flow or frequent nighttime urination should be reviewed by a clinician to distinguish BPH from other causes.",
  },
  {
    id: "erectile-dysfunction",
    name: "Erectile Dysfunction",
    cat: "Other",
    split: "39%",
    goal: "Support vascular and metabolic health through balanced meals, regular activity, healthy weight and good blood sugar and blood pressure control.",
    eat: [
      "Leafy vegetables, fruit, beans and whole grains",
      "Lean proteins such as fish, chicken, eggs and groundnuts",
      "Regular meals with limited highly processed foods",
    ],
    limit: [
      "Smoking and excessive alcohol",
      "Very high-fat, very high-sugar diets that worsen metabolic health",
    ],
    sample: {
      breakfast: "Porridge, fruit",
      lunch: "Rice, beans, vegetables",
      dinner: "Fish, rice, greens",
      snack: "Fruit or groundnuts",
    },
    safety:
      "Erectile dysfunction can come from several medical causes; persistent symptoms should be assessed by a clinician.",
  },
  {
    id: "wound-healing-nutrition",
    name: "Wound Healing Nutrition",
    cat: "Other",
    split: "48%",
    goal: "Support tissue repair with enough protein, energy, fluids and micronutrients that help the body recover after injury or surgery.",
    eat: [
      "Protein-rich foods at each meal — beans, eggs, fish, chicken, milk where available",
      "Fruit and vegetables for vitamins and minerals",
      "Fluids throughout the day, especially after surgery or during fever",
    ],
    limit: [
      "Simple fasting or skipping meals during recovery",
      "Low-protein diets that slow healing",
    ],
    sample: {
      breakfast: "Porridge with egg",
      lunch: "Nshima, beans, vegetables",
      dinner: "Chicken or fish, rice, greens",
      snack: "Fruit and water",
    },
    safety:
      "Slow-healing wounds, infection or fever should be checked by a clinical professional promptly.",
  },
  {
    id: "cardiovascular-disease",
    name: "Cardiovascular Disease",
    cat: "NCD",
    split: "50%",
    goal: "Reduce strain on the heart and blood vessels by improving overall diet quality, lowering salt, supporting healthy weight and maintaining balanced meals.",
    eat: [
      "Beans, whole grains, vegetables and fruit",
      "Fish and lean protein more often than fatty processed meats",
      "Small, sensible portions of fats and oils",
    ],
    limit: [
      "Too much salt and processed food",
      "Deep-fried foods and excess saturated fat",
      "Smoking and heavy alcohol",
    ],
    sample: {
      breakfast: "Oats or porridge with fruit",
      lunch: "Nshima, beans, vegetables",
      dinner: "Fish or chicken, steamed vegetables",
      snack: "Fruit or unsalted groundnuts",
    },
    safety:
      "Cardiovascular symptoms such as chest pain, severe shortness of breath, fainting or swelling need urgent medical evaluation.",
  },
  {
    id: "deep-vein-thrombosis",
    name: "Deep Vein Thrombosis",
    cat: "Other",
    split: "35%",
    goal: "Support recovery and circulation with balanced meals, hydration and movement guidance that complement medical care for clotting risk.",
    eat: [
      "Well-balanced meals with vegetables, fruit and protein",
      "Plenty of fluids",
      "Moderate activity as advised by the care team",
    ],
    limit: [
      "Prolonged inactivity without medical guidance",
      "Heavy alcohol and smoking",
    ],
    sample: {
      breakfast: "Porridge with fruit",
      lunch: "Nshima, beans, greens",
      dinner: "Fish, rice, vegetables",
      snack: "Fruit and water",
    },
    safety:
      "DVT is a medical emergency if there is sudden swelling, intense pain, warmth or breathing difficulty — seek urgent care.",
  },
  {
    id: "sleep-and-nutrition",
    name: "Sleep and Nutrition",
    cat: "Other",
    split: "42%",
    goal: "Support sleep quality through stable meal timing, avoiding late heavy meals and reducing stimulants that can disrupt rest.",
    eat: [
      "Regular meals but lighter evening portions",
      "Sleep-friendly foods such as fruit, milk, porridge or whole grains where tolerated",
      "Water throughout the day",
    ],
    limit: [
      "Caffeine late in the day",
      "Very heavy, greasy or spicy meals close to bedtime",
    ],
    sample: {
      breakfast: "Porridge, fruit",
      lunch: "Nshima, beans, vegetables",
      dinner: "Light soup, rice, greens",
      snack: "Fruit or milk",
    },
    safety:
      "Persistent poor sleep, loud snoring, or daytime exhaustion should be reviewed by a clinician.",
  },
  {
    id: "aging-and-nutrition",
    name: "Aging and Nutrition",
    cat: "Other",
    split: "46%",
    goal: "Protect strength, maintain function and reduce frailty through enough protein, fluid, fibre and regular meals appropriate to age and activity.",
    eat: [
      "Protein-rich foods such as beans, eggs, fish, chicken and groundnuts",
      "Fruit, vegetables and whole grains for fibre and micronutrients",
      "Enough fluids to avoid dehydration",
    ],
    limit: [
      "Skipping meals",
      "Very low-calorie diets that reduce strength and resilience",
    ],
    sample: {
      breakfast: "Porridge, fruit",
      lunch: "Nshima, beans, greens",
      dinner: "Fish, vegetables, sweet potato",
      snack: "Fruit or yogurt",
    },
    safety:
      "Older adults with unintentional weight loss, weakness or swallowing difficulty should be assessed clinically.",
  },
  {
    id: "corporate-wellness-nutrition",
    name: "Corporate Wellness Nutrition",
    cat: "Other",
    split: "41%",
    goal: "Support workday energy, concentration and long-term wellbeing through practical meal habits, hydration and smarter snack choices.",
    eat: [
      "Balanced breakfast and lunch to keep energy stable",
      "Fruit, water and light, protein-rich snacks between work blocks",
      "Meals built around vegetables, beans, lean protein and whole grains",
    ],
    limit: [
      "Skipping breakfast and relying only on coffee",
      "Frequent sugary snacks and fizzy drinks",
    ],
    sample: {
      breakfast: "Porridge or eggs with fruit",
      lunch: "Rice or nshima, beans, vegetables",
      dinner: "Fish, greens, sweet potato",
      snack: "Fruit, water or groundnuts",
    },
    safety:
      "For people with existing health issues, any nutrition plan should be tailored to their medical history and work schedule.",
  },
  {
    id: "exercise-nutrition",
    name: "Exercise Nutrition",
    cat: "Other",
    split: "45%",
    goal: "Match energy intake and recovery needs to movement goals so exercise feels sustainable and performance stays supported.",
    eat: [
      "Carbohydrates around exercise sessions for energy",
      "Protein after exercise to support muscle recovery",
      "Water and fluids before, during and after activity when needed",
    ],
    limit: [
      "Exercising with very low food intake",
      "Skipping fluids in hot weather or long sessions",
    ],
    sample: {
      breakfast: "Porridge with fruit",
      lunch: "Rice or nshima, beans, vegetables",
      dinner: "Chicken or fish, vegetables",
      snack: "Banana or water",
    },
    safety:
      "Severe dizziness, chest pain or persistent breathlessness during exercise should be evaluated medically.",
  },
];

export const CAT_ORDER = ["NCD", "Communicable", "Other"] as const;
export const CAT_LABEL: Record<string, string> = {
  NCD: "Noncommunicable diseases",
  Communicable: "Communicable diseases",
  Other: "Other nutrition-related conditions",
};