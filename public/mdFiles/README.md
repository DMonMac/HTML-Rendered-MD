## **[![React](https://user-images.githubusercontent.com/29721601/31213521-a275572e-a9d9-11e7-929d-1d854b01d279.png "React")](https://facebook.github.io/react/) Horns and Moos**

This is a Bulls and Cows game under a different name.

Here's the app in action: https://horns-and-moos.herokuapp.com/

### HOW TO PLAY
**Guess** the **number** or **word**.

These **clues** will help you:

- **Horns**: Digit/Letter is **present** and in its **correct position**.
- *Moos*: Digit/Letter is *present* but is in the *wrong position*.

**Each letter/digit** will be **counted only once**. It will be checked as a **Horn first** (if it is a Horn), *then as a Moo* (if it is a Moo).

You can **change** the number of **digits/letters** before playing.

The **Word Version** can only generate a **limited** number of **words per month**. It may not generate a word when you play it.

But hey, at least there's the **Number Version**, right?

#### Example
Number: ***5 4 9 2***

Guess | Result
----- | ------
 1 *2* 3 *4* | 0 Bulls, 2 *Cows*
 **5** 6 7 8 | 1 **Bull**, 0 Cows
 **5** *2* 3 *4* | 1 **Bull**, 2 *Cows*
 **5** *9* *4* **2** | 2 **Bulls**, 2 *Cows*
 **5** **4** **9** **2** | 4 **Bulls**, 0 Cows
