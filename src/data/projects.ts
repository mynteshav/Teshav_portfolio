import type { Project } from '../types/portfolio';

export const projectsData: Project[] = [
  {
    id: 'ai-career-intelligence',
    title: 'AI Career Intelligence Platform',
    category: 'Generative AI',
    description:
      'An AI-powered career guidance platform that matches resumes with job descriptions, identifies relevant skills, and generates personalized skill-gap recommendations.',
    problem:
      'Job seekers often struggle to identify exact keyword alignment and skill gaps when targeting specific technical job descriptions, leading to low match rates and unfocused upskilling.',
    approach:
      'Engineered an NLP and embedding-based resume-to-role matching system. Implemented a RAG pipeline using LangChain and Ollama to retrieve relevant contextual career benchmarks, producing tailored upskilling roadmaps and step-by-step role preparation.',
    outcome:
      'Built a complete end-to-end prototype featuring a responsive Streamlit UI, a decoupled FastAPI backend with Pydantic validation, and Docker containerization for portable execution.',
    tags: ['Generative AI', 'RAG', 'LangChain', 'Ollama', 'FastAPI', 'Streamlit', 'Docker', 'NLP'],
    highlights: [
      'NLP-based skill and keyword extraction from unstructured resumes',
      'Vector embedding similarity matching between candidate profiles and job descriptions',
      'RAG pipeline utilizing LangChain with local Ollama LLM integration',
      'LLM-generated contextual career explanations and actionable learning roadmaps',
      'Decoupled system architecture: Streamlit frontend, FastAPI backend, Dockerized container'
    ],
    architectureDetails: [
      'Resume Parser: Extracts text, extracts candidate skill set using NLP tokenization',
      'Vector Store & Retriever: Computes embeddings and retrieves role requirements',
      'RAG Pipeline: LangChain orchestrator querying local Ollama instance for skill gap analysis',
      'FastAPI Microservice: Exposes RESTful endpoints for analysis and roadmap generation',
      'Docker Packaging: Isolated reproducible environment for fast local and server deployment'
    ],
    isFeatured: true,
    demoUrl: 'https://ai-career-intelligence-platform-aouhoykvy2e7z59j2ht6qz.streamlit.app/',
    githubUrl: 'https://github.com/mynteshav'
  },
  {
    id: 'flipkart-pricing-strategy',
    title: 'Flipkart Product Pricing Strategy',
    category: 'Machine Learning',
    description:
      'A machine learning project that estimates product prices and explores pricing patterns using multi-feature regression modeling.',
    problem:
      'E-commerce marketplaces feature dynamic pricing across thousands of items with non-linear relationships between brand, rating, category, and retail discounts.',
    approach:
      'Processed and cleaned a dataset of approximately 5,000 product rows. Performed categorical encoding, missing value imputation, outlier handling, and trained a Random Forest regression model with hyperparameter tuning.',
    outcome:
      'Delivered end-to-end data preparation, model training, and diagnostic evaluation, achieving a reported R² score of 0.61 and a root mean squared error (RMSE) of approximately ₹26,402.',
    tags: ['Machine Learning', 'Python', 'Scikit-learn', 'Random Forest', 'Pandas', 'Feature Engineering'],
    highlights: [
      'Cleaned and preprocessed ~5,000 Flipkart e-commerce product records',
      'Conducted rigorous exploratory data analysis (EDA) to detect pricing outliers and discount trends',
      'Trained Random Forest regressor with cross-validated hyperparameter search',
      'Evaluated predictions with standard statistical metrics (R² and RMSE)',
      'Documented feature importance revealing highest price-determining product attributes'
    ],
    metrics: [
      { label: 'Dataset Size', value: '~5,000 Rows' },
      { label: 'Algorithm', value: 'Random Forest' },
      { label: 'R² Score', value: '0.61' },
      { label: 'Reported RMSE', value: '₹26,402' }
    ],
    isFeatured: true,
    githubUrl: 'https://github.com/mynteshav/Flipkart-product-pricing/blob/main/flipkart-product-pricing-strategy-using-regression.ipynb'
  },
  {
    id: 'powerbi-job-market-dashboard',
    title: 'Power BI Job Market Dashboard',
    category: 'Analytics',
    description:
      'An interactive business intelligence dashboard exploring job-market dynamics, compensation bands, and in-demand skills.',
    problem:
      'Tech market job seekers and talent analysts face fragmented compensation and requirement data across different geographies and seniority tiers.',
    approach:
      'Aggregated and transformed approximately 14,200 job postings. Engineered relational data models in Power BI and formulated custom DAX measures for median salaries, location distributions, and demand indices.',
    outcome:
      'Produced an interactive, multi-view dashboard offering real-time slicing by location, required technical stack, salary quartiles, and company size.',
    tags: ['Power BI', 'DAX', 'Data Analytics', 'Business Intelligence', 'Data Modeling', 'Excel'],
    highlights: [
      'Transformed and normalized ~14,200 tech job postings with Power Query',
      'Designed star-schema relational model connecting job attributes, locations, and compensation',
      'Authored custom DAX KPIs for dynamic salary percentiles and geographical hiring intensity',
      'Created interactive cross-filtering dashboards for recruiter and applicant exploration'
    ],
    metrics: [
      { label: 'Data Scale', value: '~14,200 Postings' },
      { label: 'Analysis Type', value: 'Salary & Role Trends' },
      { label: 'KPI Engine', value: 'Custom DAX' },
      { label: 'Platform', value: 'Power BI' }
    ],
    isFeatured: true,
    githubUrl: 'https://github.com/mynteshav/Job-Market-Salary-Trends-Dashboard-Power-BI-/blob/main/images/screenshot_dashboard.PNG'
  },
  {
    id: 'predict-calorie-expenditure',
    title: 'Predict Calorie Expenditure',
    category: 'Machine Learning',
    description:
      'A predictive machine learning application using an XGBoost regression pipeline to estimate caloric burn based on biometric and exercise metrics.',
    problem:
      'Accurate calorie expenditure estimation is essential for fitness tracking, but conventional formulas often ignore multi-variate non-linear interactions between duration, heart rate, body temperature, and user biometrics.',
    approach:
      'Formulated an end-to-end regression pipeline utilizing XGBoost. Applied feature scaling, correlation analysis, and hyperparameter tuning to accurately forecast calories burned during physical activities.',
    outcome:
      'Achieved strong predictive accuracy and low error variance across test splits, packaged with an interactive user interface for instantaneous real-time prediction.',
    tags: ['Machine Learning', 'XGBoost', 'Python', 'Scikit-learn', 'Regression', 'Streamlit'],
    highlights: [
      'Engineered biometrics pipeline integrating duration, heart rate, and body temperature',
      'Employed XGBoost gradient boosted trees for superior regression accuracy',
      'Systematic cross-validation preventing overfitting on test partitions',
      'Interactive inference capability for instant parameter testing'
    ],
    metrics: [
      { label: 'Model', value: 'XGBoost Regressor' },
      { label: 'Task', value: 'Non-linear Regression' },
      { label: 'Features', value: 'Biometric & Activity Data' },
      { label: 'Pipeline', value: 'Scikit-learn + XGBoost' }
    ],
    isFeatured: true
  }
];
