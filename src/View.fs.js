import { join } from "./fable_modules/fable-library.4.0.0/String.js";
import { map as map_2, collect as collect_1, append, empty, singleton, delay, toList } from "./fable_modules/fable-library.4.0.0/Seq.js";
import { int32ToString, createObj, equals } from "./fable_modules/fable-library.4.0.0/Util.js";
import { Msg } from "./Update.fs.js";
import { isEmpty, exists, toArray, collect, length, partition, filter, map, singleton as singleton_1, append as append_1, ofArray } from "./fable_modules/fable-library.4.0.0/List.js";
import { createElement } from "react";
import { toString } from "./fable_modules/fable-library.4.0.0/Types.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.4.0/./Interop.fs.js";
import { HabitCategory, TimeRange, Page } from "./Model.fs.js";
import { defaultOf } from "./fable_modules/Feliz.2.4.0/../fable-library.4.0.0/Util.js";
import { month as month_1, daysInMonth as daysInMonth_1, today as today_1, compare, addMonths, create, now as now_1, year, toString as toString_1, date as date_1, equals as equals_1, dayOfWeek, addDays, utcNow, toShortDateString } from "./fable_modules/fable-library.4.0.0/Date.js";
import { rangeDouble } from "./fable_modules/fable-library.4.0.0/Range.js";
import { value as value_55, defaultArg } from "./fable_modules/fable-library.4.0.0/Option.js";
import { mapIndexed, map as map_1 } from "./fable_modules/fable-library.4.0.0/Array.js";
import { Interop_reactApi as Interop_reactApi_1 } from "./fable_modules/Feliz.Recharts.4.3.0/../Feliz.2.4.0/Interop.fs.js";
import { BarChart, Bar, Tooltip, YAxis, XAxis, CartesianGrid } from "recharts";

export function navItem(label, targetPage, current, dispatch) {
    const xs = ofArray([["children", label], ["className", join(" ", toList(delay(() => (equals(current, targetPage) ? singleton("has-text-primary") : empty()))))], ["onClick", (_arg) => {
        dispatch(new Msg(0, [targetPage]));
    }]]);
    return createElement("a", createObj(toList(delay(() => append(xs, delay(() => singleton(["className", join(" ", append_1(singleton_1("navbar-item"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_4) => value_4, xs)))))])))))));
}

