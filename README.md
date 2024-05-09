## Steps to setup project

1. this project uses pnpm if not already installed please use "npm install -g pnpm" to install
2. run "nvm use" to pick up correct version of node from .nvmrc
3. inside the project direactory run "pnpm i" to install all dependencies.
4. to start developement server run "pnpm dev" . this will start local server on "http://localhost:3000".
5. to build the project run "pnpm build"
6. after build eun "pnpm start" for production server on "http://localhost:3000".

## Implementation

In this, we have created a simple user information form with four steps.

We have created a Home page, which is the root page. Inside it, we have our main form component.

We are using the React Context API to store and update data to synchronize between different steps of the form.

We have used a custom stepper component to display the current active step. We imported the steps dynamically to reduce the initial bundle size and added loading placeholders for steps 2, 3, and 4.

We have utilized all the UI components from Shadcn and Zod, and React Hook Form for form validation.

We have implemented a mock API to submit the form on the final step to demonstrate the service layer implementation. To display the actual data on the success page, we are setting and getting the data from the local storage.
