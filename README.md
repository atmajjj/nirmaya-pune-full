# Nirmaya - Groundwater Quality Monitoring & Analysis System

## 1. Abstract

Nirmaya is an intelligent groundwater quality monitoring and analysis platform that leverages advanced AI technologies to provide comprehensive water quality assessment for Maharashtra, India. The system integrates **Large Language Models (LLMs)**, **Retrieval-Augmented Generation (RAG)**, **Embeddings with Vector Databases**, and **Agentic RAG** to deliver real-time water quality insights, predictive analytics, and intelligent assistance through NIRA (Nirmaya Intelligent Research Assistant).

The platform enables multiple stakeholders—scientists, field technicians, policymakers, researchers, and administrators—to collaboratively monitor, analyze, and manage groundwater quality data. By combining traditional water quality indices (Heavy Metal Pollution Index, Metal Index, Water Quality Index) with AI-powered document retrieval and conversational intelligence, Nirmaya transforms complex scientific data into actionable insights for public health and environmental protection.

**Key AI Integration:**
- **LLM-Powered Chatbot**: NIRA AI assistant using Groq LLM for natural language understanding
- **RAG System**: Pinecone vector database for semantic document retrieval and context-aware responses
- **Embeddings**: Document chunking and embedding generation for efficient knowledge retrieval
- **Agentic RAG**: Multi-step reasoning with tool integration for complex query resolution
- **Model Context Protocol (MCP)**: Structured interaction between AI agents and external tools

## 2. Problem Statement

### What Problem Does Nirmaya Solve?
Groundwater contamination is a critical public health crisis in India, affecting millions of people who depend on groundwater for drinking and agriculture. Current water quality monitoring faces several challenges:

1. **Data Fragmentation**: Water quality data is scattered across multiple sources, formats, and departments
2. **Complex Analysis**: Scientists need to manually calculate multiple indices (HPI, MI, WQI) for each sample
3. **Knowledge Inaccessibility**: Technical research documents and standards are difficult to access and understand
4. **Slow Decision-Making**: Policymakers lack real-time insights to respond to contamination events
5. **Limited Collaboration**: No unified platform for stakeholders to share data and insights
6. **Manual Documentation**: Field technicians spend excessive time on paperwork instead of sample collection

### Why This Problem is Important
- **Public Health Impact**: Over 60% of India's population relies on groundwater for drinking water
- **Agricultural Dependency**: Groundwater irrigation supports 65% of India's agricultural output
- **Contamination Crisis**: Heavy metal contamination (arsenic, fluoride, lead) affects 1.96 million habitations
- **Economic Cost**: Waterborne diseases cost India billions annually in healthcare and lost productivity
- **Environmental Sustainability**: Unsustainable groundwater extraction and pollution threaten future water security

Nirmaya addresses these challenges by providing a unified, AI-powered platform that automates data collection, analysis, and insight generation while making scientific knowledge accessible to all stakeholders.

## 3. Objectives

1. **Automate Water Quality Analysis**: Calculate HPI, MI, and WQI indices automatically from uploaded CSV/Excel data
2. **Enable Real-Time Monitoring**: Provide dashboards for tracking water quality across locations and time periods
3. **Democratize Scientific Knowledge**: Make research documents and standards accessible through AI-powered search and Q&A
4. **Facilitate Multi-Stakeholder Collaboration**: Support 5 distinct user roles with tailored interfaces and permissions
5. **Generate Actionable Insights**: Transform complex data into visualizations and recommendations for decision-makers
6. **Streamline Data Collection**: Enable field technicians to upload datasets directly from mobile/tablet devices
7. **Support Policy Decisions**: Provide policymakers with trend analysis and risk assessments for informed governance
8. **Accelerate Research**: Give researchers access to comprehensive datasets and analytical tools
9. **Integrate AI Assistance**: Deploy NIRA chatbot for 24/7 intelligent query resolution using RAG and LLM technology
10. **Ensure Data Quality**: Implement validation, error handling, and processing pipelines for reliable analysis

## 4. Technologies & Concepts Used

