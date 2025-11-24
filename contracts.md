# AyaPos - API Contracts & Backend Implementation Plan

## 1. API Endpoints

### Contact Submissions
**POST /api/contact**
- **Purpose**: Handle contact form submissions
- **Request Body**:
```json
{
  "businessName": "string",
  "businessType": "string",
  "phone": "string",
  "email": "string",
  "city": "string",
  "message": "string (optional)",
  "language": "string (fr/en/de)"
}
```
- **Response**:
```json
{
  "success": true,
  "message": "Contact request received",
  "id": "contact_id"
}
```

**GET /api/contacts**
- **Purpose**: Get all contact submissions (admin)
- **Response**: Array of contact objects

**GET /api/contacts/:id**
- **Purpose**: Get specific contact submission
- **Response**: Single contact object

---

## 2. Mock Data to Replace

### mockData.js - Frontend
Currently using static data from `/app/frontend/src/data/mockData.js`:

- **posPackages**: POS system packages with pricing
- **ayapayTerminals**: Payment terminal information
- **testimonials**: Customer testimonials
- **businessTypes**: Business type options
- **features**: Feature cards

**Backend Integration Plan**:
- Store POS packages in MongoDB `pos_packages` collection
- Store terminals in `payment_terminals` collection
- Store testimonials in `testimonials` collection
- Keep business types as static enum

---

## 3. Database Models

### Contact Model
```python
{
  "_id": ObjectId,
  "businessName": str,
  "businessType": str,
  "phone": str,
  "email": str,
  "city": str,
  "message": str,
  "language": str,
  "status": "new" | "contacted" | "converted" | "archived",
  "createdAt": datetime,
  "updatedAt": datetime
}
```

### POS Package Model (Optional - if admin wants to manage)
```python
{
  "_id": ObjectId,
  "id": str,
  "name": str,
  "tagline": str,
  "description": str,
  "price": float,
  "features": [str],
  "recommended": bool,
  "discount": int (optional)
}
```

### Payment Terminal Model (Optional)
```python
{
  "_id": ObjectId,
  "id": str,
  "name": str,
  "tagline": str,
  "description": str,
  "features": [str]
}
```

### Testimonial Model (Optional)
```python
{
  "_id": ObjectId,
  "name": str,
  "business": str,
  "city": str,
  "rating": int,
  "text": str,
  "approved": bool,
  "createdAt": datetime
}
```

---

## 4. Frontend Changes Needed

### Contact Page (`/app/frontend/src/pages/Contact.jsx`)
**Current**: Mock submission with setTimeout
**Change**: 
```javascript
const response = await axios.post(`${API}/contact`, formData);
```

### Home Page (`/app/frontend/src/pages/Home.jsx`)
**Current**: Static data from mockData.js
**Change** (if needed):
```javascript
const [testimonials, setTestimonials] = useState([]);
useEffect(() => {
  fetchTestimonials();
}, []);
```

---

## 5. Implementation Priority

### Phase 1: Essential Backend (CURRENT)
1. ✅ Contact form endpoint
2. ✅ Store submissions in MongoDB
3. ✅ Email notification (optional)

### Phase 2: Admin Features (FUTURE)
1. Authentication
2. Admin dashboard
3. Contact management
4. Content management (packages, terminals, testimonials)

### Phase 3: Advanced Features (FUTURE)
1. Analytics
2. Multi-language content management
3. Lead scoring
4. CRM integration

---

## 6. Environment Variables

### Backend (.env)
```
MONGO_URL=<already configured>
DB_NAME=ayapos
EMAIL_HOST=smtp.gmail.com (optional)
EMAIL_PORT=587
EMAIL_USER=<email> (optional)
EMAIL_PASS=<password> (optional)
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=<already configured>
```

---

## 7. Error Handling

### Frontend
- Form validation before submission
- Display user-friendly error messages
- Loading states during API calls

### Backend
- Input validation using Pydantic
- Proper HTTP status codes
- Detailed error messages for debugging

---

## 8. Testing Checklist

### Backend
- [ ] Contact submission endpoint works
- [ ] Data is stored in MongoDB
- [ ] Email notification sent (if configured)
- [ ] Error handling works correctly

### Frontend
- [ ] Form submission successful
- [ ] Success message displayed
- [ ] Form resets after submission
- [ ] Error handling works
- [ ] Loading states display correctly

### Integration
- [ ] Frontend connects to backend
- [ ] Data flows correctly
- [ ] Multi-language support works
- [ ] All pages load correctly

---

## Notes

- All mock data is currently working perfectly in frontend
- Backend integration is optional for MVP
- Can add backend progressively without breaking frontend
- Multi-language support already implemented with i18next
- All forms are validated on frontend
