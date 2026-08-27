# Step 1: सबसे पहले डॉकर के खाली डिब्बे में Node.js 20 का सॉफ्टवेयर डाल रहे हैं
FROM node:20-alpine AS build

# कंटेनर के अंदर काम करने के लिए '/app' नाम का फोल्डर (कमरा) फिक्स कर रहे हैं
WORKDIR /app

# आपके कंप्यूटर से सामान की लिस्ट (package.json) को डॉकर के अंदर कॉपी कर रहे हैं
COPY package*.json ./

# डॉकर खुद इंटरनेट से आपके सारे पैकेजेस (React 19, Redux, Express आदि) इंस्टॉल करेगा
RUN npm install

# आपके कंप्यूटर से प्रोजेक्ट का सारा असली कोड (src, public, configs) अंदर कॉपी कर रहे हैं
COPY . .

# Vite के ज़रिए प्रोडक्शन के लिए कंप्रेस कोड तैयार करना (इससे 'dist' फोल्डर बनेगा)
RUN npm run build
# Step 2: Nginx वेब सर्वर सेटअप
FROM nginx:alpine

# Vite द्वारा बनाए गए 'dist' फोल्डर को Nginx में डालना
COPY --from=build /app/dist /usr/share/nginx/html

# अपनी नई nginx.conf फाइल को कंटेनर के अंदर कॉपी करना (यह लाइन जोड़ें)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# वेब सर्वर के लिए पोर्ट 80 खोलना
EXPOSE 80

# Nginx सर्वर को चालू करने का कमांड
CMD ["nginx", "-g", "daemon off;"]
