# Data science

### Table of contents
- [Prompt Engineering](#prompt-engineering)
- [AI Engineer roadmap](#ai-engineer-roadmap)
- [Natural Language Processing (NLP)](#natural-language-processing-nlp)
- [Text pre-processing techniques for NLP](#text-pre-processing-techniques-for-nlp)
- [Natural Language Understanding (NLU)](#natural-language-understanding-nlu)

<br/>
<br/>
<br/>

### Prompt Engineering

https://platform.openai.com/docs/guides/prompt-engineering

<br/>


### AI Engineer roadmap

1. [CS fundamentals](../ComputerScience/README.md), [Networking fundamentals](../Networking/README.md), [DSA](https://github.com/Poojavpatel/dsa)
1. [Python (Advance)](../Python/README.md)
1. [Databases](../Databases/README.md)
1. Numpy, Pandas, data visualization
1. Math and Statistics
1. Exploratory data analysis (EDA)
1. Machine Learning 
    1. Preprocessing
    1. Model building
1. MLOps
    1. Fast API (or flask)
1. Deep learning
    1. Neural networks
    1. CNN, RNN, LSTM
1. NLP 
1. Computer Vision
1. LLM and LangChain

<br/>
<br/>
<br/>


## Natural Language Processing (NLP)

NLP, or Natural Language Processing, is a field of artificial intelligence (AI) that deals with the interaction between computers and human language.  Its goal is to get computers to understand, interpret, and even generate human language in its various forms,  including text, speech, and handwriting.

NLP combines a bunch of different techniques from various fields like computer science, linguistics, and statistics.

Here's a quick overview of what NLP involves:
* Understanding Language: This involves tasks like breaking down sentences into grammatical structures (syntax) and understanding the meaning of words (semantics).

* Machine Learning: NLP heavily relies on machine learning algorithms to train models on large amounts of text data. These models can then be used for various tasks like classification, translation, or sentiment analysis.

* Generating Text: NLP can also be used to create human-like text. This could be for tasks like writing chatbots, summarizing text, or even creative writing.


Real-world usecases
* Language translation: Google Translate and other similar applications use NLP to translate text from one language to another.

* Spam filtering: Email providers use NLP to identify and filter out spam messages.

* Voice assistants: Siri, Alexa, and Google Assistant all use NLP to understand your spoken commands and respond accordingly.

* Search engines: NLP helps search engines understand your search queries and provide more relevant results.

**NLP Stages**

1. Text Pre-processing
This stage involves cleaning the raw text data and getting it ready for further processing.  Techniques like stop word removal, stemming, lemmatization, normalization all fall under this stage.

1. Feature Engineering
After the text is clean, we need to convert it into a format that a machine learning model can understand. This could involve techniques like TF-IDF to identify important keywords, or creating N-grams to capture short phrases.

1. Modeling
This is where the magic happens! Here, you choose and train a machine learning model on your pre-processed and engineered text data. The type of model you choose depends on your specific NLP task. For instance, you might use a classification model for sentiment analysis or a recurrent neural network (RNN) for machine translation.

1. Evaluation
Once your model is trained, you need to evaluate its performance. This usually involves testing the model on unseen data and measuring its accuracy on the intended task.

1. Deployment
Finally, if your model performs well, you can deploy it for real-world use! This could involve integrating it into an application, like a chatbot, or using it for automated tasks like text classification.


Example: Imagine you're building a system to analyze customer reviews and categorize them as positive, negative, or neutral.
* Pre-processing: You would start by cleaning the reviews. This might involve removing punctuation, converting everything to lowercase, and removing stop words.
* Feature Engineering: You might then use TF-IDF to identify the most important words in positive and negative reviews.
* Modeling: You could train a machine learning classifier to identify the sentiment of new reviews based on the presence of these keywords and other features.
* Evaluation: You would test your model on unseen reviews to see how well it can correctly classify them.
* Deployment: If your model performs well, you could integrate it into a system that automatically categorizes customer reviews for further analysis.

**Splitting data for training and testing**
80/20 is a common rule of thumb for splitting data into training and testing sets for machine learning tasks

* 80% Training Data: This larger portion of your data is used to train the machine learning model. The model learns patterns and relationships within the data to make predictions.

* 20% Testing Data: This is unseen data that the model hasn't been exposed to during training. It's used to evaluate the model's generalizability and performance on new data.

* While the 80/20 split is a good starting point, the ideal ratio can vary depending on several factors

* Random Splitting: When splitting your data, ensure it's done randomly. This prevents the model from being biased towards certain patterns that might be present in a specific portion of the data.

* Stratified Splitting: If your data has different classes (e.g., positive and negative sentiment in reviews), you might want to use stratified splitting. This ensures the training and testing sets have a similar proportion of classes, preventing bias towards the majority class.


<br/>




### Text pre-processing techniques for NLP

* Stop Word Removal   
Stop words are very common words in a language (like "the," "a," "an") that don't carry much meaning on their own. Stop word removal removes these words from the text before analysis.

* Stemming   
Stemming reduces a word to its base or root form. For example, "running," "runs," and "ran" would all be stemmed to "run."    
It's faster and computationally less expensive than lemmatization.   
However, stemming can be quite aggressive and sometimes create incorrect or nonsensical words. For example, stemming "running" might result in "run" which is accurate. But stemming "playing" might result in "play" which loses the past participle tense.

* TF-IDF (Term Frequency-Inverse Document Frequency)   
TF-IDF assigns a weight to each word in a document or corpus (collection of documents). This weight reflects how important a word is for that specific document compared to the entire collection   
It helps identify keywords that are important for a particular document and downplays common words that appear everywhere. This is useful for tasks like information retrieval, where you want to find documents most relevant to a specific query.   

* Normalization   
This is a broad term encompassing various techniques that aim to standardize text data into a consistent format. This can include
    * Lowercasing: Converting all text to lowercase to remove case sensitivity.
    * Punctuation Removal: Removing punctuation marks like commas, periods, etc. This can be helpful depending on your task, but punctuation can sometimes convey meaning.
    * Accent Removal: Removing diacritics (accents) from characters. This can be useful for consistency, especially when dealing with text from multiple languages.

* N-Grams   
This technique involves creating sequences of N words that appear together in your text. For example, bigrams (sequences of 2 words) and trigrams (sequences of 3 words) can capture short phrases that might be informative for your task. This can be helpful for tasks like sentiment analysis where understanding word combinations can provide more context.

* Lemmatization   
stemming can sometimes create nonsensical words. Lemmatization is a more advanced technique that tries to identify the actual dictionary form (lemma) of a word. This can be more accurate than stemming but can also be computationally expensive for large datasets.   
Lemmatization ensures the resulting word is a valid word in the language and retains its grammatical meaning. For example, lemmatizing "running" would also result in "run" (preserving the verb form) and lemmatizing "played" would result in "play" (preserving the past participle tense).

<br/>
<br/>

## Natural Language Understanding (NLU)

This is a subfield of NLP that specifically focuses on understanding the meaning behind human language. It goes beyond the surface level of processing words and grammar, aiming to grasp the intent and deeper meaning conveyed. 

> Consider NLP like turning a written sentence into a machine-readable format. NLU would then be like interpreting that formatted data and understanding the intended meaning behind the words.

**NLU techniques**

* Intent recognition: Identifying the purpose or goal behind a user's utterance (e.g., placing an order, asking a question).

* Entity recognition: Extracting specific entities from text, like names, locations, or dates.

* Sentiment analysis: Understanding the emotional tone of a piece of text (positive, negative, neutral).

**NLU Stages**

While there's some overlap with NLP stages (especially pre-processing), NLU stages put more emphasis on understanding the meaning and intent behind the text. Techniques like coreference resolution and discourse analysis are specific to NLU and not typically used in general NLP tasks.

1. Text Pre-processing     
This initial stage is similar to NLP and involves cleaning the raw text data. Techniques like removing punctuation, converting to lowercase, and potentially stemming/lemmatization can be used here.

1. Tokenization and Normalization   
Here, the text is broken down into smaller units (words or tokens) and further normalized. This might involve things like:
    * Part-of-Speech (POS) Tagging: Assigning a grammatical tag (noun, verb, adjective) to each word can help understand the sentence structure.
    * Named Entity Recognition (NER): Identifying and classifying named entities like people, organizations, locations, etc.

1. Semantic Analysis   
This stage goes beyond the surface level and aims to understand the meaning of the text. Techniques used here include:

    * Sentiment Analysis: Determining the emotional tone of the text (positive, negative, neutral).
    * Discourse Analysis: Analyzing the relationships between words and sentences to understand the overall message and context.
    * Coreference Resolution: Identifying and linking pronouns or referring expressions back to the entities they refer to in the text.

1. Intent Recognition   
This stage focuses on identifying the goal or purpose behind a user's utterance.  For instance, is the user asking a question, placing an order, or making a complaint? Techniques like machine learning algorithms trained on labeled data are used for this task.