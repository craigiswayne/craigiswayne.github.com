
## Verdict
* Although an interesting product, the draw card to incisor, i.e. the templates, is only available in the top tier paid version
  * that version costs 700, which includes 5 seats
* Incisor seems like a POTENTIALLY great product in the future, but it is very immature at the moment
  * just looking at the support channels they mention, the oldest posts are from september 2024

* The ui in incisor is not as friendly as godot's
  * if the plan is to have a workflow that integrates the design team, incisor will prove to be very difficult as it is a much more technical product
  * I have found that not ALL changes in the incisor editor will update the code base

All in all, i think it was a good exercise to at least investigate the possibilities of what can be achieved

Learning a new product depends heavily on documentation and community involvement

Incisor is lacking documentation / examples with real life scenarios

Their support / forums is still growing, and there aren't a ton of posts

My recommendation is that we stick with Godot

------

|                                                    | GODOT         | INCISOR                                |
|----------------------------------------------------|---------------|----------------------------------------|
| Runs in                                            | Desktop app   | Web App in Browser                     |
| Different Runtime configs                          | x             | y                                      |
| Language                                           | GDScript / C# | javascript / typescript                |
| API Calls                                          | y             | y (using fetch)                        |
| Built in Engine Events                             | y             | y                                      |
| Custom Defined Events                              | y             | [1] y                                  |
| Global files                                       | y (autoload)  | ?x                                     |
| Events can be defined in a separate file           | y             | x                                      |
| Game Theming support                               | y             | x                                      |
| Localization Support                               | y             | ?x                                     |
| Deleting objects in Scene via Editor, updates code | y             | x                                      |
| Renaming objects in Scene via Editor, Updates code | y             | y                                      |
| Switch scenes dynamically                          | y             | ?                                      |
| Supports plugins                                   | y             | [3] ?x                                 |
|                                                    | Open Source   | Proprietary                            |
| PROs                                               |               | [2] Leverage the power of js & browser |

* [1] INCISOR: when you define a custom event, its writes to the IncisorAPI.js file
    * this is interesting cause its updating its own api
    * it's a workaround for auto-completion

* [2] INCISOR
  * although it is javascript, you cannot seem to use external files via imports
  * however this might be solved with typescript, will need to test this

* [3] INCISOR: Plugins / Modules
  * there are ways to import additional functionality
  * but this is all done in the ui
  * and it looks like its modules built by incisor
  * there is no "plugin marketplace" as such


* INCISOR: Multiple Projects
  * minor inconvenience but when you're working on multiple projects
  * you cannot tell which project is which when navigating by tabs on the browser,
  * the favicon is missing from the editor

* INCISOR: Documentation
  * poor, its literally just the comments in the API file, presented in a UI format
  * generated similarly to how swagger generates its documentation
  * there are only 11 tutorials
  * tutorials are a little basic
