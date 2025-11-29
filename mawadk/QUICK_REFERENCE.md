# Quick Reference - مرجع سريع

## 🎚️ Slider - السلايدر

```jsx
import { Slider } from "@/components/ui/slider";

const [value, setValue] = useState([50]);
<Slider value={value} onValueChange={setValue} max={100} step={1} />
```

---

## 📝 Select - القائمة المنسدلة

```jsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="اختر..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="opt1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

---

## 🔔 Notifications - الإشعارات

```jsx
import notify from "@/lib/notifications";

// Success
notify.success("نجح!", "تم بنجاح");

// Error
notify.error("خطأ!", "حدث خطأ");

// Appointment
notify.appointment("د. أحمد", "3:00 PM", () => router.push("/appointments"));

// Booking
notify.bookingConfirmed("د. أحمد", "2024-01-15", "3:00 PM");

// Payment
notify.payment("250 QAR", "success");
```

---

## 🏙️ Cities - المدن

```jsx
import { qatarCities } from "@/data/cities";

<Select>
  <SelectTrigger><SelectValue placeholder="اختر المدينة..." /></SelectTrigger>
  <SelectContent>
    {qatarCities.map(city => (
      <SelectItem key={city.id} value={city.value}>{city.label}</SelectItem>
    ))}
  </SelectContent>
</Select>
```

---

## 🎨 Demo Page
Visit: `http://localhost:3000/admin/components-demo`

## 📚 Full Guide
See: `COMPONENTS_GUIDE.md`
