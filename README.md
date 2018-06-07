# fdes λ
[Discrete event simulation (DES)](https://en.wikipedia.org/wiki/Discrete_event_simulation) created with
[Ramda](https://github.com/ramda/ramda).

### Background
#### Motivation & explored alternatives
Among dozens of existing commercial and open-source [DES solutions listed on Wikipedia](https://en.wikipedia.org/wiki/List_of_discrete_event_simulation_software), only one library is written in the JavaScript language (last updated 2016).

Recent years saw the rise in the development and availability of powerful distributed web applications, tools, and paradigms.

Notably in the world of the web's native language JavaScript, the [functional programming paradigm](https://en.wikipedia.org/wiki/Functional_programming) has continued to evolve tools that mitigate or entirely avoid unpredictable behavior tolerated by traditional software systems by eliminating side effects. This results in [referentially transparent](https://en.wikipedia.org/wiki/Referential_transparency) code that some developers find easier to build, maintain, and reason about. One such tool is Ramda.

#### Why Ramda?
One of the primary distinguishing features of Ramda, as stated on [ramdajs.com](https://ramdajs.com/) (retrieved 2018-06-07):
> Ramda emphasizes a purer functional style. Immutability and side-effect free functions are at the heart of its design philosophy. This can help you get the job done with simple, elegant code.

When applied to the domain of DES, Ramda creates the possibility of modeling simulations in contemporary distributed web applications with a simple, expressive interface while harnessing the power of recursion and immutability in a [deterministic state machine](https://en.wikipedia.org/wiki/Finite-state_machine). This library aims to realizes Ramda's potential to bring DES modeling within reach of contemporary web developers.

Aside from a pseudo-random number generator, [Ramda is this library's _only_ production dependency](https://github.com/Stassi/fdes/compare/develop#diff-b9cfc7f2cdf78a7f4b91a753d10865a2R13).

## Testing
Behavior-driven development (BDD) unit tests are powered by Chai and Mocha, and can be issued by running this command:

```
npm test
```
