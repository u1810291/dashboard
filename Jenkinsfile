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
        sh "yarn build"
      }
    }
    stage('Test') {
      steps {
        sh "yarn test:ci"
      }
    }
    stage('Deploy to staging') {
      when {
        branch 'develop'
        beforeAgent true
      }
      steps {
        build './mgi-dashboard-staging'
      }
    }
    stage('Deploy to production') {
      when {
        branch 'master'
        beforeAgent true
      }
      steps {
        build '../mgi-dashboard-production'
      }
    }
  }
}
