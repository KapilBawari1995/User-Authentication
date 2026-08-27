pipeline {
    agent any

    stages {
        // स्टेप 1: गिटहब से कोड खींचना
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        // स्टेप 2: अगर पुराना ऐप का कंटेनर चल रहा है तो उसे साफ़ करना
        stage('Clean Old Containers') {
            steps {
                sh '''
                    docker rm -f ecomers-frontend || true
                '''
            }
        }

        // स्टेप 3: फ्रंटएंड (Vite/React) को डॉकर में पोर्ट 3000 पर रन करना
        stage('Deploy Frontend') {
            steps {
                echo 'Building and Running Frontend in Docker...'
                sh '''
                    docker build -t ecomers-front-img .
                    docker run -d -p 3000:80 --name ecomers-frontend ecomers-front-img
                '''
            }
        }

        // स्टेप 4: बैकएंड (Node.js/Express) सर्वर को पोर्ट 4000 पर बैकग्राउंड में चालू करना
        stage('Deploy Backend API') {
            steps {
                echo 'Starting Node.js Backend Server...'
                sh '''
                    cd back
                    npm install
                    nohup npm run dev > backend.log 2>&1 &
                '''
            }
        }
    }
}