export function navbar(model, dispatch) {
    let elems_4, elms_1, xs, elms, xs_4, elms_3, elms_2;
    const xs_12 = ofArray([["style", {
        backgroundColor: model.DarkMode ? "#1e1e2f" : "white",
        color: model.DarkMode ? "white" : "black",
    }], (elems_4 = [(elms_1 = ofArray([(xs = ofArray([["children", "HabitHub"], ["style", {
        fontWeight: "bold",
        fontSize: 22 + "px",
    }]]), createElement("a", createObj(toList(delay(() => append(xs, delay(() => singleton(["className", join(" ", append_1(singleton_1("navbar-item"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_8) => value_8, xs)))))])))))))), (elms = singleton_1((xs_4 = ofArray([["children", model.DarkMode ? "☀ Light" : "🌙 Dark"], ["onClick", (_arg_1) => {
        dispatch(new Msg(9, []));
    }], ["style", {
        marginLeft: 10,
    }]]), createElement("a", createObj(toList(delay(() => append(xs_4, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
        const v_1 = tupledArg_1[0];
        return v_1 === "className";
    }, map((value_16) => value_16, xs_4)))))]))))))))), createElement("div", {
        className: "navbar-item",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))]), createElement("div", {
        className: "navbar-brand",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), (elms_3 = singleton_1((elms_2 = ofArray([navItem("Home", new Page(0, []), model.CurrentPage, dispatch), navItem("Tracker", new Page(1, []), model.CurrentPage, dispatch), navItem("Stats", new Page(2, []), model.CurrentPage, dispatch), navItem("Achievements", new Page(3, []), model.CurrentPage, dispatch)]), createElement("div", {
        className: "navbar-start",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("div", {
        className: "navbar-menu",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_4))])]);
    return createElement("nav", createObj(toList(delay(() => append(xs_12, delay(() => singleton(["className", join(" ", append_1(singleton_1("navbar"), map((arg_2) => toString(arg_2[1]), filter((tupledArg_2) => {
        const v_2 = tupledArg_2[0];
        return v_2 === "className";
    }, map((value_31) => value_31, xs_12)))))])))))));
}

export const heroSection = (() => {
    let elems_2, elms_1, elms, xs, xs_4;
    const xs_10 = ofArray([["className", "is-primary"], ["style", {
        backgroundColor: "#2e2e48",
    }], ["className", "is-medium"], (elems_2 = [(elms_1 = singleton_1((elms = ofArray([(xs = ofArray([["className", "has-text-white"], ["children", "Welcome to HabitHub"]]), createElement("p", createObj(toList(delay(() => append(xs, delay(() => singleton(["className", join(" ", append_1(singleton_1("title"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_10) => value_10, xs)))))])))))))), (xs_4 = ofArray([["className", "has-text-light"], ["children", "Your minimalist habit tracker for building a better you."]]), createElement("p", createObj(toList(delay(() => append(xs_4, delay(() => singleton(["className", join(" ", append_1(singleton_1("subtitle"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
        const v_1 = tupledArg_1[0];
        return v_1 === "className";
    }, map((value_16) => value_16, xs_4)))))]))))))))]), createElement("div", {
        className: "container",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))), createElement("div", {
        className: "hero-body",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]);
    return createElement("section", createObj(toList(delay(() => append(xs_10, delay(() => singleton(["className", join(" ", append_1(singleton_1("hero"), map((arg_2) => toString(arg_2[1]), filter((tupledArg_2) => {
        const v_2 = tupledArg_2[0];
        return v_2 === "className";
    }, map((value_25) => value_25, xs_10)))))])))))));
})();

export const homePage = (() => {
    let elms_1, elms;
    const children_2 = ofArray([heroSection, (elms_1 = singleton_1((elms = ofArray([createElement("p", {
        children: ["Track, build, and reinforce the habits that matter to you."],
    }), createElement("p", {
        children: ["Navigate to the \'Tracker\' to start adding your habits."],
    }), createElement("p", {
        children: ["View your statistics and progress in the \'Stats\' section."],
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))), createElement("section", {
        className: "section",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    });
})();

export function formField(labelText, value, onChange) {
    let elms, xs_1;
    const elms_1 = ofArray([createElement("label", {
        className: "label",
        children: labelText,
    }), (elms = singleton_1((xs_1 = ofArray([["value", value], ["onChange", (ev) => {
        onChange(ev.target.value);
    }]]), createElement("input", createObj(toList(delay(() => append(xs_1, delay(() => append(singleton(["type", "text"]), delay(() => singleton(["className", join(" ", append_1(singleton_1("input"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_10) => value_10, xs_1)))))]))))))))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))]);
    return createElement("div", {
        className: "field",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    });
}

export function categoryTag(category) {
    let patternInput;
    switch (category.tag) {
        case 1: {
            patternInput = ["Productivity", "is-info"];
            break;
        }
        case 2: {
            patternInput = ["Learning", "is-warning"];
            break;
        }
        case 3: {
            patternInput = ["Personal", "is-primary"];
            break;
        }
        case 4: {
            const s = category.fields[0];
            patternInput = [s, "is-light"];
            break;
        }
        default: {
            patternInput = ["Health", "is-success"];
        }
    }
    const text = patternInput[0];
    const color = patternInput[1];
    const xs = ofArray([["className", color], ["children", text]]);
    return createElement("span", createObj(toList(delay(() => append(xs, delay(() => singleton(["className", join(" ", append_1(singleton_1("tag"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_4) => value_4, xs)))))])))))));
}

export function categorySelector(selected, dispatch) {
    let elms, patternInput, elems, nonCp, cp, elems_1;
    const elms_1 = ofArray([createElement("label", {
        className: "label",
        children: "Category",
    }), (elms = singleton_1((patternInput = partition((arg_1) => ("className" === arg_1[0]), ofArray([["value", selected], ["onChange", (ev) => {
        dispatch(ev.target.value);
    }], (elems = [createElement("option", {
        value: "Health",
        children: "Health",
    }), createElement("option", {
        value: "Productivity",
        children: "Productivity",
    }), createElement("option", {
        value: "Learning",
        children: "Learning",
    }), createElement("option", {
        value: "Personal",
        children: "Personal",
    }), createElement("option", {
        value: "Other",
        children: "Other",
    })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])), (nonCp = patternInput[1], (cp = patternInput[0], createElement("div", createObj(ofArray([["className", join(" ", append_1(singleton_1("select"), map((arg_2) => toString(arg_2[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_30) => value_30, cp)))))], (elems_1 = [createElement("select", createObj(nonCp))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))))))), createElement("div", {
        className: "control",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))]);
    return createElement("div", {
        className: "field",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    });
}

export function newHabitForm(form, dispatch) {
    const elms = toList(delay(() => append(singleton(createElement("h4", {
        className: "title",
        children: "Create New Habit",
    })), delay(() => append(singleton(formField("Title", form.Title, (v) => {
        dispatch(new Msg(1, [v]));
    })), delay(() => append(singleton(formField("Description", form.Description, (v_1) => {
        dispatch(new Msg(2, [v_1]));
    })), delay(() => append(singleton(formField("Target per Week", form.Target, (v_2) => {
        dispatch(new Msg(3, [v_2]));
    })), delay(() => append(singleton(categorySelector(form.SelectedCategory, (v_3) => {
        dispatch(new Msg(4, [v_3]));
    })), delay(() => {
        let matchValue, err, xs_1;
        return append((matchValue = form.Error, (matchValue == null) ? singleton(defaultOf()) : ((err = matchValue, singleton((xs_1 = ofArray([["className", "is-danger"], ["children", err]]), createElement("div", createObj(toList(delay(() => append(xs_1, delay(() => singleton(["className", join(" ", append_1(singleton_1("notification"), map((arg) => toString(arg[1]), filter((tupledArg) => {
            const v_4 = tupledArg[0];
            return v_4 === "className";
        }, map((value_9) => value_9, xs_1)))))])))))))))))), delay(() => {
            let xs_5;
            return singleton((xs_5 = ofArray([["className", "is-primary"], ["children", "Add Habit"], ["onClick", (_arg_1) => {
                dispatch(new Msg(5, []));
            }]]), createElement("button", createObj(toList(delay(() => append(xs_5, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
                const v_5 = tupledArg_1[0];
                return v_5 === "className";
            }, map((value_16) => value_16, xs_5)))))])))))))));
        }));
    }))))))))))));
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

export function habitCard(habit, dispatch) {
    let elms_4, elms_1, elms, elms_3, elms_2, xs_3, xs_7, xs_11;
    const elms_5 = singleton_1((elms_4 = ofArray([(elms_1 = ofArray([createElement("h5", {
        className: "title",
        children: habit.Title,
    }), categoryTag(habit.Category), (elms = ofArray([createElement("p", {
        children: [habit.Description],
    }), createElement("p", {
        children: [`Target: ${habit.TargetPerWeek}x/week`],
    }), createElement("p", {
        children: [`Streak: ${habit.Streak} days`],
    }), createElement("p", {
        children: [`Created: ${toShortDateString(habit.CreatedAt)}`],
    }), createElement("p", {
        children: [`Progress: ${length(habit.Progress)} total`],
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    }))]), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    })), (elms_3 = singleton_1((elms_2 = ofArray([(xs_3 = ofArray([["className", "is-success"], ["children", "Done Today"], ["onClick", (_arg) => {
        dispatch(new Msg(7, [habit.Id, utcNow()]));
    }]]), createElement("a", createObj(toList(delay(() => append(xs_3, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_21) => value_21, xs_3)))))])))))))), (xs_7 = ofArray([["className", "is-danger"], ["children", "Delete"], ["onClick", (_arg_2) => {
        dispatch(new Msg(6, [habit.Id]));
    }]]), createElement("a", createObj(toList(delay(() => append(xs_7, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
        const v_1 = tupledArg_1[0];
        return v_1 === "className";
    }, map((value_28) => value_28, xs_7)))))])))))))), (xs_11 = toList(delay(() => append(singleton(["className", "is-light"]), delay(() => {
        const hasReminder = false;
        return append(singleton(["children", hasReminder ? "🔔" : "🔕"]), delay(() => singleton(["onClick", (_arg_4) => {
            dispatch(new Msg(13, [habit.Id]));
        }])));
    })))), createElement("a", createObj(toList(delay(() => append(xs_11, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_2) => toString(arg_2[1]), filter((tupledArg_2) => {
        const v_2 = tupledArg_2[0];
        return v_2 === "className";
    }, map((value_35) => value_35, xs_11)))))]))))))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    }))), createElement("div", {
        className: "column",
        children: Interop_reactApi.Children.toArray(Array.from(elms_3)),
    }))]), createElement("div", {
        className: "columns",
        children: Interop_reactApi.Children.toArray(Array.from(elms_4)),
    })));
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms_5)),
    });
}

