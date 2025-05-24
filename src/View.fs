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
        prop.className [ if current = targetPage then "has-text-primary" ]
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
                    navItem "Achievements" Achievements model.CurrentPage dispatch
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

let formField (labelText: string) (value: string) (onChange: string -> unit) =
    Bulma.field.div [
        Bulma.label labelText
        Bulma.control.div [
            Bulma.input.text [
                prop.value value
                prop.onChange onChange
            ]
        ]
    ]

let categoryTag (category: HabitCategory) =
    let (text, color) =
        match category with
        | Health -> ("Health", "is-success")
        | Productivity -> ("Productivity", "is-info")
        | Learning -> ("Learning", "is-warning")
        | Personal -> ("Personal", "is-primary")
        | Other s -> (s, "is-light")
    
    Bulma.tag [
        prop.className color
        prop.text text
    ]


let categorySelector (selected: string) (dispatch: string -> unit) =
    Bulma.field.div [
        Bulma.label "Category"
        Bulma.control.div [
            Bulma.select [
                prop.value selected
                prop.onChange dispatch
                prop.children [
                    Html.option [ prop.value "Health"; prop.text "Health" ]
                    Html.option [ prop.value "Productivity"; prop.text "Productivity" ]
                    Html.option [ prop.value "Learning"; prop.text "Learning" ]
                    Html.option [ prop.value "Personal"; prop.text "Personal" ]
                    Html.option [ prop.value "Other"; prop.text "Other" ]
                ]
            ]
        ]
    ]

let newHabitForm (form: NewHabitForm) (dispatch: Msg -> unit) =
    Bulma.box [
        Bulma.title.h4 "Create New Habit"
        formField "Title" form.Title (fun v -> dispatch (UpdateTitle v))
        formField "Description" form.Description (fun v -> dispatch (UpdateDescription v))
        formField "Target per Week" form.Target (fun v -> dispatch (UpdateTarget v))
        categorySelector form.SelectedCategory (fun v -> dispatch (UpdateCategory v))
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
        Bulma.columns [
            Bulma.column [
                Bulma.title.h5 habit.Title
                categoryTag habit.Category
                Bulma.content [
                    Html.p habit.Description
                    Html.p $"Target: {habit.TargetPerWeek}x/week"
                    Html.p $"Streak: {habit.Streak} days"
                    Html.p $"Created: {habit.CreatedAt.ToShortDateString()}"
                    Html.p $"Progress: {habit.Progress.Length} total"
                ]
            ]
            Bulma.column [
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
                    Bulma.button.a [
                        color.isLight
                        let hasReminder = false // TODO: Implement reminder check
                        prop.text (if hasReminder then "🔔" else "🔕")
                        prop.onClick (fun _ -> dispatch (ToggleReminder habit.Id))
                    ]
                ]
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
                    bar.dataKey (fun (p: {| day: string; value: int |}) -> float p.value)
                    bar.fill "#7f5af0"
                ]
            ]
        ]
    ]

let yearlyOverviewChart (habits: Habit list) =
    let months = [| "Jan"; "Feb"; "Mar"; "Apr"; "May"; "Jun"; "Jul"; "Aug"; "Sep"; "Oct"; "Nov"; "Dec" |]
    let currentYear = DateTime.Now.Year
    let data =
        months
        |> Array.mapi (fun i month ->
            let startDate = DateTime(currentYear, i+1, 1)
            let endDate = startDate.AddMonths(1)
            let count =
                habits
                |> List.collect (fun h -> h.Progress)
                |> List.filter (fun d -> d >= startDate && d < endDate)
                |> List.length
            {| month = month; value = count |}
        )

    Bulma.box [
        Bulma.title.h4 "Yearly Overview"
        Recharts.barChart [
            barChart.data data
            barChart.width 800
            barChart.height 400
            barChart.children [
                Recharts.cartesianGrid [ cartesianGrid.strokeDasharray(3, 3) ]
                Recharts.xAxis [ xAxis.dataKey (fun (p: {| month: string; value: int |}) -> p.month) ]
                Recharts.yAxis []
                Recharts.tooltip []
                Recharts.bar [
                    bar.dataKey (fun (p: {| month: string; value: int |}) -> float p.value)
                    bar.fill "#8884d8"
                ]
            ]
        ]
    ]

