# Data Table System

A modern, responsive, and feature-rich data table application built with **Next.js 16**, **React 19**, and **Tailwind CSS 4**. This system provides a comprehensive interface for managing user data with advanced filtering, sorting, and inline editing capabilities.

## ✨ Features

- **Advanced Data Table**

  - 🔍 **Global Search**: Instantly filter records across all fields.
  - 🏷️ **Faceted Filtering**: Filter by Status and Role.
  - ⇅ **Sorting**: Sort data by Name and Role columns.
  - 📄 **Pagination**: Efficiently navigate through large datasets.
  - ✅ **Row Selection**: Select individual rows or all rows for bulk actions.
  - 📂 **Row Expansion**: View detailed information (e.g., user bio) with smooth animations.

- **User Management**

  - ➕ **Create Users**: Add new users via a modal form.
  - ✏️ **Edit Users**: Update existing user details seamlessly.
  - 🗑️ **Delete Users**: Remove users with confirmation dialogs.
  - 📦 **Bulk Actions**: Delete multiple selected users at once.

- **Modern UI/UX**
  - 📱 **Responsive Design**: Optimized for various screen sizes with adaptive layouts.
  - ⚡ **Animations**: Smooth transitions using **Framer Motion**.
  - 🦴 **Loading Skeletons**: Polished loading states for better perceived performance.
  - 🌑 **Clean Aesthetics**: Minimalist design using Shadcn UI components.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Components**: [Shadcn UI](https://ui.shadcn.com/) (Radix UI primitives)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: Font Awesome & Lucide React

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (Latest LTS recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd data-table-system
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
data-table-system/
├── app/                  # Next.js App Router pages and layouts
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Main data table component and logic
├── components/
│   └── ui/               # Reusable UI components (Button, Input, Table, etc.)
├── public/               # Static assets
└── package.json          # Project dependencies and scripts
```

## 📝 Usage

- **Search**: Type in the search bar to filter users by any field.
- **Filter**: Use the dropdowns next to the search bar to filter by specific status or role.
- **Sort**: Click on the column headers (User, Role) to toggle sorting order.
- **Expand**: Click the arrow icon on the left of a row to reveal more details.
- **Actions**: Use the "Actions" menu (three dots) on the right of each row to Edit or Delete a user.
- **Bulk Delete**: Select multiple rows using the checkboxes and use the "Bulk Actions" dropdown to delete them.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
