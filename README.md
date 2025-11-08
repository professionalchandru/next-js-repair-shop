# 🧾 Ticket Management App (Next.js + SSR)

A full-featured **Ticket Management System** built with **Next.js (Server-Side Rendering)** for computer repair shops and service-based businesses.
This application provides seamless **customer and ticket management** with **role-based access control**, powered by **Kinde authentication** and **Neon Postgres**.

🚀 **Live Demo:** [chan-computer-repair-shop.vercel.app](https://chan-computer-repair-shop.vercel.app/login)

---

## 🧰 Tech Stack

| Category               | Technologies                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Framework**          | [Next.js 15](https://nextjs.org/) (with SSR)                                                                             |
| **Auth**               | [Kinde](https://kinde.com/)                                                                                              |
| **Database**           | [Neon](https://neon.tech/) (Postgres)                                                                                    |
| **ORM**                | [Drizzle ORM](https://orm.drizzle.team/)                                                                                 |
| **UI**                 | [Tailwind CSS](https://tailwindcss.com/), [Shadcn/UI](https://ui.shadcn.com/), [React Table](https://tanstack.com/table) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)                                                 |
| **Monitoring**         | [Sentry](https://sentry.io/)                                                                                             |
| **Deployment**         | [Vercel](https://vercel.com/)                                                                                            |

---

## 🔐 Authentication & Roles

This project uses **Kinde** for secure authentication.

### 🔑 Login Credentials

| Role            | Username       | Password    |
| --------------- | -------------- | ----------- |
| **Manager**     | `test_manager` | `Abcd@1234` |
| **User (Tech)** | `test_user`    | `abcd@1234` |

> ⚠️ **Signup is disabled** at the Kinde level. Only the above credentials are available for testing.

### 👥 Available Roles

| Role            | Capabilities                                                       |
| --------------- | ------------------------------------------------------------------ |
| **Admin**       | Full access (manage users, customers, tickets, assignments)        |
| **Manager**     | Create/edit customers, assign techs, manage tickets                |
| **User (Tech)** | View all tickets, edit only assigned tickets, update ticket status |

---

## 🧩 Core Modules

### 1. **Auth**

* Secure login via **Kinde (Email + Code / Username + Password)**
* Role-based authorization with restricted access for non-admin users

### 2. **Customer Management**

* Create, view, and manage customer records
* Admins and managers can **toggle active status**

### 3. **Ticket Management**

* Create and manage tickets for customers
* Assign techs (by managers/admins)
* Techs can update **only their assigned tickets**
* Includes **search, filters, sorting, and pagination**

### 4. **Role-Based Access**

* Permissions enforced both on **frontend** and **server-side (SSR)**
* Protected routes and SSR data fetching with role validation

---

## ⚙️ Local Development Setup

### 🪜 Prerequisites

* Node.js 18+
* Postgres Database (Neon recommended)
* Kinde Account (for Auth setup)
* Sentry Account (for Error Tracking)

---

### 🧮 Steps to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/ticket-management-app.git
   cd ticket-management-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables**

   * Create a `.env.local` file at the project root
   * Copy contents from `.env.example`
   * Fill in your **Kinde**, **Neon**, and **Sentry** credentials

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open the app**

   * Visit: [http://localhost:3000/login](http://localhost:3000/login)
   * Login using provided test credentials

---

## 🧠 Features Overview

✅ **Server-Side Rendering (SSR)** for improved SEO and performance
✅ **Role-based Access Control (RBAC)**
✅ **Full CRUD** for Customers & Tickets
✅ **Advanced Table Operations** (search, filter, sort, pagination)
✅ **Optimistic UI updates** with React Hook Form
✅ **Zod Validation** for type-safe form handling
✅ **Error Tracking & Monitoring** with Sentry
✅ **Modern UI** with Tailwind & Shadcn

---

## 🌍 Deployment

The app is **deployed on Vercel**.
You can deploy your own version with a single click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

---

## 📸 Screenshots (Optional)
* Login Page
* Dashboard View
* Ticket Table
* Customer Management Page
