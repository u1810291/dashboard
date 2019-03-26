```js
const questions = [
  {
    summary: 'How will Mati verify my users?',
    details: `
Mati is flexible enough so that you can select the right amount of layers of verification for your company.

Here is the extensive list of features we offer :

* Liveness. Make sure that the user in front of the camera is real, and not a piece of paper
* Face match. Confirm that the documents belong to that user going through the verification flow
* Document authenticity. Verify that the documents have not been modified. Most fraudsters change the  picture or the text on the document.
* Document OCR. We annotate the document for you.
`
  },
  {
    summary: 'Is Mati secure?',
    details: `
**In short, yes it is**. In fact, the lack of security in most of the applications we use today is the reason we built Mati.

We strongly believe the only path forward in securing our digital lives is to lift this responsibility away from users and put it on the technology around us. As we see it, security is either missing altogether or too frustrating to use.

That is why we tried to minimize the difficulty and make Mati easy to use, but keep security as the highest priority.We use highly secure cryptographic methods to secure your data at Mati. All of your sensitive data is encrypted using standards-based crypto-algorithms.

Unlike proprietary algorithms, standards-based algorithms have gone through public scrutiny by industry and security experts that reduces the chance of any inherent weaknesses or vulnerabilities.We also continuously make the best effort to secure our servers online and client applications locally.
`
  },
  {
    summary: 'Which countries do you support?',
    details: `
Our product is built so that we support documents from any country around the world, as long as the document has latin alphabet on it.  
Which means most countries in Europe, United States, Latin America, Australia, etc…  
We do not support Mandarin, Hindu, etc… yet.
  `
  }
]
;<Faq questions={questions} />
```
