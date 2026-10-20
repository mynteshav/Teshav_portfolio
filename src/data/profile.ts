import type { ProfileData } from '../types/portfolio';

export const profileData: ProfileData = {
  name: 'Teshav Sharma',
  wordmark: 'TS.',
  eyebrow: 'AI & MACHINE LEARNING ENGINEER IN PROGRESS',
  headline: 'Building intelligent systems that turn data into decisions.',
  supportingText:
    "I'm Teshav Sharma, an MCA student specializing in AI and Data Science. I build machine learning applications, experiment with LLMs and RAG pipelines, and turn ideas into practical AI-powered products.",
  location: 'Jaipur, India',
  email: 'teshavsharma74@gmail.com',
  githubUrl: 'https://github.com/mynteshav',
  linkedinUrl: 'https://www.linkedin.com/in/teshavds/',
  resumeUrl: '/Teshav_Sharma_Resume.pdf',
  opportunitiesStatus: 'Actively open to AI/ML internships and entry-level engineering roles',
  bioNarrative: [
    "I am an aspiring AI Engineer currently pursuing a Master of Computer Applications (MCA) specializing in Artificial Intelligence and Data Science at JECRC University, following a Bachelor of Computer Applications (BCA) completed at Poornima University in 2024.",
    "My focus centers on the full lifecycle of intelligent systems: from exploratory data analysis and predictive modeling to architecting Retrieval-Augmented Generation (RAG) pipelines and deploying containerized microservices.",
    "I prioritize grounded engineering over hype—building reliable APIs with FastAPI, experimenting with local and frontier LLMs, tuning Scikit-learn and XGBoost regression workflows, and turning complex datasets into clear, actionable decision-making tools."
  ],
  focusAreas: [
    {
      title: 'Generative AI & RAG',
      description: 'Engineering contextual retrieval architectures using LangChain, sentence transformers, vector stores (Chroma, FAISS), and Ollama for reliable domain knowledge extraction.',
      icon: 'Brain'
    },
    {
      title: 'Machine Learning Pipelines',
      description: 'Designing end-to-end regression and classification models using Scikit-learn and XGBoost, with robust cross-validation, feature engineering, and metric evaluation.',
      icon: 'Cpu'
    },
    {
      title: 'Production Backend & APIs',
      description: 'Wrapping machine learning models and LLM agents into performant FastAPI endpoints, validated with Pydantic and containerized with Docker for seamless integration.',
      icon: 'Layers'
    },
    {
      title: 'Data Intelligence & Analytics',
      description: 'Uncovering multi-dimensional market signals and metrics with SQL, Pandas, Seaborn, and interactive Power BI dashboards powered by custom DAX formulas.',
      icon: 'BarChart3'
    }
  ]
};
