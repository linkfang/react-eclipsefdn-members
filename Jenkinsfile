  @Library('common-shared') _

pipeline {
  agent {
    kubernetes {
      label 'buildenv-agent'
      yaml '''
      apiVersion: v1
      kind: Pod
      spec:
        containers:
        - name: buildcontainer
          image: eclipsefdn/stack-build-agent:latest
          imagePullPolicy: Always
          command:
          - cat
          tty: true
          resources:
            requests:
              cpu: "1"
              memory: "4Gi"
            limits:
              cpu: "2"
              memory: "4Gi"
          env:
          - name: "HOME"
            value: "/home/jenkins"
          - name: "MAVEN_OPTS"
            value: "-Duser.home=/home/jenkins"
          volumeMounts:
          - name: m2-repo
            mountPath: /home/jenkins/.m2/repository
          - name: m2-secret-dir
            mountPath: /home/jenkins/.m2/settings.xml
            subPath: settings.xml
            readOnly: true
          - mountPath: "/home/jenkins/.m2/settings-security.xml"
            name: "m2-secret-dir"
            readOnly: true
            subPath: "settings-security.xml"
          - mountPath: "/home/jenkins/.mavenrc"
            name: "m2-dir"
            readOnly: true
            subPath: ".mavenrc"
          - mountPath: "/home/jenkins/.m2/wrapper"
            name: "m2-wrapper"
            readOnly: false
          - mountPath: "/home/jenkins/.cache"
            name: "yarn-cache"
            readOnly: false
        - name: jnlp
          resources:
            requests:
              memory: "1024Mi"
              cpu: "500m"
            limits:
              memory: "1024Mi"
              cpu: "1000m"
        volumes:
        - name: "m2-dir"
          configMap:
            name: "m2-dir"
        - name: m2-secret-dir
          secret:
            secretName: m2-secret-dir
        - name: m2-repo
          emptyDir: {}
        - name: m2-wrapper
          emptyDir: {}
        - name: yarn-cache
          emptyDir: {}
      '''
    }
  }

  environment {
    APP_NAME = 'eclipsefdn-react-membership'
    NAMESPACE = 'foundation-internal-webdev-apps'
    IMAGE_NAME = 'eclipsefdn/react-membership'
    CONTAINER_NAME = 'api'
    ENVIRONMENT = sh(
      script: """
        if [ "${env.BRANCH_NAME}" = "master" ]; then
          printf "staging"
        else
          printf "${env.BRANCH_NAME}"
        fi
      """,
      returnStdout: true
    )
    TAG_NAME = sh(
      script: """
        GIT_COMMIT_SHORT=\$(git rev-parse --short ${env.GIT_COMMIT})
        if [ "${env.ENVIRONMENT}" = "" ]; then
          printf \${GIT_COMMIT_SHORT}-${env.BUILD_NUMBER}
        else
          printf ${env.ENVIRONMENT}-\${GIT_COMMIT_SHORT}-${env.BUILD_NUMBER}
        fi
      """,
      returnStdout: true
    )
  }

  options {
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  stages {
    stage('Build project') {
      steps {
        container('buildcontainer') {
          readTrusted 'Makefile'
          readTrusted 'mvnw'
          readTrusted '.mvn/wrapper/MavenWrapperDownloader.java'
          readTrusted 'pom.xml'
          sh 'make compile'
          stash name: "target", includes: "target/**/*"
        }
      }
    }

    stage('Build docker image') {
      agent {
        label 'docker-build'
      }
      steps {
        readTrusted 'src/main/docker/Dockerfile.jvm'

        unstash 'target'
        sh '''
          docker build -f src/main/docker/Dockerfile.jvm --no-cache -t ${IMAGE_NAME}:${TAG_NAME} -t ${IMAGE_NAME}:latest .
          docker build -f src/main/docker/Dockerfile.www --no-cache -t ${IMAGE_NAME}-www:${TAG_NAME} -t ${IMAGE_NAME}-www:latest .
        '''
      }
    }

    stage('Push docker image') {
      agent {
        label 'docker-build'
      }
      when {
        anyOf {
          environment name: 'ENVIRONMENT', value: 'production'
          environment name: 'ENVIRONMENT', value: 'staging'
        }
      }
      steps {
        withDockerRegistry([credentialsId: '04264967-fea0-40c2-bf60-09af5aeba60f', url: 'https://index.docker.io/v1/']) {
          sh '''
            docker push ${IMAGE_NAME}:${TAG_NAME}
            docker push ${IMAGE_NAME}:latest
            docker push ${IMAGE_NAME}-www:${TAG_NAME}
            docker push ${IMAGE_NAME}-www:latest
          '''
        }
      }
    }

    stage('Deploy to cluster') {
      agent {
        kubernetes {
          label 'kubedeploy-agent'
          yaml '''
          apiVersion: v1
          kind: Pod
          spec:
            containers:
            - name: kubectl
              image: eclipsefdn/kubectl:okd-c1
              command:
              - cat
              tty: true
              resources:
                limits:
                  cpu: 1
                  memory: 1Gi
              volumeMounts:
              - mountPath: "/home/default/.kube"
                name: "dot-kube"
                readOnly: false
            - name: jnlp
              resources:
                limits:
                  cpu: 1
                  memory: 1Gi
            volumes:
            - name: "dot-kube"
              emptyDir: {}
          '''
        }
      }

      when {
        anyOf {
          environment name: 'ENVIRONMENT', value: 'production'
          environment name: 'ENVIRONMENT', value: 'staging'
        }
      }
      steps {
        container('kubectl') {
          updateContainerImage([
            namespace: "${env.NAMESPACE}",
            selector: "app=${env.APP_NAME},environment=${env.ENVIRONMENT}",
            containerName: "${env.CONTAINER_NAME}",
            newImageRef: "${env.IMAGE_NAME}:${env.TAG_NAME}"
          ])
          updateContainerImage([
            namespace: "${env.NAMESPACE}",
            selector: "app=${env.APP_NAME},environment=${env.ENVIRONMENT}",
            containerName: "nginx",
            newImageRef: "${env.IMAGE_NAME}-www:${env.TAG_NAME}"
          ])
        }
      }
    }
  }

  post {
    always {
      deleteDir() /* clean up workspace */
      sendNotifications currentBuild
    }
  }
}
