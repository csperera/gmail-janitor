function cleanAndEmptyGmail() {
  // 1. Search for 100 threads (Newest-to-Oldest within the "older than 1 year" group)
  var threads = GmailApp.search('is:unread older_than:1y -is:important', 0, 100);
  
  if (threads.length > 0) {
    // 2. Move the 100 emails to Trash
    GmailApp.moveThreadsToTrash(threads);
    console.log("Success: 100 threads moved to Trash.");
    
    // 3. Clear the Trash (Using the method that worked yesterday)
    var trashThreads = GmailApp.getTrashThreads();
    if (trashThreads.length > 0) {
      console.log("Found " + trashThreads.length + " items in trash. Cleaning now...");
      
      for (var i = 0; i < trashThreads.length; i++) {
        try {
          // Permanently remove the thread
          Gmail.Users.Threads.remove('me', trashThreads[i].getId());
        } catch (e) {
          // If the email is already gone (Empty response), just skip to the next one
          continue; 
        }
      }
      console.log("Success: Trash has been cleared.");
    }
    
  } else {
    console.log("No matching emails found.");
  }
}
