export const hospitals = [
  {
    id: 1,
    name: "Sunrise Medical Center",
    name_ar: "مركز الشروق الطبي",
    type: "hospital",
    email: "info@sunrise.qa",
    phone: "+974 4444 1111",
    address: "Al Sadd Street, Doha",
    address_ar: "شارع السد، الدوحة",
    location: {
      lat: 25.286106,
      lng: 51.531040
    },
    description: "Leading multi-specialty hospital with state-of-the-art facilities",
    description_ar: "مستشفى متعدد التخصصات رائد مع مرافق حديثة",
    images: ["/images/hospitals/sunrise-1.jpg", "/images/hospitals/sunrise-2.jpg"],
    working_hours: {
      saturday: { open: "08:00", close: "22:00" },
      sunday: { open: "08:00", close: "22:00" },
      monday: { open: "08:00", close: "22:00" },
      tuesday: { open: "08:00", close: "22:00" },
      wednesday: { open: "08:00", close: "22:00" },
      thursday: { open: "08:00", close: "22:00" },
      friday: { open: "14:00", close: "22:00" }
    },
    rating: 4.8,
    reviews_count: 342,
    doctors_count: 45,
    status: "active",
    created_at: "2023-06-15T10:00:00Z",
    updated_at: "2024-11-20T14:30:00Z"
  },
  {
    id: 2,
    name: "Al Noor Clinic",
    name_ar: "عيادة النور",
    type: "clinic",
    email: "contact@alnoor.qa",
    phone: "+974 4444 2222",
    address: "C Ring Road, Al Wakrah",
    address_ar: "طريق الدائري الثالث، الوكرة",
    location: {
      lat: 25.171428,
      lng: 51.596851
    },
    description: "Specialized dental and dermatology clinic",
    description_ar: "عيادة متخصصة في طب الأسنان والأمراض الجلدية",
    images: ["/images/hospitals/alnoor-1.jpg"],
    working_hours: {
      saturday: { open: "09:00", close: "21:00" },
      sunday: { open: "09:00", close: "21:00" },
      monday: { open: "09:00", close: "21:00" },
      tuesday: { open: "09:00", close: "21:00" },
      wednesday: { open: "09:00", close: "21:00" },
      thursday: { open: "09:00", close: "21:00" },
      friday: { open: "closed", close: "closed" }
    },
    rating: 4.5,
    reviews_count: 128,
    doctors_count: 12,
    status: "active",
    created_at: "2023-08-22T09:00:00Z",
    updated_at: "2024-11-18T11:15:00Z"
  },
  {
    id: 3,
    name: "Gulf Medical Complex",
    name_ar: "مجمع الخليج الطبي",
    type: "hospital",
    email: "info@gulfmedical.qa",
    phone: "+974 4444 3333",
    address: "Salwa Road, Doha",
    address_ar: "شارع سلوى، الدوحة",
    location: {
      lat: 25.252855,
      lng: 51.454268
    },
    description: "Comprehensive healthcare services with 24/7 emergency",
    description_ar: "خدمات رعاية صحية شاملة مع طوارئ على مدار الساعة",
    images: ["/images/hospitals/gulf-1.jpg", "/images/hospitals/gulf-2.jpg"],
    working_hours: {
      saturday: { open: "00:00", close: "23:59" },
      sunday: { open: "00:00", close: "23:59" },
      monday: { open: "00:00", close: "23:59" },
      tuesday: { open: "00:00", close: "23:59" },
      wednesday: { open: "00:00", close: "23:59" },
      thursday: { open: "00:00", close: "23:59" },
      friday: { open: "00:00", close: "23:59" }
    },
    rating: 4.7,
    reviews_count: 521,
    doctors_count: 68,
    status: "active",
    created_at: "2023-05-10T08:00:00Z",
    updated_at: "2024-11-22T16:00:00Z"
  },
  {
    id: 4,
    name: "City Care Polyclinic",
    name_ar: "عيادة العناية بالمدينة",
    type: "clinic",
    email: "hello@citycare.qa",
    phone: "+974 4444 4444",
    address: "Al Rayyan, Doha",
    address_ar: "الريان، الدوحة",
    location: {
      lat: 25.291370,
      lng: 51.439468
    },
    description: "Family medicine and pediatrics specialist",
    description_ar: "متخصص في طب الأسرة وطب الأطفال",
    images: ["/images/hospitals/citycare-1.jpg"],
    working_hours: {
      saturday: { open: "08:00", close: "20:00" },
      sunday: { open: "08:00", close: "20:00" },
      monday: { open: "08:00", close: "20:00" },
      tuesday: { open: "08:00", close: "20:00" },
      wednesday: { open: "08:00", close: "20:00" },
      thursday: { open: "08:00", close: "20:00" },
      friday: { open: "closed", close: "closed" }
    },
    rating: 4.3,
    reviews_count: 94,
    doctors_count: 8,
    status: "pending",
    created_at: "2024-10-05T12:00:00Z",
    updated_at: "2024-11-15T09:30:00Z"
  }
];
