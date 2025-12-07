# 🔧 Chatbot Debugging Tools - Quick Start

## What I've Added

I've created comprehensive debugging tools to help identify why the chatbot isn't responding:

### 1. **Debug Page** 
**Access:** `http://localhost:5173/chatbot-debug`

**Features:**
- ✅ Automated diagnostic tests
- ✅ Environment configuration check
- ✅ Backend connectivity test
- ✅ API endpoint verification
- ✅ CORS configuration check
- ✅ Detailed error reporting
- ✅ Live chatbot widget for testing

### 2. **Enhanced Logging**
Added detailed console logs to track the entire request/response flow:

**Files Updated:**
- `src/services/api/chatbotService.ts` - Service layer logging
- `src/components/NIRAChatbot.tsx` - Component layer logging

**Log Markers:**
- 🔵 = Request sent
- ✅ = Success
- ❌ = Error  
- 🚀 = Component action
- 📩 = Response received
- ⚠️ = Warning
- 🏁 = Complete

### 3. **New Components**
- `src/components/ChatbotDebugger.tsx` - Diagnostic testing component
- `src/pages/ChatbotDebug.tsx` - Complete debug page
- `CHATBOT_DEBUGGING.md` - Comprehensive troubleshooting guide

---

## 🚀 How to Debug (3 Steps)

### Step 1: Run the Debug Page

```bash
# Start dev server (if not running)
npm run dev

# Open in browser
http://localhost:5173/chatbot-debug
```

**What to do:**
1. Click "Run Diagnostic Tests"
2. Wait for all tests to complete
3. Look for red ❌ marks - these are your issues

### Step 2: Check Browser Console

1. Press **F12** to open DevTools
2. Go to **Console** tab
3. Try sending a message in the chatbot
4. Look for emoji markers in the logs

**Example of WORKING chatbot:**
```
🚀 NIRAChatbot: Sending message
🔵 Chatbot Service: Sending message
📩 NIRAChatbot: API Response received
✅ NIRAChatbot: Processing successful response
🏁 NIRAChatbot: Message handling complete
```

**Example of BROKEN chatbot:**
```
🚀 NIRAChatbot: Sending message
🔵 Chatbot Service: Sending message
❌ Chatbot Service: Request failed
  error: "Failed to fetch"
```

### Step 3: Fix the Issue

Based on the test results, fix the most common issues:

**❌ "Cannot connect to backend"**
→ Start your backend server: `cd backend && npm run dev`

**❌ "404 Not Found" on /chatbot/chat**
→ Implement backend API following `chatbot-api.md`

**❌ "401 Unauthorized"**
→ Login first at `/`

**❌ "CORS error"**
→ Add CORS middleware to backend

---

## 📊 What Each Test Checks

| Test | Checks | What Success Means |
|------|--------|-------------------|
| **Environment** | `.env` configuration | API URL is set correctly |
| **Backend Health** | Server connectivity | Backend is running and accessible |
| **Chatbot API** | Endpoint implementation | `/chatbot/chat` endpoint exists and works |
| **CORS** | Cross-origin headers | Backend allows frontend requests |

---

## 🎯 Most Likely Issues (In Order)

### 1. Backend Not Running (90% of cases)
**Check:** `http://localhost:8000/health` in browser  
**Fix:** Start backend server

### 2. API Not Implemented (8% of cases)
**Check:** Test results show 404  
**Fix:** Follow `chatbot-api.md` to implement endpoints

### 3. Authentication Required (1% of cases)
**Check:** Test results show 401  
**Fix:** Login first

### 4. Configuration Error (1% of cases)
**Check:** Test results show wrong URL  
**Fix:** Update `.env` file

---

## 📁 Files to Check

If debugging manually, check these files:

```
Frontend:
├── .env                                    # API URL configuration
├── src/services/api/chatbotService.ts     # API calls (now with logs)
├── src/components/NIRAChatbot.tsx         # Main widget (now with logs)
└── src/services/api/apiClient.ts          # HTTP client

Backend:
├── .env                                    # Backend config
├── src/features/chatbot/apis/chat.ts      # Chat endpoint
└── src/features/chatbot/index.ts          # Router registration
```

---

## 🔍 Reading Test Results

### ✅ All Green = Working!
```
✅ Environment - API URL: http://localhost:8000/api
✅ Backend Health - Backend server is running
✅ Chatbot API - Chatbot endpoint is working
✅ CORS - CORS is configured
```
**Action:** Chatbot should work! Try sending a message.

### ❌ Backend Health Failed
```
✅ Environment - API URL: http://localhost:8000/api
❌ Backend Health - Cannot connect to backend server
⏸️ Chatbot API - (skipped)
⏸️ CORS - (skipped)
```
**Action:** Start your backend server!

### ❌ Chatbot API Failed (404)
```
✅ Environment - API URL: http://localhost:8000/api
✅ Backend Health - Backend server is running
❌ Chatbot API - Chatbot endpoint not found
✅ CORS - CORS is configured
```
**Action:** Implement the chatbot API endpoints!

---

## 💡 Quick Commands

```bash
# Test backend health
curl http://localhost:8000/health

# Test chatbot endpoint
curl -X POST http://localhost:8000/api/chatbot/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'

# Check .env
cat .env | grep VITE_API_URL

# Restart frontend
npm run dev
```

---

## 📞 Next Steps

1. **Run the debug page** → `http://localhost:5173/chatbot-debug`
2. **Look at test results** → Find what's red ❌
3. **Check console logs** → Press F12, send a message
4. **Fix the issue** → Use the troubleshooting guide
5. **Test again** → Should see green ✅

---

## 📚 Documentation

- **CHATBOT_DEBUGGING.md** - Complete troubleshooting guide
- **CHATBOT_INTEGRATION_STATUS.md** - Integration overview
- **chatbot-api.md** - Backend implementation guide

---

**🎯 Start here:** `http://localhost:5173/chatbot-debug`

Good luck! The debug tools will tell you exactly what's wrong. 🚀
