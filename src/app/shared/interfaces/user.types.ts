export interface UserInterface {
    username: string,
    password: string,
    roles: string[],
    name: string
}

export interface UserWithoutRolesAndName extends Omit<Omit<UserInterface, 'roles'>, 'name'> {}
export interface UserWithoutPassword extends Omit<UserInterface, 'password'> {}

export interface UserLoginInterface {
    user: UserWithoutPassword,
    token: string,
}