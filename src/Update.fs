module Update

open System
open Model

type Msg =
    | NavigateTo of Page
    | UpdateTitle of string
    | UpdateDescription of string
    | UpdateTarget of string
    | UpdateCategory of string
    | AddHabit
    | DeleteHabit of HabitId
    | MarkHabitDone of HabitId * DateTime
    | UnmarkHabitDone of HabitId * DateTime
    | ToggleDarkMode
    | ChangeStatsTimeRange of TimeRange
    | FilterByCategory of HabitCategory option
    | CheckAchievements
    | ToggleReminder of HabitId
    | NoOp

let validateHabit (title: string) (description: string) (target: string) : Result<int, string> =
    if String.IsNullOrWhiteSpace(title) then
        Error "Title cannot be empty"
    elif String.IsNullOrWhiteSpace(description) then
        Error "Description cannot be empty"
    else
        match Int32.TryParse(target) with
        | true, n when n > 0 -> Ok n
        | _ -> Error "Target must be a number greater than 0"

let calculateStreak (progress: DateTime list) =
    if List.isEmpty progress then 0
    else
        let sorted = progress |> List.sortDescending
        let rec loop currentStreak (dates: DateTime list) =
            match dates with
            | [] -> currentStreak
            | [_] -> currentStreak + 1
            | d1::d2::rest ->
                if d1.Date = d2.Date.AddDays(1.0) then
                    loop (currentStreak + 1) (d2::rest)
                else
                    currentStreak + 1
        loop 0 sorted

let init () : Model =
    let defaultAchievements = [
        { Id = Guid.NewGuid(); Title = "First Step"; Description = "Add your first habit"; IsUnlocked = false; UnlockDate = None }
        { Id = Guid.NewGuid(); Title = "Week Streak"; Description = "Complete a habit every day for a week"; IsUnlocked = false; UnlockDate = None }
        { Id = Guid.NewGuid(); Title = "Variety"; Description = "Have habits in 3 different categories"; IsUnlocked = false; UnlockDate = None }
    ]
    
    {
        Habits = []
        CurrentPage = Home
        NewHabitForm = {
            Title = ""
            Description = ""
            Target = ""
            SelectedCategory = "Health"
            Error = None
        }
        DarkMode = true
        StatsFilter = {
            TimeRange = Week
            CategoryFilter = None
        }
        Achievements = defaultAchievements
        Reminders = []
    }

let update (msg: Msg) (model: Model) : Model =
    let model = 
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

        | UpdateCategory category ->
            let updatedForm = { model.NewHabitForm with SelectedCategory = category }
            { model with NewHabitForm = updatedForm }

        | AddHabit ->
            let form = model.NewHabitForm
            match validateHabit form.Title form.Description form.Target with
            | Ok target ->
                let category = 
                    match form.SelectedCategory with
                    | "Health" -> Health
                    | "Productivity" -> Productivity
                    | "Learning" -> Learning
                    | "Personal" -> Personal
                    | other -> Other other
                
                let newHabit: Habit = {
                    Id = Guid.NewGuid()
                    Title = form.Title
                    Description = form.Description
                    TargetPerWeek = target
                    Progress = []
                    CreatedAt = DateTime.UtcNow
                    Category = category
                    Streak = 0
                }
                {
                    model with
                        Habits = newHabit :: model.Habits
                        NewHabitForm = {
                            Title = ""
                            Description = ""
                            Target = ""
                            SelectedCategory = "Health"
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
                            let newProgress = date :: h.Progress
                            { h with 
                                Progress = newProgress
                                Streak = calculateStreak newProgress
                            }
                    else h)
            { model with Habits = updatedHabits }

        | UnmarkHabitDone (habitId, date) ->
            let updatedHabits =
                model.Habits
                |> List.map (fun h ->
                    if h.Id = habitId then
                        let newProgress = 
                            h.Progress 
                            |> List.filter (fun d -> d.Date <> date.Date)
                        { h with 
                            Progress = newProgress
                            Streak = calculateStreak newProgress
                        }
                    else h)
            { model with Habits = updatedHabits }

        | ToggleDarkMode ->
            { model with DarkMode = not model.DarkMode }

        | ChangeStatsTimeRange range ->
            let currentFilter = model.StatsFilter
            { model with StatsFilter = { currentFilter with TimeRange = range } }

        | FilterByCategory category ->
            let currentFilter = model.StatsFilter
            { model with StatsFilter = { currentFilter with CategoryFilter = category } }

        | ToggleReminder habitId ->
            let existingReminder = model.Reminders |> List.tryFind (fun r -> r.HabitId = habitId)
            let updatedReminders =
                match existingReminder with
                | Some r -> 
                    model.Reminders 
                    |> List.map (fun rem -> if rem.HabitId = habitId then { rem with IsActive = not rem.IsActive } else rem)
                | None ->
                    { HabitId = habitId; Time = TimeSpan(20, 0, 0); Days = [DayOfWeek.Monday; DayOfWeek.Wednesday; DayOfWeek.Friday]; IsActive = true } 
                    :: model.Reminders
            { model with Reminders = updatedReminders }

        | CheckAchievements ->
            let updatedAchievements = 
                model.Achievements
                |> List.map (fun a ->
                    match a.Title with
                    | "First Step" when not a.IsUnlocked ->
                        if not (List.isEmpty model.Habits) then
                            { a with IsUnlocked = true; UnlockDate = Some DateTime.UtcNow }
                        else a
                    | "Week Streak" when not a.IsUnlocked ->
                        if model.Habits |> List.exists (fun h -> h.Streak >= 7) then
                            { a with IsUnlocked = true; UnlockDate = Some DateTime.UtcNow }
                        else a
                    | "Variety" when not a.IsUnlocked ->
                        let categories = model.Habits |> List.map (fun h -> h.Category) |> List.distinct
                        if categories.Length >= 3 then
                            { a with IsUnlocked = true; UnlockDate = Some DateTime.UtcNow }
                        else a
                    | _ -> a
                )
            { model with Achievements = updatedAchievements }

        | NoOp -> model
    
    let modelWithAchievements = 
        { 
            model with Achievements = 
            model.Achievements
            |> List.map (fun a ->
                match a.Title with
                | "First Step" when not a.IsUnlocked ->
                    if not (List.isEmpty model.Habits) then
                        { a with IsUnlocked = true; UnlockDate = Some DateTime.UtcNow }
                    else a
                | "Week Streak" when not a.IsUnlocked ->
                    if model.Habits |> List.exists (fun h -> h.Streak >= 7) then
                        { a with IsUnlocked = true; UnlockDate = Some DateTime.UtcNow }
                    else a
                | "Variety" when not a.IsUnlocked ->
                    let categories = model.Habits |> List.map (fun h -> h.Category) |> List.distinct
                    if categories.Length >= 3 then
                        { a with IsUnlocked = true; UnlockDate = Some DateTime.UtcNow }
                    else a
                | _ -> a
            )
        }
    modelWithAchievements