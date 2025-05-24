module Update

open System
open Model

type Msg =
    | NavigateTo of Page
    | UpdateTitle of string
    | UpdateDescription of string
    | UpdateTarget of string
    | AddHabit
    | DeleteHabit of HabitId
    | MarkHabitDone of HabitId * DateTime
    | ToggleDarkMode
    | NoOp

let init () : Model =
    {
        Habits = []
        CurrentPage = Home
        NewHabitForm = {
            Title = ""
            Description = ""
            Target = ""
            Error = None
        }
        DarkMode = true
    }

let validateHabit (title: string) (description: string) (target: string) : Result<int, string> =
    if String.IsNullOrWhiteSpace(title) then
        Error "Title cannot be empty"
    elif String.IsNullOrWhiteSpace(description) then
        Error "Description cannot be empty"
    else
        match Int32.TryParse(target) with
        | true, n when n > 0 -> Ok n
        | _ -> Error "Target must be a number greater than 0"

let update (msg: Msg) (model: Model) : Model =
    match msg with

    | NavigateTo page ->
        { model with CurrentPage = page }

    | UpdateTitle title ->
        let updatedForm = { model.NewHabitForm with Title = title }
        { model with NewHabitForm = updatedForm }

    | UpdateDescription desc ->
        let updatedForm = { model.NewHabitForm with Description = desc }
        { model with NewHabitForm = updatedForm }

    | UpdateTarget target ->
        let updatedForm = { model.NewHabitForm with Target = target }
        { model with NewHabitForm = updatedForm }

    | AddHabit ->
        let form = model.NewHabitForm
        match validateHabit form.Title form.Description form.Target with
        | Ok target ->
            let newHabit: Habit = {
                Id = Guid.NewGuid()
                Title = form.Title
                Description = form.Description
                TargetPerWeek = target
                Progress = []
                CreatedAt = DateTime.UtcNow
            }
            {
                model with
                    Habits = newHabit :: model.Habits
                    NewHabitForm = {
                        Title = ""
                        Description = ""
                        Target = ""
                        Error = None
                    }
            }
        | Error msg ->
            let formWithError = { form with Error = Some msg }
            { model with NewHabitForm = formWithError }

    | DeleteHabit habitId ->
        let updatedHabits = model.Habits |> List.filter (fun h -> h.Id <> habitId)
        { model with Habits = updatedHabits }

    | MarkHabitDone (habitId, date) ->
        let updatedHabits =
            model.Habits
            |> List.map (fun h ->
                if h.Id = habitId then
                    if h.Progress |> List.exists (fun d -> d.Date = date.Date) then
                        h
                    else
                        { h with Progress = date :: h.Progress }
                else h)
        { model with Habits = updatedHabits }

    | ToggleDarkMode ->
        { model with DarkMode = not model.DarkMode }

    | NoOp -> model
