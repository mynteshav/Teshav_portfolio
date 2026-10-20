import type { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: 'gen-ai',
    name: 'Generative AI & LLMs',
    description: 'Frameworks, vector databases, and retrieval architectures for intelligent assistant systems.',
    icon: 'Sparkles',
    skills: [
      'LLMs',
      'Retrieval-Augmented Generation (RAG)',
      'Prompt Engineering',
      'Embeddings',
      'LangChain',
      'Hugging Face',
      'Ollama',
      'FAISS',
      'ChromaDB'
    ]
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    description: 'Statistical modeling, algorithmic regression, clustering, and performance validation.',
    icon: 'GitBranch',
    skills: [
      'Scikit-learn',
      'Regression',
      'Classification',
      'Clustering',
      'Random Forest',
      'XGBoost',
      'Model Evaluation'
    ]
  },
  {
    id: 'dl-nlp',
    name: 'Deep Learning & NLP',
    description: 'Architectures for sequence modeling, vector representations, and semantic text processing.',
    icon: 'Network',
    skills: [
      'Neural Networks',
      'TensorFlow',
      'PyTorch',
      'Transformers',
      'Tokenization',
      'TF-IDF',
      'Sentence Transformers',
      'Sentiment Analysis'
    ]
  },
  {
    id: 'programming-data',
    name: 'Programming & Data Engineering',
    description: 'Core languages and scientific computation libraries for data manipulation and analysis.',
    icon: 'Terminal',
    skills: [
      'Python',
      'SQL',
      'MySQL',
      'NumPy',
      'Pandas',
      'Matplotlib',
      'Seaborn'
    ]
  },
  {
    id: 'backend-deployment',
    name: 'Backend & Deployment',
    description: 'Service frameworks, schema validation, containerization, and modern version control.',
    icon: 'Server',
    skills: [
      'FastAPI',
      'Flask',
      'Streamlit',
      'Pydantic',
      'Docker',
      'Git',
      'GitHub'
    ]
  },
  {
    id: 'analytics',
    name: 'Business Intelligence & Analytics',
    description: 'Exploratory data analysis, KPI visualization, and business intelligence dashboards.',
    icon: 'BarChart2',
    skills: [
      'Power BI',
      'DAX',
      'Excel'
    ]
  }
];

export const quickHeroSkills = ['Python', 'Machine Learning', 'LLMs', 'RAG', 'FastAPI', 'PyTorch'];
