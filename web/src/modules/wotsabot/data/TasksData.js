export const tasksData = [
  {
    id: 1,
    task_name: "Update CRM Software",
    task_owner: "Sabu John Bosco",
    description: "Ensure the CRM system is updated with the latest features.",
    assigned_to: "King (Sample)",
    due_date: "2024-09-30",
    status: "In Progress",
    priority: "High",
    related_entity: "Software Development",
    contact_name: "Kris Marrier (Sample)",
    phone:"555-555-5555",
    mobile:"555-555-5555",
    email:"krismarrier@noemail.com",
  },
  {
    id: 2,
    task_name: "Client Follow-Up",
    task_owner: "Sabu John Bosco",
    description:
      "Contact clients for project feedback and additional requirements.",
    assigned_to: "Jane Smith",
    due_date: "2024-10-05",
    status: "Not Started",
    priority: "Medium",
    related_entity: "Client Relations",
  },
  {
    id: 3,
    task_name: "Prepare Quarterly Report",
    task_owner: "Sabu John Bosco",
    description:
      "Compile and present the Q3 financial and project progress report.",
    assigned_to: "Alex Johnson",
    due_date: "2024-09-25",
    status: "Completed",
    priority: "Low",
    related_entity: "Finance",
  },
];

export const taskColumnDefs = [
  {
    field: "task_name",
    headerName: "Subject",
    headerCheckboxSelection: true,
    checkboxSelection: true,
    flex: 2,
  },
  {
    field: "due_date",
    headerName: "Due Date",
    flex: 1,
  },
  {
    field: "status",
    headerName: "Status",
    flex: 1,
  },
  {
    field: "priority",
    headerName: "Priority",
    flex: 1,
  },
  {
    field: "related_entity",
    headerName: "Related To",
    flex: 1,
  },
  {
    field: "assigned_to",
    headerName: "Contact Name",
    flex: 1,
  },
  {
    field: "task_owner",
    headerName: "Task Owner",
    flex: 1,
  },
];
