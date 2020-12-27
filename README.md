## What is it?

Cloud Site Builderplate is a start point for creating a cloud-based website. It has a modern stack:

| Technology             | Responsibility  |
|------------------------|-----------------|
| NPM with Gulp          | Build           |
| Ansible                | Deploy          |
| Terraform              | Cloud resources |
| Pug                    | Pages           |
| SCSS                   | Design          |
| Visual Studio Core     | Code writing    |
| Component architecture | Code quality    |

### Requirements

* AWS account
* macOS or Linux (Windows is not supported)
* Ansible 2.9+
* Node.js 14.15.0+
* Visual Studio Code with plugins:
    * Live Server (ritwickdey.liveserver)
    * File Watcher (appulate.filewatcher)

### Test

1. Build the project

    ```
    npm run local
    ```

2. Run Live Server


### Deploy

3. Setup the project

    ```
    npm run setup
    ```

4. Deploy website to AWS

    ```
    npm run dev
    ```

### Destroy

    ```
    npm run destroy
    ```

### How setup works

1. Ask the user to the AWS access key. (required)

2. Ask the user to the AWS access secret (required)

3. Ask the user to a domain name (optional)
    * Requst SSL Certificate (if domain name provided)
    * Create S3 bucket
    * Create Lambda@Edge
    * Create CloudFront distribution

4. Ask the user to add a CNAME record to confirm domain owning (if domain name provided)

5. Waiting domain confirmation (if domain name provided)

6. Setup successfully finished

7. Destroy all resources if the user canceled setup

### Recomendations

Use Cloudflare to protect your website from DDoS attacks.

Create a fork to start using the boilerplate.