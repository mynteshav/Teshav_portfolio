"""
Static portfolio data source mirroring the verified content from Teshav Sharma's portfolio.
Can be queried by frontend clients or exported as JSON.
"""

PROFILE_DATA = {
    "name": "Teshav Sharma",
    "wordmark": "TS.",
    "eyebrow": "AI & MACHINE LEARNING ENGINEER IN PROGRESS",
    "headline": "Building intelligent systems that turn data into decisions.",
    "supportingText": (
        "I'm Teshav Sharma, an MCA student specializing in AI and Data Science. "
        "I build machine learning applications, experiment with LLMs and RAG pipelines, "
        "and turn ideas into practical AI-powered products."
    ),
    "location": "Jaipur, India",
    "email": "teshavsharma74@gmail.com",
    "githubUrl": "https://github.com/mynteshav",
    "linkedinUrl": "https://www.linkedin.com/in/teshavds/",
    "resumeUrl": "/Teshav_Sharma_Resume.pdf",
    "opportunitiesStatus": "Actively open to AI/ML internships and entry-level engineering roles",
    "bioNarrative": [
        "I am an aspiring AI Engineer currently pursuing a Master of Computer Applications (MCA) specializing in Artificial Intelligence and Data Science at JECRC University, following a Bachelor of Computer Applications (BCA) completed at Poornima University in 2024.",
        "My focus centers on the full lifecycle of intelligent systems: from exploratory data analysis and predictive modeling to architecting Retrieval-Augmented Generation (RAG) pipelines and deploying containerized microservices.",
        "I prioritize grounded engineering over hype—building reliable APIs with FastAPI, experimenting with local and frontier LLMs, tuning Scikit-learn and XGBoost regression workflows, and turning complex datasets into clear, actionable decision-making tools."
    ],
    "focusAreas": [
        {
            "title": "Generative AI & RAG",
            "description": "Engineering contextual retrieval architectures using LangChain, sentence transformers, vector stores (Chroma, FAISS), and Ollama for reliable domain knowledge extraction.",
            "icon": "Brain"
        },
        {
            "title": "Machine Learning Pipelines",
            "description": "Designing end-to-end regression and classification models using Scikit-learn and XGBoost, with robust cross-validation, feature engineering, and metric evaluation.",
            "icon": "Cpu"
        },
        {
            "title": "Production Backend & APIs",
            "description": "Wrapping machine learning models and LLM agents into performant FastAPI endpoints, validated with Pydantic and containerized with Docker for seamless integration.",
            "icon": "Layers"
        },
        {
            "title": "Data Intelligence & Analytics",
            "description": "Uncovering multi-dimensional market signals and metrics with SQL, Pandas, Seaborn, and interactive Power BI dashboards powered by custom DAX formulas.",
            "icon": "BarChart3"
        }
    ]
}

