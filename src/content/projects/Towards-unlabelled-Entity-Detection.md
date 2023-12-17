---
title: "Towards-unlabelled-Entity-Detection"
description: "A named entity recognition system that is flexible and domain-independent by generating labels based on confidence scores. The model, a finetuned Roberta, can identify potential named entities and be customized to fit the needs of various tasks and applications through monitoring and fine-tuning. A Flask app is provided for visualisation."
image: "/images/projects/Towards-unlabelled-Entity-Detection/Overview.png"
tags: 
- domain-independent-design
- large-language-models
- named-entity-recognition
- roberta
- semi-supervised-learning
- transformer
created_at: 2021-10-05T16:41:23Z
updated_at: 2023-01-07T17:05:15Z
date: 2023-01-07T17:05:15Z
html_url: "https://github.com/TGDivy/Towards-unlabelled-Entity-Detection"
forks_count: 0
stargazers_count: 1
size: 905
watchers_count: 1
---

# Towards Semi Supervised Named Entity Recognition

## Overview

Named Entity Recognition can be very useful to perform downstream tasks like classification, increase efficiancy for search algorithms, build powerful content recommendation systems or browse through information quickly!

Despite so many use cases, most NER are very dependent on labelled data. This often restricts building these systems to domains of already existing datasets.

This project aims to build a system capable generating labels based on confidence scores to identify potential entities, and more importantly named entities. 

This flexibility, then allows us to further monitor, generate data and finetune to our domain specific use cases. 

**Note:** because what is important in each domain, or to each indivisual is unique depending on the task they are trying to solve, it's not wise to remove the domain dependent nature of this task. Hence, this project aims to generate these labels instead.

---

### About the model

It uses a pretrained Roberta, which is then finetuned on various NER datasets. Moreover, the finetuning is done in a way to capture the underlying distribution of the entities present and represent them on a scale between **0-300**.

For more **training details** refer to ```important_words/``` directory, and [Training Notebook](important_words/Noun%20Detector%20Train.ipynb)

#### Simple Flask app for visualization

I built a simple Flask app for visualization of system, and illustate it better. To run the app, please install the dependencies, and run app.py file.

```
pip install -r requirements.txt 
python app.py
```

Note: the **minimum score field** as the input, setting this field will help filter out entities with repsect their importance.

The idea is to finetune this model based on user preference/ task to denote the importance in a particular context.

![Overview](/images/projects/Towards-unlabelled-Entity-Detection/Overview.png)

## Minimum Score set to 10

![Low Score](/images/projects/Towards-unlabelled-Entity-Detection/LowScore.png)

## Minimum Score set to 220

![High Score](/images/projects/Towards-unlabelled-Entity-Detection/HighScore.png)
