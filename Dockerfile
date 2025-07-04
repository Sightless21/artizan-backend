# ใช้ Node.js official image (non-alpine) เพื่อความเสถียรของ Prisma Binary Engine
FROM node:18 

# กำหนด working directory ภายในคอนเทนเนอร์
WORKDIR /app

# คัดลอก package.json และ package-lock.json (หรือ yarn.lock) มาก่อน
COPY package*.json ./

# ติดตั้ง dependencies ทั้งหมด
RUN npm install

# (Optional แต่ดีเผื่อไว้) บังคับติดตั้ง @prisma/client อีกครั้ง
RUN npm install @prisma/client

# คัดลอกไฟล์และโฟลเดอร์ที่จำเป็นทั้งหมด
# .env ต้องถูก COPY เข้าไปเพื่อใช้ในขั้นตอน prisma generate และ runtime
COPY .env ./.env
COPY prisma ./prisma
COPY src ./src
COPY tsconfig.json ./tsconfig.json

# รัน prisma generate
# ตอนนี้ Prisma Client จะถูก Generate ไปที่ node_modules/@prisma/client แล้ว
RUN npx prisma generate

# กำหนด CMD ที่จะถูกรันเมื่อคอนเทนเนอร์เริ่มทำงาน
# เราใช้ npm run start:dev เพื่อให้ hot-reload ทำงานในระหว่างพัฒนา
CMD ["npm", "run", "start:dev"]