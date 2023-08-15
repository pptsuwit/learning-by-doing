import { seedCustomer } from "./customer";
async function main() {
  console.log("main run");
  await seedCustomer();
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