### Large Language Models (LLMs)
- **Groq LLM**: Ultra-fast inference for conversational AI responses
- **Context-Aware Generation**: Multi-turn conversations with session memory
- **Prompt Engineering**: Optimized prompts for water quality domain expertise

### Embeddings and Vector Databases
- **Pinecone Vector Database**: Scalable vector storage for document embeddings
- **Semantic Search**: Similarity-based retrieval of relevant documents
- **Document Chunking**: Intelligent text segmentation for optimal embedding generation
- **Hybrid Search**: Combining keyword and semantic search for enhanced accuracy

### Retrieval-Augmented Generation (RAG)
- **Document Upload Pipeline**: PDF/DOC/TXT processing and embedding generation
- **Context Retrieval**: Fetching relevant document chunks before LLM response generation
- **Source Attribution**: Tracking and displaying source documents for transparency
- **Dynamic Knowledge Base**: Real-time updates as new documents are uploaded

### Agentic RAG (AI Agents + Tools + Multi-Step Reasoning)
- **Tool Integration**: Agents can access external APIs and calculation engines
- **Multi-Step Planning**: Breaking complex queries into subtasks
- **Self-Correction**: Iterative refinement based on intermediate results
- **Chain-of-Thought**: Transparent reasoning process for complex analyses

### Model Context Protocol (MCP)
- **Structured Communication**: Standardized API contracts between agents and tools
- **Tool Discovery**: Dynamic registration of available functions and capabilities
- **Context Management**: Efficient token usage through context windowing
- **Error Recovery**: Graceful handling of tool failures and retries

### Frontend Technologies
- **React 18**: Modern UI with hooks and concurrent rendering
- **TypeScript**: Type-safe development with comprehensive type definitions
- **Vite**: Lightning-fast build tool and dev server
- **TanStack Query**: Efficient server state management and caching
- **Tailwind CSS**: Utility-first styling with custom design system
- **Shadcn/UI + Radix UI**: Accessible component library
- **React Router**: Client-side routing with protected routes
- **Leaflet**: Interactive geospatial mapping
- **Recharts**: Data visualization and analytics dashboards

### Backend Integration
- **RESTful APIs**: JSON-based communication with backend services
- **JWT Authentication**: Secure token-based auth with role-based access control
- **Multipart File Upload**: CSV/Excel/PDF document upload support
- **WebSocket (Future)**: Real-time updates for collaborative features

## 5. System Architecture / Workflow

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                           │
│  (React + TypeScript + Tailwind - Role-Based Dashboards)        │
└────────────┬────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      FRONTEND SERVICES                           │
│  • Auth Service (JWT)  • User Management  • Data Upload         │
│  • Nirmaya Engine      • Chatbot Service  • GeoMap Service      │
└────────────┬────────────────────────────────────────────────────┘
             │ HTTP/REST API
             ▼
┌─────────────────────────────────────────────────────────────────┐
│                       BACKEND API LAYER                          │
│  • Authentication      • User CRUD        • File Processing      │
│  • HMPI Calculation    • RAG Pipeline     • Admin Controls       │
└────────────┬────────────────────────────────────────────────────┘
             │
      ┌──────┴──────┬──────────────┬─────────────────┐
      ▼             ▼              ▼                 ▼
┌──────────┐  ┌──────────┐  ┌─────────────┐  ┌──────────────┐
│PostgreSQL│  │ Pinecone │  │  Groq LLM   │  │ File Storage │
│ Database │  │  Vector  │  │   (RAG)     │  │  (Uploads)   │
└──────────┘  │    DB    │  └─────────────┘  └──────────────┘
              └──────────┘