PROJECTS_DATA = [
    {
        "id": "ai-career-intelligence",
        "title": "AI Career Intelligence Platform",
        "category": "Generative AI",
        "description": "An AI-powered career guidance platform that matches resumes with job descriptions, identifies relevant skills, and generates personalized skill-gap recommendations.",
        "problem": "Job seekers often struggle to identify exact keyword alignment and skill gaps when targeting specific technical job descriptions, leading to low match rates and unfocused upskilling.",
        "approach": "Engineered an NLP and embedding-based resume-to-role matching system. Implemented a RAG pipeline using LangChain and Ollama to retrieve relevant contextual career benchmarks, producing tailored upskilling roadmaps and step-by-step role preparation.",
        "outcome": "Built a complete end-to-end prototype featuring a responsive Streamlit UI, a decoupled FastAPI backend with Pydantic validation, and Docker containerization for portable execution.",
        "tags": ["Generative AI", "RAG", "LangChain", "Ollama", "FastAPI", "Streamlit", "Docker", "NLP"],
        "highlights": [
            "NLP-based skill and keyword extraction from unstructured resumes",
            "Vector embedding similarity matching between candidate profiles and job descriptions",
            "RAG pipeline utilizing LangChain with local Ollama LLM integration",
            "LLM-generated contextual career explanations and actionable learning roadmaps",
            "Decoupled system architecture: Streamlit frontend, FastAPI backend, Dockerized container"
        ],
        "architectureDetails": [
            "Resume Parser: Extracts text, extracts candidate skill set using NLP tokenization",
            "Vector Store & Retriever: Computes embeddings and retrieves role requirements",
            "RAG Pipeline: LangChain orchestrator querying local Ollama instance for skill gap analysis",
            "FastAPI Microservice: Exposes RESTful endpoints for analysis and roadmap generation",
            "Docker Packaging: Isolated reproducible environment for fast local and server deployment"
        ],
        "isFeatured": True,
        "demoUrl": "https://ai-career-intelligence-platform-aouhoykvy2e7z59j2ht6qz.streamlit.app/",
        "githubUrl": "https://github.com/mynteshav"
    },
    {
        "id": "flipkart-pricing-strategy",
        "title": "Flipkart Product Pricing Strategy",
        "category": "Machine Learning",
        "description": "A machine learning project that estimates product prices and explores pricing patterns using multi-feature regression modeling.",
        "problem": "E-commerce marketplaces feature dynamic pricing across thousands of items with non-linear relationships between brand, rating, category, and retail discounts.",
        "approach": "Processed and cleaned a dataset of approximately 5,000 product rows. Performed categorical encoding, missing value imputation, outlier handling, and trained a Random Forest regression model with hyperparameter tuning.",
        "outcome": "Delivered end-to-end data preparation, model training, and diagnostic evaluation, achieving a reported R² score of 0.61 and a root mean squared error (RMSE) of approximately ₹26,402.",
        "tags": ["Machine Learning", "Python", "Scikit-learn", "Random Forest", "Pandas", "Feature Engineering"],
        "highlights": [
            "Cleaned and preprocessed ~5,000 Flipkart e-commerce product records",
            "Conducted rigorous exploratory data analysis (EDA) to detect pricing outliers and discount trends",
            "Trained Random Forest regressor with cross-validated hyperparameter search",
            "Evaluated predictions with standard statistical metrics (R² and RMSE)",
            "Documented feature importance revealing highest price-determining product attributes"
        ],
        "metrics": [
            {"label": "Dataset Size", "value": "~5,000 Rows"},
            {"label": "Algorithm", "value": "Random Forest"},
            {"label": "R² Score", "value": "0.61"},
            {"label": "Reported RMSE", "value": "₹26,402"}
        ],
        "isFeatured": True,
        "githubUrl": "https://github.com/mynteshav/Flipkart-product-pricing/blob/main/flipkart-product-pricing-strategy-using-regression.ipynb"
    },
    {
        "id": "powerbi-job-market-dashboard",
        "title": "Power BI Job Market Dashboard",
        "category": "Analytics",
        "description": "An interactive business intelligence dashboard exploring job-market dynamics, compensation bands, and in-demand skills.",
        "problem": "Tech market job seekers and talent analysts face fragmented compensation and requirement data across different geographies and seniority tiers.",
        "approach": "Aggregated and transformed approximately 14,200 job postings. Engineered relational data models in Power BI and formulated custom DAX measures for median salaries, location distributions, and demand indices.",
        "outcome": "Produced an interactive, multi-view dashboard offering real-time slicing by location, required technical stack, salary quartiles, and company size.",
        "tags": ["Power BI", "DAX", "Data Analytics", "Business Intelligence", "Data Modeling", "Excel"],
        "highlights": [
            "Transformed and normalized ~14,200 tech job postings with Power Query",
            "Designed star-schema relational model connecting job attributes, locations, and compensation",
            "Authored custom DAX KPIs for dynamic salary percentiles and geographical hiring intensity",
            "Created interactive cross-filtering dashboards for recruiter and applicant exploration"
        ],
        "metrics": [
            {"label": "Data Scale", "value": "~14,200 Postings"},
            {"label": "Analysis Type", "value": "Salary & Role Trends"},
            {"label": "KPI Engine", "value": "Custom DAX"},
            {"label": "Platform", "value": "Power BI"}
        ],
        "isFeatured": True,
        "githubUrl": "https://github.com/mynteshav/Job-Market-Salary-Trends-Dashboard-Power-BI-/blob/main/images/screenshot_dashboard.PNG"
    },
    {
        "id": "predict-calorie-expenditure",
        "title": "Predict Calorie Expenditure",
        "category": "Machine Learning",
        "description": "A predictive machine learning application using an XGBoost regression pipeline to estimate caloric burn based on biometric and exercise metrics.",
        "problem": "Accurate calorie expenditure estimation is essential for fitness tracking, but conventional formulas often ignore multi-variate non-linear interactions between duration, heart rate, body temperature, and user biometrics.",
        "approach": "Formulated an end-to-end regression pipeline utilizing XGBoost. Applied feature scaling, correlation analysis, and hyperparameter tuning to accurately forecast calories burned during physical activities.",
        "outcome": "Achieved strong predictive accuracy and low error variance across test splits, packaged with an interactive user interface for instantaneous real-time prediction.",
        "tags": ["Machine Learning", "XGBoost", "Python", "Scikit-learn", "Regression", "Streamlit"],
        "highlights": [
            "Engineered biometrics pipeline integrating duration, heart rate, and body temperature",
            "Employed XGBoost gradient boosted trees for superior regression accuracy",
            "Systematic cross-validation preventing overfitting on test partitions",
            "Interactive inference capability for instant parameter testing"
        ],
        "metrics": [
            {"label": "Model", "value": "XGBoost Regressor"},
            {"label": "Task", "value": "Non-linear Regression"},
            {"label": "Features", "value": "Biometric & Activity Data"},
            {"label": "Pipeline", "value": "Scikit-learn + XGBoost"}
        ],
        "isFeatured": True
    }
]

