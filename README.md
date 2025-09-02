# NgRx Generator from Swagger/OpenAPI

[![Python](https://img.shields.io/badge/Python-3.7+-blue.svg)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-12+-red.svg)](https://angular.io/)
[![NgRx](https://img.shields.io/badge/NgRx-12+-purple.svg)](https://ngrx.io/)

A powerful Python tool that automatically generates complete NgRx store architecture from Swagger/OpenAPI specifications. Save hours of boilerplate code writing and ensure consistency across your Angular applications.

## 🚀 Features

- **Complete NgRx Architecture**: Generates actions, effects, reducers, selectors, and services
- **Type Safety**: Creates TypeScript interfaces from Swagger schemas
- **Modern NgRx Patterns**: Uses latest NgRx APIs (`createAction`, `createReducer`, `createEffect`)
- **Smart Organization**: Groups endpoints by Swagger tags for clean project structure
- **Parameter Handling**: Supports path parameters, query parameters, and request bodies
- **Error Handling**: Automatic success/failure action patterns
- **Barrel Exports**: Clean import structure with index files
- **Multiple Formats**: Supports both JSON and YAML Swagger files

## 📦 Installation

### Prerequisites

- Python 3.7 or higher
- pip package manager

### Install Dependencies

```bash
pip install pyyaml
```

### Download the Generator

```bash
git clone https://github.com/Hamed-kshiem/swagger-ngrx-generator.git
```

## 🎯 Quick Start

### 1. Basic Usage

```bash
python ngrx_generator.py swagger.json
```

### 2. Custom Output Directory

```bash
python ngrx_generator.py swagger.yaml -o ./src/app/core/store
```

### 3. Using the Test File

```bash
# Generate using the included test Swagger file
python ngrx_generator.py test-swagger.yaml -o ./test-output
```

## 📁 Generated Structure

The generator creates a complete, organized NgRx store structure:

```
src/app/store/
├── actions/
│   ├── users.actions.ts          # User-related actions
│   ├── products.actions.ts       # Product-related actions
│   ├── orders.actions.ts         # Order-related actions
│   └── index.ts                  # Barrel exports
├── effects/
│   ├── users.effects.ts          # HTTP effects for users
│   ├── products.effects.ts       # HTTP effects for products
│   ├── orders.effects.ts         # HTTP effects for orders
│   └── index.ts                  # Barrel exports
├── reducers/
│   ├── users.reducer.ts          # User state management
│   ├── products.reducer.ts       # Product state management
│   ├── orders.reducer.ts         # Order state management
│   └── index.ts                  # Barrel exports
├── selectors/
│   ├── users.selectors.ts        # User state selectors
│   ├── products.selectors.ts     # Product state selectors
│   ├── orders.selectors.ts       # Order state selectors
│   └── index.ts                  # Barrel exports
├── services/
│   ├── users.service.ts          # Angular HTTP services
│   ├── products.service.ts       # Angular HTTP services
│   ├── orders.service.ts         # Angular HTTP services
│   └── index.ts                  # Barrel exports
├── models/
│   ├── user.model.ts             # TypeScript interfaces
│   ├── product.model.ts          # TypeScript interfaces
│   ├── order.model.ts            # TypeScript interfaces
│   └── index.ts                  # Barrel exports
└── index.ts                      # Main barrel export
```

## 📝 Command Line Options

```bash
python ngrx_generator.py [swagger_file] [options]
```

### Arguments

| Argument | Description | Required |
|----------|-------------|----------|
| `swagger_file` | Path to Swagger/OpenAPI file (.json or .yaml) | Yes |

### Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--output` | `-o` | Output directory path | `./src/app/store` |

### Examples

```bash
# Basic usage with JSON file
python ngrx_generator.py api-spec.json

# Basic usage with YAML file  
python ngrx_generator.py api-spec.yaml

# Custom output directory
python ngrx_generator.py swagger.json -o ./src/app/shared/store

# Full path specification
python ngrx_generator.py /path/to/swagger.yaml --output /path/to/output
```

## 🎨 Generated Code Examples

### Actions Example

```typescript
// users.actions.ts
import { createAction, props } from '@ngrx/store';

// Get Users
export const getUsers = createAction('[Users] Get Users');
export const getUsersSuccess = createAction(
  '[Users] Get Users Success',
  props<{ data: User[] }>()
);
export const getUsersFailure = createAction(
  '[Users] Get Users Failure',
  props<{ error: any }>()
);

// Create User
export const createUser = createAction(
  '[Users] Create User',
  props<{ payload: CreateUserRequest }>()
);
export const createUserSuccess = createAction(
  '[Users] Create User Success',
  props<{ data: User }>()
);
export const createUserFailure = createAction(
  '[Users] Create User Failure',
  props<{ error: any }>()
);
```

### Effects Example

```typescript
// users.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) {}

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.getUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map((data) => UsersActions.getUsersSuccess({ data })),
          catchError((error) => of(UsersActions.getUsersFailure({ error })))
        )
      )
    )
  );
}
```

### Service Example

```typescript
// users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = 'https://api.example.com/v1';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  createUser(payload: CreateUserRequest): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, payload);
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userId}`);
  }
}
```

## 🔧 Integration with Angular

### 1. Install NgRx Dependencies

```bash
npm install @ngrx/store @ngrx/effects @ngrx/store-devtools
```

### 2. Import Generated Store

```typescript
// app.module.ts
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Import generated files
import { usersReducer } from './store/reducers/users.reducer';
import { UsersEffects } from './store/effects/users.effects';

@NgModule({
  imports: [
    StoreModule.forRoot({
      users: usersReducer,
      // Add other reducers...
    }),
    EffectsModule.forRoot([
      UsersEffects,
      // Add other effects...
    ]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  // ...
})
export class AppModule {}
```

### 3. Use in Components

```typescript
// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from './store/models';
import * as UsersActions from './store/actions/users.actions';
import * as UsersSelectors from './store/selectors/users.selectors';

@Component({
  selector: 'app-user-list',
  template: `
    <div *ngFor="let user of users$ | async">
      {{ user.firstName }} {{ user.lastName }}
    </div>
  `
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private store: Store) {
    this.users$ = this.store.select(UsersSelectors.selectGetUsersData);
  }

  ngOnInit() {
    this.store.dispatch(UsersActions.getUsers());
  }
}
```

## 🛠️ Supported Swagger Features

### ✅ Supported

- **OpenAPI 3.0+** and **Swagger 2.0** specifications
- **Multiple HTTP methods**: GET, POST, PUT, PATCH, DELETE
- **Path parameters**: `/users/{userId}`
- **Query parameters**: `?page=1&limit=10`
- **Request bodies**: JSON payloads
- **Response schemas**: Complex nested objects
- **Tags**: For organizing endpoints into modules
- **Data types**: string, number, boolean, array, object
- **References**: `$ref` to reusable schemas
- **Enums**: String and number enums

### ❌ Not Yet Supported

- Authentication headers (coming soon)
- File uploads (multipart/form-data)
- XML responses
- Webhook specifications
- Custom serializers

## 🔍 Troubleshooting

### Common Issues

#### 1. "File not found" Error
```bash
❌ Error: Swagger file 'swagger.json' not found
```
**Solution**: Check the file path and ensure the file exists.

#### 2. YAML Parsing Error
```bash
❌ Error: Invalid YAML format
```
**Solution**: Validate your YAML file using an online YAML validator.

#### 3. Missing Operations
```bash
No operations found in Swagger file
```
**Solution**: Ensure your Swagger file has a `paths` section with HTTP methods.

#### 4. Permission Denied
```bash
❌ Error: Permission denied when creating directory
```
**Solution**: Check write permissions for the output directory.

### Debugging Tips

1. **Validate your Swagger file** using [Swagger Editor](https://editor.swagger.io/)
2. **Check file permissions** in the output directory
3. **Use verbose mode** by adding print statements to debug
4. **Test with the provided sample** `test-swagger.yaml` file

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Add tests if applicable
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ngrx-swagger-generator.git
cd ngrx-swagger-generator

# Install development dependencies
pip install -r requirements-dev.txt

# Run tests
python -m pytest tests/

# Run with sample file
python ngrx_generator.py test-swagger.yaml -o ./test-output
```

## 📊 Roadmap

- [ ] **Authentication Support**: Generate auth guards and interceptors
- [ ] **File Upload Support**: Handle multipart/form-data endpoints  
- [ ] **Custom Templates**: Allow custom code generation templates
- [ ] **CLI Enhancements**: Interactive mode and configuration files
- [ ] **Testing Generation**: Generate unit tests for NgRx code
- [ ] **Documentation**: Generate API documentation
- [ ] **Validation**: Generate form validators from schemas
- [ ] **Mock Generation**: Generate mock data for testing

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [NgRx Team](https://ngrx.io/) for the amazing state management library
- [OpenAPI Initiative](https://www.openapis.org/) for the specification standard
- [Angular Team](https://angular.io/) for the fantastic framework

---

**Made with ❤️ for the Angular community**

*Save time, reduce errors, and focus on building amazing features instead of writing boilerplate code!*
