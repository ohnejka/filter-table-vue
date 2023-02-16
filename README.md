# filter-table

🖐 Hey, this is a quick test project to try some code architecture on front-end side table sorting.

## About

This is a Vue 3 + Vite + Typescript app.

```sh
npm run dev
```

starts both vue and express

## Folders structure

1. /apps - folder for app ignition. this app is the only one in the project, but there could also be a admin variation with more info to display

   1. inside: /assets, /infra (global dependencies for the whole app - store, router, api), /ui - index.vue which bootstraps the app

2. /libs - anythins that can be reused in any project: ui components, error and validation rules, routine store setups, styles etc
3. /server - mock express server which provides data
4. /pages - pages of the app. this app has only one page.
   1. as any module, every page can contain BL (business logics), UI, DS (data source) layers
   2. in Table/ui/widgets I put a ProjectsTab component, which is not really a widget, but I wanted to compose it as if it was, to extract logics into layers
   3. in Table/ui/components I wrote all logics in SFC - just to compare with widget structure

what else could be in the root: 5. /widgets - global widgets that can be reused by any other module in this project

## Benefits

With this kind of code organisation, it's simple to undestrand dependencies level.
You always know where to write any additional required logics - in BL or DS or UI.
