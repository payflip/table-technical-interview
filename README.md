# Technical interview : The Table component

## Objective

The goal of this exercice is to implement the **sort functionality** of the given **`<Table/>` component**.

The table's public API is already done and it accepts a `sortable` prop that **must enable the sorting** of the table **on all columns**.

The table also accepts a configuration per column and therefore the column's configuration **must take precedence over the table's configuration**.

The project comes with a series of tests. To complete the exercice, all the tests should pass.

You are **allowed to change any implementation details** of `<Table />` but you are **not allowed to change its Public API**.

##Set up
You are given a project with **Storybook** and **Jest** set up.

To properly run the solution you have to execute the following two commands, **each one in their own terminal instance** :

- `yarn storybook`
- `yarn test`

**Storybook** provides you with a nice UI interface to interact with your component.

Thanks to the `@storybook/addon-jest` package, we are able to display the test results in the content of the **Tests** tab.

Once you have run the previous two commands, you should be ready to hack !

##Technologies

- React
- Typescript
- Jest
- React Testing Library
- Storybook
