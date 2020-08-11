Which hook to use?


1. Can it wait till after the view is ready?

1. Do you need to respond to changes in the component tag inputs?
-> yes? ngOnChanges



ngOnChanges
* triggered when: input attributes are changed on a component
* runs before: ngOnInit
* frequency: whenever a change happens on the input attributes
* order: 1

ngOnInit()

ngDoCheck()

ngAfterContentInit()

ngAfterContentChecked()

ngAfterViewInit()

ngAfterViewChecked()
* Called Multiple Times

ngOnDestroy

### Resources:
1. https://angular.io/guide/lifecycle-hooks
1. https://codecraft.tv/courses/angular/components/lifecycle-hooks/
1. https://pusher.com/tutorials/lifecycle-hooks-angular
1. https://itnext.io/understanding-angular-life-cycle-hooks-91616f8946e3
1. https://www.freecodecamp.org/news/angular-lifecycle-hooks/
1. https://alligator.io/angular/lifecycle-hooks/
1. https://v2.angular.io/docs/ts/latest/guide/lifecycle-hooks.html
