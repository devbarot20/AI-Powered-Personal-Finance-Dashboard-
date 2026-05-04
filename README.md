# AI-Powered Personal Finance Dashboard

A premium, full-stack personal finance application designed with a focus on aesthetics, data visualization, and seamless user experience.

## 🚀 Technology Stack

### Frontend
- **React.js**: Core UI framework for building a dynamic and responsive interface.
- **Vite**: Ultra-fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for custom, premium styling (Dark Mode & Luxury aesthetics).
- **Recharts**: Powerful charting library for account balance history and investment distribution.
- **Lucide React**: Clean and modern iconography.
- **Axios**: Promise-based HTTP client for connecting to the backend API.
- **Framer Motion / CSS Animations**: For smooth transitions and micro-animations.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Minimalist web framework for building the RESTful API.
- **CORS**: Middleware for cross-origin resource sharing.
- **Body-parser**: Middleware for parsing incoming request bodies.

---

## ✨ Key Features

### 1. Financial Overview (Dashboard)
- **Account Balance History**: Interactive line chart showing balance trends over time.
- **Live Balances**: Real-time display of Total Balance, Main Account, and Savings.
- **Recent Transactions**: A detailed table showing the latest financial activities with status indicators (Pending/Completed).
- **Investment Portfolio**: A donut-style gauge chart visualizing asset distribution (VOO, VTI, ICLN, etc.).

### 2. Expense Management
- **Dynamic List**: View all recorded expenses in a clean, categorized table.
- **Real-time CRUD**: 
  - **Add Expense**: Quick-add form for description, amount, category, and date.
  - **Delete Expense**: Instant removal of records with UI feedback.
- **Category Filtering**: Filter expenses by categories like Food, Transport, Housing, etc.
- **Aggregated Stats**: Automatic calculation of Total Expenses, Transaction Count, and Average Spend.

### 3. Contact & Support
- **Interactive Contact Form**: Users can send messages to the support team.
- **API Integration**: Form submissions are processed by the backend.
- **Instant Feedback**: Visual confirmation upon successful message delivery.

### 4. User Experience
- **Responsive Layout**: Optimized for Mobile, Tablet, and Desktop viewports.
- **Sidebar Navigation**: Smooth navigation between Overview, Budgets, Expenses, Investments, Reports, and Settings.
- **Premium Aesthetics**: Glassmorphism effects, curated color palettes, and modern typography.

---

## 🛠️ Backend API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard` | Returns user info, balances, chart data, and investments. |
| `GET` | `/api/expenses` | Returns the complete list of expenses. |
| `POST` | `/api/expenses` | Adds a new expense record. |
| `DELETE` | `/api/expenses/:id` | Deletes a specific expense record by ID. |
| `POST` | `/api/contact` | Processes contact form submissions. |

---

## 📦 Getting Started

### Prerequisites
- Node.js installed on your machine.

### Setup Instructions

1. **Clone and Install Backend**:
   ```bash
   cd backend
   npm install
   ```

2. **Clone and Install Frontend**:
   ```bash
   cd frontend
   npm install
   ```

3. **Running the Application**:
   - **Start Backend Server**:
     ```bash
     cd backend
     npm start
     ```
   - **Start Frontend Dev Server**:
     ```bash
     cd frontend
     npm run dev
     ```

The backend runs on `http://localhost:5001` and the frontend runs on `http://localhost:5173` (or your Vite default port).
