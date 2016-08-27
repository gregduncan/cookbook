# The Cook Book

The Cook Book is a demo application developed to explore the second generation JavaScript framework Angularjs 2. This single page application allows users to create, read and delete simple culinary recipes. A very basic registration and authentication system is also included.
This project followed very closely the design patterns set out in an excellent blog post by [Chsakell](https://chsakell.com/2016/01/01/cross-platform-single-page-applications-with-asp-net-5-angular-2-typescript)

## Technologies and Architecture

The Cook Book is an ASP.NET Core 1.0 application. 

#### UI Layer
Angularjs 2 adopts a component based UI, a concept very similar to React. The Cook Book (TCB) consists of 5 components. Each TCB component in .NET speak represents a page.  Angularjs 2 nicely separates HTML from the component via templates. TCB is written in TypeScript which is standard practice for most Angularjs 2 apps.  Third party libraries are managed via NPM and Bower. JavaScript and CSS transpilation run via Gulp. Key technologies:

+ Angularjs 2
+ TypeScript
+ SASS
+ NPM, Bower
+ Gulp

#### Business Logic Layer
All data for the UI layer is processed via the API. The BLL has a simple data repository pattern which utilizes ASP.NET Core dependency injection.  The BLL is encapsulated within the Framework folder of the application. Data structures are divided into Models for entities and ViewModels for the API. Key technologies:

+ ASP.NET MVC 6
+ C# 6.0 
+ Web API

#### Data Access Layer
Microsoft's Entity Framework 7 represents the DAL. All repositories derive from the interface IEntityBaseRepository which exposes EF core functionality to the BLL. Key technologies:

+ Entity Framework 7

#### Data Store
An MSSQL local database is used to persist all data within the application. The database scheme is constructed via Code First migrations in Entity Framework.

+ Local DB
+ Code First migrations




