module Program

open Elmish
open Elmish.React
open Feliz
open Browser.Dom
open Model
open Update
open View

Program.mkSimple init update rootView
|> Program.withReactBatched "app"
|> Program.run