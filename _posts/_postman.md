## Intro
This experiment is to just engage people and get them thinking out of the box.

It demonstrates a simple CRUD example in real life with some tests.

You'll need 8 people.

-------------------------------------------------------------------------------

### Instructions
It doesn't matter if you are unable to complete the task.

It's part of the exercise.

1. Place 2 pencils in the clear box
1. CREATE -> give emil an additional pen to place in the clear box
1. READ -> adrian whats the color of the pen i just gave emil?
1. UPDATE -> jan could you remove a cap from the pink pen
1. DELETE -> luca could you remove a pen from the basket?
1. HONOURABLE TESTING -> Jameson count the number of pencils
1. NEGATIVE TESTING -> Julian try add a ruler to the box
1. NEGATIVE TESTING -> ruvaun remove the cap from the purple pen
1. NEGATIVE TESTING -> monique, i want you to levitate and then grab all the pens from the box
1. JOURNEY TESTING -> vicky get me the pen that jan touched, does it have a cap?

What's important to note that the pens in the box are just pens in the box,

But with Actions, we've created a sort of real life API

-------------------------------------------------------------------------------

## API Basics in our everyday on the Web
Browsing the web, for the most part is just a bunch of get requests done by the user.

When you go to `https://www.google.com` you expect to see Google's Homepage.
This sort of request is a simple `GET` Request.

If you've ever submitted a form on the web, chances are it was a `POST` request.
Think of it as posting a message to our ultra reliable post office.

-------------------------------------------------------------------------------

## Postman Basics

So I'm not planning on going through all Postman's capabilities.
This is just to quickly demonstrate how we use Postman in our space.
Just so this information is not silo'd.

### Why and Why should we use it?
As with anything, there are many ways to achieve what you're set out to do.

For example you could style a page using just javascript.

```javascript
var darkModeThemeClass = 'letsGoDark';
document.body.classList.toggle(darkModeThemeClass);

var styleID = 'myDarkModeStyles';
var darkModeThemeStyle = null;
if( darkModeThemeStyle = document.querySelector(`style#${styleID}`) ){
    darkModeThemeStyle.parentNode.removeChild(darkModeThemeStyle);
}

darkModeThemeStyle = document.createElement('style');
darkModeThemeStyle.innerText = '';
darkModeThemeStyle.id = styleID;
darkModeThemeStyle.innerText += `body.${darkModeThemeClass}{background-color:#0c0c0c!important} `;
darkModeThemeStyle.innerText += `body.${darkModeThemeClass} a, body.${darkModeThemeClass} a *, body.${darkModeThemeClass} svg{color:white!important} `;

document.body.appendChild(darkModeThemeStyle);
```

This is just unnecessary, as you know you could easily use a stylesheet to achieve the same thing

```css
body.letsGoDark{
  background-color: #0c0c0c !important;
}

body.letsGoDark a,
body.letsGoDark a *,
body.letsGoDark svg {
  color:white !important;
}
```

and even better with sass

```css
body.letsGoDark{
  background-color: #0c0c0c !important;

  a,
  a *,
  svg {
    color:white !important;
  }
}
```


Similarly you could use curl or javascript requests in the bash terminal, but obviously doing assertions on this is not

```sh
curl https://www.google.com
```

Postman is available in our environment which allows us to do so much with APIs.

-------------------------------------------------------------------------------

## Postman Abilities

### Talk to APIs, Request, Send Information
Simple enough, call API's, Send information to API's

### Examine Data
Sometimes we're unsure of what the data is or how it's structured.

So we call an API to examine what we're dealing with.

Call at the following API `https://api.github.com/users/craigiswayne`

This first URL contains general info about my presence on github.

Additionally it contains links to more specific info on my github presence such as my followers or my repositories on github.

1. https://api.github.com/users/craigiswayne/followers
1. https://api.github.com/users/craigiswayne/repos


### Document APIs and Share APIs
In Postman you can ofcourse document APIs. You can also share this information.
1. Using Postman Teams (currently unavailable at DOS)
1. Exporting the Collection (this is how we use it currently)

So currently we export Collections and save it to our repos.

This way it's version controlled and anyone with access to the repo can view it.

> Something to note though, since the version you have in Postman is not linked to the Collection in the Repository, make sure you have the latest version from the repo before making changes.

### Testing
There are a few quick things we can quickly analyse and or test, namely:

#### Response Times
* we can firstly figure out if a request completes in a timely manner
* if it's longer than expected, we can figure out where the bottlenecks are by examining the response time data

#### Integrity of data - SCHEMA
Usually with we just check if a response is successful.

But what actually makes a response successful?

What happens if i inject dirty data?

Schema Validation helps us test API Data that comes back.

