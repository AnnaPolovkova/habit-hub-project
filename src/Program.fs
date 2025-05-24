module Program

open Elmish
open Elmish.React
open Feliz
open Browser.Dom
open Model
open Update
open View
open Api

let init () =
    match loadState() with
    | Some savedState -> savedState
    | None -> Update.init()

let subscribe (model: Model) =
    [ fun dispatch ->
        Browser.Dom.window.addEventListener("storage", (fun _ ->
            match loadState() with
            | Some state -> dispatch CheckAchievements
            | None -> ()
        ))
    ]

Program.mkSimple init Update.update rootView
|> Program.withReactBatched "app"
|> Program.run