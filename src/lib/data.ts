export type Mission = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  objectives: string[];
  estimatedTime: string;
  difficulty: '초급' | '중급' | '고급';
  techStack: string[];
  grafanaUrl?: string;
};

export const missions: Mission[] = [
  {
    id: '1',
    title: 'EKS에 복원력 있는 웹 앱 배포하기',
    description: 'Amazon EKS에 컨테이너화된 웹 애플리케이션을 배포하여 고가용성과 내결함성을 보장하는 방법을 배웁니다.',
    longDescription: '이 미션에서는 컨테이너화된 Node.js 애플리케이션을 프로비저닝된 Amazon EKS 클러스터에 배포합니다. 작업에는 쿠버네티스 배포 매니페스트 작성, 서비스를 통해 애플리케이션 노출, 트래픽 급증을 처리하기 위한 수평적 파드 오토스케일러 구성이 포함됩니다. 매니페스트의 정확성과 배포의 복원력에 대해 평가받게 됩니다.',
    objectives: [
      '쿠버네티스 배포 매니페스트를 작성합니다.',
      'LoadBalancer 유형의 서비스를 생성합니다.',
      '수평적 파드 오토스케일러를 구현합니다.',
      '인터넷에서 애플리케이션에 액세스할 수 있는지 확인합니다.'
    ],
    estimatedTime: '2시간',
    difficulty: '중급',
    techStack: ['Kubernetes', 'AWS EKS', 'Docker', 'Node.js'],
    grafanaUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
  },
  {
    id: '2',
    title: 'GitHub Actions로 CI/CD 파이프라인 구축',
    description: '마이크로서비스의 테스트 및 배포를 자동화하기 위한 완전한 CI/CD 파이프라인을 구축합니다.',
    longDescription: '이 미션은 GitHub Actions를 사용하여 견고한 CI/CD 파이프라인을 만드는 데 도전합니다. 파이썬 마이크로서비스를 자동으로 빌드, 테스트 및 스테이징 환경에 배포하는 워크플로를 구성하게 됩니다. 주요 작업에는 빌드 매트릭스 설정, Docker Hub용 시크릿 관리, 배포 게이트 구현이 포함됩니다.',
    objectives: [
      'GitHub Actions 워크플로 파일을 생성합니다.',
      '코드 린팅 및 단위 테스트를 자동화합니다.',
      '도커 이미지를 빌드하고 레지스트리에 푸시합니다.',
      'main 브랜치에 병합 시 스테이징 환경에 배포합니다.',
    ],
    estimatedTime: '3시간',
    difficulty: '중급',
    techStack: ['GitHub Actions', 'Docker', 'Python', 'YAML'],
  },
  {
    id: '3',
    title: '테라폼으로 코드형 인프라(IaC) 구축',
    description: '테라폼을 사용하여 AWS에서 완전한 VPC 및 EC2 인스턴스 설정을 프로비저닝하고 관리합니다.',
    longDescription: '테라폼을 사용하여 전체 AWS 네트워크 스택을 정의하고 프로비저닝함으로써 코드형 인프라(IaC)를 직접 경험해 보세요. HCL 코드를 작성하여 가상 사설 클라우드(VPC), 서브넷, 보안 그룹 및 간단한 웹 서버를 호스팅할 EC2 인스턴스를 생성하게 됩니다.',
    objectives: [
      '테라폼 프로젝트를 초기화하고 AWS 공급자를 구성합니다.',
      '공용 및 사설 서브넷이 있는 VPC를 정의합니다.',
      'EC2 인스턴스를 생성하고 구성합니다.',
      '테라폼 상태를 사용하여 인프라 변경 사항을 관리합니다.',
    ],
    estimatedTime: '2.5시간',
    difficulty: '고급',
    techStack: ['Terraform', 'AWS', 'IaC', 'HCL'],
  },
  {
    id: '4',
    title: '프로메테우스를 이용한 모니터링 및 알림',
    description: '프로메테우스와 그라파나를 설정하여 라이브 애플리케이션을 모니터링하고 중요한 알림을 구성합니다.',
    longDescription: '관찰 가능성의 세계로 뛰어들어 보세요. 이 미션에서는 샘플 애플리케이션을 모니터링하기 위해 프로메테우스와 그라파나를 배포해야 합니다. 메트릭을 스크랩하고, 그라파나에서 통찰력 있는 대시보드를 구축하고, 시스템 성능이 저하될 때 알림을 보내도록 Alertmanager를 구성하는 방법을 배우게 됩니다.',
    objectives: [
      '프로메테우스를 배포하고 서비스 디스커버리를 구성합니다.',
      '클라이언트 라이브러리로 애플리케이션을 계측합니다.',
      '사용자 지정 그라파나 대시보드를 만듭니다.',
      'Alertmanager에서 알림 규칙을 작성하고 테스트합니다.',
    ],
    estimatedTime: '4시간',
    difficulty: '고급',
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
  security: '배포 매니페스트가 컨테이너 포트 8080을 노출합니다. 컨테이너를 루트가 아닌 사용자로 실행하는 것이 좋은 습관입니다. 또한 네트워크 정책을 사용하여 트래픽을 제한하는 것을 고려하세요.',
  readability: '매니페스트는 잘 구조화되어 있고 읽기 쉽습니다. 각 리소스의 목적을 설명하는 주석을 추가하면 팀 협업 및 향후 유지 관리에 도움이 될 것입니다.',
  efficiency: '컨테이너에 대한 리소스 요청 및 제한이 정의되지 않았습니다. 이는 노드의 리소스 경합과 예측할 수 없는 성능으로 이어질 수 있습니다. 적절한 CPU 및 메모리 요청과 제한을 설정하는 것이 좋습니다.',
  overallScore: 75,
};
