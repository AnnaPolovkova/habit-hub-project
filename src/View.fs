module View

open Feliz
open Feliz.Bulma
open Feliz.Recharts
open Elmish
open Model
open System
open Update

let navItem (label: string) (targetPage: Page) (current: Page) (dispatch: Msg -> unit) =
    Bulma.navbarItem.a [
        prop.text label
        prop.classes [ if current = targetPage then "has-text-primary" ]
        prop.onClick (fun _ -> dispatch (NavigateTo targetPage))
    ]

let navbar (model: Model) (dispatch: Msg -> unit) =
    Bulma.navbar [
        prop.style [
            style.backgroundColor (if model.DarkMode then "#1e1e2f" else "white")
            style.color (if model.DarkMode then "white" else "black")
        ]
        prop.children [
            Bulma.navbarBrand.div [
                Bulma.navbarItem.a [
                    prop.text "HabitHub"
                    prop.style [ style.fontWeight.bold; style.fontSize 22 ]
                ]
                Bulma.navbarItem.div [
                    Bulma.button.a [
                        prop.text (if model.DarkMode then "☀ Light" else "🌙 Dark")
                        prop.onClick (fun _ -> dispatch ToggleDarkMode)
                        prop.style [ style.marginLeft 10 ]
                    ]
                ]
            ]
            Bulma.navbarMenu [
                Bulma.navbarStart.div [
                    navItem "Home" Home model.CurrentPage dispatch
                    navItem "Tracker" Tracker model.CurrentPage dispatch
                    navItem "Stats" Stats model.CurrentPage dispatch
                ]
            ]
        ]
    ]

let heroSection =
    Bulma.hero [
        color.isPrimary
        prop.style [ style.backgroundColor "#2e2e48" ]
        hero.isMedium
        prop.children [
            Bulma.heroBody [
                Bulma.container [
                    Bulma.title.p [
                        color.hasTextWhite
                        prop.text "Welcome to HabitHub"
                    ]
                    Bulma.subtitle.p [
                        color.hasTextLight
                        prop.text "Your minimalist habit tracker for building a better you."
                    ]
                ]
            ]
        ]
    ]

let homePage =
    Html.div [
        heroSection
        Bulma.section [
            Bulma.content [
                Html.p "Track, build, and reinforce the habits that matter to you."
                Html.p "Navigate to the 'Tracker' to start adding your habits."
                Html.p "View your statistics and progress in the 'Stats' section."
            ]
        ]
    ]
let formField (labelText: string) (value: string) (onChange: string -> unit) : ReactElement =
    Bulma.field.div [
        Bulma.label (labelText: string)
        Bulma.control.div [
            Bulma.input.text [
                prop.value (value: string)
                prop.onChange (onChange: string -> unit)
            ]
        ]
    ]

let newHabitForm (form: NewHabitForm) (dispatch: Msg -> unit) =
    Bulma.box [
        Bulma.title.h4 "Create New Habit"
        formField "Title" form.Title (fun v -> dispatch (UpdateTitle v))
        formField "Description" form.Description (fun v -> dispatch (UpdateDescription v))
        formField "Target per Week" form.Target (fun v -> dispatch (UpdateTarget v))
        match form.Error with
        | Some err ->
            Bulma.notification [
                color.isDanger
                prop.text err
            ]
        | None -> Html.none
        Bulma.button.button [
            color.isPrimary
            prop.text "Add Habit"
            prop.onClick (fun _ -> dispatch AddHabit)
        ]
    ]

let habitCard (habit: Habit) (dispatch: Msg -> unit) =
    Bulma.box [
        Bulma.title.h5 habit.Title
        Bulma.content [
            Html.p habit.Description
            Html.p $"Target: {habit.TargetPerWeek}x/week"
            Html.p $"Created: {habit.CreatedAt.ToShortDateString()}"
            Html.p $"Progress: {habit.Progress.Length} total"
        ]
        Bulma.buttons [
            Bulma.button.a [
                color.isSuccess
                prop.text "Done Today"
                prop.onClick (fun _ -> dispatch (MarkHabitDone (habit.Id, DateTime.UtcNow)))
            ]
            Bulma.button.a [
                color.isDanger
                prop.text "Delete"
                prop.onClick (fun _ -> dispatch (DeleteHabit habit.Id))
            ]
        ]
    ]

let trackerPage (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        Bulma.section [
            newHabitForm model.NewHabitForm dispatch
        ]
        Bulma.section [
            Bulma.title.h3 "Your Habits"
            if List.isEmpty model.Habits then
                Html.p "No habits yet. Create one above!"
            else
                Html.div [
                    for h in model.Habits -> habitCard h dispatch
                ]
        ]
    ]

let weeklyProgressChart (habits: Habit list) =
    let now = DateTime.UtcNow
    let startOfWeek = now.AddDays(-(float (int now.DayOfWeek)))
    let days = [ 0..6 ]
    let data =
        days
        |> List.map (fun i ->
            let day = startOfWeek.AddDays(float i)
            let count =
                habits
                |> List.collect (fun h -> h.Progress)
                |> List.filter (fun d -> d.Date = day.Date)
                |> List.length
            {| day = day.ToString("ddd"); value = count |}
        )

    Bulma.box [
        Bulma.title.h4 "This Week"
        Recharts.barChart [
            barChart.data data
            barChart.margin(top=5, right=30, left=20, bottom=5)
            barChart.children [
                Recharts.cartesianGrid [ cartesianGrid.strokeDasharray(3, 3) ]
                Recharts.xAxis [ xAxis.dataKey (fun (p: {| day: string; value: int |}) -> p.day) ]
                Recharts.yAxis []
                Recharts.tooltip []
                Recharts.bar [
                    bar.dataKey (fun (p: {| day: string; value: int |}) -> p.value)
                    bar.fill "#7f5af0"
                ]
            ]
        ]
    ]

let statsPage (model: Model) =
    Html.div [
        Bulma.section [
            Bulma.title.h3 "Progress Overview"
            if List.isEmpty model.Habits then
                Html.p "No data available yet."
            else
                weeklyProgressChart model.Habits
        ]
    ]

let rootView (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        prop.style [
            style.backgroundColor (if model.DarkMode then "#121212" else "white")
            style.color (if model.DarkMode then "white" else "black")
            style.minHeight (length.vh 100)
        ]
        prop.children [
            navbar model dispatch
            match model.CurrentPage with
            | Home -> homePage
            | Tracker -> trackerPage model dispatch
            | Stats -> statsPage model
        ]
    ]
