import { join } from "./fable_modules/fable-library.4.0.0/String.js";
import { map as map_1, append, empty, singleton, delay, toList } from "./fable_modules/fable-library.4.0.0/Seq.js";
import { int32ToString, createObj, equals } from "./fable_modules/fable-library.4.0.0/Util.js";
import { Msg } from "./Update.fs.js";
import { toArray, collect, isEmpty, length, filter, map, singleton as singleton_1, append as append_1, ofArray } from "./fable_modules/fable-library.4.0.0/List.js";
import { createElement } from "react";
import { toString } from "./fable_modules/fable-library.4.0.0/Types.js";
import { Interop_reactApi } from "./fable_modules/Feliz.2.4.0/./Interop.fs.js";
import { Page } from "./Model.fs.js";
import { defaultOf } from "./fable_modules/Feliz.2.4.0/../fable-library.4.0.0/Util.js";
import { toString as toString_1, date, equals as equals_1, dayOfWeek, addDays, utcNow, toShortDateString } from "./fable_modules/fable-library.4.0.0/Date.js";
import { rangeDouble } from "./fable_modules/fable-library.4.0.0/Range.js";
import { defaultArg } from "./fable_modules/fable-library.4.0.0/Option.js";
import { map as map_2 } from "./fable_modules/fable-library.4.0.0/Array.js";
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
        dispatch(new Msg(7, []));
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
    })), (elms_3 = singleton_1((elms_2 = ofArray([navItem("Home", new Page(0, []), model.CurrentPage, dispatch), navItem("Tracker", new Page(1, []), model.CurrentPage, dispatch), navItem("Stats", new Page(2, []), model.CurrentPage, dispatch)]), createElement("div", {
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
    })), delay(() => {
        let matchValue, err, xs_1;
        return append((matchValue = form.Error, (matchValue == null) ? singleton(defaultOf()) : ((err = matchValue, singleton((xs_1 = ofArray([["className", "is-danger"], ["children", err]]), createElement("div", createObj(toList(delay(() => append(xs_1, delay(() => singleton(["className", join(" ", append_1(singleton_1("notification"), map((arg) => toString(arg[1]), filter((tupledArg) => {
            const v_3 = tupledArg[0];
            return v_3 === "className";
        }, map((value_9) => value_9, xs_1)))))])))))))))))), delay(() => {
            let xs_5;
            return singleton((xs_5 = ofArray([["className", "is-primary"], ["children", "Add Habit"], ["onClick", (_arg_1) => {
                dispatch(new Msg(4, []));
            }]]), createElement("button", createObj(toList(delay(() => append(xs_5, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
                const v_4 = tupledArg_1[0];
                return v_4 === "className";
            }, map((value_16) => value_16, xs_5)))))])))))))));
        }));
    }))))))))));
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    });
}

export function habitCard(habit, dispatch) {
    let elms, elms_1, xs_2, xs_6;
    const elms_2 = ofArray([createElement("h5", {
        className: "title",
        children: habit.Title,
    }), (elms = ofArray([createElement("p", {
        children: [habit.Description],
    }), createElement("p", {
        children: [`Target: ${habit.TargetPerWeek}x/week`],
    }), createElement("p", {
        children: [`Created: ${toShortDateString(habit.CreatedAt)}`],
    }), createElement("p", {
        children: [`Progress: ${length(habit.Progress)} total`],
    })]), createElement("div", {
        className: "content",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })), (elms_1 = ofArray([(xs_2 = ofArray([["className", "is-success"], ["children", "Done Today"], ["onClick", (_arg) => {
        dispatch(new Msg(6, [habit.Id, utcNow()]));
    }]]), createElement("a", createObj(toList(delay(() => append(xs_2, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg) => toString(arg[1]), filter((tupledArg) => {
        const v = tupledArg[0];
        return v === "className";
    }, map((value_17) => value_17, xs_2)))))])))))))), (xs_6 = ofArray([["className", "is-danger"], ["children", "Delete"], ["onClick", (_arg_2) => {
        dispatch(new Msg(5, [habit.Id]));
    }]]), createElement("a", createObj(toList(delay(() => append(xs_6, delay(() => singleton(["className", join(" ", append_1(singleton_1("button"), map((arg_1) => toString(arg_1[1]), filter((tupledArg_1) => {
        const v_1 = tupledArg_1[0];
        return v_1 === "className";
    }, map((value_24) => value_24, xs_6)))))]))))))))]), createElement("div", {
        className: "buttons",
        children: Interop_reactApi.Children.toArray(Array.from(elms_1)),
    }))]);
    return createElement("div", {
        className: "box",
        children: Interop_reactApi.Children.toArray(Array.from(elms_2)),
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
        })) : singleton((children_1 = toList(delay(() => map_1((h) => habitCard(h, dispatch), model.Habits))), createElement("div", {
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

export function weeklyProgressChart(habits) {
    let properties_6, margin, elements, properties_1;
    const now = utcNow();
    const startOfWeek = addDays(now, -dayOfWeek(now));
    const days = toList(rangeDouble(0, 1, 6));
    const data = map((i) => {
        const day = addDays(startOfWeek, i);
        const count = length(filter((d) => equals_1(date(d), date(day)), collect((h) => h.Progress, habits))) | 0;
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
    }, ["margin", margin]), (elements = ofArray([(properties_1 = singleton_1(["strokeDasharray", join(" ", map_2(int32ToString, new Int32Array([3, 3]), null))]), Interop_reactApi_1.createElement(CartesianGrid, createObj(properties_1))), Interop_reactApi_1.createElement(XAxis, {
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

export function statsPage(model) {
    let elms;
    const children_1 = singleton_1((elms = toList(delay(() => append(singleton(createElement("h3", {
        className: "title",
        children: "Progress Overview",
    })), delay(() => (isEmpty(model.Habits) ? singleton(createElement("p", {
        children: ["No data available yet."],
    })) : singleton(weeklyProgressChart(model.Habits))))))), createElement("section", {
        className: "section",
        children: Interop_reactApi.Children.toArray(Array.from(elms)),
    })));
    return createElement("div", {
        children: Interop_reactApi.Children.toArray(Array.from(children_1)),
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
                return singleton(statsPage(model));
            }
            default: {
                return singleton(homePage);
            }
        }
    })))), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])])));
}