export function weeklyProgressChart(habits) {
    let properties_6, margin, elements, properties_1;
    const now = utcNow();
    const startOfWeek = addDays(now, -dayOfWeek(now));
    const days = toList(rangeDouble(0, 1, 6));
    const data = map((i) => {
        const day = addDays(startOfWeek, i);
        const count = length(filter((d) => equals_1(date_1(d), date_1(day)), collect((h) => h.Progress, habits))) | 0;
        return {
            day: toString_1(day, "ddd"),
            value: count,
        };
    }, days);
    const elms = ofArray([createElement("h4", {
        className: "title",
        children: "This Week",
    }), (properties_6 = ofArray([["data", toArray(data)], (margin = {
        top: defaultArg(5, 0),
        right: defaultArg(30, 0),
        left: defaultArg(20, 0),
        bottom: defaultArg(5, 0),
    }, ["margin", margin]), (elements = ofArray([(properties_1 = singleton_1(["strokeDasharray", join(" ", map_1(int32ToString, new Int32Array([3, 3]), null))]), Interop_reactApi_1.createElement(CartesianGrid, createObj(properties_1))), Interop_reactApi_1.createElement(XAxis, {
        dataKey: (p) => p.day,
    }), Interop_reactApi_1.createElement(YAxis, {}), Interop_reactApi_1.createElement(Tooltip, {}), Interop_reactApi_1.createElement(Bar, {
        dataKey: (p_1) => p_1.value,
        fill: "#7f5af0",
    })]), ["children", Interop_reactApi.Children.toArray(Array.from(elements))])]), Interop_reactApi_1.createElement(BarChart, createObj(properties_6)))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

export function yearlyOverviewChart(habits) {
    let properties_6, elements, properties_1;
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentYear = year(now_1()) | 0;
    const data = mapIndexed((i, month) => {
        const startDate = create(currentYear, i + 1, 1);
        const endDate = addMonths(startDate, 1);
        const count = length(filter((d) => {
            if (compare(d, startDate) >= 0) {
                return compare(d, endDate) < 0;
            }
            else {
                return false;
            }
        }, collect((h) => h.Progress, habits))) | 0;
        return {
            month: month,
            value: count,
        };
    }, months, null);
    const elms = ofArray([createElement("h4", {
        className: "title",
        children: "Yearly Overview",
    }), (properties_6 = ofArray([["data", data], ["width", 800], ["height", 400], (elements = ofArray([(properties_1 = singleton_1(["strokeDasharray", join(" ", map_1(int32ToString, new Int32Array([3, 3]), null))]), Interop_reactApi_1.createElement(CartesianGrid, createObj(properties_1))), Interop_reactApi_1.createElement(XAxis, {
        dataKey: (p) => p.month,
    }), Interop_reactApi_1.createElement(YAxis, {}), Interop_reactApi_1.createElement(Tooltip, {}), Interop_reactApi_1.createElement(Bar, {
        dataKey: (p_1) => p_1.value,
        fill: "#8884d8",
    })]), ["children", Interop_reactApi.Children.toArray(Array.from(elements))])]), Interop_reactApi_1.createElement(BarChart, createObj(properties_6)))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

export function calendarView(habits, dispatch) {
    let xs_8, elems_2, children_2, children, children_6;
    const today = today_1();
    const daysInMonth = daysInMonth_1(year(today), month_1(today)) | 0;
    const firstDayOfMonth = create(year(today), month_1(today), 1);
    const children_8 = ofArray([createElement("h4", {
        className: "title",
        children: "Monthly Progress",
    }), (xs_8 = ofArray([["className", "is-bordered"], ["className", "is-fullwidth"], (elems_2 = [(children_2 = singleton_1((children = ofArray([createElement("th", {
        children: ["Sun"],
    }), createElement("th", {
        children: ["Mon"],
    }), createElement("th", {
        children: ["Tue"],
    }), createElement("th", {
        children: ["Wed"],
    }), createElement("th", {
        children: ["Thu"],
    }), createElement("th", {
        children: ["Fri"],
    }), createElement("th", {
        children: ["Sat"],
    })]), createElement("tr", {
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    }))), createElement("thead", {
        children: Interop_reactApi.Children.toArray(Array.from(children_2)),
    })), (children_6 = toList(delay(() => {
        let currentDay = 1;
        const startDay = dayOfWeek(firstDayOfMonth) | 0;
        return collect_1((row) => {
            let children_4;
            return (currentDay <= daysInMonth) ? singleton((children_4 = toList(delay(() => collect_1((col) => {
                let elems_1;
                if (((row === 0) && (col < startDay)) ? true : (currentDay > daysInMonth)) {
                    return singleton(createElement("td", {
                        children: [""],
                    }));
                }
                else {
                    const date = create(year(today), month_1(today), currentDay);
                    const completedHabits = length(filter((h) => exists((d) => equals_1(date_1(d), date_1(date)), h.Progress), habits)) | 0;
                    return append(singleton(createElement("td", createObj(ofArray([["style", {
                        position: "relative",
                        paddingTop: 20,
                        height: 60,
                    }], (elems_1 = toList(delay(() => append(singleton(createElement("div", {
                        style: {
                            position: "absolute",
                            top: 5,
                        },
                        children: currentDay,
                    })), delay(() => {
                        let elems, xs_2;
                        return (completedHabits > 0) ? singleton(createElement("div", createObj(ofArray([["style", {
                            position: "absolute",
                            bottom: 5,
                            right: 5,
                        }], (elems = [(xs_2 = ofArray([["className", "is-success"], ["children", completedHabits]]), createElement("span", createObj(toList(delay(() => append(xs_2, delay(() => singleton(["className", join(" ", append_1(singleton_1("tag"), map((arg) => toString(arg[1]), filter((tupledArg) => {
                            const v = tupledArg[0];
                            return v === "className";
                        }, map((value_39) => value_39, xs_2)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])))) : empty();
                    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))), delay(() => {
                        currentDay = ((currentDay + 1) | 0);
                        return empty();
                    }));
                }
            }, rangeDouble(0, 1, 6)))), createElement("tr", {
                children: Interop_reactApi.Children.toArray(Array.from(children_4)),
            }))) : empty();
        }, rangeDouble(0, 1, 5));
    })), createElement("tbody", {
        children: Interop_reactApi.Children.toArray(Array.from(children_6)),
    }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]), createElement("table", createObj(toList(delay(() => append(xs_8, delay(() => singleton(["className", join(" ", append_1(singleton_1("table"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
        const v_1 = tupledArg_1[0];
        return v_1 === "className";
    }, map((value_44) => value_44, xs_8)))))]))))))))]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_8)),
    });
}

export function achievementsPage(achievements) {
    let elms;
    const children_1 = singleton_1((elms = toList(delay(() => append(singleton(createElement("h3", {
        className: "title",
        children: "Your Achievements",
    })), delay(() => {
        let xs_14, elems_2;
        return isEmpty(achievements) ? singleton(createElement("p", {
            children: ["No achievements yet. Keep working on your habits!"],
        })) : singleton((xs_14 = ofArray([["className", "is-multiline"], (elems_2 = toList(delay(() => map_2((a) => {
            let elems_1, xs_6, elems;
            const xs_10 = ofArray([["className", "is-4"], (elems_1 = [(xs_6 = ofArray([["style", createObj(toList(delay(() => (a.IsUnlocked ? singleton(["boxShadow", (((((0 + "px ") + 0) + "px ") + 10) + "px ") + "gold"]) : empty()))))], (elems = toList(delay(() => append(singleton(createElement("h5", {
                className: "title",
                children: a.Title,
            })), delay(() => {
                let xs_2;
                return append(singleton((xs_2 = toList(delay(() => (a.IsUnlocked ? append(singleton(["className", "is-success"]), delay(() => singleton(["children", "Unlocked!"]))) : append(singleton(["className", "is-danger"]), delay(() => singleton(["children", "Locked"])))))), createElement("h6", createObj(toList(delay(() => append(xs_2, delay(() => singleton(["className", join(" ", append_1(singleton_1("subtitle"), map((arg) => toString(arg[1]), filter((tupledArg) => {
                    const v = tupledArg[0];
                    return v === "className";
                }, map((value_25) => value_25, xs_2)))))]))))))))), delay(() => append(singleton(createElement("p", {
                    children: [a.Description],
                })), delay(() => ((a.IsUnlocked && (a.UnlockDate != null)) ? singleton(createElement("p", {
                    children: [`Unlocked on: ${toShortDateString(value_55(a.UnlockDate))}`],
                })) : empty())))));
            })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]), createElement("div", createObj(toList(delay(() => append(xs_6, delay(() => singleton(["className", join(" ", append_1(singleton_1("box"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
                const v_1 = tupledArg_1[0];
                return v_1 === "className";
            }, map((value_30) => value_30, xs_6)))))]))))))))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]);
            return createElement("div", createObj(toList(delay(() => append(xs_10, delay(() => singleton(["className", join(" ", append_1(singleton_1("column"), map((arg_2) => toString(arg_2[1]), filter((tupledArg_2) => {
                const v_2 = tupledArg_2[0];
                return v_2 === "className";
            }, map((value_33) => value_33, xs_10)))))])))))));
        }, achievements))), ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])]), createElement("div", createObj(toList(delay(() => append(xs_14, delay(() => singleton(["className", join(" ", append_1(singleton_1("columns"), map((arg_3) => toString(arg_3[1]), filter((tupledArg_3) => {
            const v_3 = tupledArg_3[0];
            return v_3 === "className";
        }, map((value_36) => value_36, xs_14)))))])))))))));
    })))), createElement("section", {
        className: "section",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
    });
}

export function statsPage(model, dispatch) {
    let elms_2;
    const children_5 = singleton_1((elms_2 = toList(delay(() => append(singleton(createElement("h3", {
        className: "title",
        children: "Progress Overview",
    })), delay(() => {
        let xs_7, elems_3, children, elems, elems_1, elems_2;
        return append(singleton((xs_7 = ofArray([["className", "is-toggle"], (elems_3 = [(children = ofArray([createElement("li", createObj(ofArray([["className", join(" ", toList(delay(() => (equals(model.StatsFilter.TimeRange, new TimeRange(0, [])) ? singleton("is-active") : empty()))))], (elems = [createElement("a", {
            children: "Weekly",
            onClick: (_arg) => {
                dispatch(new Msg(10, [new TimeRange(0, [])]));
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), createElement("li", createObj(ofArray([["className", join(" ", toList(delay(() => (equals(model.StatsFilter.TimeRange, new TimeRange(1, [])) ? singleton("is-active") : empty()))))], (elems_1 = [createElement("a", {
            children: "Monthly",
            onClick: (_arg_1) => {
                dispatch(new Msg(10, [new TimeRange(1, [])]));
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])]))), createElement("li", createObj(ofArray([["className", join(" ", toList(delay(() => (equals(model.StatsFilter.TimeRange, new TimeRange(2, [])) ? singleton("is-active") : empty()))))], (elems_2 = [createElement("a", {
            children: "Yearly",
            onClick: (_arg_2) => {
                dispatch(new Msg(10, [new TimeRange(2, [])]));
            },
        })], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))]), createElement("ul", {
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        }))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])]), createElement("div", createObj(toList(delay(() => append(xs_7, delay(() => singleton(["className", join(" ", append_1(singleton_1("tabs"), map((arg) => toString(arg[1]), filter((tupledArg) => {
            const v = tupledArg[0];
            return v === "className";
        }, map((value_23) => value_23, xs_7)))))]))))))))), delay(() => {
            let xs_21, elems_7;
            return append(singleton((xs_21 = ofArray([["className", "is-grouped"], (elems_7 = toList(delay(() => {
                let elms, xs_11;
                return append(singleton((elms = singleton_1((xs_11 = ofArray([["className", "is-light"], ["children", "All Categories"], ["onClick", (_arg_4) => {
                    dispatch(new Msg(11, [void 0]));
                }]]), createElement("button", createObj(toList(delay(() => append(xs_11, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
                    const v_1 = tupledArg_1[0];
                    return v_1 === "className";
                }, map((value_32) => value_32, xs_11)))))]))))))))), createElement("div", {
                    className: "control",
                    children: Interop_reactApi.Children.toArray(Array.from(elms)),
                }))), delay(() => map_2((category) => {
                    let xs_16;
                    const elms_1 = singleton_1((xs_16 = toList(delay(() => append(equals(model.StatsFilter.CategoryFilter, category) ? singleton(["className", "is-primary"]) : singleton(["className", "is-light"]), delay(() => append(singleton(["onClick", (_arg_6) => {
                        dispatch(new Msg(11, [category]));
                    }]), delay(() => {
                        let elems_5;
                        return singleton((elems_5 = [categoryTag(category)], ["children", Interop_reactApi.Children.toArray(Array.from(elems_5))]));
                    })))))), createElement("button", createObj(toList(delay(() => append(xs_16, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_2) => toString(arg_2[1]), filter((tupledArg_2) => {
                        const v_2 = tupledArg_2[0];
                        return v_2 === "className";
                    }, map((value_43) => value_43, xs_16)))))])))))))));
                    return createElement("div", {
                        className: "control",
                        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
                    });
                }, [new HabitCategory(0, []), new HabitCategory(1, []), new HabitCategory(2, []), new HabitCategory(3, [])])));
            })), ["children", Interop_reactApi.Children.toArray(Array.from(elems_7))])]), createElement("div", createObj(toList(delay(() => append(xs_21, delay(() => singleton(["className", join(" ", append_1(singleton_1("field"), map((arg_3) => toString(arg_3[1]), filter((tupledArg_3) => {
                const v_3 = tupledArg_3[0];
                return v_3 === "className";
            }, map((value_49) => value_49, xs_21)))))]))))))))), delay(() => {
                if (isEmpty(model.Habits)) {
                    return singleton(createElement("p", {
                        children: ["No data available yet."],
                    }));
                }
                else {
                    const matchValue = model.StatsFilter.TimeRange;
                    switch (matchValue.tag) {
                        case 1: {
                            return singleton(calendarView(model.Habits, dispatch));
                        }
                        case 2: {
                            return singleton(yearlyOverviewChart(model.Habits));
                        }
                        default: {
                            return singleton(weeklyProgressChart(model.Habits));
                        }
                    }
                }
            }));
        }));
    })))), createElement("section", {
        className: "section",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
    })));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_5)),
    });
}

export function trackerPage(model, dispatch) {
    let elms, elms_1;
    const children_4 = ofArray([(elms = singleton_1(newHabitForm(model.NewHabitForm, dispatch)), createElement("section", {
        className: "section",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_1 = toList(delay(() => append(singleton(createElement("h3", {
        className: "title",
        children: "Your Habits",
    })), delay(() => {
        let children_1;
        return isEmpty(model.Habits) ? singleton(createElement("p", {
            children: ["No habits yet. Create one above!"],
        })) : singleton((children_1 = toList(delay(() => map_2((h) => habitCard(h, dispatch), model.Habits))), createElement("div", {
            children: Interop_reactApi.Children.toArray(Array.from(children_1)),
        })));
    })))), createElement("section", {
        className: "section",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))]);
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_4)),
    });
}

export function rootView(model, dispatch) {
    let elems;
    return createElement("div", createObj(ofArray([["style", {
        backgroundColor: model.DarkMode ? "#121212" : "white",
        color: model.DarkMode ? "white" : "black",
        minHeight: 100 + "vh",
    }], (elems = toList(delay(() => append(singleton(navbar(model, dispatch)), delay(() => {
        const matchValue = model.CurrentPage;
        switch (matchValue.tag) {
            case 1: {
                return singleton(trackerPage(model, dispatch));
            }
            case 2: {
                return singleton(statsPage(model, dispatch));
            }
            case 3: {
                return singleton(achievementsPage(model.Achievements));
            }
            default: {
                return singleton(homePage);
            }
        }
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

