import { TimelinePhase } from '../types';

export const timelineData: TimelinePhase[] = [
  {
    id: 'foundations',
    title: 'AI & ML Foundations',
    period: 'July – August 2025',
    description: 'Build solid foundations in mathematics, programming, and core AI/ML concepts.',
    color: 'bg-gradient-to-r from-blue-50 to-indigo-50',
    icon: 'foundation',
    tasks: [
      {
        id: 'linear-algebra',
        title: 'Complete Linear Algebra (Khan Academy/3Blue1Brown)',
        completed: false,
        description: 'Vectors, matrices, matrix multiplication, eigenvalues, eigenvectors, SVD',
        subtasks: [
          { id: 'la-1', title: 'Watch 3Blue1Brown Essence of Linear Algebra series', completed: false },
          { id: 'la-2', title: 'Complete Khan Academy Linear Algebra course', completed: false },
          { id: 'la-3', title: 'Practice matrix operations in Python/NumPy', completed: false },
          { id: 'la-4', title: 'Understand eigenvalues and eigenvectors', completed: false },
          { id: 'la-5', title: 'Learn Singular Value Decomposition (SVD)', completed: false }
        ]
      },
      {
        id: 'calculus',
        title: 'Learn Calculus fundamentals',
        completed: false,
        description: 'Derivatives, gradients, chain rule, partial derivatives',
        subtasks: [
          { id: 'calc-1', title: 'Master derivatives and differentiation rules', completed: false },
          { id: 'calc-2', title: 'Understand partial derivatives', completed: false },
          { id: 'calc-3', title: 'Learn chain rule for composite functions', completed: false },
          { id: 'calc-4', title: 'Practice gradient calculations', completed: false },
          { id: 'calc-5', title: 'Apply calculus to optimization problems', completed: false }
        ]
      },
      {
        id: 'probability-stats',
        title: 'Study Probability & Statistics',
        completed: false,
        description: 'Probability rules, distributions, Bayes theorem, expectation, variance, hypothesis testing',
        subtasks: [
          { id: 'prob-1', title: 'Learn basic probability rules and concepts', completed: false },
          { id: 'prob-2', title: 'Study common probability distributions', completed: false },
          { id: 'prob-3', title: 'Master Bayes theorem and applications', completed: false },
          { id: 'prob-4', title: 'Understand expectation and variance', completed: false },
          { id: 'prob-5', title: 'Learn hypothesis testing and p-values', completed: false }
        ]
      },
      {
        id: 'python-mastery',
        title: 'Master Python programming',
        completed: false,
        description: 'OOP, functional programming, recursion, error handling',
        subtasks: [
          { id: 'py-1', title: 'Master Python OOP concepts (classes, inheritance)', completed: false },
          { id: 'py-2', title: 'Learn functional programming in Python', completed: false },
          { id: 'py-3', title: 'Practice recursion and recursive algorithms', completed: false },
          { id: 'py-4', title: 'Implement proper error handling and exceptions', completed: false },
          { id: 'py-5', title: 'Write clean, Pythonic code following PEP 8', completed: false }
        ]
      },
      {
        id: 'data-structures',
        title: 'Learn Data Structures & Algorithms',
        completed: false,
        description: 'Arrays, stacks, queues, linked lists, trees, sorting algorithms, recursion',
        subtasks: [
          { id: 'dsa-1', title: 'Master arrays and dynamic arrays', completed: false },
          { id: 'dsa-2', title: 'Implement stacks and queues', completed: false },
          { id: 'dsa-3', title: 'Build linked lists (single, double, circular)', completed: false },
          { id: 'dsa-4', title: 'Learn trees (binary, BST, AVL)', completed: false },
          { id: 'dsa-5', title: 'Practice sorting algorithms (merge, quick, heap)', completed: false },
          { id: 'dsa-6', title: 'Solve 50+ LeetCode easy/medium problems', completed: false }
        ]
      },
      {
        id: 'numpy-pandas',
        title: 'Master NumPy & Pandas',
        completed: false,
        description: 'Practice using datasets, slicing, filtering, aggregating',
        subtasks: [
          { id: 'np-1', title: 'Learn NumPy array operations and broadcasting', completed: false },
          { id: 'np-2', title: 'Master Pandas DataFrames and Series', completed: false },
          { id: 'np-3', title: 'Practice data cleaning and preprocessing', completed: false },
          { id: 'np-4', title: 'Learn data aggregation and groupby operations', completed: false },
          { id: 'np-5', title: 'Work with real datasets (Kaggle/UCI)', completed: false }
        ]
      },
      {
        id: 'andrew-ng-course',
        title: 'Complete Andrew Ng\'s ML Course (Coursera)',
        completed: false,
        description: 'Cost functions, gradient descent, logistic regression, SVMs, weekly exercises',
        subtasks: [
          { id: 'ang-1', title: 'Complete Week 1-3: Linear Regression', completed: false },
          { id: 'ang-2', title: 'Complete Week 4-6: Logistic Regression & Neural Networks', completed: false },
          { id: 'ang-3', title: 'Complete Week 7-9: SVMs & Unsupervised Learning', completed: false },
          { id: 'ang-4', title: 'Complete Week 10-11: Large Scale ML & Applications', completed: false },
          { id: 'ang-5', title: 'Implement algorithms in Python (not just Octave)', completed: false }
        ]
      }
    ]
  },
  {
    id: 'projects',
    title: 'Hands-on Projects',
    period: 'September – October 2025',
    description: 'Apply your knowledge to build real AI/ML projects and showcase your skills.',
    color: 'bg-gradient-to-r from-green-50 to-emerald-50',
    icon: 'project',
    tasks: [
      {
        id: 'spam-classifier',
        title: 'Build Spam Email Classifier (Naive Bayes)',
        completed: false,
        description: 'Implement text classification using Naive Bayes algorithm',
        subtasks: [
          { id: 'spam-1', title: 'Collect and preprocess email dataset', completed: false },
          { id: 'spam-2', title: 'Implement text preprocessing (tokenization, stemming)', completed: false },
          { id: 'spam-3', title: 'Build Naive Bayes classifier from scratch', completed: false },
          { id: 'spam-4', title: 'Evaluate model performance (accuracy, precision, recall)', completed: false },
          { id: 'spam-5', title: 'Create web interface for testing', completed: false }
        ]
      },
      {
        id: 'house-price-prediction',
        title: 'Create House Price Prediction model (Linear Regression)',
        completed: false,
        description: 'Predict house prices using linear regression techniques',
        subtasks: [
          { id: 'house-1', title: 'Explore and clean housing dataset', completed: false },
          { id: 'house-2', title: 'Perform feature engineering and selection', completed: false },
          { id: 'house-3', title: 'Implement linear regression with regularization', completed: false },
          { id: 'house-4', title: 'Validate model using cross-validation', completed: false },
          { id: 'house-5', title: 'Deploy model with Flask/FastAPI', completed: false }
        ]
      },
      {
        id: 'image-classifier',
        title: 'Build Image Classifier (CNN)',
        completed: false,
        description: 'Create CNN using TensorFlow/Keras or PyTorch for image classification',
        subtasks: [
          { id: 'img-1', title: 'Choose dataset (CIFAR-10, Fashion-MNIST, or custom)', completed: false },
          { id: 'img-2', title: 'Design CNN architecture', completed: false },
          { id: 'img-3', title: 'Implement data augmentation techniques', completed: false },
          { id: 'img-4', title: 'Train model with proper validation', completed: false },
          { id: 'img-5', title: 'Optimize hyperparameters and evaluate results', completed: false }
        ]
      },
      {
        id: 'ml-chatbot',
        title: 'Develop ML-powered Chatbot (NLP)',
        completed: false,
        description: 'Create a conversational AI using natural language processing',
        subtasks: [
          { id: 'chat-1', title: 'Design conversation flow and intents', completed: false },
          { id: 'chat-2', title: 'Implement NLP preprocessing pipeline', completed: false },
          { id: 'chat-3', title: 'Build intent classification model', completed: false },
          { id: 'chat-4', title: 'Create response generation system', completed: false },
          { id: 'chat-5', title: 'Build web interface with real-time chat', completed: false }
        ]
      },
      {
        id: 'object-detection',
        title: 'Implement Object Detection with YOLO',
        completed: false,
        description: 'Build real-time object detection system using YOLO algorithm',
        subtasks: [
          { id: 'yolo-1', title: 'Study YOLO architecture and theory', completed: false },
          { id: 'yolo-2', title: 'Set up YOLO environment (YOLOv5/YOLOv8)', completed: false },
          { id: 'yolo-3', title: 'Train model on custom dataset', completed: false },
          { id: 'yolo-4', title: 'Implement real-time detection with webcam', completed: false },
          { id: 'yolo-5', title: 'Optimize for speed and accuracy', completed: false }
        ]
      },
      {
        id: 'recommendation-system',
        title: 'Create Recommendation System',
        completed: false,
        description: 'Build recommendation engine for products or playlists',
        subtasks: [
          { id: 'rec-1', title: 'Choose domain (movies, music, products)', completed: false },
          { id: 'rec-2', title: 'Implement collaborative filtering', completed: false },
          { id: 'rec-3', title: 'Build content-based filtering', completed: false },
          { id: 'rec-4', title: 'Create hybrid recommendation system', completed: false },
          { id: 'rec-5', title: 'Evaluate using appropriate metrics (RMSE, precision@k)', completed: false }
        ]
      },
      {
        id: 'learn-tools',
        title: 'Master ML Tools & Frameworks',
        completed: false,
        description: 'Git/GitHub, Jupyter Notebooks, Colab, Scikit-Learn, TensorFlow/PyTorch',
        subtasks: [
          { id: 'tools-1', title: 'Master Git workflows (branching, merging, rebasing)', completed: false },
          { id: 'tools-2', title: 'Set up professional GitHub profile', completed: false },
          { id: 'tools-3', title: 'Learn Jupyter Notebooks best practices', completed: false },
          { id: 'tools-4', title: 'Master Scikit-Learn for classical ML', completed: false },
          { id: 'tools-5', title: 'Choose and master either TensorFlow or PyTorch', completed: false }
        ]
      },
      {
        id: 'document-projects',
        title: 'Document all projects with clean code & README',
        completed: false,
        description: 'Maintain public repos with methodology, results, and demos',
        subtasks: [
          { id: 'doc-1', title: 'Write comprehensive README for each project', completed: false },
          { id: 'doc-2', title: 'Add code comments and docstrings', completed: false },
          { id: 'doc-3', title: 'Include dataset descriptions and sources', completed: false },
          { id: 'doc-4', title: 'Document methodology and results', completed: false },
          { id: 'doc-5', title: 'Create demo videos or screenshots', completed: false }
        ]
      }
    ]
  },
  {
    id: 'opensource',
    title: 'Open Source Contributions',
    period: 'November – December 2025',
    description: 'Begin contributing to open-source projects to build credibility and network.',
    color: 'bg-gradient-to-r from-purple-50 to-pink-50',
    icon: 'opensource',
    tasks: [
      {
        id: 'research-gsoc-orgs',
        title: 'Research AI-related GSoC organizations',
        completed: false,
        description: 'Browse GSoC Archive for ML, DL, Computer Vision, NLP projects',
        subtasks: [
          { id: 'research-1', title: 'Browse GSoC 2024 and 2023 organization list', completed: false },
          { id: 'research-2', title: 'Filter organizations by AI/ML focus', completed: false },
          { id: 'research-3', title: 'Study past project ideas and requirements', completed: false },
          { id: 'research-4', title: 'Create shortlist of 5-7 target organizations', completed: false }
        ]
      },
      {
        id: 'pick-orgs',
        title: 'Select 2-3 relevant organizations',
        completed: false,
        description: 'Choose orgs based on interest and skill level (TensorFlow, PyTorch, Scikit-learn, etc.)',
        subtasks: [
          { id: 'pick-1', title: 'Analyze organization tech stacks', completed: false },
          { id: 'pick-2', title: 'Assess project complexity vs your skill level', completed: false },
          { id: 'pick-3', title: 'Check organization activity and community size', completed: false },
          { id: 'pick-4', title: 'Make final selection of 2-3 organizations', completed: false }
        ]
      },
      {
        id: 'understand-repos',
        title: 'Study organization repositories',
        completed: false,
        description: 'Read CONTRIBUTING.md, existing issues, documentation',
        subtasks: [
          { id: 'repo-1', title: 'Read CONTRIBUTING.md and development setup', completed: false },
          { id: 'repo-2', title: 'Study codebase architecture and structure', completed: false },
          { id: 'repo-3', title: 'Browse open issues labeled "good first issue"', completed: false },
          { id: 'repo-4', title: 'Understand testing and CI/CD processes', completed: false }
        ]
      },
      {
        id: 'first-contributions',
        title: 'Make initial small contributions',
        completed: false,
        description: 'Fix typos, add documentation, refactor code',
        subtasks: [
          { id: 'first-1', title: 'Fix documentation typos or formatting', completed: false },
          { id: 'first-2', title: 'Add missing docstrings or comments', completed: false },
          { id: 'first-3', title: 'Improve code formatting or style', completed: false },
          { id: 'first-4', title: 'Add unit tests for existing functions', completed: false }
        ]
      },
      {
        id: 'meaningful-prs',
        title: 'Submit meaningful Pull Requests',
        completed: false,
        description: 'Communicate clearly, ask for help when needed',
        subtasks: [
          { id: 'pr-1', title: 'Fix actual bugs or implement small features', completed: false },
          { id: 'pr-2', title: 'Write clear PR descriptions and commit messages', completed: false },
          { id: 'pr-3', title: 'Respond to code review feedback promptly', completed: false },
          { id: 'pr-4', title: 'Follow up on merged PRs and learn from feedback', completed: false }
        ]
      },
      {
        id: 'build-reputation',
        title: 'Build reputation in communities',
        completed: false,
        description: 'Consistent contributions and community engagement',
        subtasks: [
          { id: 'rep-1', title: 'Join organization Discord/Slack channels', completed: false },
          { id: 'rep-2', title: 'Participate in community discussions', completed: false },
          { id: 'rep-3', title: 'Help other contributors with questions', completed: false },
          { id: 'rep-4', title: 'Attend virtual meetups or conferences', completed: false }
        ]
      }
    ]
  },
  {
    id: 'gsoc-prep',
    title: 'GSoC Application Prep',
    period: 'January – April 2026',
    description: 'Build a compelling application with a strong proposal and community engagement.',
    color: 'bg-gradient-to-r from-orange-50 to-red-50',
    icon: 'gsoc',
    tasks: [
      {
        id: 'study-proposals',
        title: 'Study past accepted GSoC proposals',
        completed: false,
        description: 'Understand structure of problem statements, timelines, and deliverables',
        subtasks: [
          { id: 'study-1', title: 'Find 10+ accepted proposals from target orgs', completed: false },
          { id: 'study-2', title: 'Analyze proposal structure and format', completed: false },
          { id: 'study-3', title: 'Note common elements in successful proposals', completed: false },
          { id: 'study-4', title: 'Identify what makes proposals stand out', completed: false }
        ]
      },
      {
        id: 'draft-proposal',
        title: 'Start proposal draft (Feb-Mar)',
        completed: false,
        description: 'Introduction, benefits, deliverables, timeline, personal experience',
        subtasks: [
          { id: 'draft-1', title: 'Write compelling project introduction', completed: false },
          { id: 'draft-2', title: 'Define clear project deliverables', completed: false },
          { id: 'draft-3', title: 'Create detailed 12-week timeline', completed: false },
          { id: 'draft-4', title: 'Highlight relevant experience and skills', completed: false },
          { id: 'draft-5', title: 'Explain benefits to the organization', completed: false }
        ]
      },
      {
        id: 'engage-mentors',
        title: 'Engage with potential mentors',
        completed: false,
        description: 'Join Discord/Slack, introduce yourself, share ideas early',
        subtasks: [
          { id: 'mentor-1', title: 'Introduce yourself in community channels', completed: false },
          { id: 'mentor-2', title: 'Share your project ideas for feedback', completed: false },
          { id: 'mentor-3', title: 'Ask thoughtful questions about projects', completed: false },
          { id: 'mentor-4', title: 'Build relationships through consistent interaction', completed: false }
        ]
      },
      {
        id: 'seek-feedback',
        title: 'Get proposal feedback from mentors',
        completed: false,
        description: 'Iterate and improve based on mentor suggestions',
        subtasks: [
          { id: 'feedback-1', title: 'Share draft proposal with mentors', completed: false },
          { id: 'feedback-2', title: 'Incorporate mentor feedback and suggestions', completed: false },
          { id: 'feedback-3', title: 'Clarify technical approach and feasibility', completed: false },
          { id: 'feedback-4', title: 'Adjust timeline based on mentor input', completed: false }
        ]
      },
      {
        id: 'refine-proposal',
        title: 'Refine proposal with feedback',
        completed: false,
        description: 'Get it reviewed by seniors or peers',
        subtasks: [
          { id: 'refine-1', title: 'Get proposal reviewed by experienced developers', completed: false },
          { id: 'refine-2', title: 'Proofread for grammar and clarity', completed: false },
          { id: 'refine-3', title: 'Ensure all requirements are addressed', completed: false },
          { id: 'refine-4', title: 'Create final polished version', completed: false }
        ]
      },
      {
        id: 'submit-application',
        title: 'Submit GSoC application before deadline',
        completed: false,
        description: 'Final submission with polished proposal',
        subtasks: [
          { id: 'submit-1', title: 'Prepare all required documents', completed: false },
          { id: 'submit-2', title: 'Submit applications to multiple organizations', completed: false },
          { id: 'submit-3', title: 'Double-check all submission requirements', completed: false },
          { id: 'submit-4', title: 'Submit well before the deadline', completed: false }
        ]
      },
      {
        id: 'track-progress',
        title: 'Use tracking tools throughout journey',
        completed: false,
        description: 'Notion/Trello for planning, blog progress on Medium/Hashnode',
        subtasks: [
          { id: 'track-1', title: 'Set up Notion/Trello for daily planning', completed: false },
          { id: 'track-2', title: 'Write weekly progress blog posts', completed: false },
          { id: 'track-3', title: 'Share journey on Twitter/LinkedIn', completed: false },
          { id: 'track-4', title: 'Document lessons learned and tips', completed: false }
        ]
      }
    ]
  }
];