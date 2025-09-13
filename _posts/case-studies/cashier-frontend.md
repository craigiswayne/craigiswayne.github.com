# Cashier Frontend

## AIM
To create a single project that can be tested and modular

This project should include:
1. Cashier Frontend for use by players
2. Health Check endpoints


----

# NOTES

### Scaffolding

#### Guard Clauses


### TODO
[ ] Think of Quick Deposit, thats gonna be coming soon!
[ ] app-shell
  * https://angular.io/guide/app-shell
  * https://developers.google.com/web/fundamentals/architecture/app-shell
[ ] Test Resolver for Coin Start
  [ ] Needs to log to logger service in the event of an error
  [ ] Needs http interceptor for this error
  [ ] redirect to single error screen -> maybe this is where the logger will kick in?
[ ] SSR to maybe pre-render the initial app load? (https://www.youtube.com/watch?v=4tTxrQ2YiFA)
[ ] Should load theme before showing anything in the cashier
[ ] Load time should be really quick
[ ] Should show the player if they're offline or not
  [ ] Service Worker?
[ ] Should log to elk
[ ] Guard clauses to prevent unnecessary access
[ ] minimal use of cookies
[ ] clear cookies upon logout or destroy or what not
[ ] all api request to use normal http
[ ] reusable error and success screens
[ ] GIST: `loaderUntil` directive, which is like an `ngIf` but shows a loader if the value is not present
[ ] interception of all requests and then redirect to a single error screen
[ ] a warning screen
[ ] a successful result screen
[ ] dont forget about tracking
[ ] no bootstrap
[ ] unit tests for alles
[ ] 100% code coverage
[ ] PWA Support
[ ] Kitchen Sink for Components
[ ] Health Check Endpoint
[ ] [Lazy Loaded Modules](https://angular.io/guide/lazy-loading-ngmodules)
[ ] Singular Skin Config
  [ ] SkinID
  [ ] SkinName
  [ ] Bede / RIDE / Stride
  [ ] External config
  [ ] Enabled
[ ] APM Handler Zone
  * instead of this flow....
    * Cashier initiates APM Deposit
    * Cashier emits event
    * Skin opens url, provided by event, in a popup
    * Player performs transaction
    * APM redirects to COIN
    * COIN redirects to skin
    * Skin detects that it is a url with a response
    * Skin closes popup and opens main skin window with response params
    * Skin opens cashier with response params
  * do this flow
    * Cashier initiates APM Deposit
    * REMOVE: Cashier emits event
    * NEW: Cashier opens url in a popup
    * Player performs transaction
    * APM redirects to COIN
    * CHANGE: COIN redirects to a cashier URL
    * CHANGE: Cashier detects that it is a url with a response from COIN
    * CHANGE: Cashier closes popup and opens main cashier window with response params
    * This is what is used in mecca bingo: see `window.opener`
    ```
      void 0 !== a.Status && null !== window.opener && (window.opener.postMessage({
      cashierEvent: U_,
      url: "".concat(window.location.pathname).concat(window.location.search)
      }, "*"),
      window.close())
    ```

----

# Kitchen Sink

## Components
1. Cashier Layout
2. Info Panel
   1. Deposit Limits Info Panel
   2. Fast Withdrawals Panel
   3. Can support an icon
   4. Can collapse
3. Cashier Buttons
   1. Amount Buttons Tile
4. List Item for:
   1. Manage Payment methods
   2.
