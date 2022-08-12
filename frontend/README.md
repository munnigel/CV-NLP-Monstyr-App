# MonstyrApp

## Frontend

Flow of Frontend:

```
frontend
│ app.module.ts                 # All additional modules, components, services are declared here
│
│ app-routing.module.ts         # All the routes and which component to direct to are declared here
│
│ data-service.service.ts       # All of HTTP request URLs and global variables are housed here
│
│ env.ts                        # URL of APIs are declared here (Can be changed depending on local or deployed versions)
│
│ product.model.ts              # Model to store products
│
│ account.model.ts              # Model to store user accounts
│
└───login
│   │ login.component.css       # Style sheet for login.component.html
│   │ login.component.html      # Rendered when login component is created
│   │ login.component.spec.ts   # Used to write RSPEC tests
│   │ login.component.ts        # Created when the specific route is called as declared in app-routing.module.ts
│
└───overview-page
│
└───home-page
│
└───live-post
│
└───edit-live-post
│
└───pending-post
│
└───edit-pending-post
│
└───add-post
│
└───settings
│
└───add-new-account
│
│ file021.txt
│ file022.txt
```

```
📦src
 ┣ 📂app
 ┃ ┣ 📂add-new-account
 ┃ ┣ 📂add-post
 ┃ ┣ 📂confirmation-dialog
 ┃ ┣ 📂dashboard-card
 ┃ ┣ 📂edit-live-post
 ┃ ┣ 📂edit-pending-post
 ┃ ┣ 📂home-page
 ┃ ┣ 📂live-post
 ┃ ┣ 📂login
 ┃ ┣ 📂overview-page
 ┃ ┣ 📂pending-post
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
```
