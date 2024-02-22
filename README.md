# SchoologyClient Class

## Constructor

### `constructor(key: string, secret: string)`

Creates an instance of the SchoologyClient.

- `key`: API key for Schoology authentication.
- `secret`: API secret for Schoology authentication.

Throws an error if `key` or `secret` is missing.

## Methods

### `getSchools(): Promise<any>`

Fetches a list of all schools.

### `getSchool(schoolId: string): Promise<any>`

Fetches information about a specific school.

- `schoolId`: ID of the school to fetch information about.

### `createSchool(schoolData: object): Promise<any>`

Creates a new school.

- `schoolData`: Data for creating the school.

### `editSchool(schoolId: string, schoolData: object): Promise<any>`

Edits an existing school.

- `schoolId`: ID of the school to edit.
- `schoolData`: Updated data for the school.

### `deleteSchool(schoolId: string): Promise<any>`

Deletes a school.

- `schoolId`: ID of the school to delete.

### `getBuildings(schoolId: string): Promise<any>`

Fetches a list of buildings for a specific school.

- `schoolId`: ID of the school whose buildings are to be fetched.

### `getBuilding(schoolId: string, buildingId: string): Promise<any>`

Fetches information about a specific building in a school.

- `schoolId`: ID of the school to which the building belongs.
- `buildingId`: ID of the building to fetch information about.

### `createBuilding(schoolId: string, buildingData: object): Promise<any>`

Creates a new building for a specific school.

- `schoolId`: ID of the school to which the building will be added.
- `buildingData`: Data for creating the building.

### `createUser(userData: object): Promise<any>`

Creates a new user.

- `userData`: Data for creating the user.

### `getUsers(): Promise<any>`

Fetches a list of all users.

### `getInactiveUsers(): Promise<any>`

Fetches a list of inactive users.

### `getUser(userId: string): Promise<any>`

Fetches information about a specific user.

- `userId`: ID of the user to fetch information about.

### `getInactiveUser(userId: string): Promise<any>`

Fetches information about a specific inactive user.

- `userId`: ID of the inactive user to fetch information about.

### `updateUser(userId: string, userData: object): Promise<any>`

Updates information about a specific user.

- `userId`: ID of the user to update.
- `userData`: Updated data for the user.

### `deleteUser(userId: string): Promise<any>`

Deletes a user.

- `userId`: ID of the user to delete.

## To Do

### The rest of the API lol!!!!!

- [ ] Finish adding all of the methods from the schoology API :,(