let calendarView (habits: Habit list) (dispatch: Msg -> unit) =
    let today = DateTime.Today
    let daysInMonth = DateTime.DaysInMonth(today.Year, today.Month)
    let firstDayOfMonth = DateTime(today.Year, today.Month, 1)
    
    Html.div [
        Bulma.title.h4 "Monthly Progress"
        Bulma.table [
            table.isBordered
            table.isFullWidth
            prop.children [
                Html.thead [
                    Html.tr [
                        Html.th "Sun"
                        Html.th "Mon"
                        Html.th "Tue"
                        Html.th "Wed"
                        Html.th "Thu"
                        Html.th "Fri"
                        Html.th "Sat"
                    ]
                ]
                Html.tbody [
                    let mutable currentDay = 1
                    let startDay = int firstDayOfMonth.DayOfWeek
                    
                    for row in 0..5 do
                        if currentDay <= daysInMonth then
                            Html.tr [
                                for col in 0..6 do
                                    if (row = 0 && col < startDay) || currentDay > daysInMonth then
                                        Html.td ""
                                    else
                                        let date = DateTime(today.Year, today.Month, currentDay)
                                        let completedHabits = 
                                            habits 
                                            |> List.filter (fun h -> 
                                                h.Progress |> List.exists (fun d -> d.Date = date.Date))
                                            |> List.length
                                        
                                        Html.td [
                                            prop.style [ 
                                                style.position.relative 
                                                style.paddingTop 20
                                                style.height 60
                                            ]
                                            prop.children [
                                                Html.div [
                                                    prop.style [ style.position.absolute; style.top 5 ]
                                                    prop.text currentDay
                                                ]
                                                if completedHabits > 0 then
                                                    Html.div [
                                                        prop.style [ 
                                                            style.position.absolute
                                                            style.bottom 5
                                                            style.right 5
                                                        ]
                                                        prop.children [
                                                            Bulma.tag [
                                                                color.isSuccess
                                                                prop.text completedHabits
                                                            ]
                                                        ]
                                                    ]
                                            ]
                                        ]
                                        currentDay <- currentDay + 1
                            ]
                ]
            ]
        ]
    ]

let achievementsPage (achievements: Achievement list) =
    Html.div [
        Bulma.section [
            Bulma.title.h3 "Your Achievements"
            if List.isEmpty achievements then
                Html.p "No achievements yet. Keep working on your habits!"
            else
                Bulma.columns [
                    columns.isMultiline
                    prop.children [
                        for a in achievements ->
                            Bulma.column [
                                column.is4
                                prop.children [
                                    Bulma.box [
                                        prop.style [
                                            if a.IsUnlocked then 
                                                style.boxShadow (0, 0, 10, "gold")
                                        ]
                                        prop.children [
                                            Bulma.title.h5 a.Title
                                            Bulma.subtitle.h6 [
                                                if a.IsUnlocked then 
                                                    color.isSuccess
                                                    prop.text "Unlocked!"
                                                else 
                                                    color.isDanger
                                                    prop.text "Locked"
                                            ]
                                            Html.p a.Description
                                            if a.IsUnlocked && a.UnlockDate.IsSome then
                                                Html.p $"Unlocked on: {a.UnlockDate.Value.ToShortDateString()}"
                                        ]
                                    ]
                                ]
                            ]
                    ]
                ]
        ]
    ]

let statsPage (model: Model) (dispatch: Msg -> unit) =
    Html.div [
        Bulma.section [
            Bulma.title.h3 "Progress Overview"
            Bulma.tabs [
                tabs.isToggle
                prop.children [
                    Html.ul [
                        Html.li [
                            prop.className [ if model.StatsFilter.TimeRange = Week then "is-active" ]
                            prop.children [
                                Html.a [
                                    prop.text "Weekly"
                                    prop.onClick (fun _ -> dispatch (ChangeStatsTimeRange Week))
                                ]
                            ]
                        ]
                        Html.li [
                            prop.className [ if model.StatsFilter.TimeRange = Month then "is-active" ]
                            prop.children [
                                Html.a [
                                    prop.text "Monthly"
                                    prop.onClick (fun _ -> dispatch (ChangeStatsTimeRange Month))
                                ]
                            ]
                        ]
                        Html.li [
                            prop.className [ if model.StatsFilter.TimeRange = Year then "is-active" ]
                            prop.children [
                                Html.a [
                                    prop.text "Yearly"
                                    prop.onClick (fun _ -> dispatch (ChangeStatsTimeRange Year))
                                ]
                            ]
                        ]
                    ]
                ]
            ]
            
            Bulma.field.div [
                field.isGrouped
                prop.children [
                    Bulma.control.div [
                        Bulma.button.button [
                            color.isLight
                            prop.text "All Categories"
                            prop.onClick (fun _ -> dispatch (FilterByCategory None))
                        ]
                    ]
                    for category in [Health; Productivity; Learning; Personal] do
                        Bulma.control.div [
                            Bulma.button.button [
                                if model.StatsFilter.CategoryFilter = Some category then 
                                    color.isPrimary
                                else
                                    color.isLight
                                prop.onClick (fun _ -> dispatch (FilterByCategory (Some category)))
                                prop.children [
                                    categoryTag category
                                ]
                            ]
                        ]
                ]
            ]
            
            if List.isEmpty model.Habits then
                Html.p "No data available yet."
            else
                match model.StatsFilter.TimeRange with
                | Week -> weeklyProgressChart model.Habits
                | Month -> calendarView model.Habits dispatch
                | Year -> yearlyOverviewChart model.Habits
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
            | Stats -> statsPage model dispatch
            | Achievements -> achievementsPage model.Achievements
        ]
    ]
    