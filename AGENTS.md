# AGENTS.md - NBP Currency App

This file contains essential information for AI agents working on the NBP Currency App codebase.

## Project Overview

A React TypeScript application that displays currency exchange rates from the National Bank of Poland (NBP) API. Features include:
- Currency tables display (A and B tables)
- Favorites functionality
- Redux state management
- Axios for API calls

## Technology Stack

- **Frontend**: React 16.12.0 with TypeScript 3.7.2
- **State Management**: Redux 4.0.5 with redux-thunk
- **HTTP Client**: Axios 1.6.0
- **Testing**: Jest + React Testing Library
- **Build Tool**: Create React App (react-scripts 3.3.1)
- **Package Manager**: Yarn

## Build/Lint/Test Commands

### Development
```bash
yarn start          # Start development server on localhost:3000
yarn build          # Create production build in /build directory
```

### Testing
```bash
yarn test           # Run all tests in interactive watch mode
yarn test -- --watchAll=false  # Run all tests once without watch mode
yarn test -- --testPathPattern=actions.test.ts --watchAll=false  # Run single test file
yarn test -- --testNamePattern="Should return table from single endpoint" --watchAll=false  # Run single test by name
yarn test -- --coverage  # Run tests with coverage report
```

### Linting & Type Checking
```bash
# ESLint (via react-scripts)
yarn build  # Build command includes linting and type checking
```

## Code Style Guidelines

### TypeScript Configuration
- **Strict mode**: Enabled (`"strict": true`)
- **Target**: ES5 with ESNext libraries
- **JSX**: React JSX transform
- **Module resolution**: Node with ESNext modules

### Naming Conventions
- **Components**: PascalCase (e.g., `TablesList`, `CurrencyItem`)
- **Functions/Actions**: camelCase (e.g., `getTables`, `toggleFav`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `GET_TABLE_SUCCESS`)
- **Files**: PascalCase for components, camelCase for utilities
- **Directories**: camelCase (e.g., `store/tables/`)
- **Interfaces**: PascalCase with descriptive names (e.g., `AppProps`, `Currency`)

### Import Organization
```typescript
// 1. React imports first
import React from "react";

// 2. Third-party libraries
import { connect } from "react-redux";
import axios from "axios";

// 3. Local imports - types first, then components/utilities
import { Currency } from "./store/tables/types";
import TablesList from "./TablesList/TablesList";

// 4. Relative imports within same directory
import { toggleFav } from "./actions";
```

### Component Patterns

#### Class Components (for stateful components)
```typescript
interface ComponentProps {
  data: string;
  onAction: (param: string) => void;
}

class MyComponent extends React.Component<ComponentProps> {
  componentDidMount() {
    // Lifecycle methods
  }

  render() {
    const { data, onAction } = this.props;
    return (
      <div>
        {/* JSX */}
      </div>
    );
  }
}
```

#### Functional Components (for presentational components)
```typescript
interface ComponentProps {
  item: ItemType;
  onClick: () => void;
}

export const MyComponent = (props: ComponentProps) => {
  return (
    <div onClick={props.onClick}>
      {props.item.name}
    </div>
  );
};
```

### Redux Patterns

#### Action Types
```typescript
export const ACTION_TYPE = "ACTION_TYPE";
export const ACTION_SUCCESS = "ACTION_SUCCESS";
export const ACTION_ERROR = "ACTION_ERROR";
```

#### Action Creators
```typescript
export function simpleAction(payload: PayloadType) {
  return {
    type: ACTION_TYPE,
    payload
  };
}

export function asyncAction(param: string) {
  return (dispatch: Dispatch) => {
    dispatch({ type: ACTION_START });
    return apiCall(param)
      .then(data => dispatch({ type: ACTION_SUCCESS, payload: data }))
      .catch(error => dispatch({ type: ACTION_ERROR, payload: error }));
  };
}
```

#### Reducers
```typescript
const initialState: StateType = {
  loading: false,
  data: [],
  error: null
};

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case ACTION_START:
      return { ...state, loading: true };
    case ACTION_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case ACTION_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
```

### Testing Patterns

#### Setup
```typescript
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const http = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
```

#### Test Structure
```typescript
describe("feature/description", () => {
  test("Should perform expected behavior", async () => {
    const store = mockStore({ initialState });
    http.onGet("/api/endpoint").reply(200, mockData);

    await store.dispatch(actionCreator());
    const actions = store.getActions();

    expect(actions[0].type).toBe(EXPECTED_TYPE);
    expect(actions[0].payload).toEqual(expectedPayload);
  });
});
```

### Error Handling
- Use try/catch in async actions
- Dispatch error actions with error payloads
- Handle API errors gracefully in components
- Use TypeScript strict null checks

### Styling
- Mix of inline styles and CSS files
- CSS modules not used (plain CSS imports)
- Component-specific styles in same directory as component

### File Structure
```
src/
├── components/          # Reusable UI components
├── store/              # Redux store
│   ├── feature/        # Feature-specific store modules
│   │   ├── actions.ts
│   │   ├── reducer.ts
│   │   ├── types.ts
│   │   └── *.test.ts
│   └── createHttpClient.ts
├── App.tsx
├── index.tsx
└── setupTests.ts
```

### Best Practices
- **Types**: Define interfaces for all props, state, and API responses
- **Error Boundaries**: Consider adding for production error handling
- **Accessibility**: Use semantic HTML and ARIA labels where appropriate
- **Performance**: Use React.memo for expensive components if needed
- **Security**: Avoid inline event handlers that could lead to XSS
- **Testing**: Test actions, reducers, and component behavior
- **API**: Handle loading states and errors in UI

### Common Patterns to Follow
1. Always type function parameters and return values
2. Use descriptive variable names
3. Keep components small and focused
4. Separate business logic from presentation
5. Handle async operations with loading states
6. Test both success and error scenarios
7. Use consistent error handling patterns

### Code Quality Checks
Before committing:
1. Run tests: `yarn test --watchAll=false`
2. Build successfully: `yarn build`
3. TypeScript compilation passes
4. ESLint passes (included in build)

This ensures code quality and prevents regressions.