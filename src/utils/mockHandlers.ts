/**
 * Mock handler utilities for admin panel interactions
 * These provide console logging for development/demo purposes
 */

// Generic action handler
export const handleAction = (action: string, data?: any) => {
  console.log(`[ACTION] ${action}`, data || '');
}

// Pagination handlers
export const handlePagination = {
  next: () => handleAction('Pagination: Next page'),
  previous: () => handleAction('Pagination: Previous page'),
  goToPage: (page: number) => handleAction(`Pagination: Go to page ${page}`),
  changePageSize: (size: number) => handleAction(`Pagination: Change page size to ${size}`),
}

// Filter handlers
export const handleFilter = {
  apply: (filterType: string, value: string) =>
    handleAction(`Filter: ${filterType}`, { value }),
  clear: () => handleAction('Filter: Clear all'),
  search: (query: string) => handleAction('Search', { query }),
}

// CRUD handlers
export const handleCRUD = {
  create: (entity: string) => handleAction(`Create: ${entity}`),
  read: (entity: string, id?: string | number) =>
    handleAction(`View: ${entity}`, id ? { id } : ''),
  update: (entity: string, id?: string | number) =>
    handleAction(`Update: ${entity}`, id ? { id } : ''),
  delete: (entity: string, id?: string | number) =>
    handleAction(`Delete: ${entity}`, id ? { id } : ''),
}

// Form handlers
export const handleForm = {
  submit: (formName: string) => handleAction(`Form: Submit ${formName}`),
  cancel: () => handleAction('Form: Cancel'),
  reset: () => handleAction('Form: Reset'),
}

// Modal/Drawer handlers
export const handleModal = {
  open: (modalName: string) => handleAction(`Modal: Open ${modalName}`),
  close: () => handleAction('Modal: Close'),
}

// Tab handlers
export const handleTab = {
  switch: (tabName: string) => handleAction(`Tab: Switch to ${tabName}`),
}

// Export handlers
export const handleExport = {
  csv: (dataType: string) => handleAction(`Export: ${dataType} to CSV`),
  pdf: (dataType: string) => handleAction(`Export: ${dataType} to PDF`),
  excel: (dataType: string) => handleAction(`Export: ${dataType} to Excel`),
}

// Notification handlers
export const handleNotification = {
  send: (type: string) => handleAction(`Notification: Send ${type}`),
  markRead: (id: string | number) => handleAction(`Notification: Mark as read`, { id }),
}

// Sort handlers
export const handleSort = {
  by: (field: string, direction: 'asc' | 'desc') =>
    handleAction(`Sort: ${field}`, { direction }),
  toggle: (field: string) => handleAction(`Sort: Toggle ${field}`),
}

// Settings handlers
export const handleSettings = {
  save: () => handleAction('Settings: Save changes'),
  cancel: () => handleAction('Settings: Cancel changes'),
  reset: () => handleAction('Settings: Reset to defaults'),
}

// Media handlers
export const handleMedia = {
  upload: (type: string) => handleAction(`Media: Upload ${type}`),
  remove: (type: string) => handleAction(`Media: Remove ${type}`),
  change: (type: string) => handleAction(`Media: Change ${type}`),
}

// Dropdown change handler
export const handleDropdownChange = (field: string, value: string) => {
  handleAction(`Dropdown: ${field}`, { value });
}

// Checkbox/Toggle handler
export const handleToggle = (field: string, checked: boolean) => {
  handleAction(`Toggle: ${field}`, { checked });
}

// Generic button click handler
export const handleClick = (label: string) => {
  handleAction(`Click: ${label}`);
}

// Row action handlers
export const handleRowAction = {
  edit: (entity: string, id: string | number) =>
    handleAction(`Row: Edit ${entity}`, { id }),
  delete: (entity: string, id: string | number) =>
    handleAction(`Row: Delete ${entity}`, { id }),
  view: (entity: string, id: string | number) =>
    handleAction(`Row: View ${entity}`, { id }),
  menu: (entity: string, id: string | number) =>
    handleAction(`Row: Open menu for ${entity}`, { id }),
}
