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
        branch 'pre-release'
        beforeAgent true
      }
      steps {
        build '../mgi-dashboard-pre-release'
      }
    }
    stage('Deploy to production') {
      when {
        branch 'master'
        beforeAgent true
      }
      steps {
        build '../mgi-dashboard-production'
        build '../mgi-dashboard-staging'
      }
    }
  }
}
