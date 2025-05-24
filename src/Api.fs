module Api

open Fable.Core.JsInterop
open Thoth.Json
open System
open Model

let private encodeHabitCategory (cat: HabitCategory) =
    match cat with
    | Health -> Encode.string "Health"
    | Productivity -> Encode.string "Productivity"
    | Learning -> Encode.string "Learning"
    | Personal -> Encode.string "Personal"
    | Other s -> Encode.string s

let private decodeHabitCategory =
    Decode.string 
    |> Decode.andThen (function
        | "Health" -> Decode.succeed Health
        | "Productivity" -> Decode.succeed Productivity
        | "Learning" -> Decode.succeed Learning
        | "Personal" -> Decode.succeed Personal
        | s -> Decode.succeed (Other s))

let extraCoders =
    Extra.empty
    |> Extra.withDecimal
    |> Extra.withCustom encodeHabitCategory decodeHabitCategory

let saveState (model: Model) =
    Browser.WebStorage.localStorage.setItem(
        "habitTrackerState",
        Encode.Auto.toString(4, model, extra = extraCoders)
    )

let loadState () : Model option =
    match Browser.WebStorage.localStorage.getItem("habitTrackerState") with
    | null -> None
    | json ->
        match Decode.Auto.fromString<Model>(json, extra = extraCoders) with
        | Ok t -> Some t
        | Error err ->
            printfn $"Ошибка при декодировании: {err}"
            None