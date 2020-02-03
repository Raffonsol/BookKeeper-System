# BookKeeper-System
New system for Library Inc. that will allow the business operation staff to more easily access information from the catalog of books available for their clientele. The system will allow the staff to add, edit and delete books from the database. Look for full book listings based on book type, title, publisher; look for listing of books out on loan or overdue and allow the clientele to search for books based on type, author or title.

# Database Setup

### node
To begin, you must first install our local sql database. To do so, first you
must have node installed on your system. Follow [this](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
for instructions on setting up node for windows.

### mysql
Once you have node installed, open a command prompt (restart it if it was already
open) and navigate into this projects directory and run the command `npm i mysql`
### DB file
using the `cd` command. Navigate to 
the DB directory, and run the command `node CreateBookKeeperDB.js`
and then run the command `node populateDB.js`