Schema Validation, in its basic form outlines the expected structure of an object.

TODO: Insert link to the schema validation

Go to: `https://api.github.com/users/craigiswayne`

Say we wanted to check the data type of the `hireable` property of this user:

we'd do something along the lines of:

```
const schema = {
    type: "object",
    properties: {
        "hireable": { type: "boolean" }
    }
};
const json = pm.response.json();

const Ajv = require('ajv'),
ajv = new Ajv();
pm.test('Schema is valid', () => {

    const validate = ajv.compile(schema);
    const validationResult = validate(json);
    pm.expect(validationResult).to.be.true;
});

```

You'll notice now that there is a green dot icon on the Test Results tab.

Clicking on this will show you the tests written for this Request.

You'll see that our only test is passing...

Try change "boolean" to false to see the fail... (DO THIS to Show whats the error)


#### Integrity of data - HONOURABLE
This is just a term i came up with, it could be a thing, iruno...

Basically, it means that if i request something, is the response responding according to what I've requested.

For example if I want bicycles, don't send me trains. Similarly, if I want 10 results, don't send me 11 etc

An Example of this could be would be requesting 5 Nerd Jokes

#### Integrity of data - NEGATIVE TESTS
When we build API's we wanna make them resilient right?
And resilience is not just defined by load, we also want them to respond appropriately when bad data is sent to it

SEE: Negative Tests in Promotions in CDC API Tests v2

#### Integrity of data - DATA JOURNEY TESTS
In our systems, our data follows a journey.... from Cape Town to IOM...

We want to test that sort of thing....

Currently we have some tests that will test the different states of a Promotion...

SEE: Promotions Test in CDC v2

### Continuous Integration / Continuous Delivery (Pipeline Integration)
As you all know, Postman Checks are currently run in our pipeline...

[EXERCISE] Who can guess the number of tests that are run in the pipeline?

Answer will be shown later...

So why do we do this? We do this so that it's a quick for us to run tests on our APIs only...

It's a very top level test that we can run straight after deployment to monitor the services.

This is especially important to monitor that External APIs are still functioning properly.

For example, with the continuous changes in Atom and Nucleus, we need to ensure that the way they talk to each other is always OK.

It's basically a first line of defence after deployment. Well at least for me.

### Reporting
It's all good and well that these tests run in the pipeline... Well what about a visual indicator?

So there's two:
1. Command Line Output
1. Reporting

TODO: Show an example of how to view the Report

### Visualizations
Postman has this nifty tool for showing data in a Friendly manner.

At it's most basic level, it allows you to use an HTML Template to display your data.

TODO: Add link for MRI Response

> Resource Document: https://learning.postman.com/docs/postman/sending-api-requests/visualizer/
> Resource Video: https://youtu.be/i1jU-kivApg?t=22

-------------------------------------------------------------------------------

## How To: Add a Test to our current Collection
Go to the most updated and stable branch (dev for cdc and master for atom)
  1. TODO LINKS HERE
  1. TODO LINKS HERE

Navigate to the Postman Folder.

There should only be 1 collection json file in there.

Import the json file.

Add your request and your tests.

Run your tests locally on your own machine... also make sure they're passing before continuing

Export the collection to the same place you got the file from... overwrite it.

And then check in your changes the way you normally would.

Submit your merge request, and get an Angel to sign it off for you and merged in.

-------------------------------------------------------------------------------

## How To: Read Errors

So there's a couple of issues that can arise from Postman Integrations.

Most common is the Response Time took longer....

This could be due to the fact that the service is not "warm" enough.

You know how when you try to open snipping tool, it sometimes takes a while, but thereafter it's a lot quicker...

Similar for APIs... Simply re-run the request and it should be fine.

If it's not, then your request is not meeting the testing standards...

Another reason is due to the lack of data on the environment.

For example when you create a feature branch of cdc, you're creating a new environment for that branch.

That environment won't have data, just ask adrian....
TODO DEMO THIS WITH CRITERIA...

In this instance, you'll have to add in data from another environment.

Typically you'd wanna take data from green, blue or dev, in that order.

TODO ADD EXAMPLES HERE OF COMMONS ERRORS

-------------------------------------------------------------------------------

## Where to From here:

There are still loads of untested APIs, at least not documented.

I would like to run checks all the way through to IOM.

I would like to query elastic, the API is there, but Cape Town needs alot more attention.

I would like to ease our debugging process, for example, a user is not getting his Daily Deal... and all we have is a username

1. We could query LobbyLoader to get the Player Key
1. We could then query events coming from Surge
1. We could then query events logged by us

All with 1 request...

If you still have questions, please shout, i'll be more than happy to answer them and then i'll update the document.

TODO: Include GitHub Example attachment
