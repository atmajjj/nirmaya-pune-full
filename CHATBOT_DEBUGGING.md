# 🐛 Chatbot Not Responding - Debugging Guide

## Problem
The chatbot widget opens but doesn't respond when you send messages.

## Most Common Causes

### 1. ❌ Backend Server Not Running
**The #1 most common issue!**

**Check:** Is your backend server running on `http://localhost:8000`?

**Solution:**
```bash
# In a separate terminal, start your backend
cd path/to/backend
npm run dev
# OR
python manage.py runserver 8000
# OR
node server.js
```

**Test:** Open `http://localhost:8000/health` in your browser. You should see a response.

---

### 2. ❌ Chatbot API Not Implemented Yet
**The backend is running but doesn't have chatbot endpoints**

**Check:** Open `http://localhost:8000/api/chatbot/chat` - do you get a 404 error?

**Solution:** Follow the `chatbot-api.md` guide to implement the backend chatbot endpoints:
- POST `/api/chatbot/chat` - Main chat endpoint
- GET `/api/chatbot/sessions` - Get user sessions
- POST `/api/chatbot/documents` - Upload documents (admin)
- etc.

**Reference:** See `src/pages/chatbot-api.md` for complete implementation guide.

---

### 3. ❌ Authentication Required
**You need to be logged in to use the chatbot**

**Check:** Are you logged in? Check browser console for "401 Unauthorized" errors.

**Solution:**
1. Go to the login page
2. Sign in with your credentials
3. Try the chatbot again

---

### 4. ❌ Wrong API URL
**Frontend is pointing to the wrong backend URL**

**Check:** Open `.env` file and verify:
```env
VITE_API_URL=http://localhost:8000/api
```

**Solution:**
1. Update `.env` with correct backend URL
2. Restart frontend dev server: `npm run dev`

---

## 🔍 How to Debug

### Step 1: Use the Debug Page

I've created a comprehensive debugging tool for you:

```bash
# Start the dev server
npm run dev

# Then navigate to:
# http://localhost:5173 (or your dev server port)
# Manually add "/chatbot-debug" to test
```

**What it does:**
- ✅ Checks environment configuration
- ✅ Tests backend server connectivity
- ✅ Tests chatbot API endpoint
- ✅ Checks CORS configuration
- ✅ Shows detailed error messages

### Step 2: Check Browser Console

1. Open DevTools (Press F12)
2. Go to Console tab
3. Send a message in the chatbot
4. Look for log messages with these emoji markers:

```
🔵 - Request being sent
✅ - Success
❌ - Error
🚀 - Component action
📩 - Response received
⚠️ - Warning
```

**Example of what you should see:**
```
🔵 Chatbot Service: Sending message
  endpoint: "/chatbot/chat"
  request: { message: "Hello", sessionId: undefined }
  
📩 NIRAChatbot: API Response received
  fullResponse: { success: true, data: { ... } }
  
✅ NIRAChatbot: Processing successful response
  sessionId: 123
  messageLength: 245
```

### Step 3: Check Network Tab

1. Open DevTools (F12)
2. Go to Network tab
3. Send a message in the chatbot
4. Look for a request to `/chatbot/chat`

**What to check:**
- **Status Code:** Should be 200 (OK)
  - 404 = Endpoint not implemented
  - 401 = Not authenticated
  - 500 = Backend error
- **Response Preview:** Should show JSON with `success: true`
- **Request Payload:** Should have your message

---

## 🛠️ Quick Fixes

### Fix 1: Backend Not Running
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

### Fix 2: Wrong Environment Variable
```bash
# Edit .env file
echo "VITE_API_URL=http://localhost:8000/api" > .env

# Restart frontend
npm run dev
```

### Fix 3: CORS Error
Add to your backend (Express.js example):
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Fix 4: Not Authenticated
1. Go to `/login`
2. Sign in
3. Try chatbot again

---

## 📋 Diagnostic Checklist

Run through this checklist:

