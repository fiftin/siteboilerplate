## What is it?

Cloud Site Builderplate is a start point for creating a cloud-based (initially static, but can be easy extended) website. It has a modern stack:

| Technology             | Responsibility  |
|------------------------|-----------------|
| NPM with Gulp          | Build           |
| Ansible                | Deploy          |
| Terraform              | Cloud resources |
| Pug                    | Pages           |
| SCSS                   | Design          |
| Bulma                  | UI Framework    |
| Visual Studio Core     | Code writing    |
| Component architecture | Code quality    |

### Requirements

* AWS account
* macOS or Linux (Windows is not supported)
* Ansible 2.9+
* Node.js 14.15.0+
* Visual Studio Code with plugins:
    * Live Server ([https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer](ritwickdey.liveserver))
    * File Watcher ([https://marketplace.visualstudio.com/items?itemName=appulate.filewatcher](appulate.filewatcher))

### 1. Test

Build the project

    npm run build

Run Live Server
![](/src/templates/how-to-go-live.png)

### 2. Setup

_NOT IMPLEMENTED!!!_

    npm run setup example

### 3. Deploy

Deploy website to AWS

    npm run deploy example

### 4. Destroy
_NOT IMPLEMENTED!!!_

    npm run destroy example

### How setup should works

_NOT IMPLEMENTED!!! you should do it manually_

1. Ask the user to the AWS access key. (required)

2. Ask the user to the AWS access secret (required)

3. Ask the user to a domain name (optional)
    With using Terraform:
    * Create S3 bucket
    * Create Lambda@Edge
    * Requst SSL Certificate (if domain name provided)
    * Create CloudFront distribution

4. Ask the user to add a CNAME record to confirm domain owning (if domain name provided)

5. Waiting domain confirmation (if domain name provided)

6. Setup successfully finished

7. Destroy all resources if the user canceled setup

### Recomendations

Use Cloudflare to protect your website from DDoS attacks.

Create a fork to start using the boilerplate.