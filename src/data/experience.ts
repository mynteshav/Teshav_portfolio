import type { ExperienceItem } from '../types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-codeclause',
    role: 'Data Science Intern',
    company: 'CodeClause',
    period: 'June 2023 – July 2023',
    description: [
      'Developed customer segmentation pipelines applying K-Means clustering algorithms on consumer behavioral data.',
      'Conducted exploratory data analysis (EDA), feature preprocessing, and correlation studies to derive cluster personas.',
      'Evaluated optimal cluster counts using elbow method analysis and silhouette scoring.'
    ],
    technologies: ['Python', 'Machine Learning', 'K-Means Clustering', 'Pandas', 'Scikit-learn', 'Matplotlib']
  },
  {
    id: 'exp-response-infoway',
    role: 'Application Developer Intern',
    company: 'Response Infoway',
    period: 'May 2023 – July 2023',
    description: [
      'Contributed to the design and development of an OpenCV-based real-time object detection system.',
      'Utilized SQL database queries and structured schemas for efficient application data storage and retrieval.',
      'Collaborated on core application development workflows, debugging, and software integration.'
    ],
    technologies: ['Python', 'OpenCV', 'SQL', 'Computer Vision', 'Application Development']
  }
];
