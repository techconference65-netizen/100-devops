#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const labTitles = [
  "Linux User Setup with Non-Interactive Shell",
  "Temporary User Setup with Expiry",
  "Secure Root SSH Access",
  "Script Execution Permissions",
  "SELinux Installation and Configuration",
  "Create a Cron Job",
  "Linux SSH Authentication",
  "Install Ansible",
  "MariaDB Troubleshooting",
  "Linux Bash Scripts",
  "Install and Configure Tomcat Server",
  "Linux Network Services",
  "IPTables Installation and Configuration",
  "Linux Process Troubleshooting",
  "Setup SSL for Nginx",
  "Nginx as a Load Balancer",
  "Install and Configure PostgreSQL",
  "Configure LAMP Server",
  "Install and Configure Web Application",
  "Nginx + PHP-FPM via Unix Socket",
  "Set Up Git Repository on Storage Server",
  "Clone Git Repository on Storage Server",
  "Fork a Git Repository",
  "Git: Create Branches",
  "Git: Merge Branches",
  "Git: Manage Remotes",
  "Git: Revert Some Changes",
  "Git: Cherry-Pick",
  "Manage Git Pull Requests",
  "Git: Hard Reset",
  "Git: Stash",
  "Git: Rebase",
  "Resolve Git Merge Conflicts",
  "Git Hook",
  "Install Docker & Start Service",
  "Deploy Nginx Container",
  "Copy File to Docker Container",
  "Pull Docker Image",
  "Commit a Container as Image",
  "Docker Exec Operations",
  "Write a Dockerfile",
  "Create a Docker Network",
  "Docker Port Mapping",
  "Docker Compose File",
  "Fix a Dockerfile",
  "Multi-container App with Compose",
  "Dockerized Python App",
  "K8s: Deploy Pods",
  "K8s: Deployments",
  "K8s: Resource Limits",
  "K8s: Rolling Updates",
  "K8s: Rollbacks",
  "K8s: VolumeMounts Fix",
  "K8s: Shared Volumes",
  "K8s: Sidecars",
  "K8s: Nginx Web Server",
  "K8s: Env Vars",
  "K8s: Grafana",
  "K8s: Troubleshoot Deployment",
  "K8s: Persistent Volumes",
  "K8s: Init Containers",
  "K8s: Secrets",
  "K8s: Iron Gallery App",
  "K8s: Fix Python App",
  "K8s: Redis Deployment",
  "K8s: MySQL on K8s",
  "K8s: Guest Book App",
  "Jenkins: Server Setup",
  "Jenkins: Plugins",
  "Jenkins: User Access",
  "Jenkins: Package Install Job",
  "Jenkins: Parameterized Builds",
  "Jenkins: Scheduled Jobs",
  "Jenkins: DB Backup Job",
  "Jenkins: Slave Nodes",
  "Jenkins: Project Security",
  "Jenkins: Deploy Pipeline",
  "Jenkins: Conditional Pipeline",
  "Jenkins: Deployment Job",
  "Jenkins: Chained Builds",
  "Jenkins: Multistage Pipeline",
  "Ansible: Inventory for App Servers",
  "Ansible: Troubleshoot & Playbook",
  "Ansible: Copy Files to App Servers",
  "Ansible: Create Files on App Servers",
  "Ansible: Ping Module",
  "Ansible: Install Package",
  "Ansible: Blockinfile",
  "Ansible: Manage Services",
  "Ansible: ACLs",
  "Ansible: Lineinfile",
  "Ansible: Jinja2 Templates",
  "Ansible: Conditionals",
  "Terraform: VPC",
  "Terraform: Security Group",
  "Terraform: EC2 Instance",
  "Terraform: IAM Policy",
  "Terraform: EC2 in Private Subnet",
  "Terraform: Attach Policy for DynamoDB",
  "Terraform: CloudWatch Alarm"
];

