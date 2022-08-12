# MonstyrApp

## How to run the app

Ensure node.js is installed

In the frontend folder,

```
npm install

ng serve

(If error: ng command not found)
npm install -g @angular/cli@latest
```

## Frontend

- Every component has their own `component.ts`, `component.spec.ts`, `component.html`, `component.css`

- `spec.ts` files can be used for unit testing

- Start up of the app first looks at app.module.ts where it will render
- index.html which will look for selector called `<app-root>` which can be found in `app.component.ts`

- Common css declarations can be found in `styles.css`, otherwise will be declared in each component's `component.css` file

- The app will the route to respective components by looking at the routes declared in `app-routing.module.ts`

Structure:

```
📦src
 ┣ 📂app
 ┃ ┣ 📂add-new-account                          # Route: /add
 ┃ ┣ 📂add-post                                 # Route: /home/addpost
 ┃ ┣ 📂confirmation-dialog                      # Only used when showing confirmation dialog when deleting posts
 ┃ ┣ 📂dashboard-card
 ┃ ┣ 📂edit-live-post                           # Route: /editLive/:id
 ┃ ┣ 📂edit-pending-post                        # Route: /edit/:id
 ┃ ┣ 📂home-page                                # Route: /home (only used to add side nav bar)
 ┃ ┣ 📂live-post                                # Route: /home/processed
 ┃ ┣ 📂login                                    # Route: /login
 ┃ ┣ 📂overview-page                            # Route: /home/overview
 ┃ ┣ 📂pending-post                             # Route: /home/pending
 ┃ ┃ ┣ 📜login.component.css                    # Style sheet for login.component.html
 ┃ ┃ ┣ 📜login.component.html                   # Rendered when login component is created
 ┃ ┃ ┣ 📜login.component.spec.ts                # Used to write RSPEC tests
 ┃ ┃ ┗ 📜login.component.ts                     # Created when the specific route is called as
 ┃ ┣ 📜account.model.spec.ts
 ┃ ┣ 📜account.model.ts                         # Model to store user accounts
 ┃ ┣ 📜app-routing.module.ts                    # All the routes and which component to direct to are declared here
 ┃ ┣ 📜app.component.css
 ┃ ┣ 📜app.component.html
 ┃ ┣ 📜app.component.spec.ts
 ┃ ┣ 📜app.component.ts
 ┃ ┣ 📜app.module.ts                            # All additional modules, components, services are declared here
 ┃ ┣ 📜data-service.service.spec.ts
 ┃ ┣ 📜data-service.service.ts                  # All of HTTP request URLs and global variables are housed here
 ┃ ┣ 📜env.ts                                   # URL of APIs are declared here (Can be changed depending on local or deployed versions)
 ┃ ┣ 📜product.model.spec.ts
 ┃ ┗ 📜product.model.ts                         # Model to store products
 ┣ 📜favicon.ico
 ┣ 📜index.html
 ┣ 📜main.ts
 ┣ 📜polyfills.ts
 ┣ 📜styles.css
 ┗ 📜test.ts
```
