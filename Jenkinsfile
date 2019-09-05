def BUILD_NUM = "${env.BUILD_NUMBER}"

pipeline {
  agent {
    docker {
      image 'node:8.10.0'
      label 'node02'
    }
  }
  stages {
    stage('Prepare') {
      steps {
        sh "yarn install"
      }
    }
    stage('Build') {
      steps {
        sh "yarn eslint"
      }
    }
    stage('Test') {
      steps {
        sh "yarn test:ci"
      }
    }
    stage('Deploy to staging') {
      when {
        branch 'staging'
        beforeAgent true
      }
      steps {
        build job: '../mgi-dashboard-staging'
        catchError {
            build job: '../../../QA/Dashboard-release-test'
        }
      }
    }
    stage('Deploy to production') {
      when {
        branch 'master'
        beforeAgent true
      }
      steps {
        build '../mgi-dashboard-production'
        build '../mgi-dashboard-master-branch-deploy-on-stage'
      }
    }
    stage('Deploy to dev-01') {
      when {
        branch 'develop'
        beforeAgent true
      }
      steps {
        build job: '../build-develop-dev01', parameters: [[$class: 'StringParameterValue', name: 'VERSION', value: BUILD_NUM] ]
        build job: '../deploy-develop-dev01', parameters: [[$class: 'StringParameterValue', name: 'VERSION', value: BUILD_NUM] ]
      }
    }
  }
}
