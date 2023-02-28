pipeline {
    agent any
    /*sshagent(credentials : ['jen-git']) */

    environment {
        EXAMPLE_CREDS = credentials('03a35cbb-2f19-43a9-bbe7-42369795abae')
    }
    
    stages {
        stage('build from github by checking code') {
            steps {
                sshagent (credentials: ['jen-git']){
                    echo 'build code'
                    sh 'git checkout -b staging-branch'
                    /*sh 'git switch  staging-branch' */      
                    sh 'pip install -r requirements.txt'
                    sh 'docker-compose up --build -d'
                    echo 'the docker image successfully builded'
                }
            }
        }
        stage('test from github') {
            steps {
                echo 'running test1: unitest python'
                sh 'cd backend'
                sh 'python3 -m pip install flask'
                sh 'python3 -m unittest'
                echo 'running the docker image'
                echo 'the docker image successfully run'
                sh 'cd ../myfrontendapp/src'
                sh 'npm run test'

            }
        }
        stage('deploy to dockerhub') {
            
            steps {
                echo 'connection to the docker hub'
                sh 'docker login -u $EXAMPLE_CREDS_USR -p $EXAMPLE_CREDS_PSW'
                sh 'docker push aubinho237/first-docker-hub:latest'
                
            }
        }
        stage('Merge the staging branch with  main'){
            steps {
                sshagent (credentials: ['jen-git']){
                    sh 'git checkout main'
                    sh 'git pull origin main'
                    sh 'git merge staging-branch'
                    sh 'git push origin main'
                }
            }
        }
    }
}
