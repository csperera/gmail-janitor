# Gmail Backlog Janitor 🧹

**A Google Apps Script utility to bypass Gmail's UI limitations and bulk-delete massive email backlogs (100,000+ threads) automatically.**

## The Problem
Gmail's web interface has a notorious "bug" when handling massive bulk deletions. Even when using the "Select all conversations that match this search" feature, the process frequently:
* Timeouts or throws server errors.
* Fails to actually move items to the Trash.
* Requires manual intervention for every batch of 50–100.
* Leaves the "Trash" full, which continues to count against your Google Storage quota.

## The Solution
This script uses the **Gmail API** to act as a "Silent Janitor." It runs in the Google Cloud (independent of your local machine) to surgically remove old, unread, or unimportant emails in consistent batches.

### Key Features
* **Automated Batching:** Processes 100 threads every 10 minutes (14,400/day).
* **Bypasses UI Bugs:** Uses the API directly, avoiding the browser-based "Select All" failures.
* **Permanent Purge:** Automatically empties the Trash after every batch to instantly reclaim storage space.
* **Resilient Error Handling:** Includes logic to handle "Empty Response" errors from Google's servers during high-speed deletions.
* **Cloud-Native:** Works while your computer is asleep or offline.

---

## Setup Instructions

### 1. Create the Script
1.  Go to [script.google.com](https://script.google.com).
2.  Click **New Project**.
3.  Replace the default code with the contents of `Code.gs` from this repository.

### 2. Enable Gmail API
1.  On the left sidebar, click the **+** next to **Services**.
2.  Select **Gmail API** and click **Add**. *(This is required for the permanent delete function).*

### 3. Configure the Search
Change the search query in the script to match your needs:
```javascript
var threads = GmailApp.search('is:unread older_than:1y -is:important', 0, 100);
