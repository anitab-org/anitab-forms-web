---
id: Automation-and-Filtering
title: Automation and Filtering
---

## Zulip Stats

Since AnitaB.org is based on Zulip, community interaction can be best understood by someone's Zulip Stats. Now, Admins cannot switch between Zulip and Sheets to monitor data, or update user's data manually every time they change. So automating the process to automatically fetch the data, and update automatically. Also keeping a backup of the last refreshed data was necessary, considering the scenario the Zulip scripts fail. So every time a user refreshes the stats get updated in the Database.

![Screenshot from 2020-08-29 19-43-31](https://user-images.githubusercontent.com/43119923/91638991-010abf00-ea31-11ea-9b29-bf34126cab1e.png)

## Filtering submissions

![Screenshot from 2020-08-29 19-43-01](https://user-images.githubusercontent.com/43119923/91639030-462ef100-ea31-11ea-8760-2d70a5e3cf54.png)

- Responses can be filtered based on forms. Admins can select multiple forms from the already available list. The [Multiple Search Selection](https://react.semantic-ui.com/modules/dropdown/#types-multiple-search-selection) has been used for the list. The form IDs are sent as parameters to the search API and the data gets filtered. Searching for a specific candidate is also possible via **name** or **username**.
