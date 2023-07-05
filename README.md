# Evidently Frontend Interview

Let’s take a few minutes to help get you familiar with the codebase.
Don’t be afraid to ask questions or even look things up you may not know perfectly. MDN is your friend.
We view it as a better quality that you utilize resources over randomly performing repetitive trials.
We want you to succeed with this task, so when we are working together on this exercise, try to talk out what you are doing.
This will make it easier for us to guide you and understand your logic.


# Setup
## Node
#### **macOS**
- HomeBrew 
	- `brew install node`
- cURL
	- `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
- Web
	- Navigate to the Node install website [here](https://nodejs.org/en/download/).
	- Click the macOS Installer icon to begin the download.
	- Install the `.pkg`.
#### **Windows**
- Web
	- Navigate to the Node install website [here](https://nodejs.org/en/download/).
	- Click the Windows Installer icon to begin the download.
	- Install the `.msi`.
## Yarn
- Ensure that Node is [installed](#node).
- Open a terminal window.
- Execute `npm install --global yarn`.

# Development
The application supports hot module replacement, along with autmatically restarting backed servers on code change.
All local development can be started with the following, from the root of the project.
```bash
yarn dev
```

# Exercise
Upon starting the application, your default browser should open with the path pointed to the application.
If this does not occur, open a browser and navigate to [http://localhost:3000](http://localhost:3000).

Before we begin, keep in mind a few things:
1. We are here to help. We want to help. We wouldn't be here if we didn't want you to succeed. We believe that it is not an accurate assessment of your skill if you can magically know the structure of this codebase. Ask questions.
2. Is MDN blocked from you during your workday? No. Don't be afraid of using it or any other resources you know of. We want to see how you use the tools available to you, rather than watch you struggle to remember an API.
3. There is far more work to do than the time allotted, on purpose. We aren't concerned if every step is complete. We are learning how you work, and if it will be a good fit for our team. Push yourself to work at a quick pace, but do not put yourself down when all work isn't completed.

When we navigate to the application, we have the dreaded white screen of death. The entire application has crashed.

We want to investigate the issue, find a solution, and commit the changes

We have 45 minutes to work on this bug as well as any other issues we may find along the way.