```

### Data Flow: Water Quality Analysis

**Input → Processing → Output**

1. **Input**: Field Technician uploads CSV/Excel file with water quality parameters
2. **Validation**: Backend validates file format, column headers, and data types
3. **Data Extraction**: Parse rows, detect stations, locations, metals, and WQI parameters
4. **Calculation Engine**: 
   - Calculate HPI (Heavy Metal Pollution Index) for each station
   - Calculate MI (Metal Index) with classification
   - Calculate WQI (Water Quality Index) with suitability rating
5. **Storage**: Store calculations in PostgreSQL with metadata (location, year, uploader)
6. **Output**: Return comprehensive results with:
   - Index values and classifications
   - Processing statistics (success/failure counts)
   - Analyzed parameters list
   - Warnings and errors
7. **Visualization**: Frontend displays results in tables, maps, and charts

### AI Workflow: RAG Chatbot (NIRA)

**Input → Processing → Output**

1. **Document Upload (Admin)**:
   ```
   PDF/DOC Upload → Text Extraction → Chunking → Embedding Generation → Pinecone Storage
   ```

2. **User Query**:
   ```
   User Message → Session Management → Query Embedding → Vector Similarity Search
                                                              ↓
   LLM Response ← Prompt Construction ← Context Retrieval ← Top K Chunks
   ```

3. **Agentic RAG (Complex Queries)**:
   ```
   User: "Compare arsenic levels in Pune vs Nagpur districts"
        ↓
   Agent Planning: Decompose into subtasks
        ↓
   Tool 1: Fetch Pune data (API call)
        ↓
   Tool 2: Fetch Nagpur data (API call)
        ↓
   Tool 3: Statistical comparison (calculation)
        ↓
   LLM: Synthesize findings with retrieved context
        ↓
   Response with sources and data citations
   ```

### Where AI Components are Used

- **LLMs**: NIRA chatbot responses, document summarization, query understanding
- **Embeddings**: Document indexing, semantic search, similarity matching
- **RAG**: Context-aware responses grounded in uploaded scientific documents
- **Agents**: Multi-step problem solving, tool orchestration, complex analytics
- **MCP**: Standardized communication between agents, tools, and data services

## 6. Implementation Details

### Tools and Frameworks

**Frontend Stack:**
- **React 18.3.1** with TypeScript 5.8
- **Vite 5.4** for build tooling
- **React Router 6.30** for navigation
- **TanStack Query 5.83** for server state
- **Shadcn/UI** + **Radix UI** for components
- **Tailwind CSS 3.4** for styling
- **Leaflet 1.9** + React Leaflet for maps
- **Recharts 2.15** for charts
- **React Hook Form 7.61** + **Zod 3.25** for form validation

**Backend Integration:**
- RESTful API client with Axios/Fetch
- JWT-based authentication
- Role-based access control (RBAC)
- Multipart/form-data for file uploads

**Development Tools:**
- ESLint for code quality
- TypeScript for type safety
- Git for version control
- VS Code as primary IDE

### Key Modules

1. **Authentication Module** (`src/services/api/authService.ts`)
   - Login, logout, token refresh
   - JWT token management
   - Protected route wrapper

2. **User Management** (`src/services/api/userService.ts`)
   - CRUD operations for users
   - Role assignment
   - Pagination and filtering

3. **Data Source Management** (`src/services/api/dataSourceService.ts`)
   - CSV/Excel upload
   - File validation
   - Processing status polling
   - Dataset listing and filtering

4. **Nirmaya Engine** (`src/services/api/nirmayaEngineService.ts`)
   - CSV preview with column detection
   - HPI/MI/WQI calculation
   - Results retrieval with filters
   - Location-based analysis

5. **Chatbot Service** (`src/services/api/chatbotService.ts`)
   - Chat session management
   - Message sending/receiving
   - Document upload for RAG
   - Document status tracking

6. **Admin Controls**
   - User invitation system
   - Researcher application approval
   - Report management
   - System statistics

### Logic Behind Retrieval and Generation

**RAG Pipeline:**

1. **Document Ingestion**:
   - Admin uploads PDF/DOC/TXT files
   - Backend extracts text using parsers
   - Text is split into chunks (512-1024 tokens) with overlap
   - Each chunk is embedded using sentence-transformers
   - Embeddings stored in Pinecone with metadata

2. **Query Processing**:
   - User sends message to NIRA
   - Message is embedded using same model
   - Pinecone performs cosine similarity search
   - Top 5 most relevant chunks retrieved

3. **Context Construction**:
   - Retrieved chunks formatted with metadata
   - System prompt defines NIRA's role and behavior
   - Conversation history added (last N messages)
   - User query appended

4. **LLM Generation**:
   - Full context sent to Groq LLM
   - Temperature: 0.7 for balanced creativity/accuracy
   - Max tokens: 1000 for comprehensive responses
   - Stream response for better UX

5. **Source Attribution**:
   - Track which documents contributed to response
   - Display source names and relevance scores
   - Enable users to verify information

## 7. Features

### Core Features

1. **Multi-Role Dashboard System**
   - Admin: User management, chatbot training, system overview
   - Scientist: Data analysis, index calculation, research tools
   - Field Technician: Dataset upload, validation, field reports
   - Researcher: Data access, analysis tools, collaboration
   - Policymaker: Insights, trends, risk assessments, reports

2. **Automated Water Quality Analysis**
   - Calculate HPI (Heavy Metal Pollution Index)
   - Calculate MI (Metal Index) with classification
   - Calculate WQI (Water Quality Index) with suitability ratings
   - Support for 20+ heavy metals and water parameters
   - Batch processing for multiple stations

3. **NIRA AI Chatbot (RAG-Powered)**
   - Natural language queries about water quality
   - Document-grounded responses with sources
   - Multi-turn conversations with context memory
   - Admin document upload for knowledge base
   - Real-time document processing status

4. **Interactive Geospatial Mapping**
   - Leaflet-based map visualization
   - Location markers for sampling stations
   - Color-coded indicators by water quality
   - Click-through to detailed analysis

5. **Data Upload & Validation**
   - CSV/Excel file upload
   - Automatic column detection
   - Data validation and error reporting
   - Processing status tracking
   - Retry mechanism for failed uploads

6. **Advanced Filtering & Search**
   - Filter by state, district, location, year
   - Search by filename or description
   - Status-based filtering
   - Pagination for large datasets

7. **Comprehensive Statistics**
   - Total uploads, processed, failed counts
   - District-wise analysis
   - Temporal trends
   - Contamination hotspots

8. **Role-Based Access Control**
   - JWT authentication
   - Protected routes by role
   - Granular permissions
   - Admin invitation system

9. **User Management**
   - Create, update, delete users
   - Role assignment
   - Status tracking (active/inactive)
   - Email-based invitations

10. **Responsive Design**
    - Mobile-optimized interfaces
    - Touch-friendly controls
    - Adaptive layouts
    - Progressive web app capabilities

### AI-Specific Features

- **RAG Document Management**: Upload, process, track scientific documents
- **Semantic Search**: Find relevant information across entire knowledge base
- **Context-Aware Responses**: NIRA understands conversation history
- **Source Transparency**: See which documents informed each response
- **Multi-Step Reasoning**: Handle complex queries requiring multiple tools
- **Error Recovery**: Graceful handling of LLM failures

## 8. Usage Instructions

### Prerequisites
- Node.js 18+ and npm/yarn/bun
- Modern web browser (Chrome, Firefox, Edge)
- Backend API running (default: `http://localhost:8000`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd nirmaya-frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

