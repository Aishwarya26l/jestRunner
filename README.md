# Javascript Testing suite - Test Coverage

Javascript Testing suite enables a user to create an AWS Lambda function with Javascript testing abilities using Jest along with Jest coverage threshold tests. 

***

## AWS Lambda Function
**AWS Lambda Function Configuration details -** 

| -                 | Value                       |
| ------------------|:---------------------------:|
| **Function name** | jestRunner                  |
| **Runtime**       | Node.js 10.x                |
| **Execution role**| lambda_basic_execution role |
| **Memory (MB)**   | 1024 MB                     |
| **Timeout**       | 40 sec                      |
| **Trigger**       | API Gateway                 |

## Deployment
User can deploy using - 
1. Local environment 
2. AWS Cloud 9 to deploy from the cloud.

### Additional steps for local environment deployment -
1. [Install AWS Command Line Interface](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
   - Verify aws-cli installation 
     - `aws --version`
2. [Configure aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
   - `$ aws configure`
   - `> AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE`
   - `> AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
   - `> Default region name [None]: us-east-1`
   - `> Default output format [None]: json`

**Note -** 
- For AWS Educate users
   - Copy and paste your AWS CLI credentials from account details into ~/.aws/credentials
   - After session token expiry, update the same credentials files with the latest details.

### Steps for deployment -
1. Clone the repository
2. Navigate to the project folder
   - `cd jestRunner`
3. Use the deploy script to update your AWS lambda function "jestRunner". User can alter the script to point to the name of their lambda function incase of differences in lambda names.
   - `./deploy.sh`
   - The deployment script downloads/installs and packages the node_modules along with the project contents into a zipped file. This zipped file is then deployed to update the existing lambda function.
4. Navigate to the API endpoint of the AWS Lambda function to view the changes.
