async function CreateCampaign(workflowCtx, portal) {
    return {
      "Step 1": {
        name: "Calling Your First API",
        stepCallback: async () => {
          return workflowCtx.showContent(`
  ## Welcome to Trade Desk API Guided Walkthrough
  
  Welcome to the guided walkthrough of using the Trade Desk API! In this tutorial, we'll walk you through the process of making your first API call, where you'll create a new campaign on Trade Desk using their powerful API.
  
  ### What to Expect:
  1. **Setting Up**: We’ll start by getting you authenticated, so you can securely interact with the Trade Desk API.
  2. **Making Your First Call**: Once you're authenticated, we’ll guide you through creating your first campaign, a fundamental action when using the API.
  3. **Next Steps**: You’ll learn how to modify and manage campaigns as you advance in your API journey.
  
  By the end of this guide, you’ll have successfully created your first campaign on the Trade Desk platform, ready to scale and manage it using API calls.
  
  ![Guided Walkthrough](../static/images/guided-walkthrough.gif)
  
  Let’s dive in and get started with your first API call!
          `);
        },
      },
      "Step 2": {
        name: "Create campaign",
        stepCallback: async (stepState) => {
          await portal.setConfig((defaultConfig) => {
            return {
              ...defaultConfig,
              auth: {
                ...defaultConfig.auth,
                Bearer: {
                  ...defaultConfig.auth.Bearer,
                  AccessToken: "REPLACE ME"
                },
              }
            };
          });
     
          return workflowCtx.showEndpoint({
            description:
              "This endpoint retrieves an authorization token required for accessing protected resources in the API. You will need your client ID and client secret to authenticate.",
            endpointPermalink: "$e/Campaign/Create%20a%20new%20campaign%20with%20required%20fields",
            verify: (response, setError) => {
              if (response.StatusCode == 401 || response.StatusCode == 400|| response.StatusCode == 403) {
                setError("Authentication Token is Required. Please check your credentials.");
                return true;
              } else if (response.StatusCode == 200) {
                return true;
              } else {
                setError(
                  "API Call wasn't able to get a valid response. Please try again."
                );
                return false;
              }
            },
          });
        },
      },
      "Step 3": {
        name: "What Next?",
        stepCallback: async () => {
          return workflowCtx.showContent(`
  ## What’s Next After Your First API Call?
  
  Congratulations! You've successfully made your first API call and interacted with the Trade Desk platform. Now, let’s talk about the next steps and how you can continue to explore and expand the functionality.
  
  ### What to Expect Next:
  1. **Retrying with Different Values**: Now that you’ve successfully called an endpoint, feel free to retry with different values to see how the API responds to various parameters. This will help you understand how flexible and powerful the Trade Desk API can be.
    
  2. **Chaining API Calls**: Use the response from this call as input for other API calls. By chaining multiple calls together, you can build more complex workflows, such as updating campaigns or retrieving advanced reports.
  
  3. **Explore More Endpoints**: The possibilities are endless! You can now explore more endpoints to create, update, and manage campaigns, or dig deeper into analytics to gain more insights about your campaigns.
  
  As you continue on your journey, we recommend experimenting with different API calls and getting comfortable with how the Trade Desk API works. Keep building, and your ability to automate and control campaigns will only grow!
  
  Keep going and enjoy building with the API!
          `);
        },
      },
    };
  }
  
  window.CreateCampaign = CreateCampaign;