3. **Configure environment**:
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:8000/api
   ```

4. **Start development server**:
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Access the application**:
   Open browser to `http://localhost:5173`

### How to Use

#### 1. Login
- Navigate to login page
- Enter email and password
- System redirects to role-specific dashboard

#### 2. Upload Water Quality Data (Field Technician)
- Go to "Upload Dataset" page
- Click "Browse" or drag-and-drop CSV/Excel file
- Optionally add description
- Click "Upload"
- Monitor processing status
- View success/failure notification

#### 3. Calculate Water Quality Indices (Scientist)
- Go to "Nirmaya Engine" page
- Upload CSV file or select existing data source
- Click "Preview Data" to validate
- Click "Calculate Indices"
- View HPI, MI, WQI results in table
- Apply filters by location, year, status
- Export results or view on map

#### 4. Chat with NIRA (All Users)
- Click chatbot icon in bottom-right corner
- Type question: "What are safe arsenic levels?"
- NIRA responds with sourced information
- Continue conversation with follow-up questions
- View source documents for verification

#### 5. Train NIRA (Admin)
- Go to "NIRA Chatbot" admin page
- Click "Upload Document"
- Select PDF/DOC/TXT files (max 20MB)
- Monitor processing status (pending → processing → completed)
- Completed documents are searchable by NIRA

