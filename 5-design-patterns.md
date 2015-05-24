# N design patterns you might actually use (where N < 10)
Go to the original wiki [Portland Pattern Repository](http://c2.com/cgi/wiki)
Takeaway: Get a copy of the [GOF design pattern book](https://en.wikipedia.org/wiki/Design_Patterns).
[Full video here](http://confreaks.tv/videos/cascadiaruby2014-n-design-patterns-you-might-actually-use-where-n-is-10)

## Template
http://c2.com/cgi/wiki?TemplatePattern

### What it is
Outline for similar task
### Examples
#### ETL
A.k.a. [Extract Transform Load](https://en.wikipedia.org/wiki/Extract,_transform,_load)
Common in data warehousing.
* Think of how models work in an MVC framework.
* Reports

### Recognizing when to use Template
**Several objects that are mostly the same**
You have a basic process, but some steps are different sometimes.
E.g., one report pulls from two data sources, the rest only pull from one.
E.g., one report is emailed to one person, the rest go to list.

### Pros
* Share common code
* Isolate differences
* Easy to add new versions
* Forces common algorithm (could also be Con)

### Cons
* Read multiple files to find out what’s going on.
* Inheritance, which can be a pain
* Inheritance, which can be a huge pain

## Strategy
http://c2.com/cgi/wiki?StrategyPattern
### What it is
The polymorphic algorithm. Lets you change the algorithm at runtime.

Like doing an “Extract Algorithm” ???

You can add all strategies to a hash and call them accordingly.

* Step 1
* Step 2
* Choose strategy
* Step 4

### Examples
#### Storage
You run a social network where people can share media.
Don’t store that media on app server in production. You request it from the cloud.
But in development you store media locally for testing. 
You must pick strategy to store locally or not when the app is running. 
#### Stock Market
Different investing strategies for market conditions or market cap.
#### Sales Tax
Different places have different sales tax.

### Recognizing
**Process is the same except for Step 3**
Lots of branching around one step inside an algorithm.

### Pros
* Share common code
* Isolate differences
* Easily add new strategies
* Force common interface
* Avoid inheritance

### Cons
* Read multiple files
* Harder to follow in source (no idea what strategies are in place at runtime)
* Can be lots of data
* Must have same interface 

## Composite
http://c2.com/cgi/wiki?CompositePattern
### What it is
Common interface for one or many things.
Let consumers ignore quantity of objects they’re dealing with.
**Component** Something that all must implement.

### Examples
#### Task Management
Most support atomic tasks, but also allow sub-tasks. But all tasks support `done` method.
#### HTML
#### Test Scores
Must be able to report test scores at multiple levels (individual, classroom, school, district, state, national)
All levels have (avg) score.

### Recognizing
**Hierarchical Objects**
When you have to perform a similar action or computation on one or a lot of _something_. 

Trees of arbitrary depth.

### Pros
* Common interface
* Arbitrary Depth
* Insert in the middle of hierarchy without much hassle
* No messy Ifs

### Cons
* Harder to follow in source (no idea what class the thing that’s being computed is)
* Performance - dont’ know how long you’ll be computing
* Must remember hierarchy

## Decorator
http://c2.com/cgi/wiki?DecoratorPattern
### What it is
A way to extend an instance of an object.
Wrapper that adds functionality to existing instances.

### Examples
#### Browser Window
Display stuff. Want to add scroll bar if there’s overflow on page.
#### Coupons
Wrap shopping cart with no sales tax, BOGO, etc.
#### RPG Characters
Decorate character with extra strength, golden wolfe, etc

### Recognizing it
**Sometimes need an enhancement**
Add functionality to object, but only want to add it *sometimes*.

### Pros
* Change behavior dynamically
* Customize an instance
* Supports Nesting multiple attrs

### Cons
* Offloading pain to consumers (frequently used when you don’t know how people will use parts of interface)
* Multiple files
* Many decorators -> unpredictable behavior

## Command
http://c2.com/cgi/wiki?CommandPattern
### What it is
Objectified closure
Object containing algorithm and the context in which to run that algorithm.

### Examples
#### Delayed Job
Wrapping up data, something to do to it. 
#### Drawing Apps
Do, Undo
#### Active Record Migrations
Up, Down
Context is database

### Recognizing it
**Undo delay or delegate**
Need an undo.
Delaying an action.
Delegation

### Pros
* Undo and Redo
* Offload, queue, distribute, delegate
* Simple to understand
* Encourages good design - forces you to make tiny units of functionality that you can reuse.

### Cons
* Overused
* YAGNI - You aren’t gonna need it