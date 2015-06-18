# Gnargus
_$hredin the gnargus_

If any of this is unclear, ask me to post hypothetical code samples.

We assume our `data` are objects contained in an array.

## Cleaner
A collection of methods that cleans data passed to us by the API.

### Filter: Missing
Remove missing data. Obviously, I need to make the API spit out a consistent format for missing data... so I'll work on that. Right now both the empty string and "na" count as missing.

### Filler: Class Years
Loops between the min and max class year and fills in missing class years with `0`s for the y-value.

### Filler: Dates
Loops between the min and max dates in a dataset and fills in proper default values.

### Location Data _optional_
Fuzzily groups locations. This should really be handled server-side, so only tackle if you're genuinely interested in NLP-ish stuff.

## Transformer
This should be a collection of methods that transforms data and adds fields to each datum clientside. 
* Growth percentages
* Cumulative counts

## Insighter
This should provide descriptive and prescriptive analysis of our data.

This will be highly domain specific, so we'll have to tackle it on a case-by-case basis.

Nevertheless, I know we'll want a chi-squared test. So that would be fun.

## Guesser
I'll handle this one.

## Kompressor (TM)
Comes at later times!