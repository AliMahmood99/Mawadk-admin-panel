/**
 * Qatar Cities Data
 * بيانات المدن في قطر
 */

export const qatarCities = [
  {
    id: 1,
    value: "doha",
    label: "الدوحة - Doha",
    label_en: "Doha",
    label_ar: "الدوحة",
    region: "Doha",
    population: 956457,
    isCapital: true,
  },
  {
    id: 2,
    value: "al-rayyan",
    label: "الريان - Al Rayyan",
    label_en: "Al Rayyan",
    label_ar: "الريان",
    region: "Al Rayyan",
    population: 605712,
    isCapital: false,
  },
  {
    id: 3,
    value: "al-wakrah",
    label: "الوكرة - Al Wakrah",
    label_en: "Al Wakrah",
    label_ar: "الوكرة",
    region: "Al Wakrah",
    population: 299035,
    isCapital: false,
  },
  {
    id: 4,
    value: "al-khor",
    label: "الخور - Al Khor",
    label_en: "Al Khor",
    label_ar: "الخور",
    region: "Al Khor",
    population: 193983,
    isCapital: false,
  },
  {
    id: 5,
    value: "lusail",
    label: "لوسيل - Lusail",
    label_en: "Lusail",
    label_ar: "لوسيل",
    region: "Lusail",
    population: 450000,
    isCapital: false,
  },
  {
    id: 6,
    value: "umm-salal",
    label: "أم صلال - Umm Salal",
    label_en: "Umm Salal",
    label_ar: "أم صلال",
    region: "Umm Salal",
    population: 90835,
    isCapital: false,
  },
  {
    id: 7,
    value: "al-shamal",
    label: "الشمال - Al Shamal",
    label_en: "Al Shamal",
    label_ar: "الشمال",
    region: "Al Shamal",
    population: 8794,
    isCapital: false,
  },
  {
    id: 8,
    value: "mesaieed",
    label: "مسيعيد - Mesaieed",
    label_en: "Mesaieed",
    label_ar: "مسيعيد",
    region: "Mesaieed",
    population: 35760,
    isCapital: false,
  },
  {
    id: 9,
    value: "dukhan",
    label: "دخان - Dukhan",
    label_en: "Dukhan",
    label_ar: "دخان",
    region: "Dukhan",
    population: 7250,
    isCapital: false,
  },
  {
    id: 10,
    value: "al-ruwais",
    label: "الرويس - Al Ruwais",
    label_en: "Al Ruwais",
    label_ar: "الرويس",
    region: "Al Ruwais",
    population: 3334,
    isCapital: false,
  },
];

/**
 * Get city by value
 */
export const getCityByValue = (value) => {
  return qatarCities.find((city) => city.value === value);
};

/**
 * Get city by ID
 */
export const getCityById = (id) => {
  return qatarCities.find((city) => city.id === id);
};

/**
 * Get cities for select dropdown
 */
export const getCitiesForSelect = () => {
  return qatarCities.map((city) => ({
    value: city.value,
    label: city.label,
  }));
};

/**
 * Get major cities (population > 100,000)
 */
export const getMajorCities = () => {
  return qatarCities.filter((city) => city.population > 100000);
};

export default qatarCities;