- [ ] Backend server is running (`http://localhost:8000/health` works)
- [ ] `.env` has correct `VITE_API_URL`
- [ ] Frontend dev server is running
- [ ] I'm logged in (check localStorage for `access_token`)
- [ ] Chatbot endpoint exists (`POST /api/chatbot/chat`)
- [ ] No CORS errors in browser console
- [ ] No network errors in DevTools

---

## 🎯 Expected Behavior

When working correctly:

1. **User:** Opens chatbot widget
2. **User:** Types "Hello" and sends
3. **Frontend:** Shows typing indicator
4. **Frontend → Backend:** POST `/api/chatbot/chat` with `{ message: "Hello" }`
5. **Backend:** Processes with RAG pipeline (if implemented) or returns response
6. **Backend → Frontend:** Returns `{ success: true, data: { sessionId: 123, message: "Hi! How can I help?" } }`
7. **Frontend:** Displays bot response

---

## 🧪 Manual API Test

Test the endpoint directly with curl:

```bash
# Without authentication
curl -X POST http://localhost:8000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# With authentication (replace YOUR_TOKEN)
curl -X POST http://localhost:8000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"message": "Hello"}'
```

**Expected response:**
```json
{
  "success": true,
  "data": {
    "sessionId": 123,
    "message": "Based on the documents...",
    "sources": []
  }
}
```

---

## 📞 Still Not Working?

### Check These Files:

1. **Service Layer:** `src/services/api/chatbotService.ts`
   - Should have enhanced logging now
   
2. **API Client:** `src/services/api/apiClient.ts`
   - Handles authentication and requests

3. **Component:** `src/components/NIRAChatbot.tsx`
   - Main chatbot widget

4. **Backend:** Check your backend logs for errors

### Get More Info:

Run the debugger and copy the test results:
1. Go to the debug page
2. Click "Run Diagnostic Tests"
3. Copy the error messages
4. Check what failed

---

## 💡 Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot connect to backend" | Backend not running | Start backend server |
| "404 Not Found" | Endpoint not implemented | Implement chatbot API |
| "401 Unauthorized" | Not logged in | Login first |
| "CORS error" | CORS not configured | Add CORS middleware |
| "Invalid response format" | Backend returns wrong structure | Check response matches expected format |
| "Network error" | Wrong API URL or backend down | Check .env and backend status |

---

## ✅ Success Indicators

You'll know it's working when:
- ✅ Debug tests all show green checkmarks
- ✅ Console shows: `✅ NIRAChatbot: Processing successful response`
- ✅ Bot responds with actual text
- ✅ No red error messages in console
- ✅ Network tab shows 200 status for `/chatbot/chat`

---

## 🚀 Next Steps After Fixing

Once the basic connection works:

1. **Test with Documents:** Upload PDFs as admin
2. **Test RAG Responses:** Ask questions about uploaded content
3. **Test Sessions:** Check if conversation history persists
4. **Test Error Handling:** Try invalid inputs
5. **Remove Debug Logs:** Clean up console.log statements for production

---

## 📝 Files Added for Debugging

I've added these helper files:

1. **`src/components/ChatbotDebugger.tsx`**
   - Comprehensive testing component
   - Runs automated checks
   
2. **`src/pages/ChatbotDebug.tsx`**
   - Debug page with instructions
   - Access at `/chatbot-debug`

3. **Enhanced Logging in:**
   - `src/services/api/chatbotService.ts`
   - `src/components/NIRAChatbot.tsx`

---

## 🎓 Understanding the Flow

```
┌─────────────┐
│   User      │ Types message
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  NIRAChatbot.tsx    │ 🚀 handleSendMessage()
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│ chatbotService.ts   │ 🔵 sendMessage()
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   apiClient.ts      │ Makes HTTP POST
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  Backend Server     │ Processes request
│  :8000/api/chatbot  │
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│   Response          │ { success: true, data: {...} }
└──────┬──────────────┘
       │
       ▼
┌─────────────────────┐
│  NIRAChatbot.tsx    │ 📩 Displays bot message
└─────────────────────┘
```

---

**Good luck debugging! 🎯**