function generateLabFolder(dayNumber, title) {
  const dayString = dayNumber.toString().padStart(3, '0');
  const folderPath = path.join('labs', `day-${dayString}`);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  // Generate README.md
  const readmeContent = `# Day ${dayNumber} - ${title}

## Overview
${title}

## Learning Objectives
- Understand the core concepts
- Practice hands-on implementation
- Apply best practices
- Troubleshoot common issues

## Prerequisites
- Docker installed
- Basic understanding of ${getCategory(title)}

## Task Instructions

### Step 1: Environment Setup
\`\`\`bash
# Add your setup commands here
echo "Setting up environment for ${title}"
\`\`\`

### Step 2: Implementation
Complete the following tasks:
1. Task 1 - Setup basic configuration
2. Task 2 - Implement main functionality
3. Task 3 - Test and verify

### Step 3: Verification
Verify your implementation by:
- Running tests
- Checking output
- Validating configuration

## Expected Outcome
By the end of this lab, you should be able to:
- [ ] Complete task 1
- [ ] Complete task 2
- [ ] Complete task 3
- [ ] Verify implementation

## Docker Environment
This lab includes a Docker environment for hands-on practice.

Use the Docker controls in the web interface to:
- Start the environment
- View logs
- Stop when complete

## Resources
- [Official Documentation](#)
- [Community Guides](#)
- [Best Practices](#)

## Notes
Add your notes and observations here.
`;

  // Generate basic docker-compose.yml
  const dockerComposeContent = `version: '3.8'
services:
  lab-${dayString}:
    image: ubuntu:20.04
    container_name: day-${dayString}-lab
    command: tail -f /dev/null
    volumes:
      - ./workspace:/workspace
    environment:
      - LAB_DAY=${dayNumber}
      - LAB_TITLE="${title}"
    networks:
      - lab-network

networks:
  lab-network:
    driver: bridge
`;

  // Write files
  fs.writeFileSync(path.join(folderPath, 'README.md'), readmeContent);
  fs.writeFileSync(path.join(folderPath, 'docker-compose.yml'), dockerComposeContent);
  
  // Create workspace directory
  const workspacePath = path.join(folderPath, 'workspace');
  if (!fs.existsSync(workspacePath)) {
    fs.mkdirSync(workspacePath);
  }

  // Create a simple starter file
  const starterContent = `#!/bin/bash
# Day ${dayNumber}: ${title}
# Add your solution here

echo "Starting Day ${dayNumber} lab: ${title}"
`;
  
  fs.writeFileSync(path.join(workspacePath, 'solution.sh'), starterContent);
  fs.chmodSync(path.join(workspacePath, 'solution.sh'), '755');

  console.log(`✓ Generated Day ${dayString}: ${title}`);
}

function getCategory(title) {
  if (title.includes('Linux') || title.includes('SSH') || title.includes('Bash')) return 'Linux administration';
  if (title.includes('Git')) return 'version control';
  if (title.includes('Docker')) return 'containerization';
  if (title.includes('K8s')) return 'Kubernetes';
  if (title.includes('Jenkins')) return 'CI/CD';
  if (title.includes('Ansible')) return 'configuration management';
  if (title.includes('Terraform')) return 'infrastructure as code';
  return 'DevOps tools';
}

function main() {
  console.log('🚀 Generating 100 Days of DevOps Labs...\n');
  
  // Create labs directory
  const labsDir = 'labs';
  if (!fs.existsSync(labsDir)) {
    fs.mkdirSync(labsDir);
  }

  // Generate all 100 days
  labTitles.forEach((title, index) => {
    generateLabFolder(index + 1, title);
  });

  console.log('\n🎉 Successfully generated all 100 lab folders!');
  console.log('\nTo get started:');
  console.log('1. Run: npm run dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Start with Day 01');
  console.log('\nMake sure Docker is installed for the lab environments to work.');
}

if (require.main === module) {
  main();
}

module.exports = { generateLabFolder, labTitles };