#### 6. Manage Users (Admin)
- Go to "User Management"
- View list of all users with roles
- Click "Add User" to send invitation
- Edit user roles or deactivate accounts
- Track user activity and permissions

### Build for Production

```bash
npm run build
# Output in dist/ directory

# Preview production build
npm run preview
```

## 9. Capstone / Mini Build Description

### What We Built

For the hands-on mini project, we developed a **complete RAG-powered chatbot system** integrated into the Nirmaya platform. This demonstrates all compulsory AI topics:

### Components Implemented

1. **LLM Integration**:
   - Integrated Groq LLM API for natural language generation
   - Implemented streaming responses for real-time chat experience
   - Configured temperature and max tokens for optimal responses

2. **Embeddings & Vector Database**:
   - Set up Pinecone vector database instance
   - Implemented document chunking algorithm (512 tokens, 50 overlap)
   - Created embedding pipeline using sentence-transformers
   - Indexed documents with metadata (filename, upload date, user)

3. **RAG System**:
   - Built document upload interface for admins
   - Implemented text extraction from PDF/DOC/TXT
   - Created retrieval mechanism: embed query → search Pinecone → get top 5 chunks
   - Constructed prompts with retrieved context + user query
   - Added source attribution to responses

4. **Agentic RAG**:
   - Implemented multi-turn conversation with session memory
   - Added tool integration for water quality data lookup
   - Created agent planning layer for complex queries
   - Example: "Compare arsenic in Pune vs Nagpur" triggers:
     1. Tool call: Fetch Pune data
     2. Tool call: Fetch Nagpur data
     3. LLM: Synthesize comparison with retrieved research

5. **Model Context Protocol (MCP)**:
   - Defined tool schemas (function name, parameters, descriptions)
   - Implemented tool discovery and registration
   - Created standardized error handling
   - Built context window management (last 10 messages)

### How It Demonstrates Compulsory Topics

- **LLMs**: Groq API generates human-like responses to water quality questions
- **Embeddings**: Documents converted to vectors for semantic search
- **Vector DB**: Pinecone stores and retrieves relevant chunks efficiently
- **RAG**: Responses grounded in uploaded scientific documents, not just LLM knowledge
- **Agentic RAG**: NIRA can call external tools (data APIs) and plan multi-step solutions
- **MCP**: Standardized interface between NIRA agent and Nirmaya data services

### Demo Flow

1. Admin uploads "WHO Water Quality Guidelines.pdf"
2. System chunks document into 47 pieces, embeds, stores in Pinecone
3. User asks: "What is the safe limit for arsenic in drinking water?"
4. System embeds query, retrieves relevant chunk from WHO document
5. Groq LLM generates: "According to WHO guidelines, the safe limit is 10 μg/L"
6. Response includes source: "WHO Water Quality Guidelines.pdf, relevance: 0.94"
7. User follows up: "How does this compare to Pune's average?"
8. Agent calls tool: `getDistrictStats(district='Pune', parameter='arsenic')`
9. LLM synthesizes: "Pune's average is 15 μg/L, exceeding WHO limit by 50%"

## 10. Future Scope

### Planned Enhancements

1. **Real-Time Monitoring**:
   - IoT sensor integration for live water quality data
   - WebSocket connections for instant dashboard updates
   - Automated alerts when contamination detected

2. **Advanced AI Features**:
   - Predictive modeling using ML (forecast contamination trends)
   - Computer vision for analyzing water sample images
   - Voice interface for hands-free field data entry
   - Multi-language support (Hindi, Marathi)

3. **Enhanced Agentic Capabilities**:
   - Auto-generate remediation plans based on contamination levels
   - Proactive insights: "District X at risk of arsenic increase"
   - Multi-agent collaboration (data agent + analysis agent + reporting agent)

4. **Data Expansion**:
   - Integration with more data sources (CGWB, IMD, pollution control boards)
   - Historical data import (10+ years of records)
   - Satellite imagery overlay on maps

