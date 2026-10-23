import type { ExperienceItem } from '../types/portfolio';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-codeclause',
    role: 'Data Science Intern',
    company: 'Code Clause',
    location: 'Remote',
    period: 'Jun 2023 – Jul 2023',
    description: [
      'Designed and executed a customer segmentation analysis using K-Means clustering, leveraging data from over 1 million mall visitors.',
      'Created interactive visualizations using Matplotlib and Seaborn, enabling a 10% boost in targeted marketing efficiency.',
      'Performed efficient data preprocessing using Pandas and NumPy, reducing data handling time by 30%.'
    ],
    technologies: ['Python', 'K-Means Clustering', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn']
  },
  {
    id: 'exp-response-infoway',
    role: 'Application Developer Intern',
    company: 'Response Infoway',
    location: 'Jaipur, India',
    period: 'May 2023 – Jul 2023',
    description: [
      'Engineered an object detection system using Python and OpenCV, reducing detection latency by 15%.',
      'Collaborated with cross-functional teams using Git for version control and efficient development workflows.',
      'Optimized SQL queries for application data retrieval and processing, improving data handling efficiency by 10%.'
    ],
    technologies: ['Python', 'OpenCV', 'SQL', 'Git', 'Computer Vision']
  }
];
