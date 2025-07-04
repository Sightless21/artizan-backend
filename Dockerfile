# ใช้ Node.js official image เป็น base
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# กำหนด CMD ที่จะถูกรันเมื่อคอนเทนเนอร์เริ่มทำงาน (จะถูก override ด้วย command ใน docker-compose.yml)
CMD ["npm", "run", "start:dev"]