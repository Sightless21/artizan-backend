# Dockerfile ของ NestJS Backend (น่าจะอยู่ใน root ของโปรเจกต์)
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# ตรวจสอบให้แน่ใจว่าติดตั้ง dependencies ก่อน generate Prisma
RUN npm install

# COPY prisma schema ก่อนที่จะ generate
COPY prisma ./prisma/

# IMPORTANT: Generate Prisma Client inside the container
RUN npx prisma generate

COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port (e.g., 3000 for NestJS)
EXPOSE 3000

# Start the application
# *** เพิ่มคำสั่ง migrate deploy ก่อน start app ***
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]