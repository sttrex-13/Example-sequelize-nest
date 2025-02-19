# ใช้ Node.js เป็น base image
FROM node:18-alpine

# กำหนด working directory
WORKDIR /usr/src/app

# คัดลอกไฟล์ package.json และติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# คัดลอกโค้ดทั้งหมดไปยัง container
COPY . .

# เปิดพอร์ตที่ NestJS ใช้งาน
EXPOSE 3000

# คำสั่งเริ่มต้นให้รัน NestJS
CMD ["npm", "run", "start:dev"]
