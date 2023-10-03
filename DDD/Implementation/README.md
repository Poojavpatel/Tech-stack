# DDD Implementation

Quick guide to implement an API in a DDD codebase   
How information pages through the codebase    
What are the different components, what do they do, and how are they connected

### Task 
Create an API to update a page settings
```
PUT /api/v3/feed/page/:pageId/settings
```

## Table of Contents
- [Routing](#routing)
- [Usecase](#usecase)
    - [Index File](#index-file)
    - [Router File](#router-file)
    - [Usecase File](#usecase-file)
- [Domain Objects](#domain-objects)
    - [Value Objects](#value-objects)
    - [Aggregates](#aggregates)
    - [Entities](#entities)
- [Supporting Components](#supporting-components)
  - [Repo Methods](#repo-methods)
  - [Mappers](#mappers)
  - [Services](#services)
  - [Domain Events](#domain-events)
- [Others](#others)
  - [Jobs](#jobs)
  - [Runners](#runners)
  - [Testing](#testing)


## Routing  
The entry point is a `server.ts` file similar to other node apps    
Along with code to initialize app, establish db connection, etc, it routes all api requests to a router file    
```ts
// server.ts
export class AppServer extends Initializer {
  constructor() {
    ...
    this.routes();
    ...
  }

  private routes(): void {
    const router: express.Router = express.Router();
    ...
    this._app.use("/api/v3", v3Router);
    ...
  }
}
```

In DDD, the whole application (from codebase as well as real-life perspective) is thought of as individual domains (the specific area of expertise or business context the software addresses)   
The codebase had separate folders for each domain      
So in an app, users can be a domain, all entities and code specific to user resides in this domain  
Integrations can be a domain, all third party integrations resides in this domain  
The common router routes the request to its appropriate domain, in our case its feed `/api/v3/feed/page/:pageId/settings`

```ts
const v3Router = express.Router();

v3Router.use("/users", userDomainRouter);
v3Router.use("/feed", feedDomainRouter);
v3Router.use("/analytics", analyticsDomainRouter);
v3Router.use("/integration", integrationDomainRouter);
```

The feedRouter further routes it to pageRouter, which passes it on to the router specifically built for this endpoint   
Auth specific and other middlewares are also added at these routing stages
```ts
pageRouter.put(`/:pageId/settings`, (req, res) =>
  updatePageSettingsRouter.execute(req, res)
);
```

## Usecase 

Usecases are where the actually business logic is coded   
The implementation in usecase is according to the project requirements    
For each API endpoint, create a folder containing these files
```ts
updatePageSettings
  - UpdatePageSettingsRouter.ts     // formats the request body, passes to usecase, handles sending appropriate response to client
  - UpdatePageSettingsUseCase.ts      // Validation of request body, actual business logic, handling all edge cases and exceptions
  - IUpdatePageSettingsRequestDTO.ts     // Specifies the expected request format using interfaces
  - IUpdatePageSettingsResponseDTO.ts      // Specifies format of response that will be sent to client using interfaces
  - UpdatePageSettingsUseCase.api.spec.ts     // API test cases for the endpoint
  - index.ts      // instantiates and exports router object by passing all required dependencies
```

### Index file 
The index file simply instantiates and exports router object by passing all required dependencies
```ts
const updatePageSettingsUseCase = new UpdatePageSettingsUseCase(
  { pageRepo }, // all required repos
  { pagePermissionsService} // all required services
);
const updatePageSettingsRouter = new UpdatePageSettingsRouter(updatePageSettingsUseCase);

export { updatePageSettingsRouter };
```

### Router file 
The Router file contains the api documentation using js doc   
It formats the req body according to the usecase requirement and passes it to execute method of the usecase   
It handles appropriate response to client based on response from usecase
```ts
export class UpdatePageSettingsRouter extends BaseRouter {
  private useCase: UpdatePageSettingsUseCase;

  constructor(useCase: UpdatePageSettingsUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: IUpdatePageSettingsRequestDTO = {
      ...
      pageId: req.params.pageId,
      settings: req.body.settings
    };

    try {
      const result = await this.useCase.execute(dto);

      if (/*result is an handled error*/) {
        const error = result.value;

        switch (/* error type */) {
          case CustomError:
            // return res.status(409).json({ "Custom error", body });

          case UnauthorizedAccessError:
            // return res.status(403).json({ "Forbidden", body });

          default:
            // return res.status(500).json({ "Internal server error", body });
        }
      }

      /* Else result is a success */
      return this.ok(res, result.value.getValue()); // This will be of type IUpdatePageSettingsResponseDTO
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
```

### Usecase 
Usecase contains the entire logic of the endpoint

```ts
type Response = Either<AppError.CustomError | AppError.UnexpectedError, Result<IUpdatePageSettingsResponseDTO>>;

export class UpdatePageSettingsUseCase
  implements UseCase<IUpdatePageSettingsRequestDTO, Promise<Response>>
{
  private pageRepo: IPageRepo;
  private pagePermissionsService: IPagePermissionsService;

  constructor(pageRepo: IPageRepo, pagePermissionsService: IPagePermissionsService) {
    this.pageRepo = pageRepo;
    this.pagePermissionsService = pagePermissionsService;
  }

  public async execute(request: IUpdatePageSettingsRequestDTO): Promise<Response> {
    // Add logger 

    try {
      const { pageId, settings } = request;

      /* 1. Initial validation of request params using Guards  */
      const guardResult = ...

      if (!guardResult.succeeded) {
        return left(AppError.CustomError.create(COMMON_ERROR_CODES.MISSING_REQUIRED_PARAMETERS, guardResult.message));
      }

      /* 2. Using service methods as required */
      const isEnabled = await this.pagePermissionsService.isFeatureEnabled(SOME_RANDOM_PERMISSION, id);

      /* 3. Create domain objects (entities, value objects, aggregates) as required */
      const permission = SharePermission.create({ isSet: true, value: settings });

      /* 4. Update domain objects using their methods as required, raising of events is handled in the domain object methods */
      permission.updateSharingPermission(permOrError.getValue(), request.memberId);

      /* 5. Use repo methods to persist changes to db */
      await this.pageRepo.saveSettings(collectionSettings);

      return right(Result.ok({/* IUpdatePageSettingsResponseDTO */}));
    } catch (error) {
      logger.error(error);
      return left(AppError.UnexpectedError.create(error));
    }
  }
}
```

## Domain objects 
Entities, Value Objects, and Aggregates are fundamental building blocks in Domain-Driven Design (DDD) that help you model and structure your domain in a way that reflects the real-world problem you're solving   
Domain objects in a codebase can either be an entity or a value object or an aggregate   
Also since domain object code is present in a domain folder, you cant use it outside a domain   

**My Take**   
If it does not need to be represented with an id, its a value object   
If it needs an id for representation and needs domain events, its an aggregate   
Else its an entity

### Value objects 
* Value Objects are objects without distinct identities
* They are immutable, meaning their state cannot change once created
* They represent concepts with attributes but no meaningful lifecycle on their own.
* Example: A "Price" can be a value object. Prices are defined by their amount and currency, but they don't have a unique identity.
* An object can have both an aggregate and a value object as well   
  Example - I will create an `Order` aggregate and an `OrderDetails` value object as well   
  When i am building an API where i just need to get or read the order and make no updates to it, i use the `OrderDetails` vo   
  When i need to update any order related fields, I use the `Order` aggregate and its update methods and domain events


**When to Choose a Value Object:**
* If the object doesn't need a unique identity

  ```ts
  interface IPagePermissionProps {
    isSet: boolean;
    value: PagePermissionEnum;
  }

  export class PagePermission extends ValueObject<IPagePermissionProps> {
    private constructor(props: IPagePermissionProps) {
      super(props);
    }

    get value(): PagePermissionEnum {
      return this.props.value;
    }

    get isSet(): boolean {
      return this.props.isSet;
    }

    get isEveryone(): boolean {
      return this.props.value === PagePermissionEnum.EVERYONE;
    }

    get isAdminsOnly(): boolean {
      return this.props.value === PagePermissionEnum.ADMINS;
    }

    // No setter methods as vo are read-only

    public static createAdminsOnly(): PagePermission {
      return new PagePermission({ isSet: true, value: PagePermissionEnum.ADMINS });
    }

    public static createDefault(): PagePermission {
      return new PagePermission({ isSet: true, value: PagePermissionEnum.EVERYONE });
    }

    public static create(props: IPagePermissionProps): Result<PagePermission> {
      // Validations
      return Result.ok(new PagePermission({ isSet: props.isSet === true, value: props.value }));
    }
  }
  ```

### Aggregates 
* Aggregates are clusters of related entities and value objects treated as a single unit.
* Each aggregate has an aggregate root, which is an entity serving as the entry point for interactions with the aggregate
* Aggregates help maintain data integrity and encapsulate complex business rules that span multiple entities and value objects.
* Example: In an e-commerce application, an "Order" can be an aggregate with the "Order" entity as its aggregate root. The order entity contains information about the customer, items, and pricing, and it ensures consistency when updating order details.
* You can also raise domain events from an update property method in an aggregate
* For each aggregate, all domain events that are raised are saved in an array, they are dispatched at once in repo method once db operation is completed

```ts
export interface IPageSettingsProps {
  sharing?: PagePermission;  // this is a value object
  lastEditedBy?: MemberId;   // this is an entity
}

export class PageSettings extends AggregateRoot<IPageSettingsProps> {
  private constructor(props: IPageSettingsProps, id?: UniqueEntityID) {
    super(props, id);
  }

  // getter setter methods

  // update methods that can raise Domain events if required
  public updatePagePermission(permission: PagePermission, editedBy?: MemberId): void {
    this.props.sharing = permission;
    if (editedBy) this.props.lastEditedBy = editedBy;

    this.addDomainEvent(new PagePermissionUpdated(this, editedBy));
  }

  public static create(props: IPageSettingsProps, id?: UniqueEntityID): Result<PageSettings> {
    // validations
    const defaultProps: IPageSettingsProps = {
      ...props,
      sharing: props.sharing || ShareCollectionPermission.createDefault()
    };

    return Result.ok<PageSettings>(new PageSettings(defaultProps, id));
  }
}

```

### Entities 
* These are objects with distinct identities that are defined by their unique identifiers   
* They have a distinct lifecycle and can change over time while maintaining their identity   
* Entities typically represent core business objects that need to be tracked and referenced individually and often have attributes and behavior associated with   
* Example: In an e-commerce application, a "Product" can be an entity. Each product has a unique ID and can be modified (e.g., price changes, stock updates) while retaining its identity.  

**When to Choose an Entity:**
* When you want to enforce identity-based equality (i.e., two objects with the same ID are considered equal)

  ```ts
  /* 
    Entities are basically just used for ids 
    Eg OrderId, ProductId, etc

    It usually just has a getId method and a create method
  */
  ```

## Supporting Components

### Repo methods
* Repositories act as a layer of abstraction between the application's domain model and the underlying database or data storage mechanism
* The primary purpose of repositories is to provide a clean and consistent way to query and persist domain objects, such as entities and aggregates, without the domain model having to be aware of the data access specifics.
* All db specific operations are done in repo methods

  ```ts
  /* Interface defining all db methods */
  export interface IPageRepo {
    findPageDetailsById(pageId: UniqueEntityID | string): Promise<PageDetails>;
    getPageQueryBuilder(id: UniqueEntityID | string, paginationOptions: PagePaginationOptions): PageQueryBuilder;
    getPages(queryBuilder: IPageQueryBuilderResponse): Promise<IPaginationResponse<PageDetails>>;
    savePage(page: Page): Promise<void>;
  }

  export class PageRepo implements IPageRepo {
    private pageModel: IPageModel;

    /* The db model (collection) related to this repo method */
    constructor(pageModel: IPageModel) {
      this.pageModel = pageModel;
    }

    async findPageDetailsById(id: string | UniqueEntityID): Promise<PageDetails> {
      /* Persistance object received from db */
      const rawPage = await this.pageModel
        .findById(id)
        .populate(PageDetailsMap.getPopulateFields())
        .select(PageDetailsMap.selectedFields())
        .lean<IPage>();

      /* Converted to domain object using mapper method and returned */
      return rawPage ? PageDetailsMap.toDomain(rawPage) : null;
    }

    /* Builder pattern implementation */
    public getPageQueryBuilder(id: UniqueEntityID | string, paginationOptions: PagePaginationOptions): PageQueryBuilder {
      return new PageQueryBuilder(id, paginationOptions);
    }

    public async savePageOccurrence(pageId: string | UniqueEntityID, pageOccurrence: PageOccurrence): Promise<void> {
      /* Getting raw persistance data to be saved to db using mapper method */
      const rawOccurrenceData = PageOccurrenceMap.toPersistence(pageOccurrence);
      await this.pageModel.updateOne({ _id: pageId }, { $set: { occurrence: rawOccurrenceData } });

      /* Dispatching all domain events of that aggregate from Repo once db operation is completed */
      DomainEvents.dispatchEventsForAggregate(pageOccurrence.id);
      return;
    }
  }
  ```

### Mappers
* Mappers are used to facilitate the conversion between domain objects (entities or aggregates) and the data representation used by the data storage mechanism, such as a relational database
* Mappers play a crucial role in the data access layer of your application, ensuring that domain objects can be properly persisted and retrieved from the data store

  ```ts
  export class PageSettingsMap implements Mapper<PageSettings> {
    /* Converts persistance object to Domain object */
    public static toDomain(id: string | UniqueEntityID, config: IPageSettings): PageSettings {
      /* In case of aggregates, toDomain methods of related value objects are called too */
    }

    /* Converts Domain object to persistance object (plain JSON object) that will be saved to db */
    public static toPersistence(settings: PageSettings): IPageSettings {
      const rawData: IPageSettings = {
        _id: id.toObjectId(),
        sharing: {
          isSet: settings.sharing.isSet,
          value: settings.sharing.value
        }
      };

      const pureRawDate = <IPageSettings>_.omitBy(rawData, _.isNil);

      return pureRawDate;
    }

    /*
      Converts Domain object to a format to be sent to FE or any other external service 
      DTO here means data transfer object
    */
    public static toDTO(settings: PageSettings): IPageSettingsDTO {
      return {
        name: userTour.tourName.value,
        status: userTour.status.value
      };
    }
  }
  ```

### Services
* Services represent domain-specific operations or business logic that doesn't naturally fit within the scope of an entity or value object. 
* They are stateless and can be used to coordinate actions across aggregates or enforce domain rules
* Also since domain object code is present in a domain folder, you cant use it outside a domain
* Services can be used outside domains

### Domain events
* Domain events are events that represent something significant happening within the domain. 
* They are used to communicate changes or state transitions within aggregates and can trigger actions or workflows in other parts of the system.

## Others

### Jobs

### Runners

### Testing