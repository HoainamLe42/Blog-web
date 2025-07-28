# 📘 Blog Web – Giao diện Chia sẻ Hành trình Du lịch, công nghệ và đam mê của mình.

> Một dự án web blog cho phép người dùng chia sẻ, khám phá, sở thích và bình luận về các chuyến đi khám phá cảnh đẹp.

## 📸 Demo

> [🌐 Xem demo tại đây](https://blog-website-three-blond.vercel.app) >

![Preview](../frontend//src/assets/blog-preview.png)

## 📌 Mục tiêu dự án

Tạo ra một nền tảng blog đơn giản để người dùng:

-   Đăng tải bài viết chia sẻ về hành trình du lịch, khám phá, công nghệ và sở thích.
-   Xem, tìm kiếm và đọc các bài viết từ cộng đồng.
-   Bình luận dưới bài viết để tương tác và đóng góp ý kiến.

---

## 🚀 Các tính năng chính

### 🧭 Giao diện & trải nghiệm

-   Giao diện phản hồi tốt (Responsive) cho cả mobile & desktop.

### 👤 Người dùng

-   Đăng nhập / Đăng ký.
-   Đăng bài viết blog mới (tiêu đề, ảnh, nội dung).
-   Chỉnh sửa hoặc xoá bài viết cá nhân.
-   Xem danh sách bài viết từ tất cả người dùng.
-   Bình luận dưới bài viết của người khác.

### Trang Admin

Trang quản trị dành riêng cho người quản trị viên có tài khoản với quyền "admin".

#### 🔹 Quản lý bài viết

-   Xem danh sách toàn bộ bài viết của người dùng.
-   Duyệt bài viết trước khi đưa lên web.
-   Xem chi tiết thông tin bài viết: tiêu đề, mô tả, ảnh, tác giả,...

#### 🔹 Quản lý người dùng

-   Xem danh sách người dùng đã đăng ký.
-   Kiểm tra thông tin người dùng (email, tên).
-   Xoá, chặn người dùng vi phạm chính sách.

#### 🔹 Giao diện quản lý đơn giản

-   Giao diện trực quan, dễ sử dụng với React + Tailwind CSS.
-   Chuyển đổi nhanh giữa các phần: quản lý bài viết, người dùng, trang chủ.

---

## 🛠️ Công nghệ sử dụng

-   **Frontend:**
    | Công nghệ | Mô tả |
    | ------------------ | ------------------------- |
    | React + TypeScript | Frontend |
    | Tailwind CSS | Giao diện nhanh, hiện đại |
    | React Router | Điều hướng giữa các trang |
    | Context API | Quản lý state toàn cục |

-   **Backend (giả lập):**
-   JSON Server được deploy trên **Codesandbox** để giữ backend luôn online
-   API luôn sẵn sàng truy cập qua URL như:  
     `https://2g4qz3-8088.csb.app`

-   Các endpoint API: `/users`, `/blogPosts`, `/contacts`

## 🔐 Tài khoản đăng nhập (Demo)

| Loại  | Email               | Mật khẩu |
| ----- | ------------------- | -------- |
| Admin | admin@gmail.com     | admin123 |
| ----- | ---------------     | -------- |
| User  | sontung93@gmail.com | 12345    |

> Sử dụng tài khoản trên để đăng nhập và truy cập trang quản trị và user.

## 📦 Cài đặt & chạy project

```bash
# Clone dự án
git clone https://github.com/HoainamLe42/Blog-web.git

# Cài dependencies
npm install

# Chạy frontend
npm run dev

# Chạy json server
npm run server
```
