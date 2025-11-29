# Mawadk Components Guide
## دليل استخدام المكونات في موادك

---

## 📋 Table of Contents

1. [Slider Component](#slider-component)
2. [Select Component](#select-component)
3. [Notifications System](#notifications-system)
4. [Qatar Cities Data](#qatar-cities-data)

---

## 🎚️ Slider Component

### Installation
```bash
npm install @radix-ui/react-slider
```

### Basic Usage
```jsx
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

function MyComponent() {
  const [value, setValue] = useState([50]);

  return (
    <Slider
      value={value}
      onValueChange={setValue}
      max={100}
      step={1}
    />
  );
}
```

### Props
- `value`: Array of numbers (e.g., `[50]`)
- `onValueChange`: Callback function when value changes
- `max`: Maximum value (default: 100)
- `min`: Minimum value (default: 0)
- `step`: Step increment (default: 1)
- `className`: Additional CSS classes

### Examples

#### Price Range Slider
```jsx
const [price, setPrice] = useState([250]);

<div>
  <label>Price Range: QAR {price[0]}</label>
  <Slider
    value={price}
    onValueChange={setPrice}
    max={500}
    step={10}
  />
</div>
```

#### Rating Slider
```jsx
const [rating, setRating] = useState([3]);

<Slider
  value={rating}
  onValueChange={setRating}
  max={5}
  step={0.5}
/>
```

---

## 📝 Select Component

### Installation
```bash
npm install @radix-ui/react-select
```

### Basic Usage
```jsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <Select value={value} onValueChange={setValue}>
      <SelectTrigger>
        <SelectValue placeholder="Select an option..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Qatar Cities Select
```jsx
import { qatarCities } from "@/data/cities";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function CitySelector() {
  const [city, setCity] = useState("");

  return (
    <Select value={city} onValueChange={setCity}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="اختر المدينة..." />
      </SelectTrigger>
      <SelectContent>
        {qatarCities.map((city) => (
          <SelectItem key={city.id} value={city.value}>
            {city.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

### Medical Specialties Select
```jsx
const specialties = [
  { value: "cardiology", label: "أمراض القلب - Cardiology" },
  { value: "neurology", label: "الأعصاب - Neurology" },
  { value: "orthopedics", label: "العظام - Orthopedics" },
  { value: "pediatrics", label: "طب الأطفال - Pediatrics" },
];

<Select>
  <SelectTrigger>
    <SelectValue placeholder="اختر التخصص..." />
  </SelectTrigger>
  <SelectContent>
    {specialties.map((spec) => (
      <SelectItem key={spec.value} value={spec.value}>
        {spec.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## 🔔 Notifications System

### Installation
```bash
npm install sonner
```

### Setup
Add the Toaster component to your root layout:

```jsx
// In your layout.jsx or _app.jsx
import { Toaster } from "@/components/ui/toast";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
```

### Basic Usage
```jsx
import { toast } from "sonner";

// Success
toast.success("تم الحفظ بنجاح!");

// Error
toast.error("حدث خطأ!");

// Warning
toast.warning("تحذير!");

// Info
toast.info("معلومة");
```

### With Description
```jsx
toast.success("تم الحفظ بنجاح!", {
  description: "تم حفظ التغييرات بنجاح",
  duration: 3000,
});
```

### With Action Button
```jsx
toast("موعد جديد!", {
  description: "لديك موعد مع د. أحمد",
  action: {
    label: "عرض",
    onClick: () => router.push("/appointments"),
  },
});
```

### Using the Helper Functions
```jsx
import notify from "@/lib/notifications";

// Success
notify.success("تم الحفظ!", "تم حفظ البيانات بنجاح");

// Error
notify.error("خطأ!", "فشل في حفظ البيانات");

// Appointment notification
notify.appointment("د. أحمد محمد", "3:00 PM", () => {
  router.push("/appointments/123");
});

// Booking confirmation
notify.bookingConfirmed("د. أحمد", "2024-01-15", "3:00 PM");

// Payment
notify.payment("250 QAR", "success");

// Profile updated
notify.profileUpdated();

// Review submitted
notify.reviewSubmitted();
```

### Promise Notifications
```jsx
import notify from "@/lib/notifications";

const saveData = async () => {
  const promise = fetch("/api/save", {
    method: "POST",
    body: JSON.stringify(data),
  });

  notify.promise(promise, {
    loading: "جاري الحفظ...",
    success: "تم الحفظ بنجاح!",
    error: "فشل في الحفظ!",
  });
};
```

---

## 🏙️ Qatar Cities Data

### Usage
```jsx
import { qatarCities, getCityByValue, getMajorCities } from "@/data/cities";

// Get all cities
const cities = qatarCities;

// Get city by value
const doha = getCityByValue("doha");
console.log(doha.label_ar); // "الدوحة"

// Get major cities (population > 100,000)
const majorCities = getMajorCities();

// Use in Select component
<Select>
  <SelectTrigger>
    <SelectValue placeholder="اختر المدينة..." />
  </SelectTrigger>
  <SelectContent>
    {qatarCities.map((city) => (
      <SelectItem key={city.id} value={city.value}>
        {city.label}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

### Available Cities
1. الدوحة - Doha (Capital)
2. الريان - Al Rayyan
3. الوكرة - Al Wakrah
4. الخور - Al Khor
5. لوسيل - Lusail
6. أم صلال - Umm Salal
7. الشمال - Al Shamal
8. مسيعيد - Mesaieed
9. دخان - Dukhan
10. الرويس - Al Ruwais

---

## 🎨 Demo Page

Visit `/admin/components-demo` to see all components in action with live examples.

---

## 📱 Responsive Design

All components are fully responsive and work on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (below 768px)

---

## 🎯 Best Practices

### Slider
- Always show the current value
- Provide min/max labels
- Use appropriate step values
- Add visual feedback on change

### Select
- Use descriptive placeholders
- Sort options logically
- Consider search for long lists
- Show selected value clearly

### Notifications
- Keep messages concise
- Use appropriate types (success/error/warning/info)
- Provide actionable buttons when needed
- Don't spam users with notifications
- Set appropriate duration (3-5 seconds)

---

## 🔧 Customization

### Theming
All components use Tailwind CSS and can be customized using the `className` prop:

```jsx
<Slider className="custom-slider" />
<Select className="custom-select" />
```

### Colors
Primary color is defined in `tailwind.config.ts`:
```js
colors: {
  primary: "#E91E63", // Pink
}
```

---

## 📞 Support

For issues or questions:
- Check the demo page: `/admin/components-demo`
- Review this guide
- Check Radix UI documentation

---

## 📝 License

These components are part of the Mawadk Medical Appointment System.
