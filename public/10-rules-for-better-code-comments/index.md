---
title: "The only 10 rules for better code comments"
date: '2024-09-13'
desc: 'Rule 1: Comments should not duplicate the code. Rule 2: Good comments do not excuse unclear code.'
thumbnail: 'thumbnail.webp'
---

As famous MIT professor Hal Aberson once said

> Programs must be written for people to read and only incidentally for machines to execute. -Hal Aberson

While he may understate the importance of a running code. He is spot on regarding writing a code for human to read. 
The code we write has 2 different audience, human and machine. Machines will ignore comments and as long as the syntaxes
are correct, then machines will understand each lines of code equally easy. As for us, humans, it is harder for us to
understand certain parts of the code, and often we find comments to make sense of them.

While you may find tremendous resources on writing better codes, few are focused on writing better comments.
It is hard to measure the quality of code comments. And as you might have encountered before, a bad comment is worse than
no comment at all.

As [Peter Vogel has written](https://visualstudiomagazine.com/articles/2013/07/26/why-commenting-code-is-still-bad.aspx):
1. Writing & maintaining comments is an expense.
2. Compiler doesn't check comments, there is no way to know that it is correct.
3. You are, on the other hand, are guaranteed that the machine will execute the code as written.

While the above statement might have some truth, It would be a mistake to never write a single comment in the code.
Here are some rules so that you can reach a happy medium.

#### Rule 1: Comments should not duplicate the code.
#### Rule 2: Good comments do not excuse unclear code.
#### Rule 3: If you can't write a clear comment, there may be a problem with the code.
#### Rule 4: Comments should dispel confusion, not cause it.
#### Rule 5: Explain unidiomatic code in comments.
#### Rule 6: Provide links to the original source of copied code.
#### Rule 7: Include links to external references where they will be most helpful.
#### Rule 8: Add comments when fixing bugs.
#### Rule 9: Use comments to mark incomplete implementations.

The rest of this articles  will discuss the implementation of these rules. Explain why and how we use them.
