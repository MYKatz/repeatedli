## **This was a project for nwHacks 2019!**
Check out the devpost for more: https://devpost.com/software/repeated-li/edit

## Inspiration

After watching a few lectures from education/neuroscience professors and doing some research on memorization techniques, we knew we wanted to create an educational hack at nwHacks. After taking a quick survey of our friends, we found that the vast majority of people struggle with learning foreign languages. Upon reading many blog posts from polyglots, we found that the most common piece of advice was to learn as much vocabulary as possible.

The theory behind our extension is the practice of 'spaced repetition', more specifically the "Pimsleur's graduated-interval recall" method, which maps the time spent between each fact's repetition to a roughly exponential function (2 mins, 10 mins, 60 mins, 300 mins, 1440 mins, ...). Inspired by this method, we elected to use a neural network to customize this function for each user based on their previous performance, creating a truly personalized learning experience.

## What it does

It replaces new tabs with a minimalist flashcard space, designed to be as unintrusive as possible. The user initially selects a language and a concentration, currently limited to verbs, adjectives and nouns. The program then generates a list of words and translations, which the user can modify at will. The list of words is then displayed initially according to previously proven patterns, optimized upon for each user by a basic deep neural network deployed on StdLib. In other words, while you learn with repeated.li, repeated.li also learns from you! Quizzes are generated after enough words are shown enough times to demonstrate mastery and to provide feedback for the ML model.

## How we built it

With StdLib, Microsoft Azure, JavaScript, HTML, CSS and lots of caffeine. We wanted to design our project to be as modular as possible, with different parts clearly separated and easily updated.

Azure cognitive services were the foundation on which we built our project. Notably, we utilize the Azure translator text API to enable our users to learn from a wide variety of languages. In addition, all of our userdata and datasets for our neural network are stored in an Azure Cosmos DB instance. In the future, we hope to use Azure to expand our featureset even more - text-to-speech is on our radar! We also tinkered a bit with the Azure ML studio but ultimately didn't have the time to explore it fully.

Our entire backend API was developed with the use of StdLib. We really appreciated how easy StdLib made it to develop, test, and deploy our code. To fully utilize StdLib's functionality, we exposed a public endpoint that enables anyone to create a custom vocab list for our extension. As well, as mentioned before, we used Brain.js on top of StdLib to train basic neural networks that optimized the parameters in each user's 'spacing algorithm' that determines the amount of time between each repetition.

## Challenges we ran into

Despite StdLib making building a back-end far easier than before, processing complicated POST and GET requests still turned out to be a challenge, with many things parsing in obtuse and unexpected ways. The speed of our code also turned out to be a small issue, as a slow load time would completely negate the goal of utilizing the new tab page. This was solved by loading in cards in the background, thus making new tabs load as fast as usual.

## Accomplishments that we're proud of

This project was one of many 'firsts'. This was the first browser extension that either of us created, the first time we used Azure, and the first time Gary worked on front-end. We're glad we have a functional, useful project at the end of it!

## What we learned

A ton! We learned the basics of Azure, how to create a serverless API with StdLib, the basics of neural networks with Brain.js, and how to create a Chrome extension. As well, we inadvertently learned a few new French vocab words in the process of testing our application! 

## What's next for repeated.li

We hope to polish this up a bit and actually release it on Product Hunt, Hacker News, reddit, etc. We also think it would be beneficial to continue developing integrations/potential partnerships with other edtech apps with open APIs such as Quizlet. Of course, we hope to eventually expand to subject areas beyond languages, such as history and biology, while keeping in mind our goal of maximal return for minimal effort (on the user's part!!).