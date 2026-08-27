pipeline {
    agent any
environment {
        JAVA_OPTS = '-Djenkins.install.runSetupWizard=false'
    }


    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to Render Cloud') {
            steps {
                echo 'Sending signal to Render to start deploy...'
                // यहाँ ध्यान से देखो: शुरुआत में curl -X POST और लिंक को "" में डाल दिया है
                sh 'curl -X POST "https://api.render.com/deploy/srv-da7sm4e7bikc738fpq20?key=RuBwMjYrNWQ"'
            }
        }
    }
}
