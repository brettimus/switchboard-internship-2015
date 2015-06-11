# Fake Data
_Because what's even real, you know?_

## What's going on
Last weekend, I mocked up a new version of our dashboard for higher ed clients. [You can see an example here.](https://reed.shrimpbird.com/insights). (I gave you login credentials over Slack, come see me if you can't find them.)

This mockup serves two purposes
* We can get feedback on the interface _before_ we have to build anything.
* Erik, our sales-afficionado, **can show this mockup to prospects to get them excited.**

## The problem
As it stands, the mockup could do more to serve the second bullet point above.

You see, I got lazy in crafting my random-data-generating functions. 
In fact, on a call with Oberlin yesterday (a wonderful, wonderful client),
Maya'an (who heads up the Oberlin SB) spotted the inaccuracy of the data 
immediately.

We don't want prospects distracted by the thought of "well that's clearly not true". 
We want to make the mockup align with how Erik sells the product 
(which is in turn based on the data we have for other higher ed clients).

## What we need
We need functions that spit out "random" data that look like they came from 
one of our thriving SBs.

### Class Year

Right now, I'm bootstrapping (how apropo!) some random normal (i.e., Gaussian) data.
It gives the graph a bell-curve shape, but that's insufficient.

We want to demonstrate a high percentage of new-alumni and current-student users. 
(This more accurately reflects the typical switchboard.)

One possible solution to this is to shift the normal curve 
so that its mean is somewhere around next year's graduating class.

To get you started, here's the code I'm currently using:

** Dependencies ** 
Note this code relies on d3. See the comments on how to use it in your project.

```javascript
// note we're using d3, 
// to get access to d3, 
// run `npm install --save d3` 
// and place `var d3 = require("d3")` into your project file
function randomData(a, b) {
    var mean = (a+b)/2, // you'll probably want to translate this
        sd = (b-a)/6, // display +/- 3 std devs worth of data, over 99% of our sampled data 
        normal = d3.random.normal(mean, sd), 
        result = [],
        data = bootstrap(3000, normal);
        // console.log(data);
    for (;a <= b; ++a) {
        result.push({
            year: a,
            count: data[a] || 0,
        });
    }
    return result;
}

function bootstrap(n, f) {
    var i = 0,
        tmp,
        result = {};
    for (;i<=n; ++i) {
        tmp = Math.floor(f());
        if (!result[tmp]) result[tmp] = 0;
        result[tmp]++;
    }
    return result;
}
```


## Monthly and Aggregate Growth
We want to show growth of users over time and by month. 
For the monthly growth chart, I'm just generating uniform random data in the range [12, 57]. 
This suffices, but if you have better ideas, I'll listen.

For aggregate growth, I'm not doing anything. I could use your help, rly.

** Dependencies ** Note this code relies on [moment.js](http://momentjs.com/). 
You'll have to `npm install --save moment` and `require` it in your project files accordingly.

_Note the format of the data!! Please keep this format in your own function._

```javascript
// monthly growth chya right

function fakeData() {
    var result = [];

    var to = new Date(),  // today's date
        from = new Date(to); // a copy of today's date

        from.setYear((1900+from.getYear())-1); // the `1900` thing is because javascript dates are dummbbbbbb.

        // loop through each month until the current one.
        while (from <= to) {
            result.push({
                date: moment(from).format(), // puts the date into a predictable format (UTC) that our charting function likes a lot
                count: Math.floor(Math.random()*56 + 12)
            });
            from.setMonth(from.getMonth() + 1);
        }
    return result;
}
```

## Good luck!
Call me if you need anything.
