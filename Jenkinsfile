pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Deploy to Render Cloud') {
            steps {
                echo 'Sending signal to Render to start deploy...'
                sh 'https://api.render.com/deploy/srv-da7sm4e7bikc738fpq20?key=RuBwMjYrNWQ'
            }
        }
    }
}
