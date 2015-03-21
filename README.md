# Net Worth Calculator

Networth Calculator. A default name.

We are building this project as a way to learn Node.js web development and also to convert our "10 Year Plan" Networth Calculator spreadsheet to a more robust platform.

## Project Goals:
First, this project will start by building a standard "Takehome Paycheck Calculator". This will include Federal and State Income Taxes, Medicare and Social Security Taxes, 401k deductions, and medical and disability premium payments. Single, Virginia taxpayer will be built first. Additional filing statuses and states will be added after that. 

### Current Status:
  - Federal Income Tax, Social Security, Medicare Tax should work for all filing statuses
  - Federal Standard Deduction and Personal Exemption should work for all filing statuses.
  - State Income Tax should work for Virginia, and states starting with A-C.
  - State Standard Deduction and PE should work for Virginia, Colorado, Alaska, and Alabama.
  - Rudimentary handling for 401k/Retirement deductions exists.

## Assumptions and Challenges:
  - States with no income tax will be treated as if they have a single tax bracket of 0% for each filing status. They will also be given explicit standard deductions and personal exemptions of 0 for each filing status.
  - Some states have a Phase Out for Deductions/Exemptions. I don't know how this will be handled yet.
  - Some states (California) have bizarre tax situations. It is very likely that discrepencies will behave unexpectedly. Please create a bug for these situations so that I can account for the differences.

## Known Issues:
  - Known issues should be tracked in the github issue tracker. Please make a new issue when needed.

## Future Plans:
  - After the paycheck calculator is complete, we will add functionality for the remaining 10 year plan features. 
  - Once all existing features have been incorporated, we'd like to build fancy graphs and other visualizations.
  - I would also like to integrate with http://payoff.io/ to support importing/exporting data between here and there. I'm not sure how this would work, or what it would accomplish, but I think it would be cool.


## Developer Requirements

### [Heroku Toolbelt](https://toolbelt.heroku.com)
[Link Project with existing directory](http://stackoverflow.com/questions/5129598/how-to-link-a-folder-with-an-existing-heroku-app) - To maniuplate Heroku instance
```
cd [project directory]
heroku git:remote -a networth
```

### [Postgres.app](http://postgresapp.com) - To provide psql command line database tool.
Configure [Command Line Tools](http://postgresapp.com/documentation/cli-tools.html)
```
vim ~/.bash_profile
export PATH=$PATH:/Applications/Postgres.app/Contents/Versions/9.4/bin
```