SKILLS_DATA = [
    {
        "id": "gen-ai",
        "name": "Generative AI & LLMs",
        "description": "Frameworks, vector databases, and retrieval architectures for intelligent assistant systems.",
        "icon": "Sparkles",
        "skills": [
            "LLMs",
            "Retrieval-Augmented Generation (RAG)",
            "Prompt Engineering",
            "Embeddings",
            "LangChain",
            "Hugging Face",
            "Ollama",
            "FAISS",
            "ChromaDB"
        ]
    },
    {
        "id": "ml",
        "name": "Machine Learning",
        "description": "Statistical modeling, algorithmic regression, clustering, and performance validation.",
        "icon": "GitBranch",
        "skills": [
            "Scikit-learn",
            "Regression",
            "Classification",
            "Clustering",
            "Random Forest",
            "XGBoost",
            "CatBoost",
            "Model Evaluation"
        ]
    },
    {
        "id": "dl-nlp",
        "name": "Deep Learning & NLP",
        "description": "Architectures for sequence modeling, vector representations, and semantic text processing.",
        "icon": "Network",
        "skills": [
            "Neural Networks",
            "TensorFlow",
            "PyTorch",
            "Transformers",
            "Tokenization",
            "TF-IDF",
            "Sentence Transformers",
            "Sentiment Analysis",
            "NLTK"
        ]
    },
    {
        "id": "programming-data",
        "name": "Programming & Data Engineering",
        "description": "Core languages and scientific computation libraries for data manipulation and analysis.",
        "icon": "Terminal",
        "skills": [
            "Python",
            "SQL",
            "MySQL",
            "NumPy",
            "Pandas",
            "Matplotlib",
            "Seaborn"
        ]
    },
    {
        "id": "backend-deployment",
        "name": "Backend & Deployment",
        "description": "Service frameworks, schema validation, containerization, and modern version control.",
        "icon": "Server",
        "skills": [
            "FastAPI",
            "Flask",
            "Streamlit",
            "Pydantic",
            "Docker",
            "Git",
            "GitHub"
        ]
    },
    {
        "id": "analytics",
        "name": "Business Intelligence & Analytics",
        "description": "Exploratory data analysis, KPI visualization, and business intelligence dashboards.",
        "icon": "BarChart2",
        "skills": [
            "Power BI",
            "DAX",
            "Excel"
        ]
    }
]

EXPERIENCE_DATA = [
    {
        "id": "exp-codeclause",
        "role": "Data Science Intern",
        "company": "CodeClause",
        "location": "Remote",
        "period": "Jun 2023 – Jul 2023",
        "description": [
            "Designed and executed a customer segmentation analysis using K-Means clustering, leveraging data from over 1 million mall visitors.",
            "Created interactive visualizations using Matplotlib and Seaborn, enabling a 10% boost in targeted marketing efficiency.",
            "Performed efficient data preprocessing using Pandas and NumPy, reducing data handling time by 30%."
        ],
        "technologies": ["Python", "K-Means Clustering", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn"]
    },
    {
        "id": "exp-response-infoway",
        "role": "Application Developer Intern",
        "company": "Response Infoway",
        "location": "Jaipur, India",
        "period": "May 2023 – Jul 2023",
        "description": [
            "Engineered an object detection system using Python and OpenCV, reducing detection latency by 15%.",
            "Collaborated with cross-functional teams using Git for version control and efficient development workflows.",
            "Optimized SQL queries for application data retrieval and processing, improving data handling efficiency by 10%."
        ],
        "technologies": ["Python", "OpenCV", "SQL", "Git", "Computer Vision"]
    }
]

EDUCATION_DATA = [
    {
        "id": "edu-jecrc",
        "degree": "Master of Computer Applications (MCA)",
        "field": "Artificial Intelligence & Data Science",
        "institution": "JECRC University",
        "period": "Jul 2025 – Present",
        "status": "In Progress",
        "cgpa": "CGPA: 8.52 / 10.00",
        "highlights": [
            "Advanced coursework in Machine Learning, Deep Learning, Natural Language Processing, and Generative AI",
            "Hands-on research and engineering with LLMs, RAG frameworks, and neural network optimization"
        ]
    },
    {
        "id": "edu-poornima",
        "degree": "Bachelor of Computer Applications (BCA)",
        "field": "Computer Applications",
        "institution": "Poornima University",
        "period": "Aug 2021 – Jul 2024",
        "status": "Completed",
        "cgpa": "CGPA: 7.36 / 10.00",
        "highlights": [
            "Core foundations in Computer Science, Database Management Systems (DBMS), and Data Structures",
            "Object-Oriented Programming, algorithmic problem solving, and Python programming foundations"
        ]
    }
]
