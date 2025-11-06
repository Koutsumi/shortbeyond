import { test as baseTest, expect } from "@playwright/test";
import { authService } from "../services/auth";
import { linksService } from "../services/links";

// Define the types for your custom fixtures
type MyFixtures = {
  auth: ReturnType<typeof authService>;
  link: ReturnType<typeof linksService>;
};

const test = baseTest.extend<MyFixtures>({
    auth: async ({ request }, use) => {
    const auth = authService(request);
    await use(auth);
  },
  link: async ({ request }, use) => {
    const link = linksService(request);
    await use(link);
  },
});

export { test, expect };