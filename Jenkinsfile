// Jenkins pipeline for the GEP Playwright tests (Jenkins at http://localhost:9090).
// Started by hand: Build with Parameters. Every GEP test places a REAL order, so there is no SCM/cron trigger,
// retries are forced to 0 (a retry would place a second order) and two builds never run at the same time.
//
// One-time Jenkins setup (see README "Running in Jenkins"):
//   - Plugins: Pipeline, Git, Credentials Binding, JUnit, HTML Publisher
//   - Credential "gep-env" (kind: Secret file) = your .env file. It is copied into the workspace for the run
//     and deleted afterwards. TEST_ENV / MARKET / HEADLESS / SIGN_IN_ONCE come from the build parameters
//     below and win over the values in that file.
//   - Node.js 20+ on the PATH of the Jenkins agent.

pipeline {
  agent any

  parameters {
    choice(name: 'TEST_ENV', choices: ['qa', 'uat'], description: 'Environment')
    string(name: 'MARKET', defaultValue: 'us', description: 'Market(s): us | uk-dental | uk-medical (comma-separated for several)')
    string(name: 'TESTS', defaultValue: '', description: 'Only tests matching this text, e.g. GEP2-36899 or @recurring (empty = all)')
    booleanParam(name: 'SIGN_IN_ONCE', defaultValue: true, description: 'Sign in once per market instead of in every test')
    booleanParam(name: 'HEADLESS', defaultValue: true, description: 'Hide the browser (keep on when Jenkins runs as a Windows service)')
  }

  options {
    // The tests share one account and cart per market: never let two builds overlap.
    disableConcurrentBuilds()
    timeout(time: 90, unit: 'MINUTES')
    buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '10'))
    timestamps()
  }

  environment {
    CI = 'true'
    TEST_ENV = "${params.TEST_ENV}"
    MARKET = "${params.MARKET}"
    SIGN_IN_ONCE = "${params.SIGN_IN_ONCE}"
    HEADLESS = "${params.HEADLESS}"
    TIMEOUT = '90000'
  }

  stages {
    stage('Install') {
      steps {
        runCmd 'node -v'
        runCmd 'npm ci'
        runCmd 'npx playwright install chromium'
      }
    }

    stage('Type check') {
      steps {
        runCmd 'npm run typecheck'
      }
    }

    stage('Run tests') {
      steps {
        withCredentials([file(credentialsId: 'gep-env', variable: 'GEP_ENV_FILE')]) {
          script {
            if (isUnix()) {
              sh 'cp "$GEP_ENV_FILE" .env'
            } else {
              bat 'copy /Y "%GEP_ENV_FILE%" .env >nul'
            }

            def filter = (params.TESTS ?: '').trim()
            // Only plain test names / tags are passed to the shell.
            if (filter && !(filter ==~ /[A-Za-z0-9@_\-\. |]+/)) {
              error "TESTS may only contain letters, digits, spaces and @ _ - . | (got: ${filter})"
            }
            def grep = filter ? " --grep \"${filter}\"" : ''
            def status = isUnix()
              ? sh(returnStatus: true, script: "npx playwright test --retries=0${grep}")
              : bat(returnStatus: true, script: "npx playwright test --retries=0${grep}")
            if (status != 0) {
              unstable "Playwright exited with code ${status}: see the test results and reports."
            }
          }
        }
      }
    }
  }

  post {
    always {
      junit testResults: 'test-results*/junit.xml', allowEmptyResults: true
      publishHTML(target: [
        reportName: 'Playwright Report', reportDir: "${reportFolder('playwright-report')}", reportFiles: 'index.html',
        keepAll: true, alwaysLinkToLastBuild: true, allowMissing: true
      ])
      publishHTML(target: [
        reportName: 'Monocart Report', reportDir: "${reportFolder('monocart-report')}", reportFiles: 'index.html',
        keepAll: true, alwaysLinkToLastBuild: true, allowMissing: true
      ])
      archiveArtifacts artifacts: 'test-results*/**, playwright-report*/**, monocart-report*/**', allowEmptyArchive: true
    }
    cleanup {
      // .env and .auth hold passwords and login cookies: never leave them in the workspace.
      script {
        if (isUnix()) {
          sh 'rm -rf .env .auth'
        } else {
          bat 'if exist .env del /F /Q .env & if exist .auth rmdir /S /Q .auth'
        }
      }
    }
  }
}

// Runs a command with sh on Linux/macOS agents and bat on Windows agents.
def runCmd(String command) {
  if (isUnix()) {
    sh command
  } else {
    bat command
  }
}

// QA writes to the usual folders, other environments to <folder>-<env> (see playwright.config.ts).
def reportFolder(String folder) {
  return params.TEST_ENV == 'qa' ? folder : "${folder}-${params.TEST_ENV}"
}
