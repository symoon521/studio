export type Mission = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  objectives: string[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  techStack: string[];
  grafanaUrl?: string;
};

export const missions: Mission[] = [
  {
    id: '1',
    title: 'Deploy a Resilient Web App on EKS',
    description: 'Learn to deploy a containerized web application on Amazon EKS, ensuring high availability and fault tolerance.',
    longDescription: 'In this mission, you will take a containerized Node.js application and deploy it to a provisioned Amazon EKS cluster. Your tasks will include writing a Kubernetes deployment manifest, exposing the application via a service, and configuring a horizontal pod autoscaler to handle traffic spikes. You will be evaluated on the correctness of your manifests and the resilience of your deployment.',
    objectives: [
      'Write a Kubernetes Deployment manifest.',
      'Create a Service of type LoadBalancer.',
      'Implement a Horizontal Pod Autoscaler.',
      'Verify the application is accessible from the internet.'
    ],
    estimatedTime: '2 hours',
    difficulty: 'Intermediate',
    techStack: ['Kubernetes', 'AWS EKS', 'Docker', 'Node.js'],
    grafanaUrl: 'https://placehold.co/600x400',
  },
  {
    id: '2',
    title: 'CI/CD Pipeline with GitHub Actions',
    description: 'Build a complete CI/CD pipeline to automate testing and deployment of a microservice.',
    longDescription: 'This mission challenges you to create a robust CI/CD pipeline using GitHub Actions. You will configure workflows that automatically build, test, and deploy a Python microservice to a staging environment. Key tasks include setting up build matrices, managing secrets for Docker Hub, and implementing deployment gates.',
    objectives: [
      'Create a GitHub Actions workflow file.',
      'Automate code linting and unit testing.',
      'Build and push a Docker image to a registry.',
      'Deploy to a staging environment upon merge to main.',
    ],
    estimatedTime: '3 hours',
    difficulty: 'Intermediate',
    techStack: ['GitHub Actions', 'Docker', 'Python', 'YAML'],
  },
  {
    id: '3',
    title: 'Infrastructure as Code with Terraform',
    description: 'Provision and manage a complete VPC and EC2 instance setup on AWS using Terraform.',
    longDescription: 'Get hands-on with Infrastructure as Code (IaC) by using Terraform to define and provision an entire AWS network stack. You will write HCL code to create a Virtual Private Cloud (VPC), subnets, security groups, and an EC2 instance to host a simple web server.',
    objectives: [
      'Initialize a Terraform project and configure the AWS provider.',
      'Define a VPC with public and private subnets.',
      'Create and configure an EC2 instance.',
      'Use Terraform state to manage infrastructure changes.',
    ],
    estimatedTime: '2.5 hours',
    difficulty: 'Advanced',
    techStack: ['Terraform', 'AWS', 'IaC', 'HCL'],
  },
  {
    id: '4',
    title: 'Monitoring and Alerting with Prometheus',
    description: 'Set up Prometheus and Grafana to monitor a live application and configure critical alerts.',
    longDescription: 'Dive into the world of observability. This mission requires you to deploy Prometheus and Grafana to monitor a sample application. You will learn to scrape metrics, build insightful dashboards in Grafana, and configure Alertmanager to send notifications when system performance degrades.',
    objectives: [
      'Deploy Prometheus and configure service discovery.',
      'Instrument an application with a client library.',
      'Create a custom Grafana dashboard.',
      'Write and test alerting rules in Alertmanager.',
    ],
    estimatedTime: '4 hours',
    difficulty: 'Advanced',
    techStack: ['Prometheus', 'Grafana', 'Alertmanager', 'Docker'],
  },
];

export const aiFeedback = {
  code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  replicas: 2
  selector:
    matchLabels:
      app: my-app
  template:
    metadata:
      labels:
        app: my-app
    spec:
      containers:
      - name: my-app-container
        image: my-node-app:1.0
        ports:
        - containerPort: 8080`,
  security: 'Your deployment manifest exposes container port 8080. It is a good practice to run containers with a non-root user. Also, consider using a network policy to restrict traffic.',
  readability: 'The manifest is well-structured and easy to read. Adding comments to explain the purpose of each resource would be beneficial for team collaboration and future maintenance.',
  efficiency: 'Resource requests and limits are not defined for the container. This can lead to resource contention on the node and unpredictable performance. It is highly recommended to set appropriate CPU and memory requests and limits.',
  overallScore: 75,
};