5. **Collaboration Tools**:
   - In-app messaging between stakeholders
   - Shared annotations on maps and reports
   - Collaborative research projects

6. **Mobile Applications**:
   - Native iOS/Android apps for field technicians
   - Offline data collection with sync
   - GPS-based station marking

7. **Advanced Analytics**:
   - Machine learning for anomaly detection
   - Correlation analysis (identify pollution sources)
   - Time-series forecasting
   - Risk scoring for habitations

8. **Regulatory Integration**:
   - Automated compliance reporting to BIS/WHO standards
   - API access for government departments
   - Public data portal (anonymized)

9. **Blockchain Integration**:
   - Immutable audit trail for data provenance
   - Decentralized data sharing across states

10. **Edge Computing**:
    - On-device ML models for instant field analysis
    - Reduced latency for remote locations

## 11. Contributors

### Team Members

| Name | Role | Responsibilities |
|------|------|------------------|
| [Team Lead Name] | Project Lead | System architecture, backend API design, AI integration |
| [Frontend Dev Name] | Frontend Developer | React components, UI/UX, dashboard implementation |
| [AI Engineer Name] | AI/ML Engineer | RAG pipeline, LLM integration, embeddings, Pinecone setup |
| [Backend Dev Name] | Backend Developer | REST APIs, database design, authentication, file processing |
| [Data Scientist Name] | Data Scientist | Water quality algorithms (HPI/MI/WQI), data validation |
| [Designer Name] | UI/UX Designer | Interface design, user flows, accessibility |

### Individual Contributions

- **[Name]**: RAG chatbot development, Pinecone integration, document processing
- **[Name]**: Frontend dashboard implementation, React component library
- **[Name]**: Nirmaya calculation engine, data validation logic
- **[Name]**: Authentication system, user management, RBAC
- **[Name]**: Geospatial mapping, data visualization, charts
- **[Name]**: UI design, branding, responsive layouts

## 12. References

### Research Papers

1. **Heavy Metal Pollution Index**: Prasad, B. & Bose, J.M. (2001). "Evaluation of Heavy Metal Pollution Index for Surface and Spring Water"
2. **Metal Index**: Tamasi, G. & Cini, R. (2004). "Heavy metals in drinking waters from Mount Amiata"
3. **Water Quality Index**: Brown, R.M., McClelland, N.I., et al. (1970). "A Water Quality Index - Do We Dare?"
4. **RAG Systems**: Lewis, P., et al. (2020). "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks"

### Standards & Guidelines

- **WHO Guidelines**: World Health Organization - Guidelines for Drinking-water Quality (4th Edition)
- **BIS Standards**: IS 10500:2012 - Drinking Water Specification
- **CPCB Norms**: Central Pollution Control Board - Water Quality Standards
- **EPA Standards**: US Environmental Protection Agency - National Primary Drinking Water Regulations

### Frameworks & Tools Documentation

- **React**: https://react.dev/
- **TypeScript**: https://www.typescriptlang.org/
- **Vite**: https://vitejs.dev/
- **TanStack Query**: https://tanstack.com/query/
- **Tailwind CSS**: https://tailwindcss.com/
- **Shadcn/UI**: https://ui.shadcn.com/
- **Leaflet**: https://leafletjs.com/
- **Recharts**: https://recharts.org/
- **Pinecone**: https://www.pinecone.io/
- **Groq**: https://groq.com/
- **Langchain** (if used): https://langchain.com/

### APIs Used

- **Groq LLM API**: Fast inference for chat responses
- **Pinecone Vector Database API**: Semantic search and embeddings storage
- **Custom Backend APIs**: User management, data processing, calculations
- **Leaflet Tile Servers**: OpenStreetMap for map rendering

### Datasets

- **Ground Water Quality Data**: Central Ground Water Board (CGWB)
- **District Boundaries**: Survey of India
- **WHO Water Quality Database**: Global standards and guidelines

---

**Project Repository**: [GitHub URL]  
**Live Demo**: [Demo URL]  
**API Documentation**: [API Docs URL]  
**Contact**: [Team Email]

---

**Last Updated**: January 30, 2026  
**Version**: 1.0.0  
**License**: [Your License]
