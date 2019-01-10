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
        sh "yarn lint"
      }
    }
    stage('Test') {
      steps {
        sh "yarn test:ci"
      }
    }
    stage('Deploy to staging') {
      when {
        branch 'master'
        beforeAgent true
      }
      steps {
        build '../mgi-dashboard-staging'
      }
    }
    stage('Deploy to production') {
      when {
        branch 'stable'
        beforeAgent true
      }
      steps {
        build '../mgi-dashboard-production'
      }
    }
    stage('Deploy to development') {
      when {
        branch 'develop'
        beforeAgent true
      }
      steps {
        build '../../Deployment/dev-01/frontend'
      }
    }
  }
}
